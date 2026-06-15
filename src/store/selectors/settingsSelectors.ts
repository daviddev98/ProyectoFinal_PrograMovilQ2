import { createSelector } from '@reduxjs/toolkit';

import { darkColors, lightColors } from '../../constants/themes';
import { RootState } from '../index';

export const selectSettings = (state: RootState) => state.settings;

export const selectTheme = createSelector(selectSettings, (settings) => settings.theme);

export const selectIsDark = createSelector(selectTheme, (theme) => theme === 'dark');

export const selectColors = createSelector(selectTheme, (theme) =>
  theme === 'dark' ? darkColors : lightColors
);

export const selectIsReady = createSelector(selectSettings, (settings) => settings.isReady);

export const selectEmail = createSelector(selectSettings, (settings) => settings.email);

export const selectProfileImageUri = createSelector(
  selectSettings,
  (settings) => settings.profileImageUri
);
