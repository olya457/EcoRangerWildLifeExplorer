import React from 'react';
import {Pressable, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {AppText} from './AppText';
import {colors, radii} from '../theme/theme';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  icon?: string;
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({title, onPress, icon, style}: PrimaryButtonProps) {
  return (
    <Pressable onPress={onPress} style={({pressed}) => [styles.primary, pressed && styles.pressed, style]}>
      {icon ? <AppText size={17} style={styles.icon}>{icon}</AppText> : null}
      <AppText weight="900" size={16}>{title}</AppText>
    </Pressable>
  );
}

type IconButtonProps = {
  icon: string;
  onPress: () => void;
  active?: boolean;
  size?: number;
  style?: ViewStyle;
};

export function IconButton({icon, onPress, active, size = 42, style}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.iconButton,
        {width: size, height: size, borderRadius: size / 2},
        active && styles.iconActive,
        pressed && styles.pressed,
        style,
      ]}>
      <AppText size={18}>{icon}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: {
    minHeight: 60,
    borderRadius: radii.md,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  icon: {
    marginTop: 1,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconActive: {
    borderColor: colors.orange,
    backgroundColor: colors.surfaceAlt,
  },
  pressed: {
    opacity: 0.78,
  },
});
