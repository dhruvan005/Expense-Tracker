import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { expensesRoute } from './routes/expenses'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/deno'
const app = new Hono()

app.use(logger())
app.use('/api/*', cors())
app.get('/', (c) => c.text('Hello Bun! hi'))

app.use('/static/*', serveStatic({ root: './' }))
app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))
app.get('/', (c) => c.text('You can access: /static/hello.txt'))
app.get('*', serveStatic({ path: './static/fallback.txt' }))

app.route("api/expenses", expensesRoute)

export default app