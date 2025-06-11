import { Image } from 'expo-image';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { DEFAULT_THEME, Flag } from 'react-native-country-picker-modal';
import PhoneInput from 'react-native-phone-number-input';

import { sendFriendRequest } from '@/actions';
import { HeaderBar, TextWrapper } from '@/components';
import { useAllUsers } from '@/hooks/useAllUsers';
import { useAppStore } from '@/store';
import { TUserInfo } from '@/types';
import { IPhoneNumberValidation, phoneNumberValidation } from '@/utils/validators';

type TManualResult = {
  success: boolean;
  message: string;
};

export default function SearchFriendScreen() {
  const { t } = useTranslation();

  const userInfo = useAppStore((state) => state.userInfo);
  const { typeAddFriend, setTypeAddFriend } = useAppStore();

  const {
    data: allUsers,
    isLoading,
    isError,
    refresh,
  }: {
    data: TUserInfo[];
    isLoading: boolean;
    isError: boolean;
    refresh: () => void;
  } = useAllUsers();
  const [contact, setContact] = useState<TUserInfo[]>([]);
  const [searchUsername, setSearchUsername] = useState<string>('');
  const [loadingFriend, setLoadingFriend] = useState<number | null>(null);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const [manualResult, setManualResult] = useState<TManualResult>({
    success: true,
    message: '',
  });

  const handleSubmit = async (data: IPhoneNumberValidation) => {
    if (userInfo?.id) {
      try {
        setIsLoadingSubmit(true);
        const user = allUsers.find((user, ind) => user.phonenumber === data.phoneNumber);
        if (user) {
          const result = await sendFriendRequest(user.id!);

          if (result.status === 200 || result.status === 201) {
            setManualResult({
              success: true,
              message: t('Sent friend request!'),
            });
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingSubmit(false);
      }
    }
  };

  const addFriend = async (friendId: number) => {
    if (userInfo.id) {
      try {
        setLoadingFriend(friendId);
        const res = await sendFriendRequest(friendId);

        if (res.status === 200) {
          refresh();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingFriend(null);
      }
    }
  };

  useEffect(() => {
    if (typeAddFriend === 'from-contact') {
      const users = allUsers.filter((item: TUserInfo) =>
        item?.username?.toLowerCase().includes(searchUsername.toLowerCase()),
      );
      setContact(users);
    }
  }, [typeAddFriend, searchUsername, allUsers]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F2EA' }}>
      <HeaderBar
        title={
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: 80, height: 80 }}>
              <Image
                source={require('../../assets/svg/friends/searchFriend.svg')}
                style={{ width: 85, height: 86 }}
              />
            </View>
          </View>
        }
      />

      <View
        style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, width: '100%' }}
      >
        <View style={styles.searchWrapper}>
          <Image
            source={require('../../assets/svg/home/search.svg')}
            style={styles.searchInputIcon}
          />
          <TextInput
            placeholder={t('search')}
            placeholderTextColor={'white'}
            style={styles.searchInput}
            onChangeText={setSearchUsername}
          />
        </View>
      </View>
      <ScrollView
        overScrollMode="never"
        style={{
          flex: 1,
        }}
      >
        <View style={{ flex: 1, padding: 18, paddingBottom: 20 }}>
          <TouchableOpacity style={styles.typeAdd} onPress={() => setTypeAddFriend('from-contact')}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Image
                source={require('../../assets/svg/friends/contactIcon.svg')}
                style={{ width: 19, height: 22 }}
              />
              <TextWrapper style={{ padding: 5 }}>{t('addFromContact')}</TextWrapper>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.typeAdd} onPress={() => setTypeAddFriend('manually')}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Image
                source={require('../../assets/svg/friends/lock.svg')}
                style={{ width: 19, height: 22 }}
              />
              <TextWrapper style={{ padding: 5 }}>{t('addManually')}</TextWrapper>
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: 'column', gap: 3, marginTop: 10 }}>
            {typeAddFriend === 'from-contact' && (
              <>
                <View style={styles._container}>
                  <TextWrapper style={{ fontSize: 18 }}>{`${t('addFromContact')}:`}</TextWrapper>
                </View>
                {contact.map((item: TUserInfo, index: number) => {
                  return (
                    <View key={index} style={styles.friendItem}>
                      <View style={{ width: '80%' }}>
                        <TextWrapper style={{ paddingHorizontal: 5, fontSize: 15 }}>
                          {`${item.username} / ${item.email}`}
                        </TextWrapper>
                        <View style={{ flexDirection: 'row' }}>
                          <TextWrapper>{t('inYourContacts')}</TextWrapper>
                        </View>
                      </View>
                      <View style={{ width: '20%' }}>
                        <TouchableOpacity
                          disabled={Boolean(loadingFriend)}
                          style={{
                            padding: 5,
                            backgroundColor: '#181818',
                            borderRadius: 6,
                          }}
                          onPress={() => addFriend(item.id!)}
                        >
                          {loadingFriend === item.id ? (
                            <ActivityIndicator size={'small'} color={'#ffffff'} />
                          ) : (
                            <TextWrapper
                              style={{
                                fontSize: 18,
                                color: 'white',
                                textAlign: 'center',
                              }}
                            >
                              {t('add')}
                            </TextWrapper>
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </>
            )}
            {typeAddFriend === 'manually' && (
              <Formik
                initialValues={{ phoneNumber: '' }}
                validationSchema={phoneNumberValidation}
                onSubmit={handleSubmit}
              >
                {({ handleChange, handleSubmit, values, errors, touched, status }) => (
                  <>
                    <View style={{ flexDirection: 'column', marginVertical: 7, gap: 5 }}>
                      <View style={styles._container}>
                        <TextWrapper
                          style={{ fontSize: 18 }}
                        >{`${t('addFromContact')}:`}</TextWrapper>
                      </View>
                      <View style={{ height: 15 }}>
                        {touched.phoneNumber && errors.phoneNumber && (
                          <TextWrapper style={{ color: 'red' }}>
                            {t(errors.phoneNumber)}
                          </TextWrapper>
                        )}
                      </View>
                      <PhoneInput
                        defaultCode="US"
                        layout="first"
                        value={values.phoneNumber}
                        placeholder="123 4567890"
                        textContainerStyle={{
                          flex: 1,
                          backgroundColor:
                            touched.phoneNumber && errors.phoneNumber ? '#fde9e8c7' : 'transparent',
                          paddingVertical: 10,
                          paddingHorizontal: 3,
                        }}
                        textInputStyle={{
                          height: 45,
                          fontFamily: 'PatrickHand',
                          borderLeftWidth: 1,
                          borderLeftColor:
                            touched.phoneNumber && errors.phoneNumber ? 'red' : 'black',
                          paddingLeft: 3,
                          fontSize: 16,
                          backgroundColor:
                            touched.phoneNumber && errors.phoneNumber ? '#fde9e8c7' : 'transparent',
                        }}
                        containerStyle={{
                          width: '100%',
                          backgroundColor:
                            touched.phoneNumber && errors.phoneNumber ? '#fde9e8c7' : 'transparent',
                          borderRadius: 5,
                          borderWidth: 1,
                          borderColor: touched.phoneNumber && errors.phoneNumber ? 'red' : 'black',
                          alignItems: 'center',
                        }}
                        textInputProps={{
                          keyboardType: 'phone-pad',
                        }}
                        codeTextStyle={{
                          fontSize: 16,
                          fontFamily: 'PatrickHand',
                          marginRight: 4,
                          marginLeft: -20,
                        }}
                        disableArrowIcon={true}
                        countryPickerProps={{
                          renderFlagButton: (props: any) => {
                            return (
                              <Flag
                                countryCode={props.countryCode}
                                flagSize={DEFAULT_THEME.flagSize}
                              />
                            );
                          },
                        }}
                        onChangeFormattedText={handleChange('phoneNumber')}
                      />
                      <TextWrapper
                        style={{
                          height: 25,
                          fontSize: 20,
                          marginTop: 20,
                          color: manualResult.success ? 'black' : '#f22f46',
                        }}
                      >
                        {manualResult.message}
                      </TextWrapper>
                      <TouchableOpacity
                        onPress={() => handleSubmit()}
                        disabled={isLoadingSubmit}
                        style={{
                          flexDirection: 'row',
                          paddingVertical: 17,
                          alignItems: 'center',
                          borderRadius: 31,
                          backgroundColor: '#181818',
                          justifyContent: 'center',
                          marginTop: 20,
                        }}
                      >
                        {isLoadingSubmit ? (
                          <ActivityIndicator size={'small'} color={'#ffffff'} />
                        ) : (
                          <TextWrapper style={{ fontSize: 16, color: 'white' }}>
                            {t('addFriend')}
                          </TextWrapper>
                        )}
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </Formik>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#181818',
    borderRadius: 24,
    width: '80%',
    height: 70,
    padding: 8,
    paddingLeft: 15,
  },
  searchInput: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'PatrickHand',
    color: 'white',
    width: '100%',
    fontSize: 16,
  },
  searchInputIcon: {
    width: 22,
    height: 29,
  },
  typeAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 6,
    borderBottomColor: '#181818',
    borderBottomWidth: 2.5,
  },
  _container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 3,
  },
  friendItem: {
    flexDirection: 'row',
    marginTop: 8,
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#181818',
  },
});
