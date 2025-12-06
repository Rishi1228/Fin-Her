// Pinned Deno standard library imports
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

// ============= CENTRALIZED SCHEMA VALIDATION =============
// Using manual validation (Zod not available in Deno edge functions without esm.sh)

interface VerifyDocumentRequest {
  imageBase64: string;
  fileName?: string;
  expectedDocumentType?: string;
}

interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  issues?: string[];
}

interface GeminiAnalysisResult {
  documentType: string;
  isValid: boolean;
  confidence: number;
  issues: string[];
  keyFindings: string[];
  recommendations: string[];
}

interface VerifyDocumentResponse {
  success: boolean;
  fileName?: string;
  analysis?: GeminiAnalysisResult;
  error?: string;
  details?: string;
}

// Safe parse function for request validation
function safeParseRequest(body: unknown): ValidationResult<VerifyDocumentRequest> {
  const issues: string[] = [];

  if (!body || typeof body !== "object") {
    return { success: false, error: "Request body must be an object", issues: ["Invalid request body type"] };
  }

  const obj = body as Record<string, unknown>;

  // Validate imageBase64 (required)
  if (typeof obj.imageBase64 !== "string") {
    issues.push("imageBase64 must be a string");
  } else if (obj.imageBase64.length === 0) {
    issues.push("imageBase64 cannot be empty");
  } else if (obj.imageBase64.length > 50_000_000) {
    issues.push("imageBase64 exceeds maximum size (50MB)");
  }

  // Validate fileName (optional string)
  if (obj.fileName !== undefined && typeof obj.fileName !== "string") {
    issues.push("fileName must be a string if provided");
  }

  // Validate expectedDocumentType (optional string)
  if (obj.expectedDocumentType !== undefined && typeof obj.expectedDocumentType !== "string") {
    issues.push("expectedDocumentType must be a string if provided");
  }

  if (issues.length > 0) {
    return { success: false, error: "Validation failed", issues };
  }

  return {
    success: true,
    data: {
      imageBase64: obj.imageBase64 as string,
      fileName: obj.fileName as string | undefined,
      expectedDocumentType: obj.expectedDocumentType as string | undefined,
    },
  };
}

// Safe parse function for Gemini response
function safeParseGeminiAnalysis(text: string, expectedDocType?: string): ValidationResult<GeminiAnalysisResult> {
  try {
    // Try to extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      // Fallback: create result from text analysis
      return {
        success: true,
        data: {
          documentType: expectedDocType || "Unknown Document",
          isValid: /authentic|legitimate|valid|genuine/i.test(text),
          confidence: 0.7,
          issues: /issue|tamper|forg|fake|invalid/i.test(text) ? [text.substring(0, 300)] : [],
          keyFindings: [text.substring(0, 300)],
          recommendations: [],
        },
      };
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Normalize and validate the parsed result
    const result: GeminiAnalysisResult = {
      documentType: typeof parsed.documentType === "string" ? parsed.documentType : (expectedDocType || "Unknown Document"),
      isValid: typeof parsed.isValid === "boolean" ? parsed.isValid : false,
      confidence: typeof parsed.confidence === "number" ? Math.min(1, Math.max(0, parsed.confidence)) : 0,
      issues: Array.isArray(parsed.issues) ? parsed.issues.filter((i: unknown) => typeof i === "string") : [],
      keyFindings: Array.isArray(parsed.keyFindings) ? parsed.keyFindings.filter((k: unknown) => typeof k === "string") : [],
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations.filter((r: unknown) => typeof r === "string") : [],
    };

    return { success: true, data: result };
  } catch (err) {
    return { success: false, error: `Failed to parse Gemini response: ${err instanceof Error ? err.message : String(err)}` };
  }
}

// ============= CORS HEADERS =============
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

