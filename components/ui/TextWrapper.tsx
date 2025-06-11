import { ReactNode } from 'react';
import { Text } from 'react-native';

export const TextWrapper = ({ children, style }: { children: ReactNode; style?: any }) => {
  return (
    <Text style={{ color: '#181818', fontSize: 12, fontFamily: 'PatrickHand', ...style }}>
      {children}
    </Text>
  );
};
