import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {AnimalCard} from '../components/Cards';
import {AppText} from '../components/AppText';
import {Screen} from '../components/Screen';
import {SearchField} from '../components/SearchField';
import {animals} from '../data';
import {colors} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function AnimalsScreen() {
  const navigation = useNavigation<Navigation>();
  const [query, setQuery] = useState('');

  const data = useMemo(() => {
    const text = query.trim().toLowerCase();

    if (!text) {
      return animals;
    }

    return animals.filter(item =>
      [item.name, item.tag, item.habitat, item.region, item.status].some(value => value.toLowerCase().includes(text)),
    );
  }, [query]);

  return (
    <Screen scroll withTabBar>
      <AppText size={26} weight="900" style={styles.title}>Animals</AppText>
      <SearchField value={query} onChangeText={setQuery} placeholder="Search animals..." />
      {data.length ? (
        <View style={styles.grid}>
          {data.map((item, index) => (
            <View key={item.id} style={[styles.cell, index % 2 === 0 ? styles.left : styles.right]}>
              <AnimalCard item={item} onPress={() => navigation.navigate('AnimalDetail', {animalId: item.id})} />
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.empty}>
          <AppText color={colors.mutedStrong}>No animals found</AppText>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 18,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginTop: 16,
  },
  cell: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: 14,
  },
  left: {
    paddingLeft: 0,
  },
  right: {
    paddingRight: 0,
  },
  empty: {
    minHeight: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
