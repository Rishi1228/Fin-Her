import React from "react";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const isMobile = useIsMobile();
  return (
    <section className="bg-gradient-to-r from-bloom-softPurple to-white py-4 sm:py-6 md:py-8 min-h-[85vh] flex items-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8">
         
          <div className="md:w-1/2 space-y-2 sm:space-y-3 md:space-y-4 text-center md:text-left">
            <h1 className="font-heading font-bold text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-bloom-purple-dark leading-tight">
              Financial empowerment designed for women
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-xl mx-auto md:mx-0">
              Discover government schemes, build financial literacy, and join a community
              of women supporting each other on their financial journey.
            </p>
            <div className="pt-2 sm:pt-3 flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3">
              <Button className="bg-bloom-purple hover:bg-bloom-purple-dark text-white px-3 sm:px-5 py-1.5 sm:py-2 h-auto text-sm sm:text-base">
                Find Schemes
              </Button>
              <Button 
                variant="outline" 
                className="border-bloom-purple text-bloom-purple hover:bg-bloom-purple hover:text-white px-3 sm:px-5 py-1.5 sm:py-2 h-auto text-sm sm:text-base"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-4 md:mt-0 flex justify-center">
            <div className="relative w-full h-[200px] xs:h-[250px] sm:h-[300px] md:h-[350px] max-w-md md:max-w-full">
              {/* Decorative Circles */}
              <div className="absolute -top-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-bloom-coral rounded-full opacity-50 z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-bloom-teal rounded-full opacity-30 z-0"></div>             
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80"
                alt="Women learning and happy using phones in diverse settings"
                className="rounded-2xl shadow-xl object-cover w-full h-full inset-0 absolute z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
