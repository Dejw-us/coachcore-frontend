import { useOAuth2Client } from "@/hooks/oauth2/useOAuth2Client";
import { User, useUserPlans } from "common";
import Mapper from "common/components/Mapper";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPlans() {
  const { data: plans, error, isLoading } = useUserPlans();
  const { login } = useOAuth2Client();
  const user: User = { username: "test" };
  if (user == null) {
    return (
      <SafeAreaView>
        <Text onPress={async () => await login()}>Please login</Text>;
      </SafeAreaView>
    );
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
