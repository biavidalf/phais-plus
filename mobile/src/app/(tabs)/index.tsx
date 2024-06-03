import Card from '@/components/home/Card'
import { theme } from '@/theme'
import { Feather } from '@expo/vector-icons'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'

export default function HomePage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoutContainer}>
        <Text style={{ color: '#f5f5f5' }}>Sair da conta</Text>
        <Feather name="log-out" size={20} color="#BC5252" />
      </View>

      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        alt="Phais+ logo"
      />

      <Text style={styles.title}>
        Bem-vindo, <Text style={styles.titleUsername}>Username!</Text>
      </Text>

      <View style={styles.cards}>
        <Card title="Solicitações" icon="inbox" path="/requests" />
        <Card title="Medicamentos" icon="activity" path="/meds" />
        <Card title="Minha Conta" icon="user" path="/profile" />
        <Card title="Sair da Conta" icon="log-out" path="/" />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C3A3B',
    paddingHorizontal: 24,
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
    position: 'absolute',
    top: 64,
    right: 24,
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
