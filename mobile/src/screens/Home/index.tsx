import Card from '@/components/home/Card'
import { theme } from '@/theme'
import { User } from '@/types/api/user'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default function Home() {
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    async function getUser() {
      const user = await AsyncStorage.getItem('user')

      if (!user) {
        router.replace('/')
        Alert.alert('Erro', 'Usuário não encontrado')
        return
      }

      setUser(() => JSON.parse(user))
      setIsLoading(() => false)
    }

    getUser()

    return () => {
      setIsLoading(() => true)
      setUser(() => undefined)
    }
  }, [])

  async function logout() {
    await AsyncStorage.removeItem('user')
    router.replace('/')
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        user && (
          <>
            <TouchableOpacity style={styles.logoutContainer} onPress={logout}>
              <Text style={{ color: '#f5f5f5' }}>Sair da conta</Text>
              <Feather name="log-out" size={20} color="#BC5252" />
            </TouchableOpacity>

            <View style={styles.contentContainer}>
              <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
                alt="Phais+ logo"
              />

              <Text style={styles.title}>
                Bem-vindo,{' '}
                <Text style={styles.titleUsername}>{user.username}</Text>!
              </Text>

              <View style={styles.cards}>
                <Card title="Solicitações" icon="inbox" path="/requests" />
                <Card title="Medicamentos" icon="activity" path="/medicines" />
                <Card title="Minha Conta" icon="user" path="/profile" />
              </View>
            </View>
          </>
        )
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3A3B',
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    marginBottom: 36,
  },
  title: {
    color: theme.colors.neutral['200'],
    fontSize: 24,
    fontFamily: theme.fonts.family.medium,
    marginBottom: 20,
  },
  titleUsername: {
    textDecorationLine: 'underline',
  },
  cards: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
})
