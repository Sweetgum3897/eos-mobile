import { Image } from 'expo-image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ModalWrapper, TextWrapper } from '@/components';
import { TLPContent } from '@/types';

const closeIcon = '../assets/svg/home/closeIcon.svg';

export const PrivacyPolicy = ({ close }: { close: () => void }) => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(true);
  const _close = () => {
    close();
    setVisible(!visible);
  };

  const _privacyPolicy: TLPContent = {
    title: 'Privacy Policy for Eos Mobile App',
    content: [
      {
        title: t('privacyTitle1'),
        description: [
          {
            text: t('privacyDescription1'),
          },
        ],
      },
      {
        title: t('privacyTitle2'),
        description: [
          {
            text: t('privacyDescription2'),
            li: [
              t('privacyDescription2li1'),
              t('privacyDescription2li2'),
              t('privacyDescription2li3'),
              t('privacyDescription2li4'),
            ],
          },
        ],
      },
      {
        title: t('privacyTitle3'),
        description: [
          {
            text: t('privacyDescription3'),
            li: [
              t('privacyDescription3li1'),
              t('privacyDescription3li2'),
              t('privacyDescription3li3'),
              t('privacyDescription3li4'),
              t('privacyDescription3li5'),
            ],
          },
        ],
      },
      {
        title: t('privacyTitle4'),
        description: [
          {
            text: t('privacyDescription4'),
            li: [t('privacyDescription4li1'), t('privacyDescription4li2')],
          },
        ],
      },
      {
        title: t('privacyTitle5'),
        description: [
          {
            text: t('privacyDescription5'),
          },
        ],
      },
      {
        title: t('privacyTitle6'),
        description: [
          {
            text: t('privacyDescription6_1'),
            li: [
              t('privacyDescription6_1li1'),
              t('privacyDescription6_1li2'),
              t('privacyDescription6_1li3'),
            ],
          },
          {
            text: t('privacyDescription6_2'),
          },
        ],
      },
      {
        title: t('privacyTitle7'),
        description: [
          {
            text: t('privacyDescription7'),
          },
        ],
      },
      {
        title: t('privacyTitle8'),
        description: [
          {
            text: t('privacyDescription8'),
          },
        ],
      },
      {
        title: t('privacyTitle9'),
        description: [
          {
            text: t('privacyDescription9'),
          },
        ],
      },
      {
        title: t('privacyTitle10'),
        description: [
          {
            text: t('privacyDescription10'),
          },
        ],
      },
      {
        title: t('privacyTitle11'),
        description: [
          {
            text: t('privacyDescription11'),
          },
        ],
      },
    ],
  };

  return (
    <ModalWrapper visible={visible} onClose={_close}>
      <View
        style={{
          alignItems: 'center',
          height: '100%',
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
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              backgroundColor: '#181818',
            }}
          >
            <TouchableOpacity style={{ position: 'absolute', left: 10, top: 10 }} onPress={_close}>
              <Image source={require(closeIcon)} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <TextWrapper style={{ color: 'white', fontSize: 24 }}>
              {_privacyPolicy.title}
            </TextWrapper>
          </View>

          <ScrollView>
            <View
              style={{
                flexDirection: 'column',
                padding: 15,
                gap: 10,
                backgroundColor: '#686662',
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
            >
              {_privacyPolicy.content.map((item, index) => (
                <View key={index} style={{ flexDirection: 'column', gap: 10 }}>
                  <TextWrapper style={{ color: '#F8F2EA', fontSize: 20 }}>
                    {index + 1}. {item.title}
                  </TextWrapper>
                  {item.description.map((_item, _index) => (
                    <View
                      key={_index}
                      style={{ flexDirection: 'column', gap: 10, paddingLeft: 15 }}
                    >
                      <TextWrapper style={{ color: '#F8F2EA', fontSize: 20 }}>
                        {_item.text}
                      </TextWrapper>
                      {_item.li && (
                        <View
                          key={_index}
                          style={{
                            flexDirection: 'column',
                            gap: 10,
                            paddingLeft: 15,
                            paddingRight: 15,
                          }}
                        >
                          {_item.li.map((__item, __index) => (
                            <View key={__index} style={{ flexDirection: 'row', gap: 10 }}>
                              <TextWrapper
                                style={{
                                  paddingTop: 1,
                                  color: '#F8F2EA',
                                  fontSize: 20,
                                  fontWeight: 'bold',
                                }}
                              >
                                •
                              </TextWrapper>
                              <TextWrapper style={{ color: '#F8F2EA', fontSize: 20 }}>
                                {__item}
                              </TextWrapper>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              ))}
            </View>
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
