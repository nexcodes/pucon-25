"use client";

import { CommunityDashboard } from "../../_components/community-dashboard";
import { useGetCommunity } from "../../_api/use-get-community";
import { notFound, useParams } from "next/navigation";
import { Spinner } from "@/components/spinner";

export default function Home() {
  const { communityId } = useParams();

  const { data, isLoading } = useGetCommunity(communityId as string);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!data) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <CommunityDashboard community={data} />
    </main>
  );
}
