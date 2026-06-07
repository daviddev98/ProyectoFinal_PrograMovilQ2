import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import InstallmentCard from '../../components/InstallmentCard';
import ScreenHeader from '../../components/ScreenHeader';
import SpendingChart from '../../components/SpendingChart';
import StatCard from '../../components/StatCard';
import { Tabs, TabsContent, TabsList, TabsTrigger, Text } from '../../components/ui';
import {
  chartData,
  chartHighlight,
  installments4,
  installments6,
  spendingSummary,
} from '../../constants/sampleData';
import { colors, radius, spacing } from '../../constants/theme';

function formatCurrency(value: number) {
  return `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function InicioScreen() {
  const [installmentTab, setInstallmentTab] = useState('4');

  const handlePayNow = (name: string) => {
    Alert.alert('Pago simulado', `Procesando pago de ${name} (datos de muestra).`);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader title="Analytics" showBack={false} />

        <Text variant="label">Total Spending</Text>
        <Text variant="title" style={styles.totalSpending}>
          {formatCurrency(spendingSummary.totalSpending)}
        </Text>

        <SpendingChart
          data={chartData}
          highlightAmount={chartHighlight.amount}
          highlightDate={chartHighlight.date}
          startLabel="Nov 1, 2025"
          endLabel="Nov 30, 2025"
        />

        <View style={styles.statsRow}>
          <StatCard label="On Progress" amount={spendingSummary.onProgress} />
          <StatCard label="Overdue" amount={spendingSummary.overdue} highlight />
          <StatCard label="Total" amount={spendingSummary.total} />
        </View>

        <View style={styles.installmentsPanel}>
          <Tabs value={installmentTab} onValueChange={setInstallmentTab}>
            <TabsList>
              <TabsTrigger value="4" title="4 Installment" />
              <TabsTrigger value="6" title="6 Installment" />
            </TabsList>

            <TabsContent value="4">
              {installments4.map((item) => (
                <InstallmentCard
                  key={item.id}
                  item={item}
                  onPayNow={() => handlePayNow(item.name)}
                />
              ))}
            </TabsContent>

            <TabsContent value="6">
              {installments6.map((item) => (
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
