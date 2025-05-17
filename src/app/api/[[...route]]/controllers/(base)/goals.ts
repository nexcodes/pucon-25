import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { createCommunityGoalSchema } from "@/schema/community-goal.schema";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .get(
    "/:communityId",
    zValidator("param", z.object({ communityId: z.string().optional() })),
    async (c) => {
      const { communityId } = c.req.valid("param");

      if (!communityId) {
        return c.json({ error: "Community ID is required" }, 400);
      }

      const goals = await db.communityGoal.findMany({
        where: {
          id: communityId,
        },
        orderBy: {
          progress: "desc",
        },
      });

      return c.json({ data: goals });
    }
  )
  .post(
    "/:communityId",
    zValidator("param", z.object({ communityId: z.string().optional() })),
    zValidator("json", createCommunityGoalSchema),
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

      const goal = await db.communityGoal.create({
        data: {
          ...data,
          communityId,
          createdById: user.id,
        },
      });

      return c.json({ data: goal }, 201);
    }
  );

export default app;
