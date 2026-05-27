import React from 'react';
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import {colors} from '../theme/theme';

type Props = TextProps & {
  weight?: TextStyle['fontWeight'];
  color?: string;
  size?: number;
  align?: TextStyle['textAlign'];
};

export function AppText({style, weight = '600', color = colors.text, size = 15, align, ...props}: Props) {
  return (
    <Text
      {...props}
      allowFontScaling={false}
      style={[
        styles.base,
        {color, fontSize: size, fontWeight: weight, textAlign: align},
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    letterSpacing: 0,
  },
});
