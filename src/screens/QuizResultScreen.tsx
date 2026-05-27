import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Share, StyleSheet, View} from 'react-native';
import {AppText} from '../components/AppText';
import {PrimaryButton} from '../components/Buttons';
import {Screen} from '../components/Screen';
import {useStorage} from '../storage/StorageProvider';
import {colors, radii} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'QuizResult'>;

export function QuizResultScreen({route, navigation}: Props) {
  const {bestQuizScore} = useStorage();
  const best = Math.max(bestQuizScore, route.params.score);

  const share = () => {
    Share.share({message: `I scored ${route.params.score} out of ${route.params.total} in Eco Ranger Wildlife Quiz!`}).catch(() => {});
  };

  return (
    <Screen contentStyle={styles.root}>
      <View style={styles.trophy}>
        <AppText size={45}>🏆</AppText>
      </View>
      <AppText size={26} weight="900">Quiz Complete!</AppText>
      <AppText color={colors.mutedStrong}>Here are your results</AppText>
      <View style={styles.scoreRow}>
        <View style={styles.scoreCard}>
          <AppText size={11} color={colors.muted}>Your Score</AppText>
          <AppText size={42} weight="900" color={colors.orange}>{route.params.score}</AppText>
          <AppText size={11} color={colors.muted}>out of {route.params.total}</AppText>
        </View>
        <View style={styles.scoreCard}>
          <AppText size={11} color={colors.muted}>Best Score</AppText>
          <AppText size={42} weight="900" color={colors.amber}>{best}</AppText>
          <AppText size={11} color={colors.muted}>out of {route.params.total}</AppText>
        </View>
      </View>
      <PrimaryButton title="Share Result" icon="↗" onPress={share} style={styles.secondaryButton} />
      <PrimaryButton title="Back to Facts" onPress={() => navigation.navigate('MainTabs', {screen: 'Facts'})} style={styles.button} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  trophy: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  scoreRow: {
    flexDirection: 'row',
    gap: 14,
    width: '100%',
    marginTop: 18,
  },
  scoreCard: {
    flex: 1,
    minHeight: 108,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: colors.surfaceAlt,
    marginTop: 4,
  },
  button: {
    width: '100%',
  },
});
