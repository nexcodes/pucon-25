import { db } from "@/lib/db";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono().get(
  "/communities/:communityId/aggregate",
  zValidator("param", z.object({ communityId: z.string().optional() })),
  async (c) => {
    const { communityId } = c.req.valid("param");

    if (!communityId) {
      return c.json({ error: "Community ID is required" }, 400);
    }

    // Fetch community goals and aggregate activity logs
    const [community, goals, activityStats] = await Promise.all([
      // Fetch community details
      db.community.findUnique({
        where: { id: communityId },
        select: { id: true, name: true },
      }),

      // Fetch all goals for the community
      db.communityGoal.findMany({
        where: { communityId },
        select: {
          id: true,
          title: true,
          targetValue: true,
          progress: true,
          createdAt: true,
        },
      }),

      // Aggregate activity log stats
      db.activityLog.aggregate({
        where: { communityId },
        _sum: { carbonSaved: true },
        _count: { id: true },
        _avg: { carbonSaved: true },
        _max: { activityDate: true },
        _min: { activityDate: true },
      }),
    ]);

    if (!community) {
      return c.json({ error: "Community not found" }, 404);
    }

    // Calculate additional metrics
    const totalCarbonSaved = activityStats._sum.carbonSaved || 0;
    const totalActivities = activityStats._count.id || 0;
    const averageCarbonPerActivity = activityStats._avg.carbonSaved || 0;

    // Calculate goal completion percentages
    const goalsWithProgress = goals.map((goal) => ({
      ...goal,
      completionPercentage:
        goal.targetValue > 0
          ? ((goal.progress / goal.targetValue) * 100).toFixed(2)
          : 0,
    }));

    // Count unique contributors
    const uniqueContributors = await db.activityLog.groupBy({
      by: ["userId"],
      where: { communityId },
      _count: { userId: true },
    });

    const response = {
      community: {
        id: community.id,
        name: community.name,
      },
      metrics: {
        totalCarbonSaved: Number(totalCarbonSaved.toFixed(2)),
        totalActivities,
        averageCarbonPerActivity: Number(averageCarbonPerActivity.toFixed(2)),
        uniqueContributors: uniqueContributors.length,
        lastActivityDate: activityStats._max.activityDate,
        firstActivityDate: activityStats._min.activityDate,
      },
      goals: goalsWithProgress,
    };

    return c.json(response);
  }
);

export default app;
