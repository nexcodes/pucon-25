"use client";

import { Spinner } from "@/components/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { DateToString } from "@/types/utils";
import { Community } from "@prisma/client";
import { format } from "date-fns";
import {
  ArrowRight,
  Calendar,
  PlusCircle,
  Search,
  TreePine,
  Trees,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useGetCommunities } from "../_api/use-get-communities";
import { CommunityInviteDialog } from "../_components/community-invite-dialog";
import { getNicheInfo } from "../_utils";

export type CommunityWithCount = DateToString<Community> & {
  _count: {
    members: number;
  };
};

export default function CommunitiesPage() {
  const { data: communities, isLoading } = useGetCommunities();
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [selectedCommunity, setSelectedCommunity] =
    useState<CommunityWithCount | null>(null);

  const handleOpenInviteDialog = (community: CommunityWithCount) => {
    setSelectedCommunity(community);
    setInviteDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="w-8 h-8 border-2 border-t-green-400 border-gray-100 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 font-medium">Loading communities</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 sm:px-8 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center mb-3">
                <div className="bg-green-400 p-1.5 rounded-full shadow-sm mr-3">
                  <Trees size={20} className="text-white" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-800">
                  Communities
                </h1>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl">
                Join vibrant communities of like-minded people and collaborate
                on shared sustainability goals.
              </p>
            </div>
            <Link href="/community/create">
              <Button className="bg-green-400 hover:bg-green-500 text-white border-none h-10 px-4 rounded-md transition-colors font-medium">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Community
              </Button>
            </Link>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 z-10 text-gray-400" />
            <Input
              placeholder="Search communities..."
              className="pl-10 h-10 bg-gray-50 border-gray-100 rounded-md focus:border-green-300 focus:ring-0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities?.map((community) => (
            <Card
              key={community.id}
              className="overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 bg-white rounded-md"
            >
              <CardHeader className="pb-2 relative">
                <Badge
                  className={cn(
                    "absolute right-6 top-6 font-medium",
                    getNicheInfo(community.niche).color
                  )}
                >
                  {getNicheInfo(community.niche).label}
                </Badge>
                <CardTitle className="text-xl font-bold text-gray-800">
                  {community.name}
                </CardTitle>
                <CardDescription className="flex items-center text-sm text-gray-500">
                  <Users className="h-3.5 w-3.5 mr-1" />
                  {community._count.members} members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {community.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  Created {format(new Date(community.createdAt), "dd MMM, yyyy")}
                </div>
                <div className="flex space-x-2">
                  <Link href={`/community/${community.id}`}>
                    <Button
                      size="sm"
                      className="bg-white text-green-500 hover:bg-gray-50 hover:text-green-600 border border-gray-100 rounded-md group transition-colors text-xs font-medium"
                    >
                      Visit
                      <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    className="bg-white text-gray-500 hover:bg-gray-50 border border-gray-100 rounded-md transition-colors text-xs font-medium"
                    onClick={() => handleOpenInviteDialog(community)}
                  >
                    <UserPlus className="mr-1 h-3.5 w-3.5" />
                    Invite
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {communities?.length === 0 && (
          <div className="text-center py-16 px-4 rounded-md border border-dashed border-gray-200 bg-gray-50 mt-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white mb-4">
              <TreePine className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              No communities found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Be the first to create a community and start bringing people
              together around shared sustainability interests.
            </p>
            <Link href="/community/create">
              <Button className="bg-green-400 hover:bg-green-500 text-white py-2 px-4 rounded-md font-medium transition-colors">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Your First Community
              </Button>
            </Link>
          </div>
        )}
      </div>

      {selectedCommunity && (
        <CommunityInviteDialog
          open={inviteDialogOpen}
          onOpenChange={setInviteDialogOpen}
          community={selectedCommunity}
        />
      )}
    </div>
  );
}