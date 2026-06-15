import { useCallback } from 'react';

import { ThemeMode } from '../services/storage';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectColors,
  selectEmail,
  selectIsDark,
  selectIsReady,
  selectProfileImageUri,
  selectTheme,
} from '../store/selectors/settingsSelectors';
import {
  saveEmail as saveEmailThunk,
  saveProfileImage as saveProfileImageThunk,
  updateTheme,
} from '../store/slices/settingsSlice';

export function useAppSettings() {
  const dispatch = useAppDispatch();
  const colors = useAppSelector(selectColors);
  const theme = useAppSelector(selectTheme);
  const isDark = useAppSelector(selectIsDark);
  const isReady = useAppSelector(selectIsReady);
  const email = useAppSelector(selectEmail);
  const profileImageUri = useAppSelector(selectProfileImageUri);

  const setTheme = useCallback(
    (nextTheme: ThemeMode) => dispatch(updateTheme(nextTheme)),
    [dispatch]
  );

  const toggleTheme = useCallback(() => {
    const nextTheme: ThemeMode = theme === 'light' ? 'dark' : 'light';
    dispatch(updateTheme(nextTheme));
  }, [dispatch, theme]);

  const saveEmail = useCallback(
    (nextEmail: string) => dispatch(saveEmailThunk(nextEmail)),
    [dispatch]
  );

  const saveProfileImage = useCallback(
    (uri: string) => dispatch(saveProfileImageThunk(uri)),
    [dispatch]
  );

  return {
    colors,
    theme,
    isDark,
    isReady,
    email,
    profileImageUri,
    setTheme,
    toggleTheme,
    saveEmail,
    saveProfileImage,
  };
}
