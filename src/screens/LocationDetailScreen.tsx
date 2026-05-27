import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {ImageBackground, Platform, ScrollView, Share, StatusBar, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppText} from '../components/AppText';
import {IconButton} from '../components/Buttons';
import {StatCard} from '../components/Cards';
import {locations} from '../data';
import {useStorage} from '../storage/StorageProvider';
import {colors, radii, spacing} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'LocationDetail'>;

export function LocationDetailScreen({route, navigation}: Props) {
  const item = locations.find(location => location.id === route.params.locationId);
  const insets = useSafeAreaInsets();
  const {isLocationSaved, toggleLocation} = useStorage();
  const top = Platform.OS === 'android' ? Math.max(insets.top, spacing.androidEdge) : insets.top;
  const bottom = Platform.OS === 'android' ? 30 : Math.max(insets.bottom, 20);

  if (!item) {
    navigation.goBack();
    return null;
  }

  const share = () => {
    Share.share({
      title: item.name,
      message: `${item.name} in ${item.location}. ${item.about}`,
    }).catch(() => {});
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: bottom + 18}}>
        <ImageBackground source={item.image} resizeMode="cover" style={styles.hero}>
          <View style={styles.heroShade} />
          <View style={[styles.heroButtons, {paddingTop: top + 14}]}>
            <IconButton icon="‹" onPress={() => navigation.goBack()} />
            <View style={styles.actions}>
              <IconButton icon={isLocationSaved(item.id) ? '🧡' : '♡'} onPress={() => toggleLocation(item.id)} active={isLocationSaved(item.id)} />
              <IconButton icon="↗" onPress={share} />
            </View>
          </View>
          <View style={styles.heroCopy}>
            <View style={styles.badge}>
              <AppText size={11} weight="900">{item.tag}</AppText>
            </View>
            <AppText size={25} weight="900" numberOfLines={2}>{item.name}</AppText>
            <AppText color={colors.mutedStrong} size={14}>⌖ {item.location}</AppText>
          </View>
        </ImageBackground>
        <View style={styles.body}>
          <View style={styles.stats}>
            <StatCard label="Area" value={item.area} />
            <StatCard label="Est." value={item.established} />
          </View>
          <View style={styles.section}>
            <AppText size={19} weight="900">About</AppText>
            <AppText size={15} weight="600" color={colors.mutedStrong} style={styles.paragraph}>{item.about}</AppText>
          </View>
          <View style={styles.section}>
            <AppText size={19} weight="900">Wildlife Present</AppText>
            <View style={styles.chips}>
              {item.wildlife.map(name => (
                <View key={name} style={styles.chip}>
                  <AppText size={12} weight="800" color={colors.mutedStrong}>🐾 {name}</AppText>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    height: 310,
  },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(8, 4, 20, 0.38)',
  },
  heroButtons: {
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  heroCopy: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 24,
    gap: 6,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  body: {
    padding: 20,
    gap: 24,
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
  },
  section: {
    gap: 12,
  },
  paragraph: {
    lineHeight: 24,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: radii.round,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(104, 181, 74, 0.08)',
  },
});
