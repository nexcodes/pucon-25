import { Hono } from "hono";

const app = new Hono().get("/hello", (c) => {
  return c.json({
    message: "Sample GET route",
  });
});

export default app;
