
/**
 * Document AI Utility
 * 
 * This is a mock implementation that simulates AI document verification.
 * In a real implementation, this would connect to an AI service or API.
 */

export interface DocumentVerificationResult {
  fileName: string;
  documentType: string;
  valid: boolean;
  confidence: number;
  issues?: string[];
}

/**
 * Verifies a document using AI
 * Mock implementation - in a real app, this would call an AI service
 */
export const verifyDocument = async (file: File): Promise<DocumentVerificationResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Document types we can recognize
  const documentTypes = [
    "Aadhaar Card", "PAN Card", "Voter ID", "Passport",
    "Driving License", "Bank Statement", "Utility Bill",
    "Birth Certificate", "Income Certificate", "Property Documents"
  ];
  
  // Random verification outcome
  const valid = Math.random() > 0.3;
  const confidence = valid ? 0.7 + (Math.random() * 0.3) : 0.3 + (Math.random() * 0.4);
  
  // Random document type based on filename patterns
  let documentType = documentTypes[Math.floor(Math.random() * documentTypes.length)];
  if (file.name.toLowerCase().includes("aadh")) documentType = "Aadhaar Card";
  if (file.name.toLowerCase().includes("pan")) documentType = "PAN Card";
  if (file.name.toLowerCase().includes("passport")) documentType = "Passport";
  if (file.name.toLowerCase().includes("license")) documentType = "Driving License";
  if (file.name.toLowerCase().includes("bank") || file.name.toLowerCase().includes("statement")) documentType = "Bank Statement";
  
  // Generate random issues for invalid documents
  const issues = valid ? [] : [
    "Document appears to be expired",
    "Poor image quality - text not clearly visible",
    "Missing signature",
    "Document appears to be altered",
    "Required information is missing",
    "Format not recognized"
  ].slice(0, 1 + Math.floor(Math.random() * 2));
  
  return {
    fileName: file.name,
    documentType,
    valid,
    confidence,
    issues: valid ? [] : issues
  };
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
    
    // If no exact match, try fuzzy match
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
