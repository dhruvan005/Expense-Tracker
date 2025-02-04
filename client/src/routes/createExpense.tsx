import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import type { FieldApi } from "@tanstack/react-form";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";

export const Route = createFileRoute("/createExpense")({
  component: createExpense,
});

function createExpense() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      title: "",
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      const res = await api.expenses.$post({ json: value });
      if (!res.ok) {
        throw new Error("Failed to create expense");
      }
      navigate({ to: "/expenses" });
    },
  });
  return (
    <>
      <div className="h-10"></div>
      <div className="max-w-xl m-auto">
        <div className="text-2xl font-bold">Create the Expense </div>
        <div className="h-5"></div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="title"
            children={(field) => (
              <div>
                <Label htmlFor="title">Expense Title</Label>
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
                <Label htmlFor="amount">Amount</Label>
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

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit}
                variant="secondary"
                className="bg-[#202022] cursor-pointer hover:bg-[#0A0A0A]"
              >
                {isSubmitting ? "..." : "Create"}
              </Button>
            )}
          />
        </form>
      </div>
    </>
  );
}
