import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, User, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const blogPosts = [
    {
      id: 1,
      title: "Complete Guide to Government Schemes for Small Businesses",
      excerpt: "Discover the top government schemes available for small business owners and entrepreneurs in India.",
      category: "Business",
      author: "Priya Sharma",
      date: "2024-01-15",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
    },
    {
      id: 2,
      title: "How to Build an Emergency Fund: A Step-by-Step Guide",
      excerpt: "Learn the importance of emergency funds and practical steps to build one that suits your lifestyle.",
      category: "Personal Finance",
      author: "Rajesh Kumar",
      date: "2024-01-12",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Understanding Mutual Funds: Beginner's Guide",
      excerpt: "Everything you need to know about mutual funds, SIPs, and building a diversified portfolio.",
      category: "Investment",
      author: "Sneha Patel",
      date: "2024-01-10",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
    },
    {
      id: 4,
      title: "Tax Saving Strategies for Salaried Professionals",
      excerpt: "Maximize your tax savings with these proven strategies and government schemes.",
      category: "Tax Planning",
      author: "Amit Singh",
      date: "2024-01-08",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    },
    {
      id: 5,
      title: "Digital Payment Revolution in Rural India",
      excerpt: "How digital payments are transforming financial inclusion in rural areas.",
      category: "Technology",
      author: "Kavitha Reddy",
      date: "2024-01-05",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1556742208-999815fca738?w=800&h=400&fit=crop",
    },
  ];

  const categories = ["all", "Personal Finance", "Investment", "Business", "Tax Planning", "Technology"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Financial Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest insights on personal finance, government schemes, and investment strategies
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All Categories" : category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }} />
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-4">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found matching your search criteria.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Blog;