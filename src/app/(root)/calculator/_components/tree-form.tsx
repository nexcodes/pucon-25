"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { TreePine } from "lucide-react";

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
import type { Activity } from "@/types";

const treeSchema = z.object({
  trees: z.coerce.number().positive("Number of trees must be greater than 0"),
});

type TreeFormValues = z.infer<typeof treeSchema>;

interface TreeFormProps {
  onSubmit: (activity: Activity) => void;
}

export function TreeForm({ onSubmit }: TreeFormProps) {
  const form = useForm<TreeFormValues>({
    resolver: zodResolver(treeSchema),
    defaultValues: {
      trees: undefined,
    },
  });

  const handleSubmit = (values: TreeFormValues) => {
    onSubmit({
      type: "tree",
      data: values,
      date: new Date(),
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <TreePine className="h-5 w-5" />
          <h3 className="text-lg font-medium">Tree Planting</h3>
        </div>

        <FormField
          control={form.control}
          name="trees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Trees Planted</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormDescription>
                Each tree absorbs approximately 1.75 kg of CO₂ per month
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Add Tree Planting Activity
        </Button>
      </form>
    </Form>
  );
}
