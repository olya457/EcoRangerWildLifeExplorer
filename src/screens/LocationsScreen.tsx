import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {images} from '../assets/assets';
import {AppText} from '../components/AppText';
import {LocationCard} from '../components/Cards';
import {Screen} from '../components/Screen';
import {SearchField} from '../components/SearchField';
import {SegmentedControl} from '../components/SegmentedControl';
import {locations} from '../data';
import {useStorage} from '../storage/StorageProvider';
import {colors, radii} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Navigation = NativeStackNavigationProp<RootStackParamList>;
type Mode = 'explore' | 'saved';

export function LocationsScreen() {
  const navigation = useNavigation<Navigation>();
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<Mode>('explore');
  const {savedLocationIds, isLocationSaved, toggleLocation} = useStorage();

  const data = useMemo(() => {
    const text = query.trim().toLowerCase();
    const source = mode === 'saved' ? locations.filter(item => savedLocationIds.includes(item.id)) : locations;

    if (!text) {
      return source;
    }

    return source.filter(item =>
      [item.name, item.tag, item.location, item.area].some(value => value.toLowerCase().includes(text)),
    );
  }, [mode, query, savedLocationIds]);

  return (
    <Screen scroll withTabBar>
      <AppText size={26} weight="900" style={styles.title}>Locations</AppText>
      <SearchField value={query} onChangeText={setQuery} placeholder="Search reserves, parks..." />
      <View style={styles.segment}>
        <SegmentedControl<Mode>
          value={mode}
          onChange={setMode}
          options={[
            {label: 'Explore', value: 'explore'},
            {label: 'Saved', value: 'saved'},
          ]}
        />
      </View>
      {data.length ? (
        <View style={styles.list}>
          {data.map(item => (
            <LocationCard
              key={item.id}
              item={item}
              saved={isLocationSaved(item.id)}
              onToggleSaved={() => toggleLocation(item.id)}
              onPress={() => navigation.navigate('LocationDetail', {locationId: item.id})}
            />
          ))}
        </View>
      ) : (
        <View style={styles.empty}>
          <Image source={images.onboardingSavanna} style={styles.emptyImage} resizeMode="cover" />
          <AppText size={15} color={colors.mutedStrong} align="center">
            {mode === 'saved' ? 'No saved locations yet' : 'No locations found'}
          </AppText>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 18,
  },
  segment: {
    marginTop: 16,
  },
  list: {
    gap: 16,
    marginTop: 16,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingVertical: 64,
  },
  emptyImage: {
    width: '74%',
    maxWidth: 260,
    aspectRatio: 1,
    borderRadius: radii.xl,
  },
});
