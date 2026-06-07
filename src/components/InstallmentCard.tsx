import React, { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { useAppSettings } from '../context/AppSettingsContext';
import { MovementItem } from '../constants/sampleData';
import { ThemeColors } from '../constants/themes';
import { radius } from '../constants/theme';
import { formatLPS } from '../utils/currency';
import { Card, CardContent, Text } from './ui';

type Props = {
  item: MovementItem;
};

export default function InstallmentCard({ item }: Props) {
  const { colors } = useAppSettings();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const isExpense = item.amount < 0;

  return (
    <Card style={styles.card}>
      <CardContent>
        <View style={styles.topRow}>
          <Image source={item.image} style={styles.image} resizeMode="cover" />

          <View style={styles.info}>
            <Text variant="default" style={styles.merchant}>
              {item.merchant}
            </Text>
            <Text variant="muted" style={styles.category}>
              {item.category}
            </Text>
          </View>

          <View style={styles.amountBlock}>
            <Text
              variant="default"
              style={[styles.amount, isExpense && styles.expenseAmount]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {formatLPS(item.amount)}
            </Text>
            <Text variant="muted" style={styles.dueDate}>
              Vence el {item.dueDate}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.bottomRow}>
          <Text variant="muted" style={styles.bankAccount}>
            {item.bankAccount}
          </Text>
          <Text variant="link" style={styles.detailsLink}>
            Ver detalles
          </Text>
        </View>
      </CardContent>
    </Card>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      borderRadius: radius.lg,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    image: {
      width: 48,
      height: 48,
      borderRadius: radius.sm,
      backgroundColor: colors.secondary,
    },
    info: {
      flex: 1,
      gap: 2,
      minWidth: 0,
    },
    merchant: {
      fontWeight: '700',
      fontSize: 13,
    },
    category: {
      fontSize: 12,
    },
    amountBlock: {
      alignItems: 'flex-end',
      gap: 2,
      maxWidth: 110,
    },
    amount: {
      fontWeight: '700',
      fontSize: 12,
    },
    expenseAmount: {
      color: colors.destructive,
    },
    dueDate: {
      fontSize: 11,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 12,
    },
    bottomRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    bankAccount: {
      fontSize: 12,
      fontWeight: '600',
    },
    detailsLink: {
      fontSize: 12,
    },
  });
