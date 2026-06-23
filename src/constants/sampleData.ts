import { ImageSourcePropType } from 'react-native';

import ps5Image from '../../assets/images/ps5.png';
import cameraImage from '../../assets/images/camera.png';

export type TransactionType = 'gasto' | 'ingreso';

export const BANK_ACCOUNTS = ['BAC', 'Banpaís', 'Ficohsa', 'Atlántida', 'Otro'] as const;

export const EXPENSE_CATEGORIES = [
  'Supermercado',
  'Transporte',
  'Electrónicos',
  'Fotografía',
  'Servicios',
  'Salud',
  'Entretenimiento',
  'Otros',
] as const;

export const INCOME_CATEGORIES = [
  'Salario',
  'Freelance',
  'Inversiones',
  'Regalo',
  'Otros',
] as const;

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

export type GoalItem = {
  id: string;
  name: string;
  store: string;
  amount: number;
  dueDate: number;
  currentInstallment: number;
  totalInstallments: number;
  image: ImageSourcePropType;
};

export type CardBrand = 'mastercard' | 'visa' | 'amex';

export type CardWalletData = {
  brand: CardBrand;
  usedBalance: number;
};

export type AccountType = 'bank' | 'credit_card' | 'cash';

export type Account = {
  id: string;
  name: string;
  subtitle: string;
  type: AccountType;
  balance: number;
  color: string;
  brand?: CardBrand;
};

export const ACCOUNT_TYPES: { value: AccountType; label: string }[] = [
  { value: 'bank', label: 'Cuenta bancaria' },
  { value: 'credit_card', label: 'Tarjeta de crédito' },
  { value: 'cash', label: 'Efectivo' },
];

export const CARD_BRANDS: { value: CardBrand; label: string }[] = [
  { value: 'mastercard', label: 'Mastercard' },
  { value: 'visa', label: 'Visa' },
  { value: 'amex', label: 'Amex' },
];

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

export const cardWalletData: CardWalletData = {
  brand: 'mastercard',
  usedBalance: 3017.44,
};

export const sampleAccounts: Account[] = [
  {
    id: 'acc-banpais',
    name: 'Banpais',
    subtitle: 'Cuenta planilla',
    type: 'bank',
    balance: 13198.72,
    color: '#F59E0B',
  },
  {
    id: 'acc-bac',
    name: 'BAC',
    subtitle: 'Cuenta personal',
    type: 'bank',
    balance: 3723.41,
    color: '#EF4444',
  },
  {
    id: 'acc-efectivo',
    name: 'Efectivo',
    subtitle: 'Master Card',
    type: 'credit_card',
    balance: 2058.12,
    color: '#22C55E',
    brand: 'mastercard',
  },
  {
    id: 'acc-bac-hon',
    name: 'BAC HON',
    subtitle: 'Tarjeta crédito',
    type: 'credit_card',
    balance: 1102.0,
    color: '#3B82F6',
    brand: 'mastercard',
  },
  {
    id: 'acc-ficohsa',
    name: 'Ficohsa',
    subtitle: 'Cuenta ahorro',
    type: 'bank',
    balance: 83.0,
    color: '#E5E7EB',
  },
];

export const META_CATEGORIES = [
  'Ahorro',
  'Viaje',
  'Vivienda',
  'Educación',
  'Salud',
  'Tecnología',
  'Emergencia',
  'Otros',
] as const;

export type MetaCategory = (typeof META_CATEGORIES)[number];

export const META_PRIORITIES = [
  { value: 'alta', label: 'Alta' },
  { value: 'media', label: 'Media' },
  { value: 'baja', label: 'Baja' },
] as const;

export type MetaPriority = (typeof META_PRIORITIES)[number]['value'];

export const META_STATUSES = [
  { value: 'activa', label: 'Activa' },
  { value: 'completada', label: 'Completada' },
  { value: 'pausada', label: 'Pausada' },
] as const;

export type MetaStatus = (typeof META_STATUSES)[number]['value'];

export type SavingsMeta = {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: MetaCategory;
  montoObjetivo: number;
  montoActual: number;
  fechaInicio: string;
  fechaLimite: string;
  prioridad: MetaPriority;
  estado: MetaStatus;
  notas: string;
};

export const sampleSavingsMetas: SavingsMeta[] = [
  {
    id: 'meta-1',
    nombre: 'Fondo de emergencia',
    descripcion: 'Ahorrar el equivalente a 3 meses de gastos para imprevistos.',
    categoria: 'Emergencia',
    montoObjetivo: 50000,
    montoActual: 32500,
    fechaInicio: '01/01/2026',
    fechaLimite: '31/12/2026',
    prioridad: 'alta',
    estado: 'activa',
    notas: 'Transferir L 2,500 cada quincena desde la cuenta planilla.',
  },
  {
    id: 'meta-2',
    nombre: 'Viaje a Roatán',
    descripcion: 'Vacaciones familiares en la isla durante Semana Santa.',
    categoria: 'Viaje',
    montoObjetivo: 18000,
    montoActual: 7200,
    fechaInicio: '15/02/2026',
    fechaLimite: '10/04/2026',
    prioridad: 'media',
    estado: 'activa',
    notas: 'Incluye vuelos, hotel y actividades acuáticas.',
  },
  {
    id: 'meta-3',
    nombre: 'Laptop para trabajo',
    descripcion: 'Equipo nuevo para proyectos freelance y clases.',
    categoria: 'Tecnología',
    montoObjetivo: 35000,
    montoActual: 35000,
    fechaInicio: '01/03/2026',
    fechaLimite: '30/06/2026',
    prioridad: 'alta',
    estado: 'completada',
    notas: 'Modelo con 16 GB RAM y SSD de 512 GB.',
  },
  {
    id: 'meta-4',
    nombre: 'Enganche apartamento',
    descripcion: 'Ahorro inicial para compra de vivienda propia.',
    categoria: 'Vivienda',
    montoObjetivo: 120000,
    montoActual: 28500,
    fechaInicio: '01/01/2025',
    fechaLimite: '31/12/2027',
    prioridad: 'alta',
    estado: 'activa',
    notas: 'Meta a largo plazo. Revisar avance cada trimestre.',
  },
  {
    id: 'meta-5',
    nombre: 'Curso de inglés',
    descripcion: 'Certificación internacional para mejorar oportunidades laborales.',
    categoria: 'Educación',
    montoObjetivo: 8500,
    montoActual: 2100,
    fechaInicio: '01/06/2026',
    fechaLimite: '15/09/2026',
    prioridad: 'media',
    estado: 'pausada',
    notas: 'Pausada hasta definir horario en el nuevo empleo.',
  },
];

export const metasGoals: GoalItem[] = [
  {
    id: 'goal-1',
    name: 'PS5',
    store: 'Amazon.com',
    amount: 836.94,
    dueDate: 18,
    currentInstallment: 1,
    totalInstallments: 4,
    image: ps5Image,
  },
  {
    id: 'goal-2',
    name: 'Cámara Nikon',
    store: 'Photo Express',
    amount: 2180.5,
    dueDate: 25,
    currentInstallment: 2,
    totalInstallments: 6,
    image: cameraImage,
  },
];

export function getMonthSpendingData(monthKey: string): MonthSpendingData {
  return monthlySpendingData[monthKey] ?? monthlySpendingData['2026-06'];
}

export const availableMonthKeys = Object.keys(monthlySpendingData).sort();