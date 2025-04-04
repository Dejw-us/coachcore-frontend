import { useUserPlans } from "common";
import Mapper from "common/components/Mapper";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPlans() {
  const { data: plans, error, isLoading } = useUserPlans();
  if (error) {
    return <Text>{error.message}</Text>;
  }
  if (!plans) {
    return <Text>Loading</Text>;
  }
  return (
    <SafeAreaView>
      <Mapper
        value={plans}
        render={(plan) => <Text key={plan.id}>{plan.name}</Text>}
      />
    </SafeAreaView>
  );
}
