import { theme } from '@/theme'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { medication } from '../../../app/(tabs)/medicines/[id]/mock'

export default function Presentation() {
  return (
    <View>
      <ScrollView contentContainerStyle={{ rowGap: 20 }}>
        {medication.presentation.map((item, index) => {
          return <Section key={index} item={item} />
        })}
      </ScrollView>
    </View>
  )
}

interface SectionProps {
  item: {
    titulo: string
    detalhes: string[]
    dosagem?: string[]
  }
}

function Section({ item }: SectionProps) {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitleText}>{item.titulo}</Text>
      <View style={styles.sectionTopicsContainer}>
        {item.detalhes.map((item, index) => {
          return (
            <Text key={index} style={styles.sectionTopicsText}>
              {'\u2022 '}
              {item}
            </Text>
          )
        })}

        {item.dosagem && (
          <View>
            <Text style={styles.sectionTopicsDosagem}>Dosagem</Text>
            {item.dosagem.map((item, index) => {
              return (
                <Text key={index} style={styles.sectionTopicsText}>
                  {'\u2022 '}
                  {item}
                </Text>
              )
            })}
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    paddingBottom: 20,
  },
  sectionTitleText: {
    backgroundColor: theme.colors.bg.dark,
    color: theme.colors.neutral.sec,
    fontFamily: theme.fonts.family.regular,
    fontSize: 18,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  sectionTopicsContainer: {
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sectionTopicsText: {
    color: '#A1A1AA',
    fontFamily: theme.fonts.family.regular,
    fontSize: 16,
  },
  sectionTopicsDosagem: {
    color: theme.colors.neutral.sec,
    marginTop: 4,
  },
})
