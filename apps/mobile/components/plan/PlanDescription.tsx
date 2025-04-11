import { Text, View } from "react-native";
import Header from "../common/Header";

export type PlanDescriptionProps = {
  description: string;
};

export default function PlanDescription({ description }: PlanDescriptionProps) {
  return (
    <View>
      <Header value="Description" />
      <Text>{description}</Text>
    </View>
  );
}
