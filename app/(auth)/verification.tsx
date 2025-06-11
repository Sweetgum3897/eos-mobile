import { Image } from 'expo-image';
import { useGlobalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';

import { getNotifications, sendOtp, verifyEmailOtp, verifyPhoneOtp } from '@/actions';
import { TextWrapper } from '@/components';
import { BackButton } from '@/components/BackButton';

import { useAppStore } from '../../store';

const VerificationScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const router = useRouter();
  const windowWidth = Dimensions.get('screen').width;
  const [loading, setLoading] = useState(false);
  const formatedPhoneNumber = useAppStore((state) => state.formatedPhoneNumber);
  const emailId = useAppStore((state) => state.emailId);
  const setUserInfo = useAppStore((state) => state.setUserInfo);
  const setNotifications = useAppStore((state) => state.setNotifications);
  const setAuthorized = useAppStore((state) => state.setAuthorized);
  const { type: verifitype, next, isEmail } = useGlobalSearchParams();
  const isPhoneNumberVerification = isEmail !== 'true';

  const [err, setErr] = useState('');

  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [isFocused4, setIsFocused4] = useState(false);

  const [verifyCode1, setVerifyCode1] = useState('');
  const [verifyCode2, setVerifyCode2] = useState('');
  const [verifyCode3, setVerifyCode3] = useState('');
  const [verifyCode4, setVerifyCode4] = useState('');

  const verifyCodeInput1 = useRef(null);
  const verifyCodeInput2 = useRef(null);
  const verifyCodeInput3 = useRef(null);
  const verifyCodeInput4 = useRef(null);

  const getNotificationData = async () => {
    try {
      const result = await getNotifications();
      if (result.status === 200 || result.status === 201) {
        setNotifications(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onVerifyOTP = () => {
    setLoading(true);
    (isPhoneNumberVerification
      ? verifyPhoneOtp(
          formatedPhoneNumber,
          `${verifyCode1}${verifyCode2}${verifyCode3}${verifyCode4}`,
        )
      : verifyEmailOtp(emailId, `${verifyCode1}${verifyCode2}${verifyCode3}${verifyCode4}`)
    ).then((result) => {
      if (result.data.result) {
        if (result.data.user && result.data.user.username) {
          setUserInfo({
            ...result.data.user,
            accessToken: result.data.accessToken,
            refreshToken: result.data.refreshToken,
          });
          if (verifitype == 'CHANGE_PASSWORD') {
            router.push('/change-password');
          } else {
            setAuthorized(true);
            setTimeout(() => {
              getNotificationData();
              // @ts-ignore
              router.push(next);
            }, 500);
          }
        } else {
          router.push('/register');
        }
        setLoading(false);
      } else {
        setErr(result.data.message);
        setLoading(false);
      }
    });
  };
  useEffect(() => {
    if (verifyCode4 !== '' && verifyCode1 !== '' && verifyCode2 !== '' && verifyCode3 !== '') {
      onVerifyOTP();
    }
  }, [verifyCode4]);
  return (
    <GestureHandlerRootView>
      <View
        style={{
          backgroundColor: '#F8F2EA',
          width: windowWidth,
          height: '100%',
        }}
      >
        <View style={styles.Wrapper}>
          <BackButton onClick={navigation.goBack} />

          <View style={styles.header}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={require('../../assets/svg/verify-logo.svg')}
                style={{ width: 74, height: 72 }}
              />
            </View>
            <View style={{ display: 'flex', justifyContent: 'center' }}>
              <TextWrapper
                style={{
                  ...styles.title,
                  textAlign: 'center',
                  fontSize: 32,
                  color: '#4F4D4A',
                }}
              >
                {t('verification')}
              </TextWrapper>
            </View>
            <TextWrapper
              style={{
                flexDirection: 'row',
                width: '100%',
                color: '#181818',
                fontSize: 16,
                marginTop: 20,
                //   color: "#4F4D4A",
              }}
            >
              Kindly Input the code sent to your sanctified{' '}
              {isPhoneNumberVerification ? 'Mobile Device' : 'Email'} :{' '}
              {isPhoneNumberVerification ? formatedPhoneNumber : emailId}
            </TextWrapper>
          </View>
          <View style={styles.verificationCodeWrraper}>
            <View style={styles.VerficationLabel}>
              <TextWrapper style={{ color: 'black', fontSize: 16, fontWeight: 400 }}>
                {t('verificationCode')}
              </TextWrapper>
            </View>
            {err && <Text style={{ color: '#f22f46', fontSize: 10 }}>{err}</Text>}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 10,
              }}
            >
              <TextInput
                ref={verifyCodeInput1}
                style={[
                  styles.verifyCodeInput,
                  styles.shadow,
                  {
                    borderColor: verifyCode1.length > 0 || isFocused1 ? 'black' : '#E2DCD5',
                    backgroundColor: verifyCode1.length > 0 || isFocused1 ? 'white' : '#E2DCD5',
                    color: verifyCode1.length > 0 || isFocused1 ? 'black' : '#4F4D4A',
                  },
                ]}
                value={verifyCode1}
                keyboardType="numeric"
                placeholder="-"
                placeholderTextColor={'#4F4D4A'}
                onFocus={() => setIsFocused1(true)}
                onBlur={() => setIsFocused1(false)}
                onChangeText={(text) => {
                  if (text.length <= 1) {
                    setVerifyCode1(text);
                  }
                  if (text !== '' || text.length >= 1) {
                    // @ts-ignore
                    verifyCodeInput2.current?.focus();
                  }
                }}
              />
              <TextInput
                ref={verifyCodeInput2}
                style={[
                  styles.verifyCodeInput,
                  styles.shadow,
                  {
                    borderColor: verifyCode2.length > 0 || isFocused2 ? 'black' : '#E2DCD5',
                    backgroundColor: verifyCode2.length > 0 || isFocused2 ? 'white' : '#E2DCD5',
                    color: verifyCode2.length > 0 || isFocused2 ? 'black' : '#4F4D4A',
                  },
                ]}
                value={verifyCode2}
                keyboardType="numeric"
                placeholder="-"
                placeholderTextColor={'#4F4D4A'}
                onFocus={() => setIsFocused2(true)}
                onBlur={() => setIsFocused2(false)}
                onChangeText={(text) => {
                  if (text.length <= 1) {
                    setVerifyCode2(text);
                  }
                  if (text !== '' || text.length >= 1) {
                    // @ts-ignore
                    verifyCodeInput3.current?.focus();
                  }
                }}
              />
              <TextInput
                ref={verifyCodeInput3}
                style={[
                  styles.verifyCodeInput,
                  styles.shadow,
                  {
                    borderColor: verifyCode3.length > 0 || isFocused3 ? 'black' : '#E2DCD5',
                    backgroundColor: verifyCode3.length > 0 || isFocused3 ? 'white' : '#E2DCD5',
                    color: verifyCode3.length > 0 || isFocused3 ? 'black' : '#4F4D4A',
                  },
                ]}
                value={verifyCode3}
                keyboardType="numeric"
                placeholder="-"
                placeholderTextColor={'#4F4D4A'}
                onFocus={() => setIsFocused3(true)}
                onBlur={() => setIsFocused3(false)}
                onChangeText={(text) => {
                  if (text.length <= 1) {
                    setVerifyCode3(text);
                  }
                  if (text !== '' || text.length >= 1) {
                    // @ts-ignore
                    verifyCodeInput4.current?.focus();
                  }
                }}
              />
              <TextInput
                ref={verifyCodeInput4}
                style={[
                  styles.verifyCodeInput,
                  styles.shadow,
                  {
                    borderColor: verifyCode4.length > 0 || isFocused4 ? 'black' : '#E2DCD5',
                    backgroundColor: verifyCode4.length > 0 || isFocused4 ? 'white' : '#E2DCD5',
                    color: verifyCode4.length > 0 || isFocused4 ? 'black' : '#4F4D4A',
                  },
                ]}
                value={verifyCode4}
                keyboardType="numeric"
                placeholder="-"
                placeholderTextColor={'#4F4D4A'}
                onFocus={() => setIsFocused4(true)}
                onBlur={() => setIsFocused4(false)}
                onChangeText={(text) => {
                  if (text.length <= 1) {
                    setVerifyCode4(text);
                  }
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                style={{ borderBottomWidth: 1, borderColor: 'black' }}
                onPress={() => {
                  sendOtp(formatedPhoneNumber);
                  setErr('');
                  setVerifyCode1('');
                  setVerifyCode2('');
                  setVerifyCode3('');
                  setVerifyCode4('');
                }}
              >
                <TextWrapper style={{ fontSize: 25, color: 'black' }}>
                  {t('resendCode')}
                </TextWrapper>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: 60,
            }}
          >
            <TouchableOpacity
              onPress={onVerifyOTP}
              disabled={loading}
              style={[{ alignSelf: 'flex-end', flex: 1 }, styles.continueButton]}
            >
              {loading ? (
                <ActivityIndicator size={'small'} color={'#ffffff'} />
              ) : (
                <TextWrapper style={{ fontSize: 16, color: '#ffffff', textAlign: 'center' }}>
                  {t('continue')}
                </TextWrapper>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  Wrapper: {
    position: 'absolute',
    color: '#FFFFF',
    top: 0,
    width: '100%',
    height: '100%',
    paddingTop: 14,
    paddingHorizontal: 14,
  },
  header: {
    paddingHorizontal: 16,
    marginTop: 26,
  },
  title: {
    color: '#181818',
    fontSize: 22,
    fontWeight: 600,
  },
  verificationCodeWrraper: {
    paddingTop: 41,
    flex: 1,
  },
  VerficationLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Input: {
    width: 74,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFF00',
    borderWidth: 1,
    textAlign: 'center',
  },
  continueButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 47,
    borderColor: 'black',
    backgroundColor: '#181818',
    borderWidth: 1,
    alignItems: 'center',
    width: '100%',
  },
  underlineStyleBase: {
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    width: 74,
    fontSize: 14,
    color: '#0C1A30',
  },
  verifyCodeInput: {
    fontSize: 16,
    color: 'white',
    paddingHorizontal: 20.12,
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 15,
    backgroundColor: '#E2DCD5',
    textAlign: 'center',
    height: 45,
    width: 74.454,
  },
  shadow: {
    boxShadow: '5px 5px 1px 0px rgba(0, 0, 0, 0.6)',
    elevation: 6,
  },
});
