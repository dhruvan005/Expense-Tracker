import { z } from "zod";

export const expanseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string().min(3).max(100),
    amount: z.string().regex(/^\d+(\.\d{1,2})?$/),
    method: z.string()
})

type Expense = z.infer<typeof expanseSchema>

export const createExpenseSchema = expanseSchema.omit({ id: true })

