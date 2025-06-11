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

export const DiveDeeper = ({ close }: { close: () => void }) => {
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
        title: `Insight Enhancement`,
        description: `At just $1 per use, "Dive Deeper" tokens make it incredibly affordable for users to expand on any reading. Whether seeking clarity on daily horoscopes, natal chart interpretations, or specific astrological queries, these tokens provide additional depth at minimal cost.`,
      },
      {
        title: `Customize Your Astrological Journey`,
        description: `"Dive Deeper" tokens give users the flexibility to choose when and on which readings they want additional insights. This personalized approach ensures that users can focus on areas of greatest interest or concern, tailoring their astrological exploration to their unique needs and curiosities.`,
      },
      {
        title: `Deepen Your Understanding with Expanded Readings`,
        description: `Use a Celestial Key to explore the astrological dynamics between you and another person with a synastry reading. Understand the celestial underpinnings of your relationships, uncovering how the stars influence your connections, compatibility, and potential growth areas. Ideal for romantic partnerships, friendships, and professional relationships.`,
      },
      {
        title: `Enhance Any Reading within Eos`,
        description: `Whether it’s a daily horoscope, a synastry reading between partners, or a forecast looking at the year ahead, "Dive Deeper" tokens can be applied to any reading offered by Eos. This versatility ensures that users have the opportunity to enhance their understanding across a wide range of astrological services.`,
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
              <TextWrapper style={{ color: 'white', fontSize: 24 }}>{t('diveDeeper')}</TextWrapper>
            </View>
            <View
              style={{
                flexDirection: 'column',
                paddingVertical: 8,
                alignItems: 'center',
                backgroundColor: '#6E6E6E',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require(daymondIcon)} style={{ width: 46, height: 46 }} />
                <TextWrapper style={{ fontSize: 48, color: 'white', textAlign: 'center' }}>
                  $1
                </TextWrapper>
                <TextWrapper style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>
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
                  width: '95%',
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
