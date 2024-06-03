import { Text, View, StyleSheet } from 'react-native'

function Profile() {
  return (
    <View style={styles.main}>
      <Text style={styles.titleText}>Perfil</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  main: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
})

export default Profile
