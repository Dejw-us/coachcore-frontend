import { usePlan, useUnits } from "common";
import Mapper from "common/components/Mapper";
import { ActivityIndicator, ScrollView, Text } from "react-native";
import CenterView from "../CenterView";
import MiddleSafeAreaView from "../MiddleSafeAreaView";
import PlanDescription from "../plan/PlanDescription";
import PlanGoals from "../plan/PlanGoals";
import PlanHeader from "../plan/PlanHeader";
import PlanWeeks from "../plan/PlanWeeks";
import UnitView from "../unit/UnitView";

export type PlanPreviewProps = {
  planId: string;
};

export default function PlanPreview({ planId }: PlanPreviewProps) {
  const { data: units, isLoading } = useUnits(planId);
  const { data: plan, isLoading: isPlanLoading } = usePlan(planId);

  if (isLoading || isPlanLoading) {
    return <ActivityIndicator />;
  }

  if (!units || !plan) {
    return (
      <MiddleSafeAreaView>
        <Text>Failed to load units</Text>
      </MiddleSafeAreaView>
    );
  }

  return (
    <ScrollView>
      <CenterView>
        <PlanHeader icon="model-training" name={plan.name} />
        <PlanDescription description={plan.description} />
        <PlanGoals goals={plan.goals} />
      </CenterView>
      <CenterView className="pr-10 pl-10 pt-5 pb-5 mr-2.5 ml-2.5 mb-4 mt-2.5">
        <PlanWeeks weeks={plan.weeks} />
      </CenterView>
      <Mapper
        value={units.sort((a, b) => a.index - b.index)}
        render={(unit) => <UnitView key={unit.id} unit={unit} />}
      />
    </ScrollView>
  );
}
