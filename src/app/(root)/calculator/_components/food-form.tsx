"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Utensils } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Activity } from "@/types"

const foodSchema = z.object({
  foodType: z.enum(["beef", "chicken", "vegetables", "lentils"], {
    required_error: "Please select a food type",
  }),
  grams: z.coerce.number().positive("Amount must be greater than 0"),
})

type FoodFormValues = z.infer<typeof foodSchema>

interface FoodFormProps {
  onSubmit: (activity: Activity) => void
}

export function FoodForm({ onSubmit }: FoodFormProps) {
  const form = useForm<FoodFormValues>({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      foodType: "beef",
      grams: undefined,
    },
  })

  const handleSubmit = (values: FoodFormValues) => {
    onSubmit({
      type: "food",
      data: values,
      date: new Date(),
    })
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Utensils className="h-5 w-5" />
          <h3 className="text-lg font-medium">Food Consumption</h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="foodType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Food Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select food type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="beef">Beef</SelectItem>
                    <SelectItem value="chicken">Chicken</SelectItem>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="lentils">Lentils</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grams"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input type="number" placeholder="0" {...field} />
                    <span className="ml-2">grams</span>
                  </div>
                </FormControl>
                <FormDescription>Grams of food consumed</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Add Food Activity
        </Button>
      </form>
    </Form>
  )
}
