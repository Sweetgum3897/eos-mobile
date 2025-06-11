import { Link, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { TextWrapper } from '@/components';

export default function NotFoundScreen() {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{ title: t('oops') }} />
      <View style={styles.container}>
        <TextWrapper>{t('screenNotFound')}</TextWrapper>
        <Link href="/" style={styles.link}>
          <TextWrapper>{t('goHome')}</TextWrapper>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
