"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Car, Zap, Flame, Utensils, TreePine, ArrowUpDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { Activity, EmissionResult } from "@/types";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface EmissionsResultProps {
  activities: Activity[];
  results: EmissionResult[];
  totalEmissions: number;
}

export function EmissionsResult({
  activities,
  results,
  totalEmissions,
}: EmissionsResultProps) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sortedActivities = [...activities].sort((a, b) => {
    const emissionA =
      results.find((r) => r.activityId === a.date.getTime())?.emissions || 0;
    const emissionB =
      results.find((r) => r.activityId === b.date.getTime())?.emissions || 0;

    return sortOrder === "desc"
      ? Math.abs(emissionB) - Math.abs(emissionA)
      : Math.abs(emissionA) - Math.abs(emissionB);
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "transport":
        return <Car className="h-4 w-4" />;
      case "electricity":
        return <Zap className="h-4 w-4" />;
      case "gas":
        return <Flame className="h-4 w-4" />;
      case "food":
        return <Utensils className="h-4 w-4" />;
      case "tree":
        return <TreePine className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getActivityName = (activity: Activity) => {
    switch (activity.type) {
      case "transport":
        return `Car travel (${
          "distance" in activity.data ? activity.data.distance : 0
        } km, ${
          "fuelType" in activity.data ? activity.data.fuelType : "unknown"
        })`;
      case "electricity":
        return `Electricity (${
          "kWh" in activity.data ? activity.data.kWh : 0
        } kWh)`;
      case "gas":
        return `Gas (${"amount" in activity.data ? activity.data.amount : 0} ${
          "unit" in activity.data ? activity.data.unit : ""
        })`;
      case "food":
        return `Food (${
          "grams" in activity.data ? activity.data.grams : 0
        }g of ${
          "foodType" in activity.data ? activity.data.foodType : "unknown"
        })`;
      case "tree":
        return `Tree planting (${
          "trees" in activity.data ? activity.data.trees : 0
        } trees)`;
      default:
        return "Unknown activity";
    }
  };

  // Group by type for summary chart
  const summaryData = Object.entries(
    activities.reduce((acc, activity) => {
      const result = results.find(
        (r) => r.activityId === activity.date.getTime()
      );
      if (!result) return acc;

      if (!acc[activity.type]) {
        acc[activity.type] = 0;
      }
      acc[activity.type] += result.emissions;
      return acc;
    }, {} as Record<string, number>)
  ).map(([type, emissions]) => ({ name: type, emissions }));

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              {totalEmissions.toFixed(2)} kg
            </div>
            <p className="text-sm text-muted-foreground">Total CO₂ Emissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{activities.length}</div>
            <p className="text-sm text-muted-foreground">Activities Logged</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              {(totalEmissions / (activities.length || 1)).toFixed(2)} kg
            </div>
            <p className="text-sm text-muted-foreground">
              Average per Activity
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="h-80">
        <h3 className="text-lg font-medium mb-4">Emissions by Category</h3>
        <ChartContainer
          config={{
            emissions: {
              label: "CO₂ Emissions (kg)",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={summaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="emissions" fill="var(--color-emissions)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Activity Log</h3>
          <Button variant="outline" size="sm" onClick={toggleSortOrder}>
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Sort by Impact
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>CO₂ Impact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedActivities.map((activity, index) => {
              const result = results.find(
                (r) => r.activityId === activity.date.getTime()
              );
              if (!result) return null;

              return (
                <TableRow key={index}>
                  <TableCell>{format(activity.date, "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getActivityIcon(activity.type)}
                      <span>{getActivityName(activity)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={result.emissions < 0 ? "outline" : "default"}
                      className={
                        result.emissions < 0
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : ""
                      }
                    >
                      {result.emissions.toFixed(2)} kg
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
