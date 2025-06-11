import { Entypo } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

import { getConversations, removeHistory } from '@/actions';
import { HeaderBar, TextWrapper } from '@/components';
import { CheckRemove } from '@/sections';
import { useAppStore } from '@/store';
import { TConversation } from '@/types';

export default function ConversationsScreen() {
  const { t } = useTranslation();
  const [removeOption, setRemoveOption] = useState<number>();
  const [conversationHistory, setConversationHistory] = useState<TConversation[]>([]);
  const [detailId, setDetailId] = useState(-1);
  const userInfo = useAppStore((state) => state.userInfo);
  const animation = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const ConversationLogoIcon = '../../assets/svg/conversationsLogo.svg';
  const MarkIcon = '../../assets/svg/reactangleMark.svg';
  const JourneyIcon = '../../assets/svg/journey.svg';

  const fetchConversations = async () => {
    try {
      if (!userInfo.id) return;

      const response = await getConversations();
      setConversationHistory(response.data);
    } catch (error) {}
  };

  const removeConversation = async (id: number) => {
    try {
      var response = await removeHistory(id);
      if (response.status === 200 || response.status === 201) {
        setConversationHistory((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeAnimation = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    fetchConversations();
    return () => closeAnimation();
  }, [userInfo]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.animatedContainer, { opacity: animation }]}>
        <HeaderBar
          title={
            <View style={styles.headerTitle}>
              <Image source={require(ConversationLogoIcon)} style={styles.logo} />
              <TextWrapper style={styles.headerText}>{t('conversations')}</TextWrapper>
            </View>
          }
          // ignoreButtons={['conversations']}
        />

        <View style={styles.newConversationContainer}>
          <TouchableOpacity
            onPress={() => router.push('/home/begin-journy')}
            style={styles.newConversationButton}
          >
            <Image source={require(JourneyIcon)} style={styles.journeyImage} />
            <TextWrapper style={styles.newConversationText}>{t('beginYourJourney')}</TextWrapper>
          </TouchableOpacity>
        </View>

        <ScrollView overScrollMode="never" contentContainerStyle={styles.scrollContainer}>
          <View style={styles.recentConversationsContainer}>
            <TextWrapper style={styles.recentConversationsTitle}>
              {t('recentConversations')}
            </TextWrapper>
            {conversationHistory.map((item, index) => (
              <Pressable
                key={item.id}
                style={styles.conversationWrapper}
                onPress={() =>
                  router.push(
                    `/home/begin-journy?conversationId=${item.id}&itemId=${item.itemId}&readingId=${item.readingId}`,
                  )
                }
              >
                <View style={styles.conversationContent}>
                  <View style={styles.conversationHeader}>
                    <Image source={require(MarkIcon)} style={styles.markIcon} />
                    <TextWrapper style={styles.conversationTitle}>
                      {item?.title.slice(0, 50)}...
                    </TextWrapper>
                    <Entypo
                      name="controller-record"
                      size={5}
                      color="black"
                      style={styles.recordDot}
                    />
                    <TextWrapper style={styles.conversationTime}>
                      {item.createdAt?.toString().slice(0, 10)}
                    </TextWrapper>
                  </View>
                  <TextWrapper style={styles.conversationText}>
                    {detailId === index ? item?.title : `${item?.title.slice(0, 55)}...`}
                  </TextWrapper>
                </View>
                <Menu>
                  <MenuTrigger style={styles.menuTrigger}>
                    <View style={styles.menuIcon}>
                      <Entypo name="dots-three-vertical" size={14} color="black" />
                    </View>
                  </MenuTrigger>
                  <MenuOptions>
                    <MenuOption onSelect={() => setRemoveOption(item.id)}>
                      <TextWrapper style={styles.menuText}>{t('remove')}</TextWrapper>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </Animated.View>
      {removeOption && (
        <CheckRemove
          close={() => setRemoveOption(undefined)}
          callback={() => removeOption && removeConversation(removeOption)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F2EA',
  },
  animatedContainer: {
    flex: 1,
  },
  headerTitle: {
    alignItems: 'center',
    width: 170,
  },
  logo: {
    marginLeft: 5,
    width: 77,
    height: 77,
  },
  headerText: {
    fontSize: 14,
    textAlign: 'center',
  },
  newConversationContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  newConversationButton: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#181818',
    borderRadius: 24,
    padding: 10,
    alignItems: 'center',
    borderColor: '#ffffff57',
    borderWidth: 0.5,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  newConversationText: {
    fontSize: 18,
    color: '#F8F2EA',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  recentConversationsContainer: {
    paddingHorizontal: 14,
    paddingTop: 20,
    width: '100%',
  },
  recentConversationsTitle: {
    fontSize: 13,
    paddingLeft: 5,
  },
  conversationWrapper: {
    backgroundColor: '#F2E7D9',
    padding: 8,
    marginVertical: 8,
    borderRadius: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 9,
  },
  conversationContent: {
    flexDirection: 'column',
    width: '93%',
    margin: 8,
  },
  conversationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 4,
  },
  markIcon: {
    width: 22,
    height: 22,
  },
  journeyImage: {
    width: 21,
    height: 27,
  },
  conversationTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#0A0A0A',
    marginLeft: 8,
  },
  recordDot: {
    paddingHorizontal: 4,
  },
  conversationTime: {
    color: '#686662',
    fontSize: 12,
  },
  conversationText: {
    fontSize: 13,
    fontWeight: '300',
    lineHeight: 22,
    color: '#0A0A0A',
  },
  menuTrigger: {
    right: 12,
    position: 'relative',
  },
  menuIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#F8F2EA',
  },
  menuText: {
    fontSize: 16,
    padding: 7,
  },
});
