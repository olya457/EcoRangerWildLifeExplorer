import type {NavigatorScreenParams} from '@react-navigation/native';

export type MainTabParamList = {
  Locations: undefined;
  Animals: undefined;
  Map: undefined;
  Facts: undefined;
  Game: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  LocationDetail: {locationId: string};
  AnimalDetail: {animalId: string};
  Quiz: undefined;
  QuizPause: undefined;
  QuizResult: {score: number; total: number};
  GamePlay: {rangerId: string};
  GamePause: {rangerId: string; score: number};
  GameResult: {score: number; rangerId: string};
};
