import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { RadioGroup } from "@/components/ui/radio-group";
import { createExpenseSchema } from "@server/Types";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/createExpense")({
  component: createExpense,
});

function createExpense() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      title: "",
      amount: "",
      method: "",
    },
    onSubmit: async ({ value }) => {
      console.log("value", value);
      const res = await api.expenses.$post({ json: value });
      if (!res.ok) {
        throw new Error("Failed to create expense");
      }
      navigate({ to: "/expenses" });
    },
  });
  return (
    <>
      <div className="max-w-[90vw] md:max-w-[70vw] m-auto w-full md:w-[50vw] p-4 md:p-8">
        <div className="text-xl md:text-2xl font-bold">Create Your Expense</div>
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
            validators={{
              onChange: z.string().nonempty("Title is required").min(2),
            }}
            children={(field) => (
              <div>
                <Label htmlFor="title" className="text-[16px] md:text-[18px]">
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
            validators={{
              onChange: z
                .string()
                .nonempty("Amount is required")
                .refine((val) => parseFloat(val) > 0, {
                  message: "Amount must be greater than zero",
                }),
            }}
            children={(field) => (
              <div>
                <Label htmlFor="amount" className="text-[16px] md:text-[18px]">
                  Amount
                </Label>
                <Input
                  placeholder="e.g 100"
                  type="number"
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
            name="method"
            validators={{
              onChange: z.string().nonempty("Method is required").min(1),
            }}
            children={(field) => (
              <>
                <Label htmlFor="method" className="text-[16px] md:text-[18px]">
                  Select Payment Method
                </Label>
                <div className="h-2"></div>

                <RadioGroup
                  className="flex flex-col md:flex-row ml-2 space-y-2 md:space-y-0 md:space-x-2"
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

          {/* <form.Field
            name="date"
            validators={{
              onChange: createExpenseSchema.shape.date,
            }}
            children={(field) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.state.value}
                    onSelect={(e) => field.handleChange(e.target.value)}
                  />
                </PopoverContent>
              </Popover>
            )}
          /> */}

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
