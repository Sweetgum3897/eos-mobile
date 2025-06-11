import { Image } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, TouchableOpacity, View } from 'react-native';

import { useAppStore } from '@/store';

import { TextWrapper } from '../../components/ui/TextWrapper';

const nextIcon = '../../assets/svg/home/next2.svg';
const ascendantIcon = '../../assets/svg/horoscope/ascendant.svg';
const jupiterIcon = '../../assets/svg/horoscope/jupiter.svg';
const marsIcon = '../../assets/svg/horoscope/mars.svg';
const mercuryIcon = '../../assets/svg/horoscope/mercury.svg';
const midheavenIcon = '../../assets/svg/horoscope/midheaven.svg';
const moonIcon = '../../assets/svg/horoscope/moon.svg';
const neptuneIcon = '../../assets/svg/horoscope/neptune.svg';
const plutoIcon = '../../assets/svg/horoscope/pluto.svg';
const saturnIcon = '../../assets/svg/horoscope/saturn.svg';
const sunIcon = '../../assets/svg/horoscope/sun.svg';
const uranusIcon = '../../assets/svg/horoscope/uranus.svg';
const venusIcon = '../../assets/svg/horoscope/venus.svg';

export const DetailsComponent = ({ visible }: { visible: boolean }) => {
  const { t } = useTranslation();

  const chartData = useAppStore((store) => store.chartData);

  const opacityAnimation = useRef(new Animated.Value(1)).current;
  const [show, setShow] = useState(true);
  const details = [
    {
      id: 'sun',
      icon: <Image source={require(sunIcon)} style={{ width: 29, height: 29 }} />,
    },
    {
      id: 'midheaven',
      icon: <Image source={require(midheavenIcon)} style={{ width: 39, height: 25 }} />,
    },
    {
      id: 'ascendant',
      icon: <Image source={require(ascendantIcon)} style={{ width: 20, height: 33 }} />,
    },
    {
      id: 'moon',
      icon: <Image source={require(moonIcon)} style={{ width: 25, height: 29 }} />,
    },
    {
      id: 'mercury',
      icon: <Image source={require(mercuryIcon)} style={{ width: 22, height: 33 }} />,
    },
    {
      id: 'venus',
      icon: <Image source={require(venusIcon)} style={{ width: 23, height: 34 }} />,
    },
    {
      id: 'mars',
      icon: <Image source={require(marsIcon)} style={{ width: 33, height: 26 }} />,
    },
    {
      id: 'jupiter',
      icon: <Image source={require(jupiterIcon)} style={{ width: 24, height: 30 }} />,
    },
    {
      id: 'saturn',
      icon: <Image source={require(saturnIcon)} style={{ width: 18, height: 32 }} />,
    },
    {
      id: 'uranus',
      icon: <Image source={require(uranusIcon)} style={{ width: 26, height: 36 }} />,
    },
    {
      id: 'neptune',
      icon: <Image source={require(neptuneIcon)} style={{ width: 24, height: 32 }} />,
    },
    {
      id: 'pluto',
      icon: <Image source={require(plutoIcon)} style={{ width: 30, height: 35 }} />,
    },
  ];

  useEffect(() => {
    if (visible) {
      setShow(true);
      Animated.timing(opacityAnimation, {
        toValue: visible ? 1 : 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
    if (!visible) {
      setShow(false);
      Animated.timing(opacityAnimation, {
        toValue: visible ? 1 : 0,
        duration: 0,
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);

  if (show) {
    return (
      <Animated.View
        style={{
          flexDirection: 'column',
          opacity: opacityAnimation,
          padding: 8,
          //   backgroundColor: "#686662",
          //   borderRadius: 20,
        }}
      >
        {details.map((detail, key) => {
          return (
            <View
              key={key}
              style={{
                flexDirection: 'column',
                backgroundColor: '#D5CDC3',
                marginVertical: 6,
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    padding: 8,
                    flexDirection: 'row',
                    backgroundColor: '#181818',
                  }}
                >
                  <TextWrapper
                    style={{
                      color: 'white',
                      fontSize: 18,
                      paddingVertical: 5,
                    }}
                  >
                    {chartData?.[detail.id]?.name}
                  </TextWrapper>
                </View>
                <View style={{ flexDirection: 'row', padding: 8 }}>
                  <TextWrapper style={{ color: '#000', fontSize: 14 }}>
                    {chartData?.[detail.id]?.details}
                  </TextWrapper>
                </View>
                <View style={{ padding: 8 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 8,
                      borderRadius: 12,
                      backgroundColor: '#646464',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      {detail.icon}
                      <View
                        style={{
                          flexDirection: 'column',
                          paddingHorizontal: 5,
                        }}
                      >
                        <TextWrapper style={{ color: 'white', fontSize: 14 }}>
                          {chartData?.[detail.id]?.degree}
                        </TextWrapper>
                        <TextWrapper style={{ color: 'white', fontSize: 14 }}>
                          {chartData?.[detail.id]?.time}
                        </TextWrapper>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: '#464646',
                        borderRadius: 12,
                        padding: 10,
                      }}
                    >
                      <TextWrapper
                        style={{
                          color: 'white',
                          paddingHorizontal: 5,
                          fontSize: 15,
                        }}
                      >
                        {t('details')}
                      </TextWrapper>
                      <Image source={require(nextIcon)} style={{ width: 18, height: 9 }} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </Animated.View>
    );
  } else {
    return <></>;
  }
};
