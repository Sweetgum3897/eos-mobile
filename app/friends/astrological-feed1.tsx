import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import { HeaderBar, TextWrapper } from '@/components';
import { useAppStore } from '@/store';
import { TUserInfo } from '@/types';

const addFriendIcon = '../../assets/svg/friends/addfriendIcon.svg';
const astrologicalLogo = '../../assets/svg/friends/astrologicalLogo.svg';
const contactIcon = '../../assets/svg/friends/contactIcon.svg';
const friendAvatar = '../../assets/svg/friends/friendAvatar.svg';
const hardIcon = '../../assets/svg/friends/hardIcon.svg';
const defaultmark1 = '../../assets/svg/friends/mark1.svg';
const nextIcon1 = '../../assets/svg/friends/nextIcon1.svg';
const searchIcon = '../../assets/svg/friends/searchIcon.svg';
const starIcon = '../../assets/svg/friends/star.svg';

export default function AstroloicalFeedScreen() {
  const { t } = useTranslation();

  const { typeAddFriend, setTypeAddFriend } = useAppStore();

  const windowWidth = Dimensions.get('screen').width;
  const windowHeight = Dimensions.get('screen').height;

  const heightAnim = useRef(new Animated.Value(-windowHeight)).current;
  const router = useRouter();

  const [friends, setFriends] = useState<TUserInfo[]>([]);
  const [switchAlerts, setSwitchAlerts] = useState(0);

  const [selected, setSelectUser] = useState<TUserInfo | undefined>(undefined);

  const openDetail = (friend: TUserInfo) => {
    setSelectUser(friend);
  };

  const closeDetail = () => {
    Animated.timing(heightAnim, {
      toValue: -windowHeight,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setSelectUser(undefined);
    });
  };

  useEffect(() => {
    if (selected) {
      Animated.timing(heightAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [selected]);

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
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View>
              <View
                style={{
                  width: 60,
                  height: 60,
                }}
              >
                <Image source={require(addFriendIcon)} style={{ width: 60, height: 60 }} />
              </View>
              <TextWrapper style={{ fontSize: 24 }}>{t('addFriend')}</TextWrapper>
            </View>
          </View>
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
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                setTypeAddFriend('from-contact');
                router.push('/friends/search');
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Image source={require(contactIcon)} style={{ width: 18, height: 22 }} />
                <TextWrapper style={{ paddingHorizontal: 5, fontSize: 16 }}>
                  {t('addFromContact')}
                </TextWrapper>
              </View>
              <View>
                <Image source={require(nextIcon1)} style={{ width: 23, height: 23 }} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                setTypeAddFriend('manually');
                router.push('/friends/search');
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Image source={require(searchIcon)} style={{ width: 17, height: 20 }} />
                <TextWrapper style={{ paddingHorizontal: 5, fontSize: 16 }}>
                  {t('searchForFriend')}
                </TextWrapper>
              </View>
              <View>
                <Image source={require(nextIcon1)} style={{ width: 23, height: 23 }} />
              </View>
            </TouchableOpacity>

            {friends.length == 0 ? (
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
                      onPress={() => router.push('/friends/birthday-alerts-optin')}
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
                        {t('optIn')}
                      </TextWrapper>
                      <Image source={require(starIcon)} style={{ width: 26, height: 26 }} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 0,
                  width: '100%',
                  paddingVertical: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: 'column',
                    padding: 6,
                    backgroundColor: '#F8F2EA',
                    borderRadius: 20,
                  }}
                >
                  {friends.map((friend, key) => {
                    return (
                      <TouchableOpacity style={{ padding: 5 }} key={key}>
                        <Image source={require(friendAvatar)} style={{ width: 41, height: 41 }} />
                        <TextWrapper>{friend.username}</TextWrapper>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '80%',
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
                          >{`${t('_birthday')}: ${friend.birth}`}</TextWrapper>
                        </View>
                        <View style={{ width: '23%' }}>
                          <TextWrapper style={{ fontSize: 15 }}>{friend.rising}</TextWrapper>
                          <TextWrapper style={{ fontSize: 15 }}>{friend.sunsign}</TextWrapper>
                        </View>
                        <TouchableOpacity
                          style={{
                            borderColor: 'black',
                            borderWidth: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // padding: 1,
                            borderRadius: 6,
                            padding: 10,
                          }}
                          onPress={() => {
                            openDetail(friend);
                          }}
                        >
                          <TextWrapper style={{ color: 'black' }}>{t('uncover')}</TextWrapper>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* <View
                  style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      paddingHorizontal: 16,
                      marginBottom: 110,
                  }}
              >
                  <TouchableOpacity
                      style={{
                          borderRadius: 24,
                          padding: 8,
                          alignItems: "center",
                          borderColor: "#000000",
                          borderWidth: .5,
                          border: "2px solid black",
                          backgroundColor: "#181818",
                          width: "90%",
                          boxShadow: ' 5px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                          position: "relative"
                      }}
                  >
                      <Image source={require(searchIcon1)} style={{ position: "absolute", left: 10, top: 10 }} />
                      <TextWrapper
                          style={{
                              color: "white",
                              fontSize: 23,
                          }}>
                          Search
                      </TextWrapper>
                  </TouchableOpacity>
              </View> */}

      <View
        style={{
          width: '100%',
          paddingBottom: 8,
          paddingHorizontal: 20,
          backgroundColor: '#F2E7D9',
        }}
      >
        <View
          style={{
            position: 'relative',
            backgroundColor: '#181818',
            boxShadow: ' 5px 4px 4px 0px rgba(0, 0, 0, 0.25)',
            borderRadius: 24,
            padding: 8,
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: '#ffffff57',
            borderWidth: 0.5,
            justifyContent: 'center',
          }}
        >
          <TextInput
            placeholder={t('search')}
            placeholderTextColor={'white'}
            // ref={inputRef}
            style={{
              textAlign: 'center',
              fontSize: 23,
              color: 'white',
              fontFamily: 'PatrickHand',
            }}
          />
        </View>
      </View>
      {selected && (
        <TouchableHighlight
          onPress={closeDetail}
          style={{
            top: 0,
            left: 0,
            width: windowWidth,
            height: windowHeight,
            position: 'absolute',
          }}
          underlayColor="transparent"
        >
          <View>
            <Text>{''}</Text>
          </View>
        </TouchableHighlight>
      )}
      {selected && (
        <Animated.View
          style={{
            flexDirection: 'column',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            position: 'absolute',
            bottom: heightAnim,
            backgroundColor: '#4F4D4A',
            padding: 20,
            paddingBottom: 130,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              padding: 2,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TextWrapper
              style={{
                color: 'white',
                fontSize: 24,
              }}
            >
              {selected.username}
            </TextWrapper>
            <View>
              <Image source={require(friendAvatar)} style={{ width: 41, height: 41 }} />
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image source={require(hardIcon)} style={{ width: 31, height: 31 }} />
              <TextWrapper
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  color: 'white',
                  fontSize: 16,
                }}
              >
                {t('reading')}
              </TextWrapper>
            </View>
          </View>
          <View style={{ padding: 2 }}>
            <TextWrapper
              style={{
                padding: 5,
                color: '#F8F2EA',
                textAlign: 'center',
                marginTop: 5,
              }}
            >
              {t('astrologicalDescriptionFeed1')}
            </TextWrapper>
            <TextWrapper
              style={{
                padding: 5,
                color: '#F8F2EA',
                textAlign: 'center',
                marginTop: 5,
              }}
            >
              {t('astrologicalDescriptionFeed2')}
            </TextWrapper>
            <TextWrapper
              style={{
                padding: 5,
                color: '#F8F2EA',
                textAlign: 'center',
                marginTop: 5,
              }}
            >
              {t('astrologicalDescriptionFeed3')}
            </TextWrapper>
          </View>
        </Animated.View>
      )}
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
