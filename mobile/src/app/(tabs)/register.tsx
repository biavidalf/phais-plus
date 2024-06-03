import { TextField } from '@/components/TextField'
import { theme } from '@/theme'
import React, { useState } from 'react'
import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const RegistrationScreen = () => {
  const [cnpj, setCnpj] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')

  const { width } = Dimensions.get('window')

  const handleSubmit = () => {
    alert('Cadastro submetido!')
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={{
            alignSelf: 'center',
          }}
          source={require('../../assets/logo_tela_login.png')}
        ></Image>
      </View>
      <Text style={styles.description}>Quer utilizar nosso sistema?</Text>
      <Text style={styles.description}>Entre em contato conosco!</Text>

      <View style={styles.inputContainer}>
        <TextField
          label="CNPJ"
          placeholder="Insira o CNPJ"
          value={cnpj}
          onChangeText={setCnpj}
        />

        <TextField
          label="E-mail"
          placeholder="Insira o endereço de e-mail"
          value={email}
          onChangeText={setEmail}
        />

        <TextField
          label="Telefone"
          placeholder="Insira o número de telefone"
          value={phone}
          onChangeText={setPhone}
        />

        <TextField
          label="Nome do Estabelecimento"
          placeholder="Insira o nome do estabelecimento"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.buttonContainer}>
        <View
          style={{
            width: width * 0.6,
          }}
        >
          <Button title="Solicitar" onPress={handleSubmit} color={'#7EB09B'} />
        </View>
      </View>

      <Text style={styles.link}>Já possui uma conta?</Text>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.bg.main,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.neutral.sec,
  },
  description: {
    fontSize: 16,
    color: theme.colors.neutral.sec,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: theme.fonts.family.medium,
  },
  inputContainer: {
    width: '80%',
    alignSelf: 'center',
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    width: '60%',
    alignSelf: 'center',
  },
  link: {
    color: '#7eb09b',
    textAlign: 'center',
    marginTop: 20,
    marginLeft: 30,
    textDecorationLine: 'underline',
  },
})

export default RegistrationScreen
