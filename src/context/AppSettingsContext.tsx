import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { ThemeColors, darkColors, lightColors } from '../constants/themes';
import {
  ThemeMode,
  getStoredEmail,
  getStoredProfileImage,
  getStoredTheme,
  setStoredEmail,
  setStoredProfileImage,
  setStoredTheme,
} from '../services/storage';

type AppSettingsContextValue = {
  colors: ThemeColors;
  theme: ThemeMode;
  isDark: boolean;
  isReady: boolean;
  email: string;
  profileImageUri: string | null;
  setTheme: (theme: ThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;
  saveEmail: (email: string) => Promise<void>;
  saveProfileImage: (uri: string) => Promise<void>;
};

const AppSettingsContext = createContext<AppSettingsContextValue | null>(null);

export function AppSettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('light');
  const [email, setEmail] = useState('');
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      const [storedTheme, storedEmail, storedProfileImage] = await Promise.all([
        getStoredTheme(),
        getStoredEmail(),
        getStoredProfileImage(),
      ]);

      setThemeState(storedTheme);
      setEmail(storedEmail);
      setProfileImageUri(storedProfileImage);
      setIsReady(true);
    }

    loadSettings();
  }, []);

  const setTheme = useCallback(async (nextTheme: ThemeMode) => {
    setThemeState(nextTheme);
    await setStoredTheme(nextTheme);
  }, []);

  const toggleTheme = useCallback(async () => {
    const nextTheme: ThemeMode = theme === 'light' ? 'dark' : 'light';
    await setTheme(nextTheme);
  }, [setTheme, theme]);

  const saveEmail = useCallback(async (nextEmail: string) => {
    setEmail(nextEmail);
    await setStoredEmail(nextEmail);
  }, []);

  const saveProfileImage = useCallback(async (uri: string) => {
    setProfileImageUri(uri);
    await setStoredProfileImage(uri);
  }, []);

  const value = useMemo<AppSettingsContextValue>(
    () => ({
      colors: theme === 'dark' ? darkColors : lightColors,
      theme,
      isDark: theme === 'dark',
      isReady,
      email,
      profileImageUri,
      setTheme,
      toggleTheme,
      saveEmail,
      saveProfileImage,
    }),
    [
      theme,
      isReady,
      email,
      profileImageUri,
      setTheme,
      toggleTheme,
      saveEmail,
      saveProfileImage,
    ]
  );

  return (
    <AppSettingsContext.Provider value={value}>{children}</AppSettingsContext.Provider>
  );
}

export function useAppSettings() {
  const context = useContext(AppSettingsContext);

  if (!context) {
    throw new Error('useAppSettings debe usarse dentro de AppSettingsProvider');
  }

  return context;
}
