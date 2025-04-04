import { useOAuth2Client } from "@/hooks/useOAuth2Client";
import { useGatewayClient, usePlans } from "common";
import Mapper from "common/components/Mapper";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TrainingPlanView } from "../../components/ui/TrainingPlanView";

export default function HomeScreen() {
  const { data: plans, error, isLoading } = usePlans();
  const { user } = useGatewayClient();
  const { login, logout } = useOAuth2Client();
  if (!plans || isLoading) {
    return <Text>Loading {error && error.message}</Text>;
  }
  return (
    <SafeAreaView className="bg-slate-100">
      <Text onPress={async () => await login()}>
        Login {user?.username || "Quest"}
      </Text>
      <Text onPress={async () => await logout()}>Logout</Text>
      <View className="flex flex-col items-center">
        <Mapper
          value={plans}
          render={(plan) => <TrainingPlanView key={plan.id} plan={plan} />}
        />
      </View>
    </SafeAreaView>
  );
}
