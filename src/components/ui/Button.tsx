import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';

import { colors, radius } from '../../constants/theme';
import { cn } from '../../lib/utils';
import { Text } from './Text';

type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'icon';

type Props = {
  title?: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: ViewStyle;
  children?: React.ReactNode;
};

const variantStyles = StyleSheet.create({
  default: {
    backgroundColor: colors.foreground,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  link: {
    backgroundColor: 'transparent',
  },
});

const sizeStyles = StyleSheet.create({
  default: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radius.sm,
  },
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.sm,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const textVariantMap: Record<ButtonVariant, 'default' | 'link' | 'muted'> = {
  default: 'default',
  secondary: 'default',
  outline: 'default',
  ghost: 'default',
  link: 'link',
};

export function Button({
  title,
  onPress,
  variant = 'default',
  size = 'default',
  disabled = false,
  style,
  children,
}: Props) {
  const isLightText = variant === 'default';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) =>
        cn(
          styles.base,
          variantStyles[variant],
          sizeStyles[size],
          pressed && styles.pressed,
          disabled && styles.disabled,
          style
        )
      }
    >
      {children ??
        (title ? (
          <Text
            variant={textVariantMap[variant]}
            style={isLightText ? styles.lightText : undefined}
          >
            {title}
          </Text>
        ) : null)}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  lightText: {
    color: colors.primaryForeground,
    fontWeight: '600',
  },
});
