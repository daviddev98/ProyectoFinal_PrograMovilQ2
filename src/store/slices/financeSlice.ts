import { createSlice } from '@reduxjs/toolkit';

import {
  MovementItem,
  MonthSpendingData,
  installmentsMovimientos,
  installmentsPagos,
  monthlySpendingData,
} from '../../constants/sampleData';

export type FinanceState = {
  monthlySpending: Record<string, MonthSpendingData>;
  movimientos: MovementItem[];
  pagosProgramados: MovementItem[];
};

const initialState: FinanceState = {
  monthlySpending: monthlySpendingData,
  movimientos: installmentsMovimientos,
  pagosProgramados: installmentsPagos,
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {},
});

export default financeSlice.reducer;
