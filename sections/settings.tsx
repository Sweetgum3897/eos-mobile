// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Image } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

import { setBaseSettings } from '@/actions';
import { TextWrapper } from '@/components';
import { SETTINGS } from '@/constants';
import { changeLanguage } from '@/i18n';

import { useAppStore } from '../store';
import { AboutUs } from './aboutus';
import CheckLogout from './check-logout';
import { ContactUs } from './contact-us';
import { Faq } from './faq';
import { Feedback } from './feedback';
import { PrivacyPolicy } from './privacy-policy';
import { TermsOfUse } from './terms-of-use';

const backIcon = '../assets/svg/back1.svg';
const back1Icon = '../assets/svg/back.svg';
const DownIcon = '../assets/svg/home/downIcon.svg';
const facebookIcon = '../assets/svg/home/facebook.svg';
const indeadIcon = '../assets/svg/home/indead.svg';
const logoutCursor = '../assets/svg/home/logoutCursor.svg';
const quotIcon = '../assets/svg/home/quot.svg';
const starIcon = '../assets/svg/home/star.svg';
const xbookIcon = '../assets/svg/home/xbook.svg';

// GoogleSignin.configure();

export const Settings = ({ close }: { close: () => void }) => {
  const { t } = useTranslation();

  const windowWidth = Dimensions.get('screen').width;
  const windowHeight = Dimensions.get('screen').height;
  const [showOptHelp, setShowOptHelp] = useState(false);
  const [checkLogout, setCheckLogout] = useState(false);
  const userInfo = useAppStore((state) => state.userInfo);
  const setUserInfo = useAppStore((state) => state.setUserInfo);
  const [visibleModalId, setVisibleModalId] = useState('');

  const helpAnim = useRef(new Animated.Value(windowHeight)).current;
  const _close = () => {
    // Animated.timing(heightAnim, {
    //   toValue: windowHeight,
    //   duration: 400,
    //   useNativeDriver: false,
    // }).start(() => {
    //   close();
    // });
    close();
  };
  const _logout = useAppStore((state) => state.logout);

  const logout = async () => {
    // await GoogleSignin.hasPlayServices();
    // await GoogleSignin.signOut();
    _logout();
  };

  const _optHelpClose = () => {
    Animated.timing(helpAnim, {
      toValue: windowHeight,
      duration: 400,
      useNativeDriver: false,
    }).start(() => {
      setShowOptHelp(false);
    });
  };

  useEffect(() => {
    if (showOptHelp) {
      Animated.timing(helpAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [showOptHelp]);

  // useEffect(() => {
  //   Animated.timing(heightAnim, {
  //     toValue: 0,
  //     duration: 500,
  //     useNativeDriver: false,
  //   }).start();
  // }, []);

  const handleSetting = async (title: string, enable: boolean) => {
    try {
      const response = await setBaseSettings(SETTINGS[title], enable);
      if (response.status === 200 || response.status === 201) {
        setUserInfo({
          ...userInfo,
          ...response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const RenderItem = ({ text, help }: { text: string; help?: () => void }) => {
    const settingIndex = (userInfo.settings || []).findIndex(
      (setting) => setting.settingId === SETTINGS[text],
    );
    let enable = false;
    if (settingIndex > -1) enable = userInfo.settings![settingIndex].enable;

    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 6,
          }}
        >
          <View style={{ width: '70%' }}>
            <TextWrapper style={{ fontSize: 15, color: 'black' }}>{t(text)}</TextWrapper>
          </View>
          {help && (
            <TouchableOpacity onPress={help}>
              <TextWrapper style={{ fontSize: 17 }}>?</TextWrapper>
            </TouchableOpacity>
          )}
          <Switch
            trackColor={{ false: '#CF4949', true: '#45659C' }}
            thumbColor={'black'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(value: boolean) => handleSetting(text, value)}
            value={enable}
          ></Switch>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            height: 2,
            borderRadius: 8,
            backgroundColor: '#181818',
          }}
        ></View>
      </>
    );
  };

  const ChangeLangBtn = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('');

    const langs = [
      { key: 'en', value: 'English' },
      { key: 'zh', value: '中文' },
    ];

    return (
      <View style={{ marginTop: 5 }}>
        <SelectList
          setSelected={(val: string) => {
            changeLanguage(val);
            setSelectedLanguage(val);
          }}
          data={langs}
          save="key"
          placeholder={t('language')}
          arrowicon={<Image source={require(DownIcon)} style={{ width: 14, height: 10 }} />}
          boxStyles={{ borderRadius: 0 }}
        />
      </View>
    );
  };

  const LinkBtnOptions = [
    {
      key: '/faq',
      value: t('faq'),
    },
    {
      key: '/feedback-support',
      value: t('feedbackAndSupport'),
    },
    {
      key: '/terms',
      value: t('termsAndConditions'),
    },
    {
      key: '/privacy',
      value: t('privacy'),
    },
    {
      key: '/about-us',
      value: t('aboutUs'),
    },
    {
      key: '/contact-us',
      value: t('contactUs'),
    },
  ];

  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        backgroundColor: '#f8f2eac2',
        top: 0,
        left: 0,
        position: 'absolute',
        overflow: 'hidden',
      }}
    >
      {/* <Animated.View
        style={{
          width: windowWidth,
          height: windowHeight,
          marginTop: heightAnim,
        }}
      > */}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#181818',
          position: 'relative',
          justifyContent: 'flex-start',
          padding: 10,
        }}
      >
        <TouchableOpacity
          onPress={_close}
          style={{
            width: 40,
            padding: 10,
            // height: '100%',
          }}
        >
          <Image source={require(backIcon)} style={{ width: 11, height: 14 }} />
        </TouchableOpacity>
        <TextWrapper
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 20,
          }}
        >
          {t('settings')}
        </TextWrapper>
      </View>
      <ScrollView
        style={{
          flex: 1,
        }}
        overScrollMode="never"
      >
        <View
          style={{
            paddingHorizontal: 10,
            paddingTop: 20,
            paddingBottom: 120,
          }}
        >
          <View
            style={{
              borderRadius: 15,
              borderWidth: 2,
              borderColor: 'black',
              overflow: 'hidden',
              backgroundColor: '#F2E7D9',
              ...Styles.shadow,
            }}
          >
            <View
              style={{
                flexDirection: 'column',
                padding: 8,
                paddingHorizontal: 20,
              }}
            >
              <RenderItem text={'notifications'} />
              <RenderItem text={'celestialQuoteOfTheDay'} />
              <RenderItem text={'someoneAddedYou'} />
              <RenderItem text={'guidancePassNotifications'} />
              <RenderItem
                text={'optIn'}
                help={() => {
                  setShowOptHelp(true);
                }}
              />
              <RenderItem text={'optInForFriendAstrologialActivityFeed'} />
              <RenderItem text={'optInForPublicAstrologialActivityFeed'} />
              <RenderItem text={'optInForFriendZodiacBirthdayAlerts'} />
              <RenderItem text={'optInForPublicZodiacBirthdayAlerts'} />
              <ChangeLangBtn />
              {LinkBtnOptions.map((item: any, index: number) => (
                <View key={index} style={{ marginTop: 5 }}>
                  <TouchableOpacity
                    onPress={() => setVisibleModalId(item.key)}
                    style={{ borderWidth: 1, borderColor: '#808080', padding: 10, paddingLeft: 20 }}
                  >
                    <TextWrapper style={{ fontSize: 16 }}>{item.value}</TextWrapper>
                  </TouchableOpacity>
                </View>
              ))}
              {/* <RenderButton text={'changeLanguage'} />
              <RenderButton text={'FAQ'} />
              <RenderButton text={'Feedback & Support'} />
              <RenderButton text={'Terms & Conditions'} />
              <RenderButton text={'Privacy'} />
              <RenderButton text={'About Us'} />
              <RenderButton text={'Contact Us'} />
              <RenderButton text={'Delete Accounts'} /> */}
            </View>
          </View>
          <View style={{ paddingHorizontal: 100 }}>
            <TouchableOpacity
              style={{
                borderRadius: 14,
                borderColor: 'black',
                borderWidth: 2,
                padding: 8,
                paddingHorizontal: 14,
                margin: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                ...Styles.shadow,
                backgroundColor: '#f8f2eac2',
              }}
              onPress={() => {
                // logout();
                //   router.push('/login');
                setCheckLogout(true);
              }}
            >
              <Image source={require(logoutCursor)} style={{ width: 24, height: 24 }} />
              <TextWrapper style={{ color: 'red', fontSize: 16 }}>{t('logout')}</TextWrapper>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 6,
            }}
          >
            <TextWrapper style={{ fontSize: 18 }}>{`${t('followUsOn')}:`}</TextWrapper>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 30,
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity style={{ paddingHorizontal: 3 }}>
              <Image source={require(facebookIcon)} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingHorizontal: 3 }}>
              <Image source={require(indeadIcon)} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingHorizontal: 3 }}>
              <Image source={require(xbookIcon)} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingHorizontal: 3 }}>
              <Image source={require(quotIcon)} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* </Animated.View> */}
      {showOptHelp && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#f8f2eac2',
            top: 0,
            left: 0,
            width: windowWidth,
            height: windowHeight,
          }}
        >
          <Animated.View
            style={{
              width: windowWidth,
              height: windowHeight,
              marginTop: helpAnim,
            }}
          >
            <ScrollView
              style={{
                flex: 1,
              }}
              overScrollMode="never"
            >
              <View
                style={{
                  paddingVertical: 100,
                  position: 'relative',
                }}
              >
                <TouchableOpacity
                  onPress={_optHelpClose}
                  style={{
                    position: 'absolute',
                    left: 20,
                    top: 70,
                  }}
                >
                  <Image source={require(back1Icon)} style={{ width: 23, height: 23 }} />
                </TouchableOpacity>
                <View
                  style={{
                    borderRadius: 15,
                    borderWidth: 2,
                    borderColor: 'black',
                    overflow: 'hidden',
                    backgroundColor: '#F2E7D9',
                    ...Styles.shadow,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#181818',
                      justifyContent: 'center',
                      padding: 10,
                    }}
                  >
                    <TextWrapper
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 20,
                      }}
                    >
                      {t('stayConnectedAndCelebrateTogether')}
                    </TextWrapper>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      padding: 8,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        padding: 5,
                        paddingHorizontal: 30,
                        justifyContent: 'center',
                      }}
                    >
                      <Image source={require(starIcon)} style={{ width: 20, height: 27 }} />
                      <TextWrapper
                        style={{
                          textDecorationLine: 'underline',
                          fontSize: 17,
                          textAlign: 'center',
                          fontWeight: '700',
                        }}
                      >
                        {t('optInForPublicFeedAndBirthdayCelebrations')}
                      </TextWrapper>
                      <Image source={require(starIcon)} style={{ width: 20, height: 27 }} />
                    </View>
                    <View>
                      <TextWrapper
                        style={{
                          fontSize: 16,
                          textAlign: 'center',
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}
                      >
                        {`${t('joinOurVibrantCommunityFeedAndNeverMissOutOnTheFun')}:`}
                      </TextWrapper>
                    </View>
                    <View>
                      <TextWrapper
                        style={{
                          fontSize: 16,
                          textAlign: 'center',
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}
                      >
                        {t('publicFeedAccess')}
                      </TextWrapper>
                    </View>
                    <View>
                      <TextWrapper
                        style={{
                          fontSize: 16,
                          textAlign: 'center',
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}
                      >
                        {t('birthdayCelebrations')}
                      </TextWrapper>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        padding: 5,
                        paddingTop: 30,
                        justifyContent: 'center',
                      }}
                    >
                      <TextWrapper
                        style={{
                          textDecorationLine: 'underline',
                          fontSize: 17,
                          textAlign: 'center',
                        }}
                      >
                        {`${t('howItWorks')}:`}
                      </TextWrapper>
                    </View>
                    <View>
                      <TextWrapper
                        style={{
                          fontSize: 16,
                          textAlign: 'center',
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}
                      >
                        {t('publicFeed')}
                      </TextWrapper>
                    </View>
                    <View>
                      <TextWrapper
                        style={{
                          fontSize: 16,
                          textAlign: 'center',
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}
                      >
                        {t('birthdaysFeed')}
                      </TextWrapper>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        padding: 5,
                        paddingTop: 30,
                        justifyContent: 'center',
                      }}
                    >
                      <TextWrapper
                        style={{
                          textDecorationLine: 'underline',
                          fontSize: 17,
                          textAlign: 'center',
                        }}
                      >
                        {`${t('yourPrivacyMatters')}:`}
                      </TextWrapper>
                    </View>
                    <View>
                      <TextWrapper
                        style={{
                          fontSize: 16,
                          textAlign: 'center',
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}
                      >
                        {t('youAreInControlFeed')}
                      </TextWrapper>
                    </View>
                    <View>
                      <TextWrapper
                        style={{
                          fontSize: 16,
                          textAlign: 'center',
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}
                      >
                        {t('readyToMakeExperienceMoreEnjoyable')}
                      </TextWrapper>
                    </View>
                    <View>
                      <TextWrapper
                        style={{
                          fontSize: 16,
                          textAlign: 'center',
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}
                      >
                        {t('ifYouHaveAnyQuestions')}
                      </TextWrapper>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      )}
      {checkLogout && <CheckLogout close={() => setCheckLogout(false)} callback={logout} />}
      {visibleModalId === '/privacy' && <PrivacyPolicy close={() => setVisibleModalId('')} />}
      {visibleModalId === '/feedback-support' && <Feedback close={() => setVisibleModalId('')} />}
      {visibleModalId === '/terms' && <TermsOfUse close={() => setVisibleModalId('')} />}
      {visibleModalId === '/faq' && <Faq close={() => setVisibleModalId('')} />}
      {visibleModalId === '/about-us' && <AboutUs close={() => setVisibleModalId('')} />}
      {visibleModalId === '/contact-us' && <ContactUs close={() => setVisibleModalId('')} />}
    </View>
  );
};

const Styles = StyleSheet.create({
  shadow: {
    boxShadow: '5px 5px 1px 0px rgba(0, 0, 0, 0.6)',
    elevation: 5,
  },
});
