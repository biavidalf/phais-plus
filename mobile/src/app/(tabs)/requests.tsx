import { getRequests } from '@/api/request'
import Filter from '@/components/Filter'
import List from '@/components/List'
import SearchInput from '@/components/SearchInput'
import { theme } from '@/theme'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import CreateRequestModal from '../create_request_modal'

export type Request = {
  id: string
  medicine: { name: string }
  requester_hospital: { name: string }
  status: { name: string }
  priority: { name: string }
}

export default function Tab() {
  const [loading, setLoading] = useState<boolean>(true)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [requests, setRequests] = useState<Request[]>([])
  const [selectedTagsId, setSelectedTagsId] = useState([])
  const tags = ['Aberto', 'Negociação', 'Urgente', 'Abertos hoje']

  const loadRequests = async () => {
    const {
      status,
      data: { data: requests },
    } = await getRequests()

    if (status !== 200) {
      throw new Error('Erro ao carregar as solicitações.')
    }

    setRequests(requests)
  }

  useEffect(() => {
    ;(async () => {
      try {
        await loadRequests()
      } catch (error) {
        Alert.alert(
          'Erro',
          error instanceof Error
            ? error.message
            : 'Erro interno ao carregar as solicitações.',
        )
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // function getSelectedTags() {
  //   return selectedTagsId.map((id) => tags[id]);
  // }

  const addRequest = (request: Request) => {
    setRequests([...requests, request])
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Todas as Solicitações</Text>

          <Ionicons
            name="ellipsis-horizontal-sharp"
            size={22}
            color={theme.colors.neutral.sec}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#F4F4F5" />
        ) : (
          <>
            <SearchInput placeholder="Search" isDisabled={false} />

            <Filter
              tags={tags}
              selectedTags={selectedTagsId}
              setSelectedTags={setSelectedTagsId}
            />

            {requests.length ? (
              <List
                data={(() => {
                  return requests.map(
                    ({
                      id,
                      medicine,
                      requester_hospital,
                      status,
                      priority,
                    }) => {
                      const item = {
                        id,
                        title: `#${id.substring(0, 4)} - ${medicine.name}`,
                        subtitle: requester_hospital.name,
                        action: status.name,
                        status: priority.name,
                      }
                      return item
                    },
                  )
                })()}
              />
            ) : (
              <Text style={[styles.titleText, { marginTop: 4 }]}>
                Nenhuma solicitação registrada.
              </Text>
            )}
          </>
        )}
      </View>

      {!loading && (
        <>
          <CreateRequestModal
            addRequest={addRequest}
            modalVisibleState={[modalVisible, setModalVisible]}
          />

          <Pressable
            onPress={() => setModalVisible(true)}
            style={styles.createRequestIcon}
          >
            <Ionicons
              name="add-outline"
              size={28}
              color={theme.colors.neutral.sec}
            />
          </Pressable>
        </>
      )}

      <StatusBar backgroundColor={theme.colors.green.dark} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.main,
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
})
