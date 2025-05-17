import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";

type ResponseType = InferResponseType<
  (typeof client.api.invite)[":communityId"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.invite)[":communityId"]["$post"]
>["json"];

export const useSendInvite = (communityId?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.invite[":communityId"]["$post"]({
        json,
        param: {
          communityId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to send the invite");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMMUNITIES] });
      toast.success("Invited has been sent Successfully!");
    },
    onError: () => {
      toast.error("Failed to send the invite");
    },
  });

  return mutation;
};
