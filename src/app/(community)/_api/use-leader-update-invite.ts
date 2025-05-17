import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";

type ResponseType = InferResponseType<
  (typeof client.api.invite)[":inviteId"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.invite)[":inviteId"]["$patch"]
>["json"];

export const useLeaderUpdateInvite = (inviteId?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.invite[":inviteId"]["$patch"]({
        json,
        param: { inviteId },
      });

      if (!response.ok) {
        throw new Error("Failed to update the invite status");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.COMMUNITIES],
      });
      toast.success("Invite Status updated Successfully!");
    },
    onError: () => {
      toast.error("Failed to update the invite status");
    },
  });

  return mutation;
};
