"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TransportForm } from "./transport-form";
import { ElectricityForm } from "./electricity-form";
import { GasForm } from "./gas-form";
import { FoodForm } from "./food-form";
import { TreeForm } from "./tree-form";
import { EmissionsResult } from "./emissions-result";
import type { Activity, EmissionResult } from "@/types";
import { calculateEmissions } from "@/lib/emissions-calculator";

export function CarbonCalculator() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [results, setResults] = useState<EmissionResult[]>([]);
  const [activeTab, setActiveTab] = useState("transport");

  const handleAddActivity = (activity: Activity) => {
    const newActivities = [...activities, activity];
    setActivities(newActivities);

    const emissionResult = calculateEmissions(activity);
    setResults([...results, emissionResult]);

    // Reset to transport tab after adding an activity
    setActiveTab("transport");
  };

  const handleClearAll = () => {
    setActivities([]);
    setResults([]);
  };

  const totalEmissions = results.reduce(
    (total, result) => total + result.emissions,
    0
  );

  return (
    <div className="grid gap-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="transport">Transport</TabsTrigger>
          <TabsTrigger value="electricity">Electricity</TabsTrigger>
          <TabsTrigger value="gas">Gas</TabsTrigger>
          <TabsTrigger value="food">Food</TabsTrigger>
          <TabsTrigger value="tree">Tree Planting</TabsTrigger>
        </TabsList>

        <Card>
          <CardHeader>
            <CardTitle>Log Your Activity</CardTitle>
            <CardDescription>
              Enter the details of your activity to calculate its carbon
              footprint
            </CardDescription>
          </CardHeader>

          <CardContent>
            <TabsContent value="transport">
              <TransportForm onSubmit={handleAddActivity} />
            </TabsContent>

            <TabsContent value="electricity">
              <ElectricityForm onSubmit={handleAddActivity} />
            </TabsContent>

            <TabsContent value="gas">
              <GasForm onSubmit={handleAddActivity} />
            </TabsContent>

            <TabsContent value="food">
              <FoodForm onSubmit={handleAddActivity} />
            </TabsContent>

            <TabsContent value="tree">
              <TreeForm onSubmit={handleAddActivity} />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>

      {activities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Carbon Footprint</CardTitle>
            <CardDescription>
              Summary of your logged activities and their carbon impact
            </CardDescription>
          </CardHeader>

          <CardContent>
            <EmissionsResult
              activities={activities}
              results={results}
              totalEmissions={totalEmissions}
            />
          </CardContent>

          <CardFooter>
            <Button variant="outline" onClick={handleClearAll}>
              Clear All Activities
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
