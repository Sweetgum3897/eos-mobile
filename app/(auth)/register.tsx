import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Point } from 'react-native-google-places-autocomplete';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomAlertModal, InputBase, SearchLocation, TextWrapper } from '@/components';

import { useAppStore } from '../../store';

const BackIcon = '../../assets/svg/back.svg';
const AstralAvatar = '../../assets/svg/astral-avatar.svg';
const MaleIcon = '../../assets/svg/male.svg';
const FemaleIcon = '../../assets/svg/female.svg';
const MaleOrFemale = '../../assets/svg/male_female.svg';
const UserIcon = '../../assets/svg/user-icon.svg';
const DateIcon = '../../assets/svg/date-icon.svg';
const DateTimeIcon = '../../assets/svg/date-time-icon.svg';
const LocationIcon = '../../assets/svg/location-icon.svg';

export type TError = {
  username?: boolean;
  birthPlace?: boolean;
};

const RegisterScreen = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const windowWidth = Dimensions.get('screen').width;

  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState('');
  const [birthdate, setBirthdate] = useState(new Date());
  const [birthtime, setBirthTime] = useState(new Date());
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalText, setModalText] = useState('');

  const [isShowDatepicker, setShowDatepicker] = useState(false);
  const [isShowTimepicker, setShowTimepicker] = useState(false);

  const [selectGender, setGender] = useState('male');
  const [birthPlace, setBirthPlace] = useState<string | undefined>('');
  const [geometry, setGeometry] = useState<Point | undefined>();
  const [utcOffset, setUTCOffset] = useState<number | undefined>(0);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [errors, setErrors] = useState<TError>({});

  const userInfo = useAppStore((state) => state.userInfo);
  const setUserInfo = useAppStore((state) => state.setUserInfo);

  const onBirthDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatepicker(false);
    if (!selectedDate) {
      return;
    }

    const dobDate = new Date(selectedDate);
    const today = new Date();
    if (dobDate >= today) {
      setModalText(t('dateOfBirthMustBeInThePast'));
      setVisibleModal(true);
      return;
    }

    setBirthdate(selectedDate);
  };

  const onBirthTimeChange = (event: DateTimePickerEvent, selectTime?: Date) => {
    setShowTimepicker(false);
    if (!selectTime) {
      return;
    }
    setBirthTime(selectTime);
  };

  const onPressSignup = () => {
    const inputErrors: TError = {};
    if (username === '') inputErrors.username = true;
    if (birthPlace === '' || birthPlace === undefined) inputErrors.birthPlace = true;
    if (Object.keys(inputErrors).length) return setErrors(inputErrors);
    else setErrors({});

    birthdate.setHours(birthtime.getHours());
    birthdate.setMinutes(birthtime.getMinutes());
    birthdate.setSeconds(birthtime.getSeconds());
    const newUserinfo = {
      ...userInfo,
      birth: moment(birthdate).format('YYYY-MM-DD h:mm:s'),
      gender: selectGender === 'male',
      birthplace: birthPlace,
      name: username,
      utcoffset: utcOffset,
      geometryLat: geometry?.lat,
      geometryLng: geometry?.lng,
    };
    setLoading(true);
    setUserInfo(newUserinfo);
    router.push('/username');
    setLoading(false);
  };

  return (
    <View
      style={{
        width: windowWidth,
        flex: 1,
        backgroundColor: '#F8F2EA',
        backgroundPosition: ' center top' /* horizontal vertical */,
      }}
    >
      <ScrollView overScrollMode="never">
        <View
          style={{
            width: windowWidth,
            height: '100%',
          }}
        >
          <View style={styles.Wrapper}>
            <TouchableOpacity
              onPress={() => router.push('/login')}
              style={{
                width: '100%',
                paddingLeft: 20,
                paddingBottom: 15,
                paddingTop: insets.top,
                flexDirection: 'row',
              }}
            >
              <Image source={require(BackIcon)} style={{ width: 11, height: 14 }} />
            </TouchableOpacity>

            <View style={{ ...styles.Wrraper, marginTop: 0 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ width: 65, height: 65 }}>
                  <Image source={require(AstralAvatar)} style={{ width: 75, height: 75 }} />
                </View>
              </View>
              <TextWrapper style={styles.description}>{t('registerDescription')}</TextWrapper>
              <View style={styles.InputCtrlWrraper}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <TextWrapper style={{ color: 'black', fontSize: 14, fontWeight: 300 }}>
                    {t('name')}
                  </TextWrapper>
                  <TextWrapper style={{ color: '#CF4949', fontSize: 14, fontWeight: 300 }}>
                    {t('required')}
                  </TextWrapper>
                </View>
                <InputBase
                  value={username}
                  onChangeText={(newText: string) => setUsername(newText)}
                  renderIcon={() => {
                    return <Image source={require(UserIcon)} style={{ width: 20, height: 20 }} />;
                  }}
                  placeholder=""
                  error={errors.username}
                />
              </View>
              <View style={{ paddingTop: 10 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <TextWrapper style={{ color: 'black', fontSize: 14, fontWeight: 300 }}>
                    {t('birthday')}
                  </TextWrapper>
                  <TextWrapper style={{ color: '#CF4949', fontSize: 14, fontWeight: 300 }}>
                    {t('required')}
                  </TextWrapper>
                </View>
                {isShowDatepicker && (
                  <DateTimePicker mode="date" value={birthdate} onChange={onBirthDateChange} />
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
                    placeholder=""
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
              <View style={{ paddingTop: 10 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <TextWrapper style={{ color: 'black', fontSize: 14, fontWeight: 300 }}>
                    {t('birthplace')}
                  </TextWrapper>
                  <TextWrapper style={{ color: '#CF4949', fontSize: 14, fontWeight: 300 }}>
                    {t('required')}
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
                  error={errors.birthPlace}
                />
              </View>
              <View style={{ flexDirection: 'column', paddingTop: 10 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
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
                  <TextWrapper style={{ color: '#CF4949', fontSize: 14, fontWeight: 300 }}>
                    {t('required')}
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
                      selectGender == 'male' ? styles.genderActive : styles.genderDefault,
                    ]}
                  >
                    <View style={{ width: 43, height: 42 }}>
                      <Image source={require(MaleIcon)} style={{ width: 45, height: 45 }} />
                    </View>
                    <TextWrapper style={{ color: 'black', fontSize: 14 }}>{t('male')}</TextWrapper>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.genderWrapper,
                      selectGender == 'female' ? styles.genderActive : styles.genderDefault,
                    ]}
                    onPress={() => {
                      setGender('female');
                    }}
                  >
                    <View style={{ width: 43, height: 42 }}>
                      <Image source={require(FemaleIcon)} style={{ width: 45, height: 45 }} />
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
                      <Image source={require(MaleOrFemale)} style={{ width: 45, height: 45 }} />
                    </View>
                    <TextWrapper style={{ color: 'black', fontSize: 14 }}>
                      {t('noAnswer')}
                    </TextWrapper>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.Btn}
                onPress={() => {
                  onPressSignup();
                }}
              >
                {loading ? (
                  <ActivityIndicator size={'small'} color={'#ffffff'} />
                ) : (
                  <TextWrapper
                    style={{
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 600,
                      textAlign: 'center',
                    }}
                  >
                    {t('continue')}
                  </TextWrapper>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <SearchLocation
          visible={locationModalVisible}
          setVisible={setLocationModalVisible}
          setBirthPlace={(birthPlace?: string | undefined) => setBirthPlace(birthPlace)}
          setUTCOffset={(utcOffset?: number) => setUTCOffset(utcOffset)}
          setGeometry={(geometry?: Point) => setGeometry(geometry)}
        />
      </ScrollView>
      <CustomAlertModal
        isVisible={visibleModal}
        onBackdropPress={() => setVisibleModal(!visibleModal)}
        text={modalText}
      />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  Wrapper: {
    // position: "absolute",
    color: '#FFFFF',
    top: 0,
    width: '100%',
    paddingTop: 10,
  },
  Wrraper: {
    paddingHorizontal: 14,
    marginTop: 20,
  },
  description: {
    color: 'black',
    fontSize: 12,
    fontWeight: 400,
    marginTop: 20,
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
    flexDirection: 'row',
    paddingVertical: 14,
    borderRadius: 36,
    backgroundColor: '#181818',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
  InputCtrlWrraper: {
    marginTop: 14,
    // padding: 8,
  },
  InputCtrl: {
    fontSize: 16,
    height: 50,
    paddingTop: 10,
    fontFamily: 'PatrickHand',
    fontWeight: '300',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    color: '#FFFFFF',
    backgroundColor: '#181818',
    boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    borderStyle: 'solid',
    borderColor: 'rgba(24, 24, 24, 1.0)',
  },
  switch: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
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
