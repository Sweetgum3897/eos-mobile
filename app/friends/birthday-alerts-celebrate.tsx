import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';

import { sendBirthdayCelebrationMessage } from '@/actions';
import { CustomAlertModal, HeaderBar, TextWrapper } from '@/components';

const zodiacBirthdayAlerts = '../../assets/svg/friends/ZodiacBirthdayLog.svg';
const CelebrationsLogo = '../../assets/svg/friends/celebrationsLogo.svg';
const PrecentIcon = '../../assets/svg/friends/precent.svg';
const StarIcon = '../../assets/svg/friends/star.svg';

export default function ZodiacBirthdayAlertsCelebrateScreen() {
  const { t } = useTranslation();
  const [visibleModal, setVisibleModal] = useState(false);

  const { username, friendId } = useLocalSearchParams<{ username: string; friendId: string }>();

  const handleCelebrate = async () => {
    try {
      const response = await sendBirthdayCelebrationMessage(friendId);
      if (response.status === 200 || response.status === 201) {
        setVisibleModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#F8F2EA',
      }}
    >
      <HeaderBar
        title={
          <View style={{ alignItems: 'center' }}>
            <View
              style={{
                width: 70,
                height: 70,
              }}
            >
              <Image source={require(zodiacBirthdayAlerts)} style={{ width: 78, height: 78 }} />
            </View>
          </View>
        }
      />
      <View style={{ flex: 1, width: '100%' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <TextWrapper style={{ fontSize: 24, textAlign: 'center', width: 200 }}>
            {`It's ${username as string} Birthday`}
          </TextWrapper>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 30,
            }}
          >
            <View style={{ width: 160, height: 160 }}>
              <Image source={require(CelebrationsLogo)} style={{ width: 168, height: 168 }} />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 20,
            justifyContent: 'center',
          }}
        >
          <TextWrapper
            style={{
              paddingHorizontal: 50,
              textAlign: 'center',
              fontSize: 24,
              color: '#03122B',
              letterSpacing: -0.17,
            }}
          >
            {t('sendThemThoughtfulMessage')}
          </TextWrapper>
        </View>
        <View>
          <TextWrapper
            style={{
              paddingHorizontal: 30,
              textAlign: 'center',
              fontSize: 18,
              color: '#555555',
            }}
          >
            {t('provocativeMessageWillNotBeDelivered')}
          </TextWrapper>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <TouchableOpacity
          onPress={handleCelebrate}
          style={{
            borderRadius: 24,
            padding: 8,
            alignItems: 'center',
            borderColor: '#000000',
            borderWidth: 0.5,
            backgroundColor: '#181818',
            boxShadow: ' 5px 4px 4px 0px rgba(0, 0, 0, 0.25)',
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'relative',
            width: '70%',
          }}
        >
          <Image source={require(StarIcon)} style={{ width: 26, height: 26 }} />
          <TextWrapper
            style={{
              color: 'white',
              fontSize: 23,
            }}
          >
            {t('sendMessage')}
          </TextWrapper>
          <Image source={require(StarIcon)} style={{ width: 26, height: 26 }} />
          <TouchableOpacity style={{ position: 'absolute', right: -50 }}>
            <Image source={require(PrecentIcon)} style={{ width: 46, height: 46 }} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingBottom: 20,
          marginTop: 5,
        }}
      >
        <TextWrapper style={{ fontSize: 15, color: 'black' }}>
          {t('orHaveYourCelestialGuide')}
        </TextWrapper>
      </View>
      <CustomAlertModal
        isVisible={visibleModal}
        onBackdropPress={() => setVisibleModal(false)}
        text={t('Enabled birthday alert!')}
      />
    </SafeAreaView>
  );
}
