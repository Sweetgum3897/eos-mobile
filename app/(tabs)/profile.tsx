import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { Point } from 'react-native-google-places-autocomplete';

import { update as updateUserInfo, uploadAvatar } from '@/actions';
import { CustomAlertModal, EmailInput, InputBase, SearchLocation, TextWrapper } from '@/components';
import { HeaderSection } from '@/sections';
import { useAppStore } from '@/store';

const DateIcon = '../../assets/svg/date-icon.svg';
const DateTimeIcon = '../../assets/svg/date-time-icon.svg';
const FemaleIcon = '../../assets/svg/female.svg';
const LocationIcon = '../../assets/svg/location-icon.svg';
const MaleIcon = '../../assets/svg/male.svg';
const MaleOrFemale = '../../assets/svg/male_female.svg';
const PhoneIconSvg = '../../assets/svg/phone.svg';
const AriesIcon = '../../assets/svg/profile/aries.svg';
const Gemini = '../../assets/svg/profile/gemini.svg';
const TaurusIcon = '../../assets/svg/profile/taurus.svg';

export type TError = {
  username?: boolean;
  phoneNumber?: boolean;
  birthPlace?: boolean;
};

export default function ProfileScreen() {
  const windowWidth = Dimensions.get('screen').width;
  const { t } = useTranslation();

  const userInfo = useAppStore((state) => state.userInfo);
  const setUserInfo = useAppStore((state) => state.setUserInfo);
  const [avatar, setAvatar] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [birthdate, setBirthDate] = useState(new Date());
  const [birthtime, setBirthTime] = useState(new Date());
  const [selectGender, setGender] = useState<string | undefined>();
  const [birthPlace, setBirthPlace] = useState<string | undefined>();
  const [nameEditable, setNameEditable] = useState(false);
  const [geometry, setGeometry] = useState<Point | undefined>();
  const [utcOffset, setUTCOffset] = useState<number | undefined>();
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const keys = useAppStore((store) => store.keys);

  const onBirthDateChage = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatepicker(false);
    if (!selectedDate) {
      return;
    }

    const dobDate = new Date(selectedDate);
    const today = new Date();
    if (dobDate >= today) {
      setModalText(t('Date of Birth must be in the past'));
      setVisibleModal(true);
      return;
    }

    setBirthDate(selectedDate);
  };
  const onBirthTimeChange = (event: DateTimePickerEvent, selectTime?: Date) => {
    setShowTimepicker(false);
    if (!selectTime) {
      return;
    }
    setBirthTime(selectTime);
  };

  const [isShowDatepicker, setShowDatepicker] = useState(false);
  const [isShowTimepicker, setShowTimepicker] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);

  const handleFileSelect = async () => {
    if (!userInfo.id) {
      return;
    }
    try {
      const imagePermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (imagePermission.status !== 'granted') {
        setModalText(t('Permission to access camera roll is required!'));
        setVisibleModal(true);
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });

      if (!result.canceled) {
        const fileInfo = result.assets[0];
        const fileExtension = fileInfo.fileName?.slice(fileInfo.fileName.lastIndexOf('.'));
        const response = await uploadAvatar(fileInfo.uri, fileExtension as string, userInfo.id);
        if (response.status) {
          setUserInfo({
            ...userInfo,
            avatar: response.data,
          });
        } else {
          setModalText(t('File upload error'));
          setVisibleModal(true);
        }
      }
    } catch (error) {
      console.log(error);
      setModalText(t('File selection error'));
      setVisibleModal(true);
    }
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      setModalText(t('Permission Required', 'We need access to your camera to take pictures.'));
      setVisibleModal(true);
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // setImage(result.assets[0].uri);
    } else {
    }
  };

  const handleSave = async () => {
    try {
      if (username === '') {
        setModalText(t('Warning', 'Username is required'));
        setVisibleModal(true);
        return;
      }
      if (phoneNumber === '') {
        setModalText(t('Warning', 'PhoneNumber is required'));
        setVisibleModal(true);
        return;
      }
      if (birthPlace === '' || birthPlace === undefined) {
        setModalText(t('Warning', 'Birthplace is required'));
        setVisibleModal(true);
        return;
      }

      birthdate.setHours(birthtime.getHours());
      birthdate.setMinutes(birthtime.getMinutes());
      birthdate.setSeconds(birthtime.getSeconds());
      const updatedUserInfo = {
        email: userInfo.email,
        username: username,
        birth: moment(birthdate).format('YYYY-MM-DD h:mm:s'),
        phonenumber: phoneNumber,
        gender: selectGender === 'male',
        birthplace: birthPlace,
        utcoffset: utcOffset,
        geometryLat: geometry?.lat || userInfo.geometryLat,
        geometryLng: geometry?.lng || userInfo.geometryLng,
      };

      const response = await updateUserInfo(updatedUserInfo);
      if (response.status) {
        setUserInfo({
          ...userInfo,
          ...updatedUserInfo,
        });
        setModalText(t('Updated successfully!'));
        setVisibleModal(true);
      } else {
        setModalText(t('Internal server error!'));
        setVisibleModal(true);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (userInfo.username) {
      setUsername(userInfo.username);
    }
  }, [userInfo.username]);

  useEffect(() => {
    if (userInfo.phonenumber) {
      setPhoneNumber(userInfo.phonenumber);
    }
  }, [userInfo.phonenumber]);

  useEffect(() => {
    if (userInfo.email) {
      setEmail(userInfo.email);
    }
  }, [userInfo.email]);

  useEffect(() => {
    if (userInfo.avatar) {
      setAvatar(userInfo.avatar);
    }
  }, [userInfo.avatar]);

  useEffect(() => {
    if (userInfo.birth) {
      setBirthDate(new Date(userInfo.birth));
    }
  }, [userInfo.birth]);

  useEffect(() => {
    if (userInfo.birthplace) {
      setBirthPlace(userInfo.birthplace);
    }
  }, [userInfo.birthplace]);

  useEffect(() => {
    setGender(
      userInfo.gender === true ? 'male' : userInfo.gender === false ? 'female' : 'noAnswer',
    );
  }, [userInfo.gender]);

  return (
    <GestureHandlerRootView>
      <View
        style={{
          width: windowWidth,
          flex: 1,
          backgroundColor: '#F8F2EA',
          backgroundPosition: ' center top' /* horizontal vertical */,
        }}
      >
        <ScrollView overScrollMode="never">
          <HeaderSection title={<></>} />

          <View
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              paddingHorizontal: 14,
            }}
          >
            <View
              style={{
                width: '100%',
                marginTop: 60,
                position: 'relative',
                flexDirection: 'column',
                borderRadius: 16,
                backgroundColor: '#686662',
                // overflow:"hidden",
                borderWidth: 1,
                borderColor: 'black',
              }}
            >
              <View style={styles.userCardWrapper}>
                <View style={styles.userAvatar}>
                  <TouchableOpacity onPressIn={handleFileSelect}>
                    <View style={{ width: 103, height: 103, overflow: 'hidden' }}>
                      <Image
                        source={{ uri: `${keys.imageServer}/${avatar}` }}
                        style={{ width: 103, height: 103 }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                {nameEditable ? (
                  <TouchableWithoutFeedback onBlur={() => setNameEditable(false)}>
                    <TextInput
                      style={styles.username}
                      value={username || ''}
                      onChangeText={(newText: string) => setUsername(newText)}
                      placeholder=""
                    />
                  </TouchableWithoutFeedback>
                ) : (
                  <TouchableOpacity onPress={() => setNameEditable(true)}>
                    <Text
                      style={{
                        fontSize: 18,
                        marginTop: 50,
                        fontWeight: 700,
                        color: '#F8F2EA',
                      }}
                    >
                      {username || t('Enter your username')}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                // backgroundColor: "#C5C5C5",
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
              }}
            >
              <View style={styles.userWrapper}>
                <View style={styles.userItems}>
                  <View style={styles.userItem}>
                    <Image source={require(AriesIcon)} style={{ width: 20, height: 20 }} />
                    <TextWrapper style={styles.userItemText}>{t('aries')}</TextWrapper>
                  </View>
                  <View style={styles.userItem}>
                    <Image source={require(TaurusIcon)} style={{ width: 20, height: 20 }} />
                    <TextWrapper style={styles.userItemText}>{t('taurus')}</TextWrapper>
                  </View>
                  <View style={styles.userItem}>
                    <Image source={require(Gemini)} style={{ width: 20, height: 20 }} />
                    <TextWrapper style={styles.userItemText}>{t('gemini')}</TextWrapper>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 0 }}>
                <TextWrapper style={{ color: 'black', fontSize: 14, fontWeight: 300 }}>
                  {t('phone')}
                </TextWrapper>
                <InputBase
                  value={phoneNumber || ''}
                  onChangeText={(newText) => setPhoneNumber(newText)}
                  renderIcon={() => {
                    return (
                      <Image source={require(PhoneIconSvg)} style={{ width: 20, height: 20 }} />
                    );
                  }}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <TextWrapper style={{ color: 'black', fontSize: 14, fontWeight: 300 }}>
                  {t('email')}
                </TextWrapper>
                <EmailInput emailId={email || ''} setEmailId={setEmail} editable={false} />
              </View>
              <View style={{ marginTop: 10 }}>
                <TextWrapper style={{ color: 'black', fontSize: 14, fontWeight: 300 }}>
                  {t('birthday')}
                </TextWrapper>
                {isShowDatepicker && (
                  <DateTimePicker mode="date" value={birthdate} onChange={onBirthDateChage} />
                )}
                <TouchableOpacity
                  onPress={() => {
                    setShowDatepicker(true);
                  }}
                >
                  <InputBase
                    renderIcon={() => (
                      <Image source={require(DateIcon)} style={{ width: 20, height: 20 }} />
                    )}
                    value={birthdate.toLocaleDateString()}
                    renderInput={() => {
                      return (
                        <TextWrapper
                          style={{
                            color: 'black',
                            paddingLeft: 10,
                            fontSize: 16,
                            fontWeight: '300',
                          }}
                        >
                          {birthdate.toLocaleDateString()}
                        </TextWrapper>
                      );
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ paddingTop: 10 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  {isShowTimepicker && (
                    <DateTimePicker mode="time" value={birthtime} onChange={onBirthTimeChange} />
                  )}

                  <TextWrapper style={{ fontSize: 14, fontWeight: 300 }}>
                    {t('birthtime')}
                  </TextWrapper>

                  <TextWrapper style={{ color: '#1F9333', fontSize: 14, fontWeight: 300 }}>
                    {t('optional')}
                  </TextWrapper>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setShowTimepicker(true);
                  }}
                >
                  <InputBase
                    renderIcon={() => (
                      <Image source={require(DateTimeIcon)} style={{ width: 20, height: 20 }} />
                    )}
                    value={birthtime.toLocaleTimeString()}
                    placeholder=""
                    renderInput={() => (
                      <TextWrapper
                        style={{
                          color: 'black',
                          fontSize: 16,
                          fontWeight: '300',
                          paddingLeft: 10,
                        }}
                      >
                        {birthtime.toLocaleTimeString()}
                      </TextWrapper>
                    )}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 10 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    // justifyContent: "space-between",
                  }}
                >
                  <TextWrapper style={{ color: 'black', fontSize: 14, fontWeight: 300 }}>
                    {t('birthplace')}
                  </TextWrapper>
                </View>
                <InputBase
                  renderIcon={() => (
                    <TouchableOpacity onPress={() => setLocationModalVisible(true)}>
                      <Image source={require(LocationIcon)} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                  )}
                  value={birthPlace || ''}
                  onChangeText={(value) => setBirthPlace(value)}
                />
              </View>
              <View style={{ flexDirection: 'column', marginTop: 10 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: 5,
                  }}
                >
                  <TextWrapper
                    style={{
                      color: 'black',
                      fontSize: 14,
                      fontWeight: 300,
                    }}
                  >
                    {t('requireGender')}
                  </TextWrapper>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setGender('male');
                    }}
                    style={[
                      styles.genderWrapper,
                      selectGender === 'male' ? styles.genderActive : styles.genderDefault,
                    ]}
                  >
                    <View style={{ width: 43, height: 42 }}>
                      <Image source={require(MaleIcon)} style={{ width: 43, height: 43 }} />
                    </View>
                    <TextWrapper style={{ color: 'black', fontSize: 14 }}>{t('male')}</TextWrapper>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.genderWrapper,
                      selectGender === 'female' ? styles.genderActive : styles.genderDefault,
                    ]}
                    onPress={() => {
                      setGender('female');
                    }}
                  >
                    <View style={{ width: 43, height: 42 }}>
                      <Image source={require(FemaleIcon)} style={{ width: 43, height: 43 }} />
                    </View>
                    <TextWrapper style={{ color: 'black', fontSize: 14 }}>
                      {t('female')}
                    </TextWrapper>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.genderWrapper,
                      selectGender == 'noAnswer' ? styles.genderActive : styles.genderDefault,
                    ]}
                    onPress={() => {
                      setGender('noAnswer');
                    }}
                  >
                    <View style={{ width: 43, height: 42 }}>
                      <Image source={require(MaleOrFemale)} style={{ width: 43, height: 43 }} />
                    </View>
                    <TextWrapper style={{ color: 'black', fontSize: 14 }}>
                      {t('noAnswer')}
                    </TextWrapper>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
              paddingVertical: 10,
            }}
          >
            <TouchableOpacity
              onPress={handleSave}
              style={{
                flexDirection: 'row',
                position: 'relative',
                justifyContent: 'center',
                borderRadius: 24,
                backgroundColor: '#181818',
                padding: 12,
                width: '70%',
              }}
            >
              <TextWrapper style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>
                {t('Save')}
              </TextWrapper>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <SearchLocation
          visible={locationModalVisible}
          setVisible={setLocationModalVisible}
          setBirthPlace={setBirthPlace}
          setUTCOffset={setUTCOffset}
          setGeometry={setGeometry}
        />
        <CustomAlertModal
          isVisible={visibleModal}
          onBackdropPress={() => setVisibleModal(!visibleModal)}
          text={modalText}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  userCardWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    // paddingHorizontal: 31,
    paddingVertical: 15,
  },
  userAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 110,
    width: 110,
    height: 110,
    backgroundColor: '#0f0f0f',
    // alignItems: 'center',
    position: 'absolute',
    top: -50,
    overflow: 'hidden',
  },
  userWrapper: {
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
  },
  username: {
    fontWeight: 400,
    fontSize: 16,
    marginTop: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  userItems: {
    flexDirection: 'row',
    paddingHorizontal: 0,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  userItemText: {
    marginLeft: 5,
  },
  controlWrapper: {
    // width: "100%",
  },
  inputGroup: {
    flexDirection: 'column',
    marginVertical: 5,
  },
  Input: {
    // color: "#FFFFFF",
    fontSize: 16,
    // fontWeight: 400,
    // marginLeft: 5,
    borderRadius: 6,
    width: '100%',
    // height: 100,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#181818',
    color: '#FFFFFF',
    fontFamily: 'PatrickHand',
    // padding: 8,
    paddingLeft: 20,
    height: 48,
  },
  switchWrraper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    height: 24,
    alignItems: 'center',
  },
  genderWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 15,
  },
  genderActive: {
    borderColor: 'black',
    backgroundColor: 'white',
  },
  genderDefault: {
    backgroundColor: '#E2DCD5',
    borderColor: '#E2DCD5',
  },
});
