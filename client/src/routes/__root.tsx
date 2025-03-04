
import { type QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Outlet,
} from "@tanstack/react-router";
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

interface MYRouteContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MYRouteContext>()({
  component: Root,
});


function Root() {
  return (
    <>
      
      <Outlet />
    </>
  );
}
