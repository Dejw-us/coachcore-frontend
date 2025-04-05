import { MaterialIcons } from "@expo/vector-icons";
import { TrainingPlan, useLogError, usePublicUser } from "common";
import { View } from "react-native";
import PlanDescription from "../plan/PlanDescription";
import PlanDetails from "../plan/PlanDetails";
import PlanGoals from "../plan/PlanGoals";
import PlanHeader from "../plan/PlanHeader";
import PlanOwner from "../plan/PlanOwner";
import PlanPricing from "../plan/PlanPricing";
import PlanStats from "../plan/PlanStats";
import Separator from "../Separator";

export type TrainingPlanViewProps = {
  plan: TrainingPlan;
};

export function TrainingPlanView({ plan }: TrainingPlanViewProps) {
  const { data: planOwner, error } = usePublicUser(plan.createdBy);

  useLogError(error);

  return (
    <View className="w-full">
      <View className="rounded-lg p-10 bg-white m-2.5 flex flex-col">
        <PlanHeader icon="model-training" name={plan.name} />
        <PlanDescription description={plan.description} />
        <PlanGoals goals={plan.goals} />
        <Separator />
        <PlanDetails weeks={plan.weeks} />
        <PlanStats stars={2} users={plan.users} />
        <Separator />
        <View className="flex flex-row justify-between mb-6 mt-2">
          <MaterialIcons className="self-center" name="save-alt" size={32} />
          <PlanPricing currency="PLN" price={0} />
        </View>
        <PlanOwner
          username={planOwner?.username || "Loading..."}
          description={planOwner?.description || "Loading..."}
        />
      </View>
    </View>
  );
}
