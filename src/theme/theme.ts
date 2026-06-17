import {Platform} from 'react-native';

export const colors = {
  background: '#080414',
  surface: '#1b1248',
  surfaceAlt: '#26165a',
  surfaceDeep: '#120a32',
  text: '#fff8f4',
  muted: '#edeaf4ff',
  mutedStrong: '#f1f0f4ff',
  border: '#3b2a73',
  orange: '#ff7417',
  amber: '#f4a300',
  green: '#68b54a',
  red: '#f24758',
  white: '#ffffff',
  black: '#000000',
};

export const spacing = {
  page: 20,
  card: 16,
  tabBarHeight: 70,
  tabBarBottom: Platform.OS === 'ios' ? 20 : 30,
  androidEdge: Platform.OS === 'android' ? 30 : 0,
};

export const radii = {
  sm: 8,
  md: 14,
  lg: 18,
  xl: 24,
  round: 999,
};

export const type = {
  title: 27,
  heading: 22,
  body: 15,
  small: 12,
  tiny: 10,
};

export const shadow = {
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 12},
  shadowOpacity: 0.25,
  shadowRadius: 18,
  elevation: 12,
};
