import LoggedInView from "@/components/LoggedInView";
import MyPlan from "@/components/ui/MyPlan";
import { useUserPlans } from "common";
import Mapper from "common/components/Mapper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPlans() {
  const { data: plans, error, isLoading } = useUserPlans();

  return (
    <LoggedInView>
      <SafeAreaView>
        <Mapper
          value={plans || []}
          render={(plan) => <MyPlan key={plan.id} plan={plan} />}
        />
      </SafeAreaView>
    </LoggedInView>
  );
}
