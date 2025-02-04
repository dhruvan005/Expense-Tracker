import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/createExpense')({
  component: createExpense,
})

function createExpense() {
  return <div>Hello from CreateExpense !</div>
}
