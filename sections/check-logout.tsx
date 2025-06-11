import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ModalWrapper, TextWrapper } from '@/components';

const closeIcon = '../assets/svg/home/closeIcon.svg';

const CheckLogout = ({ close, callback }: { close: () => void; callback: () => void }) => {
  const { t } = useTranslation();

  const router = useRouter();
  const [visible, setVisible] = useState(true);
  const _close = () => {
    setVisible(!visible);
  };

  return (
    <ModalWrapper visible={visible} onClose={close} isOpacity={true}>
      <View style={{ alignItems: 'center', height: '100%', justifyContent: 'center' }}>
        <View
          style={{
            flexDirection: 'column',
            borderRadius: 14,
            overflow: 'hidden',
            borderWidth: 3,
            borderColor: 'black',
            backgroundColor: 'blue',
            ...Styles.shadow,
            width: '90%',
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
            <TouchableOpacity style={{ position: 'absolute', left: 10, top: 10 }} onPress={_close}>
              <Image source={require(closeIcon)} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <TextWrapper style={{ color: 'white', fontSize: 24 }}>{t('confirmLogout')}</TextWrapper>
          </View>
          <View
            style={{
              flexDirection: 'column',
              padding: 15,
              alignItems: 'center',
              backgroundColor: '#686662',
            }}
          >
            <TextWrapper style={{ color: '#F8F2EA', fontSize: 23, textAlign: 'center' }}>
              {t('areYouSureLogOut')}
            </TextWrapper>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  _close();
                }}
                style={Styles.customBtn}
              >
                <TextWrapper style={{ color: 'white', fontSize: 18 }}>{t('no')}</TextWrapper>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  _close();
                  callback();
                  router.push('/login');
                }}
                style={Styles.customBtn}
              >
                <TextWrapper style={{ color: 'white', fontSize: 18 }}>{t('yes')}</TextWrapper>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
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
    width: 100,
    position: 'relative',
    elevation: 5,
  },
});

export default CheckLogout;
