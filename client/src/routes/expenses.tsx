import { createFileRoute } from "@tanstack/react-router";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import  {Skeleton}  from "@/components/ui/skeleton";
import { api } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/expenses")({
  component: Expenses,
});

async function getAllExpenses() {
  const res = await api.expenses.$get();
  if (!res.ok) {
    throw new Error("Failed to fetch total spent");
  }
  const data = await res.json();
  return data;
}

function Expenses() {
  // useQuery is a hook that is used to fetch data from the server
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getAllExpenses"],
    queryFn: getAllExpenses,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <div className="h-10"></div>
      <Table className="max-w-3xl m-auto border rounded-md">
        <TableCaption className="text-gray-300">
          A list of your recent Expenses.
        </TableCaption>
        <TableHeader className="text-gray-300">
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>

            <TableHead>Items</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
            ? " Loading..."
            //  Array(3)
            // .fill(0)
            // .map((index) => (
            //   <TableRow key={index}>
            //     <TableCell><Skeleton className="h-4" /></TableCell>
            //     <TableCell><Skeleton className="h-4" /></TableCell>
            //     <TableCell><Skeleton className="h-4" /></TableCell>
            //   </TableRow>
            // ))
            : data?.expenses.map((expense: any) =>  (
                  <>
                    <TableRow className="cursor-pointer hover:underline hover:text-primary hover:bg-[#202022]">
                      <TableCell className="font-medium">
                        {expense.id}
                      </TableCell>
                      <TableCell>{expense.title}</TableCell>
                      <TableCell>{expense.amount}</TableCell>
                    </TableRow>
                  </>
                )
              )}
        </TableBody>
      </Table>
    </>
  );
}
