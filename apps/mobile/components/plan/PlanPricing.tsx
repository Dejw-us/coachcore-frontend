import { Text, View } from "react-native";

export type PlanPricingProps = {
  price: number;
  currency: "PLN";
  view: () => void;
};

export default function PlanPricing({
  price,
  currency,
  view,
}: PlanPricingProps) {
  return (
    <View className="flex flex-row">
      {price === 0 ? (
        <Text className="self-center text-green-400 font-bold">Free</Text>
      ) : (
        <Text className="self-center">
          {price} {currency}
        </Text>
      )}
      <Text
        className="self-center ml-2 mr-2 text-xl border rounded-xl p-1"
        onPress={view}
      >
        View
      </Text>
      <Text className="text-xl border rounded-xl p-1">
        {price === 0 ? "Use" : "Buy now"}
      </Text>
    </View>
  );
}
