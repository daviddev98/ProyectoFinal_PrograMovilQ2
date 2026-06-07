import { ImageSourcePropType } from 'react-native';

import ps5Image from '../../assets/images/ps5.png';
import cameraImage from '../../assets/images/camera.png';

export type ChartPoint = {
  label: string;
  value: number;
};

export type InstallmentItem = {
  id: string;
  name: string;
  source: string;
  amount: number;
  dueDate: number;
  currentInstallment: number;
  totalInstallments: number;
  image: ImageSourcePropType;
};

export const spendingSummary = {
  totalSpending: 248967.83,
  onProgress: 61523.0,
  overdue: 4825.43,
  total: 89271.92,
};

export const chartData: ChartPoint[] = [
  { label: 'Nov 1', value: 1200 },
  { label: 'Nov 5', value: 1800 },
  { label: 'Nov 10', value: 2400 },
  { label: 'Nov 15', value: 3100 },
  { label: 'Nov 20', value: 3600 },
  { label: 'Nov 25', value: 4274 },
  { label: 'Nov 30', value: 4800 },
];

export const chartHighlight = {
  amount: 4274.0,
  date: 'Nov 25, 2025',
};

export const installments4: InstallmentItem[] = [
  {
    id: '1',
    name: 'PS5',
    source: 'Amazon.com',
    amount: 836.94,
    dueDate: 18,
    currentInstallment: 1,
    totalInstallments: 4,
    image: ps5Image,
  },
  {
    id: '2',
    name: 'Nikon Camera',
    source: 'Amazon.com',
    amount: 997.0,
    dueDate: 25,
    currentInstallment: 2,
    totalInstallments: 4,
    image: cameraImage,
  },
];

export const installments6: InstallmentItem[] = [
  {
    id: '3',
    name: 'MacBook Air',
    source: 'Apple.com',
    amount: 1299.0,
    dueDate: 12,
    currentInstallment: 3,
    totalInstallments: 6,
    image: cameraImage,
  },
  {
    id: '4',
    name: 'PS5',
    source: 'Amazon.com',
    amount: 836.94,
    dueDate: 18,
    currentInstallment: 1,
    totalInstallments: 6,
    image: ps5Image,
  },
];
