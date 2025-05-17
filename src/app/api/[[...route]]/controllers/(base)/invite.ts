import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { CreateCommunityInviteSchema } from "@/schema/invite.schema";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .post(
    "/:communityId",
    zValidator("param", z.object({ communityId: z.string().optional() })),
    zValidator("json", CreateCommunityInviteSchema),
    async (c) => {
      const { communityId } = c.req.valid("param");

      if (!communityId) {
        return c.json({ error: "Community ID is required" }, 400);
      }

      const data = c.req.valid("json");

      const user = await currentUser();

      if (!user) {
        return c.json({ error: "Unauthorized!" }, 401);
      }

      // Check if an invite already exists for this email
      const existingInvite = await db.communityInvite.findFirst({
        where: {
          AND: [
            {
              communityId,
            },
            {
              userId: user.id,
            },
          ],
        },
      });

      if (existingInvite) {
        return c.json({ error: "An invite for this user already exists" }, 400);
      }

      const invite = await db.communityInvite.create({
        data: {
          ...data,
          communityId,
          userId: user.id,
        },
      });

      return c.json({ data: invite }, 201);
    }
  )
  .patch(
    "/:inviteId",
    zValidator("param", z.object({ inviteId: z.string().optional() })),
    zValidator(
      "json",
      z.object({
        status: z.enum(["PENDING", "ACCEPTED", "DECLINED"]),
      })
    ),
    async (c) => {
      const { inviteId } = c.req.valid("param");
      const { status } = c.req.valid("json");

      if (!inviteId) {
        return c.json({ error: "Invite ID is required" }, 400);
      }

      const user = await currentUser();

      if (!user) {
        return c.json({ error: "Unauthorized!" }, 401);
      }

      // Find the invite
      const invite = await db.communityInvite.findUnique({
        where: { id: inviteId },
        include: { community: true },
      });

      if (!invite) {
        return c.json({ error: "Invite not found" }, 404);
      }

      // Check if user has permission (admin or community leader)
      const membership = await db.communityMember.findFirst({
        where: {
          AND: [
            { communityId: invite.communityId },
            { userId: user.id },
            { role: { in: ["ADMIN", "COMMUNITY_LEADER"] } },
          ],
        },
      });

      if (!membership) {
        return c.json(
          {
            error:
              "Permission denied: only community leaders and admins can update invites",
          },
          403
        );
      }

      // Update the invite status
      const updatedInvite = await db.communityInvite.update({
        where: { id: inviteId },
        data: { status },
      });

      // If the status is accepted, add the user to the community
      if (status === "ACCEPTED" && invite.userId) {
        // Check if the user is already a member
        const existingMembership = await db.communityMember.findFirst({
          where: {
            userId: invite.userId,
            communityId: invite.communityId,
          },
        });

        if (!existingMembership) {
          // Create a new community member
          await db.communityMember.create({
            data: {
              userId: invite.userId,
              communityId: invite.communityId,
              role: "USER",
            },
          });
        }
      }

      return c.json({ data: updatedInvite });
    }
  );

export default app;
