"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Flame } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Activity } from "@/types"

const gasSchema = z.object({
  amount: z.coerce.number().positive("Gas consumption must be greater than 0"),
  unit: z.enum(["m3", "therm"], {
    required_error: "Please select a unit",
  }),
})

type GasFormValues = z.infer<typeof gasSchema>

interface GasFormProps {
  onSubmit: (activity: Activity) => void
}

export function GasForm({ onSubmit }: GasFormProps) {
  const form = useForm<GasFormValues>({
    resolver: zodResolver(gasSchema),
    defaultValues: {
      amount: undefined,
      unit: "m3",
    },
  })

  const handleSubmit = (values: GasFormValues) => {
    onSubmit({
      type: "gas",
      data: values,
      date: new Date(),
    })
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="h-5 w-5" />
          <h3 className="text-lg font-medium">Gas Consumption</h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gas Consumed</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" placeholder="0" {...field} />
                </FormControl>
                <FormDescription>Amount of gas used</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m3">Cubic meters (m³)</SelectItem>
                    <SelectItem value="therm">Therms</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Add Gas Activity
        </Button>
      </form>
    </Form>
  )
}
