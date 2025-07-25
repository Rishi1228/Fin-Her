
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Search, FileCheck, FileText, Upload, AlertCircle, ExternalLink } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { toast } from "@/hooks/use-toast";
import DocumentUploadItem from "./DocumentUploadItem";

// Expanded mock data for schemes with more variety
const SCHEMES = [
  {
    id: 1,
    title: "Pradhan Mantri Mahila Shakti Kendra Scheme",
    category: "Entrepreneurship",
    eligibility: "Women entrepreneurs aged 18-45",
    documents: ["Aadhaar Card", "PAN Card", "Business Plan", "Bank Statement"],
    description: "Financial assistance and support for women entrepreneurs to start and scale their businesses.",
    benefits: "Up to ₹5 lakh grant, business mentorship, and networking opportunities.",
    applicationLink: "https://www.nrlm.gov.in/mahilashakti"
  },
  {
    id: 2,
    title: "Mahila Samman Savings Certificate",
    category: "Savings",
    eligibility: "All women, no age restriction",
    documents: ["Aadhaar Card", "PAN Card", "Proof of Address", "Bank Account Details"],
    description: "Special savings scheme with higher interest rates for women to promote financial independence.",
    benefits: "8.2% interest rate, tax benefits, flexible tenure options.",
    applicationLink: "https://www.indiapost.gov.in/vas/pages/IndiaPostHome.aspx"
  },
  {
    id: 3,
    title: "Mahila Udyam Nidhi Scheme",
    category: "Entrepreneurship",
    eligibility: "Women entrepreneurs starting new projects",
    documents: ["Aadhaar Card", "PAN Card", "Business Proposal", "Bank Statement", "Property Documents"],
    description: "Loan scheme to encourage women to start their own ventures with lower interest rates.",
    benefits: "Loans up to ₹10 lakh at 8% interest rate, repayment period of 10 years.",
    applicationLink: "https://www.sidbi.in/"
  },
  {
    id: 4,
    title: "Sukanya Samriddhi Yojana",
    category: "Education",
    eligibility: "Parents of girl child below 10 years",
    documents: ["Child's Birth Certificate", "Parent's ID Proof", "Address Proof"],
    description: "Government-backed savings scheme for girl child education and marriage expenses.",
    benefits: "8.6% interest rate, tax exemption under 80C, 21-year maturity period.",
    applicationLink: "https://www.nsiindia.gov.in/"
  },
  {
    id: 5,
    title: "Stand Up India Scheme for Women",
    category: "Entrepreneurship",
    eligibility: "Women starting greenfield enterprises",
    documents: ["Aadhaar Card", "PAN Card", "Business Plan", "Project Report", "Collateral Documents"],
    description: "Facilitates bank loans between ₹10 lakh and ₹1 Crore for women entrepreneurs.",
    benefits: "Composite loan, low interest rates, minimal margin money requirements.",
    applicationLink: "https://www.standupmitra.in/"
  },
  {
    id: 6,
    title: "Working Women Hostel Scheme",
    category: "Housing",
    eligibility: "Working women with income below ₹50,000/month",
    documents: ["Aadhaar Card", "Employment Proof", "Income Certificate", "Address Proof"],
    description: "Provides safe and affordable accommodation to working women in urban, semi-urban, and rural areas.",
    benefits: "Subsidized rent, secure living environment, daycare facilities for children.",
    applicationLink: "https://wcd.nic.in/"
  },
  {
    id: 7,
    title: "MUDRA Loan - Shishu, Kishor & Tarun",
    category: "Finance",
    eligibility: "Women entrepreneurs needing capital",
    documents: ["Aadhaar Card", "PAN Card", "Business Proposal", "Bank Account Details"],
    description: "Provides loans for small businesses, trading, and manufacturing activities.",
    benefits: "Loans up to ₹10 lakh, no collateral required, flexible repayment options.",
    applicationLink: "https://www.mudra.org.in/"
  },
  {
    id: 8,
    title: "Pradhan Mantri Matru Vandana Yojana",
    category: "Healthcare",
    eligibility: "Pregnant and lactating women",
    documents: ["Aadhaar Card", "Bank Account Details", "Medical Certificate", "Address Proof"],
    description: "Maternity benefit program for pregnant and lactating mothers.",
    benefits: "Cash incentive of ₹5,000 in three installments, nutrition support.",
    applicationLink: "https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana"
  }
];

// Categories
const CATEGORIES = ["All", "Entrepreneurship", "Savings", "Education", "Finance", "Housing", "Healthcare"];

// Age groups
const AGE_GROUPS = ["18-25", "26-35", "36-45", "46-60", "60+"];

// Income ranges
const INCOME_RANGES = ["Below ₹3 lakh", "₹3-5 lakh", "₹5-10 lakh", "Above ₹10 lakh"];

const SchemeSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [ageGroup, setAgeGroup] = useState("");
  const [incomeRange, setIncomeRange] = useState("");
  const [filteredSchemes, setFilteredSchemes] = useState(SCHEMES);
  const [activeTab, setActiveTab] = useState("search");
  const [selectedScheme, setSelectedScheme] = useState<any>(null);
  const [availableDocuments, setAvailableDocuments] = useState<string[]>([]);
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verifying" | "complete">("idle");

  const handleSearch = () => {
    const filtered = SCHEMES.filter((scheme) => {
      const matchesSearch = searchTerm === "" || 
        scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.benefits.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === "All" || scheme.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredSchemes(filtered);
  };

  const handleSchemeSelect = (scheme: any) => {
    setSelectedScheme(scheme);
    setActiveTab("documents");
    // Reset verification state
    setAvailableDocuments([]);
    setVerificationStatus("idle");
  };

  const handleDocumentUpload = (documentType: string, uploadData: any) => {
    // Handle successful document upload
    toast({
      title: "Upload Successful",
      description: `${documentType} uploaded successfully`,
    });
  };

  const handleDocumentVerification = (documentType: string, verificationData: any) => {
    // Handle verification completion
    if (verificationData.valid) {
      setAvailableDocuments(prev => 
        prev.includes(documentType) ? prev : [...prev, documentType]
      );
      toast({
        title: "Verification Successful",
        description: `${documentType} verified successfully`,
      });
    } else {
      toast({
        title: "Verification Failed",
        description: `${documentType} verification failed`,
        variant: "destructive"
      });
    }
  };

  const getDocumentStatus = () => {
    if (!selectedScheme) return null;
    
    const totalRequired = selectedScheme.documents.length;
    const totalAvailable = selectedScheme.documents.filter(
      (doc: string) => availableDocuments.includes(doc)
    ).length;
    
    const percentage = Math.round((totalAvailable / totalRequired) * 100);
    
    if (percentage === 100) {
      return {
        status: "complete",
        message: "You have all required documents verified! You're ready to apply."
      };
    } else if (percentage >= 75) {
      return {
        status: "almost",
        message: "You have most of the documents verified. Upload and verify the remaining few to complete your application."
      };
    } else if (percentage >= 50) {
      return {
        status: "partial",
        message: "You have some of the required documents verified. Continue uploading and verifying the rest."
      };
    } else {
        return {
        status: "incomplete",
        message: "You need to upload and verify most of the required documents before applying."
      };
    }
  };

  const documentStatus = getDocumentStatus();

  return (
    <section id="scheme-search" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-bloom-purple-dark mb-4">
            Find the Right Financial Schemes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover government schemes tailored to your needs and verify 
            required documents for easy application.
          </p>
        </div>
        
        <Tabs defaultValue="search" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="search" className="text-lg py-3">
              <Search className="mr-2 h-5 w-5" />
              Search Schemes
            </TabsTrigger>
            <TabsTrigger value="documents" className="text-lg py-3">
              <FileCheck className="mr-2 h-5 w-5" />
              Document Verification
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="search" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Search Parameters</CardTitle>
                <CardDescription>
                  Enter keywords and filters to find relevant schemes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by keywords (scheme name, benefits, etc.)..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-full md:w-48">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleSearch} className="bg-bloom-purple hover:bg-bloom-purple-dark">
                    Search
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age-group" className="text-sm font-medium text-gray-700 mb-2 block">
                      Age Group
                    </Label>
                    <Select value={ageGroup} onValueChange={setAgeGroup}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select age group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any age</SelectItem>
                        {AGE_GROUPS.map((age) => (
                          <SelectItem key={age} value={age}>{age}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="income-range" className="text-sm font-medium text-gray-700 mb-2 block">
                      Income Range
                    </Label>
                    <Select value={incomeRange} onValueChange={setIncomeRange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select income range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any income</SelectItem>
                        {INCOME_RANGES.map((income) => (
                          <SelectItem key={income} value={income}>{income}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {filteredSchemes.map((scheme) => (
                <Card key={scheme.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleSchemeSelect(scheme)}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl text-bloom-purple-dark">{scheme.title}</CardTitle>
                      <Badge className="bg-bloom-teal hover:bg-bloom-teal">{scheme.category}</Badge>
                    </div>
                    <CardDescription>{scheme.eligibility}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{scheme.description}</p>
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-900">Benefits:</h4>
                      <p className="text-gray-700">{scheme.benefits}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-gray-500">
                      {scheme.documents.length} documents required
                    </div>
                    <Button variant="outline" className="border-bloom-purple text-bloom-purple hover:bg-bloom-purple hover:text-white">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {filteredSchemes.length === 0 && (
                <div className="col-span-2 text-center py-12">
                  <p className="text-gray-500">No schemes found matching your criteria.</p>
                  <Button variant="link" onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("");
                    setFilteredSchemes(SCHEMES);
                  }}>
                    Reset Search
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
           <TabsContent value="documents">
             {selectedScheme ? (
               <Card>
                 <CardHeader>
                   <div className="flex items-center justify-between">
                     <div>
                       <CardTitle className="text-xl text-bloom-purple-dark">{selectedScheme.title}</CardTitle>
                       <CardDescription>Upload and verify documents with AI</CardDescription>
                     </div>
                     <Badge className="bg-bloom-teal hover:bg-bloom-teal">{selectedScheme.category}</Badge>
                   </div>
                 </CardHeader>
                 <CardContent>
                   <div className="space-y-6">
                     <div>
                       <div className="mb-6">
                         <h3 className="text-lg font-medium text-gray-900 mb-2">Document Verification Status</h3>
                         <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                           <div className="flex items-center justify-between mb-2">
                             <span className="text-sm font-medium text-gray-700">
                               Progress: {selectedScheme.documents.filter((doc: string) => availableDocuments.includes(doc)).length} of {selectedScheme.documents.length} documents verified
                             </span>
                             <span className="text-sm font-medium text-gray-900">
                               {Math.round((selectedScheme.documents.filter((doc: string) => availableDocuments.includes(doc)).length / selectedScheme.documents.length) * 100)}%
                             </span>
                           </div>
                           <div className="w-full bg-gray-200 rounded-full h-2">
                             <div 
                               className="bg-bloom-purple h-2 rounded-full transition-all duration-300" 
                               style={{ 
                                 width: `${(selectedScheme.documents.filter((doc: string) => availableDocuments.includes(doc)).length / selectedScheme.documents.length) * 100}%` 
                               }}
                             />
                           </div>
                           {documentStatus && (
                             <div className={`mt-3 p-3 rounded-lg ${
                               documentStatus.status === 'complete' ? 'bg-green-50 border border-green-200' :
                               documentStatus.status === 'almost' ? 'bg-yellow-50 border border-yellow-200' :
                               documentStatus.status === 'partial' ? 'bg-blue-50 border border-blue-200' :
                               'bg-red-50 border border-red-200'
                             }`}>
                               <h3 className={`font-medium ${
                                 documentStatus.status === 'complete' ? 'text-green-800' :
                                 documentStatus.status === 'almost' ? 'text-yellow-800' :
                                 documentStatus.status === 'partial' ? 'text-blue-800' :
                                 'text-red-800'
                               }`}>
                                 {documentStatus.status === 'complete' ? 'Ready to Apply!' :
                                  documentStatus.status === 'almost' ? 'Almost There!' :
                                  documentStatus.status === 'partial' ? 'Good Progress!' :
                                  'Getting Started'}
                               </h3>
                               <p className="text-gray-700 mt-1">
                                 {documentStatus.message}
                               </p>
                             </div>
                           )}
                         </div>
                         
                         <div className="space-y-4 mt-6">
                           {selectedScheme.documents.map((documentType: string, index: number) => (
                             <DocumentUploadItem
                               key={`${selectedScheme.id}-${documentType}-${index}`}
                               documentType={documentType}
                               schemeId={selectedScheme.id}
                               onUploadComplete={handleDocumentUpload}
                               onVerificationComplete={handleDocumentVerification}
                             />
                           ))}
                         </div>
                       </div>
                       
                       <div>
                         <h3 className="text-lg font-medium text-gray-900 mb-2">Application Process</h3>
                         <ol className="space-y-3 ml-6 list-decimal">
                           <li className="text-gray-700">Search and select the scheme that matches your needs</li>
                           <li className="text-gray-700">Upload all required documents for AI verification</li>
                           <li className="text-gray-700">Ensure all documents are verified as authentic</li>
                           <li className="text-gray-700">Click "Apply Now" to visit the official application portal</li>
                           <li className="text-gray-700">Fill the application form with accurate information</li>
                           <li className="text-gray-700">Submit your verified documents along with the application</li>
                         </ol>
                       </div>
                       
                       <div className="bg-bloom-peach p-4 rounded-lg">
                         <h3 className="font-medium text-gray-900 mb-1">Smart Verification Benefits</h3>
                         <p className="text-gray-700">
                           Our AI verification system helps detect document issues before submission,
                           reducing application rejection rates and speeding up the approval process.
                           Only verified documents ensure successful scheme applications.
                         </p>
                       </div>
                     </div>
                   </div>
                 </CardContent>
                 <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
                   <Button variant="outline" onClick={() => setActiveTab("search")}>
                     Back to Search
                   </Button>
                   <div className="flex gap-2">
                     <Button 
                       variant="outline"
                       onClick={() => window.open(selectedScheme.applicationLink, '_blank')}
                       className="border-bloom-purple text-bloom-purple hover:bg-bloom-purple hover:text-white"
                     >
                       <ExternalLink className="h-4 w-4 mr-2" />
                       Official Application Link
                     </Button>
                     <Button 
                       className="bg-bloom-purple hover:bg-bloom-purple-dark"
                       disabled={documentStatus?.status !== 'complete'}
                       onClick={() => window.open(selectedScheme.applicationLink, '_blank')}
                     >
                       {documentStatus?.status === 'complete' ? 'Apply Now' : 'Complete Verification First'}
                     </Button>
                   </div>
                 </CardFooter>
               </Card>
             ) : (
               <Card className="py-12">
                 <CardContent className="text-center">
                   <p className="text-gray-500 mb-4">Please select a scheme from search results to verify documents and apply.</p>
                   <Button variant="secondary" onClick={() => setActiveTab("search")}>
                     Go to Search
                   </Button>
                 </CardContent>
               </Card>
             )}
           </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default SchemeSearch;
