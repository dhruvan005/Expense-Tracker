import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const expanseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string().min(3).max(100),
    amount: z.number().int().positive(),
    method : z.string()
})

type Expense = z.infer<typeof expanseSchema>

const createPostSchema = expanseSchema.omit({ id: true })

const fakeExpenses: Expense[] = [
    { id: 1, title: "Groceries", amount: 100 , method : "upi"},
    { id: 2, title: "Rent", amount: 1000 , method : "card"},
    { id: 3, title: "Internet", amount: 50 , method : "cash"},
    { id: 4, title: "Electricity", amount: 150 , method : "upi"},
    { id: 5, title: "Water", amount: 20 , method : "card"},
]

export const expensesRoute = new Hono()
    .get("/", async (c) => {
        return c.json({ expenses: fakeExpenses })
    })
    .get("/totalSpent", async (c) => {
        
        const totalSpent = fakeExpenses.reduce((acc, expense) => acc + expense.amount, 0)
        return c.json({ totalSpent })
    })
    .post("/", zValidator("json", createPostSchema), async (c) => {

        const expense = await c.req.valid("json")
        fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 })
        return c.json(fakeExpenses)
    })
    .get("/:id{[0-9]+}", async (c) => {
        const id = Number.parseInt(c.req.param("id"))
        const expense = fakeExpenses.find(expense => expense.id === id)
        if (!expense) {
            return c.status(404)
        }

        return c.json({ expense })
    })
    .delete("/:id{[0-9]+}", async (c) => {
        const id = Number.parseInt(c.req.param("id"))
        const index = fakeExpenses.findIndex(expense => expense.id === id)
        if (index === -1) {
            return c.notFound()
        }
        const deleteExpense = fakeExpenses.splice(index, 1)[0];
        return c.json({ expense: deleteExpense })
    })