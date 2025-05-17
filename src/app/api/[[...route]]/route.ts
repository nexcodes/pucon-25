import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { handle } from "hono/vercel";
import {
  activityFeed,
  activityLog,
  gemini,
  community,
  communityUserManageMent,
  goals,
  invite,
  sample,
  analytics,
  leaderboard,
} from "./controllers/(base)";

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
  .route("/gemini", gemini)
  .route("/community-user-management", communityUserManageMent)
  .route("/invite", invite)
  .route("/analytics", analytics)
  .route("/leaderboard", leaderboard);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
