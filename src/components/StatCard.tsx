import React from 'react';
import { StyleSheet } from 'react-native';

import { formatLPS } from '../utils/currency';
import { Card, CardContent, Text } from './ui';

type Props = {
  label: string;
  amount: number;
  highlight?: boolean;
};

export default function StatCard({ label, amount, highlight = false }: Props) {
  return (
    <Card style={[styles.card, highlight && styles.highlight]}>
      <CardContent style={styles.content}>
        <Text variant="label">{label}</Text>
        <Text variant="default" style={styles.amount}>
          {formatLPS(amount)}
        </Text>
      </CardContent>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
  },
  highlight: {
    borderColor: '#BFDBFE',
    backgroundColor: '#F8FAFF',
  },
  content: {
    paddingTop: 14,
    gap: 6,
  },
  amount: {
    fontSize: 15,
    fontWeight: '700',
  },
});
