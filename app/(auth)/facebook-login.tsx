import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { TextWrapper } from '@/components';

const LockLgo = '../../assets/svg/lock-logo.svg';
const FaceBookIcon = '../../assets/svg/facebock-icon.svg';
const ChatIcon = '../../assets/svg/chat-icon.svg';
const EmailIcon = '../../assets/svg/emailwhite.svg';

export default function FaceBookScreen() {
  const { t } = useTranslation();

  const windowWidth = Dimensions.get('screen').width;
  const windowHeight = Dimensions.get('screen').height;
  const router = useRouter();

  return (
    <View
      style={{
        backgroundColor: '#F8F2EA',
        width: windowWidth,
        height: windowHeight,
      }}
    >
      <ScrollView style={{ width: '100%', flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 85,
          }}
        >
          <Image source={require(LockLgo)} style={{ width: 82, height: 82 }} />
        </View>
        <Text style={styles.title}>{t('logInSignUp')}</Text>
        <View
          style={{
            flexDirection: 'row',
            padding: 14,
            marginTop: 30,
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              padding: 14,
              backgroundColor: '#686662',
              borderRadius: 15,
              width: '100%',
              ...styles.shadow,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Image source={require(FaceBookIcon)} style={{ width: 46, height: 46 }} />
            </View>
            <TextWrapper
              style={{
                fontSize: 24,
                color: 'white',
                paddingVertical: 4,
                textAlign: 'center',
              }}
            >
              {t('signInViaFacebookUnavailable')}
            </TextWrapper>
            <TextWrapper
              style={{
                fontSize: 15,
                color: 'white',
                paddingVertical: 10,
                textAlign: 'center',
              }}
            >
              {t('canResetPasswordIfConnectedPhone')}
            </TextWrapper>
            <TouchableOpacity style={styles.sendBtn}>
              <Image source={require(ChatIcon)} style={{ width: 20, height: 20 }} />
              <TextWrapper
                style={{
                  fontSize: 15,
                  fontWeight: '400',
                  color: 'black',
                  paddingLeft: 5,
                }}
              >
                {t('contactSupport')}
              </TextWrapper>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/login')}
              style={[styles.sendBtn, { backgroundColor: 'black' }]}
            >
              <Image source={require(EmailIcon)} style={{ width: 20, height: 20 }} />
              <TextWrapper
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#FFFFFF',
                  paddingLeft: 5,
                }}
              >
                {t('signInViaEmail')}
              </TextWrapper>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ ...styles.steps, paddingTop: 80 }}>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <TextWrapper
              style={{
                textAlign: 'center',
                width: '100%',
                color: '#181818',
                fontSize: 20,
                textDecorationLine: 'underline',
              }}
            >
              {t('close')}
            </TextWrapper>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  steps: {
    width: '100%',
    paddingTop: 60,
    paddingHorizontal: 8,
  },
  header: {},
  title: {
    flexDirection: 'row',
    color: '#181818',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '400',
    fontFamily: 'PatrickHand',
  },
  description: {
    flexDirection: 'row',
    color: '#181818',
    fontSize: 17,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 24,
    paddingHorizontal: 20,
    fontFamily: 'PatrickHand',
  },
  inputGroup: {
    marginTop: 28,
  },
  label1: {
    flexDirection: 'row',
    fontSize: 16,
    fontWeight: '500',
    color: '#181818',
    fontFamily: 'PatrickHand',
    marginVertical: 5,
  },
  error: {
    fontSize: 10,
    color: '#f22f46',
    fontFamily: 'PatrickHand',
  },
  InputCtrl: {
    fontSize: 14,
    borderRadius: 8,
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
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#181818',
    backgroundColor: '#181818',
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
    backgroundColor: 'white',
    marginTop: 24,
    paddingVertical: 15,
    paddingHorizontal: 8,
  },
  continueBtn: {
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181818',
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
