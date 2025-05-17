"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Leaf, Medal } from "lucide-react";
import { useGetLeaderboard } from "../_api/use-get-leaderboard";

export function Leaderboard() {
  const { data: leaderboardData, isLoading } = useGetLeaderboard();

  // Function to get medal color based on rank
  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-500";
      case 2:
        return "text-gray-400";
      case 3:
        return "text-amber-700";
      default:
        return "text-gray-300";
    }
  };

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Function to format carbon saved value
  const formatCarbonSaved = (value: number) => {
    return value.toFixed(2);
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
          <CardTitle>Carbon Savings Leaderboard</CardTitle>
        </div>
        <CardDescription>
          Users ranked by total carbon saved (in kg CO₂)
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-pulse text-muted-foreground">
              Loading leaderboard data...
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Carbon Saved (kg)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData && leaderboardData.length > 0 ? (
                leaderboardData?.map((entry) => (
                  <TableRow key={entry.userId} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center justify-center">
                        {entry.rank <= 3 ? (
                          <Medal
                            className={`h-6 w-6 ${getMedalColor(entry.rank)}`}
                          />
                        ) : (
                          <span className="text-muted-foreground">
                            {entry.rank}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={entry.image || "/placeholder.svg"}
                            alt={entry.name}
                          />
                          <AvatarFallback>
                            {getInitials(entry.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{entry.name}</div>
                          <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                            ID: {entry.userId.substring(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <span className="font-semibold">
                          {formatCarbonSaved(entry.totalCarbonSaved)}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center h-24 text-muted-foreground"
                  >
                    No leaderboard data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
