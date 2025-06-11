import { Image } from 'expo-image';
import { useNavigation, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DEFAULT_THEME, Flag } from 'react-native-country-picker-modal';
import PhoneInput from 'react-native-phone-number-input';

import { sendEamilOtp, sendOtp } from '@/actions';
import { CustomAlertModal, InputBase, TextWrapper } from '@/components';

import { useAppStore } from '../../store';

const backIcon = '../../assets/svg/back.svg';
const forgetLogo = '../../assets/svg/forget-logo.svg';
const emailIcon = '../../assets/svg/email.svg';
const phoneIcon = '../../assets/svg/phone.svg';
const NextBtn = '../../assets/svg/nextIconbutton.svg';
const SentIconSvg = '../../assets/svg/sendVerifyCodeIcon.svg';

export default function ResetPasswordScreen() {
  const { t } = useTranslation();
  const windowWidth = Dimensions.get('screen').width;
  const windowHeight = Dimensions.get('screen').height;
  const navigation = useNavigation();

  const phoneInput = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showLayout, setLayout] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const setFormatedPhoneNumber = useAppStore((state) => state.setFormatedPhoneNumber);
  const [loading, setLoading] = useState(false);

  const [visibleModal, setVisibleModal] = useState(false);
  const [modalText, setModalText] = useState('');

  const [sentVerifyCode, setSentVerifyCode] = useState(false);

  const [email, setEmail] = useState('');

  const sendOTP = () => {
    if (showLayout == 'email') {
      if (!email || email == '' || email.length == 0) {
        setModalText(t('requireEmailAddress'));
        setVisibleModal(true);
        return;
      }
      setLoading(true);

      sendEamilOtp(email)
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
          setModalText(t('Failed sending verification code! Please try again with correct email.'));
          setVisibleModal(true);
        });
    } else {
      if (!phoneNumber || phoneNumber == '' || phoneNumber.length == 0) {
        setModalText(t('requirePhoneNumber'));
        setVisibleModal(true);
        return;
      }
      setLoading(true);

      sendOtp(phoneNumber)
        .then((result) => {
          if (result.status === 200 || result.status === 201) {
            setSentVerifyCode(true);
          } else {
            setLoading(false);
            setModalText(t('failedSendingVerificationCodeNumber'));
            setVisibleModal(true);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setModalText(t('failedSendingVerificationCodeNumber'));
          setVisibleModal(true);
        });
    }
  };

  if (sentVerifyCode) {
    return (
      <SuccessSentVerifyCode
        type={showLayout == 'email'}
        value={showLayout == 'email' ? email : phoneNumber}
        resend={sendOTP}
        back={() => {
          setSentVerifyCode(false);
        }}
      />
    );
  } else {
    return (
      <View
        style={{
          backgroundColor: '#F8F2EA',
          width: windowWidth,
          height: windowHeight,
        }}
      >
        <View
          style={{
            ...styles.Wrapper,
            width: windowWidth,
            height: windowHeight,
          }}
        >
          <View
            style={{
              width: '100%',
              paddingLeft: 15,
              paddingVertical: 20,
              paddingTop: 40,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (showLayout == '') navigation.goBack();
                else setLayout('');
              }}
            >
              <Image source={require(backIcon)} style={{ width: 11, height: 14 }} />
            </TouchableOpacity>
            <TextWrapper
              style={{
                color: 'black',
                fontSize: 17,
                fontWeight: '500',
                marginLeft: 15,
              }}
            >
              {t('forgotPassword')}
            </TextWrapper>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 5,
            }}
          >
            <Image source={require(forgetLogo)} style={{ width: 74, height: 74 }} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 12,
              justifyContent: 'center',
            }}
          >
            <TextWrapper style={styles.title}>{t('forgotPassword')}</TextWrapper>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 12,
              justifyContent: 'center',
            }}
          >
            <TextWrapper style={styles.description}>{t('weHereToHelp')}</TextWrapper>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TextWrapper style={styles.description}>{t('requireWhereResetPassword')}</TextWrapper>
          </View>
          {showLayout == '' ? (
            <>
              <View style={{ flexDirection: 'column', padding: 16 }}>
                <TouchableOpacity
                  style={{
                    borderRadius: 15,
                    backgroundColor: '#E2DCD5',
                    padding: 18,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                  }}
                  onPress={() => {
                    setLayout('email');
                  }}
                >
                  <Image source={require(emailIcon)} style={{ width: 25, height: 25 }} />
                  <TextWrapper style={{ fontSize: 25, paddingLeft: 10 }}>
                    {t('getCodeOnEmail')}
                  </TextWrapper>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderRadius: 15,
                    backgroundColor: '#E2DCD5',
                    padding: 18,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                  }}
                  onPress={() => {
                    setLayout('phone');
                  }}
                >
                  <Image source={require(phoneIcon)} style={{ width: 25, height: 25 }} />
                  <TextWrapper style={{ fontSize: 25, paddingLeft: 10 }}>
                    {t('GetCodeOnPhoneNumber')}
                  </TextWrapper>
                </TouchableOpacity>
              </View>
            </>
          ) : showLayout == 'email' ? (
            <>
              <View style={{ flexDirection: 'column', padding: 15, marginTop: 30 }}>
                <InputBase
                  renderIcon={() => (
                    <Image source={require(emailIcon)} style={{ width: 21, height: 21 }} />
                  )}
                  onChangeText={setEmail}
                  placeholder={'Email Address'}
                  value={email}
                />
                <TouchableOpacity disabled={loading} style={styles.resetBtn} onPress={sendOTP}>
                  {loading ? (
                    <ActivityIndicator size={'small'} color={'#ffffff'} />
                  ) : (
                    <TextWrapper
                      style={{
                        textAlign: 'center',
                        fontSize: 18,
                        fontWeight: 600,
                        color: '#FFFFFF',
                      }}
                    >
                      {t('sendCode')}
                    </TextWrapper>
                  )}
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'column',
                  padding: 15,
                  marginTop: 30,
                }}
              >
                <View
                  style={{
                    ...styles.phoneNumberWrapper,
                    backgroundColor: isFocused || phoneNumber.length > 0 ? 'white' : '#E2DCD5',
                    borderColor: isFocused || phoneNumber.length > 0 ? 'black' : '#E2DCD5',
                  }}
                >
                  <PhoneInput
                    ref={phoneInput}
                    defaultValue={phoneNumber}
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
                        //   color: "#FFFFFF",
                        // backgroundColor: "red",
                        // paddingRight: 0
                      }
                    }
                    textContainerStyle={{
                      height: 50,
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: 'transparent',
                      //   fontFamily: "PatrickHand",
                      //   fontSize: 16,
                      // backgroundColor: "red",
                      paddingLeft: 0,
                    }}
                    textInputStyle={{
                      borderLeftWidth: 1,
                      height: 25,
                      paddingLeft: 12,
                      fontFamily: 'PatrickHand',
                      color: isFocused || phoneNumber.length > 0 ? '#000000' : '#4F4D4A',
                      fontSize: 17,
                    }}
                    containerStyle={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      //   fontFamily: "PatrickHand",
                      padding: 0,
                    }}
                    textInputProps={{
                      keyboardType: 'phone-pad',
                      placeholderTextColor:
                        isFocused || phoneNumber.length > 0 ? '#000000' : '#4F4D4A',
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
              </View>
              <View
                style={{
                  paddingHorizontal: 13,
                }}
              >
                <TouchableOpacity disabled={loading} style={styles.resetBtn} onPress={sendOTP}>
                  {loading ? (
                    <ActivityIndicator size={'small'} color={'#ffffff'} />
                  ) : (
                    <TextWrapper
                      style={{
                        textAlign: 'center',
                        fontSize: 18,
                        fontWeight: 600,
                        color: '#FFFFFF',
                      }}
                    >
                      {t('sendCode')}
                    </TextWrapper>
                  )}
                </TouchableOpacity>
              </View>
            </>
          )}
          {/* {resetPasswordLayout === "sendAgain" && (
          <>
            <View style={styles.steps}>
              <View style={{ marginTop: 12 }}>
                <TextWrapper style={{ ...styles.description, flexDirection: "row", justifyContent: "center" }}>
                  We have sent a instructions email
                </TextWrapper>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                  <TextWrapper style={styles.description}> team@zodia.in </TextWrapper>
                  <TextWrapper style={{ ...styles.description, color: "#555555" }}>
                    Having problem?
                  </TextWrapper>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  borderRadius: 24,
                  backgroundColor: "#181818",
                  justifyContent: "center",
                  padding: 14,
                  marginTop: 24,
                }}

              >
                <TextWrapper
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  SEND OTP
                </TextWrapper>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 30,
                }}
                onPress={() => {
                  navigation.navigate(navigationKeys.LOGIN);
                }}
              >
                <TextWrapper
                  style={{
                    color: "black",
                    fontSize: 18,
                    textDecorationLine: 'underline',
                    textAlign: "center"
                  }}
                >
                  Back to login
                </TextWrapper>
              </TouchableOpacity>
            </View>
          </>
        )} */}
        </View>
        <CustomAlertModal
          isVisible={visibleModal}
          onBackdropPress={() => setVisibleModal(false)}
          text={modalText}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Wrapper: {
    top: 0,
    width: '100%',
    position: 'absolute',
  },
  steps: {
    width: '100%',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {},
  title: {
    flexDirection: 'row',
    color: '#4F4D4A',
    fontSize: 32,
    fontWeight: 500,
    textAlign: 'center',
  },
  description: {
    color: '#4F4D4A',
    fontSize: 14,
    fontWeight: 400,
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputGroup: {
    marginTop: 24,
  },
  labelEmail: {
    flexDirection: 'row',
    fontSize: 14,
    fontWeight: 700,
    color: 'black',
  },
  emilInput: {
    marginTop: 24,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: '#181818',
    borderWidth: 1,
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 11,
    color: '#FFFFFF',
    fontFamily: 'PatrickHand',
  },
  resetBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    borderColor: 'black',
    backgroundColor: '#181818',
    borderWidth: 1,
    marginTop: 30,
    paddingVertical: 15,
  },
  continueBtn: {
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 12,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#181818',
    width: '100%',
    marginTop: 24,
  },
  labelMobileNumber: {
    flexDirection: 'row',
    fontSize: 16,
    fontWeight: 700,
    fontFamily: 'PatrickHand',
    color: 'black',
  },
  phoneNumberWrapper: {
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 12,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 0,
    paddingBottom: 0,
  },
});

