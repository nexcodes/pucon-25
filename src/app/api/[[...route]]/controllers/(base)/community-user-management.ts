import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

// Schema for updating a member's role
const updateMemberRoleSchema = z.object({
  role: z.enum(["USER", "COMMUNITY_LEADER"]),
});

const app = new Hono()

  // Remove a user from a community (admin only)
  .delete(
    "/:communityId/members/:userId",
    zValidator(
      "param",
      z.object({
        communityId: z.string().optional(),
        userId: z.string().optional(),
      })
    ),
    async (c) => {
      const { communityId, userId } = c.req.valid("param");

      if (!communityId || !userId) {
        return c.json({ error: "Community ID and User ID are required" }, 400);
      }

      const currentUserData = await currentUser();

      if (!currentUserData) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      // Check if current user is an admin of the community
      const adminMembership = await db.communityMember.findUnique({
        where: {
          userId_communityId: {
            userId: currentUserData.id,
            communityId,
          },
        },
      });

      if (!adminMembership || adminMembership.role !== "ADMIN") {
        return c.json(
          { error: "Only community admins can remove members" },
          403
        );
      }

      // Prevent admins from removing themselves
      if (userId === currentUserData.id) {
        return c.json(
          { error: "Admins cannot remove themselves from the community" },
          400
        );
      }

      // Remove the member
      await db.communityMember.delete({
        where: {
          userId_communityId: {
            userId,
            communityId,
          },
        },
      });

      return c.json({ success: true }, 200);
    }
  )

  // Update member role (admin only)
  .patch(
    "/:communityId/members/:userId/role",
    zValidator(
      "param",
      z.object({
        communityId: z.string().optional(),
        userId: z.string().optional(),
      })
    ),
    zValidator("json", updateMemberRoleSchema),
    async (c) => {
      const { communityId, userId } = c.req.valid("param");
      const { role } = c.req.valid("json");

      if (!communityId || !userId) {
        return c.json({ error: "Community ID and User ID are required" }, 400);
      }

      const currentUserData = await currentUser();

      if (!currentUserData) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      // Check if current user is an admin of the community
      const adminMembership = await db.communityMember.findUnique({
        where: {
          userId_communityId: {
            userId: currentUserData.id,
            communityId,
          },
        },
      });

      if (!adminMembership || adminMembership.role !== "ADMIN") {
        return c.json(
          { error: "Only community admins can update member roles" },
          403
        );
      }

      // Check if user is trying to update their own role
      if (userId === currentUserData.id) {
        return c.json({ error: "Admins cannot change their own role" }, 400);
      }

      // Update the member's role
      const updatedMember = await db.communityMember.update({
        where: {
          userId_communityId: {
            userId,
            communityId,
          },
        },
        data: {
          role,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      });

      return c.json({ data: updatedMember }, 200);
    }
  );

export default app;
