import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ModalWrapper, TextWrapper } from '@/components';
import { TDescription } from '@/types';

const checkIcon = '../assets/svg/home/checkIcon.svg';
const downIcon = '../assets/svg/home/downIcon1.svg';
const forwardIcon = '../assets/svg/home/forwardIcon.svg';
const backIcon = '../assets/svg/back1.svg';
const nextIcon1 = '../assets/svg/home/nextIcon1.svg';
const nextIcon2 = '../assets/svg/home/next2.svg';

const RenderItem = ({ text, content }: { text: string; content: string }) => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(false);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
      }}
    >
      <Image source={require(checkIcon)} style={{ width: 16, height: 16 }} />
      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: 'black',
          backgroundColor: '#181818',
          padding: 8,
          ...Styles.shadow,
        }}
      >
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 }}
        >
          <View style={{ flexDirection: 'column', width: 270 }}>
            <TextWrapper
              style={{
                color: 'white',
                fontSize: 18,
              }}
            >
              {text}
            </TextWrapper>
            {visible && (
              <View style={{ paddingBottom: 5, position: 'relative' }}>
                <TextWrapper style={{ color: 'white' }}>{content}</TextWrapper>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 0,
                    right: -20,
                  }}
                >
                  <TextWrapper style={{ color: 'white', paddingHorizontal: 2 }}>
                    {t('help')}
                  </TextWrapper>
                  <Image source={require(nextIcon2)} style={{ width: 18, height: 9 }} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <TouchableOpacity style={{ paddingVertical: 5 }} onPress={() => setVisible(!visible)}>
            {visible ? (
              <Image source={require(forwardIcon)} style={{ width: 12, height: 16 }} />
            ) : (
              <Image source={require(downIcon)} style={{ width: 13, height: 9 }} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const ManageSubscription = ({ close }: { close: () => void }) => {
  const { t } = useTranslation();

  const [items, setItems] = useState<TDescription[]>([]);
  const windowWidth = Dimensions.get('screen').width;
  const [visible, setVisible] = useState(true);
  const _close = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    setItems([
      {
        title: `Extened Astrological Readings`,
        description: `Use a Celestial Key to unlock bespoke guidance for big life changes or decisions. Whether you're at a crossroads career-wise, contemplating a significant move, or facing any major life choice, the big decision timing reading provides tailored astrological insights to help navigate these pivotal moments with confidence.`,
      },
      {
        title: `Comprehensive Daily, Weekly,Monthly, Yearly Forecasts`,
        description: `Leverage the career reading feature of a Celestial Key to gain valuable insights into your professional life. Discover the most auspicious timings for career advancements, transitions, or starting new ventures. This reading helps align your career aspirations with the cosmic energies for optimal success and satisfaction.`,
      },
      {
        title: `Personalized Stellar Guidance`,
        description: `Activate a Celestial Key for daily reading interpretations, offering a daily dose of cosmic wisdom tailored specifically to you. Start each day with clarity and inspiration, knowing how the day's astrological climate can influence your personal journey, helping you make the most out of every opportunity and challenge.`,
      },
      {
        title: `Priority Access to New Features and Updates`,
        description: `Use a Celestial Key to explore the astrological dynamics between you and another person with a synastry reading. Understand the celestial underpinnings of your relationships, uncovering how the stars influence your connections, compatibility, and potential growth areas. Ideal for romantic partnerships, friendships, and professional relationships.`,
      },
      {
        title: `Dedicated Support for Your Celestial Journey`,
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
                <Image source={require(backIcon)} style={{ width: 20, height: 22 }} />
              </TouchableOpacity>
              <TextWrapper style={{ color: 'white', fontSize: 24 }}>
                {t('manageSubscription')}
              </TextWrapper>
            </View>
            <View
              style={{
                flexDirection: 'column',
                padding: 8,
                alignItems: 'center',
              }}
            >
              <TextWrapper
                style={{
                  fontSize: 30,
                  width: 250,
                  color: 'black',
                  textAlign: 'center',
                  padding: 5,
                }}
              >
                {t('stellarGuidencePass')}
              </TextWrapper>
              <View style={{ flexDirection: 'column' }}>
                {items.map((item, key) => {
                  return <RenderItem text={item.title} key={key} content={item.description} />;
                })}
              </View>
              <TouchableOpacity
                style={{
                  borderRadius: 30,
                  borderColor: 'black',
                  borderWidth: 1,
                  flexDirection: 'row',
                  backgroundColor: '#181818',
                  padding: 10,
                  alignItems: 'center',
                  marginTop: 10,
                  paddingHorizontal: 60,
                }}
              >
                <TextWrapper style={{ color: 'white', fontSize: 18, paddingHorizontal: 5 }}>
                  {t('subscribe')}
                </TextWrapper>
                <Image source={require(nextIcon1)} style={{ width: 30, height: 18 }} />
              </TouchableOpacity>
              <TextWrapper
                style={{
                  color: 'red',
                  padding: 10,
                  textAlign: 'center',
                  fontSize: 16,
                }}
              >
                {t('cancel')}
              </TextWrapper>
            </View>
          </View>
          <View style={{ padding: 8, flexDirection: 'row', justifyContent: 'space-around' }}>
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
