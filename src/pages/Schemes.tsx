
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, FileCheck, FileText, Upload, AlertCircle, ExternalLink } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import DocumentUploadItem from "@/components/DocumentUploadItem";

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
    title: "Mahila E-Haat",
    category: "Entrepreneurship",
    eligibility: "Women entrepreneurs with products to sell",
    documents: ["Aadhaar Card", "PAN Card", "Business Registration", "Product Details", "Bank Account"],
    description: "Online marketing platform to support women entrepreneurs, artisans, and SHGs.",
    benefits: "Direct market access, zero listing fee, wider customer reach.",
    applicationLink: "https://mahilaehaat.gov.in/"
  },
  {
    id: 7,
    title: "Working Women Hostel Scheme",
    category: "Housing",
    eligibility: "Working women with income below ₹50,000/month",
    documents: ["Aadhaar Card", "Employment Proof", "Income Certificate", "Address Proof"],
    description: "Provides safe and affordable accommodation to working women in urban, semi-urban, and rural areas.",
    benefits: "Subsidized rent, secure living environment, daycare facilities for children.",
    applicationLink: "https://wcd.nic.in/"
  },
  {
    id: 8,
    title: "MUDRA Loan - Shishu, Kishor & Tarun",
    category: "Finance",
    eligibility: "Women entrepreneurs needing capital",
    documents: ["Aadhaar Card", "PAN Card", "Business Proposal", "Bank Account Details"],
    description: "Provides loans for small businesses, trading, and manufacturing activities.",
    benefits: "Loans up to ₹10 lakh, no collateral required, flexible repayment options.",
    applicationLink: "https://www.mudra.org.in/"
  },
  {
    id: 9,
    title: "Annapurna Scheme",
    category: "Finance",
    eligibility: "Women in food catering business",
    documents: ["Aadhaar Card", "PAN Card", "Business License", "Bank Statement"],
    description: "Special loan scheme for women engaged in food catering and related activities.",
    benefits: "Loans up to ₹50,000 at subsidized rates, quick processing.",
    applicationLink: "https://www.sidbi.in/"
  },
  {
    id: 10,
    title: "Mahila Shakti Yojana",
    category: "Education",
    eligibility: "Women aged 18-35 seeking skill development",
    documents: ["Aadhaar Card", "Educational Certificates", "Address Proof"],
    description: "Skill development and training program for women empowerment.",
    benefits: "Free training, stipend during training, job placement assistance.",
    applicationLink: "https://www.skillindia.gov.in/"
  },
  {
    id: 11,
    title: "Deen Dayal Upadhyaya Grameen Kaushalya Yojana",
    category: "Education",
    eligibility: "Rural women from poor families",
    documents: ["Aadhaar Card", "BPL Certificate", "Age Proof", "Address Proof"],
    description: "Placement-linked skill development program for rural youth including women.",
    benefits: "Free training, guaranteed employment, travel and boarding allowance.",
    applicationLink: "https://ddugky.gov.in/"
  },
  {
    id: 12,
    title: "Mahila Coir Yojana",
    category: "Entrepreneurship",
    eligibility: "Women in coir industry",
    documents: ["Aadhaar Card", "PAN Card", "Coir Board Registration", "Bank Account"],
    description: "Financial assistance for women in coir and allied industries.",
    benefits: "Subsidized loans, training support, marketing assistance.",
    applicationLink: "https://coirboard.gov.in/"
  },
  {
    id: 13,
    title: "Stree Shakti Package",
    category: "Finance",
    eligibility: "Women entrepreneurs across all sectors",
    documents: ["Aadhaar Card", "PAN Card", "Business Plan", "Property Documents"],
    description: "Comprehensive financial package for women entrepreneurs by SBI.",
    benefits: "Reduced interest rates, relaxed collateral norms, doorstep banking.",
    applicationLink: "https://www.sbi.co.in/"
  },
  {
    id: 14,
    title: "Pradhan Mantri Matru Vandana Yojana",
    category: "Healthcare",
    eligibility: "Pregnant and lactating women",
    documents: ["Aadhaar Card", "Bank Account Details", "Medical Certificate", "Address Proof"],
    description: "Maternity benefit program for pregnant and lactating mothers.",
    benefits: "Cash incentive of ₹5,000 in three installments, nutrition support.",
    applicationLink: "https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana"
  },
  {
    id: 15,
    title: "Beti Bachao Beti Padhao",
    category: "Education",
    eligibility: "Parents of girl children",
    documents: ["Child's Birth Certificate", "Parent's ID Proof", "School Enrollment Certificate"],
    description: "Initiative to generate awareness and improve efficiency of welfare services for girls.",
    benefits: "Educational scholarships, awareness programs, improved child sex ratio.",
    applicationLink: "https://wcd.nic.in/bbbp-scheme"
  },
  {
    id: 16,
    title: "Swayamsidha Scheme",
    category: "Finance",
    eligibility: "Women in rural areas for microfinance",
    documents: ["Aadhaar Card", "Income Certificate", "Group Formation Certificate"],
    description: "Integrated scheme for empowerment of women through formation of SHGs.",
    benefits: "Microcredit facilities, capacity building, income generation activities.",
    applicationLink: "https://www.nrlm.gov.in/"
  },
  {
    id: 17,
    title: "Kishori Shakti Yojana",
    category: "Healthcare",
    eligibility: "Adolescent girls aged 11-18 years",
    documents: ["Aadhaar Card", "Age Proof Certificate", "School Certificate"],
    description: "Holistic development program for adolescent girls focusing on nutrition and health.",
    benefits: "Nutritional support, health checkups, life skills training.",
    applicationLink: "https://icds-wcd.nic.in/"
  },
  {
    id: 18,
    title: "Support to Training and Employment Programme for Women",
    category: "Education",
    eligibility: "Women seeking employment and skill training",
    documents: ["Aadhaar Card", "Educational Qualification Certificate", "Address Proof"],
    description: "Skill development and employment generation program for women.",
    benefits: "Free training, employment guarantee, stipend during training period.",
    applicationLink: "https://wcd.nic.in/"
  },
  {
    id: 19,
    title: "Rajiv Gandhi Scheme for Empowerment of Adolescent Girls",
    category: "Healthcare",
    eligibility: "Out-of-school adolescent girls aged 11-18",
    documents: ["Aadhaar Card", "Age Certificate", "Income Certificate"],
    description: "Comprehensive package for adolescent girls including nutrition, health, and life skills.",
    benefits: "Nutritional support, health services, vocational training, life skills education.",
    applicationLink: "https://wcd.nic.in/"
  },
  {
    id: 20,
    title: "Ujjwala Yojana for Women",
    category: "Housing",
    eligibility: "Women from BPL families",
    documents: ["Aadhaar Card", "BPL Certificate", "Bank Account Details", "Address Proof"],
    description: "Free LPG connections to women from Below Poverty Line households.",
    benefits: "Free LPG connection, EMI facility for cylinders and stoves.",
    applicationLink: "https://www.pmujjwalayojana.com/"
  },
  {
    id: 21,
    title: "National Scheme of Incentive to Girls for Secondary Education (NSIGSE)",
    category: "Education",
    eligibility: "Girls from SC/ST communities and Kasturba Gandhi Balika Vidyalayas who pass class VIII and enroll in class IX in Government schools.",
    documents: ["Aadhaar Card", "Bank Account Details", "Caste certificate (for SC/ST)", "Class 8 pass certificate", "School enrollment proof (Class IX)"],
    description: "Incentive scheme promoting secondary education for underprivileged girl students.",
    benefits: "Rs. 3000/- fixed deposit, accessible at age 18 after passing Class X.",
    applicationLink: "https://scholarships.gov.in/"
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
    setUploadedFiles([]);
    setVerificationResults(null);
    setVerificationStatus("idle");
  };

  const toggleDocument = (document: string) => {
    if (availableDocuments.includes(document)) {
      setAvailableDocuments(availableDocuments.filter(doc => doc !== document));
    } else {
      setAvailableDocuments([...availableDocuments, document]);
    }
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
              education, healthcare, and entrepreneurship. Upload documents for AI-powered verification.
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
                      <p className="text-gray-700 mb-4">{scheme.description}</p>
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900">Benefits:</h4>
                        <p className="text-gray-700">{scheme.benefits}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <FileText className="h-4 w-4" />
                        {scheme.documents.length} documents required for verification
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center flex-wrap gap-4">
                      <Button 
                        variant="outline" 
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(scheme.applicationLink, '_blank');
                        }}
                        className="border-bloom-purple text-bloom-purple hover:bg-bloom-purple hover:text-white"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Official Link
                      </Button>
                      <Button className="bg-bloom-purple hover:bg-bloom-purple-dark">
                        Verify Documents & Apply
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
                        <CardDescription>AI-powered document verification and application process</CardDescription>
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
                                    Upload your {doc} for AI verification to ensure authenticity.
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
                                Document Verification Status
                              </h3>
                              <p className="text-gray-700 mt-1">
                                {documentStatus.message}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Upload & Verify Documents</h3>
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                              <div className="text-sm">
                                <p className="font-medium text-blue-800">Powered by Gemini AI</p>
                                <p className="text-blue-700 mt-1">
                                  Upload each document individually and verify it with AI to ensure authenticity
                                  and quality before application.
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Schemes;
