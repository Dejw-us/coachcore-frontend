import MiddleSafeAreaView from "@/components/common/MiddleSafeAreaView";
import UserPanel from "@/components/ui/UserPanel";
import { useOAuth2Client } from "@/hooks/useOAuth2Client";
import { useGatewayClient, usePlans } from "common";
import Mapper from "common/components/Mapper";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TrainingPlanView } from "../../components/ui/TrainingPlanView";

export default function HomeScreen() {
  const { data: plans, error, isLoading } = usePlans();
  const { user } = useGatewayClient();
  const { login, logout } = useOAuth2Client();

  if (isLoading) {
    return (
      <MiddleSafeAreaView>
        <ActivityIndicator size="large" />
      </MiddleSafeAreaView>
    );
  }
  if (!plans) {
    return (
      <MiddleSafeAreaView>
        <Text>Failed to load plans</Text>
      </MiddleSafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-slate-100">
      <UserPanel />

      {plans.length > 0 ? (
        <ScrollView className="mb-16">
          <Mapper
            value={plans}
            render={(plan) => <TrainingPlanView key={plan.id} plan={plan} />}
          />
        </ScrollView>
      ) : (
        <View className="flex justify-center items-center h-screen">
          <Text>There is no plans</Text>
          <Text>Click here to create one</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
