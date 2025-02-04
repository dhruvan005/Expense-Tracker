import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/expenses')({
  component: expenses,
})

function expenses() {
  return <div>Hello "/expenses"!</div>
}
