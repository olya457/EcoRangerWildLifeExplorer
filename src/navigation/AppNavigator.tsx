import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import React from 'react';
import {AnimalsScreen} from '../screens/AnimalsScreen';
import {AnimalDetailScreen} from '../screens/AnimalDetailScreen';
import {FactsScreen} from '../screens/FactsScreen';
import {FloatingTabBar} from './FloatingTabBar';
import {GameHomeScreen} from '../screens/GameHomeScreen';
import {GamePlayScreen} from '../screens/GamePlayScreen';
import {GameResultScreen} from '../screens/GameResultScreen';
import {LocationDetailScreen} from '../screens/LocationDetailScreen';
import {LocationsScreen} from '../screens/LocationsScreen';
import {MapScreen} from '../screens/MapScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {QuizResultScreen} from '../screens/QuizResultScreen';
import {QuizScreen} from '../screens/QuizScreen';
import {SplashScreen} from '../screens/SplashScreen';
import {colors} from '../theme/theme';
import type {MainTabParamList, RootStackParamList} from '../types/navigation';

if (!process.env.JEST_WORKER_ID) {
  enableScreens();
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.background,
    text: colors.text,
    border: colors.border,
    primary: colors.orange,
  },
};

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Locations"
      tabBar={renderTabBar}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="Locations" component={LocationsScreen} />
      <Tab.Screen name="Animals" component={AnimalsScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Facts" component={FactsScreen} />
      <Tab.Screen name="Game" component={GameHomeScreen} />
    </Tab.Navigator>
  );
}

function renderTabBar(props: React.ComponentProps<typeof FloatingTabBar>) {
  return <FloatingTabBar {...props} />;
}

export function AppNavigator() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false, animation: 'fade'}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="LocationDetail" component={LocationDetailScreen} options={{animation: 'slide_from_right'}} />
        <Stack.Screen name="AnimalDetail" component={AnimalDetailScreen} options={{animation: 'slide_from_right'}} />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{animation: 'slide_from_bottom'}} />
        <Stack.Screen name="QuizResult" component={QuizResultScreen} />
        <Stack.Screen name="GamePlay" component={GamePlayScreen} options={{animation: 'slide_from_right'}} />
        <Stack.Screen name="GameResult" component={GameResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
