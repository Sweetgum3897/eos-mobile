import { Stack } from 'expo-router';
import { Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthLayout() {
  const windowWidth = Dimensions.get('screen').width;
  const windowHeight = Dimensions.get('screen').height;
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#F8F2EA',
        width: windowWidth,
        height: windowHeight,
      }}
    >
      <GestureHandlerRootView>
        <Stack initialRouteName="login">
          <Stack.Screen name="username" options={{ headerShown: false }} />
          <Stack.Screen name="change-password" options={{ headerShown: false }} />
          <Stack.Screen name="displayname" options={{ headerShown: false }} />
          <Stack.Screen name="facebook-login" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="password" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="reset-password" options={{ headerShown: false }} />
          <Stack.Screen name="register-password" options={{ headerShown: false }} />
          <Stack.Screen name="verification" options={{ headerShown: false }} />
          <Stack.Screen name="notification" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
