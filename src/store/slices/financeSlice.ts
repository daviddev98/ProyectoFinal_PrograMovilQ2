import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  Account,
  CardWalletData,
  GoalItem,
  MovementItem,
  MonthSpendingData,
  cardWalletData,
  installmentsMovimientos,
  installmentsPagos,
  metasGoals,
  monthlySpendingData,
  sampleAccounts,
} from '../../constants/sampleData';

export type FinanceState = {
  monthlySpending: Record<string, MonthSpendingData>;
  movimientos: MovementItem[];
  pagosProgramados: MovementItem[];
  metas: GoalItem[];
  cardWallet: CardWalletData;
  accounts: Account[];
};

const initialState: FinanceState = {
  monthlySpending: monthlySpendingData,
  movimientos: installmentsMovimientos,
  pagosProgramados: installmentsPagos,
  metas: metasGoals,
  cardWallet: cardWalletData,
  accounts: sampleAccounts,
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    addMovimiento: (state, action: PayloadAction<MovementItem>) => {
      state.movimientos.unshift(action.payload);
    },
    addAccount: (state, action: PayloadAction<Account>) => {
      state.accounts.push(action.payload);
    },
  },
});

export const { addMovimiento, addAccount } = financeSlice.actions;
export default financeSlice.reducer;
