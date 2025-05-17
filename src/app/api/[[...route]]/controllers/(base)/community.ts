import { Hono } from "hono";
import { createCommunitySchema } from "@/schema/community.schema";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

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
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string().optional() })),
    async (c) => {
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Community ID is required" }, 400);
      }

      const community = await db.community.findUnique({
        where: { id },
        include: {
          _count: {
            select: { members: true },
          },
          goals: {
            include: {
              createdBy: true,
            },
          },
          posts: {
            include: {
              user: true,
            },
          },
          ActivityLog: {
            include: {
              user: true,
              goal: true,
            },
          },
          members: {
            include: {
              user: true,
            },
          },
        },
      });

      if (!community) {
        return c.json({ error: "Community not found" }, 404);
      }

      return c.json({ data: community });
    }
  )
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
