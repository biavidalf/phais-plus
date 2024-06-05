import { theme } from '@/theme'
import { colors } from '@/theme/colors'
import { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select'

type SelectProps = {
  label?: string
  error?: FieldError
  style?: StyleProp<ViewStyle>
} & PickerSelectProps

const Select = forwardRef<RNPickerSelect, SelectProps>(function Select(
  { label, error, style, ...otherProps },
  ref,
) {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNPickerSelect
        {...otherProps}
        ref={ref}
        style={{
          inputIOS: [
            styles.input,
            error ? styles.invalidInput : styles.validInput,
          ],
          inputAndroid: [
            styles.input,
            error ? styles.invalidInput : styles.validInput,
          ],
        }}
        items={otherProps.items}
      />

      {error && <Text style={styles.errorMessage}>{error.message}</Text>}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    gap: 4,
    borderRadius: 8,
    overflow: 'hidden',
    flex: 1,
  },
  input: {
    width: '100%',
    height: 48,
    color: colors.neutral[200],
    fontSize: 16,
    textAlignVertical: 'top',
    fontFamily: theme.fonts.family.regular,
    backgroundColor: colors.bg.layer,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  validInput: {
    borderColor: colors.bg.layer,
  },
  invalidInput: {
    borderColor: colors.others.red,
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

export default Select
