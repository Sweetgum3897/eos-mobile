import { Image } from 'expo-image';
import { Tabs } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { ManageSubscription } from '@/sections';
import { useAppStore } from '@/store';

const HomeIcon = '../../assets/svg/menu/home.svg';
const ReadingIcon = '../../assets/svg/menu/reading.svg';
const NatalChartIcon = '../../assets/svg/menu/natal.svg';
const FriendIcon = '../../assets/svg/menu/friend.svg';
const CelestialGuideIcon = '../../assets/svg/menu/guide.svg';
const userAvatar = '../../assets/svg/menu/user.svg';

export default function TabLayout() {
  const { t } = useTranslation();

  const { visibleManageSubscription, setVisibleManageSubscription } = useAppStore((state) => state);
  return (
    <>
      {visibleManageSubscription && (
        <ManageSubscription close={() => setVisibleManageSubscription(false)} />
      )}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            backgroundColor: '#F8F2EA',
            height: 77,
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 4px 50px 0px #00000059',
            paddingTop: 8,
          },
          tabBarLabel: ({ focused, children }: { focused: boolean; children: string }) => {
            if (focused) {
              return (
                <View style={{ alignItems: 'center' }}>
                  <Text
                    style={{
                      color: '#686662',
                      paddingVertical: 3,
                      fontSize: 10,
                      fontFamily: 'PatrickHand',
                    }}
                  >
                    {children}
                  </Text>
                  <View
                    style={{ width: 22, height: 4, borderRadius: 10, backgroundColor: '#000000' }}
                  ></View>
                </View>
              );
            }
            return (
              <Text
                style={{
                  color: '#686662',
                  paddingTop: 3,
                  fontSize: 10,
                  fontFamily: 'PatrickHand',
                }}
              >
                {children}
              </Text>
            );
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t('home'),
            tabBarIcon: () => {
              return <Image source={require(HomeIcon)} style={{ width: 32, height: 32 }} />;
            },
          }}
        />
        <Tabs.Screen
          name="daily-reading"
          options={{
            title: t('daily'),
            tabBarIcon: () => {
              return <Image source={require(ReadingIcon)} style={{ width: 32, height: 32 }} />;
            },
          }}
        />
        <Tabs.Screen
          name="chat-directory"
          options={{
            title: t('chart'),
            tabBarIcon: () => {
              return <Image source={require(NatalChartIcon)} style={{ width: 32, height: 32 }} />;
            },
          }}
        />
        <Tabs.Screen
          name="partners"
          options={{
            title: t('partners'),
            tabBarIcon: () => {
              return (
                <Image source={require(CelestialGuideIcon)} style={{ width: 32, height: 32 }} />
              );
            },
          }}
        />
        <Tabs.Screen
          name="friends"
          options={{
            title: t('friends'),
            tabBarIcon: () => {
              return <Image source={require(FriendIcon)} style={{ width: 32, height: 32 }} />;
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: t('profile'),
            tabBarIcon: () => {
              return <Image source={require(userAvatar)} style={{ width: 32, height: 32 }} />;
            },
          }}
        />
      </Tabs>
    </>
  );
}
