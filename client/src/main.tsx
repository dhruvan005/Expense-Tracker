import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
 
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
    <RouterProvider router={router}/>
    </QueryClientProvider>
  </StrictMode>,
)
