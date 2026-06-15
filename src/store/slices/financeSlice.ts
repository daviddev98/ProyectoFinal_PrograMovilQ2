import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  CardWalletData,
  GoalItem,
  MovementItem,
  MonthSpendingData,
  cardWalletData,
  installmentsMovimientos,
  installmentsPagos,
  metasGoals,
  monthlySpendingData,
} from '../../constants/sampleData';

export type FinanceState = {
  monthlySpending: Record<string, MonthSpendingData>;
  movimientos: MovementItem[];
  pagosProgramados: MovementItem[];
  metas: GoalItem[];
  cardWallet: CardWalletData;
};

const initialState: FinanceState = {
  monthlySpending: monthlySpendingData,
  movimientos: installmentsMovimientos,
  pagosProgramados: installmentsPagos,
  metas: metasGoals,
  cardWallet: cardWalletData,
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    addMovimiento: (state, action: PayloadAction<MovementItem>) => {
      state.movimientos.unshift(action.payload);
    },
  },
});

export const { addMovimiento } = financeSlice.actions;
export default financeSlice.reducer;
