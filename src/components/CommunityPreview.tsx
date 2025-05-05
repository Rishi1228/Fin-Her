
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Small Business Owner",
    avatar: "PS",
    content: "The scheme search tool helped me find a perfect government program for my startup. The document verification guide saved me so much time in the application process!",
  },
  {
    name: "Meena Patel",
    role: "Working Professional",
    avatar: "MP",
    content: "Being part of this community has transformed my relationship with money. I've learned so much from other women who face similar challenges.",
  },
  {
    name: "Anjali Gupta",
    role: "Homemaker",
    avatar: "AG",
    content: "The financial education resources are explained in such a simple way. I finally understand investing and have started my own portfolio!",
  }
];

const CommunityPreview = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-bloom-purple-dark mb-4">
            Join Our Community
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with like-minded women, share experiences, and grow together on your financial journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-bloom-softPurple border-none">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12 border-2 border-bloom-purple">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-bloom-purple text-white">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-bloom-purple-dark">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-bloom-purple-light to-bloom-purple rounded-2xl overflow-hidden shadow-xl">
          <div className="px-8 py-12 md:py-16 text-center">
            <h3 className="font-heading font-bold text-2xl md:text-3xl text-white mb-4">
              Ready to take control of your financial future?
            </h3>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Join thousands of women who are building wealth, sharing knowledge, and supporting each other.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-bloom-purple hover:bg-gray-100 text-lg px-8">
                Join Community
              </Button>
              <Button variant="outline" className="border-white text-bloom-purple hover:bg-white/10 text-lg px-8">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityPreview;
