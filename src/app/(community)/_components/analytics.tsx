import React from "react";
import { useGetAnalyticsByCommunity } from "../_api/use-get-analyics-by-community";
import { Spinner } from "@/components/spinner";
import {
  CalendarIcon,
  LeafIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

export default function AnalyticsBoard({
  communityId,
}: {
  communityId: string;
}) {
  const { data, isLoading } = useGetAnalyticsByCommunity(communityId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { goals, metrics } = data;

  // Format dates for display
  const lastActivityFormatted = formatDistanceToNow(
    new Date(metrics.lastActivityDate || new Date()),
    { addSuffix: true }
  );
  const firstActivityFormatted = formatDistanceToNow(
    new Date(metrics.firstActivityDate || new Date()),
    { addSuffix: true }
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 md:p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                Carbon Saved
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                <LeafIcon className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">
                {metrics.totalCarbonSaved.toFixed(2)}{" "}
                <span className="text-lg">tons</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Avg. {metrics.averageCarbonPerActivity.toFixed(2)} tons per
                activity
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                Total Activities
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                <TrendingUpIcon className="h-4 w-4 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">
                {metrics.totalActivities}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Last activity {lastActivityFormatted}
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                Contributors
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                <UsersIcon className="h-4 w-4 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">
                {metrics.uniqueContributors}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Active member{metrics.uniqueContributors > 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                Activity Period
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                <CalendarIcon className="h-4 w-4 text-orange-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-gray-800">
                {new Date(
                  metrics.firstActivityDate || new Date()
                ).toLocaleDateString()}{" "}
                -{" "}
                {new Date(
                  metrics.lastActivityDate || new Date()
                ).toLocaleDateString()}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                First activity {firstActivityFormatted}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <TrendingUpIcon className="mr-2 h-5 w-5 text-gray-600" />
            Goals
          </h2>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
            {goals.map((goal) => (
              <Card
                key={goal.id}
                className="border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-gray-800">{goal.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    Target: {goal.targetValue} tons of carbon saved
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Progress
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {goal.completionPercentage}%
                      </span>
                    </div>
                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all duration-500 ease-in-out"
                        style={{ width: `${goal.completionPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 pt-1">
                      <span>Current: {goal.progress} tons</span>
                      <span>Target: {goal.targetValue} tons</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-10 mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5 text-gray-600" />
            Activity Timeline
          </h2>
          <Card className="border-gray-200 bg-white shadow-md">
            <CardContent className="pt-6">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                <div className="space-y-8">
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                      <LeafIcon className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      {metrics.firstActivityDate && (
                        <>
                          <p className="font-medium text-gray-800">
                            First Activity Recorded
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(
                              metrics.firstActivityDate
                            ).toLocaleDateString()}{" "}
                            at{" "}
                            {new Date(
                              metrics.firstActivityDate
                            ).toLocaleTimeString()}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                      <LeafIcon className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        Latest Activity
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(
                          metrics.lastActivityDate as string
                        ).toLocaleDateString()}{" "}
                        at{" "}
                        {new Date(
                          metrics.lastActivityDate as string
                        ).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                      <TrendingUpIcon className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Goal Created</p>
                      <p className="text-sm text-gray-500">
                        {new Date(goals[0].createdAt).toLocaleDateString()} at{" "}
                        {new Date(goals[0].createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