export const SuccessSentVerifyCode = ({
  type,
  value,
  back,
  resend,
}: {
  type: boolean;
  value: string;
  back: () => void;
  resend: () => void;
}) => {
  const { t } = useTranslation();
  const windowWidth = Dimensions.get('screen').width;
  const windowHeight = Dimensions.get('screen').height;
  const router = useRouter();
  const goPage = () => {
    router.push(`/verification?next=/change-password&isEmail=${type}&type=CHANGE_PASSWORD`);
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#F8F2EA',
        width: windowWidth,
        height: windowHeight,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <View style={{ position: 'absolute', top: 70, left: 14 }}>
        <TouchableOpacity onPress={back}>
          <Image source={require(backIcon)} style={{ width: 11, height: 14 }} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Image source={require(SentIconSvg)} style={{ width: 158, height: 158 }} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={styles.title}>{t('resetCodeSent')}</Text>
      </View>
      <View>
        {type ? (
          <View>
            <TextWrapper style={{ fontSize: 16, color: '#646464', textAlign: 'center' }}>
              {t('sentInstructionsToEmail')}
            </TextWrapper>
          </View>
        ) : (
          <View>
            <TextWrapper style={{ fontSize: 16, color: '#646464', textAlign: 'center' }}>
              {t('sentInstructionsToPhone')}
            </TextWrapper>
          </View>
        )}
      </View>
      {type ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 10,
          }}
        >
          <Image source={require(emailIcon)} style={{ width: 13, height: 13 }} />
          <TextWrapper style={{ color: 'black', fontSize: 16, paddingLeft: 10 }}>
            {value}
          </TextWrapper>
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 10,
          }}
        >
          <Image source={require(phoneIcon)} style={{ width: 13, height: 13 }} />
          <TextWrapper style={{ color: 'black', fontSize: 16, paddingLeft: 10 }}>
            {value}
          </TextWrapper>
        </View>
      )}
      <View
        style={{
          display: 'flex',
          marginVertical: 25,
          marginTop: 80,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          onPress={goPage}
          style={{
            borderRadius: 30,
            backgroundColor: '#181818',
            padding: 12,
            width: '90%',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'black',
          }}
        >
          <TextWrapper
            style={{
              color: '#ffffff',
              fontSize: 18,
              textAlign: 'center',
            }}
          >
            {t('requireCode')}
          </TextWrapper>
          <View style={{ position: 'absolute', right: 20, top: 20 }}>
            <Image source={require(NextBtn)} style={{ width: 34, height: 14 }} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity style={{ borderBottomWidth: 1, borderColor: 'black' }}>
          <TextWrapper style={{ fontSize: 20, color: 'black' }}>{t('resendCode')}</TextWrapper>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
