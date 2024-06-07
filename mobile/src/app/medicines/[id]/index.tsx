import medicineService from '@/api/medicine'
import Information from '@/components/medicines/Information/info'
import MedicineType from '@/components/medicines/MedicineType'
import { colors } from '@/theme/colors'
import { theme } from '@/theme/index'
import { Medicine } from '@/types/api/medicine'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default function Id() {
  const [activeTab, setActiveTab] = useState('Informações')
  const { id } = useLocalSearchParams()

  const [loading, setLoading] = useState<boolean>(true)
  const [medicine, setMedicine] = useState<Medicine | null>(null)

  useEffect(() => {
    const getMedicine = async () => {
      if (!id) {
        throw new Error('Erro ao carregar o medicamento.')
      }

      const {
        status,
        data: { data: medicine },
      } = await medicineService.show(id.toString())

      if (status !== 200) {
        throw new Error('Erro ao carregar a solicitação.')
      }

      setMedicine(medicine)
    }
    ;(async () => {
      try {
        Promise.all([getMedicine()])
      } catch (error) {
        Alert.alert(
          'Erro',
          error instanceof Error
            ? error.message
            : 'Erro interno ao carregar os medicamentos.',
        )
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>#123 - Topison</Text>
        <MedicineType type="generic" />
      </View>

      <View style={styles.tabContainer}>
        <Tab
          label="Informações"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Tab
          label="Apresentação"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color="#F4F4F5" />
        ) : (
          medicine && <Information medicine={medicine} />
        )}
      </ScrollView>
    </View>
  )
}

interface TabProps {
  label: string
  activeTab: string
  setActiveTab: (label: string) => void
}

function Tab({ label, activeTab, setActiveTab }: TabProps) {
  return (
    <Pressable
      onPress={() => setActiveTab(label)}
      style={[
        styles.tab,
        activeTab === label ? styles.activeTab : styles.inactiveTab,
      ]}
    >
      <Text style={styles.tabTitle}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    backgroundColor: '#2C3A3B',
    gap: 18,
    paddingTop: 28,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  titleText: {
    color: theme.colors.neutral.sec,
    fontFamily: theme.fonts.family.medium,
    fontSize: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    textAlign: 'center',
    fontFamily: theme.fonts.family.regular,
    borderBottomColor: 'transparent',
    borderBottomWidth: 2,
    paddingBottom: 10,
  },
  tabTitle: {
    color: colors.neutral['200'],
    textAlign: 'center',
  },
  activeTab: {
    color: theme.colors.green.main,
    borderBottomColor: theme.colors.green.main,
  },
  inactiveTab: {
    color: theme.colors.neutral['400'],
    borderBottomColor: 'transparent',
  },
})
