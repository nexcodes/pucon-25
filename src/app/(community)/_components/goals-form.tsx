"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createCommunityGoalSchema } from "@/schema/community-goal.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateCommunityGoal } from "../_api/use-create-community-goal";
import * as z from "zod";

const goalFormSchema = createCommunityGoalSchema.extend({
  targetValue: z.string(),
});

type FormValues = z.infer<typeof goalFormSchema>;

export function GoalForm({ communityId }: { communityId: string }) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateCommunityGoal(communityId);
  const form = useForm<FormValues>({
    resolver: zodResolver(goalFormSchema),
  });

  function onSubmit(values: FormValues) {
    mutate(
      {
        ...values,
        targetValue: Number(values.targetValue),
      },
      { onSuccess: () => setOpen(false) }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-600">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Goal
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Community Goal</DialogTitle>
          <DialogDescription>
            Set a new goal for your community to work towards together.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Reduce carbon footprint by 10%"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A clear, concise title for your community goal.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      placeholder="Describe the goal and how members can contribute"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide details about this goal and how it helps the
                    community.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Value (tons of CO2)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="number"
                      step="0.01"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The amount of CO2 (in tons) you aim to reduce.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                disabled={isPending}
                type="submit"
                className="bg-green-500 hover:bg-green-600"
              >
                Create Goal
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
