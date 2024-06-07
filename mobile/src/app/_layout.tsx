import { theme } from '@/theme'
import {
  SourceSansPro_300Light,
  SourceSansPro_400Regular,
  SourceSansPro_600SemiBold,
  SourceSansPro_700Bold,
  SourceSansPro_900Black,
  useFonts,
} from '@expo-google-fonts/source-sans-pro'
import { Feather } from '@expo/vector-icons'
import { Link, Stack } from 'expo-router'

export default function Layout() {
  function profile() {
    return (
      <Link href="/profile" style={{ paddingHorizontal: 14 }}>
        <Feather name="user" size={24} color={theme.colors.neutral.sec} />
      </Link>
    )
  }

  const [fontsLoaded] = useFonts({
    SourceSansPro_300Light,
    SourceSansPro_400Regular,
    SourceSansPro_600SemiBold,
    SourceSansPro_700Bold,
    SourceSansPro_900Black,
  })

  if (!fontsLoaded) {
    return
  }

  return (
    <Stack
      screenOptions={{
        headerTintColor: theme.colors.neutral.sec,
        headerRight: profile,
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: theme.colors.green.dark },
        headerTitleStyle: { fontFamily: theme.fonts.family.medium },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up/index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="profile/index" options={{ title: 'Perfil' }} />
      <Stack.Screen
        name="request/[id]/index"
        options={{ title: 'Detalhes da solicitação' }}
      />
      <Stack.Screen
        name="medicines/[id]/index"
        options={{ title: 'Detalhes do medicamento' }}
      />
    </Stack>
  )
}
