import { useFocusEffect } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { setBaseSettings } from '@/actions';
import { HeaderBar, TextWrapper } from '@/components';
import { SETTINGS } from '@/constants';
import { useAppStore } from '@/store';

const zodiacBirthdayAlerts = '../../assets/svg/friends/ZodiacBirthdayLog.svg';
const birthDayAlertLogo = '../../assets/svg/friends/birthdayAlertsLogo.svg';
const cakeIcon = '../../assets/svg/friends/cake.svg';

export default function ZodiacBirthdayAlertsOptInScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const userInfo = useAppStore((state) => state.userInfo);
  const setUserInfo = useAppStore((state) => state.setUserInfo);

  const handleJoin = async () => {
    try {
      const response = await setBaseSettings(SETTINGS.zodiacBirthdayAlerts, true);
      if (response.status === 200 || response.status === 201) {
        setUserInfo({
          ...userInfo,
          ...response.data,
        });
        router.push('/friends/birthday-alerts');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const settingIndex = (userInfo.settings || []).findIndex(
        (item) => item.id === SETTINGS.zodiacBirthdayAlerts,
      );
      if (settingIndex > -1) {
        router.push('/friends/birthday-alerts');
      }
    }, []),
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#F8F2EA',
      }}
    >
      <ScrollView style={{ width: '100%', flex: 1 }}>
        <HeaderBar
          title={
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require(zodiacBirthdayAlerts)}
                style={{ marginLeft: 5, width: 82, height: 78 }}
              />
            </View>
          }
        />
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <TextWrapper style={{ fontSize: 16, color: 'black', marginTop: 15 }}>
            {t('zodiacBirthdayAlerts')}
          </TextWrapper>
          <View style={{ width: 250, height: 250, marginTop: 20 }}>
            <Image source={require(birthDayAlertLogo)} style={{ width: 260, height: 260 }} />
          </View>

          <TextWrapper
            style={{
              fontSize: 14,
              color: 'black',
              marginTop: 10,
              letterSpacing: 3,
            }}
          >
            {t('celebrateTogether')}
          </TextWrapper>

          <View style={{ flexDirection: 'column', marginTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <TextWrapper
                style={{
                  fontSize: 32,
                  color: 'black',
                  textTransform: 'uppercase',
                }}
              >
                {t('zodiacBirthday')}
              </TextWrapper>
              <View style={{ width: 40, height: 40 }}>
                <Image source={require(cakeIcon)} style={{ width: 45, height: 45 }} />
              </View>
            </View>
            <TextWrapper
              style={{
                fontSize: 32,
                color: 'black',
                textTransform: 'uppercase',
              }}
            >
              {t('alertCelebrations')}
            </TextWrapper>
          </View>
          <TouchableOpacity onPress={handleJoin} style={styles.customBtn}>
            <TextWrapper style={{ fontSize: 16, color: '#F8F2EA' }}>{t('joinTheFun')}</TextWrapper>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conversationWraper: {
    padding: 8,
    marginVertical: 8,
    borderRadius: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#181818',
    marginTop: 18,
  },
  conversationTitle: {
    fontSize: 15,
    fontWeight: 400,
    letterSpacing: -0.17,
    color: 'white',
  },
  conversationContant: {
    fontSize: 12,
    fontWeight: 300,
    letterSpacing: -0.17,
    lineHeight: 22,
    color: 'white',
  },
  customBtn: {
    width: '90%',
    padding: 12,
    backgroundColor: '#181818',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
});
