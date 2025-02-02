import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function App() {
  const [totalSpent, setTotalSpent] = useState(0);
  useEffect(() => {
    async function fetchTotal() {
    const res = await fetch("http://localhost:3000/api/expenses/totalSpent")
    const data = await res.json()
    setTotalSpent(data.totalSpent)
    }
    fetchTotal()
    
   }, []);


  return (
    <>
      <div className="bg-background text-foreground min-h-screen">
        <div className="h-10"></div>
        <Card className="w-[350px] m-auto bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="font-semibold tracking-tight text-2xl">
              Total Expense
            </CardTitle>
            <CardDescription className="text-gray-400">The total amount you've spent</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="">
              Amount : <span>{totalSpent}</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default App;
