import { useLocalSearchParams } from "expo-router";

export type ViewPlanParams = {
  planName: string;
  planId: string;
};

export function useViewPlanParams(): ViewPlanParams {
  return useLocalSearchParams<ViewPlanParams>();
}
