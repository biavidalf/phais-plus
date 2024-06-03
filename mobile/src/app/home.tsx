import { Text, View, StyleSheet } from "react-native";

function Home() {
  return (
    <View style={styles.main}>
      <Text style={styles.titleText}>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  main: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default Home;
