import { ImageSourcePropType } from 'react-native';

import ps5Image from '../../assets/images/ps5.png';
import cameraImage from '../../assets/images/camera.png';

export type ChartPoint = {
  label: string;
  value: number;
};

export type MovementItem = {
  id: string;
  merchant: string;
  category: string;
  bankAccount: string;
  amount: number;
  dueDate: number;
  image: ImageSourcePropType;
};

export type MonthSpendingData = {
  totalSpending: number;
  ingresos: number;
  gastos: number;
  total: number;
  chartData: ChartPoint[];
  chartHighlight: {
    amount: number;
    date: string;
  };
  startLabel: string;
  endLabel: string;
};

export const monthlySpendingData: Record<string, MonthSpendingData> = {
  '2026-04': {
    totalSpending: 9850.5,
    ingresos: 3200.0,
    gastos: 1450.25,
    total: 6200.25,
    chartData: [
      { label: 'Abr 1', value: 420 },
      { label: 'Abr 7', value: 680 },
      { label: 'Abr 14', value: 910 },
      { label: 'Abr 21', value: 1180 },
      { label: 'Abr 28', value: 1320 },
    ],
    chartHighlight: { amount: 1180.0, date: '21 abr, 2026' },
    startLabel: '1 abr, 2026',
    endLabel: '30 abr, 2026',
  },
  '2026-05': {
    totalSpending: 11240.75,
    ingresos: 3850.0,
    gastos: 1620.5,
    total: 7450.25,
    chartData: [
      { label: 'May 1', value: 510 },
      { label: 'May 8', value: 740 },
      { label: 'May 15', value: 980 },
      { label: 'May 22', value: 1210 },
      { label: 'May 29', value: 1380 },
    ],
    chartHighlight: { amount: 1210.0, date: '22 may, 2026' },
    startLabel: '1 may, 2026',
    endLabel: '31 may, 2026',
  },
  '2026-06': {
    totalSpending: 12450.0,
    ingresos: 4200.0,
    gastos: 1850.75,
    total: 8350.25,
    chartData: [
      { label: 'Jun 1', value: 580 },
      { label: 'Jun 8', value: 820 },
      { label: 'Jun 15', value: 1050 },
      { label: 'Jun 22', value: 1280 },
      { label: 'Jun 29', value: 1420 },
    ],
    chartHighlight: { amount: 1280.0, date: '22 jun, 2026' },
    startLabel: '1 jun, 2026',
    endLabel: '30 jun, 2026',
  },
};

export const installmentsMovimientos: MovementItem[] = [
  {
    id: '1',
    merchant: 'La Colonia',
    category: 'Supermercado',
    bankAccount: 'BAC',
    amount: -845.5,
    dueDate: 12,
    image: cameraImage,
  },
  {
    id: '2',
    merchant: 'Uber',
    category: 'Transporte',
    bankAccount: 'Banpaís',
    amount: -120.0,
    dueDate: 18,
    image: ps5Image,
  },
];

export const installmentsPagos: MovementItem[] = [
  {
    id: '3',
    merchant: 'Tienda Premier',
    category: 'Electrónicos',
    bankAccount: 'Ficohsa',
    amount: -3250.0,
    dueDate: 18,
    image: ps5Image,
  },
  {
    id: '4',
    merchant: 'Photo Express',
    category: 'Fotografía',
    bankAccount: 'BAC',
    amount: -2180.5,
    dueDate: 25,
    image: cameraImage,
  },
];

export function getMonthSpendingData(monthKey: string): MonthSpendingData {
  return monthlySpendingData[monthKey] ?? monthlySpendingData['2026-06'];
}

export const availableMonthKeys = Object.keys(monthlySpendingData).sort();
