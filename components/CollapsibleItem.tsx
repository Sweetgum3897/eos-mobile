import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';

import { TextWrapper } from './ui';

const checkIcon = '../assets/svg/home/checkIconwhite.svg';
const downIcon = '../assets/svg/home/downIcon2.svg';
const upIcon = '../assets/svg/home/upIcon.svg';
export const CollapsibleItem = ({ text, content }: { text: string; content: string }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
      }}
      onPress={() => setVisible(!visible)}
    >
      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: visible ? 'white' : '#81817E',
          backgroundColor: visible ? 'black' : '#81817E',
          padding: 12,
          // ...Styles.shadow,
          width: '100%',
        }}
      >
        <View style={{ flexDirection: 'column', width: '100%' }}>
          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                paddingVertical: 4,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require(checkIcon)} style={{ width: 19, height: 19 }} />
                <TextWrapper
                  style={{
                    color: 'white',
                    fontSize: 14,
                    width: '90%',
                    paddingLeft: 5,
                  }}
                >
                  {text}
                </TextWrapper>
              </View>
              <TouchableOpacity>
                {visible ? (
                  <Image source={require(upIcon)} style={{ width: 18, height: 18 }} />
                ) : (
                  <Image source={require(downIcon)} style={{ width: 18, height: 18 }} />
                )}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          {visible && (
            <View
              style={{
                position: 'relative',
                flexDirection: 'row',
                width: '100%',
                borderTopColor: '#B7B7B7',
                padding: 5,
                borderTopWidth: 1,
              }}
            >
              <TextWrapper style={{ color: '#B7B7B7', fontSize: 15 }}>{content}</TextWrapper>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};
