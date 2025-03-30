import { usePlans } from "common";
import Mapper from "common/components/Mapper";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TrainingPlanView } from "../ui/TrainingPlanView";

export default function HomeScreen() {
  const { data: plans, error, isLoading } = usePlans();

  if (!plans || isLoading) {
    return <Text>Loading</Text>;
  }
  return (
    <SafeAreaView>
      <Text className="text-black">Plans</Text>
      <Mapper
        value={plans}
        render={(plan) => <TrainingPlanView key={plan.id} plan={plan} />}
      />
    </SafeAreaView>
  );
}
