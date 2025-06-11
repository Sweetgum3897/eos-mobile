import { Image } from 'expo-image';
import { useNavigation } from 'expo-router';
import moment from 'moment';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { acceptResponse, rejectResponse } from '@/actions';
import { GradientCard, TextWrapper } from '@/components';
import { useAppStore } from '@/store';

const backIcon = '../../assets/svg/back.svg';

export default function Notifications() {
  const { t } = useTranslation();

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const userInfo = useAppStore((state) => state.userInfo);
  const notifications = useAppStore((state) => state.notifications);
  const setNotifications = useAppStore((state) => state.setNotifications);
  const [detailIndex, setDetailIndex] = useState(-1);

  const animateFade = useRef(new Animated.Value(0)).current;

  const onAccept = async (requesterId: number, notifyId: number) => {
    if (!userInfo.id) {
      return;
    }
    try {
      var res = await acceptResponse(requesterId, notifyId);
      if (res.status === 200) {
        setNotifications(
          notifications.filter((n) => {
            return n.id !== notifyId;
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onReject = async (requesterId: number, notifyId: number) => {
    if (!userInfo.id) {
      return;
    }
    try {
      var res = await rejectResponse(requesterId, notifyId);
      if (res.status === 200) {
        setNotifications(
          notifications.filter((n) => {
            return n.id !== notifyId;
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F2EA' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginTop: insets.top,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={navigation.goBack}
        >
          <Image source={require(backIcon)} style={{ width: 20, height: 20 }} />
          <TextWrapper
            style={{
              fontSize: 19,
              fontWeight: '500',
              marginLeft: 10,
              marginRight: 4,
            }}
          >
            {t('notifications')}
          </TextWrapper>
        </TouchableOpacity>
      </View>
      <ScrollView overScrollMode="never" style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'column',
            paddingHorizontal: 16,
            paddingBottom: 70,
            // marginTop: 50,
            width: '100%',
          }}
        >
          {notifications.map((notification, i) => (
            <GradientCard colors={['#464646', '#464646']} style={styles.conversationWraper} key={i}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={{ fontSize: 12, fontWeight: 300, color: 'white' }}>
                  {moment(notification.createdAt).format('DD/MM/YY hh:mm ')}
                </Text>
              </View>
              {notification.type == 1 ? (
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 8,
                  }}
                >
                  <Text style={styles.notificationContant}>{notification.content}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      width: '100%',
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        padding: 8,
                        borderRadius: 14,
                        backgroundColor: '#686662',
                      }}
                      onPress={() => onAccept(notification.createdBy, notification.id)}
                    >
                      <Text style={{ fontSize: 14, color: 'white' }}>{t('accept')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        padding: 8,
                        borderRadius: 14,
                        backgroundColor: '#686662',
                      }}
                      onPress={() => onReject(notification.createdBy, notification.id)}
                    >
                      <Text style={{ fontSize: 14, color: 'white' }}>{t('reject')}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <>
                  <Animated.View style={{ opacity: i == detailIndex ? animateFade : 1 }}>
                    <Text style={styles.notificationContant}>
                      {notification.content.length > 50
                        ? i == detailIndex
                          ? notification.content
                          : String(notification.content).substring(0, 50) + '...'
                        : notification.content}
                    </Text>
                  </Animated.View>

                  {String(notification.content).length > 50 && i == detailIndex ? (
                    <TouchableOpacity onPress={() => setDetailIndex(-1)}>
                      <Text style={{ color: '#FDE74D', fontSize: 13 }}>{t('less')}</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setDetailIndex(i)}>
                      <Text style={{ color: '#FDE74D', fontSize: 13 }}>More</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </GradientCard>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conversationWraper: {
    backgroundColor: '#464646',
    padding: 8,
    marginVertical: 8,
    borderRadius: 10,
    width: '100%',
    flexDirection: 'column',
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: -0.17,
    color: 'white',
  },
  notificationContant: {
    fontSize: 12,
    fontWeight: 300,
    letterSpacing: -0.17,
    lineHeight: 22,
    color: 'white',
  },
});
