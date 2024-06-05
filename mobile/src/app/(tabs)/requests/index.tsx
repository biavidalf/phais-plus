import requestService from '@/api/request'
import Filter from '@/components/Filter'
import List from '@/components/List'
import SearchInput from '@/components/SearchInput'
import CreateRequestModal from '@/components/requests/CreateRequestModal'
import { theme } from '@/theme'
import { Request } from '@/types/api/request'
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

export default function RequestListPage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [selectedTagsId, setSelectedTagsId] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const tags = ['Aberto', 'Negociação', 'Urgente', 'Abertos hoje']

  useEffect(() => {
    const getRequests = async () => {
      const {
        status,
        data: { data: requests },
      } = await requestService.index()

      if (status !== 200) {
        throw new Error('Erro ao carregar as solicitações.')
      }

      setRequests(() => requests)
      setIsLoading(() => false)
    }

    try {
      getRequests()
    } catch (error) {
      Alert.alert(
        'Erro',
        error instanceof Error
          ? error.message
          : 'Erro interno ao carregar as solicitações.',
      )
    }
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

        {isLoading ? (
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

      {!isLoading && (
        <>
          <CreateRequestModal
            addRequest={addRequest}
            modalVisibleState={[isModalVisible, setIsModalVisible]}
          />

          <Pressable
            onPress={() => setIsModalVisible(true)}
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
