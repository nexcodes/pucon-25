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
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-8 py-8 sm:py-12">
      <div className="container">
        <div className="">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-3 text-primary">
                Discover Communities
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Join vibrant communities of like-minded people and collaborate
                on shared sustainability goals.
              </p>
            </div>
            <Link href="/community/create">
              <Button variant="primary">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Community
              </Button>
            </Link>
          </div>

          <div className="relative max-w-md mb-10">
            <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 z-10" />
            <Input
              placeholder="Search communities..."
              className="pl-10 h-12 bg-white/80 dark:bg-slate-950/50 backdrop-blur-sm "
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities?.map((community) => (
            <Card
              key={community.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 border-green-200/80 dark:border-green-800/30 bg-white/80 dark:bg-slate-950/50 backdrop-blur-sm"
            >
              <CardHeader className="pb-2 relative">
                <Badge
                  variant="secondary"
                  className={cn(
                    "absolute right-6 top-6",
                    getNicheInfo(community.niche).color
                  )}
                >
                  {getNicheInfo(community.niche).label}
                </Badge>
                <CardTitle className="text-xl font-bold text-primary">
                  {community.name}
                </CardTitle>
                <CardDescription className="flex items-center text-sm text-primary">
                  <Users className="h-3.5 w-3.5 mr-1" />
                  {community._count.members} members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {community.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-green-100 dark:border-green-800/30 pt-4">
                <div className="flex items-center text-xs">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  Created{" "}
                  {format(new Date(community.createdAt), "dd MMM, yyyy")}
                </div>
                <div className="flex space-x-2">
                  <Link href={`/community/${community.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/30 dark:hover:text-green-400 transition-colors"
                    >
                      Visit
                      <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="group hover:bg-green-100 hover:text-green-700 hover:border-green-300 dark:hover:bg-green-900/30 dark:hover:text-green-400 dark:hover:border-green-700 transition-colors"
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
          <div className="text-center py-20 px-4 rounded-xl border border-dashed border-green-300 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
              <TreePine className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-green-900 dark:text-green-50">
              No communities found
            </h3>
            <p className="text-green-700 dark:text-green-300 text-lg max-w-md mx-auto mb-6">
              Be the first to create a community and start bringing people
              together around shared sustainability interests.
            </p>
            <Link href="/community/create">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-auto text-lg shadow-md hover:shadow-lg transition-all">
                <PlusCircle className="mr-2 h-5 w-5" />
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
