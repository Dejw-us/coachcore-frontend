import { MaterialIcons } from "@expo/vector-icons";
import { useToggle } from "common";
import { ComponentProps } from "react";
import {
  Dimensions,
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Header from "../Header";

export type PlanHeaderProps = {
  name: string;
  icon: ComponentProps<typeof MaterialIcons>["name"];
};

export default function PlanHeader({ icon, name }: PlanHeaderProps) {
  const { toggleState, getState } = useToggle();

  // Get screen height
  const screenHeight = Dimensions.get("window").height;

  return (
    <View className="flex flex-row justify-between">
      <View className="flex flex-row">
        <MaterialIcons name={icon} size={48} className="mr-3 mb-5" />
        <Header size="large" value={name} className="mt-2 mb-2 mr-10" />
      </View>
      <View>
        <Header onPress={toggleState} size="large" value="..." />
      </View>

      <Modal visible={getState()} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={toggleState}>
          <View className="flex-1 justify-end items-center bg-black/50">
            <TouchableWithoutFeedback>
              <View
                className="w-full bg-white rounded-t-2xl p-5"
                style={{ height: screenHeight / 3 }}
              >
                <Text>Test content in the modal</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
