import { TrainingPlan } from "common";
import { useRouter } from "expo-router";

export type UseViewPlanArgs =
  | {
      id: string;
      name: string;
    }
  | TrainingPlan;

export type ViewPlan = {
  viewPlan: () => void;
};

export function useViewPlan(
  { id, name }: UseViewPlanArgs,
  edit = false
): ViewPlan {
  const router = useRouter();
  const pathname = edit
    ? "/screens/PlanEditScreen"
    : "/screens/PlanPreviewScreen";

  return {
    viewPlan: () => {
      router.push({
        pathname,
        params: {
          planName: name,
          planId: id,
        },
      });
    },
  };
}
