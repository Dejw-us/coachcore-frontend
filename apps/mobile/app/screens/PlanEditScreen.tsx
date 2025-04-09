import LoadingView from "@/components/LoadingView";
import PlanEditor from "@/components/ui/PlanEditor";
import { useViewPlanParams } from "@/hooks/useViewPlanParams";
import { usePlan } from "common";
import { Stack } from "expo-router";

export default function PlanEditScreen() {
  const params = useViewPlanParams();
  const { data, isLoading } = usePlan(params.planId);

  return (
    <>
      <Stack.Screen
        options={{
          title: `Edit ${params.planName}`,
        }}
      />
      <LoadingView
        isLoading={isLoading}
        data={data}
        render={(plan) => <PlanEditor plan={plan} />}
      />
    </>
  );
}
