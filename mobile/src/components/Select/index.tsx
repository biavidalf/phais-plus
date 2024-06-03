import { theme } from '@/theme'
import { colors } from '@/theme/colors'
import { Picker, PickerProps } from '@react-native-picker/picker'
import { FieldError } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'

type SelectOption = { label: string; value: string }
type SelectProps = {
  label?: string
  error?: FieldError
  options: SelectOption[]
  selectedValue: any
} & PickerProps

export default function Select({
  label,
  style,
  error,
  options,
  selectedValue,
  ...otherProps
}: SelectProps) {
  console.log(options)
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Picker
        dropdownIconColor={theme.colors.neutral.sec}
        mode="dropdown"
        style={styles.input}
        selectedValue={selectedValue}
        {...otherProps}
      >
        {options.map(({ label, value }, index) => {
          return (
            <Picker.Item
              key={index}
              label={label}
              value={value}
              style={styles.pickerItem}
            />
          )
        })}
      </Picker>
      {error && <Text style={styles.errorMessage}>{error.message}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    borderRadius: 8,
    overflow: 'hidden',
    flex: 1,
  },
  input: {
    backgroundColor: theme.colors.bg.layer,
    paddingHorizontal: 18,
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.body.md,
  },
  pickerItem: {
    backgroundColor: theme.colors.bg.layer,
    color: theme.colors.neutral.sec,
    width: '100%',
  },
  label: {
    color: colors.neutral[200],
    fontSize: 18,
    fontFamily: 'SourceSansPro_400Regular',
  },
  errorMessage: {
    color: colors.others.red,
    fontSize: 14,
    fontFamily: 'SourceSansPro_400Regular',
  },
})
