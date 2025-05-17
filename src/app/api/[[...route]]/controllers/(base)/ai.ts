import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = new Hono();
const prisma = new PrismaClient();

app.get(
  "/:communityId",
  zValidator("param", z.object({ communityId: z.string() })),
  async (c) => {
    try {
      const { communityId } = c.req.valid("param");

      // Fetch community data with related models
      const community = await prisma.community.findUnique({
        where: { id: communityId },
        include: {
          goals: {
            include: {
              ActivityLog: true,
            },
          },
          members: true,
          posts: true,
        },
      });

      if (!community) {
        return c.json({ error: "Community not found" }, 404);
      }

      // Summarize community progress
      const totalCarbonSaved = community.goals.reduce((sum, goal) => {
        const goalCarbonSaved = goal.ActivityLog.reduce(
          (acc, log) => acc + log.carbonSaved,
          0
        );
        return sum + goalCarbonSaved;
      }, 0);

      const totalGoals = community.goals.length;
      const averageProgress = community.goals.length
        ? community.goals.reduce((sum, goal) => sum + goal.progress, 0) /
          community.goals.length
        : 0;

      const communityProgress = {
        communityId: community.id,
        communityName: community.name,
        niche: community.niche,
        memberCount: community.members.length,
        postCount: community.posts.length,
        totalCarbonSaved,
        totalGoals,
        averageGoalProgress: averageProgress,
      };

      // Prepare prompt for Gemini
      const prompt = `
        Analyze the following progress data for a single community from an environmental sustainability platform. Provide insights on the community's performance, areas of strength, and suggestions for improvement. Focus on carbon footprint reduction and community engagement.

        Community Progress Data:
        ${JSON.stringify(communityProgress, null, 2)}

        Please provide:
        1. A summary of the community's performance.
        2. Key strengths in their sustainability efforts.
        3. Recommendations to improve community engagement and progress toward sustainability goals.
      `;

      // Call Gemini API
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const geminiResponse = await result.response.text();

      return c.json({
        message: "Community progress insights",
        data: communityProgress,
        aiInsights: geminiResponse,
      });
    } catch (error) {
      console.error("Error fetching community progress:", error);
      return c.json({ error: "Failed to fetch community progress" }, 500);
    }
  }
);

export default app;
