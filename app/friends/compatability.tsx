import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Circle, G, Rect, Svg, Text } from 'react-native-svg';

import { HeaderBar, TextWrapper } from '@/components';

const aquariusAvatar = '../../assets/svg/aquarius.svg';
const hardIcon = '../../assets/svg/friends/hardIcon.svg';
const geminiAvatar = '../../assets/svg/gemini.svg';
const nextIcon = '../../assets/svg/home/next3.svg';

const CircleChart = ({ percentage }: { percentage: number }) => {
  const { t } = useTranslation();

  const width = 150;
  const height = 150;
  const [mainPercentage, setMainPercentage] = useState(0);
  const radius = (width / 2) * 0.8;
  const circumference = 2 * Math.PI * radius;
  const mainCount = mainPercentage * (40 / 100);

  const opacityAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, []);

  useEffect(() => {
    const setPercent = () => {
      if (mainPercentage === percentage) {
      } else if (mainPercentage < percentage) {
        setMainPercentage(mainPercentage + 1);
      } else if (mainPercentage > percentage) {
        setMainPercentage(mainPercentage - 1);
      }
    };
    if (mainPercentage != percentage) {
      setTimeout(() => setPercent(), 50);
    }
  }, [percentage, mainPercentage]);

  return (
    <Animated.View
      style={{
        width: width,
        height: height,
        opacity: opacityAnimation,
      }}
    >
      <Svg height={width} width={height}>
        <G>
          <Circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke="#F8F2EA"
            strokeWidth={10}
          />
          <Text
            x={width / 2 - 8}
            y={width / 2 + 5}
            textAnchor="middle"
            fontSize="36"
            fill="#202636"
            fontFamily="PatrickHand"
          >
            {mainPercentage}%
          </Text>
          <Text
            x={width / 2}
            y={width / 2 + 23}
            textAnchor="middle"
            fontSize="18"
            fill="#181818"
            fontFamily="PatrickHand"
          >
            {t('compatible')}
          </Text>
          {Array.from({ length: 40 }).map((a, _percentage) => {
            const smallCircleRadius = _percentage < mainCount ? radius * 0.07 : radius * 0.04;
            const angle = (_percentage / 40) * 2 * Math.PI - Math.PI / 2;
            const smallCircleX = width / 2 + radius * Math.cos(angle);
            const smallCircleY = width / 2 + radius * Math.sin(angle);
            const smallCircleStrokeDashoffset = circumference * (1 - _percentage / 100);
            return (
              <G key={_percentage}>
                <Circle
                  cx={smallCircleX}
                  cy={smallCircleY}
                  r={smallCircleRadius}
                  fill={_percentage < mainCount ? '#060000' : '#41404C'}
                  strokeDasharray={`${circumference}, ${circumference}`}
                  strokeDashoffset={smallCircleStrokeDashoffset}
                />
              </G>
            );
          })}
        </G>
      </Svg>
    </Animated.View>
  );
};

