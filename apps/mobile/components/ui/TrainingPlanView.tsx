import { MaterialIcons } from "@expo/vector-icons";
import { TrainingPlan, usePublicUser } from "common";
import Mapper from "common/components/Mapper";
import { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Header from "../Header";

export type TrainingPlanViewProps = {
  plan: TrainingPlan;
};

export function TrainingPlanView({ plan }: TrainingPlanViewProps) {
  const { data: planOwner, error } = usePublicUser(plan.createdBy);

  useEffect(() => {
    console.log("owner:" + planOwner);
  }, [planOwner]);

  return (
    <View className="flex flex-col rounded-lg p-10 bg-white">
      <View className="flex flex-row">
        <MaterialIcons name="fitness-center" size={48} className="mr-2 mb-5" />
        <Header value={plan.name} className="mt-2 mb-2 mr-10" />
        <Text className="text-4xl">...</Text>
      </View>

      {/* Description Section */}
      <View>
        <Header value="Description" />
        <Text className="mb-5">{plan.description}</Text>

        {/* Goals Section */}
        <Header value="Goals" />
        <Mapper
          value={plan.goals}
          render={(goal) => <Text key={goal.id}>- {goal.description}</Text>}
        />

        {/* Separator */}
        <View className="w-full h-1 bg-slate-300 mt-5 mb-5 rounded-lg" />

        {/* Details Row */}
        <View className="flex flex-row justify-between mb-5">
          <Text>
            {plan.weeks} {plan.weeks > 1 ? "Weeks" : "Week"}
          </Text>
          <Text>5/2 T/R ?</Text>
          <Text>Legs</Text>
        </View>

        {/* Stats Row */}
        <View className="flex flex-row justify-around">
          <Text>100K Users</Text>
          <Text>*****</Text>
        </View>

        {/* Price Section */}
        <View className="w-full h-1 bg-slate-300 mt-5 mb-5 rounded-lg" />
        <View className="flex flex-row justify-between mb-7">
          <MaterialIcons name="save-alt" size={30} />
          <View className="flex flex-row">
            <Text className="mt-2.5 mr-2">30 PLN</Text>
            <TouchableOpacity>
              <Text className="bg-slate-300 border-2 border-slate-400 p-2 rounded-lg">
                Buy now
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Owner Info */}
        <View className="flex flex-row justify-between mb-2.5">
          <Image
            className="h-14 w-14"
            source={require("../../assets/images/icon.png")}
          />
          <Text className="ml-2.5 flex-1 self-center">
            {planOwner?.username}
          </Text>
          <Text className="self-center">Follow</Text>
        </View>

        {/* Description and Error */}
        <View className="flex flex-col">
          <Text>{planOwner?.description || "No description"}</Text>
          {error && <Text>{error.message}</Text>}
        </View>
      </View>
    </View>
  );
}
