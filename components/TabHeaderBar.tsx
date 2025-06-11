import { Image } from 'expo-image';
import { usePathname, useRouter } from 'expo-router';
import { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CopilotStep, walkthroughable } from 'react-native-copilot';

import { useAppStore } from '@/store';

const cursorIcon1 = '../assets/svg/home/cursorIcon1.svg';
const settingIcon1 = '../assets/svg/home/settingIcon1.svg';
const ConversationIcon = '../assets/svg/conversations.svg';
const NotificationIcon = '../assets/svg/notification.svg';

const WalkthroughableText = walkthroughable(Text);

export const TabHeaderBar = ({
  title,
  onPressButton1,
}: {
  title: string | ReactNode;
  onPressButton1: () => void;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const notifications = useAppStore((store) => store.notifications);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 14,
          alignItems: 'center',
          marginTop: 15,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '30%',
          }}
        >
          <TouchableOpacity onPress={() => onPressButton1()} style={{ paddingHorizontal: 3 }}>
            <CopilotStep text="It's showing stellar guidance." order={1} name="step1">
              <WalkthroughableText>
                <Image source={require(cursorIcon1)} style={{ width: 50, height: 50 }} />
              </WalkthroughableText>
            </CopilotStep>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingHorizontal: 3 }}
            onPress={() => {
              router.push('/settings');
            }}
          >
            <CopilotStep text="It's showing stellar guidance." order={2} name="step2">
              <WalkthroughableText>
                <Image source={require(settingIcon1)} style={{ width: 50, height: 50 }} />
              </WalkthroughableText>
            </CopilotStep>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 95 }}>{title}</View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-end',
            width: '30%',
            position: 'relative',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{ paddingHorizontal: 3 }}
              onPress={() => {
                if (pathname !== '/home/conversations') {
                  router.push('/home/conversations');
                }
              }}
            >
              <CopilotStep text="You can jump to conversation at here!" order={3} name="step3">
                <WalkthroughableText>
                  <Image source={require(ConversationIcon)} style={{ width: 50, height: 50 }} />
                </WalkthroughableText>
              </CopilotStep>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingHorizontal: 3,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
              onPress={() => {
                if (pathname !== '/home/notification') {
                  router.push('/home/notification');
                }
              }}
            >
              <CopilotStep text="This is notification" order={4} name="step4">
                <WalkthroughableText>
                  <Image source={require(NotificationIcon)} style={{ width: 50, height: 50 }} />
                </WalkthroughableText>
              </CopilotStep>
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
