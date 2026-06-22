import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useAppSettings } from '../hooks/useAppSettings';
import { CardWalletData } from '../constants/sampleData';
import { ThemeColors } from '../constants/themes';
import { radius, shadows, spacing } from '../constants/theme';
import { formatLPS } from '../utils/currency';
import CardBrandLogo from './CardBrandLogo';
import { Text } from './ui';

type Props = {
  wallet: CardWalletData;
};

export default function CardWallet({ wallet }: Props) {
  const { colors } = useAppSettings();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [showBalance, setShowBalance] = useState(true);

  const displayBalance = showBalance ? formatLPS(wallet.usedBalance) : '••••••';

  return (
    <View style={styles.wallet}>
      <LinearGradient
        colors={['#D8D8D8', '#F2F2F2', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.topRow}>
          <CardBrandLogo brand={wallet.brand} />

          <View style={styles.balanceBlock}>
            <Text style={styles.balanceLabel}>Saldo utilizado</Text>
            <View style={styles.balanceRow}>
              <Text style={styles.balance}>{displayBalance}</Text>
              <Pressable
                onPress={() => setShowBalance((prev) => !prev)}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel={showBalance ? 'Ocultar saldo' : 'Mostrar saldo'}
              >
                <Ionicons
                  name={showBalance ? 'eye-outline' : 'eye-off-outline'}
                  size={18}
                  color={colors.mutedForeground}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    wallet: {
      marginBottom: spacing.lg,
    },
    card: {
      borderRadius: radius.xl,
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.xl,
      minHeight: 160,
      justifyContent: 'center',
      ...shadows.card,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    balanceBlock: {
      alignItems: 'flex-end',
      gap: 4,
    },
    balanceLabel: {
      color: colors.mutedForeground,
      fontSize: 11,
      fontWeight: '600',
      letterSpacing: 0.8,
      textTransform: 'uppercase',
    },
    balanceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    balance: {
      color: colors.foreground,
      fontSize: 22,
      fontWeight: '700',
      letterSpacing: -0.5,
    },
  });
