import { createFileRoute } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/")({
  component: App,
});
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function getTotalSpent() {
  const res = await api.expenses["totalSpent"].$get();
  if (!res.ok) {
    throw new Error("Failed to fetch total spent");
  }
  const data = await res.json();
  return data;
}

function App() {
  // useQuery is a hook that is used to fetch data from the server
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["totalSpent"],
    queryFn: getTotalSpent,
  });

  const writeTotalSpent = () => {
    const totalSpent = data?.totalSpent;
    if (totalSpent) {
      return totalSpent;
    }
    else {
      return (
        <>
        <Link to="/createExpense">
            <Button className=" cursor-pointer hover:bg-[#202022]">Create Expense</Button>
          </Link>
        </>
      );
    }
  };

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  

  return (
    <>
      <div className="relative  h-[600px] w-full  items-center justify-center overflow-hidden p-10">
        {/* <DotPattern
          glow={true}
          className={cn(
            "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)] "
          )}
        /> */}
        <div className="bg-background text-foreground min-h-screen">
          <div className="h-10"></div>
          <Card className="w-[350px] m-auto bg-card text-card-foreground">
            <CardHeader>
              <CardTitle className="font-semibold tracking-tight text-2xl">
                Total Expense
              </CardTitle>
              <CardDescription className="text-gray-400">
                The total amount you've spent
              </CardDescription>
            </CardHeader>
            <CardContent>
              Amount : {isPending ? "Loading.." : writeTotalSpent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
