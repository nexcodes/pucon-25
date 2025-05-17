import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { client } from "@/lib/hono";

export const useGetLeaderboard = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.LEADERBOARD],
    queryFn: async () => {
      const response = await client.api.leaderboard.global.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch leaderboard");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
