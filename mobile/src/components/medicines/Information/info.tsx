import { theme } from '@/theme'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { medication } from '../../../app/(tabs)/medicines/[id]/mock'

export default function Information() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ rowGap: 20 }}
        style={styles.dataContainer}
        showsVerticalScrollIndicator={false}
      >
        <Section
          title="Princípios ativos"
          content={medication.active_principle}
        />
        <Section
          title="Grupos Farmacológicos"
          content={medication.pharmacological_group}
        />
        <Section
          title="Indicações Terapêuticas"
          content={medication.therapeuthic_indication}
        />
        <Section title="Laboratório" content={medication.laboratory} />
        <Section
          title="Genericos"
          content={medication.equivalent_generic}
          withDetails
        />
        <Section
          title="Similares"
          content={medication.equivalent_similar}
          withDetails
        />

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitleText}>Risco na gravidez</Text>

          <View style={styles.pregnancyRiskSection}>
            <View style={styles.pregnancyRiskLetterContainer}>
              <Text style={styles.pregnancyRiskLetterText}>
                {medication.pregnancy_risk.letter}
              </Text>
            </View>
            <Text style={styles.pregnancyRiskDescription}>
              {medication.pregnancy_risk.description}
            </Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.smallerText}>
              Aprovado pela Anvisa: {medication.approvation_date ?? '-'}
            </Text>
            <Text style={styles.smallerText}>
              Receituário: {medication.prescription ?? '-'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

interface SectionContent {
  nome: string
  fabricante: string
}

interface SectionProps {
  title: string
  content: string | string[] | SectionContent[]
  withDetails?: boolean
}

function Section({ title, content, withDetails = false }: SectionProps) {
  function renderContent() {
    if (typeof content === 'string') {
      return <Text style={styles.sectionSubtitleText}>{content}</Text>
    }

    if (typeof content === 'object' && withDetails) {
      return (
        <View>
          {content.map((item, index) => {
            return (
              <View key={index} style={styles.sectionSubtitleContainer}>
                <Text key={index} style={styles.sectionSubtitleText}>
                  {/* @ts-expect-error: The content item is a SectionContent object */}
                  {item.nome}
                </Text>
                <Text
                  key={`${index}-detail`}
                  style={styles.sectionSubtitleDetailText}
                >
                  {/* @ts-expect-error: The content item is a SectionContent object */}
                  {item.fabricante}
                </Text>
              </View>
            )
          })}
        </View>
      )
    }

    if (typeof content === 'object' && !withDetails) {
      return (
        <View>
          {content.map((item, index) => {
            return (
              <Text
                key={index}
                style={[
                  styles.sectionSubtitleText,
                  styles.sectionSubtitleContainer,
                ]}
              >
                {/* @ts-expect-error: The content item can be a string */}
                {item}
              </Text>
            )
          })}
        </View>
      )
    }
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitleText}>{title}</Text>

      {renderContent()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    backgroundColor: '#2C3A3B',
    gap: 18,
    paddingHorizontal: 20,
  },
  dataContainer: {
    paddingBottom: 20,
  },
  sectionContainer: {
    gap: 10,
  },
  sectionTitleText: {
    color: theme.colors.neutral['400'],
    fontFamily: theme.fonts.family.regular,
    fontSize: 14,
  },
  sectionSubtitleContainer: {
    backgroundColor: theme.colors.bg.dark,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 3,
  },
  sectionSubtitleText: {
    color: theme.colors.neutral.sec,
    fontFamily: theme.fonts.family.regular,
    fontSize: 16,
  },
  sectionSubtitleDetailText: {
    color: theme.colors.neutral['400'],
    fontFamily: theme.fonts.family.regular,
    fontSize: 14,
  },
  pregnancyRiskSection: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  pregnancyRiskLetterContainer: {
    backgroundColor: '#cccccc',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
  },
  pregnancyRiskLetterText: {
    fontFamily: theme.fonts.family.regular,
    color: theme.colors.neutral.sec,
    fontSize: theme.fonts.size.heading.xl,
  },
  pregnancyRiskDescription: {
    fontFamily: theme.fonts.family.regular,
    color: theme.colors.neutral.sec,
  },
  smallerText: {
    fontSize: 14,
    fontFamily: theme.fonts.family.regular,
    color: '#DDDDDD',
  },
})
