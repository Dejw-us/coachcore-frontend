import { useGatewayClient, useUserPlans } from "common";
import Mapper from "common/components/Mapper";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPlans() {
  const { data: plans, error, isLoading } = useUserPlans();
  const { user } = useGatewayClient();

  if (user == null) {
    return <Text>Login</Text>;
  }
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
