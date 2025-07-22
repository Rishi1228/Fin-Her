import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Users, Play, Video } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Webinars = () => {
  const upcomingWebinars = [
    {
      id: 1,
      title: "Maximizing Tax Benefits in 2024",
      description: "Learn about the latest tax-saving opportunities and government schemes",
      speaker: "CA Priya Sharma",
      date: "2024-02-15",
      time: "7:00 PM IST",
      duration: "60 minutes",
      attendees: 245,
      category: "Tax Planning",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop",
    },
    {
      id: 2,
      title: "Building Wealth Through SIPs",
      description: "A comprehensive guide to systematic investment planning for beginners",
      speaker: "Rajesh Kumar, CFP",
      date: "2024-02-18",
      time: "6:30 PM IST",
      duration: "90 minutes",
      attendees: 189,
      category: "Investment",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
    },
    {
      id: 3,
      title: "Government Schemes for Women Entrepreneurs",
      description: "Discover funding and support opportunities for women-led businesses",
      speaker: "Dr. Sneha Patel",
      date: "2024-02-22",
      time: "5:00 PM IST",
      duration: "75 minutes",
      attendees: 156,
      category: "Business",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop",
    },
  ];

  const pastWebinars = [
    {
      id: 4,
      title: "Emergency Fund Essentials",
      description: "Building financial security in uncertain times",
      speaker: "Amit Singh",
      date: "2024-01-28",
      duration: "45 minutes",
      views: 1250,
      category: "Personal Finance",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ",
    },
    {
      id: 5,
      title: "Digital Banking Revolution",
      description: "How fintech is changing the financial landscape",
      speaker: "Kavitha Reddy",
      date: "2024-01-25",
      duration: "60 minutes",
      views: 890,
      category: "Technology",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ",
    },
    {
      id: 6,
      title: "Retirement Planning in Your 30s",
      description: "Starting early for a comfortable retirement",
      speaker: "Dr. Mohan Krishnan",
      date: "2024-01-20",
      duration: "55 minutes",
      views: 674,
      category: "Retirement",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Financial Webinars</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join expert-led sessions on personal finance, investments, and government schemes
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming Webinars</TabsTrigger>
            <TabsTrigger value="past">Past Recordings</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingWebinars.map((webinar) => (
                <Card key={webinar.id} className="overflow-hidden">
                  <div className="aspect-video bg-cover bg-center relative" style={{ backgroundImage: `url(${webinar.image})` }}>
                    <Badge className="absolute top-2 left-2">{webinar.category}</Badge>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      <Video className="inline h-4 w-4 mr-1" />
                      Live
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{webinar.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{webinar.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="font-medium">{webinar.speaker}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{new Date(webinar.date).toLocaleDateString()} at {webinar.time}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{webinar.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {webinar.attendees} registered
                      </span>
                      <Button>Register Free</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastWebinars.map((webinar) => (
                <Card key={webinar.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{webinar.category}</Badge>
                      <span className="text-sm text-muted-foreground">{webinar.views} views</span>
                    </div>
                    <CardTitle className="line-clamp-2">{webinar.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{webinar.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="font-medium">{webinar.speaker}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{new Date(webinar.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{webinar.duration}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Watch Recording
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Webinars;