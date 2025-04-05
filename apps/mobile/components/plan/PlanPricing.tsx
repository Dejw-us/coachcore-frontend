import { Text, View } from "react-native";

export type PlanPricingProps = {
  price: number;
  currency: "PLN";
};

export default function PlanPricing({ price, currency }: PlanPricingProps) {
  return (
    <View className="flex flex-row">
      <Text className="mr-2 self-center">
        {price === 0 ? "Free" : `${price} ${currency}`}
      </Text>
      <Text className="text-xl border rounded-xl p-1">
        {price === 0 ? "Use" : "Buy now"}
      </Text>
    </View>
  );
}
