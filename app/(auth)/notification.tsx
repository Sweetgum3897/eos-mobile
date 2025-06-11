import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { setBaseSettings } from '@/actions';
import { TextWrapper } from '@/components';
import { SETTINGS } from '@/constants';
import { useAppStore } from '@/store';

const allowNoteIcon = '../../assets/svg/allow-icon.svg';
const notificationLogo = '../../assets/svg/home/notification-logo.svg';
const notificationMark = '../../assets/svg/home/notification-mark.svg';

export default function Notifications() {
  const { t } = useTranslation();

  const userInfo = useAppStore((state) => state.userInfo);
  const setUserInfo = useAppStore((state) => state.setUserInfo);
  const router = useRouter();

  const handleNotification = async (isSet: boolean) => {
    try {
      const response = await setBaseSettings(SETTINGS['notifications'], isSet);
      if (response.status === 200 || response.status === 201) {
        setUserInfo({
          ...userInfo,
          ...response.data,
        });
      } else {
      }

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F2EA' }}>
      <View
        style={{
          flexDirection: 'column',
          paddingBottom: 20,
          marginTop: 30,
          width: '100%',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 15,
          }}
        >
          <Image source={require(notificationLogo)} style={{ width: 73, height: 73 }} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 5,
          }}
        >
          <TextWrapper style={{ fontSize: 32, fontWeight: '400' }}>
            {t('acceptUshNotification')}
          </TextWrapper>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 10,
          }}
        >
          <TextWrapper
            style={{
              fontSize: 14,
              width: 250,
              textAlign: 'center',
              fontWeight: '400',
            }}
          >
            {t('findOutWhenFriendsAddYou')}{' '}
          </TextWrapper>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 10,
          }}
        >
          <TextWrapper style={{ fontSize: 14, width: 300, textAlign: 'center' }}>
            {t('retrogradesTransitsEtcAlert')}
          </TextWrapper>
        </View>
        <View
          style={{
            padding: 10,
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <Image source={require(notificationMark)} style={{ width: 20, height: 20 }} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingHorizontal: 20,
            marginVertical: 10,
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => handleNotification(true)}
            style={{
              padding: 12,
              borderRadius: 24,
              backgroundColor: '#181818',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Image source={require(allowNoteIcon)} style={{ width: 20, height: 20 }} />
            <TextWrapper
              style={{
                fontSize: 17,
                textAlign: 'center',
                color: 'white',
              }}
            >
              {t('allowNotifications')}
            </TextWrapper>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingHorizontal: 20,
            marginVertical: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => handleNotification(false)}
            style={{
              padding: 10,
              borderRadius: 24,
              borderWidth: 1,
              borderColor: '#181818',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <TextWrapper style={{ fontSize: 17, textAlign: 'center' }}>
              {t('willDoLater')}
            </TextWrapper>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conversationWraper: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    marginVertical: 8,
    borderRadius: 10,
    width: '100%',
    flexDirection: 'column',
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: -0.17,
    color: 'white',
  },
  notificationContant: {
    fontSize: 12,
    fontWeight: 300,
    letterSpacing: -0.17,
    lineHeight: 22,
    color: 'white',
  },
});
