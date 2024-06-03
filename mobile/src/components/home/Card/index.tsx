import { theme } from '@/theme'
import { Feather } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

interface CardProps {
  title: string
  icon: any
  path: string
}

export default function Card({ title, icon, path }: CardProps) {
  return (
    <Link href={path}>
      <View style={[styles.card, styles.shadowProp]}>
        <Feather name={icon} size={56} color={theme.colors.neutral.sec} />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
    </Link>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 164,
    height: 164,
    aspectRatio: 1,
    backgroundColor: theme.colors.bg.layer,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  cardTitle: {
    color: theme.colors.neutral['200'],
    fontSize: 16,
    fontFamily: theme.fonts.family.medium,
    textTransform: 'uppercase',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
})
