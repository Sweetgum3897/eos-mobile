import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

import { DetailsComponent, HeaderBar, TextWrapper } from '@/components';
import { useAppStore } from '@/store';

const tableChartMark = '../../assets/svg/chart/tablechartMark.svg';

export default function PointChartScreen() {
  const { t } = useTranslation();

  const windowWidth = Dimensions.get('screen').width;
  const windowHeight = Dimensions.get('screen').height;
  const [detailView, setDetailView] = useState(false);
  const chartData = useAppStore((store) => store.chartData);

  const opacityAnimation = useRef(new Animated.Value(1)).current;

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
            //   height: windowHeight,
          }}
        >
          <HeaderBar
            title={
              <View style={{ height: 100, alignItems: 'center' }}>
                {/* <View style={{ width: 65, height: 65, marginVertical: 5 }}>
              </View>
              <TextWrapper style={{ fontSize: 16, textAlign: "center" }}>
                Table Chart
              </TextWrapper> */}
              </View>
            }
          />

          <View
            style={{
              paddingHorizontal: 8,
              paddingTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 20,
                backgroundColor: '#F2E7D9',
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-around',
                  paddingHorizontal: 50,
                }}
              >
                <View style={{ width: 80, height: 80, marginVertical: 16 }}>
                  <Image source={require(tableChartMark)} style={{ width: 90, height: 90 }} />
                </View>
                <View style={{ width: 80, height: 80, marginVertical: 16 }}>
                  {chartData.image && (
                    <Image source={chartData.image} style={{ width: 90, height: 90 }} />
                  )}
                </View>
              </View>
              <Animated.View
                style={{
                  flexDirection: 'column',
                  opacity: opacityAnimation,
                  borderColor: 'black',
                  width: '100%',
                  backgroundColor: '#686662',
                  alignItems: 'center',
                  paddingVertical: 10,
                }}
              >
                <View
                  style={{
                    width: 235,
                    height: 235,
                  }}
                >
                  <Image source={chartData.image} style={{ width: 249, height: 249 }} />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 16,
                    paddingHorizontal: 12,
                    justifyContent: 'space-around',
                    width: '100%',
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
                      backgroundColor: '#0A0A0A',
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
              </Animated.View>
            </View>
          </View>

          <DetailsComponent visible={detailView} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
              marginBottom: 30,
              paddingHorizontal: 16,
              marginTop: 20,
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