// Helper to create JSON responses
function jsonResponse(body: VerifyDocumentResponse | { error: string; issues?: string[]; details?: string }, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// ============= MAIN HANDLER =============
serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  // Only allow POST
  if (req.method !== "POST") {
    console.warn(`verify-document: Invalid method ${req.method}`);
    return jsonResponse({ error: "Method not allowed", details: "Only POST requests are accepted" }, 405);
  }

  console.log("verify-document: Processing request");

  try {
    // Parse request body
    let rawBody: unknown;
    try {
      const text = await req.text();
      if (!text || text.trim().length === 0) {
        console.error("verify-document: Empty request body");
        return jsonResponse({ error: "Empty request body", issues: ["Request body is required"] }, 400);
      }
      rawBody = JSON.parse(text);
    } catch (parseErr) {
      console.error("verify-document: JSON parse error:", parseErr);
      return jsonResponse({ error: "Invalid JSON in request body", issues: ["Request body must be valid JSON"] }, 400);
    }

    // Validate request using safeParse
    const validation = safeParseRequest(rawBody);
    if (!validation.success) {
      console.error("verify-document: Validation failed:", validation.issues);
      return jsonResponse({ error: validation.error || "Validation failed", issues: validation.issues }, 400);
    }

    const { imageBase64, fileName, expectedDocumentType } = validation.data!;
    console.log(`verify-document: Validated request for file: ${fileName || "unknown"}`);

    // Get Gemini API key
    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiApiKey) {
      console.error("verify-document: GEMINI_API_KEY not configured");
      return jsonResponse({ error: "Gemini API key not configured" }, 500);
    }

    // Detect MIME type from base64 data URL
    const mimeMatch = imageBase64.match(/^data:([^;]+);base64,/);
    let detectedMimeType = "image/jpeg";
    
    if (mimeMatch) {
      const fullMimeType = mimeMatch[1];
      if (fullMimeType === "application/pdf") {
        console.warn("verify-document: PDF files not supported");
        return jsonResponse({ error: "PDF files are not supported", issues: ["Please upload an image file (JPEG, PNG, etc.)"] }, 400);
      }
      if (fullMimeType.startsWith("image/")) {
        detectedMimeType = fullMimeType;
      }
    }

    // Extract pure base64 data
    const base64Data = imageBase64.replace(/^data:[^;]+;base64,/, "");
    console.log(`verify-document: MIME type: ${detectedMimeType}, Base64 length: ${base64Data.length}`);

    // Build Gemini prompt
    const prompt = `Analyze the provided document image and return ONLY a valid JSON object with these exact keys:
{
  "documentType": "string describing the type of document",
  "isValid": boolean indicating if document appears authentic,
  "confidence": number between 0.0 and 1.0,
  "issues": ["array of any issues or concerns found"],
  "keyFindings": ["array of key information extracted"],
  "recommendations": ["array of recommendations"]
}

File name: ${fileName || "unknown"}
Expected document type: ${expectedDocumentType || "any"}

Respond with ONLY the JSON object, no additional text.`;

    // Call Gemini API
    const geminiUrl = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";
    const geminiPayload = {
      contents: [{
        parts: [
          { text: prompt },
          { inline_data: { mime_type: detectedMimeType, data: base64Data } }
        ]
      }],
      generationConfig: {
        temperature: 0.1,
        topK: 32,
        topP: 1,
        maxOutputTokens: 2048
      }
    };

    console.log("verify-document: Calling Gemini API");
    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": geminiApiKey,
      },
      body: JSON.stringify(geminiPayload),
    });

    const geminiRaw = await geminiResponse.text();
    console.log(`verify-document: Gemini response status: ${geminiResponse.status}`);

    if (!geminiResponse.ok) {
      console.error("verify-document: Gemini API error:", geminiRaw);
      return jsonResponse({ 
        error: "Gemini API error", 
        details: `Status ${geminiResponse.status}: ${geminiRaw.substring(0, 500)}` 
      }, 500);
    }

    // Parse Gemini response
    let geminiData: Record<string, unknown>;
    try {
      geminiData = JSON.parse(geminiRaw);
    } catch {
      console.error("verify-document: Failed to parse Gemini response as JSON");
      return jsonResponse({ error: "Invalid response from Gemini API", details: geminiRaw.substring(0, 500) }, 500);
    }

    // Extract text from Gemini response
    const candidates = geminiData.candidates as Array<{ content?: { parts?: Array<{ text?: string }> } }> | undefined;
    const aiText = candidates?.[0]?.content?.parts?.find(p => typeof p.text === "string")?.text || "";
    
    if (!aiText) {
      console.error("verify-document: Empty text in Gemini response");
      return jsonResponse({ error: "Empty response from Gemini API", details: JSON.stringify(geminiData).substring(0, 500) }, 500);
    }

    console.log("verify-document: Parsing Gemini analysis");
    
    // Parse and validate Gemini analysis
    const analysisValidation = safeParseGeminiAnalysis(aiText, expectedDocumentType);
    if (!analysisValidation.success) {
      console.error("verify-document: Failed to parse analysis:", analysisValidation.error);
      return jsonResponse({ 
        error: "Failed to parse document analysis", 
        details: analysisValidation.error 
      }, 500);
    }

    console.log(`verify-document: Success - Document type: ${analysisValidation.data!.documentType}, Valid: ${analysisValidation.data!.isValid}`);

    return jsonResponse({
      success: true,
      fileName: fileName || "unknown",
      analysis: analysisValidation.data!,
    }, 200);

  } catch (err) {
    console.error("verify-document: Unexpected error:", err);
    return jsonResponse({ 
      error: "Internal server error", 
      details: err instanceof Error ? err.message : String(err) 
    }, 500);
  }
});
