import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { createActivityLogSchema } from "@/schema/activity-log.schema";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono().post(
  "/:communityId",
  zValidator("param", z.object({ communityId: z.string().optional() })),
  zValidator("json", createActivityLogSchema),
  async (c) => {
    const { communityId } = c.req.valid("param");

    if (!communityId) {
      return c.json({ error: "Community ID is required" }, 400);
    }

    const data = c.req.valid("json");

    const user = await currentUser();

    if (!user) {
      return c.json({ error: "Unauthorized!" }, 401);
    }

    const log = await db.activityLog.create({
      data: {
        ...data,
        communityId,
        userId: user.id,
      },
    });

    return c.json({ data: log }, 201);
  }
);

export default app;
