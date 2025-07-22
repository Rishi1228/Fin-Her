
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    } else {
      navigate('/');
    }
  };

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
          <Link to="/tools" className="text-gray-700 hover:text-bloom-purple font-medium transition-colors">Tools</Link>
          <Link to="/learn" className="text-gray-700 hover:text-bloom-purple font-medium transition-colors">Learn</Link>
          <Link to="/progress" className="text-gray-700 hover:text-bloom-purple font-medium transition-colors">Progress</Link>
          <Link to="/blog" className="text-gray-700 hover:text-bloom-purple font-medium transition-colors">Blog</Link>
          <Link to="/webinars" className="text-gray-700 hover:text-bloom-purple font-medium transition-colors">Webinars</Link>
          <Link to="/community" className="text-gray-700 hover:text-bloom-purple font-medium transition-colors">Community</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Search className="h-5 w-5" />
          </Button>
          {user ? (
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="border-bloom-purple text-bloom-purple hover:bg-bloom-purple hover:text-white transition-colors"
            >
              Log out
            </Button>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={() => navigate('/auth')}
                className="hidden md:inline-flex border-bloom-purple text-bloom-purple hover:bg-bloom-purple hover:text-white transition-colors"
              >
                Log in
              </Button>
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-bloom-purple hover:bg-bloom-purple-dark text-white transition-colors"
              >
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
