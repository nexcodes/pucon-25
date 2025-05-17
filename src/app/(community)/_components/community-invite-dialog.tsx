"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useSendInvite } from "../_api/use-send-invite";
import { CommunityWithCount } from "../community/page";

interface CommunityInviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  community: CommunityWithCount;
}

const inviteFormSchema = z.object({
  message: z.string().optional(),
});

type InviteFormValues = z.infer<typeof inviteFormSchema>;

export function CommunityInviteDialog({
  open,
  onOpenChange,
  community,
}: CommunityInviteDialogProps) {
  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      message: "",
    },
  });

  const { mutate, isPending } = useSendInvite(community.id);

  function onSubmit(values: InviteFormValues) {
    mutate(values, {
      onSuccess: () => onOpenChange(false),
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Invite to {community.name}</DialogTitle>
          <DialogDescription>
            {`Send an invitation to join this community. They'll receive an email
            with your invitation.`}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personal Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="I'd like to invite you to join our community..."
                      className="min-h-[100px]"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Add a personal message to your invitation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600"
              disabled={isPending}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Send Invitation
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
