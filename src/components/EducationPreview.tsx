
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

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
  }
];

const EducationPreview = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-bloom-purple-dark mb-4">
              Financial Education Hub
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Curated resources to build your financial knowledge at your own pace.
            </p>
          </div>
          <Button 
            className="mt-4 md:mt-0 bg-bloom-purple hover:bg-bloom-purple-dark"
            onClick={() => navigate('/learn')}
          >
            Explore All Resources
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <Button 
                  variant="outline" 
                  className="border-bloom-purple text-bloom-purple hover:bg-bloom-purple hover:text-white w-full"
                  onClick={() => navigate('/learn')}
                >
                  Read Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationPreview;
