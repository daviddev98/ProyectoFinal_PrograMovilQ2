import React, { useMemo } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import CardWallet from '../../components/CardWallet';
import GoalCard from '../../components/GoalCard';
import ScreenHeader from '../../components/ScreenHeader';
import { Text } from '../../components/ui';
import { spacing } from '../../constants/theme';
import { CardWalletData } from '../../constants/sampleData';
import { useAppSettings } from '../../hooks/useAppSettings';
import { ThemeColors } from '../../constants/themes';
import { useAppSelector } from '../../store/hooks';
import { selectAccountById, selectMetas } from '../../store/selectors/financeSelectors';
import { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'CuentasDetalle'>;

export default function CuentasDetalleScreen({ navigation, route }: Props) {
  const { accountId } = route.params;
  const { colors } = useAppSettings();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const account = useAppSelector(selectAccountById(accountId));
  const metas = useAppSelector(selectMetas);

  const wallet: CardWalletData = useMemo(() => {
    if (account?.type === 'credit_card' && account.brand) {
      return {
        brand: account.brand,
        usedBalance: account.balance,
      };
    }

    return {
      brand: 'mastercard',
      usedBalance: account?.balance ?? 0,
    };
  }, [account]);

  const handlePayPress = (goalName: string) => {
    Alert.alert('Pagar ahora', `Procesar pago de ${goalName}.`);
  };

  if (!account) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScreenHeader title="Cuenta" onBackPress={() => navigation.goBack()} />
        <Text variant="muted" style={styles.notFound}>
          No se encontró la cuenta solicitada.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title={account.name}
          onBackPress={() => navigation.goBack()}
        />

        <CardWallet wallet={wallet} />

        <Text variant="subtitle" style={styles.sectionTitle}>
          Movimientos
        </Text>

        <View style={styles.goalsList}>
          {metas.map((item) => (
            <GoalCard
              key={item.id}
              item={item}
              onPayPress={(goal) => handlePayPress(goal.name)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
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
    sectionTitle: {
      marginBottom: spacing.md,
      fontSize: 20,
    },
    goalsList: {
      gap: 0,
    },
    notFound: {
      textAlign: 'center',
      marginTop: spacing.xl,
    },
  });
