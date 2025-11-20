import { supabase } from "@/integrations/supabase/client";

export interface DocumentVerificationResult {
  fileName: string;
  documentType: string;
  valid: boolean;
  confidence: number;
  issues?: string[];
  keyFindings?: string[];
  recommendations?: string[];
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const verifyDocument = async (file: File, expectedDocumentType?: string): Promise<DocumentVerificationResult> => {
  try {
    const imageBase64 = await fileToBase64(file);

    console.log("Calling verify-document function for:", file.name);

    const body = JSON.stringify({
      imageBase64,
      fileName: file.name,
      expectedDocumentType
    });

    const invokeResult = await supabase.functions.invoke("verify-document", {
      body,
      headers: { "Content-Type": "application/json" }
    });

    // supabase.functions.invoke returns an object; different SDK versions may return { data, error } or { error, data }
    // Normal shape: { data, error }
    const { data, error } = invokeResult as any;

    console.log("Function response:", { data, error });

    if (error) {
      console.error("Error calling verify-document function:", error);
      let errorMessage = "Verification failed";
      if (error.message) errorMessage += `: ${error.message}`;
      if (error.details) errorMessage += ` (${error.details})`;
      throw new Error(errorMessage);
    }

    // If the function responded with an HTTP 200 but returned an error payload inside data
    if (!data || data.error) {
      const details = data?.details || data?.raw || data?.error || "No details";
      throw new Error(`Document verification failed: ${details}`);
    }

    if (!data.success) {
      throw new Error(data.error || "Document verification failed");
    }

    const analysis = data.analysis || {};

    return {
      fileName: file.name,
      documentType: analysis.documentType || "Unknown Document",
      valid: Boolean(analysis.isValid || analysis.valid),
      confidence: typeof analysis.confidence === "number" ? analysis.confidence : 0,
      issues: Array.isArray(analysis.issues) ? analysis.issues : [],
      keyFindings: Array.isArray(analysis.keyFindings) ? analysis.keyFindings : (Array.isArray(analysis.key_findings) ? analysis.key_findings : []),
      recommendations: Array.isArray(analysis.recommendations) ? analysis.recommendations : []
    };
  } catch (error) {
    console.error("Document verification error:", error);

    return {
      fileName: file.name,
      documentType: "Verification Failed",
      valid: false,
      confidence: 0,
      issues: [`Verification failed: ${error instanceof Error ? error.message : String(error)}`],
      keyFindings: [],
      recommendations: ["Please try uploading the document again or contact support"]
    };
  }
};

export const matchDocumentsToRequirements = (
  verificationResults: DocumentVerificationResult[],
  requiredDocuments: string[]
): { matches: { document: DocumentVerificationResult; requiredType: string }[]; missing: string[] } => {
  const matches: { document: DocumentVerificationResult; requiredType: string }[] = [];
  const matchedRequirements = new Set<string>();

  verificationResults.forEach(doc => {
    if (!doc.valid) return;

    let matched = false;

    for (const required of requiredDocuments) {
      if (
        !matchedRequirements.has(required) &&
        (doc.documentType === required || required.includes(doc.documentType) || doc.documentType.includes(required))
      ) {
        matches.push({ document: doc, requiredType: required });
        matchedRequirements.add(required);
        matched = true;
        break;
      }
    }

    if (!matched) {
      for (const required of requiredDocuments) {
        if (!matchedRequirements.has(required)) {
          matches.push({ document: doc, requiredType: required });
          matchedRequirements.add(required);
          break;
        }
      }
    }
  });

  const missing = requiredDocuments.filter(req => !matchedRequirements.has(req));
  return { matches, missing };
};
