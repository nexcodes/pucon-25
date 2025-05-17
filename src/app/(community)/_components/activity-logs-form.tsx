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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateToString } from "@/types/utils";
import { CommunityGoal } from "@prisma/client";
import { useCreateCommunityActivityLog } from "../_api/use-create-community-activity-log";
import { createActivityLogSchema } from "@/schema/activity-log.schema";
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ActivityLogFormProps {
  goals: DateToString<CommunityGoal>[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  communityId: string;
}

const activityLogSchema = createActivityLogSchema.extend({
  carbonSaved: z.string(),
});

type ActivityLogFormValues = z.infer<typeof activityLogSchema>;

export function ActivityLogForm({
  goals,
  setOpen,
  communityId,
}: ActivityLogFormProps) {
  const form = useForm<ActivityLogFormValues>({
    resolver: zodResolver(activityLogSchema),
    defaultValues: {
      description: "",
      carbonSaved: "0.01",
      goalId: "",
    },
  });

  const { mutate, isPending } = useCreateCommunityActivityLog(communityId);

  function onSubmit(values: ActivityLogFormValues) {
    mutate(
      {
        ...values,
        carbonSaved: Number(values.carbonSaved),
        activityDate: new Date(values.activityDate),
      },
      {
        onSuccess: () => setOpen(false),
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity Description</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Used public transport instead of driving"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Describe what you did to reduce carbon emissions.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="carbonSaved"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Carbon Saved (tons)</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  type="number"
                  step="0.01"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Estimate how much carbon was saved by your activity.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="goalId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Related Goal</FormLabel>
              <Select
                disabled={isPending}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a goal (optional)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {goals.map((goal) => (
                    <SelectItem key={goal.id} value={goal.id}>
                      {goal.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Connect your activity to a specific community goal.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="activityDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Activity Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={isPending}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select the date when you performed this activity.
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
          Log Activity
        </Button>
      </form>
    </Form>
  );
}
