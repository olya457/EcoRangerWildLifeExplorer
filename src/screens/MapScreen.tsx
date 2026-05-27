import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_DEFAULT} from 'react-native-maps';
import {AppText} from '../components/AppText';
import {Screen} from '../components/Screen';
import {locations} from '../data';
import {colors, radii} from '../theme/theme';
import type {LocationItem} from '../types/models';
import type {RootStackParamList} from '../types/navigation';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function MapScreen() {
  const navigation = useNavigation<Navigation>();
  const [selected, setSelected] = useState<LocationItem | null>(locations[0]);

  return (
    <Screen withTabBar padded={false} contentStyle={styles.screen}>
      <View style={styles.header}>
        <AppText size={26} weight="900">Map</AppText>
        <AppText size={12} color={colors.mutedStrong}>Tap a marker to explore locations</AppText>
      </View>
      <View style={styles.mapWrap}>
        <MapView
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          initialRegion={{
            latitude: -5,
            longitude: 22,
            latitudeDelta: 65,
            longitudeDelta: 65,
          }}
          showsCompass={false}
          showsMyLocationButton={false}>
          {locations.map(item => (
            <Marker
              key={item.id}
              coordinate={{latitude: item.latitude, longitude: item.longitude}}
              tracksViewChanges={false}
              onPress={() => setSelected(item)}>
              <View style={[styles.marker, selected?.id === item.id && styles.markerActive]} />
            </Marker>
          ))}
        </MapView>
        <View style={styles.legend}>
          <View style={styles.legendDot} />
          <AppText size={12} color={colors.mutedStrong}>Wildlife Location</AppText>
        </View>
        {selected ? (
          <View style={styles.selectedCard}>
            <View style={styles.selectedCopy}>
              <AppText size={12} color={colors.muted}>{selected.tag}</AppText>
              <AppText size={18} weight="900" numberOfLines={1}>{selected.name}</AppText>
              <AppText size={12} color={colors.mutedStrong}>⌖ {selected.location}</AppText>
            </View>
            <Pressable
              onPress={() => navigation.navigate('LocationDetail', {locationId: selected.id})}
              style={({pressed}) => [styles.viewButton, pressed && styles.pressed]}>
              <AppText size={13} weight="900">View ›</AppText>
            </Pressable>
          </View>
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 6,
  },
  mapWrap: {
    flex: 1,
    marginHorizontal: 16,
    borderRadius: radii.xl,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  map: {
    flex: 1,
  },
  marker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.amber,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.42)',
  },
  markerActive: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.orange,
  },
  legend: {
    position: 'absolute',
    top: 14,
    right: 14,
    borderRadius: radii.round,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: colors.amber,
  },
  selectedCard: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
    minHeight: 96,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  selectedCopy: {
    flex: 1,
    gap: 4,
  },
  viewButton: {
    minWidth: 74,
    height: 46,
    borderRadius: radii.round,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});
