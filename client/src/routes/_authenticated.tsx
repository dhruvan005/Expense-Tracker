import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useQueryOptions } from "@/lib/api";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <>
      <div>Please login</div>
      <Button className="mt-4 bg-red-800">
        <a href="/api/login">login</a>
      </Button>
      <Button className="mt-4 bg-green-800">
        <a href="/api/register">Register</a>
      </Button>
    </>
  );
};

const Component = () => {
  const { user } = Route.useRouteContext();
  // console.log(user)
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
