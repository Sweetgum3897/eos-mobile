import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { CustomAlertModal, HeaderBar, TextWrapper } from '@/components';
import { useAllFriends } from '@/hooks/useAllFriends';
import { useAppStore } from '@/store';
import { TFriend } from '@/types';

const friendsList = '../../assets/svg/friends/friendsList.svg';

export default function FriendsListScreen() {
  const { t } = useTranslation();

  const [searchUsername, setSearchUsername] = useState<string>('');
  const keys = useAppStore((store) => store.keys);
  const [friends, setFriends] = useState<TFriend[]>([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalText, setModalText] = useState('');

  const {
    data: allFriends,
    isLoading,
    isError,
  }: { data: TFriend[]; isLoading: boolean; isError: boolean } = useAllFriends();

  useEffect(() => {
    if (!searchUsername) setFriends(allFriends);
    if (searchUsername) {
      const users = allFriends.filter((item: TFriend) => item?.username?.includes(searchUsername));

      setFriends(users);
    }
  }, [allFriends, searchUsername]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#F8F2EA',
      }}
    >
      <HeaderBar
        title={
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: 80, height: 80 }}>
              <Image source={require(friendsList)} style={{ width: 86, height: 86 }} />
            </View>
          </View>
        }
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
          width: '100%',
        }}
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
      <ScrollView overScrollMode="never" style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 14, paddingBottom: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingVertical: 3,
            }}
          >
            <TextWrapper style={{ fontSize: 18 }}>{`${t('friends')}:`}</TextWrapper>
          </View>
          {friends.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  marginTop: 8,
                  padding: 5,
                  alignItems: 'center',
                  borderRadius: 5,
                  borderWidth: 1.5,
                  borderColor: '#181818',
                }}
              >
                <View style={{ width: '70%' }}>
                  <TextWrapper style={{ paddingHorizontal: 5, fontSize: 15 }}>
                    {`${item.username} / ${item.email}`}
                  </TextWrapper>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        source={`${keys.imageServer}/sunsign/${item.sunsign}`}
                        style={{ width: 29, height: 23 }}
                      />
                      <TextWrapper>{item.sunsign}</TextWrapper>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 7 }}>
                      <Image
                        source={`${keys.imageServer}/moonsign/${item.moonsign}`}
                        style={{ width: 22, height: 22 }}
                      />
                      <TextWrapper>{item.moonsign}</TextWrapper>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 7 }}>
                      <Image
                        source={`${keys.imageServer}/rising/${item.rising}`}
                        style={{ width: 25, height: 25 }}
                      />
                      <TextWrapper>{item.rising}</TextWrapper>
                    </View>
                  </View>
                </View>
                <View style={{ width: '30%' }}>
                  <TouchableOpacity
                    style={{
                      padding: 5,
                      backgroundColor: '#181818',
                      borderRadius: 6,
                    }}
                  >
                    <TextWrapper
                      style={{
                        fontSize: 18,
                        color: 'white',
                        textAlign: 'center',
                      }}
                    >
                      {t('_compatibility')}
                    </TextWrapper>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <CustomAlertModal
        isVisible={visibleModal}
        onBackdropPress={() => setVisibleModal(false)}
        text={modalText}
      />
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
