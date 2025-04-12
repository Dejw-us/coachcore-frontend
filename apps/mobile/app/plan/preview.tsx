import PlanPreview from "@/components/ui/PlanPreview";
import { useViewPlanParams } from "@/hooks/useViewPlanParams";
import { Stack } from "expo-router";

export default function PlanPreviewLayout() {
  const params = useViewPlanParams();

  return (
    <>
      <Stack.Screen
        options={{
          title: params.planName,
        }}
      />
      <PlanPreview planId={params.planId} />
    </>
  );
}
