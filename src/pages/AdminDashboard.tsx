
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminSchemeImporter from "@/components/AdminSchemeImporter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Scheme } from "@/utils/schemeImporter";

// Mock schemes data
const initialSchemes = [
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
  }
];

const AdminDashboard = () => {
  const [schemes, setSchemes] = useState<Scheme[]>(initialSchemes);

  const handleSchemesImport = (updatedSchemes: Scheme[]) => {
    setSchemes(updatedSchemes);
    toast.success(`Successfully updated schemes. Total: ${updatedSchemes.length}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-bloom-purple-dark">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage schemes, users, and content
            </p>
          </div>
          
          <Tabs defaultValue="schemes" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="schemes">Schemes Management</TabsTrigger>
              <TabsTrigger value="users">Users Management</TabsTrigger>
              <TabsTrigger value="content">Content Management</TabsTrigger>
            </TabsList>
            
            <TabsContent value="schemes" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Current Schemes</CardTitle>
                  <CardDescription>
                    You currently have {schemes.length} schemes in the database
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Documents Required
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {schemes.map((scheme) => (
                          <tr key={scheme.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {scheme.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {scheme.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {scheme.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {scheme.documents.length}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              <AdminSchemeImporter 
                existingSchemes={schemes} 
                onSchemeImport={handleSchemesImport}
              />
            </TabsContent>
            
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage registered users and permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">User management features are under development.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Content Management</CardTitle>
                  <CardDescription>
                    Manage educational content and resources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Content management features are under development.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
