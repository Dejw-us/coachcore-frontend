import UserPanel from "@/components/ui/UserPanel";
import { useOAuth2Client } from "@/hooks/useOAuth2Client";
import { useGatewayClient, usePlans } from "common";
import Mapper from "common/components/Mapper";
import { ScrollView, Text } from "react-native";
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
      <UserPanel />
      <ScrollView className="mb-16">
        <Mapper
          value={plans}
          render={(plan) => <TrainingPlanView key={plan.id} plan={plan} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
