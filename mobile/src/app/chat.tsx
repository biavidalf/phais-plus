import { useState } from 'react'
import { Alert, Button, ScrollView, Text, TextInput, View } from 'react-native'
import { io } from 'socket.io-client'

const URL = 'http://192.168.239.205:3003'
const socket = io(URL)

type Message = {
  author: string
  message: string
}

export default function Chat() {
  const [author, setAuthor] = useState<string>('Usuário')
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])

  socket.on('previousMessages', (data: Message) => {
    Alert.alert(JSON.stringify(messages))
    setMessages([...messages, data])
  })

  socket.on('receivedMessage', (data: Message) => {
    setMessages([...messages, data])
  })

  const sendMessage = () => {
    socket.emit('sendMessage', { author, message })
    setMessages([...messages, { author, message }])
    setMessage('')
  }

  return (
    <View
      style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 48, gap: 16 }}
    >
      <Text>Chat</Text>
      <ScrollView style={{ flex: 1 }}>
        {messages.map(({ author, message }, index) => (
          <Text key={index}>
            {author}: {message}
          </Text>
        ))}
      </ScrollView>
      <Text style={{ fontWeight: '700' }}>Autor:</Text>
      <TextInput
        value={author}
        onChangeText={setAuthor}
        placeholder="Nome do autor"
      />
      <Text style={{ fontWeight: '700' }}>Mensagem:</Text>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Digite sua mensagem"
      />
      <Button title="Enviar" onPress={sendMessage} />
    </View>
  )
}
