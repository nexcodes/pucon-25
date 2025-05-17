import { Hono } from "hono";
import { createCommunitySchema } from "@/schema/community.schema";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { zValidator } from "@hono/zod-validator";

const app = new Hono()
  .get("/", async (c) => {
    const communities = await db.community.findMany({
      include: {
        _count: {
          select: { members: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return c.json({ data: communities });
  })
  .post("/", zValidator("json", createCommunitySchema), async (c) => {
    const data = c.req.valid("json");

    const user = await currentUser();

    if (!user) {
      return c.json({ error: "Unauthorized!" }, 401);
    }

    const community = await db.community.create({
      data: {
        ...data,
        members: {
          create: {
            userId: user.id,
            role: "ADMIN",
          },
        },
      },
    });

    return c.json({ data: community }, 201);
  });

export default app;
