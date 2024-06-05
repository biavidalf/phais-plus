import { theme } from '@/theme'
import { colors } from '@/theme/colors'
import { Ionicons } from '@expo/vector-icons'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean
}

export default function Button({ isLoading, ...otherProps }: ButtonProps) {
  return (
    <TouchableOpacity
      {...otherProps}
      style={styles.buttonContainer}
      onPress={otherProps.onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#E4E4E7" />
      ) : (
        <>
          <Ionicons name="person-add-outline" size={20} color="#E4E4E7" />
          <Text style={styles.buttonText}>Solicitar</Text>
        </>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height: 48,
    backgroundColor: colors.green.main,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
    maxWidth: 320,
    marginHorizontal: 'auto',
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: theme.fonts.family.medium,
    textTransform: 'uppercase',
    color: colors.neutral[200],
  },
})