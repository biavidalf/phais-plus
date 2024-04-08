import { StyleSheet, ScrollView } from "react-native";
import ListItem from "./ListItem/index";

type ListItem = {
  id: string;
  title: string;
  subtitle: string;
  action: string;
  status: string;
};

type ListProps = {
  data: ListItem[];
  type?: string;
};

export default function List({ data, type = "" }: ListProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{ rowGap: 8 }}
    >
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
  );
}
