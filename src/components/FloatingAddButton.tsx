import React from 'react';
import { Alert, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius, shadows } from '../constants/theme';

type Props = {
  onPress?: () => void;
};

export default function FloatingAddButton({ onPress }: Props) {
  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }

    Alert.alert('Nuevo registro', 'Función de agregar movimiento (datos de muestra).');
  };

  return (
    <Pressable style={styles.button} onPress={handlePress}>
      <Ionicons name="add" size={28} color={colors.primaryForeground} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 24,
    bottom: 96,
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.foreground,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
});
