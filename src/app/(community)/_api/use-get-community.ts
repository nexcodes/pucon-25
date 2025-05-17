import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { client } from "@/lib/hono";

export const useGetCommunity = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: [QUERY_KEYS.COMMUNITIES, { id }],
    queryFn: async () => {
      const response = await client.api.community[":id"]["$get"]({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch community");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
