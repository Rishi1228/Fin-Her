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
  console.log("in verify doc in supabase")
  try {
    let requestBody: any = null
    try {
      requestBody = await req.json()
    } catch (e) {
      try {
        const rawText = await req.text()
        console.warn("verify-document: req.json() failed, raw text:", rawText?.slice(0, 1000))
        if (rawText && rawText.trim().length > 0) {
          try { requestBody = JSON.parse(rawText) } catch (e2) {
            console.error("verify-document: JSON.parse(rawText) failed:", e2)
            return new Response(JSON.stringify({ error: "Invalid JSON in request body", raw: rawText.slice(0, 1000) }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } })
          }
        } else {
          console.error("verify-document: empty request body")
          return new Response(JSON.stringify({ error: "Empty request body" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } })
        }
      } catch (readErr) {
        console.error("verify-document: failed to read body as text:", readErr)
        return new Response(JSON.stringify({ error: "Failed to read request body" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } })
      }
    }

    const { imageBase64, fileName, expectedDocumentType } = requestBody || {}
    console.log("Request parsed successfully, fileName:", fileName)
    if (!imageBase64) return new Response(JSON.stringify({ error: "imageBase64 is required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } })

    const key = (globalThis as any)?.Deno?.env?.get?.("GEMINI_API_KEY") || (globalThis as any)?.process?.env?.GEMINI_API_KEY
    if (!key) return new Response(JSON.stringify({ error: "Gemini API key not configured" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } })

    const mimeMatch = imageBase64.match(/^data:([^;]+);base64,/)
    let detectedMimeType = "image/jpeg"
    if (mimeMatch) {
      const fullMimeType = mimeMatch[1]
      if (fullMimeType === "application/pdf") return new Response(JSON.stringify({ error: "PDF not supported" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } })
      if (fullMimeType.startsWith("image/")) detectedMimeType = fullMimeType
    }
    const base64Data = imageBase64.replace(/^data:[^;]+;base64,/, "")
    console.log("Detected MIME type:", detectedMimeType, "Base64 length:", base64Data.length)

    const prompt = `Analyze the provided document image and return only a valid JSON object with keys:
{"documentType":"string","isValid":boolean,"confidence":0.0,"issues":[],"keyFindings":[],"recommendations":[]}
File: ${fileName || "unknown"}
Expected: ${expectedDocumentType || "unknown"}`

    const url = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent"
    const payload = {
      contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: detectedMimeType, data: base64Data } }] }],
      generationConfig: { temperature: 0.1, topK: 32, topP: 1, maxOutputTokens: 2048 }
    }

    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${key}` },
      body: JSON.stringify(payload)
    })
    const raw = await r.text()
    console.log("Gemini status:", r.status)
    if (!r.ok) {
      console.error("Gemini API Error:", raw)
      return new Response(JSON.stringify({ error: "Gemini API error", status: r.status, details: raw }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }
    let data: any = {}
    try { data = JSON.parse(raw) } catch { data = { raw } }
    const aiText = data?.candidates?.[0]?.content?.parts?.find((p: any) => typeof p.text === "string")?.text || data?.raw || ""
    if (!aiText) return new Response(JSON.stringify({ error: "Empty AI response", raw: data }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } })

    let analysisResult: any
    try {
      const j = aiText.match(/\{[\s\S]*\}/)
      if (j) analysisResult = JSON.parse(j[0])
      else analysisResult = {
        documentType: expectedDocumentType || "Unknown Document",
        isValid: /authentic|legitimate|valid|genuine/i.test(aiText),
        confidence: 0.7,
        issues: /issue|tamper|forg/i.test(aiText) ? [aiText.substring(0, 300)] : [],
        keyFindings: [aiText.substring(0, 300)],
        recommendations: []
      }
    } catch (parseErr: any) {
      console.error("Failed to parse AI response:", parseErr)
      return new Response(JSON.stringify({ error: "Failed to parse AI analysis", details: parseErr?.message, raw: aiText.substring(0, 1000) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }

    return new Response(JSON.stringify({ success: true, fileName, analysis: analysisResult }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } })
  } catch (err: any) {
    console.error("Error in verify-document function:", err)
    return new Response(JSON.stringify({ error: "Internal server error", details: err?.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } })
  }
})
