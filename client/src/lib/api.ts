import { hc } from "hono/client";
import { ApiRoutes } from "@server/app.ts";
import { queryOptions } from "@tanstack/react-query";


const client = hc<ApiRoutes>("/");

export const api = client.api;

async function getCurrentUser() {
    const res = await api.me.$get();
    if (!res.ok) {
        throw new Error("Failed to fetch user");
    }
    const data = await res.json();
    return data;
}

// This is a custom hook that returns the query options for the getCurrentUser query
// This is useful because we can reuse this hook in multiple components
export const useQueryOptions = queryOptions({
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentUser,
    staleTime: Infinity
});