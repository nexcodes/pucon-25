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
  CommunityInvite,
} from "@prisma/client";
import { CommunityHeader } from "./community-header";
import { GoalsList } from "./goals-list";
import { ActivityLogs } from "./activity-logs";
import { ActivityFeed } from "./activity-feed";
import AiInsight from "./ai-insight";
import AnalyticsBoard from "./analytics";
import { Leaderboard } from "./leaderboard";
import { useGetAnalyticsByCommunity } from "../_api/use-get-analyics-by-community";

export type FullCommunity = DateToString<Community> & {
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
  CommunityInvite: (DateToString<CommunityInvite> & {
    user: DateToString<User>;
  })[];
};

interface CommunityDashboardProps {
  community: FullCommunity;
}

export function CommunityDashboard({ community }: CommunityDashboardProps) {
  const { data, isLoading } = useGetAnalyticsByCommunity(community.id);

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <CommunityHeader community={community} />
      <Tabs defaultValue="dashboard" className="mt-6">
        <TabsList className="grid w-full grid-cols-6 mb-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="goals">Community Goals</TabsTrigger>
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
          <TabsTrigger value="feed">Activity Feed</TabsTrigger>
          <TabsTrigger value="ai">AI Insight</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
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
        <TabsContent value="dashboard">
          <AnalyticsBoard data={data} isLoading={isLoading} />
        </TabsContent>
        <TabsContent value="ai">
          <AiInsight communityId={community.id} />
        </TabsContent>
        <TabsContent value="leaderboard">
          <Leaderboard communityId={community.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
