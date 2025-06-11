import { Image } from 'expo-image';
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { changePassword as changePasswordAction } from '@/actions';
import { CustomAlertModal, InputBase, TextWrapper } from '@/components';
import { isValidPassword } from '@/utils/validators';

const ReturnIconSvg = '../../assets/svg/returnIcon.svg';
const BackIcon = '../../assets/svg/back.svg';
const LockIconSvg = '../../assets/svg/lock.svg';
const ConfirmLogoSvg = '../../assets/svg/confirm.svg';

const ChangePasswordScreen = () => {
  const { t } = useTranslation();
  const windowWidth = Dimensions.get('screen').width;
  const windowHeight = Dimensions.get('screen').height;
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  const [isWrongPassword, setIsWrongPassword] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [successChangePassword, setSuccessChangePassword] = useState(false); // State to track focus

  useEffect(() => {
    const messages = isValidPassword(password);
    setMessages(messages);
  }, [password]);

  useEffect(() => {
    if (confirmPassword !== password) {
      setIsWrongPassword(t('INVALID_CONFIRM_PASSWORD'));
    } else {
      setIsWrongPassword('');
    }
  }, [confirmPassword]);

  const changePassword = async () => {
    try {
      if (password === '') {
        setIsWrongPassword(t('EMPTY_PASSWORD'));
        return;
      }

      if (password !== confirmPassword) {
        // setIsWrongPassword(t('INVALID_CONFIRM_PASSWORD'));
        return;
      }

      if (messages.length > 0) {
        // setIsWrongPassword(t('INVALID_PASSWORD_REG'));
        return;
      }
      setLoading(true);
      const result = await changePasswordAction({
        password,
      });
      if (result.status === 200 || result.status === 201) {
        setSuccessChangePassword(true);
      } else if (result.status === 404) {
        setModalVisible(true);
      } else {
        setIsWrongPassword(t('PASSWORD_CHANGE_FAILED'));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  if (successChangePassword) {
    return (
      <SuccessChangedPassword
        back={() => {
          setSuccessChangePassword(false);
        }}
      />
    );
  } else {
    return (
      <View
        style={{
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
          }}
        >
          <TouchableOpacity onPress={navigation.goBack}>
            <Image source={require(BackIcon)} style={{ width: 11, height: 14 }} />
          </TouchableOpacity>
          <TextWrapper
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginLeft: 15,
            }}
          >
            {t('resetYourPassword')}
          </TextWrapper>
        </View>

        <View style={styles.Wrraper}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ width: 110, height: 110 }}>
              <Image source={require(ReturnIconSvg)} style={{ width: 110, height: 110 }} />
            </View>
          </View>

          <TextWrapper style={styles.title}>Reset Your Password</TextWrapper>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TextWrapper style={{ fontSize: 14 }}>{t('enterNewPassword')}</TextWrapper>
          </View>

          <InputBase
            renderIcon={() => (
              <Image source={require(LockIconSvg)} style={{ width: 22, height: 22 }} />
            )}
            onChangeText={setPassword}
            placeholder={t('ENTER_NEW_PASSWORD')}
            value={password}
            type={'password'}
          />
          {messages.map((message: string, ind: number) => (
            <View
              key={ind}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 25,
              }}
            >
              <TextWrapper style={{ fontSize: 12, fontWeight: 300, color: '#EA4335' }}>
                - {message}
              </TextWrapper>
            </View>
          ))}

          <InputBase
            renderIcon={() => (
              <Image source={require(LockIconSvg)} style={{ width: 22, height: 22 }} />
            )}
            onChangeText={setConfirmPassword}
            placeholder={t('CONFIRM_PASSWORD')}
            value={confirmPassword}
            type={'password'}
          />
          {isWrongPassword && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 25,
              }}
            >
              <TextWrapper style={{ fontSize: 12, fontWeight: 300, color: '#EA4335' }}>
                {isWrongPassword}
              </TextWrapper>
            </View>
          )}

          <TouchableOpacity
            onPress={changePassword}
            disabled={loading}
            style={{
              flexDirection: 'row',
              paddingVertical: 17,
              marginVertical: 20,
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
        <CustomAlertModal
          text={t('USER_NOT_FOUND')}
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
        />
      </View>
    );
  }
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  Wrraper: {
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
  },
  userNameInput: {
    width: '100%',
    paddingHorizontal: 8,
    fontSize: 16,
    color: 'black',
  },
});

export const SuccessChangedPassword = ({ back }: { back: () => void }) => {
  const { t } = useTranslation();
  const windowWidth = Dimensions.get('screen').width;
  const windowHeight = Dimensions.get('screen').height;
  const router = useRouter();
  const goPage = () => {
    router.push('/login');
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
          <Image source={require(BackIcon)} style={{ width: 11, height: 14 }} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingVertical: 18,
        }}
      >
        <View style={{ width: 158, height: 158 }}>
          <Image source={require(ConfirmLogoSvg)} style={{ width: 158, height: 158 }} />
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TextWrapper style={styles.title}>{t('resetPasswordSuccess')}</TextWrapper>
      </View>

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
              color: '#F8F2EA',
              fontSize: 18,
              textAlign: 'center',
            }}
          >
            {t('signInNow')}
          </TextWrapper>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
