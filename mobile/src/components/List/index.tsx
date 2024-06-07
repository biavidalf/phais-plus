import { ScrollView, StyleSheet } from 'react-native'
import ListItem from './ListItem/index'

type ListItem = {
  id: string
  title: string
  subtitle: string
  action: string
  status?: string
  type?: string
}

type ListProps = {
  data: ListItem[]
  type?: string
}

export default function List({ data }: ListProps) {
  return (
    <ScrollView showsVerticalScrollIndicator={true} style={styles.container}>
      {data.map(({ id, title, subtitle, action, status, type }) => (
        <ListItem
          key={id}
          id={id}
          title={title}
          subtitle={subtitle}
          action={action}
          status={status}
          type={type}
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
