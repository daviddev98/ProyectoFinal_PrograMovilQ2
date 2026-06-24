import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../services/supabaseClient';

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

interface CreateAccountPayload {
  name: string;
  subtitle: string;
  type: 'cash' | 'savings' | 'credit_card';
  balance: number;
  color: string;
  brand?: string;
}

interface CreateMovementPayload {
  merchant: string;
  category: string;
  bankAccount: string;
  amount: number;
  dueDate: number;
  date: string; 
}

export const createNewAccountThunk = createAsyncThunk(
  'finance/createNewAccount',
  async (accountData: CreateAccountPayload, { rejectWithValue }) => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) throw new Error('Usuario no autenticado.');

      const { data, error } = await supabase
        .from('cuentas')
        .insert([
          {
            user_id: userData.user.id,
            name: accountData.name,
            subtitle: accountData.subtitle,
            type: accountData.type,
            balance: accountData.balance,
            color: accountData.color,
            brand: accountData.brand || null,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data as Account;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al crear la cuenta.');
    }
  }
);

export const addMovimientoThunk = createAsyncThunk(
  'finance/addMovimiento',
  async (movementData: CreateMovementPayload, { rejectWithValue }) => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) throw new Error('Usuario no autenticado.');

      const { data, error } = await supabase
        .from('movimientos')
        .insert([
          {
            user_id: userData.user.id,
            merchant: movementData.merchant,
            category: movementData.category,
            bank_account: movementData.bankAccount,
            amount: movementData.amount,
            due_date: movementData.dueDate,
            date: movementData.date,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        merchant: data.merchant,
        category: data.category,
        bankAccount: data.bank_account,
        amount: data.amount,
        dueDate: data.due_date,
      } as MovementItem;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al guardar el movimiento.');
    }
  }
);

export const addSavingsMetaThunk = createAsyncThunk(
  'finance/addSavingsMeta',
  async (metaData: Omit<SavingsMeta, 'id'>, { rejectWithValue }) => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) throw new Error('Usuario no autenticado.');

      const { data, error } = await supabase
        .from('ahorros_metas')
        .insert([
          {
            user_id: userData.user.id,
            nombre: metaData.nombre,
            descripcion: metaData.descripcion,
            categoria: metaData.categoria,
            monto_objetivo: metaData.montoObjetivo,
            monto_actual: metaData.montoActual,
            fecha_inicio: metaData.fechaInicio,
            fecha_limite: metaData.fechaLimite,
            prioridad: metaData.prioridad,
            estado: metaData.estado,
            notas: metaData.notas,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        nombre: data.nombre,
        descripcion: data.descripcion,
        categoria: data.categoria,
        montoObjetivo: data.monto_objetivo,
        montoActual: data.monto_actual,
        fechaInicio: data.fecha_inicio,
        fechaLimite: data.fecha_limite,
        prioridad: data.prioridad,
        estado: data.estado,
        notas: data.notas,
      } as SavingsMeta;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al crear la meta.');
    }
  }
);

export const updateSavingsMetaThunk = createAsyncThunk(
  'finance/updateSavingsMeta',
  async (metaData: SavingsMeta, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('ahorros_metas')
        .update({
          nombre: metaData.nombre,
          descripcion: metaData.descripcion,
          categoria: metaData.categoria,
          monto_objetivo: metaData.montoObjetivo,
          monto_actual: metaData.montoActual,
          fecha_inicio: metaData.fechaInicio,
          fecha_limite: metaData.fechaLimite,
          prioridad: metaData.prioridad,
          estado: metaData.estado,
          notas: metaData.notas,
        })
        .eq('id', metaData.id)
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        nombre: data.nombre,
        descripcion: data.descripcion,
        categoria: data.categoria,
        montoObjetivo: data.monto_objetivo,
        montoActual: data.monto_actual,
        fechaInicio: data.fecha_inicio,
        fechaLimite: data.fecha_limite,
        prioridad: data.prioridad,
        estado: data.estado,
        notas: data.notas,
      } as SavingsMeta;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al actualizar la meta.');
    }
  }
);

export const fetchMovimientosByMonthThunk = createAsyncThunk(
  'finance/fetchMovimientosByMonth',
  async (monthKey: string, { rejectWithValue }) => {
    try {
  
      const startDate = `${monthKey}-01`;
      const endDate = `${monthKey}-31`;

      const { data, error } = await supabase
        .from('movimientos')
        .select('*')
        .gte('date', startDate)
        .lte('date', endDate);

      if (error) throw error;

      return data.map((item: any) => ({
        id: item.id,
        merchant: item.merchant,
        category: item.category,
        bankAccount: item.bank_account,
        amount: item.amount,
        dueDate: item.due_date,
      })) as MovementItem[];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al consultar movimientos del mes.');
    }
  }
);


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
 
  extraReducers: (builder) => {
    builder
      .addCase(createNewAccountThunk.fulfilled, (state, action) => {
        state.accounts.push(action.payload);
      })
      .addCase(addMovimientoThunk.fulfilled, (state, action) => {
        state.movimientos.unshift(action.payload);
      })
      .addCase(addSavingsMetaThunk.fulfilled, (state, action) => {
        state.savingsMetas.unshift(action.payload);
      })
      .addCase(updateSavingsMetaThunk.fulfilled, (state, action) => {
        const index = state.savingsMetas.findIndex((meta) => meta.id === action.payload.id);
        if (index !== -1) {
          state.savingsMetas[index] = action.payload;
        }
      })
      .addCase(fetchMovimientosByMonthThunk.fulfilled, (state, action) => {
        state.movimientos = action.payload;
      });
  },
});

export const { addMovimiento, addAccount, addSavingsMeta, updateSavingsMeta } =
  financeSlice.actions;
export default financeSlice.reducer;
