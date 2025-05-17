"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Car } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Activity } from "@/types"

const transportSchema = z.object({
  distance: z.coerce.number().positive("Distance must be greater than 0"),
  efficiency: z.coerce.number().positive("Fuel efficiency must be greater than 0"),
  fuelType: z.enum(["petrol", "diesel"], {
    required_error: "Please select a fuel type",
  }),
})

type TransportFormValues = z.infer<typeof transportSchema>

interface TransportFormProps {
  onSubmit: (activity: Activity) => void
}

export function TransportForm({ onSubmit }: TransportFormProps) {
  const form = useForm<TransportFormValues>({
    resolver: zodResolver(transportSchema),
    defaultValues: {
      distance: undefined,
      efficiency: undefined,
      fuelType: "petrol",
    },
  })

  const handleSubmit = (values: TransportFormValues) => {
    onSubmit({
      type: "transport",
      data: values,
      date: new Date(),
    })
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Car className="h-5 w-5" />
          <h3 className="text-lg font-medium">Car Travel</h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="distance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Distance</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input type="number" step="0.1" placeholder="0" {...field} />
                    <span className="ml-2">km</span>
                  </div>
                </FormControl>
                <FormDescription>Distance traveled in kilometers</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="efficiency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Efficiency</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input type="number" step="0.1" placeholder="0" {...field} />
                    <span className="ml-2">km/l</span>
                  </div>
                </FormControl>
                <FormDescription>How many kilometers per liter</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="fuelType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fuel Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="petrol">Petrol</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Add Transport Activity
        </Button>
      </form>
    </Form>
  )
}
