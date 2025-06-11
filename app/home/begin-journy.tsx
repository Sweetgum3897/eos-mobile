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
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { aiAnswer, getChatHistory, getQuestionList } from '@/actions';
import { HeaderBar, TextWrapper } from '@/components';
import { useAppStore } from '@/store';
import { TQuestion } from '@/types';

const AstralIcon = '../../assets/svg/astral-avatar.svg';
const daymond = '../../assets/svg/daymond.svg';
const hardIcon = '../../assets/svg/home/hardIcon.svg';
const opposeIcon = '../../assets/svg/home/oppose.svg';
const outIcon = '../../assets/svg/home/outIcon.svg';
const nextIcon1 = '../../assets/svg/home/nextIcon1.svg';
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
    { content: string; isQuestion: boolean }[]
  >([]);
  const [questionShow, setQuestionShow] = useState('');
  const [question, setQuestion] = useState('');
  const windowWidth = Dimensions.get('screen').width;
  const params = useLocalSearchParams<{
    readingId: string;
    itemId: string;
    conversationId: string;
  }>();
  const { readingId, itemId } = params;
  const [conversationId, setHistoryId] = useState<number>(parseInt(params.conversationId));

  const userInfo = useAppStore((state) => state.userInfo);

  const getConversation = async () => {
    try {
      if (conversationId) {
        const response = await getChatHistory(conversationId);
        setConversationHistory(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuestion = async () => {
    try {
      if (question === '') return;
      if (userInfo.availableMessages === 0) return;

      const questionInfo: TQuestion = {
        conversationId: conversationId as number,
        q: question,
        readingId: (readingId as string) ?? '',
        itemId: (itemId as string) ?? '',
      };

      const response = await aiAnswer(questionInfo);
      if (response.data) {
        setConversationHistory([
          ...conversationHistory,
          ...[
            {
              content: question,
              isQuestion: true,
            },
            {
              content: response.data.content,
              isQuestion: false,
            },
          ],
        ]);
        setQuestion('');
        setHistoryId(response.data.conversationId);
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
              {conversationHistory.map((history, index) =>
                history.isQuestion ? (
                  <View key={index} style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
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
                        {history.content}
                      </TextWrapper>
                    </View>
                  </View>
                ) : (
                  <View key={index} style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
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
                          {history.content}
                        </TextWrapper>
                        {index === conversationHistory.length - 1 &&
                          userInfo.availableMessages === 0 && (
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
                          )}
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
                            <Image source={require(hardIcon)} style={{ width: 20, height: 16 }} />
                          </TouchableOpacity>
                          <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                            <Image
                              source={require(recommendIcon)}
                              style={{ width: 17, height: 16 }}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                            <Image source={require(opposeIcon)} style={{ width: 17, height: 16 }} />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                          <Image source={require(outIcon)} style={{ width: 20, height: 16 }} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ),
              )}
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
              value={question}
              onChangeText={setQuestion}
              editable={userInfo.availableMessages !== 0}
            />
            <View style={{ position: 'absolute', right: 15 }}>
              <TouchableOpacity onPress={handleQuestion}>
                <Image source={require(nextIcon1)} style={{ width: 30, height: 18 }} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: 25,
                height: 25,
                borderRadius: 25,
                borderWidth: 1,
                borderColor: 'black',
                padding: 1,
                position: 'absolute',
                right: 5,
                top: -13,
              }}
            >
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 25,
                  backgroundColor: '#686662',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white' }}>{userInfo.availableMessages}</Text>
              </View>
            </View>
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
