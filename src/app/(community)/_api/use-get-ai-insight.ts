import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { client } from "@/lib/hono";

export const useGetAIInsight = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: [QUERY_KEYS.AI_INSIGHT, { id }],
    queryFn: async () => {
      const response = await client.api.gemini[":communityId"]["$get"]({
        param: { communityId: id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI insight");
      }

      const res = await response.json();
      return res;
    },
  });

  return query;
};
