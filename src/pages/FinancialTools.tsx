import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp, PiggyBank, CreditCard } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FinancialTools = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const R = parseFloat(interestRate) / 100 / 12;
    const N = parseFloat(loanTerm) * 12;
    
    if (P && R && N) {
      const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      setMonthlyPayment(Math.round(emi));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Financial Tools</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Use our comprehensive financial calculators and tools to plan your financial future
          </p>
        </div>

        <Tabs defaultValue="emi" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="emi">EMI Calculator</TabsTrigger>
            <TabsTrigger value="investment">Investment</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
            <TabsTrigger value="budget">Budget Planner</TabsTrigger>
          </TabsList>

          <TabsContent value="emi">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-6 w-6" />
                  EMI Calculator
                </CardTitle>
                <CardDescription>
                  Calculate your monthly loan payments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="loan-amount">Loan Amount (₹)</Label>
                    <Input
                      id="loan-amount"
                      type="number"
                      placeholder="1000000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                    <Input
                      id="interest-rate"
                      type="number"
                      step="0.1"
                      placeholder="8.5"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="loan-term">Loan Term (Years)</Label>
                    <Input
                      id="loan-term"
                      type="number"
                      placeholder="20"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Button onClick={calculateEMI} className="w-full">
                  Calculate EMI
                </Button>
                {monthlyPayment && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <h3 className="text-lg font-semibold">Monthly EMI: ₹{monthlyPayment.toLocaleString()}</h3>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investment">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  Investment Calculator
                </CardTitle>
                <CardDescription>
                  Plan your investment goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Investment calculator coming soon. Track your SIP returns, lump sum investments, and retirement planning.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="savings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="h-6 w-6" />
                  Savings Calculator
                </CardTitle>
                <CardDescription>
                  Calculate your savings goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Savings calculator coming soon. Set targets and track your progress toward financial goals.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  Budget Planner
                </CardTitle>
                <CardDescription>
                  Plan and track your monthly budget
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Budget planner coming soon. Manage your income, expenses, and savings efficiently.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default FinancialTools;