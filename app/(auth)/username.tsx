import { Image } from 'expo-image';
import { useNavigation, useRouter } from 'expo-router';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { verifyExistsUser } from '@/actions';
import { TextWrapper } from '@/components';
import { IUsernameValidation, usernameValidation } from '@/utils/validators';

import { useAppStore } from '../../store';

const UsernameScreen = () => {
  const { t } = useTranslation();
  const windowWidth = Dimensions.get('screen').width;
  const windowHeight = Dimensions.get('screen').height;
  const router = useRouter();
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const userInfo = useAppStore((state) => state.userInfo);
  const setUserInfo = useAppStore((state) => state.setUserInfo);
  const [loading, setLoading] = useState(false);

  const [isWrongUsername, setIsWrongUsername] = useState('');
  const [isFocused, setIsFocused] = useState(false); // State to track focus

  const handleSubmit = async (data: IUsernameValidation) => {
    try {
      setLoading(true);
      const result = await verifyExistsUser({
        username: data.username,
      }).catch((e) => {
        return e.response;
      });
      if (result.status === 200 || (result.status === 201 && !result.data.exists)) {
        setUserInfo({
          ...userInfo,
          username: data.username,
        });
        router.push('/register-password');
      } else if (result.data.exists) {
        setIsWrongUsername(t('usernameAlreadyExists'));
      } else {
        setIsWrongUsername(t('UNKOWN_ERROR'));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{ username: '' }}
      validationSchema={usernameValidation}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, status }) => (
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            flexDirection: 'column',
            gap: 30,
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
              {t('username')}
            </TextWrapper>
          </View>
          <View style={{ flexDirection: 'column', gap: 10 }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../../assets/svg/password-logo.svg')}
                style={{ width: 72, height: 72 }}
              />
              <TextWrapper style={styles.title}>{t('enterUsername')}</TextWrapper>
            </View>
          </View>
          <View style={{ flexDirection: 'column', gap: 10 }}>
            {touched.username && errors.username ? (
              <TextWrapper style={{ color: 'red' }}>{errors.username}</TextWrapper>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 25,
                }}
              >
                <Image
                  source={require('../../assets/svg/note-icon.svg')}
                  style={{ width: 17, height: 17 }}
                />
                <TextWrapper style={{ fontSize: 12, paddingLeft: 5 }}>
                  {t('onlyLetterNumberAndUnderscore')}
                </TextWrapper>
              </View>
            )}
            <View
              style={{
                ...styles.userNameInputWrapper,
                borderColor: isWrongUsername ? '#FF0000' : isFocused ? 'black' : '#E2DCD5',
                backgroundColor: isWrongUsername ? '#fde9e8c7' : isFocused ? 'white' : '#E2DCD5',
              }}
            >
              <TextInput
                placeholder="Username"
                onChangeText={handleChange('username')}
                placeholderTextColor={'#4F4D4A'}
                onBlur={handleBlur('username')}
                value={values.username}
                style={{
                  ...styles.userNameInput,
                  color: isWrongUsername ? '#FF0000' : 'black',
                }}
              />
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 14,
              position: 'absolute',
              bottom: 80,
              width: windowWidth,
            }}
          >
            <TouchableOpacity
              disabled={loading}
              style={{
                flexDirection: 'row',
                paddingVertical: 17,
                alignItems: 'center',
                borderRadius: 31,
                backgroundColor: '#181818',
                justifyContent: 'center',
              }}
              onPress={() => handleSubmit()}
            >
              {loading ? (
                <ActivityIndicator size={'small'} color={'#ffffff'} />
              ) : (
                <TextWrapper style={{ fontSize: 16, color: 'white' }}>{t('continue')}</TextWrapper>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default UsernameScreen;

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
  Input: {
    // width: 74,
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
  userNameInputWrapper: {
    marginTop: 8,
    borderRadius: 15,
    borderWidth: 1,
    padding: 5,
  },
  userNameInput: {
    width: '100%',
    paddingHorizontal: 8,
    fontSize: 16,
    color: 'black',
  },
});
