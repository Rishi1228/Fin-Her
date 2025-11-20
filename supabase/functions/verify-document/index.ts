let serve: any
if (typeof (globalThis as any).Deno !== "undefined" && typeof (globalThis as any).Deno.serve === "function") {
  serve = (globalThis as any).Deno.serve.bind((globalThis as any).Deno)
} else {
  const mod = await import("https://deno.land/std@0.203.0/http/server.ts")
  serve = mod.serve
}
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400"
}
serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders, status: 204 })
  try {
    console.log("in verify doc in supabase")
    let requestBody: any
    try {
      requestBody = await req.json()
    } catch (e) {
      console.error("Error parsing request body:", e)
      return new Response(JSON.stringify({ error: "Invalid JSON in request body" }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 })
    }
    const { imageBase64, fileName, expectedDocumentType } = requestBody || {}
    console.log("Request parsed successfully, fileName:", fileName)
    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "Image data is required" }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 })
    }
    let geminiApiKey: string | undefined
    try {
      geminiApiKey = (globalThis as any)?.Deno?.env?.get?.("GEMINI_API_KEY") || (globalThis as any)?.process?.env?.GEMINI_API_KEY
    } catch {
      geminiApiKey = undefined
    }
    if (!geminiApiKey) {
      return new Response(JSON.stringify({ error: "Gemini API key not configured" }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 })
    }
    const mimeTypeMatch = imageBase64.match(/^data:([^;]+);base64,/)
    let detectedMimeType = "image/jpeg"
    if (mimeTypeMatch) {
      const fullMimeType = mimeTypeMatch[1]
      if (fullMimeType === "application/pdf") {
        return new Response(JSON.stringify({ error: "PDF files are not supported for document verification. Please upload an image of the document instead." }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 })
      }
      if (fullMimeType.startsWith("image/")) detectedMimeType = fullMimeType
    }
    const base64Data = imageBase64.replace(/^data:[^;]+;base64,/, "")
    console.log("Detected MIME type:", detectedMimeType)
    console.log("Base64 data length:", base64Data.length)
    const prompt = `Analyze the provided document image and provide a detailed verification report.

Your response must be ONLY a valid JSON object. Do not include any additional text, markdown, or explanations outside of the JSON object itself. The JSON must adhere to the following structure:

{
  "documentType": "string",
  "isValid": "boolean",
  "confidence": "number (0-1)",
  "issues": "array of strings",
  "keyFindings": "array of strings",
  "recommendations": "array of strings"
}

Based on your analysis, fill in the values for the keys provided above.

Document Context:
- File name: ${fileName}
- Expected document type: ${expectedDocumentType || "Unknown"}

Please focus on:
- Document authenticity (any signs of tampering, forgery, or alteration).
- Image quality and readability.
- Presence of required elements (signatures, seals, watermarks, etc.).
- Text clarity and consistency.
- Overall document condition and security features.`;
    const url = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent"
    const payload = {
      contents: [
        {
          parts: [
            { text: prompt },
            { inline_data: { mime_type: detectedMimeType, data: base64Data } }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.1,
        topK: 32,
        topP: 1,
        maxOutputTokens: 2048
      }
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${geminiApiKey}`
      },
      body: JSON.stringify(payload)
    })
    const rawText = await response.text()
    console.log("Gemini response status:", response.status)
    if (!response.ok) {
      console.error("Gemini API Error:", rawText)
      return new Response(JSON.stringify({ error: "Failed to analyze document with Gemini API", details: rawText, status: response.status, geminiError: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 })
    }
    let data: any
    try {
      data = JSON.parse(rawText)
    } catch {
      data = { raw: rawText }
    }
    const aiText = data?.candidates?.[0]?.content?.parts?.find((p: any) => typeof p.text === "string")?.text || data?.raw || ""
    if (!aiText) {
      console.error("Unexpected Gemini response structure:", data)
      return new Response(JSON.stringify({ error: "Invalid response from AI service", raw: data }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 })
    }
    let analysisResult: any
    try {
      const jsonMatch = aiText.match(/\{[\s\S]*\}/)
      if (jsonMatch) analysisResult = JSON.parse(jsonMatch[0])
      else {
        analysisResult = {
          documentType: expectedDocumentType || "Unknown Document",
          isValid: /authentic|legitimate|valid|genuine/i.test(aiText),
          confidence: 0.7,
          issues: /issue|tamper|forg/i.test(aiText) ? [aiText.substring(0, 200)] : [],
          keyFindings: [aiText.substring(0, 200)],
          recommendations: []
        }
      }
    } catch (parseError: any) {
      console.error("Error parsing AI response:", parseError)
      console.error("Raw AI response:", aiText)
      return new Response(JSON.stringify({ error: "Failed to parse AI analysis", details: parseError?.message, rawResponse: aiText?.substring(0, 500) }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 })
    }
    return new Response(JSON.stringify({ success: true, fileName, analysis: analysisResult }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 })
  } catch (err: any) {
    console.error("Error in verify-document function:", err)
    return new Response(JSON.stringify({ error: "Internal server error", details: err?.message, type: err?.name, stack: err?.stack?.substring(0, 500) }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 })
  }
});
