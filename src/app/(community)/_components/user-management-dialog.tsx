"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  MoreHorizontal,
  UserMinus,
  Shield,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { CommunityMember, Role, User } from "@prisma/client";
import { DateToString } from "@/types/utils";
import { useAdminRemoveUserFromCommunity } from "../_api/use-admin-remove-user-from-community";
import { useAdminUpdateMemberRoleInCommunity } from "../_api/use-admin-update-member-role-in-community";

interface UserManagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members: (DateToString<CommunityMember> & { user: DateToString<User> })[];
  communityId: string;
}

export function UserManagementDialog({
  open,
  onOpenChange,
  members,
  communityId,
}: UserManagementDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredMembers = members.filter(
    (member) =>
      member.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadge = (role: Role) => {
    switch (role) {
      case "ADMIN":
        return (
          <Badge className="bg-purple-500 hover:bg-purple-600">
            <ShieldAlert className="mr-1 h-3 w-3" />
            Admin
          </Badge>
        );
      case "COMMUNITY_LEADER":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <ShieldCheck className="mr-1 h-3 w-3" />
            Leader
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="text-gray-500 border-gray-300 hover:bg-gray-100"
          >
            Member
          </Badge>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Manage Community Members</DialogTitle>
          <DialogDescription>
            View, promote, demote, or remove members from your community.
          </DialogDescription>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search members..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
          {filteredMembers.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">
                No members found matching your search.
              </CardContent>
            </Card>
          ) : (
            filteredMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 border rounded-md bg-white hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${member.user.id}`}
                    />
                    <AvatarFallback>
                      {member.user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.user.name}</div>
                    <div className="text-sm text-gray-500">
                      {member.user.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {getRoleBadge(member.role)}

                  {member.role !== "ADMIN" && (
                    <Actions member={member} communityId={communityId} />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Actions({
  member,
  communityId,
}: {
  member: DateToString<CommunityMember> & {
    user: DateToString<User>;
  };
  communityId: string;
}) {
  const { mutate: removeUser, isPending: isRemoving } =
    useAdminRemoveUserFromCommunity(communityId, member.user.id);

  const { mutate: updateUserRole, isPending: isUpdatingUserRole } =
    useAdminUpdateMemberRoleInCommunity(communityId, member.user.id);

  const isPending = isRemoving || isUpdatingUserRole;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {member.role === "USER" ? (
          <DropdownMenuItem
            disabled={isPending}
            onClick={() => updateUserRole({ role: "COMMUNITY_LEADER" })}
          >
            <Shield className="mr-2 h-4 w-4" />
            <span>Promote to Leader</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            disabled={isPending}
            onClick={() => updateUserRole({ role: "USER" })}
          >
            <Shield className="mr-2 h-4 w-4" />
            <span>Demote to Member</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          disabled={isPending}
          className="text-red-500 focus:text-red-500"
          onClick={() => removeUser()}
        >
          <UserMinus className="mr-2 h-4 w-4" />
          <span>Remove from Community</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
