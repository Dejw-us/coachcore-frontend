import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putPlanRating, TrainingPlanRating } from "../../services/api";
import { planRatingKey } from "../../utils";
import { useGatewayClient } from "../gateway";

export function useUpdatePlanRating(planId: string) {
  const client = useGatewayClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (stars: number) => putPlanRating(client, planId, stars),
    onSuccess: (rating) =>
      queryClient.setQueryData<TrainingPlanRating>(
        planRatingKey(planId),
        () => rating
      ),
  });
}
