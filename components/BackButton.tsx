import { Image } from 'expo-image';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const backIcon = '../assets/svg/back.svg';
export const BackButton = ({ onClick }: { onClick: () => void }) => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ position: 'absolute', top, left: 14 }}>
      <TouchableOpacity onPress={onClick}>
        <Image source={require(backIcon)} style={{ width: 11, height: 14 }} />
      </TouchableOpacity>
    </View>
  );
};
