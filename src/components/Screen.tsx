import React from 'react';
import {Platform, ScrollView, StatusBar, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, spacing} from '../theme/theme';

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  withTabBar?: boolean;
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export function Screen({children, scroll, withTabBar, padded = true, style, contentStyle}: Props) {
  const insets = useSafeAreaInsets();
  const top = Platform.OS === 'android' ? Math.max(insets.top, spacing.androidEdge) : insets.top;
  const bottomBase = Platform.OS === 'android' ? Math.max(insets.bottom, spacing.androidEdge) : insets.bottom;
  const bottom = withTabBar ? spacing.tabBarHeight + spacing.tabBarBottom + 18 : bottomBase + 20;
  const baseStyle = [
    scroll ? styles.scrollContent : styles.content,
    {
      paddingTop: top + 10,
      paddingBottom: bottom,
      paddingHorizontal: padded ? spacing.page : 0,
    },
    contentStyle,
  ];

  return (
    <View style={[styles.root, style]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {scroll ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={baseStyle}>
          {children}
        </ScrollView>
      ) : (
        <View style={baseStyle}>{children}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
