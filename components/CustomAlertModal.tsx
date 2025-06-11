import { TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import { TextWrapper } from './ui';

export const CustomAlertModal = ({
  text,
  buttonText = 'Close',
  isVisible,
  onBackdropPress,
}: {
  text: string;
  buttonText?: string;
  isVisible: boolean;
  onBackdropPress: () => void;
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => onBackdropPress()}
      style={{ alignItems: 'center' }}
    >
      <View style={{ backgroundColor: 'white', width: '90%', padding: 10 }}>
        <View>
          <TextWrapper style={{ fontSize: 18 }}>{text}</TextWrapper>
        </View>
        <View style={{ display: 'flex', alignItems: 'flex-end', marginRight: 10, marginTop: 30 }}>
          <TouchableOpacity onPress={onBackdropPress}>
            <TextWrapper style={{ fontSize: 20 }}>{buttonText}</TextWrapper>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
