import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { expensesRoute } from './routes/expenses'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/bun'
const app = new Hono()

app.use(logger())
app.use('/api/*', cors())


//  for always running the client app 

app.route("api/expenses", expensesRoute)
app.use('*', serveStatic({ root: './client/dist' }))
app.get('*', serveStatic({ path: './client/dist/index.html' }))

export default app