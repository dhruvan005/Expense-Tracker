import { hc } from "hono/client";
import { ApiRoutes } from "@server/app.ts";

const client = hc<ApiRoutes>("/");

export const api = client.api;