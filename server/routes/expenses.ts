import { Hono } from "hono";
import { createExpenseSchema } from "../Types"
import { zValidator } from "@hono/zod-validator";
import { getUser } from "../kinde"
import { db } from "../db"
import { expenses as expenseTable } from "../db/schema/expenses";
import { desc, eq, sum, and } from "drizzle-orm"


export const expensesRoute = new Hono()
    .get("/", getUser, async (c) => {
        const user = c.var.user
        // console.log("inside expense get route ", user)
        const expense = await db
            .select()
            .from(expenseTable)
            .where(eq(expenseTable.userId, user.id))
            .orderBy(desc(expenseTable.createdAt))
            .limit(50)
        return c.json({ expenses: expense })
    })
    .get("/totalSpent", getUser, async (c) => {
        const user = c.var.user;
        const totalSpent = await db
            .select({ totalSpent: sum(expenseTable.amount) })
            .from(expenseTable)
            .where(eq(expenseTable.userId, user.id))
            .limit(1)
            .then(res => res[0])
        return c.json(totalSpent)
    })
    .post("/", getUser, zValidator("json", createExpenseSchema), async (c) => {
        const user = c.var.user
        const expense = await c.req.valid("json")
        // console.log("inside post route : ", user, "expense : ", expense)
        const newExpense = await db
            .insert(expenseTable)
            .values({ ...expense, userId: user.id })
            .returning()
        return c.json(newExpense)
    }).get("/:id{[0-9]+}", getUser, async (c) => {
        const id = Number.parseInt(c.req.param('id'))
        const user = c.var.user;
        const expense = await db
            .select()
            .from(expenseTable)
            .where(and(eq(expenseTable.userId, user.id), eq(expenseTable.id, id)))
            .limit(1)
            .then(res => res[0])
        if (!expense) {
            return c.status(404)
        }
        return c.json({ expense })
    })
    .delete("/:id{[0-9]+}", getUser, async (c) => {
        const id = Number.parseInt(c.req.param('id'))
        const user = c.var.user;
        const deleteExpense = await db
            .delete(expenseTable)
            .where(and(eq(expenseTable.userId, user.id), eq(expenseTable.id, id)))
            .returning()
            .then(res => res[0])

        if (!deleteExpense) {
            return c.notFound()
        }

        return c.json({ expense: deleteExpense })
    })