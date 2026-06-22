import { createSelector } from '@reduxjs/toolkit';

import { monthlySpendingData } from '../../constants/sampleData';
import { RootState } from '../index';

export const selectFinance = (state: RootState) => state.finance;

export const selectMovimientos = createSelector(
  selectFinance,
  (finance) => finance.movimientos
);

export const selectPagosProgramados = createSelector(
  selectFinance,
  (finance) => finance.pagosProgramados
);

export const selectMonthSpendingData = (monthKey: string) =>
  createSelector(selectFinance, (finance) => {
    return finance.monthlySpending[monthKey] ?? monthlySpendingData['2026-06'];
  });

export const selectAvailableMonthKeys = createSelector(selectFinance, (finance) =>
  Object.keys(finance.monthlySpending).sort()
);

export const selectMetas = createSelector(selectFinance, (finance) => finance.metas);

export const selectCardWallet = createSelector(selectFinance, (finance) => finance.cardWallet);

export const selectAccounts = createSelector(selectFinance, (finance) => finance.accounts);

export const selectAccountById = (accountId: string) =>
  createSelector(selectAccounts, (accounts) =>
    accounts.find((account) => account.id === accountId)
  );

export const selectAccountsNetBalance = createSelector(selectAccounts, (accounts) =>
  accounts.reduce((total, account) => {
    if (account.type === 'credit_card') {
      return total - account.balance;
    }
    return total + account.balance;
  }, 0)
);
