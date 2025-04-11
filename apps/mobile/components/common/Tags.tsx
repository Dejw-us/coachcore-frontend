import Mapper from "common/components/Mapper";
import { Text, View } from "react-native";

export type TagsProps = {
  tags: string[];
};

export default function Tags({ tags }: TagsProps) {
  return (
    <View className="flex flex-row justify-end">
      <Mapper
        value={tags}
        render={(tag) => (
          <Text className="m-1 border-1 border-yellow-400 border rounded-l p-1 bg-yellow-400/15">
            {tag}
          </Text>
        )}
      />
    </View>
  );
}
