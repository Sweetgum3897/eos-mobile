import { ReactNode, useEffect, useRef } from 'react';
import { Animated, Dimensions, View } from 'react-native';

export const ModalWrapper = ({
  children,
  onClose,
  visible,
  isOpacity = false,
}: {
  children: ReactNode;
  onClose: () => void;
  visible: boolean;
  isOpacity?: boolean;
}) => {
  const windowWidth = Dimensions.get('screen').width;
  const windowHeight = Dimensions.get('screen').height;

  const animation = useRef(new Animated.Value(windowHeight)).current;

  const _close = () => {
    Animated.timing(animation, {
      toValue: windowHeight,
      duration: 400,
      useNativeDriver: false,
    }).start(() => {
      onClose();
    });
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);

  useEffect(() => {
    if (!visible) {
      _close();
    }
  }, [visible]);

  return (
    <View
      style={{
        width: windowWidth,
        backgroundColor: isOpacity ? '#f8f2eac2' : '#f8f2ea',
        top: 0,
        left: 0,
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 1000,
      }}
    >
      <Animated.View
        style={{
          width: windowWidth,
          height: windowHeight,
          marginTop: animation,
        }}
      >
        {children}
      </Animated.View>
    </View>
  );
};
