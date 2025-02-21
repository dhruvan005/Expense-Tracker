import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useQueryOptions } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";

const Login = () => {
  return (
    <>
      <div className="relative h-[600px] w-full items-center justify-center overflow-hidden p-4 sm:p-6 md:p-10">
        <DotPattern
          glow={true}
          className={cn(
            "absolute inset-0 w-full h-full [mask-image:radial-gradient(700px_circle_at_center,white,transparent)]"
          )}
        />
        <div className="relative flex flex-col w-full sm:w-[60vw] md:w-[40vw] lg:w-[30vw] p-4 sm:p-6 md:p-10 justify-center rounded-md m-auto border-2 shadow-lg bg-opacity-10 backdrop-blur-md backdrop-saturate-150">
          <div className="text-center text-xl sm:text-2xl font-semibold mb-4">
            Please login or Register
          </div>
          <Button
            className="mt-4 bg-red-800 text-white py-2 px-4 rounded cursor-pointer"
            onClick={() => (window.location.href = "/api/login")}
          >
            Login
          </Button>
          <Button
            className="mt-4 bg-green-800 text-white py-2 px-4 rounded cursor-pointer"
            onClick={() => (window.location.href = "/api/register")}
          >
            Register
          </Button>
        </div>
      </div>
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