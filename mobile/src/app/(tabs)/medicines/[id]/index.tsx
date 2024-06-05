import Information from '@/components/medicines/Information/info'
import Presentation from '@/components/medicines/Presentation/presentation'
import { theme } from '@/theme/index'
import { useState } from 'react'
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default function Id() {
  const [activeTab, setActiveTab] = useState('Apresentação')

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>#123 - Topison</Text>
        <Image source={require('./typeR.png')} />
      </View>

      <View style={styles.tabContainer}>
        <Tab
          label="Informações"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Tab
          label="Apresentação"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {activeTab === 'Informações' ? <Information /> : <Presentation />}
      </ScrollView>
    </View>
  )
}

interface TabProps {
  label: string
  activeTab: string
  setActiveTab: (label: string) => void
}

function Tab({ label, activeTab, setActiveTab }: TabProps) {
  return (
    <Pressable
      onPress={() => setActiveTab(label)}
      style={[
        styles.tab,
        activeTab === label ? styles.activeTab : styles.inactiveTab,
      ]}
    >
      <Text>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    backgroundColor: '#2C3A3B',
    gap: 18,
    paddingTop: 28,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  titleText: {
    color: theme.colors.neutral.sec,
    fontFamily: theme.fonts.family.medium,
    fontSize: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    textAlign: 'center',
    fontFamily: theme.fonts.family.regular,
    borderBottomColor: 'transparent',
    borderBottomWidth: 2,
    paddingBottom: 10,
  },
  activeTab: {
    color: theme.colors.green.main,
    borderBottomColor: theme.colors.green.main,
  },
  inactiveTab: {
    color: theme.colors.neutral['400'],
    borderBottomColor: 'transparent',
  },
})
