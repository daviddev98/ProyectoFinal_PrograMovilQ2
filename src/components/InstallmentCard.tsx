import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius } from '../constants/theme';
import { InstallmentItem } from '../constants/sampleData';
import { Button, Card, CardContent, Text } from './ui';

type Props = {
  item: InstallmentItem;
  onPayNow?: () => void;
};

function formatCurrency(value: number) {
  return `$${value.toFixed(2)}`;
}

export default function InstallmentCard({ item, onPayNow }: Props) {
  const isOverdue = item.dueDate < 20;

  return (
    <Card style={styles.card}>
      <CardContent>
        <View style={styles.topRow}>
          <Image source={item.image} style={styles.image} resizeMode="cover" />

          <View style={styles.info}>
            <Text variant="default" style={styles.name}>
              {item.name}
            </Text>
            <Text variant="muted">{item.source}</Text>
          </View>

          <View style={styles.amountBlock}>
            <Text variant="default" style={styles.amount}>
              {formatCurrency(item.amount)}
            </Text>
            <Text variant="muted">Due date {item.dueDate}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.bottomRow}>
          <View style={styles.statusRow}>
            <Ionicons
              name="time-outline"
              size={14}
              color={isOverdue ? colors.warning : colors.mutedForeground}
            />
            <Text
              variant="muted"
              style={isOverdue ? styles.overdueText : undefined}
            >
              {item.currentInstallment} of {item.totalInstallments} Installment
            </Text>
          </View>

          <Button variant="link" title="Pay Now" onPress={onPayNow} />
        </View>
      </CardContent>
    </Card>
  );
}

const styles = StyleSheet.create({
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
  },
  name: {
    fontWeight: '700',
    fontSize: 15,
  },
  amountBlock: {
    alignItems: 'flex-end',
    gap: 2,
  },
  amount: {
    fontWeight: '700',
    fontSize: 15,
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
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  overdueText: {
    color: colors.warning,
    fontWeight: '600',
  },
});
