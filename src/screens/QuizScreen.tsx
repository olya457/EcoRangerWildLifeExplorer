import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {AppText} from '../components/AppText';
import {PrimaryButton} from '../components/Buttons';
import {Screen} from '../components/Screen';
import {quizQuestions} from '../data';
import {useStorage} from '../storage/StorageProvider';
import {colors, radii} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;

export function QuizScreen({navigation}: Props) {
  const {updateBestQuizScore} = useStorage();
  const questions = useMemo(() => [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 8), []);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const answerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const question = questions[current];

  const finish = useCallback(
    (finalScore: number) => {
      updateBestQuizScore(finalScore);
      navigation.replace('QuizResult', {score: finalScore, total: questions.length});
    },
    [navigation, questions.length, updateBestQuizScore],
  );

  const goNext = useCallback(
    (nextScore: number) => {
      if (current >= questions.length - 1) {
        finish(nextScore);
        return;
      }
      setCurrent(value => value + 1);
      setSelectedIndex(null);
      setSeconds(30);
    },
    [current, finish, questions.length],
  );

  useEffect(() => {
    if (paused || selectedIndex !== null) {
      return;
    }

    if (seconds <= 0) {
      goNext(score);
      return;
    }

    const timer = setTimeout(() => setSeconds(value => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [goNext, paused, score, seconds, selectedIndex]);

  useEffect(() => {
    return () => {
      if (answerTimer.current) {
        clearTimeout(answerTimer.current);
      }
    };
  }, []);

  const select = (index: number) => {
    if (selectedIndex !== null) {
      return;
    }

    const correct = index === question.answerIndex;
    const nextScore = correct ? score + 1 : score;
    setSelectedIndex(index);
    setScore(nextScore);
    answerTimer.current = setTimeout(() => goNext(nextScore), 700);
  };

  if (paused) {
    return (
      <Screen contentStyle={styles.pause}>
        <AppText size={58}>⏸️</AppText>
        <AppText size={30} weight="900">Paused</AppText>
        <AppText color={colors.mutedStrong}>Take a breather, ranger!</AppText>
        <PrimaryButton title="Resume Quiz" onPress={() => setPaused(false)} style={styles.pauseButton} />
        <Pressable onPress={() => navigation.navigate('MainTabs', {screen: 'Facts'})} style={styles.textButton}>
          <AppText color={colors.mutedStrong} weight="800">Quit Quiz</AppText>
        </Pressable>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.navigate('MainTabs', {screen: 'Facts'})} style={styles.circle}>
          <AppText size={18}>×</AppText>
        </Pressable>
        <AppText size={11} weight="900" color={colors.mutedStrong}>Question {current + 1} of {questions.length}</AppText>
        <Pressable onPress={() => setPaused(true)} style={styles.circle}>
          <AppText size={16}>⏸</AppText>
        </Pressable>
      </View>
      <View style={styles.progress}>
        {questions.map((item, index) => (
          <View key={item.id} style={[styles.progressItem, index <= current && styles.progressActive]} />
        ))}
      </View>
      <View style={styles.timerCard}>
        <AppText size={16}>⏱</AppText>
        <View style={styles.timerTrack}>
          <View style={[styles.timerFill, {width: `${(seconds / 30) * 100}%`}]} />
        </View>
        <AppText size={13} weight="900">{seconds}</AppText>
      </View>
      <View style={styles.questionCard}>
        <AppText size={19} weight="900" style={styles.question}>{question.question}</AppText>
      </View>
      <View style={styles.options}>
        {question.options.map((option, index) => {
          const selected = selectedIndex === index;
          const correct = question.answerIndex === index;
          const showCorrect = selectedIndex !== null && correct;
          const wrong = selected && !correct;

          return (
            <Pressable
              key={option}
              onPress={() => select(index)}
              style={({pressed}) => [
                styles.option,
                showCorrect && styles.correct,
                wrong && styles.wrong,
                pressed && selectedIndex === null && styles.pressed,
              ]}>
              <View style={styles.optionLetter}>
                <AppText size={12}>{String.fromCharCode(65 + index)}</AppText>
              </View>
              <AppText size={14} weight="800" style={styles.optionText}>{option}</AppText>
            </Pressable>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  circle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  progress: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 18,
  },
  progressItem: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surfaceAlt,
  },
  progressActive: {
    backgroundColor: colors.orange,
  },
  timerCard: {
    height: 48,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 12,
    marginBottom: 16,
  },
  timerTrack: {
    flex: 1,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.surfaceAlt,
    overflow: 'hidden',
  },
  timerFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: colors.orange,
  },
  questionCard: {
    minHeight: 96,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    padding: 18,
    marginBottom: 20,
  },
  question: {
    lineHeight: 25,
  },
  options: {
    gap: 12,
  },
  option: {
    minHeight: 56,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 14,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  correct: {
    backgroundColor: 'rgba(104, 181, 74, 0.28)',
    borderColor: colors.green,
  },
  wrong: {
    backgroundColor: 'rgba(242, 71, 88, 0.35)',
    borderColor: colors.red,
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  optionText: {
    flex: 1,
    lineHeight: 20,
  },
  pause: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
  },
  pauseButton: {
    width: '56%',
    marginTop: 10,
  },
  textButton: {
    padding: 12,
  },
  pressed: {
    opacity: 0.78,
  },
});
