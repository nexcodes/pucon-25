import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { CreateCommunityInviteSchema } from "@/schema/invite.schema";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono().post(
  "/:communityId",
  zValidator("param", z.object({ communityId: z.string().optional() })),
  zValidator("json", CreateCommunityInviteSchema),
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

    // Check if an invite already exists for this email
    const existingInvite = await db.communityInvite.findFirst({
      where: {
        AND: [
          {
            communityId,
          },
          {
            userId: user.id,
          },
        ],
      },
    });

    if (existingInvite) {
      return c.json({ error: "An invite for this user already exists" }, 400);
    }

    const invite = await db.communityInvite.create({
      data: {
        ...data,
        communityId,
        userId: user.id,
      },
    });

    return c.json({ data: invite }, 201);
  }
);

export default app;
