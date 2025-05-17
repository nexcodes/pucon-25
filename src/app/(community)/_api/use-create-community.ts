import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";

type ResponseType = InferResponseType<typeof client.api.community.$post>;
type RequestType = InferRequestType<typeof client.api.community.$post>["json"];

export const useCreateCommunity = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.community.$post({ json });

      if (!response.ok) {
        throw new Error("Failed to create the community");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMMUNITIES] });
      toast.success("Community created Successfully!");
    },
    onError: () => {
      toast.error("Failed to create the community");
    },
  });

  return mutation;
};
