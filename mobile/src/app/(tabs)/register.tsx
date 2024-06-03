import userService from '@/api/user'
import { TextField } from '@/components/TextField'
import { theme } from '@/theme'
import { colors } from '@/theme/colors'
import { Ionicons } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import * as yup from 'yup'

const signUpSchema = yup.object({
  cnpj: yup.string().required('CNPJ é obrigatório').length(14, 'CNPJ inválido'),
  email: yup
    .string()
    .required('E-mail é obrigatório')
    .email('E-mail inválido')
    .max(255, 'E-mail muito longo'),
  phone: yup
    .string()
    .required('Telefone é obrigatório')
    .min(10, 'Telefone inválido')
    .max(11, 'Telefone inválido'),
  username: yup
    .string()
    .required('Nome do estabelecimento é obrigatório')
    .min(3, 'Nome muito curto')
    .max(255, 'Nome muito longo'),
})

type SignUpFormData = yup.InferType<typeof signUpSchema>

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  })

  async function onSubmit(data: SignUpFormData) {
    try {
      const { cnpj, email, username, phone } = data

      const {
        data: { status },
      } = await userService.store({
        cnpj,
        email,
        username,
        phone,
        password: '12345678',
      })

      if (status !== 201) {
        Alert.alert(
          'Erro',
          'Não foi possível enviar a solicitação. Tente novamente mais tarde.',
        )
        return
      }

      Alert.alert(
        'Sucesso',
        'Sua solicitação foi enviada com sucesso. Aguarde o contato de um de nossos representantes.',
      )
    } catch (error) {
      if (error instanceof AxiosError) {
        Alert.alert(
          'Erro',
          error.response?.data.message ?? 'Houve um erro inesperado.',
        )
        return
      }

      Alert.alert(
        'Erro',
        'Não foi possível enviar a solicitação. Tente novamente mais tarde.',
      )
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      automaticallyAdjustKeyboardInsets={true}
    >
      <Image
        source={require('../../assets/logo.png')}
        alt="Phais+ logo"
        style={styles.logo}
      />
      <Text style={styles.title}>Quer utilizar nosso sistema?</Text>
      <Text style={styles.subtitle}>Entre em contato conosco!</Text>

      <View style={styles.inputContainer}>
        <TextField
          {...register('cnpj')}
          label="CNPJ"
          maxLength={14}
          placeholder="Insira o CNPJ"
          onChangeText={(text) => setValue('cnpj', text)}
          error={errors.cnpj}
        />

        <TextField
          {...register('email')}
          label="E-mail"
          placeholder="Insira o endereço de e-mail"
          onChangeText={(text) => setValue('email', text)}
          error={errors.email}
        />

        <TextField
          {...register('phone')}
          label="Telefone"
          maxLength={11}
          placeholder="Insira o número de telefone"
          onChangeText={(text) => setValue('phone', text)}
          error={errors.phone}
        />

        <TextField
          {...register('username')}
          label="Nome do Estabelecimento"
          placeholder="Insira o nome do estabelecimento"
          onChangeText={(text) => setValue('username', text)}
          error={errors.username}
        />
      </View>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        <Ionicons name="person-add-outline" size={20} color="#E4E4E7" />
        <Text style={styles.buttonText}>Solicitar</Text>
      </TouchableOpacity>

      <Text style={styles.link}>Já possui uma conta?</Text>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: theme.colors.bg.main,
  },
  logo: {
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    color: theme.colors.neutral['200'],
    fontFamily: theme.fonts.family.medium,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.neutral['400'],
    fontFamily: theme.fonts.family.regular,
    marginBottom: 24,
  },
  inputContainer: {
    width: '100%',
    gap: 16,
    maxWidth: 320,
    marginHorizontal: 'auto',
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: colors.green.main,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
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
  link: {
    fontSize: 14,
    fontFamily: theme.fonts.family.medium,
    color: colors.green.main,
    textDecorationLine: 'underline',
  },
})
