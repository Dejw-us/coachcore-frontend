import LoggedInView from "@/components/common/LoggedInView";
import { Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

/**
 * @author Dawid Ratajczak
 */
export default function CreatePlan() {
  return (
    <LoggedInView>
      <SafeAreaView>
        <Text>Create plan</Text>
      </SafeAreaView>
    </LoggedInView>
  );
}
