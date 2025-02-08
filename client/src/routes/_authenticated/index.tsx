import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/')({
  component: App,
})
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

async function getTotalSpent() {
  const res = await api.expenses['totalSpent'].$get()
  if (!res.ok) {
    throw new Error('Failed to fetch total spent')
  }
  const data = await res.json()
  return data
}

function App() {
  // useQuery is a hook that is used to fetch data from the server
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['totalSpent'],
    queryFn: getTotalSpent,
  })
 

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  // const [totalSpent, setTotalSpent] = useState(0);
  // useEffect(() => {
  //   async function fetchTotal() {
  //     // it can avoid the type error and also it can be used for type checking for the api routes
  //     const res = await api.expenses["totalSpent"].$get();

  //     const data = await res.json();

  //     setTotalSpent(data.totalSpent);
  //   }
  //   fetchTotal();
  // }, []);

  return (
    <>
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
            Amount : {isPending ? 'Loading..' : data.totalSpent }
          </CardContent>
        </Card>
      </div>
    </>
  )
}
