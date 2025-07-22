import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, TrendingUp, Award, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const ProgressTracking = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState([
    { id: 1, title: "Emergency Fund", target: 100000, current: 35000, deadline: "2024-12-31" },
    { id: 2, title: "Home Down Payment", target: 500000, current: 150000, deadline: "2025-06-30" },
    { id: 3, title: "Retirement Savings", target: 1000000, current: 250000, deadline: "2030-12-31" },
  ]);

  const [schemes, setSchemes] = useState([
    { id: 1, name: "PM Kisan Yojana", status: "Applied", date: "2024-01-15" },
    { id: 2, name: "Sukanya Samriddhi Yojana", status: "Approved", date: "2024-02-20" },
    { id: 3, name: "PMAY Housing Scheme", status: "Under Review", date: "2024-03-10" },
  ]);

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-500";
      case "Applied": return "bg-blue-500";
      case "Under Review": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Login Required</CardTitle>
              <CardDescription>
                Please log in to track your financial progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <a href="/auth">Login to Continue</a>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Progress Tracking</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Monitor your financial goals and scheme applications
          </p>
        </div>

        <Tabs defaultValue="goals" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="goals">Financial Goals</TabsTrigger>
            <TabsTrigger value="schemes">Scheme Applications</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="goals">
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map((goal) => (
                  <Card key={goal.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        {goal.title}
                      </CardTitle>
                      <CardDescription>
                        Target: ₹{goal.target.toLocaleString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Progress</span>
                          <span>{calculateProgress(goal.current, goal.target).toFixed(1)}%</span>
                        </div>
                        <Progress value={calculateProgress(goal.current, goal.target)} />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Current: ₹{goal.current.toLocaleString()}</span>
                        <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schemes">
            <div className="space-y-4">
              {schemes.map((scheme) => (
                <Card key={scheme.id}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="font-semibold">{scheme.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Applied on: {new Date(scheme.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={getStatusColor(scheme.status)}>
                      {scheme.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    First Goal Achieved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Congratulations on completing your first financial goal!
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Consistent Saver
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    You've maintained consistent savings for 6 months!
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    Early Bird
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Achieved a goal ahead of schedule!
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default ProgressTracking;