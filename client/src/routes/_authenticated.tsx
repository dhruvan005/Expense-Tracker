import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useQueryOptions } from "@/lib/api";

const Login = () => {
  return (
    <>
      <div>Please login</div>
      <a href="/api/login"> login</a>
    </>
  );
};

const Component = () => {
  const { user } = Route.useRouteContext();
  console.log(user)
  if (!user) {
    return <Login />;
  }
  return <Outlet />;
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;

    try {
      const data = await queryClient.fetchQuery(useQueryOptions);
      
      return { user: data };
    } catch (error) {
      return { user: null };
    }
  },
  component: Component,
});
