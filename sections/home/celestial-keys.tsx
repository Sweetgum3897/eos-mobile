import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { CollapsibleItem, ModalWrapper, TextWrapper } from '@/components';
import { TDescription } from '@/types';

const daymondIcon = '../../assets/svg/daymond.svg';
const bundleSvg1 = '../../assets/svg/home/bundle1.svg';
const bundleSvg = '../../assets/svg/home/bundle.svg';
const closeIcon = '../../assets/svg/home/closeIcon.svg';
const nextIcon1 = '../../assets/svg/home/nextIcon1.svg';

export const CelestialKeys = ({ close }: { close: () => void }) => {
  const { t } = useTranslation();

  const [items, setItems] = useState<TDescription[]>([]);
  const windowWidth = Dimensions.get('screen').width;
  const windowHeight = Dimensions.get('screen').height;
  const [visible, setVisible] = useState(true);
  const _close = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    setItems([
      {
        title: `Personalized Astrological Insights for Major Life Decisions:`,
        description: `Use a Celestial Key to unlock bespoke guidance for big life changes or decisions. Whether you're at a crossroads career-wise, contemplating a significant move, or facing any major life choice, the big decision timing reading provides tailored astrological insights to help navigate these pivotal moments with confidence.`,
      },
      {
        title: `Career Path Clarity and Opportunities:`,
        description: `Leverage the career reading feature of a Celestial Key to gain valuable insights into your professional life. Discover the most auspicious timings for career advancements, transitions, or starting new ventures. This reading helps align your career aspirations with the cosmic energies for optimal success and satisfaction.`,
      },
      {
        title: `Daily Guided Journey Through the Stars:`,
        description: `Activate a Celestial Key for daily reading interpretations, offering a daily dose of cosmic wisdom tailored specifically to you. Start each day with clarity and inspiration, knowing how the day's astrological climate can influence your personal journey, helping you make the most out of every opportunity and challenge.`,
      },
      {
        title: `Deepen Relationships with Synastry Readings:`,
        description: `Use a Celestial Key to explore the astrological dynamics between you and another person with a synastry reading. Understand the celestial underpinnings of your relationships, uncovering how the stars influence your connections, compatibility, and potential growth areas. Ideal for romantic partnerships, friendships, and professional relationships.`,
      },
      {
        title: `Comprehensive Year-Ahead Forecasting & Celestial Guide Interpretation:`,
        description: `Redeem a Celestial Key for an in-depth year ahead reading, providing a detailed preview of what the upcoming year holds for you, highlighting key dates and periods of significance. Complement this with a celestial guide interpretation on your charts, offering a deeper understanding of your personal astrology, including how your natal chart shapes your character, tendencies, and life path.`,
      },
    ]);
  }, []);

  return (
    <ModalWrapper visible={visible} onClose={close}>
      <ScrollView
        overScrollMode="never"
        style={{
          width: windowWidth,
          paddingHorizontal: 6,
        }}
      >
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 80,
            paddingBottom: 120,
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              borderRadius: 14,
              overflow: 'hidden',
              borderWidth: 3,
              borderColor: 'black',
              backgroundColor: '#F8F2EA',
              ...Styles.shadow,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                position: 'relative',
                alignItems: 'center',
                padding: 5,
                backgroundColor: '#181818',
              }}
            >
              <TouchableOpacity
                style={{ position: 'absolute', left: 10, top: 10 }}
                onPress={() => _close()}
              >
                <Image source={require(closeIcon)} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
              <TextWrapper style={{ color: 'white', fontSize: 24 }}>
                {t('celestialKeys')}
              </TextWrapper>
            </View>
            <View
              style={{
                flexDirection: 'column',
                padding: 4,
                alignItems: 'center',
                backgroundColor: '#686662',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require(daymondIcon)} style={{ width: 46, height: 46 }} />
                <TextWrapper
                  style={{
                    fontSize: 48,
                    color: '#F8F2EA',
                    textAlign: 'center',
                    padding: 5,
                  }}
                >
                  $7.77
                </TextWrapper>
                <TextWrapper
                  style={{
                    fontSize: 16,
                    color: '#F8F2EA',
                    textAlign: 'center',
                    padding: 5,
                  }}
                >
                  {t('perUse')}
                </TextWrapper>
              </View>
              <View style={{ flexDirection: 'column' }}>
                {items.map((item, key) => {
                  return <CollapsibleItem text={item.title} key={key} content={item.description} />;
                })}
              </View>
              <TextWrapper style={{ fontSize: 24, color: 'white', padding: 4 }}>
                {`${t('bundles')}:`}
              </TextWrapper>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingHorizontal: 30,
                }}
              >
                <View>
                  <TouchableOpacity>
                    <Image source={require(bundleSvg)} style={{ width: 124, height: 124 }} />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity>
                    <Image source={require(bundleSvg1)} style={{ width: 124, height: 124 }} />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  borderRadius: 30,
                  borderColor: 'black',
                  borderWidth: 1,
                  flexDirection: 'row',
                  backgroundColor: '#181818',
                  padding: 12,
                  marginTop: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  position: 'relative',
                }}
              >
                <TextWrapper style={{ color: 'white', fontSize: 18, paddingHorizontal: 5 }}>
                  {t('purchase')}
                </TextWrapper>
                <View style={{ position: 'absolute', right: 15 }}>
                  <Image source={require(nextIcon1)} style={{ width: 30, height: 18 }} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              padding: 8,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <TextWrapper
              style={{
                textDecorationLine: 'underline',
                fontSize: 19,
                color: 'black',
              }}
            >
              {t('termsOfService')}
            </TextWrapper>
            <TextWrapper
              style={{
                textDecorationLine: 'underline',
                fontSize: 19,
                color: 'black',
              }}
            >
              {t('privacyPolicy')}
            </TextWrapper>
          </View>
        </View>
      </ScrollView>
    </ModalWrapper>
  );
};

const Styles = StyleSheet.create({
  shadow: {
    boxShadow: '5px 5px 1px 0px rgba(0, 0, 0, 0.6)',
    elevation: 8,
  },
});
