import { configureStore } from '@reduxjs/toolkit';

import financeReducer from './slices/financeSlice';
import settingsReducer from './slices/settingsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    finance: financeReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
