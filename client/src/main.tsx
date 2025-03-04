import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/App-sidebar";

// Create a new query client instance
const queryClient = new QueryClient();
// Create a new router instance
const router = createRouter({ routeTree, context: { queryClient } });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main>
      <QueryClientProvider client={queryClient}>
        <div className="p-5">
          <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
            <RouterProvider router={router} />
          </SidebarProvider>
        </div>
      </QueryClientProvider>
    </main>
  </StrictMode>
);
