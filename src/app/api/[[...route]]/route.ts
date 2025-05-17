import { Hono } from "hono";
import { handle } from "hono/vercel";
import {
  community,
  sample,
  goals,
  activityFeed,
  activityLog,
  communityUserManageMent,
  invite,
} from "./controllers/(base)";
import { HTTPException } from "hono/http-exception";

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.json({
    message: "Hello Next.js!",
  });
});

app.onError((err, c) => {
  console.log(err);

  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return c.json({ message: "Internal Error" }, 500);
});

const routes = app
  .route("/sample", sample)
  .route("/community", community)
  .route("/goals", goals)
  .route("/activity-log", activityLog)
  .route("/activity-feed", activityFeed)
  .route("/community-user-management", communityUserManageMent)
  .route("/invite", invite);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
