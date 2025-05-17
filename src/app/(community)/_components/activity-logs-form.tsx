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

interface ActivityLogFormProps {
  goals: DateToString<CommunityGoal>[];
}

const activityLogSchema = z.object({
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  carbonSaved: z.coerce.number().positive({
    message: "Carbon saved must be a positive number.",
  }),
  goalId: z.string().optional(),
});

type ActivityLogFormValues = z.infer<typeof activityLogSchema>;

export function ActivityLogForm({ goals }: ActivityLogFormProps) {
  const form = useForm<ActivityLogFormValues>({
    resolver: zodResolver(activityLogSchema),
    defaultValues: {
      description: "",
      carbonSaved: 0.01,
      goalId: "",
    },
  });

  function onSubmit(values: ActivityLogFormValues) {}

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
                <Input type="number" step="0.01" {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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

        <Button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600"
        >
          Log Activity
        </Button>
      </form>
    </Form>
  );
}
