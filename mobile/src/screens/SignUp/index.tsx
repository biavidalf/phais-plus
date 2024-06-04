import userService from '@/api/user'
import { TextField } from '@/components/TextField'
import Button from '@/components/global/form/Button'
import { theme } from '@/theme'
import { colors } from '@/theme/colors'
import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import { Link, router } from 'expo-router'
import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
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
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(8, 'Senha muito curta')
    .max(255, 'Senha muito longa'),
  passwordConfirmation: yup
    .string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yup.ref('password')], 'Senhas não conferem'),
})

type SignUpFormData = yup.InferType<typeof signUpSchema>

export default function SignUp() {
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
      const { cnpj, email, username, phone, password } = data

      const {
        data: { status },
      } = await userService.store({
        cnpj,
        email,
        username,
        phone,
        password,
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
      router.push("/")
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
          editable={!isSubmitting}
          error={errors.cnpj}
        />

        <TextField
          {...register('email')}
          label="E-mail"
          placeholder="Insira o endereço de e-mail"
          onChangeText={(text) => setValue('email', text)}
          editable={!isSubmitting}
          error={errors.email}
        />

        <TextField
          {...register('phone')}
          label="Telefone"
          maxLength={11}
          placeholder="Insira o número de telefone"
          onChangeText={(text) => setValue('phone', text)}
          editable={!isSubmitting}
          error={errors.phone}
        />

        <TextField
          {...register('username')}
          label="Nome do Estabelecimento"
          placeholder="Insira o nome do estabelecimento"
          onChangeText={(text) => setValue('username', text)}
          editable={!isSubmitting}
          error={errors.username}
        />

        <TextField
          {...register('password')}
          label="Senha"
          secureTextEntry={true}
          placeholder="Insira sua senha"
          onChangeText={(text) => setValue('password', text)}
          editable={!isSubmitting}
          error={errors.password}
        />

        <TextField
          {...register('passwordConfirmation')}
          label="Confirmação de Senha"
          secureTextEntry={true}
          placeholder="Confirme sua senha"
          onChangeText={(text) => setValue('passwordConfirmation', text)}
          editable={!isSubmitting}
          error={errors.passwordConfirmation}
        />
      </View>

      <Button onPress={handleSubmit(onSubmit)} isLoading={isSubmitting} />

      <Link href="/" style={styles.link}>
        Já possui uma conta?
      </Link>
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
  link: {
    fontSize: 14,
    fontFamily: theme.fonts.family.medium,
    color: colors.green.main,
    textDecorationLine: 'underline',
  },
})
