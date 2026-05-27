import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {AppText} from '../components/AppText';
import {PrimaryButton} from '../components/Buttons';
import {Screen} from '../components/Screen';
import {rangers} from '../data';
import {useStorage} from '../storage/StorageProvider';
import {colors, radii} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function GameHomeScreen() {
  const navigation = useNavigation<Navigation>();
  const {bestGameScore} = useStorage();
  const [selected, setSelected] = useState(rangers[0].id);

  return (
    <Screen scroll withTabBar>
      <AppText size={26} weight="900">Mini-Game</AppText>
      <AppText size={12} color={colors.mutedStrong} style={styles.subtitle}>Catch wildlife items before they vanish!</AppText>
      <AppText size={11} weight="900" color={colors.muted} style={styles.kicker}>CHOOSE YOUR RANGER</AppText>
      <View style={styles.grid}>
        {rangers.map(ranger => {
          const active = ranger.id === selected;

          return (
            <Pressable key={ranger.id} onPress={() => setSelected(ranger.id)} style={[styles.rangerCard, active && styles.rangerActive]}>
              <Image source={ranger.image} resizeMode="contain" style={styles.rangerImage} />
              <AppText weight="900">{ranger.name}</AppText>
              <AppText size={12} color={colors.mutedStrong} align="center">{ranger.title}</AppText>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.how}>
        <AppText size={16} weight="900">How to Play</AppText>
        <AppText size={13} color={colors.mutedStrong}>🍃 Catch green items before they disappear</AppText>
        <AppText size={13} color={colors.mutedStrong}>💨 Use arrow buttons to move your ranger</AppText>
        <AppText size={13} color={colors.mutedStrong}>❤️ Lose a life if an item vanishes - 3 lives total</AppText>
      </View>
      <View style={styles.best}>
        <AppText size={15} weight="900">🏆 Best Score</AppText>
        <AppText size={18} weight="900" color={colors.orange}>{bestGameScore}</AppText>
      </View>
      <PrimaryButton title="Start Game" icon="▶" onPress={() => navigation.navigate('GamePlay', {rangerId: selected})} style={styles.start} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 6,
  },
  kicker: {
    marginTop: 22,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  rangerCard: {
    width: '48%',
    minHeight: 128,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    gap: 6,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  rangerActive: {
    borderColor: colors.orange,
    backgroundColor: 'rgba(255, 116, 23, 0.16)',
  },
  rangerImage: {
    width: 54,
    height: 62,
  },
  how: {
    marginTop: 24,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    padding: 16,
    gap: 10,
  },
  best: {
    marginTop: 18,
    minHeight: 56,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  start: {
    marginTop: 18,
  },
});
