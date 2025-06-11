import { Entypo, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { getChatHistory, getQuestionList } from '@/actions';
import { HeaderBar, TextWrapper } from '@/components';

const AstralIcon = '../../assets/svg/astral-avatar.svg';
const daymond = '../../assets/svg/daymond.svg';
const hardIcon = '../../assets/svg/home/hardIcon.svg';
const opposeIcon = '../../assets/svg/home/oppose.svg';
const outIcon = '../../assets/svg/home/outIcon.svg';
const recommendIcon = '../../assets/svg/home/recommend.svg';

export default function BeginJournyScreen() {
  const { t } = useTranslation();
  const [topQuestions, setTopQuestions] = useState<
    {
      question: string;
      answer: string;
    }[]
  >([]);
  const [conversationHistory, setConversationHistory] = useState<
    { _id: string; history: { content: string; isQuestion: boolean }[] }[]
  >([]);
  const [questionShow, setQuestionShow] = useState('');
  const windowWidth = Dimensions.get('screen').width;
  const { conversationId } = useLocalSearchParams<{ conversationId: string }>();

  const getConversation = async () => {
    try {
      if (conversationId) {
        const response = await getChatHistory(parseInt(conversationId));
        setConversationHistory(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConversation();
  }, []);

  const renderUnlockAlrt = () => {
    return (
      <View style={styles.alertWrapper}>
        <View style={styles.content}>
          <View style={{ width: '20%' }}>
            <Image source={require(daymond)} style={{ width: 46, height: 46 }} />
          </View>
          <TextWrapper
            style={{
              color: '#686662',
              fontSize: 16,
              paddingHorizontal: 10,
              width: '80%',
            }}
          >
            {t('becomeAPassHolderForExtendedResponses')}
          </TextWrapper>
        </View>
        <TouchableOpacity style={styles.unlockBtn}>
          <TextWrapper
            style={{
              color: '#F8F2EA',
              fontSize: 16,
            }}
          >
            {t('unlockNow')}
          </TextWrapper>
        </TouchableOpacity>
      </View>
    );
  };
  useEffect(() => {
    getQuestionList()
      .then((res) => {
        setTopQuestions(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View
      style={{
        width: windowWidth,
        backgroundColor: '#F8F2EA',
      }}
    >
      <View style={{ width: '100%', height: '100%' }}>
        <HeaderBar
          title={
            <View style={{ height: 70 }}>
              <View style={{ width: 75, height: 75 }}>
                <Image source={require(AstralIcon)} style={{ width: 88, height: 88 }} />
              </View>
            </View>
          }
        />
        <ScrollView
          overScrollMode="never"
          style={{
            height: '100%',
            // backgroundColor: "#FDFBF8",
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              paddingHorizontal: 4,
              // backgroundColor: "#FDFBF8",
            }}
          >
            <View
              style={{
                marginTop: 20,
                width: '100%',
                padding: 8,
                borderRadius: 8,
                flexDirection: 'column',
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <View
                  style={{
                    backgroundColor: '#E2DCD5',
                    borderRadius: 14,
                    padding: 10,
                    margin: 3,
                    borderBottomRightRadius: 0,
                    maxWidth: 300,
                  }}
                >
                  <TextWrapper style={{ color: '#0A0A0A', fontSize: 13 }}>
                    {t('whyAreCancersSoCancer')}
                  </TextWrapper>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <View
                  style={{
                    backgroundColor: '#5C5C5C',
                    borderRadius: 14,
                    padding: 10,
                    margin: 3,
                    maxWidth: 300,
                    borderBottomLeftRadius: 0,
                  }}
                >
                  <TextWrapper style={{ color: 'white', fontSize: 13 }}>
                    {t('hiUserZodiacGoodMorning')}
                  </TextWrapper>
                </View>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <View
                  style={{
                    maxWidth: 300,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: '#5C5C5C',
                      borderRadius: 14,
                      margin: 3,
                      borderBottomLeftRadius: 0,
                      position: 'relative',
                    }}
                  >
                    <TextWrapper
                      style={{
                        // color: "#F8F2EA",
                        color: 'white',
                        fontSize: 13,
                        padding: 10,
                      }}
                    >
                      {t('highlightsDescriptionForAstrologyUsers')}
                    </TextWrapper>
                    <LinearGradient
                      colors={['transparent', '#747474', '#4F4D4A']}
                      style={{
                        paddingTop: 100,
                        position: 'absolute',
                        bottom: 0,
                        paddingHorizontal: 20,
                        width: '100%',
                      }}
                    >
                      {renderUnlockAlrt()}
                    </LinearGradient>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: 8,
                      paddingHorizontal: 5,
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                        <Image source={require(hardIcon)} style={{ width: 16, height: 16 }} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                        <Image source={require(recommendIcon)} style={{ width: 16, height: 16 }} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                        <Image source={require(opposeIcon)} style={{ width: 16, height: 16 }} />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                      <Image source={require(outIcon)} style={{ width: 16, height: 16 }} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            {topQuestions.map((topQuestion, ind) => (
              <View
                key={ind}
                style={{
                  width: '100%',
                  padding: 10,
                  marginTop: 10,
                  borderRadius: 8,
                  flexDirection: 'column',
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    setQuestionShow(ind.toString() === questionShow ? '' : ind.toString())
                  }
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <TextWrapper style={{ color: 'white' }}>{topQuestion.question}</TextWrapper>
                    {ind.toString() === questionShow ? (
                      <Entypo name="chevron-down" size={20} color="white" />
                    ) : (
                      <Ionicons name="chevron-forward" size={20} color="white" />
                    )}
                  </View>
                </TouchableOpacity>

                {ind.toString() === questionShow && (
                  <View style={{ padding: 5 }}>
                    <TextWrapper style={{ color: '#F8F2EA', fontSize: 16 }}>
                      {topQuestion.answer}
                    </TextWrapper>
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
        <View
          style={{
            paddingHorizontal: 25,
            backgroundColor: '#F8F2EA',
          }}
        >
          <View
            style={{
              marginBottom: 15,
              marginTop: 8,
              borderRadius: 24,
              padding: 9,
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: '#ffffff57',
              borderWidth: 0.5,
              justifyContent: 'center',
              position: 'relative',
              backgroundColor: '#181818',
              boxShadow: ' 5px 4px 4px 0px rgba(0, 0, 0, 0.25)',
            }}
          >
            <TextInput
              placeholder={t('beginHere')}
              placeholderTextColor={'white'}
              style={{
                textAlign: 'center',
                fontSize: 16,
                color: 'white',
                fontFamily: 'PatrickHand',
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  alertWrapper: {
    backgroundColor: '#F2E7D9',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
  },
  content: {
    paddingVertical: 10,
    width: '100%',
    flexDirection: 'row',
  },
  unlockBtn: {
    backgroundColor: '#464646',
    borderRadius: 24,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
