import {
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ScrollViewProps,
} from "react-native";
import { theme } from "@/theme";

interface FilterProps extends ScrollViewProps {
  tags: string[];
  selectedTags: number[];
  setSelectedTags: React.Dispatch<React.SetStateAction<never[]>>;
}

export default function Filter({
  tags,
  selectedTags,
  setSelectedTags,
  ...otherProps
}: FilterProps) {
  const handlePress = (index: any) => {
    setSelectedTags((prevState: any) => {
      if (prevState.includes(index)) {
        return prevState.filter((i: any) => i !== index);
      } else {
        return [...prevState, index];
      }
    });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.filterContainer, otherProps.style]}
      contentContainerStyle={{ columnGap: 4 }}
    >
      {tags &&
        tags.map((tag, index) => (
          <Pressable
            style={[
              styles.filterItem,
              selectedTags.includes(index) ? styles.pressed : styles.notPressed,
            ]}
            onPress={() => handlePress(index)}
            key={index}
          >
            <Text style={styles.filterText}>{tag}</Text>
          </Pressable>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    borderRadius: 4,
  },
  filterItem: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    backgroundColor: theme.colors.bg["layer-hover"],
    borderRadius: 4,
  },
  filterText: {
    fontSize: theme.fonts.size.base,
    fontFamily: theme.fonts.family.regular,
    color: theme.colors.neutral.sec,
  },
  pressed: {
    backgroundColor: theme.colors.bg.sec,
  },
  notPressed: {
    backgroundColor: theme.colors.bg["layer-hover"],
  },
});
