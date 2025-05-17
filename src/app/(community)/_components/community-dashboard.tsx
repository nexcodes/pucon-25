"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateToString } from "@/types/utils";
import {
  Community,
  CommunityGoal,
  ActivityLog,
  ActivityPost,
  CommunityMember,
  User,
} from "@prisma/client";
import { CommunityHeader } from "./community-header";
import { GoalsList } from "./goals-list";
import { ActivityLogs } from "./activity-logs";
import { ActivityFeed } from "./activity-feed";

interface CommunityDashboardProps {
  community: DateToString<Community> & {
    _count: {
      members: number;
    };
    goals: DateToString<CommunityGoal & { createdBy: User }>[];
    ActivityLog: (DateToString<ActivityLog> & {
      user: DateToString<User>;
      goal: DateToString<CommunityGoal>;
    })[];
    posts: (DateToString<ActivityPost> & {
      user: DateToString<User>;
    })[];
    members: (DateToString<CommunityMember> & {
      user: DateToString<User>;
    })[];
  };
}

export function CommunityDashboard({ community }: CommunityDashboardProps) {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <CommunityHeader
        community={{
          name: community.name,
          description: community.description,
          niche: community.niche,
          memberCount: community._count.members,
        }}
      />

      <Tabs defaultValue="goals" className="mt-6">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="goals">Community Goals</TabsTrigger>
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
          <TabsTrigger value="feed">Activity Feed</TabsTrigger>
        </TabsList>

        <TabsContent value="goals" className="space-y-4">
          <GoalsList communityId={community.id} goals={community.goals} />
        </TabsContent>

        <TabsContent value="logs">
          <ActivityLogs
            communityId={community.id}
            logs={community.ActivityLog}
            goals={community.goals}
          />
        </TabsContent>

        <TabsContent value="feed">
          <ActivityFeed communityId={community.id} posts={community.posts} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
