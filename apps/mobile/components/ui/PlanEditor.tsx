import { TrainingPlan, useUnits } from "common";
import Mapper from "common/components/Mapper";
import { Text, TextInput, View } from "react-native";
import CenterView from "../CenterView";
import LoadingView from "../LoadingView";
import Separator from "../Separator";
import PlanWeeks from "../plan/PlanWeeks";
import AddUnitButton from "../unit/AddUnitButton";
import UnitView from "../unit/UnitView";

export type PlanEdtiorProps = {
  plan: TrainingPlan;
};

export default function PlanEditor({ plan }: PlanEdtiorProps) {
  const { data, isLoading } = useUnits(plan.id);

  return (
    <LoadingView
      isLoading={isLoading}
      data={data}
      render={(units) => (
        <>
          <CenterView>
            <TextInput
              className="text-4xl"
              placeholder="Name"
              value={plan.name}
            />
            <Separator />
            <View className="flex flex-row justify-between mt-3">
              <Text className="text-3xl">Cycle length</Text>
              <PlanWeeks className="text-3xl" weeks={plan.weeks} />
            </View>
          </CenterView>
          <CenterView className="p-5 mx-2.5 mb-1">
            <View className="flex flex-row justify-between">
              <PlanWeeks className="text-2xl" weeks={plan.weeks} />
              <View>
                <Text className="self-center text-2xl">Sort by</Text>
              </View>
            </View>
          </CenterView>
          <Mapper value={units} render={(unit) => <UnitView unit={unit} />} />
          <CenterView className="mx-2.5 p-3 mt-1.5 items-center">
            <AddUnitButton plan={plan} />
          </CenterView>
        </>
      )}
    />
  );
}
