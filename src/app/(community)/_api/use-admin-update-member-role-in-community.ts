import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";

type ResponseType = InferResponseType<
  (typeof client.api)["community-user-management"][":communityId"]["members"][":userId"]["role"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api)["community-user-management"][":communityId"]["members"][":userId"]["role"]["$patch"]
>["json"];

export const useAdminUpdateMemberRoleInCommunity = (
  communityId?: string,
  userId?: string
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api["community-user-management"][
        ":communityId"
      ]["members"][":userId"]["role"]["$patch"]({
        json,
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
