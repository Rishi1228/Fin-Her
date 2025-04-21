
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
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <FeatureHighlights />
        <SchemeSearch />
        <EducationPreview />
        <CommunityPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
