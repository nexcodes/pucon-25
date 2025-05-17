"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";
import { GoalForm } from "./goals-form";
import { DateToString } from "@/types/utils";
import { CommunityGoal, User } from "@prisma/client";
import { format } from "date-fns";
export function GoalsList({
  goals,
}: {
  goals: DateToString<CommunityGoal & { createdBy: User }>[];
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Community Goals</h2>
        <GoalForm />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <Card key={goal.id}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-green-500" />
                {goal.title}
              </CardTitle>
              <CardDescription>{goal.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">
                    {Math.round((goal.progress / goal.targetValue) * 100)}%
                  </span>
                </div>
                <Progress
                  value={(goal.progress / goal.targetValue) * 100}
                  className="h-2 bg-gray-200"
                  indicatorClassName="bg-green-500"
                />
                <div className="flex justify-between text-sm pt-1">
                  <span className="text-gray-500">
                    {goal.progress.toFixed(2)} tons saved
                  </span>
                  <span className="text-gray-500">
                    Target: {goal.targetValue.toFixed(2)} tons
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="text-xs text-gray-500 pt-0">
              Created by {goal.createdBy.name} on{" "}
              {format(goal.createdAt, "dd MMM, yyyy")}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
