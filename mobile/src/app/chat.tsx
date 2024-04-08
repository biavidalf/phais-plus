import { theme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  // Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
// import { io } from "socket.io-client";

// const URL = "http://192.168.239.205:3003";
// const socket = io(URL);

const formatDateOptions = {
  hour: "2-digit",
  minute: "2-digit",
} as Intl.DateTimeFormatOptions;

type Message = {
  author: string;
  message: string;
  created_at: Date;
};

export default function Chat() {
  const [author, setAuthor] = useState<string>("Usuário");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  // socket.on("previousMessages", (data: Message) => {
  //   Alert.alert(JSON.stringify(messages));
  //   setMessages([...messages, data]);
  // });

  // socket.on("receivedMessage", (data: Message) => {
  //   setMessages([...messages, data]);
  // });

  const sendMessage = () => {
    if (!message) {
      return;
    }

    // socket.emit("sendMessage", { author, message });
    setMessages([...messages, { author, message, created_at: new Date() }]);
    setMessage("");
  };

  const formatMessageDate = (date: Date) => {
    const today = new Date();

    if (date.getDate() === today.getDate()) {
      return date.toLocaleTimeString("pt-BR", formatDateOptions);
    }

    return date.toLocaleDateString("pt-BR", formatDateOptions);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.title}>Chat</Text>

      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={{ gap: 8 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message, index) => {
          const wasSentByUser = message.author === author;

          return (
            <View
              key={index}
              style={
                wasSentByUser
                  ? styles.senderMessageContainer
                  : styles.receiverMessageContainer
              }
            >
              <Text
                style={
                  wasSentByUser
                    ? styles.senderMessageDetail
                    : styles.receiverMessageDetail
                }
              >
                {wasSentByUser ? "Você" : message.author}
              </Text>
              <Text
                style={
                  wasSentByUser ? styles.senderMessage : styles.receiverMessage
                }
              >
                {message.message}
              </Text>
              <Text
                style={
                  wasSentByUser
                    ? styles.senderMessageDetail
                    : styles.receiverMessageDetail
                }
              >
                {formatMessageDate(message.created_at)}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.sendMessageContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Digite uma mensagem..."
          placeholderTextColor={theme.colors.neutral.transparent}
          style={styles.sendMessageInput}
        />

        <Pressable onPress={sendMessage} style={styles.sendMessageButton}>
          <Ionicons
            name="send-outline"
            size={24}
            color={theme.colors.neutral.transparent}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 28,
    gap: 16,
    backgroundColor: theme.colors.bg.main,
  },
  title: {
    color: theme.colors.neutral[200],
    fontSize: theme.fonts.size.xl,
    fontFamily: theme.fonts.family.semibold,
    textAlign: "center",
    textTransform: "uppercase",
  },
  chatContainer: { flex: 1, paddingHorizontal: 20 },
  senderMessageContainer: {
    gap: 2,
    marginLeft: 60,
    marginRight: 0,
  },
  receiverMessageContainer: {
    gap: 2,
    marginLeft: 0,
    marginRight: 60,
  },
  senderMessageDetail: {
    color: theme.colors.neutral[200],
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.xs,
    textAlign: "right",
  },
  receiverMessageDetail: {
    color: theme.colors.neutral[200],
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.xs,
    textAlign: "left",
  },
  senderMessage: {
    color: theme.colors.neutral["200"],
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.base,
    backgroundColor: theme.colors.bg["layer-hover"],
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 0,
  },
  receiverMessage: {
    color: theme.colors.neutral["200"],
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.base,
    backgroundColor: theme.colors.bg.layer,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 12,
  },
  sendMessageContainer: { position: "relative" },
  sendMessageInput: {
    backgroundColor: theme.colors.bg.layer,
    color: theme.colors.neutral[200],
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.base,
    paddingLeft: 20,
    paddingRight: 64,
    paddingVertical: 16,
  },
  sendMessageButton: {
    position: "absolute",
    top: 14,
    right: 20,
  },
});
