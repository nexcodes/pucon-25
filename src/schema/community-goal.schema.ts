import { z } from "zod";

// Base community goal schema for validation
export const communityGoalSchema = z.object({
  title: z
    .string()
    .min(2, "Goal title must be at least 2 characters")
    .max(100, "Goal title cannot exceed 100 characters"),
  description: z.string().max(500, "Description cannot exceed 500 characters"),
  targetValue: z.number().positive("Target value must be positive"),
});

// Schema for creating a new community goal
export const createCommunityGoalSchema = communityGoalSchema;

// Schema for updating an existing community goal
export const updateCommunityGoalSchema = communityGoalSchema.partial();
