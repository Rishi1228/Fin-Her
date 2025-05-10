
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/VideoPlayer";

// Financial education videos
const financialVideos = [
  {
    id: 1,
    title: "Understanding Personal Finance Basics",
    duration: "15:20",
    category: "Beginner",
    description: "Learn the fundamentals of budgeting, saving, and managing personal finances effectively.",
    thumbnailUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" // Sample video URL
  },
  {
    id: 2,
    title: "Investment Strategies for Women",
    duration: "12:45",
    category: "Intermediate",
    description: "Discover investment approaches that align with women's unique financial goals and life circumstances.",
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" // Sample video URL
  },
  {
    id: 3,
    title: "Tax Benefits for Women in India",
    duration: "18:30",
    category: "Specialized",
    description: "Explore tax deductions, exemptions, and benefits specifically available to women taxpayers.",
    thumbnailUrl: "https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" // Sample video URL
  }
];

// Education resources
const educationResources = [
  {
    title: "Understanding Personal Finance Basics",
    category: "Beginner",
    description: "Learn the fundamentals of budgeting, saving, and managing personal finances effectively.",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
  },
  {
    title: "Investment Strategies for Women",
    category: "Intermediate",
    description: "Discover investment approaches that align with women's unique financial goals and life circumstances.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80"
  },
  {
    title: "Tax Benefits for Women in India",
    category: "Specialized",
    description: "Explore tax deductions, exemptions, and benefits specifically available to women taxpayers.",
    imageUrl: "https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80"
  },
  {
    title: "Building an Emergency Fund",
    category: "Beginner",
    description: "Learn how to build a safety net for unexpected expenses and financial emergencies.",
    imageUrl: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
  },
  {
    title: "Retirement Planning for Women",
    category: "Advanced",
    description: "Comprehensive guide to planning for retirement considering women's unique career patterns.",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
  },
  {
    title: "Guide to Government Schemes",
    category: "Intermediate",
    description: "Detailed overview of government schemes and programs designed specifically for women.",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
  }
];

