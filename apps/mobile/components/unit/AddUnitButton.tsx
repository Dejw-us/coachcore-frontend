import { TrainingPlan, useCreateUnit } from "common";
import { Text } from "react-native";

export type AddUnitButtonProps = {
  plan: { id: string } | TrainingPlan;
};

export default function AddUnitButton({ plan }: AddUnitButtonProps) {
  const { mutate: saveUnit } = useCreateUnit(plan.id);

  return (
    <Text
      className="text-xl border px-16 rounded py-2 border-slate-300 text-slate-300"
      onPress={() => {}}
    >
      Add unit
    </Text>
  );
}
