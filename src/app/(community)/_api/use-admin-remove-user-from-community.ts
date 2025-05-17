import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { QUERY_KEYS } from "@/constants/query-keys";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api)["community-user-management"][":communityId"]["members"][":userId"]["$delete"]
>;

export const useAdminRemoveUserFromCommunity = (
  communityId?: string,
  userId?: string
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api["community-user-management"][
        ":communityId"
      ]["members"][":userId"]["$delete"]({
        param: { communityId, userId },
      });

      if (!response.ok) {
        throw new Error("Failed to create the community activity Post");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.COMMUNITIES, { id: communityId }],
      });
      toast.success("Community activity Post created Successfully!");
    },
    onError: () => {
      toast.error("Failed to create the community activity Post");
    },
  });

  return mutation;
};
