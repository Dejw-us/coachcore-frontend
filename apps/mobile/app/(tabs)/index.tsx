import { usePlans } from "common";
import Mapper from "common/components/Mapper";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TrainingPlanView } from "../ui/TrainingPlanView";

export default function HomeScreen() {
  const { data: plans, error, isLoading } = usePlans();

  if (!plans || isLoading) {
    return <Text>Loading</Text>;
  }
  return (
    <SafeAreaView className="bg-slate-100">
      <View className="flex flex-col items-center">
        <Mapper
          value={plans}
          render={(plan) => <TrainingPlanView key={plan.id} plan={plan} />}
        />
      </View>
    </SafeAreaView>
  );
}
