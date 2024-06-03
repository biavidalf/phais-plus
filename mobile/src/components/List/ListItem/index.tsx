import { theme } from '@/theme'
import { Feather, Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

interface ListItemProps {
  id: string
  title: string
  subtitle: string
  action: string
  status: string
}

export default function ListItem({
  id,
  title,
  subtitle,
  action,
  status,
}: ListItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.statusIndicatorContainer}>
        <Ionicons name="ellipse" size={9} color={getIndicatorColor(status)} />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subtitleText}>{subtitle}</Text>
      </View>

      <Link href={`/request/${id}`}>
        <View style={styles.actionContainer}>
          <Text style={styles.actionText}>{action}</Text>

          <Feather
            name="chevron-right"
            size={18}
            color={theme.colors.neutral.sec}
          />
        </View>
      </Link>
    </View>
  )
}

function getIndicatorColor(status: string) {
  if (status == 'Alta') return theme.colors.others.red

  if (status == 'Média') return theme.colors.others.yellow

  if (status == 'Baixa') return theme.colors.others.green

  return '#f5f5f5'
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: theme.colors.bg.layer,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  statusIndicatorContainer: {
    position: 'absolute',
    top: 6,
    left: 8,
  },
  titleContainer: {
    flex: 1,
    gap: 4,
  },
  titleText: {
    color: theme.colors.neutral.sec,
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.heading.xs,
  },
  subtitleText: {
    color: theme.colors.neutral.sec,
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.body.sm,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: theme.colors.neutral.sec,
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.body.xs,
  },
})
