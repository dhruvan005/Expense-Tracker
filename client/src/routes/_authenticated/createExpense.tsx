import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from '@tanstack/react-form'

import { Label } from '@/components/ui/label'
import { api } from '@/lib/api'
import { RadioGroup } from '@/components/ui/radio-group'

export const Route = createFileRoute('/_authenticated/createExpense')({
  component: createExpense,
})

function createExpense() {
  const navigate = useNavigate()
  const form = useForm({
    defaultValues: {
      title: '',
      amount: 0,
      method: '',
    },
    onSubmit: async ({ value }) => {
      console.log('value', value)
      const res = await api.expenses.$post({ json: value })
      if (!res.ok) {
        throw new Error('Failed to create expense')
      }
      navigate({ to: '/expenses' })
    },
  })
  return (
    <>
      <div className="h-10"></div>
      <div className="max-w-[80vw] md:max-w-xl m-auto">
        <div className="text-2xl font-bold ">Create the Expense</div>
        <div className="h-5"></div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <form.Field
            name="title"
            children={(field) => (
              <div>
                <Label htmlFor="title" className="text-[18px]">
                  Expense Title
                </Label>
                <Input
                  placeholder="e.g. Groceries"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors ? (
                  <em>{field.state.meta.errors}</em>
                ) : null}
              </div>
            )}
          />

          <div className="h-5"></div>
          <form.Field
            name="amount"
            children={(field) => (
              <div>
                <Label htmlFor="amount" className="text-[18px]">
                  Amount
                </Label>
                <Input
                  placeholder="e.g 100"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
                {field.state.meta.errors ? (
                  <em>{field.state.meta.errors}</em>
                ) : null}
              </div>
            )}
          />
          <div className="h-5"></div>
          <form.Field
            name="method"
            children={(field) => (
              <>
                <Label htmlFor="method" className="text-[18px]">
                  Selcet Payment Method
                </Label>
                <div className="h-2"></div>

                <RadioGroup
                  className="flex ml-2 space-x-2"
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange((e.target as HTMLInputElement).value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      value="Cash"
                      id="Cash"
                      name="method"
                      className="w-4 h-4 flex items-center justify-center border-2 border-gray-500 rounded-full peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all duration-200"
                    />
                    <Label
                      htmlFor="Cash"
                      className="peer-data-[state=checked]/Cash:text-blue-400 text-gray-300"
                    >
                      Cash
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      value="Upi"
                      id="Upi"
                      name="method"
                      className="w-4 h-4 flex items-center justify-center border-2 border-gray-500 rounded-full peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all duration-200"
                    />
                    <Label
                      htmlFor="Upi"
                      className="peer-data-[state=checked]/Upi:text-blue-400 text-gray-300"
                    >
                      Upi
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      value="Card"
                      id="Card"
                      name="method"
                      className="w-4 h-4 flex items-center justify-center border-2 border-gray-500 rounded-full peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all duration-200"
                    />
                    <Label
                      htmlFor="Card"
                      className="peer-data-[state=checked]/card:text-blue-400 text-gray-300"
                    >
                      Card
                    </Label>
                  </div>
                </RadioGroup>

                {field.state.meta.errors ? (
                  <em>{field.state.meta.errors}</em>
                ) : null}
              </>
            )}
          />
          <div className="h-5"></div>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit}
                variant="secondary"
                className="bg-[#202022] cursor-pointer hover:bg-[#0A0A0A]"
              >
                {isSubmitting ? '...' : 'Create'}
              </Button>
            )}
          />
        </form>
      </div>
    </>
  )
}
