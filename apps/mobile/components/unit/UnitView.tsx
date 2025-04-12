import { AntDesign } from "@expo/vector-icons";
import { TrainingUnit } from "common";
import { Text, View } from "react-native";
import CenterView from "../common/CenterView";
import Separator from "../common/Separator";

export type UnitViewProps = {
  unit: TrainingUnit;
};

export default function UnitView({ unit }: UnitViewProps) {
  return (
    <CenterView className="pl-10 pr-10 pt-2.5 pb-2.5 m-1 ml-2.5 mr-2.5">
      <View className="flex flex-row justify-between">
        <Text className="self-center text-slate-400 text-2xl">
          {unit.index + 1}.
        </Text>
        <View className="flex flex-col items-center self-center">
          <Text>{unit.name}</Text>
          <Separator className="h-1 w-20 bg-slate-300" />
          <Text>{unit.dayOfWeek}</Text>
        </View>
        <AntDesign className="self-center" name="menufold" size={32} />
      </View>
    </CenterView>
  );
}
