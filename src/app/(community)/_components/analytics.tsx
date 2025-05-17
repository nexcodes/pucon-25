/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spinner } from "@/components/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import {
  CalendarIcon,
  LeafIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";

export default function AnalyticsBoard({
  data,
  isLoading,
}: {
  data: any;
  isLoading: boolean;
}) {
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

  const { goals = [], metrics = {} } = data || {};

  // Safely format dates with fallbacks for null/undefined values
  const safeFormatDistance = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return "N/A";
    }
  };

  const lastActivityFormatted = safeFormatDistance(metrics?.lastActivityDate);
  const firstActivityFormatted = safeFormatDistance(metrics?.firstActivityDate);

  // Safe date formatting helper
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return "N/A";
    }
  };

  // Safe time formatting helper
  const formatTime = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleTimeString();
    } catch (error) {
      return "N/A";
    }
  };

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
                {(metrics?.totalCarbonSaved || 0).toFixed(2)}{" "}
                <span className="text-lg">tons</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Avg. {(metrics?.averageCarbonPerActivity || 0).toFixed(2)} tons
                per activity
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
                {metrics?.totalActivities || 0}
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
                {metrics?.uniqueContributors || 0}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Active member{(metrics?.uniqueContributors || 0) > 1 ? "s" : ""}
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
                {formatDate(metrics?.firstActivityDate)} -{" "}
                {formatDate(metrics?.lastActivityDate)}
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
            {Array.isArray(goals) && goals.length > 0 ? (
              goals.map((goal: any) => (
                <Card
                  key={goal.id}
                  className="border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="text-gray-800">
                      {goal.title}
                    </CardTitle>
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
              ))
            ) : (
              <Card className="border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="text-center p-6">
                  <p className="text-gray-500">No goals found</p>
                </CardContent>
              </Card>
            )}
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
                      {metrics?.firstActivityDate && (
                        <>
                          <p className="font-medium text-gray-800">
                            First Activity Recorded
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDate(metrics.firstActivityDate)} at{" "}
                            {formatTime(metrics.firstActivityDate)}
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
                        {formatDate(metrics?.lastActivityDate)} at{" "}
                        {formatTime(metrics?.lastActivityDate)}
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
                        {Array.isArray(goals) && goals.length > 0 ? (
                          <>
                            {formatDate(goals[0]?.createdAt)} at{" "}
                            {formatTime(goals[0]?.createdAt)}
                          </>
                        ) : (
                          "No goals created yet"
                        )}
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
