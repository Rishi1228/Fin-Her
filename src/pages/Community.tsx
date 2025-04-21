
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const forumTopics = [
  {
    title: "How to start investing with a small budget?",
    author: "Priya Sharma",
    avatar: "PS",
    category: "Investing",
    replies: 24,
    views: 156,
    lastActivity: "2 hours ago"
  },
  {
    title: "Which government schemes helped your business?",
    author: "Meena Patel",
    avatar: "MP",
    category: "Entrepreneurship",
    replies: 18,
    views: 103,
    lastActivity: "5 hours ago"
  },
  {
    title: "Tips for negotiating salary as a woman professional",
    author: "Anjali Gupta",
    avatar: "AG",
    category: "Career",
    replies: 32,
    views: 210,
    lastActivity: "1 day ago"
  },
  {
    title: "Best practices for emergency fund planning",
    author: "Ritu Singh",
    avatar: "RS",
    category: "Savings",
    replies: 15,
    views: 89,
    lastActivity: "2 days ago"
  },
  {
    title: "Experience with Sukanya Samriddhi Yojana",
    author: "Neha Kapoor",
    avatar: "NK",
    category: "Schemes",
    replies: 27,
    views: 176,
    lastActivity: "3 days ago"
  }
];

const successStories = [
  {
    title: "From Homemaker to Entrepreneur",
    author: "Sunita Verma",
    avatar: "SV",
    preview: "I started my small business with support from the Mudra loan scheme. Today, I employ 15 women from my community.",
    likes: 156,
    category: "Entrepreneurship"
  },
  {
    title: "Financial Freedom through Smart Investing",
    author: "Divya Sharma",
    avatar: "DS",
    preview: "How I built a diversified portfolio that gives me financial security and peace of mind.",
    likes: 124,
    category: "Investing"
  },
  {
    title: "Breaking the Debt Cycle",
    author: "Kavita Patel",
    avatar: "KP",
    preview: "My journey of paying off ₹12 lakh in debt and building a sustainable financial future.",
    likes: 98,
    category: "Debt Management"
  }
];

const mentors = [
  {
    name: "Dr. Lakshmi Iyer",
    avatar: "LI",
    expertise: "Investment Planning",
    experience: "15+ years",
    availability: "Available for mentoring"
  },
  {
    name: "Shalini Mehta",
    avatar: "SM",
    expertise: "Entrepreneurship",
    experience: "10+ years",
    availability: "Limited availability"
  },
  {
    name: "Aarti Khanna",
    avatar: "AK",
    expertise: "Tax Planning",
    experience: "12+ years",
    availability: "Available for mentoring"
  },
  {
    name: "Preeti Bajaj",
    avatar: "PB",
    expertise: "Retirement Planning",
    experience: "8+ years",
    availability: "Limited availability"
  }
];

const Community = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-bloom-purple-dark mb-4">
              Join Our Community
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Connect with like-minded women, share experiences, and grow together on your financial journey.
            </p>
          </div>
          
          <Tabs defaultValue="forum" className="w-full max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="forum">Discussion Forum</TabsTrigger>
              <TabsTrigger value="success">Success Stories</TabsTrigger>
              <TabsTrigger value="mentors">Find Mentors</TabsTrigger>
            </TabsList>
            
            <TabsContent value="forum">
              <div className="space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <h2 className="font-heading font-bold text-2xl text-bloom-purple-dark">Recent Discussions</h2>
                  <Button className="bg-bloom-purple hover:bg-bloom-purple-dark">Start New Discussion</Button>
                </div>
                
                {forumTopics.map((topic, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div className="flex-1">
                          <CardTitle className="text-xl text-bloom-purple-dark">{topic.title}</CardTitle>
                          <CardDescription>Started by {topic.author}</CardDescription>
                        </div>
                        <Badge className="bg-bloom-teal hover:bg-bloom-teal">{topic.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span>{topic.replies} replies</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>{topic.views} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Last activity {topic.lastActivity}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8 border-2 border-bloom-purple">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-bloom-purple text-white text-xs">
                            {topic.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{topic.author}</span>
                      </div>
                      <Button variant="outline" className="border-bloom-purple text-bloom-purple hover:bg-bloom-purple hover:text-white">
                        View Discussion
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                
                <div className="flex justify-center mt-8">
                  <Button variant="outline" className="border-bloom-purple text-bloom-purple hover:bg-bloom-purple hover:text-white">
                    View All Discussions
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="success">
              <div className="space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <h2 className="font-heading font-bold text-2xl text-bloom-purple-dark">Success Stories</h2>
                  <Button className="bg-bloom-purple hover:bg-bloom-purple-dark">Share Your Story</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {successStories.map((story, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow h-full flex flex-col">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl text-bloom-purple-dark">{story.title}</CardTitle>
                          <Badge className="bg-bloom-teal hover:bg-bloom-teal">{story.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-gray-600">{story.preview}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8 border-2 border-bloom-purple">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-bloom-purple text-white text-xs">
                              {story.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{story.author}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span>{story.likes}</span>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                <div className="flex justify-center mt-8">
                  <Button variant="outline" className="border-bloom-purple text-bloom-purple hover:bg-bloom-purple hover:text-white">
                    View All Success Stories
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="mentors">
              <div className="space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <h2 className="font-heading font-bold text-2xl text-bloom-purple-dark">Financial Mentors</h2>
                  <Button className="bg-bloom-purple hover:bg-bloom-purple-dark">Become a Mentor</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mentors.map((mentor, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-16 w-16 border-2 border-bloom-purple">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-bloom-purple text-white">
                              {mentor.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-xl text-bloom-purple-dark">{mentor.name}</CardTitle>
                            <CardDescription>
                              <span className="font-medium text-bloom-teal">{mentor.expertise}</span> • {mentor.experience} experience
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center">
                          <Badge variant="outline" className="border-green-500 text-green-600">
                            {mentor.availability}
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-bloom-purple hover:bg-bloom-purple-dark">
                          Request Mentorship
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-8 bg-bloom-softPurple rounded-lg p-6">
                  <h3 className="font-heading font-semibold text-xl text-bloom-purple-dark mb-4">
                    How Mentorship Works
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-bloom-purple rounded-full flex items-center justify-center text-white font-bold mb-4">
                        1
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">Browse Mentors</h4>
                      <p className="text-gray-600">Find a mentor with expertise in your area of interest.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-bloom-purple rounded-full flex items-center justify-center text-white font-bold mb-4">
                        2
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">Send Request</h4>
                      <p className="text-gray-600">Share your goals and schedule a session with your chosen mentor.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-bloom-purple rounded-full flex items-center justify-center text-white font-bold mb-4">
                        3
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">Grow Together</h4>
                      <p className="text-gray-600">Receive personalized guidance and practical tips for your financial journey.</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Community;
