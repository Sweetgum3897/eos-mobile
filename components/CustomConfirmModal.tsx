import { TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import { TextWrapper } from './ui';

export const CustomConfirmModal = ({
  text,
  buttonText = 'Confirm',
  button2Text = 'Cancel',
  isVisible,
  confirmButtonHandler,
  cancelButtonHandler,
}: {
  text: string;
  buttonText?: string;
  button2Text?: string;
  isVisible: boolean;
  confirmButtonHandler: () => void;
  cancelButtonHandler: () => void;
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => cancelButtonHandler()}
      style={{ alignItems: 'center' }}
    >
      <View style={{ backgroundColor: 'white', width: '90%', padding: 10 }}>
        <View>
          <TextWrapper style={{ fontSize: 18 }}>{text}</TextWrapper>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            marginRight: 10,
            marginTop: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => confirmButtonHandler()}
            style={{ borderWidth: 1, padding: 5, borderRadius: 5 }}
          >
            <TextWrapper style={{ fontSize: 15 }}>{buttonText}</TextWrapper>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => cancelButtonHandler()}
            style={{ borderWidth: 1, padding: 5, borderRadius: 5 }}
          >
            <TextWrapper style={{ fontSize: 15 }}>{button2Text}</TextWrapper>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
