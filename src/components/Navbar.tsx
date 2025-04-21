
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-4 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-bloom-purple-light to-bloom-purple flex items-center justify-center">
            <span className="text-white font-bold text-lg">SB</span>
          </div>
          <span className="font-heading font-semibold text-xl tracking-tight text-bloom-purple">She-Invest Bloom</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-bloom-purple font-medium transition-colors">Home</Link>
          <Link to="/schemes" className="text-gray-700 hover:text-bloom-purple font-medium transition-colors">Schemes</Link>
          <Link to="/learn" className="text-gray-700 hover:text-bloom-purple font-medium transition-colors">Learn</Link>
          <Link to="/community" className="text-gray-700 hover:text-bloom-purple font-medium transition-colors">Community</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="outline" className="hidden md:inline-flex border-bloom-purple text-bloom-purple hover:bg-bloom-purple hover:text-white transition-colors">
            Log in
          </Button>
          <Button className="bg-bloom-purple hover:bg-bloom-purple-dark text-white transition-colors">
            Sign up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
