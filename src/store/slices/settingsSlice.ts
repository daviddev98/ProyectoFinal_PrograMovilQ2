import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  ThemeMode,
  getStoredEmail,
  getStoredProfileImage,
  getStoredTheme,
  setStoredEmail,
  setStoredProfileImage,
  setStoredTheme,
} from '../../services/storage';

export type SettingsState = {
  theme: ThemeMode;
  email: string;
  profileImageUri: string | null;
  isReady: boolean;
};

const initialState: SettingsState = {
  theme: 'light',
  email: '',
  profileImageUri: null,
  isReady: false,
};

export const loadSettings = createAsyncThunk('settings/load', async () => {
  const [theme, email, profileImageUri] = await Promise.all([
    getStoredTheme(),
    getStoredEmail(),
    getStoredProfileImage(),
  ]);

  return { theme, email, profileImageUri };
});

export const updateTheme = createAsyncThunk(
  'settings/updateTheme',
  async (theme: ThemeMode) => {
    await setStoredTheme(theme);
    return theme;
  }
);

export const saveEmail = createAsyncThunk('settings/saveEmail', async (email: string) => {
  await setStoredEmail(email);
  return email;
});

export const saveProfileImage = createAsyncThunk(
  'settings/saveProfileImage',
  async (uri: string) => {
    await setStoredProfileImage(uri);
    return uri;
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadSettings.fulfilled, (state, action) => {
        state.theme = action.payload.theme;
        state.email = action.payload.email;
        state.profileImageUri = action.payload.profileImageUri;
        state.isReady = true;
      })
      .addCase(loadSettings.rejected, (state) => {
        state.isReady = true;
      })
      .addCase(updateTheme.fulfilled, (state, action) => {
        state.theme = action.payload;
      })
      .addCase(saveEmail.fulfilled, (state, action) => {
        state.email = action.payload;
      })
      .addCase(saveProfileImage.fulfilled, (state, action) => {
        state.profileImageUri = action.payload;
      });
  },
});

export default settingsSlice.reducer;
