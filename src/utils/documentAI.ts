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

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const normalizeAnalysis = (analysis: any) => {
  if (!analysis || typeof analysis !== "object") analysis = {};
  const documentType = analysis.documentType || analysis.document_type || "Unknown Document";
  const isValid = typeof analysis.isValid === "boolean" ? analysis.isValid : (typeof analysis.valid === "boolean" ? analysis.valid : false);
  const confidence = typeof analysis.confidence === "number" ? analysis.confidence : (typeof analysis.confidence_score === "number" ? analysis.confidence_score : 0);
  const issues = Array.isArray(analysis.issues) ? analysis.issues : (Array.isArray(analysis.issues_list) ? analysis.issues_list : []);
  const keyFindings = Array.isArray(analysis.keyFindings) ? analysis.keyFindings : (Array.isArray(analysis.key_findings) ? analysis.key_findings : []);
  const recommendations = Array.isArray(analysis.recommendations) ? analysis.recommendations : (Array.isArray(analysis.recs) ? analysis.recs : []);
  return { documentType, isValid, confidence, issues, keyFindings, recommendations };
};

export const verifyDocument = async (file: File, expectedDocumentType?: string): Promise<DocumentVerificationResult> => {
  try {
    console.log("In verify document utils->documentAI->verifyDocument file:", file);
    const imageBase64 = await fileToBase64(file);

    const body = JSON.stringify({
      imageBase64,
      fileName: file.name,
      expectedDocumentType
    });

    const invokeResult = await supabase.functions.invoke("verify-document", {
      body,
      headers: { "Content-Type": "application/json" }
    });
    console.log(invokeResult);

    const resAny: any = invokeResult;
    const maybeData = resAny.data ?? resAny;
    const maybeError = resAny.error ?? resAny?.error;

    if (maybeError) {
      const msg = typeof maybeError === "string" ? maybeError : (maybeError.message || JSON.stringify(maybeError));
      throw new Error(`Verification failed: ${msg}`);
    }

    if (!maybeData) {
      throw new Error("No data returned from verify-document function");
    }

    if (maybeData.error) {
      throw new Error(`Function error: ${maybeData.error}`);
    }

    if (!maybeData.success) {
      const detail = maybeData.details || maybeData.raw || JSON.stringify(maybeData);
      throw new Error(`Document verification unsuccessful: ${detail}`);
    }

    const analysisRaw = maybeData.analysis ?? {};
    const analysis = normalizeAnalysis(analysisRaw);

    return {
      fileName: file.name,
      documentType: analysis.documentType || expectedDocumentType || "Unknown Document",
      valid: Boolean(analysis.isValid),
      confidence: typeof analysis.confidence === "number" ? analysis.confidence : 0,
      issues: analysis.issues,
      keyFindings: analysis.keyFindings,
      recommendations: analysis.recommendations
    };
  } catch (err: any) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      fileName: file.name,
      documentType: "Verification Failed",
      valid: false,
      confidence: 0,
      issues: [`Verification failed: ${message}`],
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

  verificationResults.forEach((doc) => {
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

  const missing = requiredDocuments.filter((req) => !matchedRequirements.has(req));
  return { matches, missing };
};
