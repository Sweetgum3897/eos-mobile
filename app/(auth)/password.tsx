import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getNotifications, sign } from '@/actions';
import { TextWrapper } from '@/components';

import { useAppStore } from '../../store';

const PasswordScreen = () => {
  const { t } = useTranslation();
  const windowWidth = Dimensions.get('screen').width;
  const windowHeight = Dimensions.get('screen').height;
  const router = useRouter();
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const [passwordVisible, setPasswordVisible] = useState(true);
  const setLoginError = useAppStore((state) => state.setLoginError);
  const setUserInfo = useAppStore((state) => state.setUserInfo);
  const setAuthorized = useAppStore((state) => state.setAuthorized);
  const setNotifications = useAppStore((state) => state.setNotifications);
  const [loading, setLoading] = useState(false);

  const emailId = useAppStore((state) => state.emailId);

  const [isWrongPassword, setIsWrongPassword] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false); // State to track focus

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

  useEffect(() => {
    setIsWrongPassword('');
    setLoading(false);
  }, [password]);

  const signWithPassword = async () => {
    if (password === '') {
      setIsWrongPassword(t('EMPTY_PASSWORD'));
      return;
    }
    setLoading(true);
    const result = await sign({
      email: emailId,
      password,
    }).catch((e) => {
      return e.response;
    });
    if (result.status === 200 || result.status === 201) {
      setUserInfo({
        ...result.data.user,
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
      });
      setAuthorized(true);
      setTimeout(() => {
        getNotificationData();
        router.push('/');
      }, 500);
    } else {
      setIsWrongPassword(t('LOGIN_FAILED'));
    }
    setLoading(false);
  };
  return (
    <View
      style={{
        width: windowWidth,
        height: '100%',
        backgroundColor: '#F8F2EA',
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
            paddingVertical: 18,
            flexDirection: 'row',
            marginTop: top,
            alignItems: 'center',
            // justifyContent:"center"
          }}
        >
          <TouchableOpacity onPress={navigation.goBack}>
            <Image
              source={require('../../assets/svg/back.svg')}
              style={{ width: 11, height: 14 }}
            />
          </TouchableOpacity>
          <TextWrapper
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginLeft: 15,
            }}
          >
            {t('password')}
          </TextWrapper>
        </View>

        <View style={styles.Wrapper}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Image
              source={require('../../assets/svg/password-logo.svg')}
              style={{ width: 72, height: 72 }}
            />
          </View>
          <TextWrapper style={styles.title}>{t('requirePassword')}</TextWrapper>
          {isWrongPassword ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 25,
              }}
            >
              <TouchableOpacity onPress={() => setLoginError(false)}>
                <Text style={{ fontSize: 12, fontWeight: 300, color: '#EA4335' }}>
                  {isWrongPassword}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 25,
              }}
            ></View>
          )}
          <View
            style={{
              ...styles.userNameInputWrraper,
              borderColor: isWrongPassword
                ? '#FF0000'
                : isFocused || password.length > 0
                  ? 'black'
                  : '#E2DCD5',
              backgroundColor: isWrongPassword
                ? '#fde9e8c7'
                : isFocused || password.length > 0
                  ? 'white'
                  : '#E2DCD5',
            }}
          >
            <TextInput
              style={{
                ...styles.userNameInput,
                color: isWrongPassword ? '#FF0000' : 'black',
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              secureTextEntry={passwordVisible}
              placeholder="*****"
              placeholderTextColor={'black'}
              value={password}
              onChangeText={setPassword}
            />
            {passwordVisible ? (
              <Feather
                name="eye"
                onPress={() => setPasswordVisible(!passwordVisible)}
                size={24}
                color="black"
              />
            ) : (
              <Feather
                onPress={() => setPasswordVisible(!passwordVisible)}
                name="eye-off"
                size={24}
                color="black"
              />
            )}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity
              onPress={() => {
                router.push('/reset-password');
              }}
              style={{ borderBottomWidth: 1, borderBottomColor: 'black' }}
            >
              <TextWrapper style={{ fontSize: 16, fontWeight: 300, color: 'black' }}>
                {t('forgotPassword')}
              </TextWrapper>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 14,
          position: 'absolute',
          bottom: 40,
          width: windowWidth,
        }}
      >
        <TouchableOpacity
          onPress={signWithPassword}
          disabled={loading}
          style={{
            flexDirection: 'row',
            paddingVertical: 17,
            alignItems: 'center',
            borderRadius: 31,
            backgroundColor: '#181818',
            justifyContent: 'center',
          }}
        >
          {loading ? (
            <ActivityIndicator size={'small'} color={'#ffffff'} />
          ) : (
            <TextWrapper style={{ fontSize: 16, color: 'white' }}>{t('continue')}</TextWrapper>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({
  Wrapper: {
    paddingHorizontal: 14,
    marginTop: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 600,
    textAlign: 'center',
  },
  verificationCodeWrraper: {
    paddingHorizontal: 16,
    marginTop: 41,
  },
  VerficationLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  VerfiCationInput: {
    marginTop: 20,
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
  },
  Btn: {
    color: '#FFFFFF',
    alignItems: 'center',
    width: '100%',
  },
  userNameInputWrraper: {
    flexDirection: 'row',
    marginTop: 8,
    borderRadius: 15,
    borderWidth: 1,
    padding: 8,
    paddingVertical: 12,
    paddingRight: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userNameInput: {
    width: '100%',
    paddingHorizontal: 8,
    fontSize: 16,
    color: 'black',
  },
});
