import { getMedicines } from '@/api/medicine'
import {
  createRequest,
  getRequestPriorities,
  getRequestStatuses,
} from '@/api/request'
import userService from '@/api/user'
import DateField from '@/components/DateField'
import Select from '@/components/Select'
import { TextField } from '@/components/TextField'
import { colors } from '@/theme/colors'
import { Ionicons } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { ItemValue } from '@react-native-picker/picker/typings/Picker'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import * as Yup from 'yup'
import { Request } from './(tabs)/requests'

type CreateRequestModalProps = {
  addRequest: (request: Request) => void
  modalVisibleState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

type FormValues = {
  requester_hospital_id: string
  medicine_id: string
  priority_id: string
  status_id: string
  quantity: number
  due_date: Date
  return_date: Date
  description: string
}

type User = { id: string; username: string }
type Medicine = { id: string; name: string }
type Priority = { id: string; name: string }

const initialValues = {
  requester_hospital_id: '',
  medicine_id: '',
  priority_id: '',
  status_id: '',
  quantity: undefined,
  due_date: new Date(),
  return_date: new Date(),
  description: undefined,
}

const requestSchema = Yup.object({
  requester_hospital_id: Yup.string().required('Hospital é obrigatório'),
  medicine_id: Yup.string().required('Medicamento é obrigatório'),
  priority_id: Yup.string().required('Prioridade é obrigatória'),
  status_id: Yup.string().required('Situação é obrigatória'),
  quantity: Yup.number()
    .min(1, 'Quantidade deve ser maior que 0')
    .required('Quantidade é obrigatória'),
  due_date: Yup.date().required('Data de vencimento é obrigatória'),
  return_date: Yup.date().required('Data de retorno é obrigatória'),
  description: Yup.string().required('Descrição é obrigatória'),
})

const CreateRequestModal = ({
  addRequest,
  modalVisibleState,
}: CreateRequestModalProps) => {
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(requestSchema),
    defaultValues: initialValues,
  })
  const [modalVisible, setModalVisible] = modalVisibleState

  const [loading, setLoading] = useState<boolean>(true)

  const [dueDate, setDueDate] = useState<Date>(getValues().due_date)
  const [returnDate, setReturnDate] = useState<Date>(getValues().return_date)

  const [users, setUsers] = useState<User[]>([])
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [priorities, setPriorities] = useState<Priority[]>([])
  const [statuses, setStatuses] = useState<Priority[]>([])

  const [selectedUser, setSelectedUser] = useState<string>(
    getValues().requester_hospital_id,
  )
  const [selectedMedicine, setSelectedMedicine] = useState<string>(
    getValues().medicine_id,
  )
  const [selectedPriority, setSelectedPriority] = useState<string>(
    getValues().priority_id,
  )
  const [selectedStatus, setSelectedStatus] = useState<string>(
    getValues().status_id,
  )

  const loadUsers = async () => {
    const {
      status,
      data: { data: users },
    } = await userService.index()

    if (status !== 200) {
      throw new Error('Erro ao carregar os usuários.')
    }

    setUsers(users)
  }

  const loadMedicines = async () => {
    const {
      status,
      data: { data: medicines },
    } = await getMedicines()

    if (status !== 200) {
      throw new Error('Erro ao carregar as solicitações.')
    }

    setMedicines(medicines)
  }

  const loadPriorities = async () => {
    const {
      status,
      data: { data: priorities },
    } = await getRequestPriorities()

    if (status !== 200) {
      throw new Error('Erro ao carregar as prioridades.')
    }

    setPriorities(priorities)
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
        await Promise.all([
          loadUsers(),
          loadMedicines(),
          loadPriorities(),
          loadStatuses(),
        ])
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

    register('requester_hospital_id')
    register('medicine_id')
    register('priority_id')
    register('status_id')
    register('quantity')
    register('due_date')
    register('return_date')
    register('description')
  }, [])

  const formatDate = (date: Date) => {
    const month = String(date.getMonth() + 1)
    const day = String(date.getDate())
    const year = String(date.getFullYear())

    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }

  const onSubmit = async ({
    requester_hospital_id,
    medicine_id,
    priority_id,
    status_id,
    quantity,
    description,
    due_date,
    return_date,
  }: FormValues) => {
    try {
      const data = {
        requester_hospital_id,
        medicine_id,
        priority_id,
        status_id,
        quantity,
        description,
        due_date: formatDate(due_date),
        return_date: formatDate(return_date),
      }

      const {
        status,
        data: { data: request },
      } = await createRequest(data)

      if (status !== 200) {
        throw new Error('Erro ao criar a solicitação.')
      }

      addRequest(request)

      Alert.alert('Sucesso', 'Solicitação criada com sucesso.')
      setModalVisible(false)
    } catch (error) {
      Alert.alert(
        'Erro',
        error instanceof Error
          ? error.message
          : 'Erro interno ao criar a solicitação.',
      )
    }
  }

  const onChangeUser = (value: ItemValue) => {
    setValue('requester_hospital_id', value.toString())
    setSelectedUser(value.toString())
  }

  const onChangeMedicine = (value: ItemValue) => {
    setValue('medicine_id', value.toString())
    setSelectedMedicine(value.toString())
  }

  const onChangePriority = (value: ItemValue) => {
    setValue('priority_id', value.toString())
    setSelectedPriority(value.toString())
  }

  const onChangeStatus = (value: ItemValue) => {
    setValue('status_id', value.toString())
    setSelectedStatus(value.toString())
  }

  const onChangeDueDate = (_: DateTimePickerEvent, selectedDate?: Date) => {
    if (!selectedDate) {
      return
    }

    setValue('due_date', selectedDate)
    setDueDate(selectedDate)
  }

  const onChangeReturnDate = (_: DateTimePickerEvent, selectedDate?: Date) => {
    if (!selectedDate) {
      return
    }

    setValue('return_date', selectedDate)
    setReturnDate(selectedDate)
  }

  const showDueDatePicker = () => {
    DateTimePickerAndroid.open({
      onChange: onChangeDueDate,
      mode: 'date',
      value: getValues().due_date,
    })
  }

  const showReturnDatePicker = () => {
    DateTimePickerAndroid.open({
      onChange: onChangeReturnDate,
      mode: 'date',
      value: getValues().return_date,
    })
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.headerContainer}>
              <Text style={styles.modalTitle}>Abrir Solicitação</Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <Ionicons
                  name="close-outline"
                  size={32}
                  color={colors.neutral.sec}
                />
              </Pressable>
            </View>

            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <>
                <ScrollView contentContainerStyle={styles.bodyContainer}>
                  <View style={styles.doubleColumnContainer}>
                    <Select
                      label="Hospital"
                      error={errors?.requester_hospital_id}
                      selectedValue={selectedUser}
                      options={(() =>
                        users
                          .map(({ id, username }) => {
                            return { label: username, value: id }
                          })
                          .concat({ label: '', value: '' }))()}
                      onValueChange={onChangeUser}
                    />
                  </View>

                  <View style={styles.doubleColumnContainer}>
                    <Select
                      label="Medicamento"
                      error={errors?.medicine_id}
                      selectedValue={selectedMedicine}
                      options={(() =>
                        medicines
                          .map(({ id, name }) => {
                            return { label: name, value: id }
                          })
                          .concat({ label: '', value: '' }))()}
                      onValueChange={onChangeMedicine}
                      style={{ flex: 2 }}
                    />

                    <TextField
                      label="Quantidade"
                      placeholder="0"
                      placeholderTextColor={colors.green.transp}
                      keyboardType="numeric"
                      error={errors?.quantity}
                      onChangeText={(value) =>
                        setValue('quantity', Number(value))
                      }
                    />
                  </View>

                  <View style={styles.doubleColumnContainer}>
                    <Select
                      label="Prioridade"
                      error={errors?.priority_id}
                      selectedValue={selectedPriority}
                      options={(() =>
                        priorities
                          .map(({ id, name }) => {
                            return { label: name, value: id }
                          })
                          .concat({ label: '', value: '' }))()}
                      onValueChange={onChangePriority}
                    />

                    <Select
                      label="Situação"
                      error={errors?.status_id}
                      selectedValue={selectedStatus}
                      options={(() =>
                        statuses
                          .map(({ id, name }) => {
                            return { label: name, value: id }
                          })
                          .concat({ label: '', value: '' }))()}
                      onValueChange={onChangeStatus}
                      style={{ flex: 1.5 }}
                    />
                  </View>

                  <View style={styles.doubleColumnContainer}>
                    <DateField
                      date={dueDate}
                      label="Data Limite"
                      showDatePicker={showDueDatePicker}
                    />

                    <DateField
                      date={returnDate}
                      label="Data da Devolução"
                      showDatePicker={showReturnDatePicker}
                    />
                  </View>

                  <TextField
                    label="Descrição"
                    multiline={true}
                    numberOfLines={3}
                    placeholder="Informações importantes da solicitação"
                    placeholderTextColor={colors.green.transp}
                    error={errors?.description}
                    onChangeText={(value) => setValue('description', value)}
                  />
                </ScrollView>

                <Pressable
                  onPress={() => !isSubmitting && handleSubmit(onSubmit)()}
                  style={styles.createRequestButton}
                >
                  {isSubmitting ? (
                    <ActivityIndicator size="large" />
                  ) : (
                    <Text style={styles.createRequestText}>
                      ABRIR SOLICITAÇÃO
                    </Text>
                  )}
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    backgroundColor: colors.bg.dark,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doubleColumnContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  bodyContainer: {
    justifyContent: 'flex-end',
    gap: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  createRequestButton: {
    backgroundColor: colors.green.dark,
    paddingVertical: 16,
    borderRadius: 8,
  },
  createRequestText: {
    color: colors.neutral[200],
    fontSize: 20,
    fontFamily: 'SourceSansPro_600SemiBold',
    textAlign: 'center',
  },
  modalTitle: {
    color: colors.neutral[200],
    fontSize: 24,
    fontFamily: 'SourceSansPro_600SemiBold',
  },
})

export default CreateRequestModal
