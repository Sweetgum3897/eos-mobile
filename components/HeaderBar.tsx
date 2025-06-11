import { Image } from 'expo-image';
import { useNavigation, usePathname, useRouter } from 'expo-router';
import { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppStore } from '@/store';

const BackIcon = '../assets/svg/back.svg';
const ConversationIcon = '../assets/svg/conversations.svg';
const NotificationIcon = '../assets/svg/notification.svg';

export const HeaderBar = ({
  title,
  igonreButtons,
}: {
  title: string | ReactNode;
  igonreButtons?: string[];
}) => {
  const navigation = useNavigation();
  const pathname = usePathname();
  const router = useRouter();
  const notifications = useAppStore((store) => store.notifications);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        zIndex: 1,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 4,
          marginTop: insets.top + 10,
        }}
      >
        <View style={{ padding: 10, paddingTop: 18, height: '100%' }}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Image source={require(BackIcon)} style={{ width: 21, height: 21 }} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {title}
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-end',
            position: 'relative',
            paddingTop: 5,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {igonreButtons && igonreButtons.indexOf('conversations') > -1 ? null : (
              <TouchableOpacity
                onPress={() => {
                  if (pathname !== '/home/conversations') {
                    router.push('/home/conversations');
                  }
                }}
              >
                <Image source={require(ConversationIcon)} style={{ width: 50, height: 50 }} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{
                padding: 1,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                marginLeft: 5,
              }}
              onPress={() => {
                if (pathname !== '/home/notification') {
                  router.push('/home/notification');
                }
              }}
            >
              <Image source={require(NotificationIcon)} style={{ width: 48, height: 48 }} />
              {notifications.length > 0 ? (
                <View
                  style={{
                    position: 'absolute',
                    width: 20,
                    height: 20,
                  }}
                >
                  <View
                    style={{
                      position: 'absolute',
                      top: -15,
                      right: -15,
                      backgroundColor: 'red',
                      borderRadius: 10,
                      width: 20,
                      height: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 12,
                        fontWeight: 'bold',
                      }}
                    >
                      {notifications.length}
                    </Text>
                  </View>
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
