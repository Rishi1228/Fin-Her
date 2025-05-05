import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, FileCheck, FileText, Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import DocumentUploader from "@/components/DocumentUploader";
import DocumentVerifier from "@/components/DocumentVerifier";

// Mock data for schemes
const SCHEMES = [
  {
    id: 1,
    title: "Pradhan Mantri Mahila Shakti Kendra Scheme",
    category: "Entrepreneurship",
    eligibility: "Women entrepreneurs aged 18-45",
    documents: ["Aadhaar Card", "PAN Card", "Business Plan", "Bank Statement"],
    description: "Financial assistance and support for women entrepreneurs to start and scale their businesses.",
    benefits: "Up to ₹5 lakh grant, business mentorship, and networking opportunities."
  },
  {
    id: 2,
    title: "Mahila Samman Savings Certificate",
    category: "Savings",
    eligibility: "All women, no age restriction",
    documents: ["Aadhaar Card", "PAN Card", "Proof of Address", "Bank Account Details"],
    description: "Special savings scheme with higher interest rates for women to promote financial independence.",
    benefits: "8.2% interest rate, tax benefits, flexible tenure options."
  },
  {
    id: 3,
    title: "Mahila Udyam Nidhi Scheme",
    category: "Entrepreneurship",
    eligibility: "Women entrepreneurs starting new projects",
    documents: ["Aadhaar Card", "PAN Card", "Business Proposal", "Bank Statement", "Property Documents"],
    description: "Loan scheme to encourage women to start their own ventures with lower interest rates.",
    benefits: "Loans up to ₹10 lakh at 8% interest rate, repayment period of 10 years."
  },
  {
    id: 4,
    title: "Sukanya Samriddhi Yojana",
    category: "Education",
    eligibility: "Parents of girl child below 10 years",
    documents: ["Child's Birth Certificate", "Parent's ID Proof", "Address Proof"],
    description: "Government-backed savings scheme for girl child education and marriage expenses.",
    benefits: "8.6% interest rate, tax exemption under 80C, 21-year maturity period."
  },
  {
    id: 5,
    title: "Stand Up India Scheme for Women",
    category: "Entrepreneurship",
    eligibility: "Women starting greenfield enterprises",
    documents: ["Aadhaar Card", "PAN Card", "Business Plan", "Project Report", "Collateral Documents"],
    description: "Facilitates bank loans between ₹10 lakh and ₹1 Crore for women entrepreneurs.",
    benefits: "Composite loan, low interest rates, minimal margin money requirements."
  },
  {
    id: 6,
    title: "Mahila E-Haat",
    category: "Entrepreneurship",
    eligibility: "Women entrepreneurs with products to sell",
    documents: ["Aadhaar Card", "PAN Card", "Business Registration", "Product Details", "Bank Account"],
    description: "Online marketing platform to support women entrepreneurs, artisans, and SHGs.",
    benefits: "Direct market access, zero listing fee, wider customer reach."
  },
  {
    id: 7,
    title: "Working Women Hostel Scheme",
    category: "Housing",
    eligibility: "Working women with income below ₹50,000/month",
    documents: ["Aadhaar Card", "Employment Proof", "Income Certificate", "Address Proof"],
    description: "Provides safe and affordable accommodation to working women in urban, semi-urban, and rural areas.",
    benefits: "Subsidized rent, secure living environment, daycare facilities for children."
  },
  {
    id: 8,
    title: "MUDRA Loan - Shishu, Kishor & Tarun",
    category: "Finance",
    eligibility: "Women entrepreneurs needing capital",
    documents: ["Aadhaar Card", "PAN Card", "Business Proposal", "Bank Account Details"],
    description: "Provides loans for small businesses, trading, and manufacturing activities.",
    benefits: "Loans up to ₹10 lakh, no collateral required, flexible repayment options."
  }
];

// Categories
const CATEGORIES = ["All", "Entrepreneurship", "Savings", "Education", "Finance", "Housing", "Healthcare"];

// Age groups
const AGE_GROUPS = ["18-25", "26-35", "36-45", "46-60", "60+"];

// Income ranges
const INCOME_RANGES = ["Below ₹3 lakh", "₹3-5 lakh", "₹5-10 lakh", "Above ₹10 lakh"];

