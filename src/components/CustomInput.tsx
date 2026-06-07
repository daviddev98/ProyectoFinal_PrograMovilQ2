import React, { useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  KeyboardTypeOptions,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import { colors } from '../constants/theme';

type Props = {
  type?: 'text' | 'email' | 'password' | 'phone';
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  error?: string;
};

export default function CustomInput({
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
}: Props) {
  const [isSecureText, setIsSecureText] = useState(type === 'password');
  const isPasswordField = type === 'password';

  const icon: keyof typeof MaterialIcons.glyphMap | undefined =
    type === 'email'
      ? 'alternate-email'
      : type === 'password'
        ? 'lock'
        : type === 'phone'
          ? 'phone'
          : undefined;

  const keyboardType: KeyboardTypeOptions =
    type === 'email' ? 'email-address' : type === 'phone' ? 'phone-pad' : 'default';

  return (
    <View style={styles.wrapper}>
      <View style={[styles.inputContainer, error ? styles.inputError : undefined]}>
        {icon && <MaterialIcons name={icon} size={20} color="#666666" style={styles.icon} />}

        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#999999"
          value={value}
          onChangeText={onChange}
          style={styles.input}
          secureTextEntry={isSecureText}
          keyboardType={keyboardType}
          autoCapitalize="none"
        />

        {isPasswordField && (
          <TouchableOpacity onPress={() => setIsSecureText(!isSecureText)} style={styles.iconRight}>
            <Ionicons name={isSecureText ? 'eye' : 'eye-off'} size={20} color="#666666" />
          </TouchableOpacity>
        )}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 4,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingVertical: 4,
  },
  inputError: {
    borderBottomColor: colors.destructive,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#111111',
    paddingVertical: 6,
  },
  iconRight: {
    padding: 4,
  },
  errorText: {
    color: colors.destructive,
    fontSize: 12,
    marginTop: 4,
  },
});
