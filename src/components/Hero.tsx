
import React from "react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-bloom-softPurple to-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="md:w-1/2">
            <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-bloom-purple-dark leading-tight">
              Financial empowerment designed for women
            </h1>
            <p className="mt-4 text-lg text-gray-700 max-w-xl">
              Discover government schemes, build financial literacy, and join a community
              of women supporting each other on their financial journey.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button className="bg-bloom-purple hover:bg-bloom-purple-dark text-white text-lg px-6 py-2 h-auto">
                Find Schemes
              </Button>
              <Button variant="outline" className="border-bloom-purple text-bloom-purple hover:bg-bloom-purple hover:text-white text-lg px-6 py-2 h-auto">
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-bloom-coral rounded-full opacity-50"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-bloom-teal rounded-full opacity-30"></div>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80" 
                alt="Women supporting each other financially" 
                className="rounded-2xl shadow-xl relative z-10 object-cover w-full h-[400px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
