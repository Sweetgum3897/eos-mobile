import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function SharedLayout() {
  return (
    <Stack>
      <Stack.Screen name="notification" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
    </Stack>
  );
}
