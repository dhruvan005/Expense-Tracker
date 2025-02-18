import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ExpenseTable } from "@/components/ExpenseTable";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/expenses")({
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
      {data?.expenses.length === 0 ? (
        <div className="flex justify-center items-center flex-col gap-3"> 
        <div >No expenses found</div>
        <Link to="/createExpense">
            <Button className="bg-[#202022] cursor-pointer hover:bg-[#0A0A0A]">Create Expense</Button>
          </Link>
        </div>
      ) : (
        <ExpenseTable data={data} isPending={isPending} />
      )}
    </>
  );
}