const Learn = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [contentType, setContentType] = useState<"videos" | "articles">("videos");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-bloom-purple-dark mb-4">
              Financial Education Hub
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Curated resources to build your financial knowledge and confidence at your own pace.
            </p>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-center gap-4 mb-6">
              <Button 
                variant={contentType === "videos" ? "default" : "outline"}
                className={contentType === "videos" ? "bg-bloom-purple hover:bg-bloom-purple-dark" : ""}
                onClick={() => setContentType("videos")}
              >
                Video Lessons
              </Button>
              <Button 
                variant={contentType === "articles" ? "default" : "outline"}
                className={contentType === "articles" ? "bg-bloom-purple hover:bg-bloom-purple-dark" : ""}
                onClick={() => setContentType("articles")}
              >
                Articles & Guides
              </Button>
            </div>
            
            {contentType === "videos" && (
              <div className="w-full max-w-5xl mx-auto">
                {selectedVideo === null ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {financialVideos.map((video) => (
                      <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                        <div className="relative h-48" onClick={() => setSelectedVideo(video.id)}>
                          <img 
                            src={video.thumbnailUrl} 
                            alt={video.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <div className="h-12 w-12 rounded-full bg-bloom-purple/80 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white ml-1">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                              </svg>
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                            {video.duration}
                          </div>
                        </div>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg text-bloom-purple-dark">{video.title}</CardTitle>
                            <Badge className="bg-bloom-teal hover:bg-bloom-teal">{video.category}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 text-sm">{video.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold text-bloom-purple-dark">
                        {financialVideos.find(v => v.id === selectedVideo)?.title}
                      </h2>
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedVideo(null)}
                      >
                        Back to Videos
                      </Button>
                    </div>
                    
                    <div className="aspect-video">
                      <VideoPlayer 
                        src={financialVideos.find(v => v.id === selectedVideo)?.videoUrl || ""}
                        title={financialVideos.find(v => v.id === selectedVideo)?.title || ""}
                        thumbnail={financialVideos.find(v => v.id === selectedVideo)?.thumbnailUrl}
                        className="w-full h-full"
                      />
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="text-xl font-semibold mb-2">Video Notes</h3>
                      <p className="text-gray-700">
                        {financialVideos.find(v => v.id === selectedVideo)?.description}
                        {" "}This video provides important insights into financial management principles
                        that can help you make better decisions with your money and secure your financial future.
                      </p>
                      
                      <div className="mt-6">
                        <h4 className="font-medium mb-2">Key Takeaways:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          <li>Understanding your financial goals is the first step to financial freedom</li>
                          <li>Creating a budget that works with your lifestyle is essential</li>
                          <li>How to prioritize saving and investing for long-term growth</li>
                          <li>Strategies to reduce debt and improve credit score</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t">
                      <h3 className="text-xl font-semibold mb-4">Recommended Next Videos</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {financialVideos
                          .filter(video => video.id !== selectedVideo)
                          .map(video => (
                            <Card 
                              key={video.id} 
                              className="cursor-pointer hover:shadow-md transition-all"
                              onClick={() => setSelectedVideo(video.id)}
                            >
                              <div className="relative h-32">
                                <img 
                                  src={video.thumbnailUrl} 
                                  alt={video.title}
                                  className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                  <div className="h-10 w-10 rounded-full bg-bloom-purple/80 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white ml-1">
                                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                    </svg>
                                  </div>
                                </div>
                                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                                  {video.duration}
                                </div>
                              </div>
                              <CardContent className="p-3">
                                <p className="font-medium text-sm line-clamp-2">{video.title}</p>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {contentType === "articles" && (
              <Tabs defaultValue="all" className="w-full max-w-5xl mx-auto">
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="all">All Resources</TabsTrigger>
                  <TabsTrigger value="beginner">Beginner</TabsTrigger>
                  <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {educationResources.map((resource, index) => (
                    <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                      <div className="relative h-48">
                        <img 
                          src={resource.imageUrl} 
                          alt={resource.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl text-bloom-purple-dark">{resource.title}</CardTitle>
                          <Badge className="bg-bloom-teal hover:bg-bloom-teal">{resource.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{resource.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="border-bloom-purple text-bloom-purple hover:bg-bloom-purple hover:text-white w-full">
                          Read Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="beginner" className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {educationResources
                    .filter(resource => resource.category === "Beginner")
                    .map((resource, index) => (
                      <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                        <div className="relative h-48">
                          <img 
                            src={resource.imageUrl} 
                            alt={resource.title}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </div>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-xl text-bloom-purple-dark">{resource.title}</CardTitle>
                            <Badge className="bg-bloom-teal hover:bg-bloom-teal">{resource.category}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{resource.description}</p>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="border-bloom-purple text-bloom-purple hover:bg-bloom-purple hover:text-white w-full">
                            Read Now
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </TabsContent>
                
                <TabsContent value="intermediate" className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {educationResources
                    .filter(resource => resource.category === "Intermediate")
                    .map((resource, index) => (
                      <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                        <div className="relative h-48">
                          <img 
                            src={resource.imageUrl} 
                            alt={resource.title}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </div>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-xl text-bloom-purple-dark">{resource.title}</CardTitle>
                            <Badge className="bg-bloom-teal hover:bg-bloom-teal">{resource.category}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{resource.description}</p>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="border-bloom-purple text-bloom-purple hover:bg-bloom-purple hover:text-white w-full">
                            Read Now
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </TabsContent>
                
                <TabsContent value="advanced" className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {educationResources
                    .filter(resource => resource.category === "Advanced")
                    .map((resource, index) => (
                      <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                        <div className="relative h-48">
                          <img 
                            src={resource.imageUrl} 
                            alt={resource.title}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </div>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-xl text-bloom-purple-dark">{resource.title}</CardTitle>
                            <Badge className="bg-bloom-teal hover:bg-bloom-teal">{resource.category}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{resource.description}</p>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="border-bloom-purple text-bloom-purple hover:bg-bloom-purple hover:text-white w-full">
                            Read Now
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </TabsContent>
              </Tabs>
            )}
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md mt-12">
            <div className="text-center mb-8">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-bloom-purple-dark mb-4">
                Upcoming Events & Webinars
              </h2>
              <p className="text-gray-600">
                Join our live sessions with financial experts to deepen your knowledge.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-bloom-purple-dark">Investment Basics for Beginners</CardTitle>
                  <p className="text-sm text-gray-500">May 15, 2025 • 7:00 PM IST</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Learn the fundamentals of investing, including different investment vehicles, 
                    risk assessment, and building a balanced portfolio.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-bloom-purple hover:bg-bloom-purple-dark">
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-bloom-purple-dark">Entrepreneurship Funding Options</CardTitle>
                  <p className="text-sm text-gray-500">May 22, 2025 • 6:30 PM IST</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Discover various funding options available for women entrepreneurs, 
                    from government schemes to venture capital.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-bloom-purple hover:bg-bloom-purple-dark">
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Learn;
