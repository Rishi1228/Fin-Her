
import React from "react";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const isMobile = useIsMobile();

  return (
    <section className="bg-gradient-to-r from-bloom-softPurple to-white py-6 sm:py-8 md:py-10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="md:w-1/2 space-y-3 sm:space-y-4">
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-bloom-purple-dark leading-tight">
              Financial empowerment designed for women
            </h1>
            <p className="text-base sm:text-lg text-gray-700 max-w-xl">
              Discover government schemes, build financial literacy, and join a community
              of women supporting each other on their financial journey.
            </p>
            <div className="pt-2 flex flex-wrap sm:flex-row gap-3 sm:gap-4">
              <Button className="bg-bloom-purple hover:bg-bloom-purple-dark text-white px-5 sm:px-6 py-2 h-auto text-sm sm:text-base">
                Find Schemes
              </Button>
              <Button 
                variant="outline" 
                className="border-bloom-purple text-bloom-purple hover:bg-bloom-purple hover:text-white px-5 sm:px-6 py-2 h-auto text-sm sm:text-base"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <div className="relative mx-auto max-w-md md:max-w-full">
              <div className="absolute -top-4 -left-4 w-16 h-16 sm:w-20 sm:h-20 bg-bloom-coral rounded-full opacity-50"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-bloom-teal rounded-full opacity-30"></div>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80" 
                alt="Women supporting each other financially" 
                className="rounded-2xl shadow-xl relative z-10 object-cover w-full h-[280px] sm:h-[320px] md:h-[350px] lg:h-[400px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
