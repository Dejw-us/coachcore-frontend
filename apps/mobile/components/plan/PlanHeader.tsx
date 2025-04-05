import { MaterialIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { View } from "react-native";
import Header from "../Header";

export type PlanHeaderProps = {
  name: string;
  icon: ComponentProps<typeof MaterialIcons>["name"];
};

export default function PlanHeader({ icon, name }: PlanHeaderProps) {
  return (
    <View className="flex flex-row justify-between">
      <View className="flex flex-row">
        <MaterialIcons name={icon} size={48} className="mr-3 mb-5" />
        <Header size="large" value={name} className="mt-2 mb-2 mr-10" />
      </View>
      <View>
        <Header size="large" value="..." />
      </View>
    </View>
  );
}
