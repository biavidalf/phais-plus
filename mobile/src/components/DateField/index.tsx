import { theme } from '@/theme'
import { colors } from '@/theme/colors'
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { StyleSheet, Text, View } from 'react-native'

type DateFieldProps = {
  date: Date
  label?: string
  onChange: (_: DateTimePickerEvent, selectedDate?: Date) => void
}

export default function DateField({
  date,
  label,
  onChange,
  ...otherProps
}: DateFieldProps) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNDateTimePicker
        mode="date"
        value={date}
        onChange={onChange}
        {...otherProps}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    flex: 1,
  },
  input: {
    position: 'relative',
    backgroundColor: theme.colors.bg.layer,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.body.md,
  },
  calendarIcon: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  label: {
    color: colors.neutral[200],
    fontSize: 18,
    fontFamily: 'SourceSansPro_400Regular',
  },
})
