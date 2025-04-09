import LoggedInView from "@/components/LoggedInView";
import { Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  return (
    <LoggedInView>
      <SafeAreaView>
        <Text>Create plan</Text>
      </SafeAreaView>
    </LoggedInView>
  );
}
