import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {AppText} from './AppText';
import {colors, radii} from '../theme/theme';

type Option<T extends string> = {
  label: string;
  value: T;
};

type Props<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends string>({options, value, onChange}: Props<T>) {
  return (
    <View style={styles.root}>
      {options.map(option => {
        const active = option.value === value;

        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={({pressed}) => [styles.option, active && styles.active, pressed && styles.pressed]}>
            <AppText weight="800" size={13} color={active ? colors.white : colors.muted}>
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    padding: 4,
    flexDirection: 'row',
  },
  option: {
    flex: 1,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: colors.orange,
  },
  pressed: {
    opacity: 0.78,
  },
});
