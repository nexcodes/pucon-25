import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { db } from "@/lib/db";

const app = new Hono()

  .get("/global", async (c) => {
    const leaderboard = await db.activityLog.groupBy({
      by: ["userId"],
      _sum: {
        carbonSaved: true,
      },
      orderBy: {
        _sum: {
          carbonSaved: "desc",
        },
      },
      take: 50,
    });

    // Fetch user details for the leaderboard
    const userIds = leaderboard.map((entry) => entry.userId);
    const users = await db.user.findMany({
      where: {
        id: { in: userIds },
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    });

    // Map leaderboard data with user details
    const result = leaderboard.map((entry, index) => {
      const user = users.find((u) => u.id === entry.userId);
      return {
        rank: index + 1,
        userId: entry.userId,
        name: user?.name ?? "Unknown",
        image: user?.image ?? null,
        totalCarbonSaved: entry._sum.carbonSaved ?? 0,
      };
    });

    return c.json({
      data: result,
      message: "Global leaderboard retrieved successfully",
    });
  })
  .get(
    "/:communityId",
    zValidator("param", z.object({ communityId: z.string().optional() })),
    async (c) => {
      const { communityId } = c.req.valid("param");

      try {
        // Check if community exists
        const community = await db.community.findUnique({
          where: { id: communityId },
        });
        if (!community) {
          return c.json({ error: "Community not found" }, 404);
        }

        // Fetch top 10 contributors based on total carbonSaved
        const leaderboard = await db.activityLog.groupBy({
          by: ["userId"],
          where: {
            communityId,
          },
          _sum: {
            carbonSaved: true,
          },
          orderBy: {
            _sum: {
              carbonSaved: "desc",
            },
          },
          take: 10,
        });

        // Fetch user details for the leaderboard
        const userIds = leaderboard.map((entry) => entry.userId);
        const users = await db.user.findMany({
          where: {
            id: { in: userIds },
          },
          select: {
            id: true,
            name: true,
            image: true,
          },
        });

        // Map leaderboard data with user details
        const result = leaderboard.map((entry, index) => {
          const user = users.find((u) => u.id === entry.userId);
          return {
            rank: index + 1,
            userId: entry.userId,
            name: user?.name ?? "Unknown",
            image: user?.image ?? null,
            totalCarbonSaved: entry._sum.carbonSaved ?? 0,
          };
        });

        return c.json({
          data: result,
          message: "Community leaderboard retrieved successfully",
        });
      } catch (error) {
        console.error("Error fetching community leaderboard:", error);
        return c.json({ error: "Internal server error" }, 500);
      }
    }
  );

export default app;
