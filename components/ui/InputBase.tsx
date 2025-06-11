import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export const InputBase = ({
  renderIcon,
  onChangeText,
  value = '',
  renderInput,
  placeholder = '',
  error = false,
  type = 'none',
}: {
  renderIcon?: any;
  onChangeText?: (value: string) => void;
  value: string;
  renderInput?: any;
  placeholder?: string;
  type?: string;
  error?: boolean;
}) => {
  const [isFocused, setIsFocused] = useState(false); // State to track focus
  return (
    <View
      style={[
        styles.basic,
        isFocused || value.length > 0 ? styles.active : styles.default,
        ,
        error ? styles.error : null,
      ]}
    >
      {renderIcon && renderIcon()}
      {!renderInput ? (
        <TextInput
          style={styles.input}
          placeholderTextColor={'#4F4D4A'}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={type === 'password'}
        />
      ) : (
        renderInput()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    fontFamily: 'PatrickHand',
    fontWeight: '300',
    width: '100%',
    paddingHorizontal: 10,
  },
  basic: {
    height: 50,
    marginTop: 10,
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    borderStyle: 'solid',
    alignItems: 'center',
  },
  active: {
    borderColor: 'black',
    backgroundColor: 'white',
    color: 'black',
  },
  default: {
    borderColor: '#E2DCD5',
    backgroundColor: '#E2DCD5',
    color: '#4F4D4A',
  },
  error: {
    borderColor: 'red',
  },
});
