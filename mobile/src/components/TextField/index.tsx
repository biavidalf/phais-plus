import { colors } from '@/theme/colors';
import { FieldError } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

type TextFieldProps = { label: string; error?: FieldError } & TextInputProps

export const TextField = ({ label, error, ...inputProps }: TextFieldProps) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} {...inputProps} />
    {error && <Text style={styles.errorMessage}>{error.message}</Text>}
  </View>
)

const styles = StyleSheet.create({
  container: {
    gap: 4,
    flex: 1,
  },
  label: {
    color: colors.neutral[200],
    fontSize: 18,
    fontFamily: 'SourceSansPro_400Regular',
  },
  input: {
    color: colors.neutral[200],
    fontSize: 16,
    textAlignVertical: 'top',
    fontFamily: 'SourceSansPro_400Regular',
    backgroundColor: colors.bg.layer,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  errorMessage: {
    color: colors.others.red,
    fontSize: 14,
    fontFamily: 'SourceSansPro_400Regular',
  },
})
