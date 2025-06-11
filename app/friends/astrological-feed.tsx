import { Image } from 'expo-image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { setActivityFeed } from '@/actions';
import { HeaderBar, TextWrapper } from '@/components';
import { useAppStore } from '@/store';

const astrologicalLogo = '../../assets/svg/friends/astrologicalLogo.svg';
const defaultmark1 = '../../assets/svg/friends/mark1.svg';
const starIcon = '../../assets/svg/friends/star.svg';

export default function AstroloicalFeedScreen() {
  const { t } = useTranslation();

  const userInfo = useAppStore((state) => state.userInfo);
  const setUserInfo = useAppStore((state) => state.setUserInfo);
  const [switchAlerts, setSwitchAlerts] = useState(userInfo.activityType || 0);

  const handleActivity = async () => {
    try {
      const response = await setActivityFeed({
        activityType: switchAlerts,
        enabled: userInfo.activityType === switchAlerts ? !userInfo.activityEnabled : true,
      });
      if (response.status === 200 || response.status === 201) {
        setUserInfo({
          ...userInfo,
          activityEnabled:
            userInfo.activityType === switchAlerts ? !userInfo.activityEnabled : true,
          activityType: switchAlerts,
        });
      } else {
        console.log(response.data);
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
            <Image source={require(astrologicalLogo)} style={{ marginLeft: 5 }} />
          </View>
        }
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingHorizontal: 8,
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
              {t('public')}
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
              {t('friendsOnly')}
            </TextWrapper>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        overScrollMode="never"
        style={{
          flex: 1,
          backgroundColor: '#F2E7D9',
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            paddingHorizontal: 16,
            paddingVertical: 14,
            height: '100%',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: 5,
              backgroundColor: '#181818',
              borderRadius: 8,
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              width: '100%',
              height: '100%',
            }}
          >
            <View
              style={{
                marginVertical: 15,
                borderRadius: 12,
                backgroundColor: '#464646',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  paddingVertical: 15,
                  paddingHorizontal: 14,
                }}
              >
                <View
                  style={{
                    width: 110,
                    height: 110,
                  }}
                >
                  <Image source={require(defaultmark1)} style={{ width: 111, height: 111 }} />
                </View>
              </View>
              <View style={{ width: '60%' }}>
                <View
                  style={{
                    flexDirection: 'column',
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                  }}
                >
                  <TextWrapper
                    style={{
                      fontSize: 20,
                      textAlign: 'center',
                      color: '#F8F2EA',
                      padding: 10,
                    }}
                  >
                    {switchAlerts == 0
                      ? t('optInToSeePublicActivityFeed')
                      : t('addFriendsToSeeTheirActivity')}
                  </TextWrapper>
                  <TouchableOpacity
                    onPress={handleActivity}
                    style={{
                      padding: 10,
                      backgroundColor: '#686662',
                      borderRadius: 24,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      elevation: 10,
                    }}
                  >
                    <Image source={require(starIcon)} style={{ width: 26, height: 26 }} />
                    <TextWrapper style={{ color: 'white', fontSize: 18 }}>
                      {switchAlerts === userInfo.activityType && userInfo.activityEnabled
                        ? t('optOut')
                        : t('optIn')}
                    </TextWrapper>
                    <Image source={require(starIcon)} style={{ width: 26, height: 26 }} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  switchWraper: {
    borderRadius: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 10,
    boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  },
  selected: {
    borderRadius: 24,
    backgroundColor: '#181818',
    color: 'white',
    padding: 0,
    width: '50%',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unselected: {
    padding: 0,
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  conversationWraper: {
    padding: 8,
    marginVertical: 8,
    borderRadius: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#181818',
    marginTop: 18,
  },
  conversationTitle: {
    fontSize: 15,
    fontWeight: 400,
    letterSpacing: -0.17,
    color: 'white',
  },
  conversationContant: {
    fontSize: 12,
    fontWeight: 300,
    letterSpacing: -0.17,
    lineHeight: 22,
    color: 'white',
  },
  customBtn: {
    width: '90%',
    padding: 12,
    backgroundColor: '#181818',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  item: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
    alignItems: 'center',
    backgroundColor: '#F8F2EA',
    borderRadius: 12,
  },
});
