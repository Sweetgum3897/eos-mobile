import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

import { DetailsComponent, HeaderBar, TextWrapper } from '@/components';
import { useAppStore } from '@/store';

const tableChartMark = '../../assets/svg/chart/tablechartMark.svg';

export default function TableChartScreen() {
  const { t } = useTranslation();

  const windowWidth = Dimensions.get('screen').width;
  const windowHeight = Dimensions.get('screen').height;
  const [detailView, setDetailView] = useState(false);
  const chartData = useAppStore((store) => store.chartData);
  const opacityAnimation = useRef(new Animated.Value(1)).current;

  const data = [
    ['Leo', 'AC ASCENANT', ''],
    ['Cancer', '☼ SUN', ''],
    ['', '♀ VENUS', '01'],
    ['', '☿ MERCURY', '02'],
    ['Libra', '♂ MARS', '03'],
    ['Sagittarius', '♃ JUPITER', ''],
    ['Scorpio', '♇ PLUTO', '05'],
    ['Aquarius', 'MOON', ''],
    ['Capricorn', '♅ URANUS', ''],
    ['', '♆ NEPTUNE', '07'],
    ['Pisces', '♄ SATURN', '09'],
  ];

  useEffect(() => {
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <GestureHandlerRootView>
      <ScrollView
        style={{
          width: windowWidth,
          height: windowHeight,
        }}
      >
        <View
          style={{
            width: windowWidth,
          }}
        >
          <HeaderBar
            title={
              <View style={{ height: 100, alignItems: 'center' }}>
                <View style={{ width: 65, height: 65, marginVertical: 5 }}>
                  <Image source={require(tableChartMark)} style={{ width: 78, height: 78 }} />
                </View>
                <TextWrapper style={{ fontSize: 16, textAlign: 'center' }}>
                  {t('tableChart')}
                </TextWrapper>
              </View>
            }
          />

          <View
            style={{
              paddingHorizontal: 16,
              paddingTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 12,
                backgroundColor: '#F2E7D9',
              }}
            >
              <View style={{ width: 80, height: 80, marginVertical: 16 }}>
                {chartData.image && (
                  <Image source={chartData.image} style={{ width: 90, height: 90 }} />
                )}
              </View>
              <Animated.View
                style={{
                  flexDirection: 'column',
                  opacity: opacityAnimation,
                  borderColor: 'black',
                  borderWidth: 1,
                }}
              >
                {data.map((a, key) => (
                  <View key={key} style={{ flexDirection: 'row' }}>
                    <View
                      style={[{ width: '40%' }, styles.item, a[0] && key !== 0 && styles.topBorder]}
                    >
                      <TextWrapper style={{ fontSize: 17 }}>{a[0]}</TextWrapper>
                    </View>
                    <View style={[{ width: '40%' }, styles.item, styles.horizonBorder]}>
                      <TextWrapper style={{ fontSize: 17 }}>{a[1]}</TextWrapper>
                    </View>
                    <View style={[{ width: '20%' }, styles.item, a[2] && styles.bottomBorder]}>
                      <TextWrapper style={{ fontSize: 17 }}>{a[2]}</TextWrapper>
                    </View>
                  </View>
                ))}
              </Animated.View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              padding: 16,
              paddingHorizontal: 16,
              justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 25,
                borderWidth: 2,
                borderColor: 'black',
                width: '45%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#E8E8E8',
                position: 'relative',
              }}
            >
              <TextWrapper
                style={{
                  fontSize: 14,
                  lineHeight: 16,
                }}
              >
                {t('celestialGuideInterpretation')}
              </TextWrapper>
              <View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 25,
                  borderWidth: 1,
                  borderColor: 'black',
                  padding: 1,
                  position: 'absolute',
                  right: 5,
                  top: -13,
                }}
              >
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 25,
                    backgroundColor: 'black',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white' }}>1</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDetailView(!detailView)}
              style={{
                padding: 10,
                borderRadius: 25,
                //   borderWidth: 2,
                //   borderColor: "black",
                backgroundColor: '#686662',
                width: '45%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TextWrapper
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 16,
                }}
              >
                {t('details')}
              </TextWrapper>
            </TouchableOpacity>
          </View>
          <DetailsComponent visible={detailView} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              // padding: 10,
              width: '100%',
              marginBottom: 20,
              paddingHorizontal: 16,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                position: 'relative',
                justifyContent: 'center',
                backgroundColor: '#181818',
                borderRadius: 24,
                padding: 12,
                width: '100%',
              }}
            >
              <TextWrapper style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>
                {t('exploreYourStartMap')}
              </TextWrapper>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  horizonBorder: {
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderRightColor: 'black',
    borderLeftColor: 'black',
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  topBorder: {
    borderTopWidth: 1,
    borderTopColor: 'black',
  },
  item: {
    textAlign: 'center',
    padding: 6,
    paddingHorizontal: 15,
  },
});
