"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageSquare, PlusCircle } from "lucide-react";
import { DateToString } from "@/types/utils";
import { ActivityPost, User } from "@prisma/client";
import { ActivityPostForm } from "./activity-post-form";
import { format } from "date-fns";

interface ActivityFeedProps {
  posts: (DateToString<ActivityPost> & {
    user: DateToString<User>;
  })[];
  communityId: string;
}

export function ActivityFeed({ posts, communityId }: ActivityFeedProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          <MessageSquare className="mr-2 h-5 w-5 text-green-500" />
          Community Feed
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Share with the Community</DialogTitle>
              <DialogDescription>
                Share your thoughts, experiences, or tips with the community
              </DialogDescription>
            </DialogHeader>
            <ActivityPostForm setOpen={setOpen} communityId={communityId} />
          </DialogContent>
        </Dialog>
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-gray-500">
            No posts yet. Be the first to share with the community!
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader className="pb-2 pt-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8 border border-green-200">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${post.user.id}`}
                    />
                    <AvatarFallback className="bg-green-100 text-green-700">
                      {post.user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{post.user.name}</div>
                    <div className="text-xs text-gray-500">
                      {format(new Date(post.createdAt), "dd MMM, yyyy")} at{" "}
                      {new Date(post.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{post.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
