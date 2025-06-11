import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

import { TextWrapper } from '@/components';
import { HeaderSection } from '@/sections';
import { useAppStore } from '@/store';

const Add = '../../assets/svg/friends/add.svg';
const AstrologicalActivityFeed = '../../assets/svg/friends/astrologicalActivity_feed.svg';
const Compatability = '../../assets/svg/friends/compatability.svg';
const FriendList = '../../assets/svg/friends/friendList.svg';
const Logo = '../../assets/svg/friends/logo.svg';
const shareToSocials = '../../assets/svg/friends/shareTo_socials.svg';
const zodiacaBirthDayAlerts = '../../assets/svg/friends/zodiacBirthday_alerts.svg';

export default function FriendScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const windowWidth = Dimensions.get('screen').width;
  const userInfo = useAppStore((store) => store.userInfo);

  return (
    <GestureHandlerRootView>
      <View
        style={{
          width: windowWidth,
          zIndex: 1000000000000000,
          height: '100%',
          backgroundColor: '#F8F2EA',
        }}
      >
        <HeaderSection title={<Image source={require(Logo)} style={{ width: 80, height: 80 }} />} />
        <ScrollView
          style={{
            height: '100%',
            width: '100%',
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 16,
              paddingBottom: 5,
            }}
          >
            <View style={styles.tabrow}>
              <TouchableOpacity
                onPress={() => {
                  const birthdayAlertOptin = userInfo.settings?.find(
                    (setting) => setting.settingId === 10 && setting.enable,
                  );
                  if (birthdayAlertOptin) {
                    router.push('/friends/birthday-alerts');
                  } else {
                    router.push('/friends/birthday-alerts-optin');
                  }
                }}
                style={styles.tabpanel}
              >
                <View style={styles.tabSvgWrapper}>
                  <Image
                    source={require(zodiacaBirthDayAlerts)}
                    style={{ width: 84, height: 84 }}
                  />
                </View>
                <TextWrapper style={{ fontSize: 17, textAlign: 'center' }}>
                  {t('zodiacBirthdayAlerts')}
                </TextWrapper>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tabpanel}
                onPress={() => {
                  router.push('/friends/astrological-feed');
                }}
              >
                <View style={styles.tabSvgWrapper}>
                  <Image
                    source={require(AstrologicalActivityFeed)}
                    style={{ width: 84, height: 84 }}
                  />
                </View>
                <TextWrapper style={{ fontSize: 17, textAlign: 'center' }}>
                  {t('astrologicalActivityFeed')}
                </TextWrapper>
              </TouchableOpacity>
            </View>
            <View style={styles.tabrow}>
              <TouchableOpacity
                onPress={() => router.push('/friends/search')}
                style={styles.tabpanel}
              >
                <View style={styles.tabSvgWrapper}>
                  <Image source={require(Add)} style={{ width: 84, height: 84 }} />
                </View>
                <TextWrapper style={{ fontSize: 17 }}>{t('add')}</TextWrapper>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tabpanel}
                onPress={() => router.push('/friends/compatability')}
              >
                <View style={styles.tabSvgWrapper}>
                  <Image source={require(Compatability)} style={{ width: 84, height: 84 }} />
                </View>
                <TextWrapper style={{ fontSize: 17 }}>{t('compatability')}</TextWrapper>
              </TouchableOpacity>
            </View>
            <View style={styles.tabrow}>
              <TouchableOpacity
                onPress={() => router.push('/friends/list')}
                style={styles.tabpanel}
              >
                <View style={styles.tabSvgWrapper}>
                  <Image source={require(FriendList)} style={{ width: 84, height: 84 }} />
                </View>
                <TextWrapper
                  style={{
                    fontSize: 17,
                    textAlign: 'center',
                  }}
                >
                  {t('friendsList')}
                </TextWrapper>
              </TouchableOpacity>

              <TouchableOpacity style={styles.tabpanel}>
                <View style={styles.tabSvgWrapper}>
                  <Image source={require(shareToSocials)} style={{ width: 84, height: 84 }} />
                </View>
                <TextWrapper
                  style={{
                    fontSize: 17,
                    textAlign: 'center',
                  }}
                >
                  {t('shareToSocials')}
                </TextWrapper>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  userCardWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 31,
    paddingVertical: 15,
    marginHorizontal: 15,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    width: '90%',
    top: -157,
  },
  userAvatar: {
    flexDirection: 'row',
    borderRadius: 110,
    width: 110,
    height: 110,
    alignItems: 'center',
    position: 'absolute',
    top: -50,
  },
  userWrapper: {
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
    // color: "#FFFFFF",
    fontSize: 16,
    // fontWeight: 400,
    // marginLeft: 5,
    width: '100%',
    // height: 100,
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
  tabSvgWrapper: {
    width: 80,
    height: 80,
    position: 'relative',
  },
  tabname: {
    fontSize: 17,
    textAlign: 'center',
    padding: 2,
  },
  tabrow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingTop: 10,
  },
  tabpanel: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#F2E7D9',
    width: '46%',
    height: 150,
    padding: 18,
    // paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 5,

    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.3)',

    // Shadow for Android
    elevation: 5,
  },
});
