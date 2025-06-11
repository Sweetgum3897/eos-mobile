import { Image } from 'expo-image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ModalWrapper, TextWrapper } from '@/components';

const closeIcon = '../assets/svg/home/closeIcon.svg';

export const AboutUs = ({ close }: { close: () => void }) => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(true);
  const _close = () => {
    setVisible(!visible);
  };

  return (
    <ModalWrapper visible={visible} onClose={close}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 60,
          width: '100%',
          paddingTop: 40,
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            width: '98%',
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
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <TouchableOpacity style={{ position: 'absolute', left: 10, top: 10 }} onPress={_close}>
              <Image source={require(closeIcon)} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <TextWrapper style={{ color: 'white', fontSize: 24 }}>{t('About US')}</TextWrapper>
          </View>

          <ScrollView>
            <View
              style={{
                flexDirection: 'column',
                padding: 15,
                gap: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                backgroundColor: '#686662',
              }}
            ></View>
          </ScrollView>
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
    width: '90%',
    position: 'relative',
    elevation: 5,
  },
});
