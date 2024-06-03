import { theme } from '@/theme'
import { colors } from '@/theme/colors'
import { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'

type TextFieldProps = { label: string; error?: FieldError } & TextInputProps

export const TextField = forwardRef<TextInput, TextFieldProps>(
  function TextField({ label, error, ...inputProps }, ref) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          ref={ref}
          style={[
            styles.input,
            error ? styles.invalidInput : styles.validInput,
          ]}
          {...inputProps}
        />
        {error && <Text style={styles.errorMessage}>{error.message}</Text>}
      </View>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    gap: 4,
    width: '100%',
  },
  label: {
    color: colors.neutral[200],
    fontSize: 18,
    fontFamily: theme.fonts.family.medium,
  },
  input: {
    width: '100%',
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
  errorMessage: {
    color: colors.others.red,
    fontSize: 14,
    fontFamily: theme.fonts.family.regular,
  },
})
