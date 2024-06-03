import { theme } from '@/theme'
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native'

interface FilterProps {
  tags: string[]
  selectedTags: number[]
  setSelectedTags: React.Dispatch<React.SetStateAction<never[]>>
}

export default function Filter({
  tags,
  selectedTags,
  setSelectedTags,
}: FilterProps) {
  const handlePress = (index: any) => {
    setSelectedTags((prevState: any) => {
      if (prevState.includes(index)) {
        return prevState.filter((i: any) => i !== index)
      } else {
        return [...prevState, index]
      }
    })
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterContainer}
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
  )
}

const styles = StyleSheet.create({
  filterContainer: {
    paddingVertical: 6,
    borderRadius: 4,
  },
  filterItem: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: theme.colors.bg['layer-hover'],
    borderRadius: 4,
    marginRight: 6,
  },
  filterText: {
    fontFamily: theme.fonts.family.regular,
    color: theme.colors.neutral.sec,
  },
  pressed: {
    backgroundColor: theme.colors.bg.sec,
  },
  notPressed: {
    backgroundColor: theme.colors.bg['layer-hover'],
  },
})
