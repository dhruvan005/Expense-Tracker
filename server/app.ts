import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { expensesRoute } from './routes/expenses'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/bun'
import { authRoute } from './routes/auth'
const app = new Hono()

app.use(logger())
app.use('/api/*', cors())

const apiRoutes = app.basePath("/api").route("/expenses", expensesRoute).route("/" , authRoute)

// serving the static file , for avoiding CORS Error 
app.use('*', serveStatic({ root: './client/dist' }))
app.get('*', serveStatic({ path: './client/dist/index.html' }))

export default app;
export type ApiRoutes = typeof apiRoutes;