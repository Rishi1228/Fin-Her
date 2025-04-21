
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const educationResources = [
  {
    title: "Understanding Personal Finance Basics",
    category: "Beginner",
    description: "Learn the fundamentals of budgeting, saving, and managing personal finances effectively.",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
  },
  {
    title: "Investment Strategies for Women",
    category: "Intermediate",
    description: "Discover investment approaches that align with women's unique financial goals and life circumstances.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80"
  },
  {
    title: "Tax Benefits for Women in India",
    category: "Specialized",
    description: "Explore tax deductions, exemptions, and benefits specifically available to women taxpayers.",
    imageUrl: "https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80"
  },
  {
    title: "Building an Emergency Fund",
    category: "Beginner",
    description: "Learn how to build a safety net for unexpected expenses and financial emergencies.",
    imageUrl: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
  },
  {
    title: "Retirement Planning for Women",
    category: "Advanced",
    description: "Comprehensive guide to planning for retirement considering women's unique career patterns.",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
  },
  {
    title: "Guide to Government Schemes",
    category: "Intermediate",
    description: "Detailed overview of government schemes and programs designed specifically for women.",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
  }
];

const Learn = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-bloom-purple-dark mb-4">
              Financial Education Hub
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Curated resources to build your financial knowledge and confidence at your own pace.
            </p>
          </div>
          
          <Tabs defaultValue="all" className="w-full max-w-5xl mx-auto mb-12">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {educationResources.map((resource, index) => (
                <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative h-48">
                    <img 
                      src={resource.imageUrl} 
                      alt={resource.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl text-bloom-purple-dark">{resource.title}</CardTitle>
                      <Badge className="bg-bloom-teal hover:bg-bloom-teal">{resource.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{resource.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="border-bloom-purple text-bloom-purple hover:bg-bloom-purple hover:text-white w-full">
                      Read Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="beginner" className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {educationResources
                .filter(resource => resource.category === "Beginner")
                .map((resource, index) => (
                  <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative h-48">
                      <img 
                        src={resource.imageUrl} 
                        alt={resource.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl text-bloom-purple-dark">{resource.title}</CardTitle>
                        <Badge className="bg-bloom-teal hover:bg-bloom-teal">{resource.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{resource.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="border-bloom-purple text-bloom-purple hover:bg-bloom-purple hover:text-white w-full">
                        Read Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </TabsContent>
            
            <TabsContent value="intermediate" className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {educationResources
                .filter(resource => resource.category === "Intermediate")
                .map((resource, index) => (
                  <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative h-48">
                      <img 
                        src={resource.imageUrl} 
                        alt={resource.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl text-bloom-purple-dark">{resource.title}</CardTitle>
                        <Badge className="bg-bloom-teal hover:bg-bloom-teal">{resource.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{resource.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="border-bloom-purple text-bloom-purple hover:bg-bloom-purple hover:text-white w-full">
                        Read Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </TabsContent>
            
            <TabsContent value="advanced" className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {educationResources
                .filter(resource => resource.category === "Advanced")
                .map((resource, index) => (
                  <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative h-48">
                      <img 
                        src={resource.imageUrl} 
                        alt={resource.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl text-bloom-purple-dark">{resource.title}</CardTitle>
                        <Badge className="bg-bloom-teal hover:bg-bloom-teal">{resource.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{resource.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="border-bloom-purple text-bloom-purple hover:bg-bloom-purple hover:text-white w-full">
                        Read Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </TabsContent>
          </Tabs>
          
          <div className="bg-white p-8 rounded-xl shadow-md mt-12">
            <div className="text-center mb-8">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-bloom-purple-dark mb-4">
                Upcoming Events & Webinars
              </h2>
              <p className="text-gray-600">
                Join our live sessions with financial experts to deepen your knowledge.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-bloom-purple-dark">Investment Basics for Beginners</CardTitle>
                  <p className="text-sm text-gray-500">May 15, 2023 • 7:00 PM IST</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Learn the fundamentals of investing, including different investment vehicles, 
                    risk assessment, and building a balanced portfolio.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-bloom-purple hover:bg-bloom-purple-dark">
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-bloom-purple-dark">Entrepreneurship Funding Options</CardTitle>
                  <p className="text-sm text-gray-500">May 22, 2023 • 6:30 PM IST</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Discover various funding options available for women entrepreneurs, 
                    from government schemes to venture capital.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-bloom-purple hover:bg-bloom-purple-dark">
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Learn;
