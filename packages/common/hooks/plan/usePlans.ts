import { useQuery } from "@tanstack/react-query";
import { getPlans } from "../../services/api";
import { allPlansKey } from "../../utils";

export const usePlans = () => {
  return useQuery({
    queryKey: allPlansKey(),
    queryFn: getPlans,
  });
};
