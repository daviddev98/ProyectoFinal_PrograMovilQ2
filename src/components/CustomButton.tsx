import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'transparent';
};

export default function CustomButton({ title, onPress, variant = 'primary' }: CustomButtonProps) {
  const styles = getStyles(variant);
  
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const getStyles = (variant: 'primary' | 'secondary' | 'transparent') =>
  StyleSheet.create({
    button: {
      marginTop: 12,
      padding: 12,
      borderRadius: 4,
      alignItems: 'center',
      width: '100%',
      backgroundColor: 
        variant === 'primary' ? '#111111' : 
        variant === 'secondary' ? '#cccccc' : 
        'transparent',
      borderWidth: variant === 'transparent' ? 0 : 0,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: '500',
      color: variant === 'transparent' ? '#111111' : '#ffffff',
    },
  });