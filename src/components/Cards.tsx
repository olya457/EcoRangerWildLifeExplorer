import React from 'react';
import {Image, ImageBackground, Pressable, StyleSheet, View} from 'react-native';
import {AppText} from './AppText';
import {IconButton} from './Buttons';
import {colors, radii} from '../theme/theme';
import type {AnimalItem, LocationItem} from '../types/models';

type LocationCardProps = {
  item: LocationItem;
  saved: boolean;
  onPress: () => void;
  onToggleSaved: () => void;
};

export function LocationCard({item, saved, onPress, onToggleSaved}: LocationCardProps) {
  return (
    <Pressable onPress={onPress} style={({pressed}) => [styles.locationCard, pressed && styles.pressed]}>
      <ImageBackground source={item.image} resizeMode="cover" style={styles.locationImage} imageStyle={styles.cardImage}>
        <View style={styles.imageShade} />
        <IconButton icon={saved ? '🧡' : '♡'} onPress={onToggleSaved} size={38} style={styles.heart} />
        <View style={styles.locationInfo}>
          <View style={styles.badge}>
            <AppText size={11} weight="800">{item.tag}</AppText>
          </View>
          <AppText size={17} weight="900" numberOfLines={1}>{item.name}</AppText>
          <AppText size={12} color={colors.mutedStrong} numberOfLines={1}>⌖ {item.location} · {item.area}</AppText>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

type AnimalCardProps = {
  item: AnimalItem;
  onPress: () => void;
};

export function AnimalCard({item, onPress}: AnimalCardProps) {
  return (
    <Pressable onPress={onPress} style={({pressed}) => [styles.animalCard, pressed && styles.pressed]}>
      <Image source={item.image} resizeMode="cover" style={styles.animalImage} />
      <View style={styles.animalBody}>
        <View style={[styles.statusBadge, item.status.includes('Endangered') && styles.redBadge]}>
          <AppText size={10} weight="900" color={item.status.includes('Endangered') ? colors.red : colors.amber} numberOfLines={1}>
            {item.status.split('/')[0]}
          </AppText>
        </View>
        <AppText size={16} weight="900" numberOfLines={1}>{item.name}</AppText>
        <AppText size={12} color={colors.mutedStrong} numberOfLines={1}>{item.habitat.split(',')[0]}</AppText>
      </View>
    </Pressable>
  );
}

export function StatCard({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.statCard}>
      <AppText size={12} color={colors.muted}>{label}</AppText>
      <AppText size={14} weight="900">{value}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  locationCard: {
    height: 176,
    borderRadius: radii.md,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  locationImage: {
    flex: 1,
  },
  cardImage: {
    borderRadius: radii.md,
  },
  imageShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(9, 4, 23, 0.18)',
  },
  locationInfo: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    gap: 4,
  },
  heart: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  animalCard: {
    flex: 1,
    minHeight: 204,
    borderRadius: radii.md,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  animalImage: {
    width: '100%',
    height: 118,
  },
  animalBody: {
    padding: 12,
    gap: 6,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    borderRadius: radii.sm,
    backgroundColor: 'rgba(244, 163, 0, 0.18)',
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  redBadge: {
    backgroundColor: 'rgba(242, 71, 88, 0.15)',
  },
  statCard: {
    flex: 1,
    minHeight: 64,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    padding: 12,
    justifyContent: 'center',
    gap: 6,
  },
  pressed: {
    opacity: 0.82,
  },
});
