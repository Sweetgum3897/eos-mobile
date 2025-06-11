import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { getFriendsByBirthday } from '@/actions';
import { HeaderBar, TextWrapper } from '@/components';
import { TUserInfo } from '@/types';

const zodiacBirthdayAlerts = '../../assets/svg/friends/ZodiacBirthdayLog.svg';
const birthDayAlertLogo = '../../assets/svg/friends/birthdayAlertsLogo.svg';
const cakeIcon = '../../assets/svg/friends/cake.svg';

export default function ZodiacBirthdayScreen() {
  const { t } = useTranslation();

  const router = useRouter();
  const [friends, setFriends] = useState<TUserInfo[]>([]);

  const getFriends = async () => {
    try {
      const response = await getFriendsByBirthday();
      if (response.status === 200 || response.status === 201) {
        setFriends(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <View
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
                width: 64,
                height: 64,
              }}
            >
              <Image source={require(zodiacBirthdayAlerts)} style={{ width: 73, height: 73 }} />
            </View>
          </View>
        }
      />
      <ScrollView
        style={{
          width: '100%',
          flex: 1,
          backgroundColor: '#F2E7D9',
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            paddingHorizontal: 16,
            paddingVertical: 14,
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
                width: '100%',
                paddingVertical: 10,
              }}
            >
              {friends.map((friend, key) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: 'black',
                      borderRadius: 6,
                      padding: 6,
                      width: '100%',
                      marginTop: 7,
                    }}
                    key={key}
                  >
                    <View style={{ width: '55%' }}>
                      <TextWrapper style={{ fontSize: 15 }}>{friend.username}</TextWrapper>
                      <TextWrapper
                        style={{ fontSize: 15 }}
                      >{`${t('_birthday')}:${friend.birth}`}</TextWrapper>
                    </View>
                    <View style={{ width: '23%' }}>
                      <TextWrapper style={{ fontSize: 15 }}>{friend.rising}</TextWrapper>
                      <TextWrapper style={{ fontSize: 15 }}>{friend.sunsign}</TextWrapper>
                    </View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'black',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 10,
                        borderRadius: 6,
                      }}
                      onPress={() => {
                        router.push(
                          `/friends/birthday-alerts-celebrate?key=ZODIACB_ALERTS_CELEBRATE&friendId=${friend.id!.toString()}&username=${friend.username || ''}`,
                        );
                      }}
                    >
                      <TextWrapper style={{ color: 'white' }}>{t('celebrate')}</TextWrapper>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        {/* </>
          )} */}
      </ScrollView>
      <View
        style={{
          width: '100%',
          paddingBottom: 5,
          backgroundColor: '#F2E7D9',
          paddingHorizontal: 8,
        }}
      >
        <View
          style={{
            position: 'relative',
            backgroundColor: '#181818',
            boxShadow: ' 5px 4px 4px 0px rgba(0, 0, 0, 0.25)',
            borderRadius: 24,
            padding: 12,
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: '#ffffff57',
            borderWidth: 0.5,
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <TextInput
            placeholder={t('search')}
            placeholderTextColor={'white'}
            style={{
              textAlign: 'center',
              fontSize: 18,
              color: 'white',
              fontFamily: 'PatrickHand',
            }}
          />
        </View>
      </View>
    </View>
  );
}

export const BirthDayAlerts = ({}) => {
  const { t } = useTranslation();

  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <TextWrapper style={{ fontSize: 16, color: 'black', marginTop: 15 }}>
        {t('zodiacBirthdayAlerts')}
      </TextWrapper>
      <View style={{ width: 250, height: 250, marginTop: 20 }}>
        <Image source={require(birthDayAlertLogo)} style={{ width: 260, height: 260 }} />
      </View>

      <TextWrapper
        style={{
          fontSize: 14,
          color: 'black',
          marginTop: 10,
          letterSpacing: 3,
        }}
      >
        {t('celebrateTogether')}
      </TextWrapper>

      <View style={{ flexDirection: 'column', marginTop: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          <TextWrapper
            style={{
              fontSize: 32,
              color: 'black',
              textTransform: 'uppercase',
            }}
          >
            {t('zodiacBirthday')}
          </TextWrapper>
          <View style={{ width: 40, height: 40 }}>
            <Image source={require(cakeIcon)} style={{ width: 45, height: 45 }} />
          </View>
        </View>
        <TextWrapper
          style={{
            fontSize: 32,
            color: 'black',
            textTransform: 'uppercase',
          }}
        >
          {t('alertCelebrations')}
        </TextWrapper>
      </View>
      <TouchableOpacity style={styles.customBtn}>
        <TextWrapper style={{ fontSize: 16, color: '#F8F2EA' }}>{t('joinTheFun')}</TextWrapper>
      </TouchableOpacity>
    </View>
  );
};
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
