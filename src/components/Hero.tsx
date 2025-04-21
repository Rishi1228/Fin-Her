
import React from "react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-bloom-softPurple to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-bloom-purple-dark leading-tight">
              Financial empowerment designed for women
            </h1>
            <p className="mt-6 text-lg text-gray-700 max-w-xl">
              Discover government schemes, build financial literacy, and join a community
              of women supporting each other on their financial journey.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-bloom-purple hover:bg-bloom-purple-dark text-white text-lg px-8 py-6 h-auto">
                Find Schemes
              </Button>
              <Button variant="outline" className="border-bloom-purple text-bloom-purple hover:bg-bloom-purple hover:text-white text-lg px-8 py-6 h-auto">
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-bloom-coral rounded-full opacity-50"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-bloom-teal rounded-full opacity-30"></div>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80" 
                alt="Women supporting each other financially" 
                className="rounded-2xl shadow-xl relative z-10 object-cover h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
