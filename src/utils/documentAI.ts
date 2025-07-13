
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

/**
 * Converts a file to base64 string
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

/**
 * Verifies a document using Gemini AI
 */
export const verifyDocument = async (file: File, expectedDocumentType?: string): Promise<DocumentVerificationResult> => {
  try {
    // Convert file to base64
    const imageBase64 = await fileToBase64(file);
    
    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('verify-document', {
      body: {
        imageBase64,
        fileName: file.name,
        expectedDocumentType
      }
    });

    if (error) {
      console.error('Error calling verify-document function:', error);
      throw new Error(`Verification failed: ${error.message}`);
    }

    if (!data.success) {
      throw new Error(data.error || 'Document verification failed');
    }

    const analysis = data.analysis;
    
    return {
      fileName: file.name,
      documentType: analysis.documentType || 'Unknown Document',
      valid: analysis.isValid || false,
      confidence: analysis.confidence || 0,
      issues: analysis.issues || [],
      keyFindings: analysis.keyFindings || [],
      recommendations: analysis.recommendations || []
    };

  } catch (error) {
    console.error('Document verification error:', error);
    
    // Return error result instead of throwing
    return {
      fileName: file.name,
      documentType: 'Verification Failed',
      valid: false,
      confidence: 0,
      issues: [`Verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`],
      keyFindings: [],
      recommendations: ['Please try uploading the document again or contact support']
    };
  }
};

/**
 * Match uploaded documents to required documents for a scheme
 */
export const matchDocumentsToRequirements = (
  verificationResults: DocumentVerificationResult[],
  requiredDocuments: string[]
): {matches: {document: DocumentVerificationResult, requiredType: string}[], missing: string[]} => {
  const matches: {document: DocumentVerificationResult, requiredType: string}[] = [];
  const matchedRequirements = new Set<string>();
  
  // Try to match each verified document to a requirement
  verificationResults.forEach(doc => {
    // Skip failed verifications for matching
    if (!doc.valid) {
      return;
    }
    
    // First try exact matches
    let matched = false;
    
    for (const required of requiredDocuments) {
      if (!matchedRequirements.has(required) && 
          (doc.documentType === required || required.includes(doc.documentType) || doc.documentType.includes(required))) {
        matches.push({document: doc, requiredType: required});
        matchedRequirements.add(required);
        matched = true;
        break;
      }
    }
    
    // If no exact match, try fuzzy match for valid documents
    if (!matched) {
      for (const required of requiredDocuments) {
        if (!matchedRequirements.has(required)) {
          matches.push({document: doc, requiredType: required});
          matchedRequirements.add(required);
          break;
        }
      }
    }
  });
  
  // Find missing requirements
  const missing = requiredDocuments.filter(req => !matchedRequirements.has(req));
  
  return { matches, missing };
};
