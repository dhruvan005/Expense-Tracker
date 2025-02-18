import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'



export function ExpenseTable( {data, isPending} : {data: any, isPending: boolean}) {


 

  const getMethodColor = (method: string) => {
    switch (method.toLowerCase()) {
      case 'upi':
        return 'bg-red-500/20 hover:bg-red-500/30'
      case 'cash':
        return 'bg-green-500/20 hover:bg-green-500/30'
      case 'card':
        return 'bg-blue-500/20 hover:bg-blue-500/30'
      default:
        return 'bg-gray-500/20 hover:bg-gray-500/30'
    }
  }

  return (
    <>
      <div className="h-10"></div>
      <Table className="max-w-[80vw] md:max-w-3xl m-auto border rounded-md">
        <TableCaption className="text-gray-300">
          A list of your recent Expenses.
        </TableCaption>
        <TableHeader className="text-gray-300">
          <TableRow>
            {/* <TableHead className="w-[100px]">Id</TableHead> */}
            <TableHead>Items</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
            ? Array(3)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                  </TableRow>
                ))
            : data?.expenses.map((expense: any) => (
                <TableRow
                  key={expense.id}
                  className={`cursor-pointer transition-colors duration-200  rounded-md `}
                >
                  {/* <TableCell className="font-medium">{expense.id}</TableCell> */}
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>
                    <span
                      className={`${getMethodColor(expense.method)} p-1 rounded-sm px-3`}
                    >
                      {expense.method}
                    </span>
                  </TableCell>
                  <TableCell>{expense.amount}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </>
  )
}
