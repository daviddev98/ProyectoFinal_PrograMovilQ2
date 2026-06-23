import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  Account,
  CardWalletData,
  GoalItem,
  MovementItem,
  MonthSpendingData,
  SavingsMeta,
  cardWalletData,
  installmentsMovimientos,
  installmentsPagos,
  metasGoals,
  monthlySpendingData,
  sampleAccounts,
  sampleSavingsMetas,
} from '../../constants/sampleData';

export type FinanceState = {
  monthlySpending: Record<string, MonthSpendingData>;
  movimientos: MovementItem[];
  pagosProgramados: MovementItem[];
  metas: GoalItem[];
  savingsMetas: SavingsMeta[];
  cardWallet: CardWalletData;
  accounts: Account[];
};

const initialState: FinanceState = {
  monthlySpending: monthlySpendingData,
  movimientos: installmentsMovimientos,
  pagosProgramados: installmentsPagos,
  metas: metasGoals,
  savingsMetas: sampleSavingsMetas,
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
    addSavingsMeta: (state, action: PayloadAction<SavingsMeta>) => {
      state.savingsMetas.unshift(action.payload);
    },
    updateSavingsMeta: (state, action: PayloadAction<SavingsMeta>) => {
      const index = state.savingsMetas.findIndex((meta) => meta.id === action.payload.id);
      if (index !== -1) {
        state.savingsMetas[index] = action.payload;
      }
    },
  },
});

export const { addMovimiento, addAccount, addSavingsMeta, updateSavingsMeta } =
  financeSlice.actions;
export default financeSlice.reducer;
