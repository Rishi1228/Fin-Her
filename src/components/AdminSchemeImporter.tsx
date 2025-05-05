
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Upload, FileText, CheckCircle, Download } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { 
  importFromCSV, 
  importFromJSON, 
  addImportedSchemesToExistingArray, 
  exportToCSV,
  type Scheme 
} from "@/utils/schemeImporter";

interface AdminSchemeImporterProps {
  existingSchemes: Scheme[];
  onSchemeImport: (schemes: Scheme[]) => void;
}

const AdminSchemeImporter: React.FC<AdminSchemeImporterProps> = ({ 
  existingSchemes, 
  onSchemeImport 
}) => {
  const [csvContent, setCsvContent] = useState("");
  const [jsonContent, setJsonContent] = useState("");
  const [importFormat, setImportFormat] = useState("csv");
  const [previewSchemes, setPreviewSchemes] = useState<Scheme[]>([]);
  const [importedCount, setImportedCount] = useState(0);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const content = event.target?.result as string;
      
      if (importFormat === "csv") {
        setCsvContent(content);
      } else {
        setJsonContent(content);
      }
      
      // Generate preview
      try {
        const imported = importFormat === "csv" 
          ? importFromCSV(content) 
          : importFromJSON(content);
        
        setPreviewSchemes(imported.slice(0, 5)); // Show first 5 schemes as preview
        toast.success(`Processed ${imported.length} schemes from file`);
      } catch (error) {
        toast.error("Failed to process file. Please check the format.");
      }
    };
    
    if (importFormat === "csv") {
      reader.readAsText(file);
    } else {
      reader.readAsText(file);
    }
  };
  
  const handleImport = () => {
    try {
      const imported = importFormat === "csv" 
        ? importFromCSV(csvContent) 
        : importFromJSON(jsonContent);
      
      if (imported.length === 0) {
        toast.error("No valid schemes found in the input");
        return;
      }
      
      const updatedSchemes = addImportedSchemesToExistingArray(
        existingSchemes, 
        imported
      );
      
      onSchemeImport(updatedSchemes);
      setImportedCount(imported.length);
      toast.success(`Successfully imported ${imported.length} schemes`);
      
      // Clear inputs after successful import
      setCsvContent("");
      setJsonContent("");
      setPreviewSchemes([]);
    } catch (error) {
      toast.error("Import failed. Please check your data format.");
    }
  };
  
  const handleExport = () => {
    const csv = exportToCSV(existingSchemes);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schemes_export.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success(`Exported ${existingSchemes.length} schemes to CSV`);
  };
  
  const isValidInput = importFormat === "csv" ? csvContent.trim().length > 0 : jsonContent.trim().length > 0;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Import & Manage Schemes</CardTitle>
        <CardDescription>
          Upload CSV or JSON data to add new schemes to the database
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="csv" value={importFormat} onValueChange={setImportFormat}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="csv">
              <FileText className="mr-2 h-4 w-4" />
              CSV Format
            </TabsTrigger>
            <TabsTrigger value="json">
              <FileText className="mr-2 h-4 w-4" />
              JSON Format
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="csv" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="csv-input">CSV Content</Label>
              <Textarea 
                id="csv-input"
                placeholder="Paste CSV content here or upload a CSV file"
                value={csvContent}
                onChange={e => setCsvContent(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
            
            <div className="text-xs text-gray-500">
              <p>Expected format: <code>id,title,category,eligibility,documents,description,benefits</code></p>
              <p>For documents, use semicolon (;) to separate multiple documents: <code>Aadhaar Card;PAN Card;Bank Statement</code></p>
            </div>
          </TabsContent>
          
          <TabsContent value="json" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="json-input">JSON Content</Label>
              <Textarea 
                id="json-input"
                placeholder="Paste JSON array here or upload a JSON file"
                value={jsonContent}
                onChange={e => setJsonContent(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
            
            <div className="text-xs text-gray-500">
              <p>Expected format: Array of objects with fields:</p>
              <p><code>id, title, category, eligibility, documents (array), description, benefits</code></p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div>
          <div className="flex items-center gap-4">
            <input
              type="file"
              id="scheme-file"
              accept={importFormat === "csv" ? ".csv" : ".json"}
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button 
              variant="outline"
              onClick={() => document.getElementById("scheme-file")?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload File
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleExport}
            >
              <Download className="mr-2 h-4 w-4" />
              Export Current Schemes
            </Button>
          </div>
        </div>
        
        {previewSchemes.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-2">Preview (First 5 Schemes)</h3>
            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {previewSchemes.map(scheme => (
                    <tr key={scheme.id}>
                      <td className="px-4 py-2">{scheme.id}</td>
                      <td className="px-4 py-2">{scheme.title}</td>
                      <td className="px-4 py-2">{scheme.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {importedCount > 0 && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800">Import Successful</AlertTitle>
            <AlertDescription className="text-green-700">
              {importedCount} schemes have been added to the database.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="bg-bloom-purple hover:bg-bloom-purple-dark"
          disabled={!isValidInput}
          onClick={handleImport}
        >
          Import Schemes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminSchemeImporter;
