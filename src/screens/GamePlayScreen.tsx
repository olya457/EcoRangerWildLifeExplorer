import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Image, ImageBackground, LayoutChangeEvent, Pressable, StyleSheet, View} from 'react-native';
import {images} from '../assets/assets';
import {AppText} from '../components/AppText';
import {PrimaryButton} from '../components/Buttons';
import {Screen} from '../components/Screen';
import {rangers} from '../data';
import {colors, radii} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'GamePlay'>;

const characterSize = 74;
const itemSize = 44;
const itemLifetimeMs = 12400;

export function GamePlayScreen({route, navigation}: Props) {
  const ranger = rangers.find(item => item.id === route.params.rangerId) ?? rangers[0];
  const [field, setField] = useState({width: 0, height: 0});
  const [position, setPosition] = useState({x: 0, y: 0});
  const [item, setItem] = useState<{id: number; x: number; y: number} | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [paused, setPaused] = useState(false);

  const hearts = useMemo(() => Array.from({length: 3}, (_, index) => (index < lives ? '❤️' : '🖤')), [lives]);

  const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

  const spawnItem = useCallback(() => {
    if (field.width <= itemSize || field.height <= itemSize) {
      return;
    }

    setItem({
      id: Date.now(),
      x: Math.random() * (field.width - itemSize - 24) + 12,
      y: Math.random() * (field.height * 0.58 - itemSize) + 30,
    });
  }, [field.height, field.width]);

  const onFieldLayout = (event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;
    setField({width, height});
    setPosition({
      x: width / 2 - characterSize / 2,
      y: height * 0.62,
    });
  };

  const finish = useCallback(() => {
    navigation.replace('GameResult', {score, rangerId: ranger.id});
  }, [navigation, ranger.id, score]);

  useEffect(() => {
    if (field.width && !item) {
      spawnItem();
    }
  }, [field.width, item, spawnItem]);

  useEffect(() => {
    if (!item || paused || lives <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setLives(value => value - 1);
      spawnItem();
    }, itemLifetimeMs);

    return () => clearTimeout(timer);
  }, [item, lives, paused, spawnItem]);

  useEffect(() => {
    if (lives <= 0) {
      finish();
    }
  }, [finish, lives]);

  useEffect(() => {
    if (!item || paused || lives <= 0) {
      return;
    }

    const characterCenter = {
      x: position.x + characterSize / 2,
      y: position.y + characterSize / 2,
    };
    const itemCenter = {
      x: item.x + itemSize / 2,
      y: item.y + itemSize / 2,
    };
    const distance = Math.hypot(characterCenter.x - itemCenter.x, characterCenter.y - itemCenter.y);

    if (distance < 54) {
      setScore(value => value + 10);
      spawnItem();
    }
  }, [item, lives, paused, position.x, position.y, spawnItem]);

  const move = (dx: number, dy: number) => {
    setPosition(value => ({
      x: clamp(value.x + dx, 0, Math.max(0, field.width - characterSize)),
      y: clamp(value.y + dy, 0, Math.max(0, field.height - characterSize)),
    }));
  };

  if (paused) {
    return (
      <Screen contentStyle={styles.pause}>
        <AppText size={58}>⏸️</AppText>
        <AppText size={30} weight="900">Paused</AppText>
        <AppText color={colors.mutedStrong}>Take a breather, ranger!</AppText>
        <PrimaryButton title="Resume" onPress={() => setPaused(false)} style={styles.pauseButton} />
        <Pressable onPress={() => navigation.navigate('MainTabs', {screen: 'Game'})} style={styles.textButton}>
          <AppText color={colors.mutedStrong} weight="800">Home</AppText>
        </Pressable>
      </Screen>
    );
  }

  return (
    <Screen padded={false} contentStyle={styles.root}>
      <View style={styles.top}>
        <AppText size={20}>{hearts.join(' ')}</AppText>
        <View style={styles.score}>
          <AppText size={20}>☆</AppText>
          <AppText size={22} weight="900">{score}</AppText>
        </View>
        <Pressable onPress={() => setPaused(true)} style={styles.pauseCircle}>
          <AppText>⏸</AppText>
        </Pressable>
      </View>
      <ImageBackground source={images.loaderBackground} resizeMode="cover" style={styles.field} imageStyle={styles.fieldImage} onLayout={onFieldLayout}>
        {item ? (
          <View style={[styles.item, {left: item.x, top: item.y}]}>
            <AppText size={22}>🍃</AppText>
          </View>
        ) : null}
        <Image source={ranger.image} resizeMode="contain" style={[styles.character, {left: position.x, top: position.y}]} />
        <View style={styles.controls}>
          <Arrow label="↑" onPress={() => move(0, -36)} />
          <View style={styles.controlRow}>
            <Arrow label="←" onPress={() => move(-36, 0)} />
            <View style={styles.centerDot} />
            <Arrow label="→" onPress={() => move(36, 0)} />
          </View>
          <Arrow label="↓" onPress={() => move(0, 36)} />
        </View>
      </ImageBackground>
    </Screen>
  );
}

function Arrow({label, onPress}: {label: string; onPress: () => void}) {
  return (
    <Pressable onPress={onPress} style={({pressed}) => [styles.arrow, pressed && styles.pressed]}>
      <AppText size={25}>{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 18,
  },
  top: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  score: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  pauseCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  field: {
    flex: 1,
    borderRadius: radii.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  fieldImage: {
    borderRadius: radii.md,
  },
  character: {
    position: 'absolute',
    width: characterSize,
    height: characterSize,
  },
  item: {
    position: 'absolute',
    width: itemSize,
    height: itemSize,
    borderRadius: itemSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.green,
    backgroundColor: 'rgba(104, 181, 74, 0.25)',
  },
  controls: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    alignItems: 'center',
    gap: 8,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  arrow: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  centerDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.surfaceAlt,
  },
  pause: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
  },
  pauseButton: {
    width: '50%',
    marginTop: 10,
  },
  textButton: {
    padding: 12,
  },
  pressed: {
    opacity: 0.78,
  },
});
