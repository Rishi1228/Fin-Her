import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileCheck, AlertCircle, CheckCircle, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { verifyDocument } from "@/utils/documentAI";

interface DocumentUploadItemProps {
  documentType: string;
  schemeId: number;
  onUploadComplete?: (documentType: string, uploadData: any) => void;
  onVerificationComplete?: (documentType: string, verificationData: any) => void;
}

interface UploadedDocument {
  id: string;
  file_name: string;
  file_url: string;
  verification_status: string;
  verification_result?: any;
}

const DocumentUploadItem = ({ 
  documentType, 
  schemeId, 
  onUploadComplete, 
  onVerificationComplete 
}: DocumentUploadItemProps) => {
  const [uploadedDoc, setUploadedDoc] = useState<UploadedDocument | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("in handle file upload in documentuploaditem.tsx", file)
    if (!file) return;

    setIsUploading(true);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('user-documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('user-documents')
        .getPublicUrl(fileName);

      // Save document record to database
      const { data: dbData, error: dbError } = await supabase
        .from('user_documents')
        .insert({
          user_id: user.id,
          scheme_id: schemeId,
          document_type: documentType,
          file_name: file.name,
          file_url: publicUrl,
          file_size: file.size,
          mime_type: file.type,
          verification_status: 'pending'
        })
        .select()
        .single();

      if (dbError) throw dbError;

      console.log("db data = ", dbData)

      setUploadedDoc(dbData);
      onUploadComplete?.(documentType, dbData);
      
      toast({
        title: "Upload Successful",
        description: `${file.name} has been uploaded successfully.`,
      });

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload document.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleVerifyDocument = async () => {
    if (!uploadedDoc) return;

    setIsVerifying(true);

    try {
      // Download the file for verification
      const response = await fetch(uploadedDoc.file_url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch document: ${response.status} ${response.statusText}`);
      }
      
      const blob = await response.blob();
      
      // Validate that we actually got an image or PDF
      if (!blob.type.startsWith('image/') && blob.type !== 'application/pdf') {
        throw new Error(`Invalid file type received: ${blob.type}. Expected image or PDF.`);
      }
      
      const file = new File([blob], uploadedDoc.file_name, { type: blob.type });

      // Verify with Gemini AI
      const verificationResult = await verifyDocument(file, documentType);

       // Update database with verification result
      const { error: updateError } = await supabase
        .from('user_documents')
        .update({
          verification_status: verificationResult.valid ? 'verified' : 'failed',
          verification_result: verificationResult as any
        })
        .eq('id', uploadedDoc.id);

      if (updateError) throw updateError;

      // Update local state
      setUploadedDoc(prev => prev ? {
        ...prev,
        verification_status: verificationResult.valid ? 'verified' : 'failed',
        verification_result: verificationResult
      } : null);

      onVerificationComplete?.(documentType, verificationResult);

      if (verificationResult.valid) {
        toast({
          title: "Verification Successful",
          description: `${documentType} has been verified as authentic.`,
        });
      } else {
        toast({
          title: "Verification Failed",
          description: verificationResult.issues?.[0] || "Document could not be verified.",
          variant: "destructive"
        });
      }

    } catch (error) {
      console.error('Verification error:', error);
      
      let errorMessage = "Failed to verify document.";
      
      if (error instanceof Error) {
        // Check if it's a specific API error
        if (error.message.includes('Failed to fetch document')) {
          errorMessage = "Cannot access the uploaded document. Please try uploading again.";
        } else if (error.message.includes('Invalid file type')) {
          errorMessage = error.message;
        } else if (error.message.includes('Gemini API')) {
          errorMessage = "AI service error. Please try again later.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Verification Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleRemoveDocument = async () => {
    if (!uploadedDoc) return;

    try {
      // Delete from database
      const { error: dbError } = await supabase
        .from('user_documents')
        .delete()
        .eq('id', uploadedDoc.id);

      if (dbError) throw dbError;

      // Delete from storage
      const urlParts = uploadedDoc.file_url.split('/');
      const filePath = urlParts.slice(-2).join('/'); // Get user_id/filename.ext
      
      await supabase.storage
        .from('user-documents')
        .remove([filePath]);

      setUploadedDoc(null);
      
      toast({
        title: "Document Removed",
        description: `${documentType} has been removed.`,
      });

    } catch (error) {
      console.error('Remove error:', error);
      toast({
        title: "Remove Failed",
        description: "Failed to remove document.",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = () => {
    if (!uploadedDoc) return null;

    switch (uploadedDoc.verification_status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Verified</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
    }
  };

  const getStatusIcon = () => {
    if (!uploadedDoc) return null;

    switch (uploadedDoc.verification_status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <FileCheck className="h-4 w-4 text-yellow-600" />;
    }
  };

  return (
    <Card className="p-4">
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900">{documentType}</h4>
          {getStatusBadge()}
        </div>

        {!uploadedDoc ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Upload your {documentType} for AI verification
            </p>
            <div>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
                id={`upload-${documentType.replace(/\s+/g, '-')}`}
              />
              <Button
                variant="outline"
                disabled={isUploading}
                onClick={() => document.getElementById(`upload-${documentType.replace(/\s+/g, '-')}`)?.click()}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? "Uploading..." : "Upload Document"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              {getStatusIcon()}
              <span>{uploadedDoc.file_name}</span>
            </div>

            {uploadedDoc.verification_status === 'pending' && (
              <Button
                onClick={handleVerifyDocument}
                disabled={isVerifying}
                size="sm"
                className="bg-bloom-purple hover:bg-bloom-purple-dark"
              >
                <FileCheck className="h-4 w-4 mr-2" />
                {isVerifying ? "Verifying..." : "Verify with AI"}
              </Button>
            )}

            {uploadedDoc.verification_status === 'failed' && uploadedDoc.verification_result && (
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <p className="text-sm font-medium text-red-800 mb-1">Verification Issues:</p>
                <ul className="text-sm text-red-700 space-y-1">
                  {uploadedDoc.verification_result.issues?.map((issue: string, index: number) => (
                    <li key={index}>• {issue}</li>
                  ))}
                </ul>
                <div className="flex gap-2 mt-3">
                  <Button
                    onClick={handleVerifyDocument}
                    disabled={isVerifying}
                    size="sm"
                    variant="outline"
                  >
                    {isVerifying ? "Verifying..." : "Retry Verification"}
                  </Button>
                  <Button
                    onClick={handleRemoveDocument}
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            )}

            {uploadedDoc.verification_status === 'verified' && uploadedDoc.verification_result && (
              <div className="bg-green-50 border border-green-200 rounded p-3">
                <p className="text-sm font-medium text-green-800 mb-1">
                  ✓ Document verified successfully
                </p>
                <p className="text-sm text-green-700">
                  Confidence: {Math.round((uploadedDoc.verification_result.confidence || 0) * 100)}%
                </p>
                <Button
                  onClick={handleRemoveDocument}
                  size="sm"
                  variant="outline"
                  className="mt-2 text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentUploadItem;
