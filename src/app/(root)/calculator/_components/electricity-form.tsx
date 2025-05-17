"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { Activity } from "@/types"

const electricitySchema = z.object({
  kWh: z.coerce.number().positive("Electricity consumption must be greater than 0"),
})

type ElectricityFormValues = z.infer<typeof electricitySchema>

interface ElectricityFormProps {
  onSubmit: (activity: Activity) => void
}

export function ElectricityForm({ onSubmit }: ElectricityFormProps) {
  const form = useForm<ElectricityFormValues>({
    resolver: zodResolver(electricitySchema),
    defaultValues: {
      kWh: undefined,
    },
  })

  const handleSubmit = (values: ElectricityFormValues) => {
    onSubmit({
      type: "electricity",
      data: values,
      date: new Date(),
    })
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-5 w-5" />
          <h3 className="text-lg font-medium">Electricity Consumption</h3>
        </div>

        <FormField
          control={form.control}
          name="kWh"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Electricity Consumed</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input type="number" step="0.1" placeholder="0" {...field} />
                  <span className="ml-2">kWh</span>
                </div>
              </FormControl>
              <FormDescription>Kilowatt-hours of electricity used</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Add Electricity Activity
        </Button>
      </form>
    </Form>
  )
}
