import { Image } from 'expo-image';
import moment, { lang } from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { getDiveDeeperHoroscope, update as updateUserInfo } from '@/actions';
import { TextWrapper } from '@/components';
import { useHoroscrope } from '@/hooks';
import { HeaderSection } from '@/sections';
import { useAppStore } from '@/store';

const nextIcon = '../../assets/svg/home/next2.svg';
const dailyLogo = '../../assets/svg/reading/dailyLogo.svg';
const routine = '../../assets/svg/reading/routine.svg';
const self = '../../assets/svg/reading/self.svg';
const social = '../../assets/svg/reading/social.svg';
const spiritual = '../../assets/svg/reading/spiritual.svg';

export default function DailyReadingScreen() {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const windowWidth = Dimensions.get('screen').width;
  const [switchAlerts, setSwitchAlerts] = useState(0);
  const [selectedItem, setSelectedItem] = useState('Self');
  const [selectedDate, setSelectedDate] = useState('today');
  const [horoscopeData, setHoroscropeData] = useState<any>(null);
  const setUserInfo = useAppStore((store) => store.setUserInfo);
  const userInfo = useAppStore((store) => store.userInfo);

  const { data, isLoading, isError } = useHoroscrope(language);

  const getDateValue = useCallback(() => {
    if (selectedDate === 'today') {
      return t('today');
    } else if (selectedDate === 'tomorrow') {
      // return moment().add(1, 'days').format('DD MMM');
      return t('tomorrow');
    } else if (selectedDate === 'weekly') {
      return getWeeklyRange();
    } else {
      return moment().format('MMM');
    }
  }, [selectedDate]);

  const getWeeklyRange = () => {
    const startOfWeek = moment().startOf('isoWeek').format('DD'); // Monday
    const endOfWeek = moment().endOf('isoWeek').format('DD MMM'); // Sunday

    return `${startOfWeek} to ${endOfWeek}`;
  };

  const handleDiveDeeper = () => {
    const dailyDeepCount = (userInfo.dailyDeepCount || 0) + 1;
    updateUserInfo({
      dailyDeepCount,
    });

    getDiveDeeperHoroscope(language).then(({ data }) => {
      setHoroscropeData(data);
    });

    setUserInfo({
      ...userInfo,
      dailyDeepCount,
    });
  };

  useEffect(() => {
    if (!isLoading) {
      setHoroscropeData(data);
    }
  }, [data, isLoading]);
  return (
    <View
      style={{
        width: windowWidth,
        backgroundColor: '#F8F2EA',
        height: '100%',
      }}
    >
      <HeaderSection
        title={<Image source={require(dailyLogo)} style={{ width: 80, height: 80 }} />}
      />
      <View
        style={{
          flex: 1,
          width: windowWidth,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <ScrollView
          style={{
            width: windowWidth,
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              width: '100%',
              //   height: "100%",
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 14,
                justifyContent: 'center',
                paddingTop: 15,
              }}
            >
              <View
                style={{
                  ...styles.switchWraper,
                }}
              >
                <TouchableOpacity
                  style={switchAlerts == 0 ? styles.selected : styles.unselected}
                  onPress={() => {
                    setSwitchAlerts(0);
                  }}
                >
                  <TextWrapper
                    style={{
                      textAlign: 'center',
                      color: switchAlerts == 0 ? 'white' : 'black',
                      fontSize: 15,
                    }}
                  >
                    {t('interpretation')}
                  </TextWrapper>
                </TouchableOpacity>
                <TouchableOpacity
                  style={switchAlerts == 1 ? styles.selected : styles.unselected}
                  onPress={() => {
                    setSwitchAlerts(1);
                  }}
                >
                  <TextWrapper
                    style={{
                      textAlign: 'center',
                      color: switchAlerts == 1 ? 'white' : 'black',
                      fontSize: 15,
                    }}
                  >
                    {t('readings')}
                  </TextWrapper>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ padding: 20, paddingTop: 30, paddingHorizontal: 14 }}>
              <View
                style={{
                  padding: 10,
                  borderRadius: 14,
                  flexDirection: 'column',
                  backgroundColor: '#686662',
                  // borderWidth: 1,
                  // borderColor: "black",
                  ...styles.shadow,
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextWrapper
                    style={{
                      fontSize: 18,
                      color: 'white',
                      padding: 5,
                      paddingVertical: 10,
                    }}
                  >
                    {`${getDateValue()} - ${selectedItem}`}
                  </TextWrapper>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderColor: 'white',
                      borderRadius: 5,
                      height: 36,
                    }}
                    onPress={() => setSelectedDate('today')}
                  >
                    <TextWrapper
                      style={{
                        color: 'white',
                        fontSize: 16,
                        padding: 5,
                      }}
                    >
                      Today
                    </TextWrapper>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View
                    style={{
                      padding: 5,
                      borderRadius: 8,
                      backgroundColor: '#F8F2EA',
                      flexDirection: 'column',
                      width: '32%',
                    }}
                  >
                    <TextWrapper style={{ fontSize: 14 }}>{t('wordOfTheDay')}</TextWrapper>
                    <TextWrapper style={{ fontSize: 14 }}>
                      {horoscopeData?.[selectedDate.toLocaleLowerCase()]?.word_of_the_day}
                    </TextWrapper>
                  </View>
                  <View
                    style={{
                      padding: 5,
                      borderRadius: 8,
                      backgroundColor: '#F8F2EA',
                      flexDirection: 'column',
                      width: '32%',
                    }}
                  >
                    <TextWrapper style={{ fontSize: 14 }}>{t('luckyNumberOTD')}</TextWrapper>
                    <TextWrapper style={{ fontSize: 14 }}>
                      {horoscopeData?.[selectedDate.toLocaleLowerCase()]?.lucky_number_otd}
                    </TextWrapper>
                  </View>
                  <View
                    style={{
                      padding: 5,
                      borderRadius: 8,
                      backgroundColor: '#F8F2EA',
                      flexDirection: 'column',
                      width: '32%',
                    }}
                  >
                    <TextWrapper style={{ fontSize: 14 }}>{t('actionOfTheDay')}</TextWrapper>
                    <TextWrapper style={{ fontSize: 14 }}>
                      {horoscopeData?.[selectedDate.toLocaleLowerCase()]?.action_of_the_day}
                    </TextWrapper>
                  </View>
                </View>
                <View
                  style={{
                    padding: 5,
                    paddingVertical: 8,
                  }}
                >
                  <ScrollView
                    nestedScrollEnabled={true}
                    style={{
                      maxHeight: 200,
                    }}
                    contentContainerStyle={{ flexGrow: 1 }}
                  >
                    {switchAlerts === 1 ? (
                      <TextWrapper
                        style={{
                          fontSize: 14,
                          color: 'white',
                        }}
                      >
                        {
                          horoscopeData?.[selectedDate.toLocaleLowerCase()]?.[
                            selectedItem.toLocaleLowerCase()
                          ]
                        }
                      </TextWrapper>
                    ) : (
                      <>
                        <View>
                          <Image
                            source={require(spiritual)}
                            style={{ width: 20, height: 20, marginLeft: 7 }}
                          />
                          <TextWrapper
                            style={{
                              color: 'white',
                              fontSize: 18,
                              paddingHorizontal: 5,
                            }}
                          >
                            Spiritual
                          </TextWrapper>
                          <TextWrapper
                            style={{
                              color: 'white',
                              fontSize: 15,
                              paddingHorizontal: 5,
                            }}
                          >
                            {horoscopeData?.[selectedDate.toLocaleLowerCase()]?.spiritual}
                          </TextWrapper>
                        </View>
                        <View style={{ marginTop: 25 }}>
                          <Image
                            source={require(social)}
                            style={{ width: 20, height: 20, marginLeft: 7 }}
                          />
                          <TextWrapper
                            style={{
                              color: 'white',
                              fontSize: 18,
                              paddingHorizontal: 5,
                            }}
                          >
                            Social
                          </TextWrapper>
                          <TextWrapper
                            style={{
                              color: 'white',
                              fontSize: 15,
                              paddingHorizontal: 5,
                            }}
                          >
                            {horoscopeData?.[selectedDate.toLocaleLowerCase()]?.social}
                          </TextWrapper>
                        </View>
                        <View style={{ marginTop: 25 }}>
                          <Image
                            source={require(routine)}
                            style={{ width: 20, height: 20, marginLeft: 7 }}
                          />
                          <TextWrapper
                            style={{
                              color: 'white',
                              fontSize: 18,
                              paddingHorizontal: 5,
                            }}
                          >
                            Routine
                          </TextWrapper>
                          <TextWrapper
                            style={{
                              color: 'white',
                              fontSize: 15,
                              paddingHorizontal: 5,
                            }}
                          >
                            {horoscopeData?.[selectedDate.toLocaleLowerCase()]?.routine}
                          </TextWrapper>
                        </View>
                        <View style={{ marginTop: 25 }}>
                          <Image
                            source={require(self)}
                            style={{ width: 20, height: 20, marginLeft: 7 }}
                          />
                          <TextWrapper
                            style={{
                              color: 'white',
                              fontSize: 18,
                              paddingHorizontal: 5,
                            }}
                          >
                            Self
                          </TextWrapper>
                          <TextWrapper
                            style={{
                              color: 'white',
                              fontSize: 15,
                              paddingHorizontal: 5,
                            }}
                          >
                            {horoscopeData?.[selectedDate.toLocaleLowerCase()]?.self}
                          </TextWrapper>
                        </View>
                      </>
                    )}
                  </ScrollView>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    disabled={userInfo.dailyDeepCount === 3}
                    onPress={() => handleDiveDeeper()}
                  >
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 14,
                        borderColor: 'white',
                        borderWidth: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <TextWrapper style={{ color: 'white' }}>
                        {3 - (userInfo.dailyDeepCount || 0)}
                      </TextWrapper>
                    </View>
                    <TextWrapper
                      style={{
                        color: 'white',
                        fontSize: 15,
                        paddingHorizontal: 5,
                      }}
                    >
                      {t('diveDeeper')}
                    </TextWrapper>
                    <Image source={require(nextIcon)} style={{ width: 18, height: 9 }} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 14,
              }}
            >
              <View
                style={{
                  ...styles.boxWrapper,
                  backgroundColor: selectedDate === 'tomorrow' ? '#686662' : 'transparent',
                }}
              >
                <TouchableOpacity
                  style={styles.boxBody}
                  onPress={() => setSelectedDate('tomorrow')}
                >
                  <TextWrapper style={{ color: 'white', fontSize: 17 }}>
                    {t('tomorrow')}
                  </TextWrapper>
                  <TextWrapper style={{ color: 'white', fontSize: 17 }}>
                    {moment().add(1, 'days').format('DD MMM')}
                  </TextWrapper>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  ...styles.boxWrapper,
                  backgroundColor: selectedDate === 'weekly' ? '#686662' : 'transparent',
                }}
              >
                <TouchableOpacity style={styles.boxBody} onPress={() => setSelectedDate('weekly')}>
                  <TextWrapper style={{ color: 'white', fontSize: 17 }}>{t('weekly')}</TextWrapper>
                  <TextWrapper style={{ color: 'white', fontSize: 17 }}>
                    {getWeeklyRange()}
                  </TextWrapper>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  ...styles.boxWrapper,
                  backgroundColor: selectedDate === 'monthly' ? '#686662' : 'transparent',
                }}
              >
                <TouchableOpacity style={styles.boxBody} onPress={() => setSelectedDate('monthly')}>
                  <TextWrapper style={{ color: 'white', fontSize: 17 }}>{t('monthly')}</TextWrapper>
                  <TextWrapper style={{ color: 'white', fontSize: 17 }}>
                    {moment().format('MMM')}
                  </TextWrapper>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 20,
                justifyContent: 'space-between',
                paddingHorizontal: 15,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  // width: 90,
                  // height: 90,
                  borderRadius: 15,
                  backgroundColor: '#E2DCD5',
                  padding: 5,
                  borderWidth: 1,
                  borderColor: selectedItem === 'Spiritual' ? '#181818' : 'transparent',
                }}
                onPress={() => setSelectedItem('Spiritual')}
              >
                <View style={{ width: 52, height: 52 }}>
                  <Image source={require(spiritual)} style={{ width: 61, height: 61 }} />
                </View>
                <TextWrapper style={{ fontSize: 15, color: 'black' }}>{t('spiritual')}</TextWrapper>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  // width: 90,
                  // height: 90,
                  borderRadius: 15,
                  backgroundColor: '#E2DCD5',
                  padding: 5,
                  borderWidth: 1,
                  borderColor: selectedItem === 'Routine' ? '#181818' : 'transparent',
                }}
                onPress={() => setSelectedItem('Routine')}
              >
                <View style={{ width: 52, height: 52 }}>
                  <Image source={require(routine)} style={{ width: 61, height: 61 }} />
                </View>
                <TextWrapper style={{ fontSize: 15, color: 'black' }}>{t('routine')}</TextWrapper>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  // width: 90,
                  // height: 90,
                  borderRadius: 15,
                  backgroundColor: '#E2DCD5',
                  padding: 5,
                  borderWidth: 1,
                  borderColor: selectedItem === 'Social' ? '#181818' : 'transparent',
                }}
                onPress={() => setSelectedItem('Social')}
              >
                <View style={{ width: 52, height: 52 }}>
                  <Image source={require(social)} style={{ width: 61, height: 61 }} />
                </View>
                <TextWrapper style={{ fontSize: 15, color: 'black' }}>{t('social')}</TextWrapper>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 8,
                  // width: 90,
                  // height: 90,
                  paddingHorizontal: 14,
                  borderRadius: 15,
                  backgroundColor: '#E2DCD5',
                  padding: 5,
                  borderWidth: 1,
                  borderColor: selectedItem === 'Self' ? '#181818' : 'transparent',
                }}
                onPress={() => setSelectedItem('Self')}
              >
                <View style={{ width: 52, height: 52 }}>
                  <Image source={require(self)} style={{ width: 61, height: 61 }} />
                </View>
                <TextWrapper style={{ fontSize: 15, color: 'black' }}>{t('self')}</TextWrapper>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '5px 5px 1px 0px rgba(0, 0, 0, 0.6)',
    elevation: 8,
  },
  boxWrapper: {
    padding: 3,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: 'black',
    flexDirection: 'row',
    width: '32%',
  },
  boxBody: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#686662',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
  },
  switchWraper: {
    borderRadius: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'black',
    boxShadow: '5px 4px 1px 0px rgba(0, 0, 0, 0.25)',
  },
  selected: {
    borderRadius: 24,
    backgroundColor: '#686662',
    color: 'white',
    padding: 0,
    width: '50%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unselected: {
    padding: 0,
    width: '50%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
