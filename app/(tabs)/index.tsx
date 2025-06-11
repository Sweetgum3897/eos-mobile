import { Image } from 'expo-image';
import { Redirect, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCopilot } from 'react-native-copilot';

import { TextWrapper } from '@/components';
import { CelestialKeys, DiveDeeper, HeaderSection, ReadingInterpretation } from '@/sections';
import { getStorageData, useAppStore } from '@/store';
import { TAppStore } from '@/types';

const FirstMark = '../../assets/svg/first-mark.svg';
const BigDecisionTimingMenuIcon = '../../assets/svg/home/big-decision-timing.svg';
const bookIcon = '../../assets/svg/home/book.svg';
const CareerReadingMenuIcon = '../../assets/svg/home/career-reading.svg';
const DailyReadingMenuIcon = '../../assets/svg/home/daily-reading.svg';
const NatalChartMenuIcon = '../../assets/svg/home/natal-chart-interpretation.svg';
const SynaStryReadingMenuIcon = '../../assets/svg/home/synastry-reading.svg';
const YearAheadReadingMenuIcon = '../../assets/svg/home/year-ahead-reading.svg';

export default function HomeScreen() {
  const { t } = useTranslation();
  const authorized = useAppStore((state: TAppStore) => state.authorized);
  const router = useRouter();
  const { start, copilotEvents } = useCopilot();
  const [visibleCelestialKeys, setVisibleCelestialKeys] = useState(false);
  const [visibleDiveDeeper, setVisibleDiveDeeper] = useState(false);
  const [readingInterpretation, setReadingInterpretation] = useState(false);
  const [showedTooltip, setShowedTooltip] = useState(true);

  const windowWidth = Dimensions.get('screen').width;
  const userInfo = useAppStore((state) => state.userInfo);
  const logout = useAppStore((state) => state.logout);
  const setTooltipVisibility = useAppStore((state) => state.setTooltipVisibility);

  useEffect(() => {
    if (userInfo) {
      if (!userInfo.id) {
        logout();
      }
    }
  }, [userInfo]);

  useEffect(() => {
    if (authorized && userInfo.id && !showedTooltip) {
      start('step1');
    }

    copilotEvents.on('stop', () => {
      setTooltipVisibility(true);
      setShowedTooltip(true);
    });
  }, [authorized, userInfo, showedTooltip]);

  useEffect(() => {
    (async () => {
      const visibleTooltip = (await getStorageData('hidden-tooltip')) === 'true';
      setShowedTooltip(visibleTooltip);
    })();
  }, []);

  if (!authorized) {
    return <Redirect href={'/login'} />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#F8F2EA',
      }}
    >
      <HeaderSection
        title={<Image source={require(FirstMark)} style={{ width: 50, height: 80 }} />}
      />
      <ScrollView
        style={{
          width: windowWidth,
          flex: 1,
        }}
      >
        <View style={{ paddingBottom: 18 }}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingHorizontal: 16,
              borderRadius: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
                // padding: 10,
                position: 'relative',
              }}
            >
              <View style={styles.tabrow}>
                <TouchableOpacity
                  onPress={() => setReadingInterpretation(true)}
                  style={styles.tabpanel}
                >
                  <View style={styles.tabSvgWrapper}>
                    <Image
                      source={require(DailyReadingMenuIcon)}
                      style={{ width: 84, height: 84 }}
                    />
                    <View style={{ position: 'absolute', left: '10%', top: '14%' }}>
                      <Image source={require(bookIcon)} style={{ width: 62, height: 62 }} />
                    </View>
                  </View>
                  <TextWrapper style={{ fontSize: 17 }}>{t('dailyReading')}</TextWrapper>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push('/home/career-reading-interpretation')}
                  style={styles.tabpanel}
                >
                  <View style={styles.tabSvgWrapper}>
                    <Image
                      source={require(CareerReadingMenuIcon)}
                      style={{ width: 84, height: 84 }}
                    />
                  </View>
                  <TextWrapper style={{ fontSize: 17 }}>{t('careerReading')}</TextWrapper>
                </TouchableOpacity>
              </View>
              <View style={styles.tabrow}>
                <TouchableOpacity style={styles.tabpanel}>
                  <View style={styles.tabSvgWrapper}>
                    <Image
                      source={require(SynaStryReadingMenuIcon)}
                      style={{ width: 84, height: 84 }}
                    />
                  </View>
                  <TextWrapper style={{ fontSize: 17 }}>{t('synastryReading')}</TextWrapper>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabpanel}>
                  <View style={styles.tabSvgWrapper}>
                    <Image
                      source={require(BigDecisionTimingMenuIcon)}
                      style={{ width: 84, height: 84 }}
                    />
                  </View>
                  <TextWrapper style={{ fontSize: 17, textAlign: 'center' }}>
                    {t('bigDecisionTiming')}
                  </TextWrapper>
                </TouchableOpacity>
              </View>
              <View style={styles.tabrow}>
                <TouchableOpacity
                  style={styles.tabpanel}
                  onPress={() => router.push('/home/chart?chartName=natal')}
                >
                  <View style={styles.tabSvgWrapper}>
                    <Image source={require(NatalChartMenuIcon)} style={{ width: 84, height: 84 }} />
                  </View>
                  <TextWrapper
                    style={{
                      fontSize: 17,
                      textAlign: 'center',
                    }}
                  >
                    {t('natalChart')}
                  </TextWrapper>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabpanel}>
                  <View style={styles.tabSvgWrapper}>
                    <Image
                      source={require(YearAheadReadingMenuIcon)}
                      style={{ width: 84, height: 84 }}
                    />
                  </View>
                  <TextWrapper
                    style={{
                      fontSize: 17,
                      textAlign: 'center',
                    }}
                  >
                    {t('yearAheadReading')}
                  </TextWrapper>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
            paddingVertical: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => router.push('/home/begin-journy')}
            style={{
              flexDirection: 'row',
              position: 'relative',
              justifyContent: 'center',
              borderRadius: 24,
              backgroundColor: '#181818',
              padding: 12,
              width: '85%',
            }}
          >
            <TextWrapper style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>
              {t('beginYourJourney')}
            </TextWrapper>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {visibleDiveDeeper && <DiveDeeper close={() => setVisibleDiveDeeper(false)} />}
      {visibleCelestialKeys && <CelestialKeys close={() => setVisibleCelestialKeys(false)} />}
      {readingInterpretation && (
        <ReadingInterpretation close={() => setReadingInterpretation(false)} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  intro_content: {
    fontSize: 14,
    fontWeight: 600,
    color: 'white',
    textAlign: 'center',
  },
  intro_card: {
    backgroundColor: '#101E4A',
    padding: 10,
    width: 158,
    borderRadius: 16,
    marginTop: 20,
  },
  right_pos: {
    transform: [{ translateY: 0 }, { translateX: 50 }, { rotate: '18deg' }],
  },
  letf_pos: {
    transform: [{ translateY: 0 }, { translateX: -80 }, { rotate: '-18deg' }],
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 10,
  },
  tabpanel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2E7D9',
    width: '48%',
    padding: 18,
    height: 150,
    // paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 5,

    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.3)',
    // Shadow for Android
    elevation: 5,
  },
});
