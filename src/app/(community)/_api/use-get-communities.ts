import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { client } from "@/lib/hono";

export const useGetCommunities = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.COMMUNITIES],
    queryFn: async () => {
      const response = await client.api.community.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch communities");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
