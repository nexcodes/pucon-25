"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Leaf, PlusCircle } from "lucide-react";
import { ActivityLogForm } from "./activity-logs-form";
import { DateToString } from "@/types/utils";
import { ActivityLog, CommunityGoal, User } from "@prisma/client";
import { format } from "date-fns";

interface ActivityLogsProps {
  logs: (DateToString<ActivityLog> & {
    user: DateToString<User>;
    goal: DateToString<CommunityGoal>;
  })[];
  goals: DateToString<CommunityGoal>[];
}

export function ActivityLogs({ logs, goals }: ActivityLogsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          <Leaf className="mr-2 h-5 w-5 text-green-500" />
          Carbon Reduction Activities
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600">
              <PlusCircle className="mr-2 h-4 w-4" />
              Log Activity
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Log Carbon Reduction Activity</DialogTitle>
              <DialogDescription>
                Track your eco-friendly activity and contribute to community
                goals
              </DialogDescription>
            </DialogHeader>
            <ActivityLogForm goals={goals} />
          </DialogContent>
        </Dialog>
      </div>

      {logs.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-gray-500">
            No activity logs yet. Start tracking your carbon reduction
            activities!
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {logs.map((log) => (
            <Card key={log.id}>
              <CardHeader className="pb-2 pt-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8 border border-green-200">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${log.user.id}`}
                    />
                    <AvatarFallback className="bg-green-100 text-green-700">
                      {log.user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{log.user.name}</div>
                    <div className="text-xs text-gray-500">
                      {format(new Date(log.activityDate), "dd MMM, yyyy")}
                    </div>
                  </div>
                  <Badge className="bg-green-500 hover:bg-green-600">
                    {log.carbonSaved.toFixed(2)} tons CO₂ saved
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p>{log.description}</p>
                {log.goal.title && (
                  <div className="mt-2 text-sm text-gray-500">
                    Contributing to goal:{" "}
                    <span className="font-medium">{log.goal.title}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
