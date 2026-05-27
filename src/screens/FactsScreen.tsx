import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, Share, StyleSheet, View} from 'react-native';
import {AppText} from '../components/AppText';
import {PrimaryButton} from '../components/Buttons';
import {Screen} from '../components/Screen';
import {facts} from '../data';
import {colors, radii} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function FactsScreen() {
  const navigation = useNavigation<Navigation>();

  const shareFact = (text: string) => {
    Share.share({message: text}).catch(() => {});
  };

  return (
    <Screen scroll withTabBar>
      <AppText size={24} weight="900">Facts & Quiz</AppText>
      <AppText size={10} weight="900" color={colors.muted} style={styles.kicker}>DID YOU KNOW?</AppText>
      <View style={styles.quizCard}>
        <View style={styles.quizCopy}>
          <AppText size={22}>⚡</AppText>
          <AppText size={17} weight="900">Wildlife Quiz</AppText>
          <AppText size={12} color={colors.mutedStrong}>8 questions · 30 sec each · Beat your best score</AppText>
          <PrimaryButton title="Start Quiz" icon="▶" onPress={() => navigation.navigate('Quiz')} style={styles.quizButton} />
        </View>
        <AppText size={58} style={styles.brain}>🧠</AppText>
      </View>
      <View style={styles.list}>
        {facts.map(fact => (
          <View key={fact.id} style={styles.factCard}>
            <View style={styles.factIcon}>
              <AppText size={21}>{fact.icon}</AppText>
            </View>
            <View style={styles.factBody}>
              <View style={styles.factHeader}>
                <View style={styles.factBadge}>
                  <AppText size={10} weight="900" color={colors.mutedStrong}>{fact.category}</AppText>
                </View>
                <Pressable onPress={() => shareFact(`${fact.category}: ${fact.text}`)} style={styles.share}>
                  <AppText size={14}>↗</AppText>
                </Pressable>
              </View>
              <AppText size={14} weight="600" color={colors.mutedStrong} style={styles.factText}>{fact.text}</AppText>
            </View>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  kicker: {
    marginTop: 2,
    marginBottom: 16,
  },
  quizCard: {
    minHeight: 140,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    padding: 18,
    overflow: 'hidden',
  },
  quizCopy: {
    maxWidth: '76%',
    gap: 8,
  },
  quizButton: {
    minHeight: 42,
    width: 116,
    borderRadius: radii.round,
    marginTop: 6,
  },
  brain: {
    position: 'absolute',
    right: 18,
    top: 28,
    opacity: 0.22,
  },
  list: {
    marginTop: 14,
    gap: 14,
  },
  factCard: {
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
  },
  factIcon: {
    width: 30,
    alignItems: 'center',
    paddingTop: 2,
  },
  factBody: {
    flex: 1,
    gap: 10,
  },
  factHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  factBadge: {
    alignSelf: 'flex-start',
    borderRadius: radii.round,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  share: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  factText: {
    lineHeight: 22,
  },
});
