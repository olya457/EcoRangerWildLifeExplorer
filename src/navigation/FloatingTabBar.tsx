import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppText} from '../components/AppText';
import {colors, radii, shadow, spacing} from '../theme/theme';

const tabMeta: Record<string, {label: string; icon: string}> = {
  Locations: {label: 'Locations', icon: '📍'},
  Animals: {label: 'Animals', icon: '🐾'},
  Map: {label: 'Map', icon: '🗺️'},
  Facts: {label: 'Facts', icon: '📖'},
  Game: {label: 'Game', icon: '🎮'},
};

export function FloatingTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const bottom = Platform.OS === 'android' ? Math.max(insets.bottom, spacing.tabBarBottom) : spacing.tabBarBottom;

  return (
    <View pointerEvents="box-none" style={[styles.wrap, {bottom}]}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const {options} = descriptors[route.key];
          const meta = tabMeta[route.name] ?? {label: route.name, icon: '•'};

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              style={({pressed}) => [styles.tab, focused && styles.tabActive, pressed && styles.pressed]}>
              <View style={[styles.iconWrap, focused && styles.iconActive]}>
                <AppText size={18}>{meta.icon}</AppText>
              </View>
              <AppText size={10} weight="900" color={focused ? colors.orange : colors.muted}>
                {meta.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 8,
    right: 8,
    height: spacing.tabBarHeight,
  },
  bar: {
    flex: 1,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(30, 18, 74, 0.96)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    ...shadow,
  },
  tab: {
    flex: 1,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderRadius: radii.lg,
  },
  tabActive: {
    backgroundColor: colors.surfaceAlt,
  },
  iconWrap: {
    width: 29,
    height: 29,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconActive: {
    backgroundColor: 'rgba(255, 116, 23, 0.12)',
  },
  pressed: {
    opacity: 0.72,
  },
});
