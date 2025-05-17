"use client";

import { useCurrentUser } from "@/app/hooks/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Settings, Shield, UserPlus, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { FullCommunity } from "./community-dashboard";
import { InviteManagementDialog } from "./invite-management-dialog";
import { UserManagementDialog } from "./user-management-dialog";

interface CommunityHeaderProps {
  community: FullCommunity;
}

export function CommunityHeader({ community }: CommunityHeaderProps) {
  const { user } = useCurrentUser();

  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [userManagementDialogOpen, setUserManagementDialogOpen] =
    useState(false);

  const isAdmin = useMemo(
    () =>
      community.members.some(
        (member) => member.role === "ADMIN" && member.userId === user?.id
      ),
    [community.members, user?.id]
  );

  const isLeader =
    useMemo(
      () =>
        community.members.some(
          (member) =>
            member.role === "COMMUNITY_LEADER" && member.userId === user?.id
        ),
      [community.members, user?.id]
    ) || isAdmin;

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
      <Avatar className="w-24 h-24 border-4 border-green-500">
        <AvatarImage
          src={`https://avatar.vercel.sh/${community.name}`}
          alt={community.name}
        />
        <AvatarFallback className="text-2xl bg-green-100 text-green-700">
          {community.name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="space-y-2 flex-1">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">{community.name}</h1>
          <Badge className="bg-green-500 hover:bg-green-600">
            {community.niche}
          </Badge>
        </div>
        <p className="text-gray-600 max-w-2xl">{community.description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <Users className="h-4 w-4 mr-1" />
          <span>{community._count.members || 0} members</span>
        </div>
      </div>

      {isLeader && (
        <div className="mt-2 md:mt-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="hover:border-green-200 hover:bg-green-50 hover:text-green-600"
              >
                <Settings className="mr-2 h-4 w-4" />
                Manage
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Community Management</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setInviteDialogOpen(true)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Manage Invites</span>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem
                    onClick={() => setUserManagementDialogOpen(true)}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Manage Members</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {isLeader && (
            <InviteManagementDialog
              open={inviteDialogOpen}
              onOpenChange={setInviteDialogOpen}
              invites={community.CommunityInvite}
            />
          )}

          {isAdmin && (
            <UserManagementDialog
              open={userManagementDialogOpen}
              onOpenChange={setUserManagementDialogOpen}
              members={community.members}
              communityId={community.id}
            />
          )}
        </div>
      )}
    </div>
  );
}
