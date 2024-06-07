import userService from '@/api/user'
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
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

export default function Profile() {
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [email, setEmail] = useState<string>()
  const [phone, setPhone] = useState<string>()
  const [isEditContactInfoActive, setIsEditContactInfoActive] =
    useState<boolean>(false)

  useEffect(() => {
    async function getUser() {
      const user = await AsyncStorage.getItem('user')

      if (!user) {
        router.replace('/')
        Alert.alert('Erro', 'Usuário não encontrado')
        return
      }

      const parsedUser = JSON.parse(user)

      setUser(() => parsedUser)
      setIsLoading(() => false)
      setEmail(parsedUser.email)
      setPhone(parsedUser.phone)
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

  async function saveData() {
    if (!user || !email || !phone) {
      Alert.alert('Erro', 'Preencha todos os campos')
      return
    }

    const {
      data: { status },
    } = await userService.update(user.id, {
      email,
      phone,
    })

    if (status !== 200) {
      Alert.alert('Erro', 'Erro ao atualizar dados.')
      return
    }

    const updatedUser = { ...user, email, phone }
    setUser(updatedUser)
    setIsEditContactInfoActive(false)
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser))

    Alert.alert('Sucesso', 'Dados atualizados com sucesso.')
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
              {isEditContactInfoActive ? (
                <View style={[styles.editButton, styles.editContainer]}>
                  <TouchableOpacity
                    onPress={() => {
                      saveData()
                    }}
                  >
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={colors.neutral[400]}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setEmail(user.email)
                      setPhone(user.phone)
                      setIsEditContactInfoActive(false)
                    }}
                  >
                    <Ionicons
                      name="close-outline"
                      size={20}
                      color={colors.neutral[400]}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setIsEditContactInfoActive(true)
                  }}
                  style={styles.editButton}
                >
                  <Ionicons
                    name="pencil-outline"
                    size={20}
                    color={colors.neutral[400]}
                  />
                </TouchableOpacity>
              )}
              <View style={styles.infoRow}>
                <Ionicons
                  name="call-outline"
                  size={20}
                  color={colors.neutral[400]}
                />
                <TextInput
                  style={[
                    styles.infoText,
                    isEditContactInfoActive && styles.infoInput,
                  ]}
                  onChangeText={(text) => setPhone(text)}
                  value={phone}
                  autoFocus={isEditContactInfoActive}
                  readOnly={!isEditContactInfoActive}
                />
              </View>
              <View style={styles.infoRow}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={colors.neutral[400]}
                />
                <TextInput
                  style={[
                    styles.infoText,
                    isEditContactInfoActive && styles.infoInput,
                  ]}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  readOnly={!isEditContactInfoActive}
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Informações de Sistema</Text>
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
    borderRadius: 8,
    backgroundColor: theme.colors.bg.layer,
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
    borderBottomWidth: 1,
    borderColor: 'transparent',
    height: 40,
  },
  infoText: {
    fontSize: 16,
    color: colors.neutral[200],
    fontFamily: theme.fonts.family.regular,
    marginLeft: 8,
    paddingEnd: 16,
    height: 40,
    borderBottomWidth: 1,
    borderColor: 'transparent',
  },
  infoInput: {
    borderBottomWidth: 1,
    borderColor: colors.neutral[200],
  },
  editButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  editContainer: {
    gap: 6,
  },
})
