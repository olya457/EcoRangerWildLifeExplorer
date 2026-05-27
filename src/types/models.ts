import type {ImageSourcePropType} from 'react-native';

export type LocationItem = {
  id: string;
  name: string;
  tag: string;
  location: string;
  area: string;
  established: string;
  latitude: number;
  longitude: number;
  about: string;
  wildlife: string[];
  image: ImageSourcePropType;
};

export type AnimalItem = {
  id: string;
  name: string;
  tag: string;
  habitat: string;
  region: string;
  size: string;
  status: string;
  about: string;
  behavior: string;
  keyFacts: string[];
  image: ImageSourcePropType;
};

export type FactItem = {
  id: string;
  icon: string;
  category: string;
  text: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
};

export type Ranger = {
  id: string;
  name: string;
  title: string;
  image: ImageSourcePropType;
};
