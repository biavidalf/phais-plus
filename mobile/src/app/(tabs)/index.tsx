import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { theme } from "@/theme";
import { Href, Link } from "expo-router";

export default function home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoutContainer}>
        <Text style={{ color: "#f5f5f5" }}>Sair da conta</Text>
        <Feather name="log-out" size={20} color="#BC5252" />
        {/* colors.others.red */}
      </View>
      <View style={styles.mainContainer}>
        <Image source={require("../../assets/logo.png")} />

        <View style={{ width: "100%", alignItems: "center", gap: 24 }}>
          <Text style={styles.title}>
            Bem-vindo,{" "}
            <Text
              style={{
                textDecorationLine: "underline",
                lineHeight: 44,
                fontFamily: theme.fonts.family.bold,
              }}
            >
              Username!
            </Text>
          </Text>

          <View style={styles.cards}>
            <Card title="Solicitações" icon="inbox" path="/requests" />
            <Card title="Medicamentos" icon="activity" path="/meds" />
            <Card title="Minha Conta" icon="user" path="/profile" />
            <Card title="Sair da Conta" icon="log-out" path="/" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

interface CardProps {
  title: string;
  icon: any;
  path: Href<string>;
}
function Card({ title, icon, path }: CardProps) {
  return (
    <Link href={path} style={{ width: "40%" }}>
      <View style={[styles.card, styles.shadowProp]}>
        <Feather name={icon} size={44} color={theme.colors.neutral.sec} />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#2C3A3B",
    gap: 24,
    paddingTop: 35,
  },
  mainContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 34,
    backgroundColor: theme.colors.bg.main,
    gap: 44,
  },
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
    width: "90%",
  },
  title: {
    color: theme.colors.neutral.sec,
    fontSize: 22,
    fontFamily: theme.fonts.family.medium,
  },
  cards: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 20,
  },
  card: {
    width: "100%",
    height: 150,
    backgroundColor: theme.colors.bg.layer,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  cardTitle: {
    color: theme.colors.neutral.sec,
    fontSize: 20,
    fontFamily: theme.fonts.family.regular,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
