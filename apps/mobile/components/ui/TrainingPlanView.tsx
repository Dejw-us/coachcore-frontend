import {
  TrainingPlan,
  useLogError,
  usePlanCategory,
  usePlanTr,
  usePublicUser,
} from "common";
import { useRouter } from "expo-router";
import { View } from "react-native";
import PlanDescription from "../plan/PlanDescription";
import PlanDetails from "../plan/PlanDetails";
import PlanGoals from "../plan/PlanGoals";
import PlanHeader from "../plan/PlanHeader";
import PlanOwner from "../plan/PlanOwner";
import PlanPricing from "../plan/PlanPricing";
import { PlanSaveButton } from "../plan/PlanSaveButton";
import PlanStats from "../plan/PlanStats";
import Separator from "../Separator";
import Tags from "../Tags";

export type TrainingPlanViewProps = {
  plan: TrainingPlan;
};

export function TrainingPlanView({ plan }: TrainingPlanViewProps) {
  const { data: planOwner, error } = usePublicUser(plan.createdBy);
  const { data: tr, error: trError } = usePlanTr(plan.id);
  const { data: category, error: categoryError } = usePlanCategory(plan.id);
  const router = useRouter();

  useLogError(categoryError, "usePlanCategory");
  useLogError(trError, "usePlanTr");
  useLogError(error, "usePublicUser");

  const viewPlan = () => {
    router.push({
      pathname: "/screens/PlanPreviewScreen",
      params: {
        planName: plan.name,
        planId: plan.id,
      },
    });
  };

  return (
    <View className="w-full">
      <View className="rounded-lg p-10 bg-white m-2.5 flex flex-col">
        <PlanHeader icon="model-training" name={plan.name} />
        <PlanDescription description={plan.description} />
        <Tags tags={plan.tags} />
        <PlanGoals goals={plan.goals} />
        <Separator className="bg-slate-300 mt-5 mb-5 h-1" />
        <PlanDetails weeks={plan.weeks} tr={tr} category={category} />
        <PlanStats users={plan.users} planId={plan.id} />
        <Separator className="bg-slate-300 mt-5 mb-5 h-1" />
        <View className="flex flex-row justify-between mb-6 mt-2">
          <PlanSaveButton planId={plan.id} />
          <PlanPricing currency="PLN" price={0} view={viewPlan} />
        </View>
        <PlanOwner
          username={planOwner?.username || "Failed to load username"}
          userId={plan.createdBy}
          description={planOwner?.description || "This user has no description"}
        />
      </View>
    </View>
  );
}
