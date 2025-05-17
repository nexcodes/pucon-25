import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { client } from "@/lib/hono";

export const useGetCommunityLeaderboard = (communityId?: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.LEADERBOARD, { id: communityId }],
    queryFn: async () => {
      const response = await client.api.leaderboard[":communityId"]["$get"]({
        param: { communityId },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch community leaderboard");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
