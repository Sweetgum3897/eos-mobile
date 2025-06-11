import { Image } from 'expo-image';
import { View } from 'react-native';

const NextBtn = '../assets/svg/nextIconbutton.svg';
export const NextImage = () => {
  return (
    <View style={{ position: 'absolute', right: 20, top: 20 }}>
      <Image source={require(NextBtn)} style={{ width: 34, height: 14 }} />
    </View>
  );
};
