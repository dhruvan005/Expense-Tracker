
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
    component: () => Root()
});

function NavBar() {
    return (
        <>
        <div className="h-5"></div>
        <div className="p-2 flex justify-center  gap-10 p-3 bg-transparent border border-2 items-center bg-zinc-900 w-fit m-auto rounded-md  ">
        <Link to="/" className="[&.active]:font-bold [&.active]:text-[18px]">
            Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold [&.active]:text-[18px]">
            About
        </Link>
        <Link to="/expenses" className="[&.active]:font-bold [&.active]:text-[18px]">
            Expenses
        </Link>
        <Link to="/createExpense" className="[&.active]:font-bold [&.active]:text-[18px]">
            Create Expense
        </Link>
        <Link to="/profile" className="[&.active]:font-bold [&.active]:text-[18px]">
            Profile
        </Link>
       
    </div>
        </>
    )
}

function Root() {
    return (
        <>
            <NavBar />
            <div className="h-3"></div>
            <Outlet />
        </>
    )
}