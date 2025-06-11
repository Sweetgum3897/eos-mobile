import { Image } from 'expo-image';
import { useNavigation, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { InputBase, TextWrapper } from '@/components';

import { useAppStore } from '../../store';

const BackIcon = '../../assets/svg/back.svg';
const AstralAvatar = '../../assets/svg/astral-avatar.svg';
const UserIcon = '../../assets/svg/user-icon.svg';
const NoteIcon = '../../assets/svg/note-icon.svg';
const NoteIconBlack = '../../assets/svg/nextIcon2.svg';
const PointIcon = '../../assets/svg/point.svg';

const DisplaySetScreen = () => {
  const { t } = useTranslation();
  const windowWidth = Dimensions.get('screen').width;
  const insets = useSafeAreaInsets();

  const router = useRouter();
  const navigation = useNavigation();

  const [data, setData] = useState([
    'What new project or adventure are you eager to start?',
    'How do you express your leadership qualities in daily life?',
    'Describe a recent moment when you acted on impulse.',
    'How do you prefer to channel your high energy?',
  ]);
  const [color, setColor] = useState('red');
  const [fullName, setFullName] = useState('');
  const userInfo = useAppStore((state) => state.userInfo);
  const setUserInfo = useAppStore((state) => state.setUserInfo);

  const displayName = () => {
    userInfo.color = color;
    userInfo.fullname = fullName;
    setUserInfo(userInfo);
    router.push('/register-password');
  };
  return (
    <View
      style={{
        width: windowWidth,
        height: '100%',
        backgroundColor: '#F8F2EA',
      }}
    >
      <View style={styles.Wrapper}>
        <View
          style={{
            width: '100%',
            paddingLeft: 15,
            paddingBottom: 20,
            paddingTop: insets.top,
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity onPress={navigation.goBack}>
            <Image source={require(BackIcon)} style={{ width: 11, height: 14 }} />
          </TouchableOpacity>
        </View>

        <View style={{ ...styles.Wrraper, marginTop: 0 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Image source={require(AstralAvatar)} style={{ width: 62, height: 62 }} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TextWrapper style={{ fontSize: 32, color: '#4F4D4A' }}>{t('username')}</TextWrapper>
          </View>
          <View style={styles.InputWrraper}>
            <TextWrapper
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: '400',
                marginLeft: 15,
              }}
            >
              {t('name')}
            </TextWrapper>
            <View style={{ position: 'relative' }}>
              <InputBase
                renderIcon={() => (
                  <Image source={require(UserIcon)} style={{ width: 20, height: 20 }} />
                )}
                onChangeText={(newText) => setFullName(newText)}
                value={fullName}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 5,
            }}
          >
            <Image source={require(NoteIcon)} style={{ width: 20, height: 20 }} />
            <TextWrapper style={{ paddingLeft: 5 }}>{t('nameDescription')}</TextWrapper>
          </View>

          <View style={{ flexDirection: 'column', paddingTop: 60 }}>
            {data.map((content, key) => {
              return (
                <TouchableOpacity key={key} style={styles.ListWraper}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require(PointIcon)} style={{ width: 6, height: 6 }} />
                    <TextWrapper style={{ fontSize: 14, paddingLeft: 8 }}>{content}</TextWrapper>
                  </View>
                  <Image source={require(NoteIconBlack)} style={{ width: 22, height: 16 }} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
      <View style={{ position: 'absolute', bottom: 30 }}>
        <TouchableOpacity
          style={styles.Btn}
          onPress={() => {
            displayName();
          }}
        >
          <TextWrapper
            style={{
              color: '#FFFFFF',
              fontSize: 14,
              fontWeight: 600,
              textAlign: 'center',
              width: '100%',
            }}
          >
            {t('continue')}
          </TextWrapper>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DisplaySetScreen;

const styles = StyleSheet.create({
  Wrapper: {
    position: 'absolute',
    color: '#FFFFF',
    top: 0,
    width: '100%',
    paddingTop: 10,
  },
  Wrraper: {
    paddingHorizontal: 14,
    marginTop: 12,
  },

  Input: {
    width: 74,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFF00',
    borderWidth: 0.5,
  },
  Btn: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderRadius: 36,
    backgroundColor: '#181818',
    borderWidth: 0.6,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 400,
    textAlign: 'center',
    alignItems: 'center',
    marginHorizontal: 26,
    boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  },
  InputWrraper: {
    marginTop: 14,
  },
  imputStyle: {
    fontSize: 16,
    // height: 45,
    paddingVertical: 10,
    marginTop: 10,
    borderColor: 'black',
    backgroundColor: '#181818',
    fontFamily: 'PatrickHand',
    borderRadius: 14,
    borderWidth: 1,
    fontWeight: '300',
    paddingHorizontal: 10,
    color: '#FFFFFF',
  },
  ListWraper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: '#C5C5C5',
    boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    marginTop: 15,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#B7B7B7',
    alignItems: 'center',
    height: 50,
  },
});
