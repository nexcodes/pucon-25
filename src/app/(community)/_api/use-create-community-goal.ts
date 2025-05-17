import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";

type ResponseType = InferResponseType<
  (typeof client.api.goals)[":communityId"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.goals)[":communityId"]["$post"]
>["json"];

export const useCreateCommunityGoal = (communityId?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.goals[":communityId"]["$post"]({
        json,
        param: { communityId },
      });

      if (!response.ok) {
        throw new Error("Failed to create the community goal");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.COMMUNITIES, { id: communityId }],
      });
      toast.success("Community Goal created Successfully!");
    },
    onError: () => {
      toast.error("Failed to create the community goal");
    },
  });

  return mutation;
};
