"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, Clock, X } from "lucide-react";
import { DateToString } from "@/types/utils";
import { CommunityInvite, User } from "@prisma/client";

interface InviteManagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invites: (DateToString<CommunityInvite> & {
    user: DateToString<User> | null;
  })[];
}

export function InviteManagementDialog({
  open,
  onOpenChange,
  invites,
}: InviteManagementDialogProps) {
  const [activeTab, setActiveTab] = useState("pending");

  const pendingInvites = invites.filter(
    (invite) => invite.status === "PENDING"
  );
  const acceptedInvites = invites.filter(
    (invite) => invite.status === "ACCEPTED"
  );
  const rejectedInvites = invites.filter(
    (invite) => invite.status === "DECLINED"
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Manage Community Invites</DialogTitle>
          <DialogDescription>
            View and manage existing community invitations.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="pending" className="relative">
              Pending
              {pendingInvites.length > 0 && (
                <Badge className="ml-2 bg-green-500">
                  {pendingInvites.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <div className="space-y-4">
              {pendingInvites.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center text-gray-500">
                    No pending invitations.
                  </CardContent>
                </Card>
              ) : (
                pendingInvites.map((invite) => (
                  <Card key={invite.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">
                            {invite.user?.email}
                          </CardTitle>
                          <CardDescription>
                            Sent{" "}
                            {new Date(invite.createdAt).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Badge className="bg-yellow-500 hover:bg-yellow-600">
                          <Clock className="mr-1 h-3 w-3" />
                          Pending
                        </Badge>
                      </div>
                    </CardHeader>
                    {invite.message && (
                      <CardContent className="pt-2 pb-0">
                        <p className="text-sm text-gray-600">
                          {invite.message}
                        </p>
                      </CardContent>
                    )}
                    <CardFooter className="flex justify-between pt-4">
                      <div className="text-xs text-gray-500 flex items-center">
                        {invite.user ? (
                          <>
                            <Avatar className="h-5 w-5 mr-1">
                              <AvatarImage
                                src={`https://avatar.vercel.sh/${invite.userId}`}
                              />
                              <AvatarFallback className="text-[10px]">
                                {invite.user.name
                                  ?.substring(0, 2)
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            Sent by {invite.user.name}
                          </>
                        ) : (
                          "Sent by unknown user"
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                        // onClick={() => handleCancelInvite(invite.id)}
                      >
                        <X className="mr-1 h-3 w-3" />
                        Cancel
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="accepted">
            <div className="space-y-4">
              {acceptedInvites.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center text-gray-500">
                    No accepted invitations.
                  </CardContent>
                </Card>
              ) : (
                acceptedInvites.map((invite) => (
                  <Card key={invite.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">
                            {invite.user?.email}
                          </CardTitle>
                          <CardDescription>
                            Accepted on{" "}
                            {new Date(invite.updatedAt).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Badge className="bg-green-500 hover:bg-green-600">
                          <Check className="mr-1 h-3 w-3" />
                          Accepted
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardFooter className="pt-2">
                      <div className="text-xs text-gray-500 flex items-center">
                        {invite.user ? (
                          <>
                            <Avatar className="h-5 w-5 mr-1">
                              <AvatarImage
                                src={`https://avatar.vercel.sh/${invite.userId}`}
                              />
                              <AvatarFallback className="text-[10px]">
                                {invite.user.name
                                  ?.substring(0, 2)
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            Sent by {invite.user.name}
                          </>
                        ) : (
                          "Sent by unknown user"
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="rejected">
            <div className="space-y-4">
              {rejectedInvites.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center text-gray-500">
                    No rejected invitations.
                  </CardContent>
                </Card>
              ) : (
                rejectedInvites.map((invite) => (
                  <Card key={invite.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">
                            {invite.user?.email}
                          </CardTitle>
                          <CardDescription>
                            Rejected on{" "}
                            {new Date(invite.updatedAt).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Badge className="bg-red-500 hover:bg-red-600">
                          <X className="mr-1 h-3 w-3" />
                          Rejected
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardFooter className="pt-2">
                      <div className="text-xs text-gray-500 flex items-center">
                        {invite.user ? (
                          <>
                            <Avatar className="h-5 w-5 mr-1">
                              <AvatarImage
                                src={`https://avatar.vercel.sh/${invite.userId}`}
                              />
                              <AvatarFallback className="text-[10px]">
                                {invite.user.name
                                  ?.substring(0, 2)
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            Sent by {invite.user.name}
                          </>
                        ) : (
                          "Sent by unknown user"
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
