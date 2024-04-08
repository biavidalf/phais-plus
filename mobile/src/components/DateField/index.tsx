import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StyleProp,
  TextStyle,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { theme } from "@/theme";
import { colors } from "@/theme/colors";

type DateFieldProps = {
  date: Date;
  label?: string;
  showDatePicker?: () => void;
  style?: StyleProp<TextStyle>;
};

export default function DateField({
  date,
  label,
  showDatePicker,
  style,
}: DateFieldProps) {
  return (
    <Pressable onPress={showDatePicker} style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.input}>
        <Text style={{ color: theme.colors.neutral.sec }}>
          {date.toLocaleDateString()}
        </Text>
        <View style={styles.calendarIcon}>
          <Feather
            name="calendar"
            size={24}
            color={theme.colors.neutral["400"]}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    flex: 1,
  },
  input: {
    position: "relative",
    backgroundColor: theme.colors.bg.layer,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.base,
  },
  calendarIcon: {
    position: "absolute",
    right: 20,
    top: 10,
  },
  label: {
    color: colors.neutral[200],
    fontSize: 18,
    fontFamily: "SourceSansPro_400Regular",
  },
});
