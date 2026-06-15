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
