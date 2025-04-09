import PlanPreview from "@/components/ui/PlanPreview";
import { Stack, useLocalSearchParams } from "expo-router";

type Params = {
  planName: string;
  planId: string;
};

export default function PlanPreviewScreen() {
  const params = useLocalSearchParams<Params>();

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
