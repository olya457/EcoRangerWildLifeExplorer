import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {AppText} from './AppText';
import {colors, radii} from '../theme/theme';

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
};

export function SearchField({value, onChangeText, placeholder}: Props) {
  return (
    <View style={styles.root}>
      <AppText size={16} color={colors.muted}>⌕</AppText>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        style={styles.input}
        selectionColor={colors.orange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    paddingVertical: 0,
  },
});
