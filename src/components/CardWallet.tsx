import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useAppSettings } from '../hooks/useAppSettings';
import { CardWalletData } from '../constants/sampleData';
import { ThemeColors } from '../constants/themes';
import { radius, spacing } from '../constants/theme';
import { formatLPS } from '../utils/currency';
import { Text } from './ui';

type Props = {
  wallet: CardWalletData;
};

export default function CardWallet({ wallet }: Props) {
  const { colors } = useAppSettings();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [showBalance, setShowBalance] = useState(true);

  const displayBalance = showBalance ? formatLPS(wallet.limitBalance) : '••••••';

  return (
    <View style={styles.wallet}>
      <View style={styles.backCard}>
        <Text style={styles.backCardBrand}>{wallet.backCardBrand}</Text>
        <Text style={styles.backCardNumber}>{wallet.backCardNumber}</Text>
      </View>

      <LinearGradient
        colors={['#3D4450', '#2A2F38']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.frontCard}
      >
        <View style={styles.stitchedBorder} />
        <View style={styles.frontCardContent}>
          <Text style={styles.limitLabel}>Límite de tarjeta</Text>
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
                size={20}
                color="#FFFFFF"
              />
            </Pressable>
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
      paddingTop: spacing.sm,
      minHeight: 180,
    },
    backCard: {
      position: 'absolute',
      top: 0,
      left: spacing.md,
      right: spacing.md,
      backgroundColor: '#B8BEC8',
      borderRadius: radius.lg,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      zIndex: 0,
    },
    backCardBrand: {
      color: '#4B5563',
      fontSize: 11,
      fontWeight: '600',
      marginBottom: 4,
    },
    backCardNumber: {
      color: '#374151',
      fontSize: 13,
      fontWeight: '500',
      letterSpacing: 0.5,
    },
    frontCard: {
      marginTop: 36,
      marginHorizontal: spacing.sm,
      borderRadius: radius.xl,
      overflow: 'hidden',
      zIndex: 1,
    },
    stitchedBorder: {
      ...StyleSheet.absoluteFillObject,
      borderWidth: 1.5,
      borderColor: 'rgba(255,255,255,0.15)',
      borderRadius: radius.xl,
      borderStyle: 'dashed',
      margin: 10,
    },
    frontCardContent: {
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.xl,
      gap: spacing.sm,
    },
    limitLabel: {
      color: 'rgba(255,255,255,0.7)',
      fontSize: 13,
      fontWeight: '500',
    },
    balanceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.md,
    },
    balance: {
      color: '#FFFFFF',
      fontSize: 32,
      fontWeight: '700',
      flex: 1,
    },
  });