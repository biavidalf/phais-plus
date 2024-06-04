// import { theme } from '@/theme'
// import { colors } from '@/theme/colors'
// import { Ionicons } from '@expo/vector-icons'
// import React from 'react'
// import {
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native'

// function Profile() {
//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.profileContainer}>
//         <Image
//           source={require('../../../assets/smileman.png')}
//           style={styles.profileImage}
//         />
//         <Text style={styles.profileName}>Francisco Almeira Filho</Text>
//         <Text style={styles.profileRole}>Farmacêutico</Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Informações Gerais</Text>
//         <TouchableOpacity style={styles.editButton}>
//           <Ionicons
//             name="pencil-outline"
//             size={16}
//             color={colors.neutral[400]}
//           />
//         </TouchableOpacity>
//         <View style={styles.infoRow}>
//           <Text style={styles.infoLabel}>Matrícula:</Text>
//           <Text style={styles.infoText}>01575</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <Text style={styles.infoLabel}>Nome Completo:</Text>
//           <Text style={styles.infoText}>Francisco Almeira Filho</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <Text style={styles.infoLabel}>CPF:</Text>
//           <Text style={styles.infoText}>068.151.457-97</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <Text style={styles.infoLabel}>Data de Nascimento:</Text>
//           <Text style={styles.infoText}>05/11/1990</Text>
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Informações de Contato</Text>
//         <TouchableOpacity style={styles.editButton}>
//           <Ionicons
//             name="pencil-outline"
//             size={16}
//             color={colors.neutral[400]}
//           />
//         </TouchableOpacity>
//         <View style={styles.infoRow}>
//           <Ionicons name="call-outline" size={20} color={colors.neutral[400]} />
//           <Text style={styles.infoText}>(085) 99999-9999</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <Ionicons name="mail-outline" size={20} color={colors.neutral[400]} />
//           <Text style={styles.infoText}>francisco@gmail.com</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <Ionicons
//             name="location-outline"
//             size={20}
//             color={colors.neutral[400]}
//           />
//           <Text style={styles.infoText}>Rua nº 70 Cidade Estado</Text>
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Empresa / Hospital</Text>
//         <View style={styles.infoRow}>
//           <Text style={styles.infoLabel}>Unimed Fortaleza - Sul</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <Text style={styles.infoLabel}>Cargo/Função:</Text>
//           <Text style={styles.infoText}>Farmacêutico</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <Text style={styles.infoLabel}>Data de Admissão:</Text>
//           <Text style={styles.infoText}>05/11/2022</Text>
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Informações de Sistema</Text>
//         <TouchableOpacity style={styles.editButton}>
//           <Ionicons
//             name="pencil-outline"
//             size={16}
//             color={colors.neutral[400]}
//           />
//         </TouchableOpacity>
//         <View style={styles.infoRow}>
//           <Text style={styles.infoLabel}>Cadastrado em:</Text>
//           <Text style={styles.infoText}>20/01/2023 14:45</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <Text style={styles.infoLabel}>Último Login em:</Text>
//           <Text style={styles.infoText}>25/01/2023 10:30</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <Text style={styles.infoLabel}>Observações:</Text>
//           <Text style={styles.infoText}>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//           </Text>
//         </View>
//       </View>
//     </ScrollView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.bg.main,
//     padding: 50,
//   },
//   profileContainer: {
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   profileImage: {
//     width: 200,
//     height: 200,
//     borderRadius: 150,
//     marginBottom: 12,
//   },
//   profileName: {
//     fontSize: 20,
//     color: colors.neutral[200],
//     fontFamily: theme.fonts.family.medium,
//   },
//   profileRole: {
//     fontSize: 16,
//     color: colors.neutral[400],
//     fontFamily: theme.fonts.family.regular,
//   },
//   section: {
//     marginBottom: 24,
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     borderWidth: 1,
//     borderColor: colors.neutral[400],
//     borderRadius: 8,
//     backgroundColor: theme.colors.bg.main,
//     width: '90%',
//     alignSelf: 'center',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     color: colors.neutral[200],
//     fontFamily: theme.fonts.family.medium,
//     marginBottom: 12,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   infoLabel: {
//     fontSize: 16,
//     color: colors.neutral[400],
//     fontFamily: theme.fonts.family.regular,
//   },
//   infoText: {
//     fontSize: 16,
//     color: colors.neutral[200],
//     fontFamily: theme.fonts.family.regular,
//     marginLeft: 8,
//   },
//   editButton: {
//     marginTop: 15,
//     position: 'absolute',
//     top: 0,
//     right: 16,
//     zIndex: 1,
//   },
// })

// export default Profile
