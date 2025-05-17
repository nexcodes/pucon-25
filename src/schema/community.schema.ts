import { CommunityNiche } from "@prisma/client";
import { z } from "zod";

// Base community schema for validation
export const communitySchema = z.object({
  name: z
    .string()
    .min(2, "Community name must be at least 2 characters")
    .max(100, "Community name cannot exceed 100 characters"),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
  niche: z.nativeEnum(CommunityNiche),
});

// Schema for creating a new community
export const createCommunitySchema = communitySchema;

// Schema for updating an existing community
export const updateCommunitySchema = communitySchema.partial();
