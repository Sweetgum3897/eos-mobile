import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
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

export default function AddFriendScreen() {
  const { t } = useTranslation();

  const [result, setResult] = useState('');
  const windowWidth = Dimensions.get('screen').width;
  const windowHeight = Dimensions.get('screen').height;
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [showType, setShowType] = useState('quick');
  const [friendPhoneNumber, setFriendPhoneNumber] = useState('');
  const [friendManualRequestResult, setFriendManualRequestResult] = useState({
    success: true,
    message: '',
  });
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

  const userInfo = useAppStore((state) => state.userInfo);

  const getContacts = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();
        setContacts(data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addFriendManually = async () => {
    if (!userInfo.id) return;
    const user = allUsers.find((user, ind) => user.phonenumber === friendPhoneNumber);
    if (user) {
      const result = await handleFriendRequest(user.id!);
      if (result) {
        setFriendManualRequestResult({
          success: true,
          message: t('Sent friend request!'),
        });
      } else {
        setFriendManualRequestResult({
          success: false,
          message: t('Failed friend request!'),
        });
      }
    } else {
      setFriendManualRequestResult({
        success: false,
        message: t('Friend does not exists'),
      });
    }
  };

  const handleFriendRequest = async (friendId: number) => {
    if (!userInfo.id) return;
    try {
      const res = await sendFriendRequest(friendId);
      if (res.status === 200) {
        refresh();
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserItems = () => {
    if (showType === 'quick') {
      return allUsers
        .filter((user) => !user.friends?.[0]?.accepted)
        .map((user, index) => {
          return (
            <View style={styles.userWrraper} key={index}>
              <View style={{ flexDirection: 'row' }}>
                <TextWrapper style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 400 }}>
                  {user.fullname}
                </TextWrapper>
                <Text style={{ color: '#C6C6C7', fontSize: 14, fontWeight: 400 }}>
                  {user.username}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View style={styles.userContainer}>
                  <View>
                    <TextWrapper style={styles.userItemText}>{t('inYourContacts')}</TextWrapper>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleFriendRequest(user.id!)}
                    disabled={(user.friends?.length || 0) > 0}
                    style={{
                      backgroundColor: '#555555',
                      borderRadius: 10,
                      paddingHorizontal: 14,
                      paddingVertical: 4,
                    }}
                  >
                    <TextWrapper style={{ fontSize: 14, color: 'white' }}>
                      {(user.friends?.length || 0) > 0 ? t('pending') : t('add')}
                    </TextWrapper>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        });
    } else if (showType === 'contact') {
      return contacts.map((item, index) => {
        const user = allUsers.find(
          (user) =>
            user.phonenumber &&
            item.phoneNumbers?.map((phoneNumber) => phoneNumber.number)?.includes(user.phonenumber),
        );
        return (
          <View style={styles.userWrraper} key={index}>
            <View style={{ flexDirection: 'row' }}>
              <TextWrapper style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 400 }}>
                {item.firstName} {item.lastName}
              </TextWrapper>
              <TextWrapper style={{ color: '#C6C6C7', fontSize: 14, fontWeight: 400 }}>
                @{item.nickname}
              </TextWrapper>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={styles.userContainer}>
                <View>
                  <TextWrapper style={styles.userItemText}>{t('inYourContacts')}</TextWrapper>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    if (user) {
                      sendFriendRequest(user.id!);
                    }
                  }}
                  disabled={(user?.friends?.length || 0) > 0}
                  style={{
                    backgroundColor: '#555555',
                    borderRadius: 10,
                    paddingHorizontal: 14,
                    paddingVertical: 4,
                  }}
                >
                  <TextWrapper style={{ fontSize: 14, color: 'white' }}>
                    {(user?.friends?.length || 0) > 0
                      ? t(user?.friends?.[0].accepted ? 'accepted' : 'pending')
                      : t('add')}
                  </TextWrapper>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      });
    } else if (showType === 'manually') {
      return (
        <View>
          <View style={styles.inputGroup}>
            <TextWrapper
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: '#FFFF',
                padding: 8,
              }}
            >
              {t('phoneNumber')}
            </TextWrapper>
            <TextWrapper
              style={{
                fontSize: 10,
                color: friendManualRequestResult.success ? '#FFFFFF' : '#f22f46',
              }}
            >
              {friendManualRequestResult.message}
            </TextWrapper>
            <PhoneInput
              defaultCode="US"
              layout="first"
              placeholder={t('requireMobileNumber')}
              withDarkTheme
              withShadow
              autoFocus
              textContainerStyle={{
                backgroundColor: 'transparent',
                paddingVertical: 10,
                paddingHorizontal: 3,
              }}
              textInputStyle={{
                borderColor: '#FFFFFF',
                borderLeftWidth: 1,
                paddingLeft: 3,
                fontSize: 16,
                backgroundColor: 'transparent',
                color: '#FFFFFF',
              }}
              containerStyle={{
                width: '100%',
                backgroundColor: 'transparent',
                borderColor: '#FFFFFF',
                borderWidth: 1,
                alignItems: 'center',
              }}
              textInputProps={{
                keyboardType: 'phone-pad',
                placeholderTextColor: '#FFFFFF',
              }}
              codeTextStyle={{
                color: '#FFFFFF',
                marginRight: 3,
                marginLeft: -20,
              }}
              disableArrowIcon={true}
              countryPickerProps={{
                renderFlagButton: (props: any) => {
                  return <Flag countryCode={props.countryCode} flagSize={DEFAULT_THEME.flagSize} />;
                },
              }}
              onChangeText={(text) => {
                setFriendPhoneNumber(text);
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#5F66FD',
              borderRadius: 67,
              paddingVertical: 14,
              marginBottom: 70,
              marginVertical: 20,
              width: '100%',
            }}
            onPress={addFriendManually}
          >
            <TextWrapper
              style={{
                color: '#FFFFFF',
                fontSize: 14,
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              {t('addFriends')}
            </TextWrapper>
          </TouchableOpacity>
        </View>
      );
    }
  };

  useEffect(() => {
    setFriendManualRequestResult({ success: true, message: '' });
  }, [friendPhoneNumber]);

  useEffect(() => {
    setFriendManualRequestResult({ success: true, message: '' });
    if (showType == 'contact') {
      getContacts();
    }
  }, [showType]);

  return (
    <ScrollView
      style={{
        width: windowWidth,
        height: windowHeight,
      }}
    >
      <View
        style={{
          width: windowWidth,
          backgroundColor: '#11131A',
          backgroundPosition: ' center top' /* horizontal vertical */,
          height: windowHeight,
        }}
      >
        <HeaderBar title={'Add friend'} />

        <View
          style={{
            flexDirection: 'column',
            paddingHorizontal: 16,
            paddingVertical: 21,
            height: '93%',
          }}
        >
          <View style={{ flexDirection: 'row', position: 'relative' }}>
            <TextInput
              style={{
                borderRadius: 10,
                borderTopLeftRadius: 0,
                padding: 10,
                backgroundColor: '#ffffff0c',
                borderColor: '#ffffff57',
                width: '100%',
                borderWidth: 0.5,
              }}
              onChangeText={(text) => setResult(text)}
              value={result}
              placeholder={t('search')}
              placeholderTextColor={'white'}
            />
            <View
              style={{
                borderRadius: 50,
                backgroundColor: '#555555',
                position: 'absolute',
                right: 10,
                top: 10,
              }}
            ></View>
          </View>
          <TouchableOpacity
            onPress={() => setShowType('contact')}
            style={{
              flexDirection: 'row',
              paddingVertical: 6,
              marginTop: 18,
            }}
          >
            <AntDesign name="contacts" size={18} color="#F79F00" />
            <TextWrapper style={{ color: '#FFFFFF', fontSize: 14, marginLeft: 5 }}>
              {t('addFromContact')}
            </TextWrapper>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowType('manually')}
            style={{
              flexDirection: 'row',
              paddingVertical: 6,
              marginBottom: 8,
            }}
          >
            <MaterialIcons name="lock" size={18} color="#F79F00" />
            <TextWrapper style={{ color: '#FFFFFF', fontSize: 14, marginLeft: 5 }}>
              {t('addManually')}
            </TextWrapper>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <TextWrapper
              style={{
                color: '#555555',
                fontSize: 16,
                fontWeight: 500,
                marginTop: 16,
              }}
            >
              {showType === 'quick' && t('quickAdd')}
              {showType === 'contact' && t('contactAdd')}
              {showType === 'manually' && t('manuallyAdd')}
            </TextWrapper>
          </View>
          <ScrollView overScrollMode="never">
            <View
              style={{
                flexDirection: 'column',
                marginVertical: 10,
              }}
            >
              {getUserItems()}
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  userWrraper: {
    flexDirection: 'column',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#A19D9D',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    justifyContent: 'space-between',
    width: '100%',
  },
  username: {
    // color: "#FFFFFF",
    fontWeight: 400,
    fontSize: 16,
    marginBottom: 10,
  },
  userItems: {
    flexDirection: 'row',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userItemText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 400,
  },
  controlWrapper: {
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'column',
    marginVertical: 95,
  },
  inputGroup: {
    flexDirection: 'column',
    marginVertical: 7,
  },
  Input: {
    fontSize: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    color: '#FFFFFF',
    padding: 8,
    height: 48,
  },
  switchWrraper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    height: 24,
    alignItems: 'center',
  },
});
