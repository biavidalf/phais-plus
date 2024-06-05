import medicineService from '@/api/medicine'
import requestService from '@/api/request'
import requestPriorityService from '@/api/requestPriority'
import requestStatusService from '@/api/requestStatus'
import DateField from '@/components/DateField'
import Select from '@/components/Select'
import { TextField } from '@/components/TextField'
import { colors } from '@/theme/colors'
import { Request } from '@/types/api/request'
import { User } from '@/types/api/user'
import { Ionicons } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
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
import * as yup from 'yup'

type CreateRequestModalProps = {
  addRequest: (request: Request) => void
  modalVisibleState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

type Medicine = { id: string; name: string }
type Priority = { id: string; name: string }

const storeRequestSchema = yup.object({
  medicine_id: yup.string().required('Medicamento é obrigatório'),
  priority_id: yup.string().required('Prioridade é obrigatória'),
  status_id: yup.string().required('Situação é obrigatória'),
  quantity: yup
    .number()
    .min(1, 'Quantidade deve ser maior que 0')
    .required('Quantidade é obrigatória'),
  due_date: yup.date().required('Data de vencimento é obrigatória'),
  return_date: yup.date().required('Data de retorno é obrigatória'),
  description: yup.string().required('Descrição é obrigatória'),
})

type StoreRequestFormData = yup.InferType<typeof storeRequestSchema>

export default function CreateRequestModal({
  addRequest,
  modalVisibleState,
}: CreateRequestModalProps) {
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<StoreRequestFormData>({
    resolver: yupResolver(storeRequestSchema),
    defaultValues: {
      medicine_id: '',
      priority_id: '',
      status_id: '',
      quantity: undefined,
      due_date: new Date(),
      return_date: new Date(),
      description: undefined,
    },
  })
  const [isModalVisible, setIsModalVisible] = modalVisibleState

  const [loading, setLoading] = useState<boolean>(true)

  const [user, setUser] = useState<User>()
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [statuses, setStatuses] = useState<Priority[]>([])
  const [priorities, setPriorities] = useState<Priority[]>([])

  useEffect(() => {
    async function getUser() {
      const user = await AsyncStorage.getItem('user')

      if (!user) {
        Alert.alert('Erro', 'Usuário não encontrado.')
        router.replace('/')
        return
      }

      setUser(() => JSON.parse(user))
    }

    async function getMedicines() {
      const {
        status,
        data: { data: medicines },
      } = await medicineService.index()

      if (status !== 200) {
        throw new Error('Erro ao carregar as solicitações.')
      }

      setMedicines(() => medicines)
    }

    async function getPriorities() {
      const {
        status,
        data: { data: requestPriorities },
      } = await requestPriorityService.index()

      if (status !== 200) {
        throw new Error('Erro ao carregar as prioridades.')
      }

      setPriorities(() => requestPriorities)
    }

    async function getStatuses() {
      const {
        status,
        data: { data: requestStatuses },
      } = await requestStatusService.index()

      if (status !== 200) {
        throw new Error('Erro ao carregar os status.')
      }

      setStatuses(() => requestStatuses)
    }

    ;(async () => {
      try {
        await Promise.all([
          getUser(),
          getMedicines(),
          getPriorities(),
          getStatuses(),
        ])
      } catch (error) {
        Alert.alert(
          'Erro',
          error instanceof Error
            ? error.message
            : 'Erro interno ao carregar as solicitações.',
        )
      } finally {
        setLoading(() => false)
      }
    })()

    return () => {
      setLoading(() => true)
      setUser(() => undefined)
      setMedicines(() => [])
      setPriorities(() => [])
      setStatuses(() => [])
    }
  }, [register])

  const formatDate = (date: Date) => {
    const month = String(date.getMonth() + 1)
    const day = String(date.getDate())
    const year = String(date.getFullYear())

    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }

  const onSubmit = async ({
    medicine_id,
    priority_id,
    status_id,
    quantity,
    description,
    due_date,
    return_date,
  }: StoreRequestFormData) => {
    try {
      if (!user) {
        throw new Error('Usuário não encontrado.')
      }

      const payload = {
        requester_hospital_id: user.id,
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
      } = await requestService.store(payload)

      if (status !== 200) {
        throw new Error('Erro ao criar a solicitação.')
      }

      addRequest(request)
      Alert.alert('Sucesso', 'Solicitação criada com sucesso.')
      setIsModalVisible(false)
    } catch (error) {
      Alert.alert(
        'Erro',
        error instanceof Error
          ? error.message
          : 'Erro interno ao criar a solicitação.',
      )
    }
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setIsModalVisible(!isModalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.headerContainer}>
              <Text style={styles.modalTitle}>Abrir Solicitação</Text>
              <Pressable onPress={() => setIsModalVisible(false)}>
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
                <ScrollView
                  contentContainerStyle={styles.bodyContainer}
                  automaticallyAdjustKeyboardInsets={true}
                >
                  <Select
                    {...register('medicine_id')}
                    label="Medicamento"
                    error={errors?.medicine_id}
                    items={medicines.map(({ id, name }) => ({
                      label: name,
                      value: id,
                    }))}
                    onValueChange={(value) => setValue('medicine_id', value)}
                  />

                  <TextField
                    {...register('priority_id')}
                    label="Quantidade"
                    placeholder="0"
                    placeholderTextColor={colors.green.transp}
                    keyboardType="numeric"
                    error={errors?.quantity}
                    onChangeText={(value) =>
                      setValue('quantity', Number(value))
                    }
                  />

                  <View style={styles.doubleColumnContainer}>
                    <Select
                      {...register('status_id')}
                      label="Prioridade"
                      error={errors?.priority_id}
                      items={priorities.map(({ id, name }) => ({
                        label: name,
                        value: id,
                      }))}
                      onValueChange={(value) => setValue('priority_id', value)}
                    />

                    <Select
                      {...register('quantity')}
                      label="Situação"
                      error={errors?.status_id}
                      items={statuses.map(({ id, name }) => ({
                        label: name,
                        value: id,
                      }))}
                      onValueChange={(value) => setValue('status_id', value)}
                    />
                  </View>

                  <View style={styles.doubleColumnContainer}>
                    <DateField
                      date={getValues('due_date')}
                      label="Data Limite"
                      onChange={(_, value) =>
                        value && setValue('due_date', value)
                      }
                    />

                    <DateField
                      date={getValues('return_date')}
                      label="Data da Devolução"
                      onChange={(_, value) =>
                        value && setValue('return_date', value)
                      }
                    />
                  </View>

                  <TextField
                    {...register('description')}
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
