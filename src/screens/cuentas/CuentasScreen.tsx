import React, { useMemo } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import CardWallet from '../../components/CardWallet';
import GoalCard from '../../components/GoalCard';
import QuickActionButtons from '../../components/QuickActionButtons';
import ScreenHeader from '../../components/ScreenHeader';
import { Text } from '../../components/ui';
import { spacing } from '../../constants/theme';
import { useAppSettings } from '../../hooks/useAppSettings';
import { ThemeColors } from '../../constants/themes';
import { useAppSelector } from '../../store/hooks';
import { selectCardWallet, selectMetas } from '../../store/selectors/financeSelectors';
import { RootStackParamList } from '../../types/navigation';

export default function CuentasScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useAppSettings();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const cardWallet = useAppSelector(selectCardWallet);
  const metas = useAppSelector(selectMetas);

  const handleOpenSettings = () => {
    navigation.navigate('Configuracion');
  };

  const quickActions = [
    {
      id: 'details',
      label: 'Detalles',
      icon: 'card-outline' as const,
      onPress: () => Alert.alert('Detalles', 'Próximamente podrás ver los detalles de tu tarjeta.'),
    },
    {
      id: 'freeze',
      label: 'Congelar',
      icon: 'snow-outline' as const,
      onPress: () => Alert.alert('Congelar tarjeta', 'Tu tarjeta se congelará temporalmente.'),
    },
    {
      id: 'more',
      label: 'Más',
      icon: 'ellipsis-horizontal' as const,
      onPress: handleOpenSettings,
    },
  ];

  const handlePayPress = (goalName: string) => {
    Alert.alert('Pagar ahora', `Procesar pago de ${goalName}.`);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title=""
          showBack={false}
          onSettingsPress={handleOpenSettings}
        />

        <CardWallet wallet={cardWallet} />

        <QuickActionButtons actions={quickActions} />

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
  });

