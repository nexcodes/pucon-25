import { z } from "zod";

// Base activity log schema for validation
export const activityLogSchema = z.object({
  goalId: z.string().cuid("Invalid goal ID format"),
  description: z
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(500, "Description cannot exceed 500 characters"),
  carbonSaved: z.number().min(0, "Carbon saved cannot be negative"),
  activityDate: z.coerce.date().refine((date) => date <= new Date(), {
    message: "Activity date cannot be in the future",
  }),
});

// Schema for creating a new activity log
export const createActivityLogSchema = activityLogSchema;

// Schema for updating an existing activity log
export const updateActivityLogSchema = activityLogSchema.partial();
