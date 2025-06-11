import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { CollapsibleItem, ModalWrapper, TextWrapper } from '@/components';
import { TDescription } from '@/types';

const balanceCard = '../../assets/svg/home/balanceCard.svg';
const closeIcon = '../../assets/svg/home/closeIcon.svg';
const nextIcon1 = '../../assets/svg/home/nextIcon1.svg';

export const ReadingInterpretation = ({ close }: { close: () => void }) => {
  const { t } = useTranslation();

  const router = useRouter();
  const [items, setItems] = useState<TDescription[]>([]);
  const windowWidth = Dimensions.get('screen').width;
  const [visible, setVisible] = useState(true);
  const _close = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    setItems([
      {
        title: t('unlockPersonalizedInsights'),
        description: t('redingInterpretationDescription'),
      },
      {
        title: t('navigateYourDay'),
        description: t('redingInterpretationDescription'),
      },
      {
        title: t('embraceCelestialGuidance'),
        description: t('redingInterpretationDescription'),
      },
      {
        title: t('discoverAstrologicalOpportunities'),
        description: t('redingInterpretationDescription'),
      },
      {
        title: t('reflectAndGrow'),
        description: t('redingInterpretationDescription'),
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
                onPress={_close}
              >
                <Image source={require(closeIcon)} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
              <TextWrapper style={{ color: 'white', fontSize: 24 }}>
                {t('dailyReadingInterpretation')}
              </TextWrapper>
            </View>
            <View
              style={{
                flexDirection: 'column',
                padding: 8,
                alignItems: 'center',
                backgroundColor: '#686662',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <View style={{ width: 55, height: 55 }}>
                  <Image source={require(balanceCard)} style={{ width: 65, height: 65 }} />
                </View>
                <TextWrapper
                  style={{
                    fontSize: 50,
                    color: '#F8F2EA',
                    textAlign: 'center',
                    paddingHorizontal: 5,
                  }}
                >
                  3
                </TextWrapper>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    height: '85%',
                  }}
                >
                  <TextWrapper
                    style={{
                      fontSize: 16,
                      color: '#F8F2EA',
                      textAlign: 'center',
                      padding: 5,
                    }}
                  >
                    {t('currentCelestialKeyBalance')}
                  </TextWrapper>
                </View>
              </View>
              <View style={{ flexDirection: 'column' }}>
                {items.map((item, key) => {
                  return <CollapsibleItem text={item.title} key={key} content={item.description} />;
                })}
              </View>
              <View
                style={{
                  backgroundColor: '#464646',
                  borderRadius: 12,
                  width: '98%',
                  marginTop: 20,
                  paddingVertical: 8,
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    width: '100%',
                    paddingHorizontal: 8,
                  }}
                >
                  <View
                    style={{
                      padding: 7,
                      borderRadius: 9,
                      backgroundColor: '#343332',
                    }}
                  >
                    <TextWrapper style={{ color: '#D5F6DB', fontSize: 11 }}>
                      {t('nonRefundable')}
                    </TextWrapper>
                  </View>
                </View>
                <TextWrapper
                  style={{
                    fontSize: 20,
                    color: 'white',
                    padding: 4,
                    textAlign: 'center',
                  }}
                >
                  {t('byRedeeming')}
                </TextWrapper>
                <TextWrapper
                  style={{
                    // color: "#B0ACA6",
                    color: '#F8F2EA',
                    fontSize: 14,
                    textAlign: 'center',
                    paddingHorizontal: 6,
                  }}
                >
                  {t('yourCelestialKeyWillBeConsumedToUnlock')}
                </TextWrapper>
                <TouchableOpacity
                  onPress={() => {
                    _close();
                    router.push('/home/daily-reading-interpretation');
                  }}
                  style={Styles.customBtn}
                >
                  <TextWrapper
                    style={{
                      color: 'white',
                      fontSize: 18,
                      paddingHorizontal: 5,
                    }}
                  >
                    {t('redeem')}
                  </TextWrapper>
                  <View style={{ position: 'absolute', right: 15 }}>
                    <Image source={require(nextIcon1)} style={{ width: 30, height: 18 }} />
                  </View>
                </TouchableOpacity>
              </View>
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
  customBtn: {
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: '#181818',
    padding: 12,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    position: 'relative',
    elevation: 5,
  },
});
