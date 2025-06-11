import { Image } from 'expo-image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';

import { submitContact } from '@/actions';
import { CustomAlertModal, ModalWrapper, TextWrapper } from '@/components';

const closeIcon = '../assets/svg/home/closeIcon.svg';

export const ContactUs = ({ close }: { close: () => void }) => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(true);
  const [text, onChangeText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const _close = () => {
    setVisible(!visible);
  };

  const handleSubmit = () => {
    submitContact(text).then((response) => {
      if (response.status === 200 || response.status === 201) {
        setModalVisible(true);
      }
    });
  };
  return (
    <ModalWrapper visible={visible} onClose={close}>
      <GestureHandlerRootView>
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
              <TouchableOpacity
                style={{ position: 'absolute', left: 10, top: 10 }}
                onPress={_close}
              >
                <Image source={require(closeIcon)} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
              <TextWrapper style={{ color: 'white', fontSize: 24 }}>{t('Contact US')}</TextWrapper>
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
              >
                <View style={styles.wrapper}>
                  <TextInput
                    multiline={true}
                    numberOfLines={15}
                    onChangeText={(text) => onChangeText(text)}
                    value={text}
                    style={styles.editor}
                    placeholder={t('Enter your problem')}
                    placeholderTextColor={'white'}
                    textAlignVertical="top"
                  />
                  <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleSubmit} style={styles.btnSubmit}>
                      <TextWrapper style={{ color: 'white', textAlign: 'center' }}>
                        {t('Submit')}
                      </TextWrapper>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </GestureHandlerRootView>
      <CustomAlertModal
        text={t('Submitted successfully!')}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
      />
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '5px 5px 1px 0px rgba(0, 0, 0, 0.6)',
    elevation: 8,
  },
  wrapper: {
    padding: 10,
  },
  editor: {
    color: 'white',
    padding: 10,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
    height: 150,
  },
  btnSubmit: {
    padding: 5,
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    width: '50%',
    marginTop: 10,
  },
});
