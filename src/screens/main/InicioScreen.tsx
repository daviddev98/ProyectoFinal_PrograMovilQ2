import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import InstallmentCard from '../../components/InstallmentCard';
import MonthSelector from '../../components/MonthSelector';
import ScreenHeader from '../../components/ScreenHeader';
import SpendingChart from '../../components/SpendingChart';
import StatCard from '../../components/StatCard';
import { Tabs, TabsContent, TabsList, TabsTrigger, Text } from '../../components/ui';
import {
  availableMonthKeys,
  getMonthSpendingData,
  installmentsMovimientos,
  installmentsPagos,
} from '../../constants/sampleData';
import { colors, radius, spacing } from '../../constants/theme';
import { RootStackParamList } from '../../types/navigation';
import { formatLPS } from '../../utils/currency';
import { getMonthKey } from '../../utils/date';

function getInitialMonth(): Date {
  const now = new Date();
  const currentKey = getMonthKey(now);

  if (availableMonthKeys.includes(currentKey)) {
    return now;
  }

  const lastKey = availableMonthKeys[availableMonthKeys.length - 1];
  const [year, month] = lastKey.split('-');
  return new Date(Number(year), Number(month) - 1, 1);
}

export default function InicioScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState('movimientos');
  const [selectedMonth, setSelectedMonth] = useState(getInitialMonth);

  const monthKey = getMonthKey(selectedMonth);
  const monthData = useMemo(() => getMonthSpendingData(monthKey), [monthKey]);

  const currentMonthIndex = availableMonthKeys.indexOf(monthKey);
  const canGoPrev = currentMonthIndex > 0;
  const canGoNext =
    currentMonthIndex !== -1 && currentMonthIndex < availableMonthKeys.length - 1;

  const handlePayNow = (name: string) => {
    Alert.alert('Pago simulado', `Procesando pago de ${name} (datos de muestra).`);
  };

  const handleOpenSettings = () => {
    navigation.navigate('Configuracion');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Estadística"
          showBack={false}
          onSettingsPress={handleOpenSettings}
        />

        <MonthSelector
          selectedDate={selectedMonth}
          onChange={setSelectedMonth}
          canGoPrev={canGoPrev}
          canGoNext={canGoNext}
        />

        <Text variant="label">Gasto total</Text>
        <Text variant="title" style={styles.totalSpending}>
          {formatLPS(monthData.totalSpending)}
        </Text>

        <SpendingChart
          data={monthData.chartData}
          highlightAmount={monthData.chartHighlight.amount}
          highlightDate={monthData.chartHighlight.date}
          startLabel={monthData.startLabel}
          endLabel={monthData.endLabel}
        />

        <View style={styles.statsRow}>
          <StatCard label="Ingresos" amount={monthData.ingresos} />
          <StatCard label="Gastos" amount={monthData.gastos} highlight />
          <StatCard label="Total" amount={monthData.total} />
        </View>

        <View style={styles.installmentsPanel}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="movimientos" title="Movimientos" />
              <TabsTrigger value="pagos-programados" title="Pagos programados" />
            </TabsList>

            <TabsContent value="movimientos">
              {installmentsMovimientos.map((item) => (
                <InstallmentCard
                  key={item.id}
                  item={item}
                  onPayNow={() => handlePayNow(item.name)}
                />
              ))}
            </TabsContent>

            <TabsContent value="pagos-programados">
              {installmentsPagos.map((item) => (
                <InstallmentCard
                  key={item.id}
                  item={item}
                  onPayNow={() => handlePayNow(item.name)}
                />
              ))}
            </TabsContent>
          </Tabs>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 120,
  },
  totalSpending: {
    marginTop: 4,
    marginBottom: 8,
    fontSize: 34,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    marginBottom: 24,
  },
  installmentsPanel: {
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.lg,
    minHeight: 320,
  },
});
