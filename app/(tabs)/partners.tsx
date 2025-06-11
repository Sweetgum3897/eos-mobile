import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';

import { TextWrapper } from '@/components';
import { useKeyboard } from '@/hooks';
import { HeaderSection } from '@/sections';

const AstralIcon = '../../assets/svg/astral-avatar.svg';
const loveIcon = '../../assets/svg/home/love.svg';
const selfIcon = '../../assets/svg/home/self.svg';
const socialIcon = '../../assets/svg/home/social.svg';
const trendingIcon = '../../assets/svg/home/trending.svg';
const workIcon = '../../assets/svg/home/work.svg';
const JourneyIcon = '../../assets/svg/journey.svg';

export default function PartnersScreen() {
  const { t } = useTranslation();

  const router = useRouter();
  const inputRef = useRef<TextInput | null>(null);
  const isKeyboardVisible = useKeyboard();

  const svgs = {
    trendingIcon: <Image source={require(trendingIcon)} style={{ width: 50, height: 50 }} />,
    selfIcon: <Image source={require(selfIcon)} style={{ width: 50, height: 50 }} />,
    loveIcon: <Image source={require(loveIcon)} style={{ width: 50, height: 50 }} />,
    workIcon: <Image source={require(workIcon)} style={{ width: 50, height: 50 }} />,
    socialIcon: <Image source={require(socialIcon)} style={{ width: 50, height: 50 }} />,
  };

  const [selectedReading, setSelectedReading] = useState<Record<string, string>>({
    id: '1',
    title: t('natalReading'),
  });
  const [selectedItem, setSelectedItem] = useState({
    id: '1',
    svg: svgs['trendingIcon'],
    title: t('trending'),
  });

  const data: Record<string, string>[] = [
    { id: '1', title: t('natalReading') },
    { id: '2', title: t('careerReading') },
    { id: '3', title: t('dailyReading') },
    { id: '4', title: t('yearAheadReading') },
    { id: '5', title: t('compatability') },
    { id: '6', title: t('eventsPeopleCosmos') },
    { id: '7', title: t('bigDecisionTiming') },
    { id: '8', title: t('bigDecisionTiming') },
  ];

  const data1 = [
    { id: '1', svg: svgs['trendingIcon'], title: t('trending') },
    { id: '2', svg: svgs['selfIcon'], title: t('self') },
    { id: '3', svg: svgs['loveIcon'], title: t('love') },
    { id: '4', svg: svgs['workIcon'], title: t('work') },
    { id: '5', svg: svgs['socialIcon'], title: t('socialIcon') },
  ];

  const renderItem = (item: Record<string, string>, key: number) => (
    <View
      style={{
        width: '47%',
        height: 55,
        display: 'flex',
        justifyContent: 'center',
        marginVertical: 6,
        backgroundColor: '#FDFBF8',
        borderWidth: 1,
        borderColor: selectedReading.id === item.id ? '#181818' : 'transparent',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 10,
      }}
      key={key}
    >
      <TouchableOpacity onPress={() => setSelectedReading(item)}>
        <TextWrapper style={{ textAlign: 'center', fontSize: item.id === '6' ? 12 : 18 }}>
          {item.title}
        </TextWrapper>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#F8F2EA',
      }}
    >
      <HeaderSection
        title={<Image source={require(AstralIcon)} style={{ width: 80, height: 80 }} />}
      />
      <ScrollView overScrollMode="never">
        <View
          style={{
            flexDirection: 'column',
            marginTop: 16,
            justifyContent: 'space-between',
            flex: 1,
            // paddingHorizontal: 10,
            paddingBottom: isKeyboardVisible ? 60 : 150,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              // width: '25%',
              backgroundColor: '#F2E7D9',
              // borderRadius: 20,
              paddingVertical: 20,
              paddingHorizontal: 20,
              justifyContent: 'space-between',
            }}
          >
            {data1.map((d, key) => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginVertical: 5,
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderWidth: 0,
                    borderColor: d.id === selectedItem.id ? '#181818' : 'transparent',
                  }}
                  key={key}
                  onPress={() => setSelectedItem(d)}
                >
                  {d.svg}
                  <TextWrapper
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    {d.title}
                  </TextWrapper>
                </TouchableOpacity>
              );
            })}
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {data.map(renderItem)}
          </View>
        </View>
        <View
          style={{
            width: '100%',
            paddingBottom: 5,
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              position: 'relative',
              backgroundColor: '#181818',
              boxShadow: ' 5px 4px 4px 0px rgba(0, 0, 0, 0.25)',
              borderRadius: 24,
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: '#ffffff57',
              borderWidth: 0.5,
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                paddingVertical: 5,
                gap: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() =>
                router.push(
                  `/home/begin-journy?readingId=${selectedReading.title}&itemId=${selectedItem.title}`,
                )
              }
            >
              <Image source={require(JourneyIcon)} style={{ width: 21, height: 27 }} />
              <TextWrapper
                style={{
                  textAlign: 'center',
                  fontSize: 23,
                  color: 'white',
                  fontFamily: 'PatrickHand',
                }}
              >
                {t('beginYourJourney')}
              </TextWrapper>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
