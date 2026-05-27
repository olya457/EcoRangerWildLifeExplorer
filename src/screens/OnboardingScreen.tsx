import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useMemo, useState} from 'react';
import {Image, ImageBackground, Platform, Pressable, StyleSheet, useWindowDimensions, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {images} from '../assets/assets';
import {AppText} from '../components/AppText';
import {PrimaryButton} from '../components/Buttons';
import {useStorage} from '../storage/StorageProvider';
import {colors, radii, spacing} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const slides = [
  {
    title: 'Explore Protected Wild Places',
    text: 'Discover nature reserves, wildlife parks, and protected habitats where animals live, move, and thrive',
    button: 'Continue',
    image: images.onboardingCards.places,
  },
  {
    title: 'Meet Wild Animals',
    text: 'Learn about different animal species, their habitats, behavior, and unique survival features',
    button: 'Continue',
    image: images.onboardingCards.animals,
  },
  {
    title: 'Learn, Play, and Protect',
    text: 'Read nature facts, test your wildlife knowledge, and play a fast mini-game as your favorite animal character',
    button: 'Get Started',
    image: images.onboardingCards.learn,
  },
];

export function OnboardingScreen({navigation}: Props) {
  const [index, setIndex] = useState(0);
  const {completeOnboarding} = useStorage();
  const insets = useSafeAreaInsets();
  const {height, width} = useWindowDimensions();
  const compact = height < 740;
  const tiny = height < 670;
  const visualHeight = useMemo(() => {
    const limit = tiny ? height * 0.34 : compact ? height * 0.38 : height * 0.43;
    return Math.round(Math.max(tiny ? 184 : 224, Math.min(367, limit)));
  }, [compact, height, tiny]);
  const visualWidth = useMemo(() => Math.min(width - 32, Math.round(visualHeight * (361 / 367))), [visualHeight, width]);
  const top = Platform.OS === 'android' ? Math.max(insets.top, spacing.androidEdge) : insets.top;
  const overlayStyle = useMemo(
    () => [
      styles.overlay,
      {
        paddingTop: top + (tiny ? 4 : 12),
        paddingBottom: Platform.OS === 'android' ? 30 : tiny ? 14 : 20,
      },
    ],
    [tiny, top],
  );
  const visualStyle = useMemo(() => [styles.visual, {height: visualHeight, width: visualWidth}], [visualHeight, visualWidth]);
  const copyStyle = useMemo(() => [styles.copy, tiny && styles.copyTiny, compact && styles.copyCompact], [compact, tiny]);
  const titleSize = tiny ? 22 : compact ? 25 : 29;
  const textSize = tiny ? 13 : 15;
  const titleStyle = useMemo(() => [styles.title, tiny && styles.titleTiny], [tiny]);
  const bodyStyle = useMemo(() => [styles.body, tiny && styles.bodyTiny], [tiny]);
  const dotsStyle = useMemo(() => [styles.dots, tiny && styles.dotsTiny], [tiny]);
  const buttonStyle = useMemo(() => [styles.button, tiny && styles.buttonTiny], [tiny]);
  const slide = slides[index];

  const finish = () => {
    completeOnboarding();
    navigation.replace('MainTabs');
  };

  const next = () => {
    if (index === slides.length - 1) {
      finish();
      return;
    }
    setIndex(index + 1);
  };

  return (
    <ImageBackground source={images.loaderBackground} style={styles.root} resizeMode="cover">
      <View style={overlayStyle}>
        <Pressable onPress={finish} style={styles.skip}>
          <AppText size={13} weight="800" color={colors.muted}>Skip</AppText>
        </Pressable>
        <View style={visualStyle}>
          <Image source={slide.image} resizeMode="cover" style={styles.visualImage} />
        </View>
        <View style={copyStyle}>
          <AppText size={titleSize} weight="900" align="center" style={titleStyle}>
            {slide.title}
          </AppText>
          <AppText size={textSize} weight="600" color={colors.mutedStrong} align="center" style={bodyStyle}>
            {slide.text}
          </AppText>
        </View>
        <View style={dotsStyle}>
          {slides.map((_, dotIndex) => (
            <View key={dotIndex} style={[styles.dot, dotIndex === index && styles.dotActive]} />
          ))}
        </View>
        <PrimaryButton title={slide.button} onPress={next} style={buttonStyle} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 16,
  },
  skip: {
    alignSelf: 'flex-end',
    paddingHorizontal: 4,
    paddingVertical: 10,
  },
  visual: {
    alignSelf: 'center',
    borderRadius: radii.xl,
    overflow: 'hidden',
    marginTop: 6,
    backgroundColor: colors.surface,
  },
  visualImage: {
    width: '100%',
    height: '100%',
    borderRadius: radii.xl,
  },
  copy: {
    marginTop: 26,
    paddingHorizontal: 8,
    gap: 14,
  },
  copyCompact: {
    marginTop: 18,
    gap: 10,
  },
  copyTiny: {
    marginTop: 12,
    gap: 8,
    paddingHorizontal: 2,
  },
  title: {
    lineHeight: 36,
  },
  titleTiny: {
    lineHeight: 28,
  },
  body: {
    lineHeight: 24,
  },
  bodyTiny: {
    lineHeight: 20,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 22,
  },
  dotsTiny: {
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surfaceAlt,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.orange,
  },
  button: {
    marginTop: 'auto',
    marginBottom: 20,
    minHeight: 54,
    width: '88%',
    alignSelf: 'center',
  },
  buttonTiny: {
    minHeight: 50,
    width: '90%',
  },
});
