import { z } from "zod";

// Base activity post schema for validation
export const activityPostSchema = z.object({
  content: z
    .string()
    .min(1, "Post content cannot be empty")
    .max(2000, "Post content cannot exceed 2000 characters"),
});

// Schema for creating a new activity post
export const createActivityPostSchema = activityPostSchema;

// Schema for updating an existing activity post
export const updateActivityPostSchema = activityPostSchema.partial();
