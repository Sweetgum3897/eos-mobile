import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { HeaderBar, TextWrapper } from '@/components';

const hardIcon = '../../assets/svg/home/hardIcon.svg';
const opposeIcon = '../../assets/svg/home/oppose.svg';
const outIcon = '../../assets/svg/home/outIcon.svg';
const recommendIcon = '../../assets/svg/home/recommend.svg';
const careerLogo = '../../assets/svg/reading/careerLogo.svg';

export default function CareerReadingInterpretation() {
  const { t } = useTranslation();

  const windowWidth = Dimensions.get('screen').width;
  const renderCtl = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 4,
          paddingHorizontal: 5,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{ paddingHorizontal: 3 }}>
            <Image source={require(hardIcon)} style={{ width: 15, height: 15 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingHorizontal: 3 }}>
            <Image source={require(recommendIcon)} style={{ width: 15, height: 15 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingHorizontal: 3 }}>
            <Image source={require(opposeIcon)} style={{ width: 15, height: 15 }} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Image source={require(outIcon)} style={{ width: 20, height: 16 }} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        width: windowWidth,
        height: '100%',
        backgroundColor: '#F8F2EA',
      }}
    >
      <HeaderBar
        title={
          <View style={{ height: 70, position: 'relative' }}>
            <View
              style={{
                width: 70,
                height: 70,
              }}
            >
              <Image source={require(careerLogo)} style={{ width: 78, height: 78 }} />
            </View>
          </View>
        }
      />
      <ScrollView
        overScrollMode="never"
        style={{
          width: windowWidth,
          flex: 1,
        }}
      >
        <View style={{ width: windowWidth, height: '100%' }}>
          <View
            style={{
              width: '100%',
              padding: 14,
              borderRadius: 8,
              flexDirection: 'column',
            }}
          >
            <View
              style={{
                ...Styles.chatItem,
                justifyContent: 'flex-end',
              }}
            >
              <View style={{ maxWidth: 300 }}>
                <View style={[Styles.rightChat, Styles.shadow]}>
                  <TextWrapper style={{ color: '#0A0A0A', fontSize: 13 }}>
                    {t('careerReading')}
                  </TextWrapper>
                </View>
              </View>
            </View>
            <View
              style={{
                ...Styles.chatItem,
                justifyContent: 'flex-start',
              }}
            >
              <View
                style={{
                  maxWidth: 300,
                }}
              >
                <View style={[Styles.leftChat, Styles.shadow]}>
                  <TextWrapper style={{ color: '#F8F2EA', fontSize: 13 }}>
                    {t('hiUserZodiacGoodMorning')}
                  </TextWrapper>
                </View>
              </View>
            </View>
            <View
              style={{
                ...Styles.chatItem,
                justifyContent: 'flex-start',
              }}
            >
              <View
                style={{
                  maxWidth: 300,
                }}
              >
                <View style={[Styles.leftChat, Styles.shadow]}>
                  <TextWrapper
                    style={{
                      // color: "#F8F2EA",
                      color: 'white',
                      fontSize: 13,
                    }}
                  >
                    {t('careerReadingInterpretationDescription1')}
                  </TextWrapper>
                </View>
                {renderCtl()}
              </View>
            </View>
            <View
              style={{
                ...Styles.chatItem,
                justifyContent: 'flex-start',
              }}
            >
              <View
                style={{
                  maxWidth: 300,
                }}
              >
                <View style={[Styles.leftChat, Styles.shadow]}>
                  <TextWrapper style={{ color: 'white', fontSize: 13 }}>
                    {t('careerReadingInterpretationDescription2')}
                  </TextWrapper>
                </View>
                {renderCtl()}
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: 8,
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                borderRadius: 24,
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: '#ffffff57',
                borderWidth: 0.5,
                justifyContent: 'center',
                position: 'relative',
                backgroundColor: '#181818',
                width: '80%',
                ...Styles.shadow,
              }}
            >
              <TouchableOpacity>
                <TextWrapper style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>
                  {t('diveDeeper')}
                </TextWrapper>
              </TouchableOpacity>
              <View
                style={{
                  position: 'absolute',
                  right: 5,
                  top: -10,
                  borderRadius: 10,
                  padding: 2,
                  width: 22,
                  height: 22,
                  borderColor: 'black',
                  backgroundColor: 'black',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    borderRadius: 15,
                    width: 18,
                    height: 18,
                    borderWidth: 1,
                    borderColor: 'white',
                  }}
                >
                  <TextWrapper
                    style={{
                      textAlign: 'center',
                      color: 'white',
                    }}
                  >
                    3
                  </TextWrapper>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  shadow: {
    boxShadow: '5px 5px 1px 0px rgba(0, 0, 0, 0.6)',
    elevation: 8,
  },
  chatItem: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 14,
  },
  rightChat: {
    padding: 5,
    backgroundColor: '#E2DCD5',
    borderRadius: 13,
    margin: 3,
    borderBottomRightRadius: 0,
    maxWidth: 280,
  },
  leftChat: {
    backgroundColor: '#4F4D4A',
    borderRadius: 13,
    padding: 10,
    width: '100%',
    borderBottomLeftRadius: 0,
  },
});
