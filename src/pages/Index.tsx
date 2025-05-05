
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureHighlights from "@/components/FeatureHighlights";
import SchemeSearch from "@/components/SchemeSearch";
import EducationPreview from "@/components/EducationPreview";
import CommunityPreview from "@/components/CommunityPreview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="w-full flex-grow overflow-x-hidden">
        <Hero />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-4 sm:py-6">
          <FeatureHighlights />
          <SchemeSearch />
          <EducationPreview />
          <CommunityPreview />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