const CircleChart1 = ({ percentage }: { percentage: number }) => {
  const opacityAnimation = useRef(new Animated.Value(0)).current;
  const [mainPercentage, setMainPercentage] = useState(0);

  const width = 50;
  const height = 50;
  useEffect(() => {
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, []);

  useEffect(() => {
    const setPercent = () => {
      if (mainPercentage === percentage) {
      } else if (mainPercentage < percentage) {
        setMainPercentage(mainPercentage + 1);
      } else if (mainPercentage > percentage) {
        setMainPercentage(mainPercentage - 1);
      }
    };
    if (mainPercentage != percentage) {
      setTimeout(() => setPercent(), 50);
    }
  }, [percentage, mainPercentage]);

  const radius = width / 2;
  return (
    <Animated.View
      style={{
        width: width,
        height: height,
        opacity: opacityAnimation,
      }}
    >
      <Svg height={width} width={height}>
        <G>
          <Circle
            cx={width / 2}
            cy={width / 2}
            r={radius * 0.9}
            fill="none"
            stroke="#181818"
            strokeWidth={width * 0.06}
          />
          <Circle cx={width / 2} cy={width / 2} r={radius * 0.75} fill="#181818" />
          <Text
            x={width / 2 - 6}
            y={width / 2 + 7}
            textAnchor="middle"
            fontSize="20"
            fill="white"
            fontFamily="PatrickHand"
          >
            {mainPercentage}%
          </Text>
        </G>
      </Svg>
    </Animated.View>
  );
};
const LineChart = ({ percentage, width = 100 }: { percentage: number; width?: number }) => {
  const [mainPercentage, setMainPercentage] = useState(0);
  useEffect(() => {
    const setPercent = () => {
      if (mainPercentage === percentage) {
      } else if (mainPercentage < percentage) {
        setMainPercentage(mainPercentage + 1);
      } else if (mainPercentage > percentage) {
        setMainPercentage(mainPercentage - 1);
      }
    };
    if (mainPercentage != percentage) {
      setTimeout(() => setPercent(), 50);
    }
  }, [percentage, mainPercentage]);

  return (
    <View>
      <Svg width={width} height={width * 0.05} viewBox={`0 0 ${width} ${width * 0.05}`}>
        <Rect width={width} height={width * 0.05} rx={width * 0.03} fill="#172135" />
        <Rect
          x={(width / 100) * mainPercentage}
          width={(width / 100) * (100 - mainPercentage) - 1}
          height={width * 0.05}
          rx={width * 0.03}
          fill="#3889AC"
        />
      </Svg>
    </View>
  );
};

export default function CompatibilityScreen() {
  const { t } = useTranslation();

  const windowWidth = Dimensions.get('screen').width;

  const [compatiblePercent, setCompatible] = useState(25);
  const [detailView, setDetailView] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setCompatible(Math.floor(100 * Math.random()));
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#F8F2EA',
      }}
    >
      <ScrollView
        style={{
          width: windowWidth,
          flex: 1,
        }}
      >
        <HeaderBar title={<></>} />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TextWrapper style={{ fontSize: 32, color: 'black' }}>{t('compatibility')}</TextWrapper>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingTop: 10,
          }}
        >
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <View style={{ width: 121, height: 121 }}>
              <Image source={require(aquariusAvatar)} style={{ width: 130, height: 130 }} />
            </View>
            <View>
              <TextWrapper style={{ fontSize: 20 }}>{t('pickSign')}</TextWrapper>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 15,
            }}
          >
            <Image source={require(hardIcon)} style={{ width: 31, height: 31 }} />
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <View style={{ width: 121, height: 121 }}>
              <Image source={require(geminiAvatar)} style={{ width: 130, height: 130 }} />
            </View>
            <View>
              <TextWrapper style={{ fontSize: 20 }}>{t('pickSign')}</TextWrapper>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            borderColor: 'black',
            marginTop: 20,
            borderWidth: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomWidth: 0,
            width: '100%',
            paddingBottom: 20,
          }}
        >
          {!detailView ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <CircleChart percentage={compatiblePercent} />
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  paddingVertical: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <TextWrapper style={{ paddingHorizontal: 10 }}>{t('love')}</TextWrapper>
                  <LineChart percentage={compatiblePercent} />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <TextWrapper style={{ paddingHorizontal: 10 }}>{t('work')}</TextWrapper>
                  <LineChart percentage={compatiblePercent} />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <TextWrapper style={{ paddingHorizontal: 10 }}>{t('social')}</TextWrapper>
                  <LineChart percentage={compatiblePercent} />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <TextWrapper style={{ paddingHorizontal: 10 }}>{t('spiritual')}</TextWrapper>
                  <LineChart percentage={compatiblePercent} />
                </View>
              </View>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'column',
                paddingHorizontal: 20,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 10,
                }}
              >
                <TextWrapper
                  style={{ fontSize: 20, color: 'black' }}
                >{`${t('compatibility')}:`}</TextWrapper>
                <CircleChart1 percentage={compatiblePercent} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 10,
                }}
              >
                <LineChart percentage={compatiblePercent} width={300} />
              </View>
            </View>
          )}
          <View
            style={{
              flexDirection: 'column',
              padding: 16,
              borderTopColor: 'black',
              borderTopWidth: 1,
            }}
          >
            {!detailView ? (
              <TextWrapper style={{ fontSize: 16, color: 'black' }}>
                {t('compatibilityDescription1')}
              </TextWrapper>
            ) : (
              <>
                <TextWrapper style={{ fontSize: 16, color: 'black', marginBottom: 5 }}>
                  {t('compatibilityDescription2')}
                </TextWrapper>
                <TextWrapper style={{ fontSize: 16, color: 'black', marginBottom: 5 }}>
                  {t('compatibilityDescription3')}
                </TextWrapper>
                <TextWrapper style={{ fontSize: 16, color: 'black', marginBottom: 5 }}>
                  {t('compatibilityDescription4')}
                </TextWrapper>
                <TextWrapper style={{ fontSize: 16, color: 'black', marginBottom: 5 }}>
                  {t('compatibilityDescription5')}
                </TextWrapper>
                <TextWrapper style={{ fontSize: 16, color: 'black', marginBottom: 5 }}>
                  {t('compatibilityDescription6')}
                </TextWrapper>
                <TextWrapper style={{ fontSize: 16, color: 'black', marginBottom: 5 }}>
                  {t('compatibilityDescription7')}
                </TextWrapper>
                <TextWrapper style={{ fontSize: 16, color: 'black', marginBottom: 5 }}>
                  {t('compatibilityDescription8')}
                </TextWrapper>
                <TextWrapper style={{ fontSize: 16, color: 'black', marginBottom: 5 }}>
                  {t('compatibilityDescription9')}
                </TextWrapper>
                <TextWrapper style={{ fontSize: 16, color: 'black', marginBottom: 5 }}>
                  {t('compatibilityDescription10')}
                </TextWrapper>
                {/* <TextWrapper style={{ fontSize: 16, color: "black" }}>
                  Aquarius, an Air sign, is the bearer of water, symbolizing the
                  distribution of wisdom, knowledge, and humanity.
                  This sign is known for its visionary qualities, innovative spirit, and a
                  strong inclination towards independence and freedom.
                  Aquarians are forward-thinking, often seen as ahead of their time, valuing
                  friendship and collective activities.
                  They are ruled by Uranus, the planet of change, which bestows them with unique and
                  sometimes unconventional perspectives.
                  Leo, a Fire sign, is symbolized by the lion, representing courage, strength, and a
                  noble spirit.
                  Leos are characterized by their dramatic, creative, and self-confident nature.
                  Ruled by the Sun, the center of our solar system, Leos have a natural ability to shine
                  and be seen, craving recognition and admiration.
                  They possess a generous and warm heart, with a flair for the dramatic and a
                  desire to be loved and appreciated.
                  When Aquarius and Leo come together in a relationship, they form a spectrum of illumination
                  and innovation, as they are directly opposite each other on the
                  zodiac wheel, which can create a magnetic attraction.
                  This polarity embodies the balance between the individual (Leo) and
                  the collective (Aquarius), between personal creativity and
                  vision for the future.
                </TextWrapper> */}
              </>
            )}
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => setDetailView(!detailView)}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 14,
                    borderColor: 'black',
                    borderWidth: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 1,
                  }}
                >
                  <View
                    style={{
                      borderRadius: 14,
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#181818',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TextWrapper style={{ color: 'white' }}>3</TextWrapper>
                  </View>
                </View>
                <TextWrapper
                  style={{
                    color: 'black',
                    fontSize: 15,
                    paddingHorizontal: 5,
                  }}
                >
                  {t('diveDeeper')}
                </TextWrapper>
                <Image source={require(nextIcon)} style={{ width: 24, height: 13 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
