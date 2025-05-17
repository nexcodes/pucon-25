import { z } from "zod";

// Base activity log schema for validation
export const activityLogSchema = z.object({
  goalId: z.string().cuid("Invalid goal ID format"),
  description: z
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(500, "Description cannot exceed 500 characters"),
  carbonSaved: z.number().min(0, "Carbon saved cannot be negative"),
  activityDate: z.date({
    required_error: "Activity date is required",
    invalid_type_error: "Activity date must be a valid date",
  }),
});

// Schema for creating a new activity log
export const createActivityLogSchema = activityLogSchema;

// Schema for updating an existing activity log
export const updateActivityLogSchema = activityLogSchema.partial();
