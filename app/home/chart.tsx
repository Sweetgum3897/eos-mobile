import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Image } from 'expo-image';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DetailsComponent, HeaderBar, TextWrapper } from '@/components';
import { useChartData } from '@/hooks';
import { useAppStore } from '@/store';

const femaleAvatar = '../../assets/svg/chart/female.svg';
const hardMark = '../../assets/svg/chart/hardmark.svg';
const maleAvatar = '../../assets/svg/chart/male.svg';
const pointchartMark = '../../assets/svg/chart/pointchartMark.svg';
const tableChartMark = '../../assets/svg/chart/tablechartMark.svg';

const LogoComponent = ({ image }: { image: string }) => {
  const heightAnimation = useRef(new Animated.Value(250)).current;
  const opacityAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(heightAnimation, {
      toValue: 250,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        height: heightAnimation,
      }}
    >
      <Animated.View
        style={{
          opacity: opacityAnimation,
        }}
      >
        <View
          style={{
            width: 235,
            height: 235,
          }}
        >
          {image && <Image source={{ uri: image }} style={{ width: 249, height: 249 }} />}
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const PlacePerson = ({ visible }: { visible: boolean }) => {
  const { t } = useTranslation();
  const userInfo = useAppStore((store) => store.userInfo);

  const opacityAnimation = useRef(new Animated.Value(1)).current;
  const [show, setShow] = useState(true);

  const [targetBirthday, setTargetBirthday] = useState(new Date());
  const [targetBirthtime, setTargetBirthTime] = useState(new Date());

  const [isShowDatepicker, setShowDatepicker] = useState(false);
  const [isShowTimepicker, setShowTimepicker] = useState(false);

  const onChangeTargetBirthday = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatepicker(false);
    if (!selectedDate) {
      return;
    }

    setTargetBirthday(selectedDate);
  };

  const onChangeTargetBirthTime = (event: DateTimePickerEvent, selectTime?: Date) => {
    setShowTimepicker(false);
    if (!selectTime) {
      return;
    }
    setTargetBirthTime(selectTime);
  };

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
          flexDirection: 'row',
          justifyContent: 'space-between',
          opacity: opacityAnimation,
          paddingTop: 10,
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <View style={{ width: 104, height: 104 }}>
            {userInfo.gender ? (
              <Image source={require(maleAvatar)} style={{ width: 112, height: 112 }} />
            ) : (
              <Image source={require(femaleAvatar)} style={{ width: 112, height: 112 }} />
            )}
          </View>
          <View>
            <TextWrapper>{t('you')}</TextWrapper>
          </View>
          <View>
            <TextWrapper>{t('birthday')}</TextWrapper>
          </View>
          <View>
            <TouchableOpacity
              style={{
                padding: 5,
                borderRadius: 14,
                paddingHorizontal: 10,
                borderColor: 'black',
                borderWidth: 1,
                backgroundColor: '#181818',
              }}
            >
              <TextWrapper style={{ color: 'white' }}>
                {moment(userInfo.birth).format('M/D/YYYY')}
              </TextWrapper>
            </TouchableOpacity>
          </View>
          <View>
            <TextWrapper>{t('time')}</TextWrapper>
          </View>
          <View>
            <TouchableOpacity
              style={{
                padding: 5,
                borderRadius: 14,
                paddingHorizontal: 10,
                borderColor: 'black',
                borderWidth: 1,
                backgroundColor: '#181818',
              }}
            >
              <TextWrapper style={{ color: 'white' }}>
                {moment(userInfo.birth).format('hh:mm A')}
              </TextWrapper>
            </TouchableOpacity>
          </View>
          <View>
            <TextWrapper>{t('birthplace')}</TextWrapper>
          </View>
          <View>
            <TouchableOpacity
              style={{
                padding: 5,
                borderRadius: 14,
                paddingHorizontal: 10,
                borderColor: 'black',
                borderWidth: 1,
                backgroundColor: '#181818',
              }}
            >
              <TextWrapper style={{ color: 'white' }}>{userInfo.location || t('None')}</TextWrapper>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            paddingVertical: 50,
          }}
        >
          <View>
            <Image source={require(hardMark)} style={{ width: 48, height: 48 }} />
          </View>
          <View>
            <TextWrapper
              style={{
                color: 'black',
                fontSize: 17,
                textAlign: 'center',
              }}
            >
              {t('edit')}
            </TextWrapper>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <View style={{ width: 104, height: 104 }}>
            {userInfo.gender ? (
              <Image source={require(femaleAvatar)} style={{ width: 112, height: 112 }} />
            ) : (
              <Image source={require(maleAvatar)} style={{ width: 112, height: 112 }} />
            )}
          </View>
          <View>
            <TextWrapper>{t('personB')}</TextWrapper>
          </View>
          <View>
            <TextWrapper>{t('birthday')}</TextWrapper>
          </View>
          <View>
            {isShowDatepicker && (
              <DateTimePicker
                mode="date"
                value={targetBirthday}
                onChange={onChangeTargetBirthday}
              />
            )}
            <TouchableOpacity
              style={{
                padding: 5,
                borderRadius: 14,
                paddingHorizontal: 10,
                borderColor: 'black',
                borderWidth: 1,
                backgroundColor: '#181818',
              }}
              onPress={() => setShowDatepicker(true)}
            >
              <TextWrapper style={{ color: 'white' }}>
                {moment(targetBirthday).format('M/D/YYYY')}
              </TextWrapper>
            </TouchableOpacity>
          </View>
          <View>
            <TextWrapper>{t('time')}</TextWrapper>
          </View>
          <View>
            {isShowTimepicker && (
              <DateTimePicker
                mode="time"
                value={targetBirthtime}
                onChange={onChangeTargetBirthTime}
              />
            )}
            <TouchableOpacity
              style={{
                padding: 5,
                borderRadius: 14,
                paddingHorizontal: 10,
                borderColor: 'black',
                borderWidth: 1,
                backgroundColor: '#181818',
              }}
              onPress={() => setShowTimepicker(true)}
            >
              <TextWrapper style={{ color: 'white' }}>
                {moment(targetBirthtime).format('hh:mm A')}
              </TextWrapper>
            </TouchableOpacity>
          </View>
          <View>
            <TextWrapper>{t('birthplace')}</TextWrapper>
          </View>
          <View>
            <TouchableOpacity
              style={{
                padding: 5,
                borderRadius: 14,
                paddingHorizontal: 10,
                borderColor: 'black',
                borderWidth: 1,
                backgroundColor: '#181818',
              }}
            >
              <TextWrapper style={{ color: 'white' }}>Houston, Texas</TextWrapper>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  } else {
    return <></>;
  }
};

