
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Search, FileCheck, FileText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

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
  }
];

const SchemeSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [filteredSchemes, setFilteredSchemes] = useState(SCHEMES);
  const [activeTab, setActiveTab] = useState("search");
  const [selectedScheme, setSelectedScheme] = useState<any>(null);

  const handleSearch = () => {
    const filtered = SCHEMES.filter((scheme) => {
      const matchesSearch = searchTerm === "" || 
        scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === "" || scheme.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredSchemes(filtered);
  };

  const handleSchemeSelect = (scheme: any) => {
    setSelectedScheme(scheme);
    setActiveTab("documents");
  };

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
              <CardContent className="space-y-4">
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
                        <SelectItem value="">All Categories</SelectItem>
                        <SelectItem value="Entrepreneurship">Entrepreneurship</SelectItem>
                        <SelectItem value="Savings">Savings</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleSearch} className="bg-bloom-purple hover:bg-bloom-purple-dark">
                    Search
                  </Button>
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
                      <CardDescription>Document verification guide</CardDescription>
                    </div>
                    <Badge className="bg-bloom-teal hover:bg-bloom-teal">{selectedScheme.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Required Documents</h3>
                      <ul className="space-y-4">
                        {selectedScheme.documents.map((doc: string, index: number) => (
                          <li key={index} className="flex items-start gap-4">
                            <div className="p-2 rounded-full bg-bloom-softPurple">
                              <FileText className="h-5 w-5 text-bloom-purple" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{doc}</h4>
                              <p className="text-sm text-gray-500">
                                Make sure your {doc} is valid and not expired. A clear scan or photo will be required.
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Application Process</h3>
                      <ol className="space-y-3 ml-6 list-decimal">
                        <li className="text-gray-700">Gather all the required documents listed above</li>
                        <li className="text-gray-700">Visit the official website or nearest center for application</li>
                        <li className="text-gray-700">Fill out the application form with accurate information</li>
                        <li className="text-gray-700">Upload or submit scanned copies of all documents</li>
                        <li className="text-gray-700">Submit the application and wait for verification</li>
                      </ol>
                    </div>
                    
                    <div className="bg-bloom-peach p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-1">Pro Tip</h3>
                      <p className="text-gray-700">
                        Keep digital copies of all your documents in a secure cloud storage for 
                        easy access. Always check the expiry dates of your identification documents.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
                  <Button variant="outline" onClick={() => setActiveTab("search")}>
                    Back to Search
                  </Button>
                  <Button className="bg-bloom-purple hover:bg-bloom-purple-dark">
                    Save Scheme Information
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
    </section>
  );
};

export default SchemeSearch;