const Schemes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [ageGroup, setAgeGroup] = useState("");
  const [incomeRange, setIncomeRange] = useState("");
  const [filteredSchemes, setFilteredSchemes] = useState(SCHEMES);
  const [activeTab, setActiveTab] = useState("search");
  const [selectedScheme, setSelectedScheme] = useState<any>(null);
  const [availableDocuments, setAvailableDocuments] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verifying" | "complete">("idle");
  const [verificationResults, setVerificationResults] = useState<any>(null);

  const handleSearch = () => {
    const filtered = SCHEMES.filter((scheme) => {
      const matchesSearch = searchTerm === "" || 
        scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === "All" || scheme.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredSchemes(filtered);
  };

  const handleSchemeSelect = (scheme: any) => {
    setSelectedScheme(scheme);
    setActiveTab("documents");
    // Reset available documents
    setAvailableDocuments([]);
  };

  const toggleDocument = (document: string) => {
    if (availableDocuments.includes(document)) {
      setAvailableDocuments(availableDocuments.filter(doc => doc !== document));
    } else {
      setAvailableDocuments([...availableDocuments, document]);
    }
  };

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
    toast.success(`${files.length} document${files.length > 1 ? 's' : ''} uploaded successfully`);
  };

  const handleVerifyDocuments = async () => {
    if (uploadedFiles.length === 0 || !selectedScheme) {
      toast.error("Please upload documents and select a scheme first");
      return;
    }
    
    setVerificationStatus("verifying");
    
    // Simulate AI verification process
    setTimeout(() => {
      const requiredDocs = selectedScheme.documents;
      const results = {
        verified: true,
        matchedDocuments: uploadedFiles.map((file, index) => ({
          fileName: file.name,
          matched: requiredDocs[index % requiredDocs.length],
          valid: Math.random() > 0.3
        }))
      };
      
      setVerificationResults(results);
      setVerificationStatus("complete");
      
      // Update available documents based on verification
      const validDocs = results.matchedDocuments
        .filter(doc => doc.valid)
        .map(doc => doc.matched);
        
      setAvailableDocuments(validDocs);
      
      toast.success("Document verification completed");
    }, 2000);
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
        message: "You have all required documents! You're ready to apply."
      };
    } else if (percentage >= 75) {
      return {
        status: "almost",
        message: "You have most of the documents. Gather the remaining few to complete your application."
      };
    } else if (percentage >= 50) {
      return {
        status: "partial",
        message: "You have some of the required documents. Continue collecting the rest."
      };
    } else {
        return {
        status: "incomplete",
        message: "You need to gather most of the required documents before applying."
      };
    }
  };

  const documentStatus = getDocumentStatus();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-5xl text-bloom-purple-dark mb-3 md:mb-4">
              Government Schemes for Women
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Find and apply for government schemes designed to support women's financial growth, 
              education, healthcare, and entrepreneurship.
            </p>
          </div>
          
          <Tabs defaultValue="search" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-6 md:mb-8">
              <TabsTrigger value="search" className="text-base md:text-lg py-2 md:py-3">
                <Search className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Search Schemes
              </TabsTrigger>
              <TabsTrigger value="documents" className="text-base md:text-lg py-2 md:py-3">
                <FileCheck className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Document Verification
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="search" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Find Matching Schemes</CardTitle>
                  <CardDescription>
                    Enter your details to find schemes that match your profile and needs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Search by keywords..."
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="age-group">Age Group</Label>
                      <Select value={ageGroup} onValueChange={setAgeGroup}>
                        <SelectTrigger id="age-group">
                          <SelectValue placeholder="Select age group" />
                        </SelectTrigger>
                        <SelectContent>
                          {AGE_GROUPS.map((age) => (
                            <SelectItem key={age} value={age}>{age}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="income-range">Annual Income</Label>
                      <Select value={incomeRange} onValueChange={setIncomeRange}>
                        <SelectTrigger id="income-range">
                          <SelectValue placeholder="Select income range" />
                        </SelectTrigger>
                        <SelectContent>
                          {INCOME_RANGES.map((income) => (
                            <SelectItem key={income} value={income}>{income}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="occupation">Occupation</Label>
                      <Select>
                        <SelectTrigger id="occupation">
                          <SelectValue placeholder="Select occupation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="employed">Employed</SelectItem>
                          <SelectItem value="self-employed">Self-employed</SelectItem>
                          <SelectItem value="homemaker">Homemaker</SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 gap-6 mt-8">
                {filteredSchemes.map((scheme) => (
                  <Card key={scheme.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleSchemeSelect(scheme)}>
                    <CardHeader>
                      <div className="flex justify-between items-start flex-wrap gap-4">
                        <div>
                          <CardTitle className="text-xl text-bloom-purple-dark">{scheme.title}</CardTitle>
                          <CardDescription className="mt-1">{scheme.eligibility}</CardDescription>
                        </div>
                        <Badge className="bg-bloom-teal hover:bg-bloom-teal">{scheme.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{scheme.description}</p>
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900">Benefits:</h4>
                        <p className="text-gray-700">{scheme.benefits}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center flex-wrap gap-4">
                      <div className="text-sm text-gray-500">
                        {scheme.documents.length} documents required
                      </div>
                      <Button className="bg-bloom-purple hover:bg-bloom-purple-dark">
                        Check Eligibility
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                
                {filteredSchemes.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No schemes found matching your criteria.</p>
                    <Button variant="link" onClick={() => {
                      setSearchTerm("");
                      setCategoryFilter("All");
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
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <CardTitle className="text-xl text-bloom-purple-dark">{selectedScheme.title}</CardTitle>
                        <CardDescription>Document verification guide</CardDescription>
                      </div>
                      <Badge className="bg-bloom-teal hover:bg-bloom-teal">{selectedScheme.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Required Documents</h3>
                          <ul className="space-y-4">
                            {selectedScheme.documents.map((doc: string, index: number) => (
                              <li key={index} className="flex items-center gap-4">
                                <Checkbox 
                                  id={`doc-${index}`} 
                                  checked={availableDocuments.includes(doc)}
                                  onCheckedChange={() => toggleDocument(doc)}
                                />
                                <div className="flex-1">
                                  <Label 
                                    htmlFor={`doc-${index}`}
                                    className={`font-medium ${availableDocuments.includes(doc) ? 'text-bloom-purple line-through' : 'text-gray-900'}`}
                                  >
                                    {doc}
                                  </Label>
                                  <p className="text-sm text-gray-500">
                                    Make sure your {doc} is valid and not expired.
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                          
                          {documentStatus && (
                            <div className={`mt-6 p-4 rounded-lg ${
                              documentStatus.status === 'complete' ? 'bg-green-50 border border-green-200' :
                              documentStatus.status === 'almost' ? 'bg-blue-50 border border-blue-200' :
                              documentStatus.status === 'partial' ? 'bg-yellow-50 border border-yellow-200' :
                              'bg-red-50 border border-red-200'
                            }`}>
                              <h3 className={`font-medium ${
                                documentStatus.status === 'complete' ? 'text-green-800' :
                                documentStatus.status === 'almost' ? 'text-blue-800' :
                                documentStatus.status === 'partial' ? 'text-yellow-800' :
                                'text-red-800'
                              }`}>
                                Document Status
                              </h3>
                              <p className="text-gray-700">
                                {documentStatus.message}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">AI Document Verification</h3>
                          <DocumentUploader onFilesUploaded={handleFileUpload} />
                          
                          {uploadedFiles.length > 0 && (
                            <div className="mt-4">
                              <h4 className="font-medium text-gray-900 mb-2">Uploaded Documents</h4>
                              <ul className="space-y-2">
                                {uploadedFiles.map((file, index) => (
                                  <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                    <FileText className="h-4 w-4 text-bloom-purple" />
                                    {file.name}
                                  </li>
                                ))}
                              </ul>
                              
                              <Button 
                                onClick={handleVerifyDocuments}
                                disabled={verificationStatus === "verifying"} 
                                className="mt-4 bg-bloom-purple hover:bg-bloom-purple-dark"
                              >
                                {verificationStatus === "verifying" 
                                  ? "Verifying..." 
                                  : verificationStatus === "complete" 
                                    ? "Verify Again" 
                                    : "Verify Documents"
                                }
                              </Button>
                            </div>
                          )}
                          
                          {verificationResults && (
                            <DocumentVerifier results={verificationResults} />
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Application Process</h3>
                        <ol className="space-y-3 ml-6 list-decimal">
                          <li className="text-gray-700">Gather all the required documents listed above</li>
                          <li className="text-gray-700">Upload them for AI verification to ensure they're valid</li>
                          <li className="text-gray-700">Fill out the application form with accurate information</li>
                          <li className="text-gray-700">Submit the application and wait for processing</li>
                          <li className="text-gray-700">Track your application status through your account</li>
                        </ol>
                      </div>
                      
                      <div className="bg-bloom-peach p-4 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-1">Pro Tip</h3>
                        <p className="text-gray-700">
                          Our AI verification system can help detect issues with your documents before submission,
                          increasing your chances of approval and reducing processing time.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
                    <Button variant="outline" onClick={() => setActiveTab("search")}>
                      Back to Search
                    </Button>
                    <Button className="bg-bloom-purple hover:bg-bloom-purple-dark">
                      {documentStatus?.status === 'complete' ? 'Apply Now' : 'Save Scheme Information'}
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card className="py-12">
                  <CardContent className="text-center">
                    <p className="text-gray-500 mb-4">Please select a scheme from search results to view document requirements.</p>
                    <Button variant="secondary" onClick={() => setActiveTab("search")}>
                      Go to Search
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Schemes;
