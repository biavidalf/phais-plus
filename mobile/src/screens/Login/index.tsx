import userService from '@/api/user'
import { TextField } from '@/components/TextField'
import Button from '@/components/global/form/Button'
import { theme } from '@/theme'
import { colors } from '@/theme/colors'
import { Ionicons } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AxiosError } from 'axios'
import { Link, router } from 'expo-router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import * as yup from 'yup'

const loginSchema = yup.object({
  cnpj: yup.string().required('CNPJ é obrigatório').length(14, 'CNPJ inválido'),
  password: yup.string().required('Senha é obrigatória'),
})

type LoginFormData = yup.InferType<typeof loginSchema>

export default function Login() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  })

  async function onSubmit(data: LoginFormData) {
    try {
      const { cnpj, password } = data

      const {
        data: { status, data: user },
      } = await userService.authenticate({ cnpj, password })

      if (status !== 200) {
        Alert.alert(
          'Erro',
          'Não foi possível realizar o login. Verifique suas credenciais.',
        )
        return
      }

      await AsyncStorage.setItem('user', JSON.stringify(user))
      Alert.alert('Sucesso', 'Login realizado com sucesso! Bem-vindo(a).')
      router.replace('/home')
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
        'Não foi possível realizar o login. Verifique suas credenciais.',
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
      <Text style={styles.title}>Bem-vindo(a)!</Text>
      <Text style={styles.subtitle}>Acesse o sistema:</Text>

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
          {...register('password')}
          label="Senha"
          secureTextEntry={true}
          placeholder="Insira sua senha"
          onChangeText={(text) => setValue('password', text)}
          editable={!isSubmitting}
          error={errors.password}
        />
      </View>

      <Button onPress={handleSubmit(onSubmit)} isLoading={isSubmitting}>
        <Ionicons name="enter-outline" size={20} color="#E4E4E7" />
        <Text style={styles.buttonText}>Acessar</Text>
      </Button>

      <Link replace href="/sign-up" style={styles.link}>
        Não possui uma conta?
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
