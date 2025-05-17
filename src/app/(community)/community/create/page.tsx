"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { createCommunitySchema } from "@/schema/community.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommunityNiche } from "@prisma/client";
import { ArrowLeft, Leaf, TreePine } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCreateCommunity } from "../../_api/use-create-community";
import { Spinner } from "@/components/spinner";

// Define the form schema with Zod
const formSchema = createCommunitySchema;

type FormValues = z.infer<typeof formSchema>;

export default function CreateCommunityPage() {
  const router = useRouter();
  const { mutate, isPending } = useCreateCommunity();
  // Initialize the form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: FormValues) {
    mutate(values, {
      onSuccess: () => {
        router.push("/community");
      },
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container max-w-3xl py-16">
        <Button
          variant="ghost"
          className="mb-6 group flex items-center gap-1 text-muted-foreground hover:text-green-700 dark:hover:text-green-400 transition-colors"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to communities
        </Button>

        <Card className="border-none shadow-lg bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 dark:bg-green-900/20 rounded-full blur-3xl opacity-70 -z-10 transform translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-200 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-70 -z-10 transform -translate-x-1/4 translate-y-1/4"></div>

          <CardHeader className="space-y-1 pb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30">
                <TreePine className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl font-bold">
                Create a New Community
              </CardTitle>
            </div>
            <CardDescription className="text-base">
              Create a space for people with similar sustainability interests to
              connect and collaborate.
            </CardDescription>
          </CardHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-medium">
                        Community Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="Enter community name"
                          className="h-12 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Choose a clear, descriptive name for your community.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="niche"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-medium">
                        Community Niche
                      </FormLabel>
                      <FormControl>
                        <Select
                          disabled={isPending}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="h-12 text-base">
                            <SelectValue placeholder="Select a sustainability focus" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(CommunityNiche).map(
                              ([key, value]) => (
                                <SelectItem key={key} value={value}>
                                  {value
                                    .replace(/_/g, " ")
                                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Choose the primary sustainability focus of your
                        community.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-medium">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isPending}
                          placeholder="What is this community about?"
                          rows={5}
                          className="resize-none text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Describe the purpose and goals of your community. What
                        brings people together here?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="rounded-lg border border-dashed p-6 bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800">
                  <div className="flex items-start gap-3">
                    <Leaf className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-green-800 dark:text-green-300">
                        Sustainability Focus
                      </h3>
                      <p className="text-sm text-green-700/80 dark:text-green-400/80 mt-1">
                        Communities with a clear sustainability focus tend to
                        attract more engaged members who are passionate about
                        making a difference.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => router.back()}
                  className="px-5 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/20"
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={isPending}>
                  {isPending ? <Spinner size="sm" /> : "Create Community"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
