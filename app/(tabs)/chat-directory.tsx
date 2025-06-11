import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { TextWrapper } from '@/components';
import { HeaderSection } from '@/sections';

const ChartLock = '../../assets/svg/chart/chartlock.svg';
const LunarRturnChart = '../../assets/svg/chart/lunarreturnchart.svg';
const NatalChart = '../../assets/svg/chart/natalchart.svg';
const SolarArcDirectionns = '../../assets/svg/chart/solararcdirectionns.svg';
const SolarReturnChart = '../../assets/svg/chart/solarreturnchart.svg';
const SynaStryChart = '../../assets/svg/chart/synastrychart.svg';
const TransitChart = '../../assets/svg/chart/transitchart.svg';
const Logo = '../../assets/svg/chartdirectorylogo.svg';

export default function ChatDirectoryScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const goPage = (id: string) => {
    router.push(`/home/chart?chartName=${id}`);
  };
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#F8F2EA',
      }}
    >
      <ScrollView overScrollMode="never" style={{ flex: 1 }}>
        <HeaderSection title={<Image source={require(Logo)} style={{ width: 80, height: 80 }} />} />
        <View
          style={{
            justifyContent: 'space-around',
            flexDirection: 'row',
            padding: 16,
            marginTop: 10,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '46%',
            }}
          >
            <TouchableOpacity onPress={() => goPage('transit')} style={styles.tabpanel}>
              <View style={styles.tabSvgWrapper}>
                <View style={{ opacity: 0.9 }}>
                  <Image source={require(TransitChart)} style={{ width: 84, height: 84 }} />
                </View>
                <View style={{ position: 'absolute', top: '20%', left: '28%' }}>
                  <Image source={require(ChartLock)} style={{ width: 36, height: 36 }} />
                </View>
              </View>
              <TextWrapper style={styles.tabname}>{t('transitChart')}</TextWrapper>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goPage('solararc')} style={styles.tabpanel}>
              <View style={styles.tabSvgWrapper}>
                <View style={{ opacity: 0.9 }}>
                  <Image source={require(SolarArcDirectionns)} style={{ width: 84, height: 84 }} />
                </View>
                <View style={{ position: 'absolute', top: '20%', left: '28%' }}>
                  <Image source={require(ChartLock)} style={{ width: 36, height: 36 }} />
                </View>
              </View>
              <TextWrapper style={styles.tabname}>{t('solarArcDirections')}</TextWrapper>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goPage('solarreturn')} style={styles.tabpanel}>
              <View style={styles.tabSvgWrapper}>
                <View style={{ opacity: 0.9 }}>
                  <Image source={require(SolarReturnChart)} style={{ width: 84, height: 84 }} />
                </View>
                <View style={{ position: 'absolute', top: '20%', left: '28%' }}>
                  <Image source={require(ChartLock)} style={{ width: 36, height: 36 }} />
                </View>
              </View>
              <TextWrapper style={styles.tabname}>{t('solarReturnChart')}</TextWrapper>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '46%',
            }}
          >
            <TouchableOpacity onPress={() => goPage('natal')} style={styles.tabpanel}>
              <View style={styles.tabSvgWrapper}>
                <Image source={require(NatalChart)} style={{ width: 84, height: 84 }} />
              </View>
              <TextWrapper style={styles.tabname}>{t('natalChart')}</TextWrapper>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goPage('synastry')} style={styles.tabpanel}>
              <View style={styles.tabSvgWrapper}>
                <View style={{ opacity: 0.9 }}>
                  <Image source={require(SynaStryChart)} style={{ width: 84, height: 84 }} />
                </View>
                <View style={{ position: 'absolute', top: '20%', left: '28%' }}>
                  <Image source={require(ChartLock)} style={{ width: 36, height: 36 }} />
                </View>
              </View>
              <TextWrapper style={styles.tabname}>{t('synastryChart')}</TextWrapper>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goPage('luarreturn')} style={styles.tabpanel}>
              <View style={styles.tabSvgWrapper}>
                <View style={{ opacity: 0.9 }}>
                  <Image source={require(LunarRturnChart)} style={{ width: 84, height: 84 }} />
                </View>
                <View style={{ position: 'absolute', top: '20%', left: '28%' }}>
                  <Image source={require(ChartLock)} style={{ width: 36, height: 36 }} />
                </View>
              </View>
              <TextWrapper style={styles.tabname}>{t('lunarReturnChart')}</TextWrapper>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
            marginBottom: 20,
            backgroundColor: 'transparent',
            // paddingTop: 20
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              position: 'relative',
              justifyContent: 'center',
              backgroundColor: '#181818',
              borderRadius: 24,
              padding: 12,
              width: '85%',
            }}
          >
            <TextWrapper style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>
              {t('exploreYourStartMap')}
            </TextWrapper>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  userWraper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  userItemText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 5,
  },
  rootTabbar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff18',
    borderBottomWidth: 0.5,
    borderColor: '#FFFFFF',
    boxShadow: '12px 12px 0px 0px rgba(0, 0, 0, 0.15)',
    marginTop: 30,
  },
  rootTabBtn: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 500,
    padding: 10,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderColor: '#555555',
    color: '#555555',
  },
  tabpanel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2E7D9',
    width: '100%',
    padding: 18,
    height: 150,
    // paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 10,

    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.3)',
    // Shadow for Android
    elevation: 5,
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
});
