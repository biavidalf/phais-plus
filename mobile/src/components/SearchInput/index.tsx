import { theme } from '@/theme'
import { Feather } from '@expo/vector-icons'
import { StyleSheet, TextInput, View } from 'react-native'

interface SearchInputProps {
  placeholder: string
  isDisabled: boolean
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
        placeholderTextColor={theme.colors.neutral['400']}
      />

      <View style={styles.searchIcon}>
        <Feather name="search" size={24} color={theme.colors.neutral['400']} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  searchInput: {
    backgroundColor: theme.colors.bg.layer,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 4,
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.body.md,
  },
  searchIcon: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
})
