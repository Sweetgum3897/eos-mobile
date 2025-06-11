import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export const GradientCard = ({
  colors,
  style,
  children,
}: {
  colors?: readonly [string, string, ...string[]];
  style: StyleProp<ViewStyle>;
  children: ReactNode;
}) => {
  return (
    <LinearGradient
      colors={colors || ['#4145B0', '#151539']}
      start={{
        x: 0,
        y: 0,
      }}
      end={{
        x: 1,
        y: 0,
      }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
};
