
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface VerificationResult {
  verified: boolean;
  matchedDocuments: {
    fileName: string;
    matched: string;
    valid: boolean;
  }[];
}

interface DocumentVerifierProps {
  results: VerificationResult;
}

const DocumentVerifier: React.FC<DocumentVerifierProps> = ({ results }) => {
  const validDocuments = results.matchedDocuments.filter(doc => doc.valid);
  const invalidDocuments = results.matchedDocuments.filter(doc => !doc.valid);
  
  return (
    <div className="mt-6 space-y-4">
      <h4 className="font-medium text-gray-900">Verification Results</h4>
      
      {results.verified ? (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-800">Verification Complete</AlertTitle>
          <AlertDescription className="text-green-700">
            {validDocuments.length} out of {results.matchedDocuments.length} documents were verified successfully.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertCircle className="h-5 w-5 text-yellow-600" />
          <AlertTitle className="text-yellow-800">Verification Issues</AlertTitle>
          <AlertDescription className="text-yellow-700">
            Some documents could not be verified. Please check the details below.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-3">
        {validDocuments.length > 0 && (
          <div>
            <h5 className="text-sm font-medium text-gray-800 mb-2">Verified Documents</h5>
            <ul className="space-y-2">
              {validDocuments.map((doc, index) => (
                <li key={`valid-${index}`} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-700">{doc.fileName}</span>
                    <span className="text-gray-500"> - Matched as {doc.matched}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {invalidDocuments.length > 0 && (
          <div>
            <h5 className="text-sm font-medium text-gray-800 mb-2">Documents with Issues</h5>
            <ul className="space-y-2">
              {invalidDocuments.map((doc, index) => (
                <li key={`invalid-${index}`} className="flex items-center gap-2 text-sm">
                  <XCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-700">{doc.fileName}</span>
                    <span className="text-gray-500"> - Issue with {doc.matched}</span>
                    <p className="text-red-600 text-xs mt-0.5">
                      {getRandomIssue(doc.matched)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to generate random verification issues
const getRandomIssue = (docType: string): string => {
  const issues = [
    `The ${docType} appears to be expired`,
    `The ${docType} information is not clearly visible`,
    `The ${docType} is missing required information`,
    `The ${docType} appears to be damaged or altered`,
    `The ${docType} format is not supported for verification`
  ];
  
  return issues[Math.floor(Math.random() * issues.length)];
};

export default DocumentVerifier;
