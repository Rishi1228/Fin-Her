
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface DocumentUploaderProps {
  onFilesUploaded: (files: File[]) => void;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ onFilesUploaded }) => {
  const [dragActive, setDragActive] = useState(false);
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
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      onFilesUploaded(filesArray);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      onFilesUploaded(filesArray);
      
      // Reset the input so the same file can be uploaded again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const onButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div className="w-full">
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
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
          accept="application/pdf,image/jpeg,image/png"
          onChange={handleChange}
          className="hidden"
        />
        
        <Upload className="h-10 w-10 mx-auto text-bloom-purple mb-2" />
        <p className="font-medium text-gray-800 mb-1">
          Drag & drop files here
        </p>
        <p className="text-sm text-gray-500">
          or click to select files
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Supported formats: PDF, JPG, PNG
        </p>
      </div>
      
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
