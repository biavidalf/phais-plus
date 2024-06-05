import { theme } from '@/theme'
import { colors } from '@/theme/colors'
import { User } from '@/types/api/user'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default function Profile() {
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

      return () => {
        setIsLoading(() => true)
        setUser(() => undefined)
      }
    }

    getUser()

    return () => {
      setIsLoading(() => true)
      setUser(() => undefined)
    }
  }, [])

  function formatPhone(phone: string) {
    if (!/^\d+$/.test(phone)) {
      return phone
    }

    switch (phone.length) {
      case 10:
        return `(${phone.substring(0, 2)}) ${phone.substring(2, 6)}-${phone.substring(6)}`
      case 11:
        return `(${phone.substring(0, 2)}) ${phone.substring(2, 7)}-${phone.substring(7)}`
      default:
        return phone
    }
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleString('pt-BR', { hour12: false })
  }

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        user && (
          <>
            <View style={styles.profileContainer}>
              <Text style={styles.profileName}>{user.username}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Informações de Contato</Text>
              <TouchableOpacity style={styles.editButton}>
                <Ionicons
                  name="pencil-outline"
                  size={16}
                  color={colors.neutral[400]}
                />
              </TouchableOpacity>
              <View style={styles.infoRow}>
                <Ionicons
                  name="call-outline"
                  size={20}
                  color={colors.neutral[400]}
                />
                <Text style={styles.infoText}>{formatPhone(user.phone)}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={colors.neutral[400]}
                />
                <Text style={styles.infoText}>{user.email}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Informações de Sistema</Text>
              <TouchableOpacity style={styles.editButton}>
                <Ionicons
                  name="pencil-outline"
                  size={16}
                  color={colors.neutral[400]}
                />
              </TouchableOpacity>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Cadastrado em:</Text>
                <Text style={styles.infoText}>
                  {formatDate(user.created_at)}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Último Login em:</Text>
                <Text style={styles.infoText}>
                  {user.last_login ? formatDate(user.last_login) : '-'}
                </Text>
              </View>
            </View>
          </>
        )
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bg.main,
    padding: 24,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileName: {
    fontSize: 20,
    color: colors.neutral[200],
    fontFamily: theme.fonts.family.medium,
  },
  section: {
    width: '100%',
    marginBottom: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: colors.neutral[400],
    borderRadius: 8,
    backgroundColor: theme.colors.bg.main,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    color: colors.neutral[200],
    fontFamily: theme.fonts.family.medium,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.neutral[400],
    fontFamily: theme.fonts.family.regular,
  },
  infoText: {
    fontSize: 16,
    color: colors.neutral[200],
    fontFamily: theme.fonts.family.regular,
    marginLeft: 8,
  },
  editButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
})
