import { ScrollView, StyleSheet } from 'react-native'
import ListItem from './ListItem/index'

type ListItem = {
  id: string
  title: string
  subtitle: string
  action: string
  status: string
}

type ListProps = {
  data: ListItem[]
  type?: string
}

export default function List({ data, type = '' }: ListProps) {
  return (
    <ScrollView showsVerticalScrollIndicator={true} style={styles.container}>
      {data.map(({ id, title, subtitle, action, status }) => (
        <ListItem
          key={id}
          id={id}
          title={title}
          subtitle={subtitle}
          action={action}
          status={status}
        />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
})
