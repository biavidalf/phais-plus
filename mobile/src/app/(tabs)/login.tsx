import { TextField } from '@/components/TextField'
import { theme } from '@/theme'
import React, { useState } from 'react'
import {
  Alert,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const LoginScreen: React.FC = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const { width } = Dimensions.get('window')

  return (
    <View
      style={{
        backgroundColor: theme.colors.bg.main,
        flex: 1,
      }}
    >
      <Image source={require('../../assets/back_button.png')}></Image>
      <Image
        style={{
          alignSelf: 'center',
        }}
        source={require('../../assets/logo_tela_login.png')}
      ></Image>
      <Text style={styles.titleText}>Bem-vindo!</Text>
      <Text
        style={{
          color: theme.colors.neutral.sec,
          fontFamily: theme.fonts.family.medium,
          fontSize: 17,
          textAlign: 'center',
        }}
      >
        Acesse o sistema da Empresa:
      </Text>
      <View style={styles.container}>
        <View
          style={{
            width: width * 0.8,
          }}
        >
          <TextField
            placeholder="Insira seu e-mail"
            label="E-mail"
            onChangeText={(texto) => setEmail(texto)}
          />
          <TextField
            placeholder="Insira sua senha"
            label="Senha"
            onChangeText={(texto) => setPassword(texto)}
            secureTextEntry={true}
          ></TextField>
        </View>
      </View>
      <View style={styles.container_button}>
        <View
          style={{
            width: width * 0.6,
          }}
        >
          <Button
            onPress={() => Alert.alert('button prossed')}
            title="Acessar"
            color={'#7EB09B'}
          ></Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.main,
    justifyContent: 'center',
    alignItems: 'center',
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
    textAlign: 'center',
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
  container_button: {
    backgroundColor: theme.colors.bg.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default LoginScreen
