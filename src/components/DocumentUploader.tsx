
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, File, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";

interface DocumentUploaderProps {
  onFilesUploaded: (files: File[]) => void;
  acceptedTypes?: string;
  maxFiles?: number;
  maxSizeMB?: number;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ 
  onFilesUploaded,
  acceptedTypes = "application/pdf,image/jpeg,image/png",
  maxFiles = 10,
  maxSizeMB = 5
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const validateFiles = (files: File[]): File[] => {
    return files.filter(file => {
      // Check file type
      const fileType = file.type;
      const isValidType = acceptedTypes.split(',').some(type => 
        fileType === type || (type.includes('*') && fileType.startsWith(type.split('*')[0]))
      );
      
      if (!isValidType) {
        toast.error(`File type not supported: ${file.name}`);
        return false;
      }
      
      // Check file size
      const isValidSize = file.size <= maxSizeMB * 1024 * 1024;
      if (!isValidSize) {
        toast.error(`File too large: ${file.name} exceeds ${maxSizeMB}MB limit`);
        return false;
      }
      
      return true;
    });
  };
  
  const processFiles = (files: FileList | File[]) => {
    const filesArray = Array.from(files);
    
    // Check if adding these files would exceed the maximum
    if (selectedFiles.length + filesArray.length > maxFiles) {
      toast.error(`You can upload a maximum of ${maxFiles} files`);
      return;
    }
    
    // Validate files
    const validFiles = validateFiles(filesArray);
    
    if (validFiles.length > 0) {
      const updatedFiles = [...selectedFiles, ...validFiles];
      setSelectedFiles(updatedFiles);
      onFilesUploaded(validFiles);
      toast.success(`${validFiles.length} document${validFiles.length > 1 ? 's' : ''} added`);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      
      // Reset the input so the same file can be uploaded again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const removeFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    toast.info("Document removed");
  };
  
  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return <FileText className="h-4 w-4" />;
    if (fileType.includes('image')) return <File className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };
  
  const onButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div className="w-full">
      <div 
        className={`border-2 border-dashed rounded-lg p-4 sm:p-6 text-center cursor-pointer transition-colors
          ${dragActive ? 'border-bloom-purple bg-bloom-softPurple' : 'border-gray-300 hover:border-bloom-purple-light'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes}
          onChange={handleChange}
          className="hidden"
        />
        
        <Upload className="h-8 w-8 sm:h-10 sm:w-10 mx-auto text-bloom-purple mb-2" />
        <p className="font-medium text-gray-800 mb-1 text-sm sm:text-base">
          Drag & drop files here
        </p>
        <p className="text-xs sm:text-sm text-gray-500">
          or click to select files
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Supported formats: PDF, JPG, PNG (max {maxSizeMB}MB)
        </p>
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="mt-4 border rounded-md p-3">
          <h4 className="text-sm font-medium mb-2">Selected Documents ({selectedFiles.length}/{maxFiles})</h4>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                <div className="flex items-center space-x-2 text-sm overflow-hidden">
                  {getFileIcon(file.type)}
                  <span className="truncate max-w-[180px] sm:max-w-[300px]">{file.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {(file.size / 1024).toFixed(0)} KB
                  </Badge>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-6 w-6 p-0" 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-4 text-center">
        <Button 
          variant="outline"
          className="border-bloom-purple text-bloom-purple hover:bg-bloom-purple hover:text-white"
          onClick={onButtonClick}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Documents
        </Button>
      </div>
    </div>
  );
};

export default DocumentUploader;
