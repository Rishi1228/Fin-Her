
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, AlertCircle, Eye, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

interface DocumentAnalysis {
  fileName: string;
  documentType: string;
  valid: boolean;
  confidence: number;
  issues?: string[];
  keyFindings?: string[];
  recommendations?: string[];
}

interface VerificationResult {
  verified: boolean;
  documents: DocumentAnalysis[];
}

interface DocumentVerifierProps {
  results: VerificationResult;
}

const DocumentVerifier: React.FC<DocumentVerifierProps> = ({ results }) => {
  const validDocuments = results.documents.filter(doc => doc.valid);
  const invalidDocuments = results.documents.filter(doc => !doc.valid);
  
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "text-green-600";
    if (confidence >= 0.6) return "text-yellow-600";
    return "text-red-600";
  };
  
  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.8) return "bg-green-100 text-green-800 border-green-200";
    if (confidence >= 0.6) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <div className="mt-6 space-y-4">
      <h4 className="font-medium text-gray-900">AI Document Verification Results</h4>
      
      {results.verified ? (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-800">Verification Complete</AlertTitle>
          <AlertDescription className="text-green-700">
            {validDocuments.length} out of {results.documents.length} documents were verified successfully by AI analysis.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertCircle className="h-5 w-5 text-yellow-600" />
          <AlertTitle className="text-yellow-800">Verification Issues Found</AlertTitle>
          <AlertDescription className="text-yellow-700">
            AI analysis found issues with some documents. Please review the details below.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-4">
        {validDocuments.length > 0 && (
          <div>
            <h5 className="text-sm font-medium text-gray-800 mb-3">✅ Verified Documents</h5>
            <div className="space-y-3">
              {validDocuments.map((doc, index) => (
                <div key={`valid-${index}`} className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-gray-900">{doc.fileName}</span>
                        <p className="text-sm text-gray-600">Identified as: {doc.documentType}</p>
                      </div>
                    </div>
                    <Badge className={getConfidenceBadge(doc.confidence)}>
                      {Math.round(doc.confidence * 100)}% confidence
                    </Badge>
                  </div>
                  
                  {doc.keyFindings && doc.keyFindings.length > 0 && (
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-0 h-auto text-sm text-green-700 hover:text-green-800">
                          <Eye className="h-4 w-4 mr-1" />
                          View AI Analysis Details
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2">
                        <div className="bg-white rounded-md p-3 border border-green-200">
                          <h6 className="text-xs font-medium text-gray-700 mb-2">Key Findings:</h6>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {doc.keyFindings.map((finding, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="text-green-600 mt-0.5">•</span>
                                <span>{finding}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {invalidDocuments.length > 0 && (
          <div>
            <h5 className="text-sm font-medium text-gray-800 mb-3">❌ Documents with Issues</h5>
            <div className="space-y-3">
              {invalidDocuments.map((doc, index) => (
                <div key={`invalid-${index}`} className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-gray-900">{doc.fileName}</span>
                        <p className="text-sm text-gray-600">
                          {doc.documentType !== 'Verification Failed' 
                            ? `Identified as: ${doc.documentType}` 
                            : 'Could not verify document'
                          }
                        </p>
                      </div>
                    </div>
                    <Badge className={getConfidenceBadge(doc.confidence)}>
                      {Math.round(doc.confidence * 100)}% confidence
                    </Badge>
                  </div>
                  
                  {doc.issues && doc.issues.length > 0 && (
                    <div className="mt-3 bg-white rounded-md p-3 border border-red-200">
                      <h6 className="text-xs font-medium text-red-700 mb-2">Issues Found:</h6>
                      <ul className="text-xs text-red-600 space-y-1">
                        {doc.issues.map((issue, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-red-600 mt-0.5">•</span>
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {doc.recommendations && doc.recommendations.length > 0 && (
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-sm text-blue-700 hover:text-blue-800">
                          <Lightbulb className="h-4 w-4 mr-1" />
                          View Recommendations
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2">
                        <div className="bg-blue-50 rounded-md p-3 border border-blue-200">
                          <h6 className="text-xs font-medium text-blue-700 mb-2">Recommendations:</h6>
                          <ul className="text-xs text-blue-600 space-y-1">
                            {doc.recommendations.map((rec, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="text-blue-600 mt-0.5">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-800">AI-Powered Verification</p>
            <p className="text-blue-700 mt-1">
              Documents are analyzed using advanced AI to detect authenticity, quality issues, and completeness. 
              Higher confidence scores indicate more reliable verification results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentVerifier;
