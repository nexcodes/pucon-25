import { z } from "zod";

// Define the base CommunityInvite schema
export const CommunityInviteSchema = z.object({
  message: z.string().nullable().optional(),
});

// Schema for creating a new invite
export const CreateCommunityInviteSchema = CommunityInviteSchema;

// Schema for updating an invite
export const UpdateCommunityInviteSchema = CommunityInviteSchema.partial();
