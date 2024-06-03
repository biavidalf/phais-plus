import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native'
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'

import { theme } from '@/theme'

import Select from '@/components/Select'
import SearchInput from '@/components/SearchInput'
import { useEffect, useState } from 'react'
import DateField from '@/components/DateField'
import { Ionicons } from '@expo/vector-icons'
import { Link, useLocalSearchParams } from 'expo-router'
import { getRequest, getRequestStatuses, updateRequest } from '@/api/request'
import { ItemValue } from '@react-native-picker/picker/typings/Picker'

type Request = {
  id: string
  requester_hospital: { name: string }
  quantity: string
  medicine: { name: string }
  status: { id: string }
  due_date: string
  return_date: string
  description: string
  created_at: string
}

type Status = { id: string; name: string }

export default function Request() {
  const { id } = useLocalSearchParams()

  const [loading, setLoading] = useState<boolean>(true)
  const [returnDate, setReturnDate] = useState<Date>(new Date())
  const [request, setRequest] = useState<Request | null>(null)
  const [statuses, setStatuses] = useState<Status[]>([])

  const [selectedStatus, setSelectedStatus] = useState<string>()

  const loadRequest = async () => {
    const {
      status,
      data: { data: request },
    } = await getRequest(id.toString())

    if (status !== 200) {
      throw new Error('Erro ao carregar a solicitação.')
    }

    setRequest(request)
    setSelectedStatus(request.status.id)
  }

  const loadStatuses = async () => {
    const {
      status,
      data: { data: statuses },
    } = await getRequestStatuses()

    if (status !== 200) {
      throw new Error('Erro ao carregar os status.')
    }

    setStatuses(statuses)
  }

  useEffect(() => {
    ;(async () => {
      try {
        Promise.all([loadRequest(), loadStatuses()])
      } catch (error) {
        Alert.alert(
          'Erro',
          error instanceof Error
            ? error.message
            : 'Erro interno ao carregar as solicitações.',
        )
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const formatDate = (date: Date) => {
    const month = String(date.getMonth() + 1)
    const day = String(date.getDate())
    const year = String(date.getFullYear())

    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }

  const onChangeReturnDate = async (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (!request || !selectedDate) {
      Alert.alert('Erro', 'Erro ao selecionar a data de devolução.')
      return
    }

    await updateRequest(request.id, {
      return_date: formatDate(selectedDate),
    })
    setReturnDate(selectedDate)
    Alert.alert('Data de devolução atualizada com sucesso!')
  }

  const onChangeStatus = async (value: ItemValue) => {
    if (!request) {
      Alert.alert('Erro', 'Erro ao atualizar a situação da solicitação.')
      return
    }

    await updateRequest(request.id, {
      status_id: value.toString(),
    })

    setSelectedStatus(value.toString())
    Alert.alert('Situação atualizada com sucesso!')
  }

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      mode: 'date',
      value: returnDate,
      onChange: onChangeReturnDate,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitleText}>Ver Solicitação</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#F4F4F5" />
      ) : (
        request && (
          <>
            <View style={styles.dataContainer}>
              <Text style={styles.titleText}>
                #{request.id.substring(0, 4)} -{' '}
                {request.requester_hospital.name}
              </Text>

              <View style={styles.doubleColumnContainer}>
                <View style={styles.groupContainer}>
                  <Text style={styles.groupLabelText}>Qtd</Text>
                  <Text style={styles.groupTitleText}>{request.quantity}</Text>
                </View>

                <View style={[styles.groupContainer, { flex: 1 }]}>
                  <Text style={styles.groupLabelText}>Medicamento</Text>
                  <Text style={styles.groupTitleText}>
                    {request.medicine.name}
                  </Text>
                </View>
              </View>

              <View style={styles.groupContainer}>
                <Text style={styles.groupLabelText}>Solicitante</Text>
                <Text style={styles.groupTitleText}>
                  {request.requester_hospital.name}
                </Text>
              </View>

              <View style={styles.groupContainer}>
                <Text style={styles.groupLabelText}>Status</Text>
                <View>
                  <Select
                    options={(() =>
                      statuses.map(({ id, name }) => {
                        return { label: name, value: id }
                      }))()}
                    selectedValue={selectedStatus}
                    onValueChange={onChangeStatus}
                    style={{ flex: 0 }}
                  />
                </View>
              </View>

              {/* <View style={styles.groupContainer}>
                <Text style={styles.groupLabelText}>Atendente</Text>
                <SearchInput placeholder="Procurar" isDisabled />
              </View> */}

              <View style={styles.doubleColumnContainer}>
                <View style={[styles.groupContainer, { flex: 1 }]}>
                  <Text style={styles.groupLabelText}>Data Limite</Text>
                  <DateField
                    date={new Date(request.due_date)}
                    style={{ flex: 0 }}
                  ></DateField>
                </View>

                <View style={[styles.groupContainer, { flex: 1 }]}>
                  <Text style={styles.groupLabelText}>Data Devolução</Text>

                  <DateField
                    showDatePicker={showDatePicker}
                    date={returnDate}
                    style={{ flex: 0 }}
                  ></DateField>
                </View>
              </View>

              <View style={styles.groupContainer}>
                <Text style={styles.groupLabelText}>Descrição</Text>
                <Text style={styles.groupTitleText}>{request.description}</Text>
              </View>
            </View>

            <View style={styles.creationInfoContainer}>
              <Text style={styles.creationInfoText}>
                Criado por {request.requester_hospital.name} às{' '}
                {new Date(request.created_at).toLocaleDateString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </Text>
            </View>
          </>
        )
      )}

      <Link href="/chat" style={styles.chatIcon}>
        <Ionicons
          name="chatbubble-outline"
          size={28}
          color={theme.colors.neutral.sec}
        />
      </Link>
      <StatusBar backgroundColor={theme.colors.green.dark} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.main,
    paddingHorizontal: 16,
  },
  sectionTitleContainer: {
    marginTop: 28,
    marginBottom: 20,
  },
  sectionTitleText: {
    color: theme.colors.neutral.sec,
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.heading.sm,
  },
  titleText: {
    color: theme.colors.neutral.sec,
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.heading.lg,
  },
  dataContainer: {
    gap: 20,
  },
  doubleColumnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 40,
  },
  groupContainer: {
    gap: 4,
  },
  groupLabelText: {
    color: theme.colors.neutral[400],
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.body.xs,
  },
  groupTitleText: {
    color: theme.colors.neutral.sec,
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.heading.sm,
  },
  creationInfoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 14,
  },
  creationInfoText: {
    color: theme.colors.neutral[400],
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.heading.xs,
  },
  chatIcon: {
    position: 'absolute',
    bottom: 64,
    right: 32,
    padding: 18,
    borderRadius: 99,
    backgroundColor: theme.colors.green.dark,
  },
})
