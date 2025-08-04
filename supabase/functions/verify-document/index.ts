
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Verify document function called');
    
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (e) {
      console.error('Error parsing request body:', e);
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    const { imageBase64, fileName, expectedDocumentType } = requestBody;
    console.log('Request parsed successfully, fileName:', fileName);
    
    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: 'Image data is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      return new Response(
        JSON.stringify({ error: 'Gemini API key not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Clean the base64 string and detect MIME type
    const mimeTypeMatch = imageBase64.match(/^data:image\/([a-z]+);base64,/);
    const detectedMimeType = mimeTypeMatch ? `image/${mimeTypeMatch[1]}` : 'image/jpeg';
    const base64Data = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
    
    console.log('Detected MIME type:', detectedMimeType);
    console.log('Base64 data length:', base64Data.length);

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
- Expected document type: ${expectedDocumentType || 'Unknown'}

Please focus on:
- Document authenticity (any signs of tampering, forgery, or alteration).
- Image quality and readability.
- Presence of required elements (signatures, seals, watermarks, etc.).
- Text clarity and consistency.
- Overall document condition and security features.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: detectedMimeType,
                data: base64Data
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.1,
          topK: 32,
          topP: 1,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to analyze document', details: errorText }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      console.error('Unexpected Gemini response structure:', data);
      return new Response(
        JSON.stringify({ error: 'Invalid response from AI service' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    let analysisResult;
    try {
      const aiResponse = data.candidates[0].content.parts[0].text;
      // Try to extract JSON from the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback: parse the text response
        analysisResult = {
          documentType: expectedDocumentType || "Unknown Document",
          isValid: aiResponse.toLowerCase().includes('legitimate') || aiResponse.toLowerCase().includes('authentic'),
          confidence: 0.7,
          issues: aiResponse.toLowerCase().includes('issue') ? [aiResponse.substring(0, 200)] : [],
          keyFindings: [aiResponse.substring(0, 200)],
          recommendations: []
        };
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      return new Response(
        JSON.stringify({ error: 'Failed to parse AI analysis' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        fileName,
        analysis: analysisResult
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in verify-document function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
