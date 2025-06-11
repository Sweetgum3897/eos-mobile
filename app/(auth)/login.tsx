import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DEFAULT_THEME, Flag } from 'react-native-country-picker-modal';
import PhoneInput from 'react-native-phone-number-input';

import { googleSign, sendEamilOtp, sendOtp, verifyExistsUser } from '@/actions';
import { CustomAlertModal, EmailInput, TextWrapper } from '@/components';
import { PrivacyPolicy, SuccessSentVerifyCode, TermsOfUse } from '@/sections';

import { useAppStore } from '../../store';

GoogleSignin.configure();

const facebookIcon = '../../assets/svg/facebookIcon.svg';
const googleIcon = '../../assets/svg/googleIcon.svg';
const EmailSvg = '../../assets/svg/email.svg';
const LockLgo = '../../assets/svg/lock-logo.svg';
const PhoneIconSvg = '../../assets/svg/phone.svg';
const NextBtn = '../../assets/svg/nextIconbutton.svg';

export default function LoginScreen() {
  const router = useRouter();
  const opacityAnimation = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const setEmailId = useAppStore((state) => state.setEmailId);
  const setPhoneNumber = useAppStore((state) => state.setPhoneNumber);

  const emailId = useAppStore((state) => state.emailId);
  const phoneNumber = useAppStore((state) => state.phoneNumber);
  const userInfo = useAppStore((state) => state.userInfo);
  const setUserInfo = useAppStore((state) => state.setUserInfo);
  const setAuthorized = useAppStore((state) => state.setAuthorized);
  const formatedPhoneNumber = useAppStore((state) => state.formatedPhoneNumber);
  const setFormatedPhoneNumber = useAppStore((state) => state.setFormatedPhoneNumber);

  const [sentVerifyCode, setSentVerifyCode] = useState(false);
  const [isEmail, setIsEmail] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [err, setErr] = useState('');

  const [visibleTerms, setVisibleTerms] = useState<Boolean>(false);
  const [visiblePrivacy, setVisiblePrivacy] = useState<Boolean>(false);

  const phoneInput = useRef(null);

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (response.type === 'success') {
        const { idToken, accessToken } = await GoogleSignin.getTokens();
        const { email, name, photo } = response.data.user;
        setUserInfo({
          ...userInfo,
          fullname: name || '',
          email,
          avatar: photo || '',
        });
        setEmailId(email);
        const googleSignResponse = await googleSign({ idToken, accessToken });
        if (!googleSignResponse.data.user && googleSignResponse.data.accessToken === '') {
          router.push('/register');
        } else if (!googleSignResponse.data.user) {
          setModalText('Faild google authentication');
          setVisibleModal(true);
        } else {
          setUserInfo({
            ...googleSignResponse.data.user,
            accessToken: googleSignResponse.data.accessToken,
            refreshToken: googleSignResponse.data.refreshToken,
          });
          setAuthorized(true);
          setTimeout(() => {
            router.push('/');
          }, 500);
        }
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      console.log(error);
    }
  };

  const switchMobileEmail = () => {
    setIsEmail(!isEmail);
  };

  useEffect(() => {
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    return () => {
      Animated.timing(opacityAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    };
  }, []);

  const [isFocused, setIsFocused] = useState(false); // State to track focus

  const sendVerificationCode = useCallback(() => {
    if (!isEmail) {
      if (!formatedPhoneNumber || formatedPhoneNumber == '' || formatedPhoneNumber.length == 0) {
        setModalText(t('requirePhoneNumber'));
        setVisibleModal(true);
        return;
      }
    }
    verifyExistsUser(isEmail ? { email: emailId } : { phonenumber: phoneNumber })
      .then((response) => {
        if (response.data.exists && isEmail) {
          router.push('/password');
          return;
        } else {
          if (isEmail) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailId || emailId == '' || emailId.length == 0) {
              setModalText(t('requireEmailAddress'));
              setVisibleModal(true);
              return;
            } else if (!emailRegex.test(emailId)) {
              setModalText(t('requireValidEmailAddress'));
              setVisibleModal(true);
              return;
            }

            setLoading(true);

            sendEamilOtp(emailId)
              .then((result) => {
                if (result.status === 200 || result.status === 201) {
                  setSentVerifyCode(true);
                } else {
                  setModalText(
                    t('Failed sending verification code! Please try again with correct email.'),
                  );
                  setVisibleModal(true);
                }
                setLoading(false);
              })
              .catch((error) => {
                setLoading(false);
                setModalText(
                  t('Failed sending verification code! Please try again with correct email.'),
                );
                setVisibleModal(true);
              });
          } else {
            setLoading(true);

            sendOtp(formatedPhoneNumber)
              .then((result) => {
                if (result.status === 200 || result.status === 201) {
                  setSentVerifyCode(true);
                } else {
                  setLoading(false);
                  setModalText(t('failedSendingVerificationCodeNumber'));
                }
              })
              .catch((error) => {
                console.log(error);
                setLoading(false);
                setModalText(t('failedSendingVerificationCodeNumber'));
                setVisibleModal(true);
              });
          }
        }
      })
      .catch((e) => console.log('Error', e));
  }, [emailId, phoneNumber, isEmail, formatedPhoneNumber]);

  if (sentVerifyCode) {
    return (
      <SuccessSentVerifyCode
        type={isEmail}
        value={isEmail ? emailId : phoneNumber}
        resend={sendVerificationCode}
        back={() => {
          setSentVerifyCode(false);
        }}
      />
    );
  } else {
    return (
      <Animated.View style={[styles.Wrapper, { opacity: opacityAnimation }]}>
        <ScrollView style={{ width: '100%' }}>
          <View style={styles.steps}>
            <View style={{ width: 75, height: 75, marginLeft: 5 }}>
              <Image source={require(LockLgo)} style={{ width: 84, height: 84 }} />
            </View>
            <Text style={{ ...styles.title, marginLeft: 5 }}>{t('logInSignUp')}</Text>
            <Text style={styles.description}>{t('requireEmailOrPhoneToAccessGateway')}</Text>
            <View style={styles.inputGroup}>
              <TextWrapper style={styles.label1}>
                {isEmail ? t('email') : t('mobileNumber')}
              </TextWrapper>
              {err && <Text style={styles.error}>{err}</Text>}
              {isEmail ? (
                <EmailInput emailId={emailId} setEmailId={setEmailId} />
              ) : (
                <View
                  style={{
                    ...styles.phoneNumberWrapper,
                    backgroundColor: isFocused || phoneNumber.length > 0 ? 'white' : '#E2DCD5',
                    borderColor: isFocused || phoneNumber.length > 0 ? 'black' : '#E2DCD5',
                  }}
                >
                  <PhoneInput
                    ref={phoneInput}
                    value={phoneNumber}
                    defaultCode="US"
                    layout="second"
                    placeholder={t('requireMobileNumber')}
                    withDarkTheme={true}
                    onChangeText={(text) => {
                      setPhoneNumber(text);
                    }}
                    onChangeFormattedText={(text) => {
                      setFormatedPhoneNumber(text);
                    }}
                    flagButtonStyle={
                      {
                        // color: "#FFFFFF",
                        // backgroundColor: "red",
                        // paddingRight: 0
                      }
                    }
                    textContainerStyle={{
                      height: 50,
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: 'transparent',
                      // fontFamily: "PatrickHand",
                      // fontSize: 16,
                      // backgroundColor: "red",
                      paddingLeft: 0,
                    }}
                    textInputStyle={{
                      borderLeftWidth: 1,
                      height: 30,
                      paddingLeft: 12,
                      paddingTop: 0,
                      paddingBottom: 0,
                      fontFamily: 'PatrickHand',
                      color: isFocused || phoneNumber.length > 0 ? '#686662' : '#4F4D4A',
                      fontSize: 17,
                    }}
                    containerStyle={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      padding: 0,
                    }}
                    textInputProps={{
                      keyboardType: 'phone-pad',
                      placeholderTextColor:
                        isFocused || phoneNumber.length > 0 ? '#686662' : '#4F4D4A',
                      onFocus: () => {
                        setIsFocused(true);
                      },
                      onBlur: () => setIsFocused(false),
                    }}
                    codeTextStyle={{
                      color: '#686662',
                      fontFamily: 'PatrickHand',
                      padding: 0,
                    }}
                    // disableArrowIcon={true}
                    countryPickerProps={{
                      renderFlagButton: (props: any) => {
                        return (
                          <Flag countryCode={props.countryCode} flagSize={DEFAULT_THEME.flagSize} />
                        );
                      },
                    }}
                  />
                </View>
              )}
            </View>

            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: 25,
              }}
            >
              <TouchableOpacity
                disabled={loading}
                style={{
                  borderRadius: 24,
                  backgroundColor: '#181818',
                  padding: 12,
                  width: '100%',
                  borderWidth: 2,
                  borderStyle: 'solid',
                  borderColor: 'black',
                }}
                onPress={sendVerificationCode}
              >
                {loading ? (
                  <ActivityIndicator size={'small'} color={'#ffffff'} />
                ) : (
                  <TextWrapper
                    style={{
                      color: '#F8F2EA',
                      fontSize: 18,
                      textAlign: 'center',
                    }}
                  >
                    {t('continue')}
                  </TextWrapper>
                )}
                <View style={{ position: 'absolute', right: 20, top: 16 }}>
                  <Image source={require(NextBtn)} style={{ width: 34, height: 14 }} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              ...styles.steps,
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 16,
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, alignSelf: 'center' }}>
                <View
                  style={{
                    backgroundColor: '#181818',
                    width: '100%',
                    height: 1,
                  }}
                ></View>
              </View>
              <Text
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  color: '#181818',
                }}
              >
                {t('or')}
              </Text>
              <View style={{ flex: 1, alignSelf: 'center' }}>
                <View
                  style={{
                    backgroundColor: '#181818',
                    width: '100%',
                    height: 1,
                  }}
                ></View>
              </View>
            </View>
          </View>
          <View style={{ ...styles.steps, paddingTop: 10, paddingBottom: 20 }}>
            <TouchableOpacity style={{ ...styles.continueBtn }} onPress={switchMobileEmail}>
              {!isEmail ? (
                <View style={{ paddingRight: 15 }}>
                  <Image source={require(EmailSvg)} style={{ width: 25, height: 25 }} />
                </View>
              ) : (
                <View style={{ paddingRight: 15 }}>
                  <Image source={require(PhoneIconSvg)} style={{ width: 25, height: 25 }} />
                </View>
              )}
              <TextWrapper style={{ color: '#4F4D4A', fontSize: 16 }}>
                {!isEmail ? t('continueWithEmail') : t('continueWithPhone')}
              </TextWrapper>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.continueBtn }} onPress={googleSignIn}>
              <View style={{ paddingRight: 15 }}>
                <Image source={require(googleIcon)} style={{ width: 25, height: 25 }} />
              </View>
              <TextWrapper style={{ color: '#4F4D4A', fontSize: 16 }}>
                {t('continueWithGoogle')}
              </TextWrapper>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.continueBtn }}
              onPress={() => router.push('/facebook-login')}
            >
              <View style={{ paddingRight: 15 }}>
                <Image source={require(facebookIcon)} style={{ width: 25, height: 25 }} />
              </View>
              <TextWrapper style={{ color: '#4F4D4A', fontSize: 16 }}>
                {t('continueWithFacebook')}
              </TextWrapper>
            </TouchableOpacity>
            <View
              style={{
                //   textAlign: "center",
                width: '100%',
                flexDirection: 'row',
                marginTop: 27,
                justifyContent: 'center',
              }}
            >
              <TextWrapper style={{ fontSize: 13 }}>{t('bySigningUpYouAgreeToOur')}</TextWrapper>
              <TouchableOpacity
                style={{ paddingHorizontal: 5 }}
                onPress={() => setVisibleTerms(true)}
              >
                <TextWrapper style={{ color: '#87888C', fontSize: 13 }}>
                  {t('termsOfUse')}
                </TextWrapper>
              </TouchableOpacity>
              <TextWrapper style={{}}>&</TextWrapper>
              <TouchableOpacity
                style={{ paddingHorizontal: 5 }}
                onPress={() => setVisiblePrivacy(true)}
              >
                <TextWrapper style={{ color: '#87888C', fontSize: 13 }}>
                  {t('privacyPolicy')}
                </TextWrapper>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <CustomAlertModal
          isVisible={visibleModal}
          onBackdropPress={() => setVisibleModal(false)}
          text={modalText}
        />
        {visibleTerms && <TermsOfUse close={() => setVisibleTerms(false)} />}
        {visiblePrivacy && <PrivacyPolicy close={() => setVisiblePrivacy(false)} />}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  Wrapper: {
    marginTop: 20,
    flexDirection: 'column',
  },
  steps: {
    width: '100%',
    paddingTop: 60,
    paddingHorizontal: 14,
  },
  header: {},
  title: {
    flexDirection: 'row',
    color: '#4F4D4A',
    // textAlign: "center",
    fontSize: 32,
    fontWeight: '400',
    fontFamily: 'PatrickHand',
  },
  description: {
    flexDirection: 'row',
    color: '#4F4D4A',
    fontSize: 17,
    fontWeight: '300',
    // textAlign: "center",
    marginTop: 24,
    // paddingHorizontal: 20,
    fontFamily: 'PatrickHand',
  },
  inputGroup: {
    marginTop: 28,
  },
  label1: {
    flexDirection: 'row',
    fontSize: 16,
    fontWeight: '600',
    color: '#181818',
    fontFamily: 'PatrickHand',
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
  error: {
    fontSize: 10,
    color: '#f22f46',
    fontFamily: 'PatrickHand',
  },
  InputCtrl: {
    fontSize: 14,
    borderRadius: 16,
    fontWeight: '300',
    borderWidth: 1,
    borderColor: '#181818',
    backgroundColor: '#181818',
    paddingHorizontal: 10,
    height: 48,
    marginTop: 4,
    color: '#FFFFFF',
    fontFamily: 'PatrickHand',
  },
  phoneNumberWrapper: {
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 4,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 0,
    paddingBottom: 0,
  },
  sendBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 41,
    backgroundColor: '#181818',
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  continueBtn: {
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F2EA',
    borderWidth: 1,
    borderColor: 'black',
    color: 'white',
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
  },
  notifition: {
    paddingVertical: 4,
    color: '#5F5C5C',
  },
  shadow: {
    boxShadow: '5px 5px 1px 0px rgba(0, 0, 0, 0.6)',
    elevation: 6,
  },
});
