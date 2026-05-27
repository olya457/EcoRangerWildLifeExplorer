import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';

type StorageContextValue = {
  ready: boolean;
  savedLocationIds: string[];
  hasSeenOnboarding: boolean;
  bestQuizScore: number;
  bestGameScore: number;
  toggleLocation: (id: string) => void;
  isLocationSaved: (id: string) => boolean;
  clearSavedLocation: (id: string) => void;
  completeOnboarding: () => void;
  updateBestQuizScore: (score: number) => void;
  updateBestGameScore: (score: number) => void;
};

const keys = {
  locations: 'eco-ranger:saved-locations',
  onboarding: 'eco-ranger:onboarding-complete',
  quiz: 'eco-ranger:best-quiz',
  game: 'eco-ranger:best-game',
};

const StorageContext = createContext<StorageContextValue | undefined>(undefined);

export function StorageProvider({children}: {children: React.ReactNode}) {
  const [ready, setReady] = useState(false);
  const [savedLocationIds, setSavedLocationIds] = useState<string[]>([]);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [bestQuizScore, setBestQuizScore] = useState(0);
  const [bestGameScore, setBestGameScore] = useState(0);

  useEffect(() => {
    let active = true;

    async function load() {
      const [storedLocations, storedOnboarding, storedQuiz, storedGame] = await Promise.all([
        AsyncStorage.getItem(keys.locations),
        AsyncStorage.getItem(keys.onboarding),
        AsyncStorage.getItem(keys.quiz),
        AsyncStorage.getItem(keys.game),
      ]);

      if (!active) {
        return;
      }

      setSavedLocationIds(storedLocations ? JSON.parse(storedLocations) : []);
      setHasSeenOnboarding(storedOnboarding === 'true');
      setBestQuizScore(storedQuiz ? Number(storedQuiz) : 0);
      setBestGameScore(storedGame ? Number(storedGame) : 0);
      setReady(true);
    }

    load().catch(() => setReady(true));

    return () => {
      active = false;
    };
  }, []);

  const persistLocations = useCallback((next: string[]) => {
    setSavedLocationIds(next);
    AsyncStorage.setItem(keys.locations, JSON.stringify(next)).catch(() => {});
  }, []);

  const toggleLocation = useCallback(
    (id: string) => {
      const next = savedLocationIds.includes(id)
        ? savedLocationIds.filter(item => item !== id)
        : [...savedLocationIds, id];
      persistLocations(next);
    },
    [persistLocations, savedLocationIds],
  );

  const clearSavedLocation = useCallback(
    (id: string) => {
      persistLocations(savedLocationIds.filter(item => item !== id));
    },
    [persistLocations, savedLocationIds],
  );

  const isLocationSaved = useCallback(
    (id: string) => savedLocationIds.includes(id),
    [savedLocationIds],
  );

  const completeOnboarding = useCallback(() => {
    setHasSeenOnboarding(true);
    AsyncStorage.setItem(keys.onboarding, 'true').catch(() => {});
  }, []);

  const updateBestQuizScore = useCallback(
    (score: number) => {
      if (score <= bestQuizScore) {
        return;
      }
      setBestQuizScore(score);
      AsyncStorage.setItem(keys.quiz, String(score)).catch(() => {});
    },
    [bestQuizScore],
  );

  const updateBestGameScore = useCallback(
    (score: number) => {
      if (score <= bestGameScore) {
        return;
      }
      setBestGameScore(score);
      AsyncStorage.setItem(keys.game, String(score)).catch(() => {});
    },
    [bestGameScore],
  );

  const value = useMemo(
    () => ({
      ready,
      savedLocationIds,
      hasSeenOnboarding,
      bestQuizScore,
      bestGameScore,
      toggleLocation,
      isLocationSaved,
      clearSavedLocation,
      completeOnboarding,
      updateBestQuizScore,
      updateBestGameScore,
    }),
    [
      bestGameScore,
      bestQuizScore,
      clearSavedLocation,
      completeOnboarding,
      hasSeenOnboarding,
      isLocationSaved,
      ready,
      savedLocationIds,
      toggleLocation,
      updateBestGameScore,
      updateBestQuizScore,
    ],
  );

  return <StorageContext.Provider value={value}>{children}</StorageContext.Provider>;
}

export function useStorage() {
  const context = useContext(StorageContext);

  if (!context) {
    throw new Error('useStorage must be used inside StorageProvider');
  }

  return context;
}
