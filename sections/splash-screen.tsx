import { Image } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Dimensions, SafeAreaView, TouchableOpacity, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

import { TextWrapper } from '../components';
import { ContinuedSection } from './continued-screen';

const firstLogoSvg = '../assets/svg/first-logo.svg';
const firstMarkSvg = '../assets/svg/first-mark.svg';
const nextIconSvg = '../assets/svg/nextIconbutton.svg';
const secondLogoSvg = '../assets/svg/second-logo.svg';
const threthLogoSvg = '../assets/svg/threth-logo.svg';
const ThrethMarkSvg = '../assets/svg/threth-mark.svg';

export const SplashSection = () => {
  const { t } = useTranslation();

  const windowWidth = Dimensions.get('screen').width;

  const [showContinued, setShowContinued] = useState(false);
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  const [firstPage, goSliders] = useState(true);

  const slides = [
    {
      key: 1,
      content: (
        <View
          style={{
            // backgroundColor: "#F8F2EA",
            flexDirection: 'column',
            // backgroundColor: "red"
            flex: 1,
          }}
        >
          <ScrollView style={{ width: '100%' }}>
            <View
              style={{
                alignItems: 'center',
                marginTop: 150,
              }}
            >
              <View style={{ width: 217, height: 217 }}>
                <Image source={require(firstLogoSvg)} style={{ width: 235, height: 235 }} />
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                marginTop: 20,
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingBottom: 80,
              }}
            >
              <TextWrapper style={{ fontSize: 19, textAlign: 'center' }}>
                {t('astrologyTailoredToYourUniqueCosmicBlueprint')}
              </TextWrapper>
            </View>
          </ScrollView>
        </View>
      ),
    },
    {
      key: 2,
      content: (
        <View
          style={{
            backgroundColor: '#F8F2EA',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <ScrollView style={{ width: '100%', flex: 1 }}>
            <View
              style={{
                paddingHorizontal: 14,
                paddingBottom: 80,
              }}
            >
              <View style={{ display: 'flex', alignItems: 'center', marginTop: 80 }}>
                <View style={{ width: 120, height: 120 }}>
                  <Image source={require(secondLogoSvg)} style={{ width: 130, height: 130 }} />
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  marginTop: 30,
                  alignItems: 'center',
                }}
              >
                <TextWrapper style={{ fontSize: 16, textAlign: 'center' }}>
                  {t('stellarInsightsWithGuide')}
                </TextWrapper>
              </View>
              <View
                style={{
                  marginTop: 30,
                  alignItems: 'center',
                  backgroundColor: '#646464',
                  borderRadius: 15,
                  paddingHorizontal: 14,
                  paddingVertical: 15,
                }}
              >
                <View style={{ paddingHorizontal: 25 }}>
                  <TextWrapper
                    style={{
                      textAlign: 'center',
                      fontSize: 24,
                      color: 'white',
                    }}
                  >
                    {t('plutoSquareNatalMercury')}
                  </TextWrapper>
                </View>
                <TextWrapper
                  style={{
                    color: 'white',
                    marginTop: 15,
                    lineHeight: 19.5,
                    fontSize: 15,
                  }}
                >
                  {t('splashScreenDescription1')}
                </TextWrapper>
              </View>
            </View>
          </ScrollView>
        </View>
      ),
    },
    {
      key: 3,
      content: (
        <View
          style={{
            backgroundColor: '#F8F2EA',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <ScrollView style={{ width: '100%' }}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 80,
              }}
            >
              <View style={{ width: 120, height: 120 }}>
                <Image source={require(threthLogoSvg)} style={{ width: 130, height: 130 }} />
              </View>
            </View>
            <View style={{ display: 'flex', marginTop: 20, alignItems: 'center' }}>
              <TextWrapper style={{ fontSize: 36 }}>{t('yourCelestialGuide')}</TextWrapper>
            </View>
            <View
              style={{
                paddingHorizontal: 14,
                paddingTop: 20,
                paddingBottom: 80,
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: '#4F4D4A',
                  borderRadius: 15,
                  paddingVertical: 14,
                  padding: 8,
                }}
              >
                <View style={{ display: 'flex', justifyContent: 'center' }}>
                  <View style={{ width: 79, height: 79 }}>
                    <Image source={require(ThrethMarkSvg)} style={{ width: 87, height: 87 }} />
                  </View>
                </View>
                <TextWrapper
                  style={{
                    color: 'white',
                    marginTop: 10,
                    fontSize: 15,
                    lineHeight: 19.5,
                    textAlign: 'center',
                  }}
                >
                  {t('splashScreenDescription2')}
                </TextWrapper>
              </View>
            </View>
          </ScrollView>
        </View>
      ),
    },
  ];

  const closefirstPage = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start(() => {
      goSliders(false);
    });
  };

  const _renderNextButton = () => {
    return (
      <View
        style={{
          borderRadius: 30,
          backgroundColor: '#181818',
          padding: 12,
          width: windowWidth * 0.9,
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'black',
          // position: 'absolute',
          // bottom: 40,
          // right: '50%',
          marginTop: -60,
        }}
      >
        <TextWrapper
          style={{
            color: '#F8F2EA',
            fontSize: 18,
            textAlign: 'center',
          }}
        >
          {t('continue')}
        </TextWrapper>
        <View style={{ position: 'absolute', right: 20, top: 20 }}>
          <Image source={require(nextIconSvg)} style={{ width: 34, height: 14 }} />
        </View>
      </View>
    );
  };

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);
  const RenderItem = ({ item }: any) => {
    return item.content;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#F8F2EA',
      }}
    >
      {firstPage ? (
        <Animated.View
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            opacity: fadeAnimation,
          }}
        >
          <View style={{ display: 'flex', alignItems: 'center', marginTop: 50 }}>
            <View style={{ width: 100, height: 120 }}>
              <Image source={require(firstMarkSvg)} style={{ width: 100, height: 120 }} />
            </View>
          </View>
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <TextWrapper style={{ fontSize: 45 }}>{t('eos')}</TextWrapper>
          </View>
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <TextWrapper style={{ fontSize: 20 }}>{t('guideForSeekers')}</TextWrapper>
          </View>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 60,
              shadowColor: 'red',
            }}
          >
            <View style={{ width: 216, height: 216 }}>
              <Image source={require(firstLogoSvg)} style={{ width: 234, height: 234 }} />
            </View>
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: 25,
              left: 0,
              right: 0,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 30,
                backgroundColor: '#181818',
                padding: 12,
                width: '90%',
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: 'black',
              }}
              onPress={() => closefirstPage()}
            >
              <TextWrapper style={{ color: '#F8F2EA', fontSize: 18, textAlign: 'center' }}>
                {t('continue')}
              </TextWrapper>
              <View style={{ position: 'absolute', right: 20, top: 20 }}>
                <Image source={require(nextIconSvg)} style={{ width: 34, height: 14 }} />
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      ) : (
        <GestureHandlerRootView>
          <AppIntroSlider
            data={slides}
            renderItem={RenderItem}
            onDone={() => {
              setShowContinued(true);
            }}
            renderDoneButton={_renderNextButton}
            renderNextButton={_renderNextButton}
            dotStyle={{
              backgroundColor: '#B0B0B0',
              width: 19,
              height: 6,
              borderRadius: 8,
              position: 'relative',
              marginBottom: 0,
            }}
            activeDotStyle={{
              backgroundColor: '#181818',
              width: 42,
              height: 6,
              borderRadius: 8,
              position: 'relative',
              marginBottom: 0,
            }}
          />
        </GestureHandlerRootView>
      )}
      {showContinued && <ContinuedSection close={() => setShowContinued(false)} />}
    </SafeAreaView>
  );
};
