"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { useCreateCommunityActivityFeed } from "../_api/use-create-community-activity-feed";

const postFormSchema = z.object({
  content: z.string().min(5, {
    message: "Post content must be at least 5 characters.",
  }),
});

type PostFormValues = z.infer<typeof postFormSchema>;

export function ActivityPostForm({
  communityId,
  setOpen,
}: {
  communityId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      content: "",
    },
  });

  const { mutate, isPending } = useCreateCommunityActivityFeed(communityId);

  function handleSubmit(values: PostFormValues) {
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 py-4"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Content</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isPending}
                  placeholder="Share your eco-friendly experiences, tips, or thoughts..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your post will be visible to all community members.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isPending}
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600"
        >
          Post to Community
        </Button>
      </form>
    </Form>
  );
}
