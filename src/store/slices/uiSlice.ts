import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UiState = {
  inicioActiveTab: string;
  inicioSelectedMonthKey: string;
};

const initialState: UiState = {
  inicioActiveTab: 'movimientos',
  inicioSelectedMonthKey: '2026-06',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setInicioActiveTab: (state, action: PayloadAction<string>) => {
      state.inicioActiveTab = action.payload;
    },
    setInicioSelectedMonthKey: (state, action: PayloadAction<string>) => {
      state.inicioSelectedMonthKey = action.payload;
    },
  },
});

export const { setInicioActiveTab, setInicioSelectedMonthKey } = uiSlice.actions;
export default uiSlice.reducer;
