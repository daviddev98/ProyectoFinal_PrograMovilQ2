import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { colors, radius, shadows } from '../../constants/theme';
import { cn } from '../../lib/utils';
import { Text } from './Text';

export function Card({ style, ...props }: ViewProps) {
  return <View style={cn(styles.card, style)} {...props} />;
}

export function CardHeader({ style, ...props }: ViewProps) {
  return <View style={cn(styles.header, style)} {...props} />;
}

export function CardContent({ style, ...props }: ViewProps) {
  return <View style={cn(styles.content, style)} {...props} />;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <Text variant="subtitle">{children}</Text>;
}

export function CardDescription({ children }: { children: React.ReactNode }) {
  return <Text variant="muted">{children}</Text>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 4,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
