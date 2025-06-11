// Import useState
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View } from 'react-native';

export const EmailInput = ({
  setEmailId,
  emailId,
  editable = true
}: {
  setEmailId: (emailId: string) => void;
  emailId: string;
  editable?: boolean
}) => {
  const { t } = useTranslation();

  const [isFocused, setIsFocused] = useState(false); // State to track focus

  return (
    <View
      style={[
        styles.InputWrapper,
        {
          borderColor: emailId.length > 0 || isFocused ? 'black' : '#E2DCD5',
          backgroundColor: emailId.length > 0 || isFocused ? 'white' : '#E2DCD5',
        },
      ]}
    >
      <View>
        <Image source={require('../../assets/svg/email.svg')} style={{ width: 20, height: 20 }} />
      </View>
      <TextInput
        style={[styles.textInput, { color: isFocused ? 'black' : 'black' }]}
        placeholder={t('emailAddress')}
        placeholderTextColor={emailId.length > 0 || isFocused ? 'black' : '#4F4D4A'}
        onChangeText={(newText) => setEmailId(newText)}
        value={emailId}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        editable={editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '96%',
    fontFamily: 'PatrickHand',
    fontWeight: '300',
    fontSize: 16,
    paddingHorizontal: 10,
    // paddingVertical: 26
  },
  InputWrapper: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2DCD5',
    backgroundColor: '#E2DCD5',
    height: 50,
    color: '#FFFFFF',
    alignItems: 'center',
  },
});
