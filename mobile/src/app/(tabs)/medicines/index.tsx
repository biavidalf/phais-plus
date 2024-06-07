import medicineService from '@/api/medicine'
import Filter from '@/components/Filter'
import List from '@/components/List'
import SearchInput from '@/components/SearchInput'
import { theme } from '@/theme'
import { Medicine } from '@/types/api/medicine'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default function MedicineListPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [selectedTagsId, setSelectedTagsId] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const tags = ['Genérico', 'Referência', 'Similar']

  useEffect(() => {
    const getMedicines = async () => {
      const {
        status,
        data: { data: medicines },
      } = await medicineService.index()

      if (status !== 200) {
        throw new Error('Erro ao carregar os medicamentos.')
      }

      setMedicines(() => medicines)
      setIsLoading(() => false)
    }

    try {
      getMedicines()
    } catch (error) {
      Alert.alert(
        'Erro',
        error instanceof Error
          ? error.message
          : 'Erro interno ao carregar os medicamentos.',
      )
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Todos os medicamentos</Text>

          <Ionicons
            name="ellipsis-horizontal-sharp"
            size={22}
            color={theme.colors.neutral.sec}
          />
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="#F4F4F5" />
        ) : (
          <>
            <SearchInput placeholder="Search" isDisabled={false} />

            <Filter
              tags={tags}
              selectedTags={selectedTagsId}
              setSelectedTags={setSelectedTagsId}
            />

            {medicines.length ? (
              <List
                data={(() => {
                  return medicines.map((medicine) => {
                    const item = {
                      id: medicine.id,
                      title: `#${medicine.id.substring(0, 4)} - ${medicine.name}`,
                      subtitle: medicine.name,
                      type: 'medicines',
                      action: medicine?.regulatory_category
                        ? medicine.regulatory_category[0].toUpperCase()
                        : '-',
                    }
                    return item
                  })
                })()}
              />
            ) : (
              <Text style={[styles.titleText, { marginTop: 4 }]}>
                Nenhum medicamento encontrado.
              </Text>
            )}
          </>
        )}
      </View>

      <StatusBar backgroundColor={theme.colors.green.dark} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.main,
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    color: theme.colors.neutral.sec,
    fontFamily: theme.fonts.family.bold,
  },
  titleContainer: {
    paddingTop: 32,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    color: theme.colors.neutral.sec,
    fontFamily: theme.fonts.family.medium,
    fontSize: 17,
  },
  mainContainer: {
    paddingHorizontal: 16,
  },
  createRequestIcon: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    padding: 18,
    borderRadius: 99,
    backgroundColor: theme.colors.green.dark,
  },
})
