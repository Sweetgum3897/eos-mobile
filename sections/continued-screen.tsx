import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { TextWrapper } from '@/components';
import { setStorageData, useAppStore } from '@/store';

const backIconSvg = '../assets/svg/backIcon.svg';
const nextIcon2Svg = '../assets/svg/nextIcon2.svg';
const threthMarkSvg = '../assets/svg/threth-mark.svg';

export const ContinuedSection = ({ close }: { close: () => void }) => {
  const { t } = useTranslation();

  const windowWidth = Dimensions.get('screen').width;
  const windowHeight = Dimensions.get('screen').height;
  const router = useRouter();

  const setShowedSplashScreen = useAppStore((state) => state.setShowedSplashScreen);

  const gotoNextPage = async () => {
    await setStorageData('splash', 'showed');
    setShowedSplashScreen(true);
    router.push('/');
  };

  const _close = () => {
    close();
  };
  return (
    <ScrollView
      overScrollMode={'never'}
      style={{
        width: windowWidth,
        height: windowHeight,
      }}
    >
      <View
        style={{
          position: 'relative',
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            overflow: 'hidden',
            borderWidth: 3,
            borderColor: 'black',
            backgroundColor: '#666666',
            ...Styles.shadow,
          }}
        >
          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginTop: 40,
              padding: 5,
              paddingLeft: 14,
            }}
          >
            <TouchableOpacity onPress={_close}>
              <Image source={require(backIconSvg)} style={{ width: 11, height: 14 }} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ width: 118, height: 118 }}>
              <Image source={require(threthMarkSvg)} style={{ width: 130, height: 130 }} />
            </View>
          </View>
          <TextWrapper style={{ fontSize: 26, color: 'white', textAlign: 'center' }}>
            {t('continued')}
          </TextWrapper>
          <View style={{ paddingHorizontal: 6 }}>
            <TextWrapper
              style={{
                fontSize: 18,
                color: 'white',
                textAlign: 'center',
                paddingVertical: 5,
              }}
            >
              {t('continuedScreenDescription1')}
            </TextWrapper>
            <TextWrapper
              style={{
                fontSize: 18,
                color: 'white',
                textAlign: 'center',
                paddingVertical: 5,
              }}
            >
              {t('continuedScreenDescription2')}
            </TextWrapper>
            <TextWrapper
              style={{
                fontSize: 18,
                color: 'white',
                textAlign: 'center',
                paddingVertical: 5,
              }}
            >
              {t('continuedScreenDescription3')}
            </TextWrapper>
          </View>
          <View
            style={{
              display: 'flex',
              paddingVertical: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 30,
                backgroundColor: '#F8F2EA',
                padding: 12,
                width: '90%',
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: '#F8F2EA',
              }}
              onPress={() => gotoNextPage()}
            >
              <TextWrapper style={{ color: '#000000', fontSize: 18, textAlign: 'center' }}>
                {t('continue')}
              </TextWrapper>
              <View style={{ position: 'absolute', right: 20, top: 20 }}>
                <Image source={require(nextIcon2Svg)} style={{ width: 34, height: 14 }} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  shadow: {
    boxShadow: '5px 5px 1px 0px rgba(0, 0, 0, 0.6)',
    elevation: 8,
  },
});
