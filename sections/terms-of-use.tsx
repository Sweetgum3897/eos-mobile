import { Image } from 'expo-image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ModalWrapper, TextWrapper } from '@/components';
import { TLPContent } from '@/types';

const closeIcon = '../assets/svg/home/closeIcon.svg';

export const TermsOfUse = ({ close }: { close: () => void }) => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(true);
  const _close = () => {
    setVisible(!visible);
  };

  const _termsOfUse: TLPContent = {
    title: t('termsOfUseForEosMobileApp'),
    content: [
      {
        title: t('termsTitle1'),
        description: [
          {
            text: t('termsDescription1'),
          },
        ],
      },
      {
        title: t('termsTitle2'),
        description: [
          {
            text: t('termsDescription2'),
          },
        ],
      },
      {
        title: t('termsTitle3'),
        description: [
          {
            text: t('termsDescription3'),
          },
        ],
      },
      {
        title: t('termsTitle4'),
        description: [
          {
            text: t('termsDescription4'),
          },
        ],
      },
      {
        title: t('termsTitle5'),
        description: [
          {
            text: t('termsDescription5'),
            li: [
              t('termsDescription5li1'),
              t('termsDescription5li2'),
              t('termsDescription5li3'),
              t('termsDescription5li4'),
              t('termsDescription5li5'),
            ],
          },
        ],
      },
      {
        title: t('termsTitle6'),
        description: [
          {
            text: t('termsDescription6'),
          },
        ],
      },
      {
        title: t('termsTitle7'),
        description: [
          {
            text: t('termsDescription7'),
          },
        ],
      },
      {
        title: t('termsTitle8'),
        description: [
          {
            text: t('termsDescription8'),
          },
        ],
      },
      {
        title: t('termsTitle9'),
        description: [
          {
            text: t('termsDescription9'),
          },
        ],
      },
      {
        title: t('termsTitle10'),
        description: [
          {
            text: t('termsDescription10'),
          },
        ],
      },
    ],
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
            <TextWrapper style={{ color: 'white', fontSize: 24 }}>{_termsOfUse.title}</TextWrapper>
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
              {_termsOfUse.content.map((item, index) => (
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
                      {_item.text && (
                        <View
                          key={_index}
                          style={{
                            flexDirection: 'column',
                            gap: 10,
                            paddingLeft: 15,
                            paddingRight: 15,
                          }}
                        >
                          {_item?.li &&
                            _item.li.map((__item, __index) => (
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
