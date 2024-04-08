import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { theme } from "@/theme";

interface SearchInputProps {
  placeholder: string;
  isDisabled: boolean;
}

export default function SearchInput({
  placeholder,
  isDisabled,
}: SearchInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.searchInput,
          isDisabled && { backgroundColor: theme.colors.grays.disabled },
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.neutral["400"]}
      />

      <Feather
        name="search"
        size={24}
        color={theme.colors.neutral["400"]}
        style={styles.searchIcon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  searchInput: {
    backgroundColor: theme.colors.bg.layer,
    paddingLeft: 20,
    paddingRight: 56,
    paddingVertical: 12,
    borderRadius: 4,
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.base,
    color: theme.colors.neutral[200],
  },
  searchIcon: {
    position: "absolute",
    right: 20,
    top: 10,
  },
});