export default function ChartScreen() {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { chartName }: { chartName: string } = useGlobalSearchParams();
  const { data, isLoading, isError } = useChartData(chartName, language);
  const chartData = useAppStore((store) => store.chartData);
  const setChartData = useAppStore((store) => store.setChartData);

  const [detailView, setDetailView] = useState(false);

  const router = useRouter();

  const tabletab = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 30,
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          onPress={() => router.push(`/home/table-chart?chartName=${chartName}`)}
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              padding: 16,
              backgroundColor: '#F2E7D9',
              borderRadius: 12,
            }}
          >
            <View
              style={{
                width: 90,
                height: 90,
              }}
            >
              <Image
                source={require(tableChartMark)}
                style={{ ...styles.shadow, width: 98, height: 98 }}
              />
            </View>
          </View>
          <TextWrapper style={{ fontSize: 17, textAlign: 'center' }}>{t('tableChart')}</TextWrapper>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push(`/home/point-chart?chartName=${chartName}`);
          }}
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              padding: 16,
              backgroundColor: '#F2E7D9',
              borderRadius: 12,
            }}
          >
            <View
              style={{
                width: 90,
                height: 90,
              }}
            >
              <Image source={require(pointchartMark)} style={{ width: 105, height: 105 }} />
            </View>
          </View>
          <TextWrapper style={{ fontSize: 17, textAlign: 'center' }}>{t('pointChart')}</TextWrapper>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    if (data && !isLoading) {
      setChartData(data);
    }
  }, [data, isLoading]);
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#F8F2EA',
      }}
    >
      <HeaderBar
        title={
          <TextWrapper
            style={{ fontSize: 20 }}
          >{`${chartName[0].toUpperCase()}${chartName.substring(1)} chart`}</TextWrapper>
        }
      />
      <ScrollView style={{ flex: 1 }}>
        {(chartName == 'synastry' || chartName == 'solarreturn' || chartName == 'luarreturn') &&
          tabletab()}
        <LogoComponent image={chartData?.image} />
        {!(chartName == 'synastry' || chartName == 'solarreturn' || chartName == 'luarreturn') &&
          tabletab()}
        <PlacePerson
          visible={
            chartName == 'synastry' || chartName == 'solarreturn' || chartName == 'luarreturn'
          }
        />
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
              ...styles.shadow,
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
              ...styles.shadow,
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
            marginTop: 20,
            // backgroundColor: "transparent"
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
              ...styles.shadow,
            }}
          >
            <TextWrapper style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>
              {t('exploreYourStartMap')}
            </TextWrapper>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '5px 5px 1px 0px rgba(0, 0, 0, 0.6)',
    elevation: 8,
  },
  item: {
    textAlign: 'center',
    padding: 6,
    paddingHorizontal: 15,
  },
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
  userWraper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  userItemText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 5,
  },
  rootTabbar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff18',
    borderBottomWidth: 0.5,
    borderColor: '#FFFFFF',
    boxShadow: '12px 12px 0px 0px rgba(0, 0, 0, 0.15)',
    marginTop: 30,
  },
  rootTabBtn: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 500,
    padding: 10,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderColor: '#555555',
    color: '#555555',
  },
});
