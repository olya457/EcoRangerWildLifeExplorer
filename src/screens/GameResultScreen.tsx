import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Image, Share, StyleSheet, View} from 'react-native';
import {AppText} from '../components/AppText';
import {PrimaryButton} from '../components/Buttons';
import {Screen} from '../components/Screen';
import {rangers} from '../data';
import {useStorage} from '../storage/StorageProvider';
import {colors, radii} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'GameResult'>;

export function GameResultScreen({route, navigation}: Props) {
  const {bestGameScore, updateBestGameScore} = useStorage();
  const ranger = rangers.find(item => item.id === route.params.rangerId) ?? rangers[0];
  const best = Math.max(bestGameScore, route.params.score);

  useEffect(() => {
    updateBestGameScore(route.params.score);
  }, [route.params.score, updateBestGameScore]);

  const share = () => {
    Share.share({message: `I scored ${route.params.score} in Eco Ranger Mini-Game with ${ranger.name}!`}).catch(() => {});
  };

  return (
    <Screen contentStyle={styles.root}>
      <Image source={ranger.image} resizeMode="contain" style={styles.ranger} />
      <AppText size={30} weight="900">Game Over!</AppText>
      <View style={styles.scoreRow}>
        <View style={styles.scoreCard}>
          <AppText size={12} color={colors.muted}>Score</AppText>
          <AppText size={45} weight="900" color={colors.orange}>{route.params.score}</AppText>
        </View>
        <View style={styles.scoreCard}>
          <AppText size={12} color={colors.muted}>Best</AppText>
          <AppText size={45} weight="900" color={colors.amber}>{best}</AppText>
        </View>
      </View>
      <PrimaryButton title="Share Score" icon="↗" onPress={share} style={styles.secondaryButton} />
      <PrimaryButton title="Home" onPress={() => navigation.navigate('MainTabs', {screen: 'Game'})} style={styles.button} />
      <PrimaryButton title="Change Character" onPress={() => navigation.navigate('MainTabs', {screen: 'Game'})} style={styles.linkButton} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
  },
  ranger: {
    width: 118,
    height: 148,
    marginBottom: 4,
  },
  scoreRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 14,
    marginTop: 12,
  },
  scoreCard: {
    flex: 1,
    minHeight: 112,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: colors.surfaceAlt,
    marginTop: 6,
  },
  button: {
    width: '100%',
  },
  linkButton: {
    width: '100%',
    backgroundColor: 'transparent',
    minHeight: 44,
  },
});
