import { Entypo, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { GradientCard, ModalWrapper, TextWrapper } from '@/components';

const closeIcon = '../assets/svg/home/closeIcon.svg';

export const Faq = ({ close }: { close: () => void }) => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(true);
  const _close = () => {
    setVisible(!visible);
  };

  const [faqs, setFaqs] = useState([
    {
      question: 'How to recover deleted photos?',
      answer:
        'Photos are the guardians of our memories. Now mainly stored digitally, particularly on hard drives, many people despair when they become corrupted or are accidentally deleted.',
    },
    {
      question: 'What is an Individual Savings Account (ISA)?',
      answer:
        'An ISA, or Individual Savings Account, is a savings account that you never pay any tax on. It does come with one restriction, which is the amount of money you can save or invest in an ISA in a single tax year – also known as your annual ISA allowance. For the current tax year this allowance is £20,000. It helps to think of an ISA as a protective box: the things you put inside are protected from tax and there are two basic types of ISA to choose from – Cash ISAs and Stocks & Shares ISAs.',
    },
    {
      question: 'What is a Cash ISA?',
      answer:
        'Cash ISAs are more like an ordinary savings account: you pay cash in and it earns interest, tax free.',
    },
    {
      question: 'What is a Stocks & Shares ISA?',
      answer:
        'The ISA for investments is called a Stocks and Shares ISA: rather than simply saving, you are investing in things like stocks and shares, bonds, gilts or commercial properties to help your savings grow over time and any interest or returns you get are tax free. Stocks and Shares ISAs may have the potential for quicker or greater growth, but because they are based on the stock market there’s always a risk the amount of money in your ISA could go down as well as up, so you may get back less than you put in.',
    },
    {
      question: 'ISAs come in different shapes and sizes',
      answer:
        'In addition to the basic Cash ISA and Stocks & Shares ISA, different types have been created, to help people save for different things such as:',
    },
  ]);
  const [questionShow, setQuestionShow] = useState<number>();

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
            <TextWrapper style={{ color: 'white', fontSize: 24 }}>{t('Faq')}</TextWrapper>
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
              {faqs.map((faq, ind) => (
                <GradientCard
                  key={ind}
                  colors={['#464646', '#464646']}
                  style={{
                    width: '100%',
                    padding: 10,
                    marginTop: 10,
                    borderRadius: 8,
                    flexDirection: 'column',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setQuestionShow(ind === questionShow ? undefined : ind)}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <TextWrapper style={{ color: 'white' }}>{faq.question}</TextWrapper>

                      {ind === questionShow ? (
                        <Entypo name="chevron-down" size={20} color="white" />
                      ) : (
                        <Ionicons name="chevron-forward" size={20} color="white" />
                      )}
                    </View>
                  </TouchableOpacity>

                  {ind === questionShow && (
                    <View style={{ padding: 5 }}>
                      <TextWrapper style={{ color: 'white', fontSize: 12 }}>
                        {faq.answer}
                      </TextWrapper>
                    </View>
                  )}
                </GradientCard>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </ModalWrapper>
  );
};

const Styles = StyleSheet.create({
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
