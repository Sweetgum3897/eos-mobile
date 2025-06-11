import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { CopilotProvider } from 'react-native-copilot';
import 'react-native-get-random-values';
import { MenuProvider } from 'react-native-popup-menu';
import 'react-native-reanimated';

import { fetchKeys } from '@/actions';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SplashSection } from '@/sections/splash-screen';
import { getStorageData, useAppStore } from '@/store';

import '../i18n';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [publishableKey, setPublishableKey] = useState('');
  const [appIsReady, setAppIsReady] = useState(false);
  const [loaded, setLoaded] = useState<string | null>(null);
  const showedSplashScreen = useAppStore((state) => state.showedSplashScreen);
  const authorized = useAppStore((state) => state.showedSplashScreen);
  const setAuthorized = useAppStore((state) => state.setAuthorized);
  const setUserInfo = useAppStore((state) => state.setUserInfo);
  const setShowedSplashScreen = useAppStore((state) => state.setShowedSplashScreen);
  const setKeys = useAppStore((state) => state.setKeys);
  const [fontLoaded] = useFonts({
    PatrickHand: require('../assets/fonts/PatrickHand-Regular.ttf'),
  });

  const fetchServerKeys = async () => {
    const { data: keys } = await fetchKeys(); // fetch key from your server here
    setPublishableKey(keys.stripePublishableKey);
    setKeys(keys);
  };

  const checkAuth = async () => {
    try {
      const auth = await getStorageData('auth');
      if (auth) {
        setAuthorized(true);
        setUserInfo(JSON.parse(auth));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchServerKeys();
      const showedSplashScreen: string = (await getStorageData('splash')) || '';
      setLoaded(showedSplashScreen);
      setShowedSplashScreen(showedSplashScreen === 'showed');
    })();
    checkAuth();
  }, []);

  useEffect(() => {
    if (fontLoaded && loaded !== null) {
      SplashScreen.hideAsync();
      setAppIsReady(true);
    }
  }, [fontLoaded, loaded]);

  if (!appIsReady) {
    return null;
  }

  if (!showedSplashScreen) {
    return <SplashSection />;
  }

  if (!authorized) {
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <CopilotProvider overlay="svg">
        <StripeProvider
          publishableKey={publishableKey}
          merchantIdentifier="merchant.identifier" // required for Apple Pay
          urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        >
          <MenuProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                animation: 'slide_from_right',
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </MenuProvider>
        </StripeProvider>
      </CopilotProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
