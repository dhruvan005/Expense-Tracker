import { createFileRoute, Outlet } from "@tanstack/react-router";


const Component = () => {
  const  { user} = Route.useRouteContext();
  if(!user) {
    return <div>Please login</div>
  }
  return <Outlet />;
};


export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({  }) => {
    // check if user is authenticated
    return { user: {name: "dmp"} };
    // return {user : null };
  },
  component: Component,
});
