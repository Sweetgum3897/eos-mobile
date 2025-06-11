import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TextWrapper } from '@/components';
import { BackButton } from '@/components/BackButton';

const SentIconSvg = '../assets/svg/sendVerifyCodeIcon.svg';
const EmailSvg = '../assets/svg/email.svg';
const NextBtn = '../assets/svg/nextIconbutton.svg';
const PhoneIconSvg = '../assets/svg/phone.svg';
export const SuccessSentVerifyCode = ({
  type,
  value,
  back,
  resend,
}: {
  type: boolean;
  value: string;
  back: () => void;
  resend: () => void;
}) => {
  const { t } = useTranslation();

  const router = useRouter();
  const windowWidth = Dimensions.get('screen').width;
  const windowHeight = Dimensions.get('screen').height;
  const goPage = () => {
    router.push(`/verification?next=/&isEmail=${type}&type=VERIFICATION`);
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#F8F2EA',
        width: windowWidth,
        height: windowHeight,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <BackButton onClick={back} />
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Image source={require(SentIconSvg)} style={{ width: 157, height: 157 }} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TextWrapper style={styles.title}>{t('verificationCodeSent')}</TextWrapper>
      </View>
      <View>
        {type ? (
          <View>
            <TextWrapper style={{ fontSize: 16, color: '#646464', textAlign: 'center' }}>
              {t('haveSend4DigitCodeToEmail')}
            </TextWrapper>
          </View>
        ) : (
          <View>
            <TextWrapper style={{ fontSize: 16, color: '#646464', textAlign: 'center' }}>
              {t('haveSend4DigitCodePhone')}{' '}
            </TextWrapper>
          </View>
        )}
      </View>
      {type ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 10,
          }}
        >
          <Image source={require(EmailSvg)} style={{ width: 16, height: 16 }} />
          <TextWrapper style={{ color: 'black', fontSize: 16, paddingLeft: 10 }}>
            {value}
          </TextWrapper>
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 10,
          }}
        >
          <Image source={require(PhoneIconSvg)} style={{ width: 16, height: 16 }} />
          <TextWrapper style={{ color: 'black', fontSize: 16, paddingLeft: 10 }}>
            {value}
          </TextWrapper>
        </View>
      )}
      <View
        style={{
          display: 'flex',
          marginVertical: 25,
          marginTop: 80,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          onPress={goPage}
          style={{
            borderRadius: 30,
            backgroundColor: '#181818',
            padding: 12,
            width: '90%',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'black',
          }}
        >
          <TextWrapper
            style={{
              color: '#ffffff',
              fontSize: 18,
              textAlign: 'center',
              //   color: "white",
            }}
          >
            {t('requireCode')}
          </TextWrapper>
          <View style={{ position: 'absolute', right: 20, top: 20 }}>
            <Image source={require(NextBtn)} style={{ width: 34, height: 15 }} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity style={{ borderBottomWidth: 1, borderColor: 'black' }}>
          <TextWrapper style={{ fontSize: 20, color: 'black' }}>{t('resendCode')}</TextWrapper>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    color: '#4F4D4A',
    // textAlign: "center",
    fontSize: 32,
    fontWeight: '400',
    fontFamily: 'PatrickHand',
  },
});
