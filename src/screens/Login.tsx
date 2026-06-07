import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { Text } from '../components/ui';
import { colors } from '../constants/theme';
import { RootStackParamList } from '../types/navigation';
import {
  hasValidDomain,
  isRequired,
  isValidEmail,
  isValidPassword,
  isValidPhone,
} from '../utils/validation';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

type FormErrors = {
  usuario?: string;
  telefono?: string;
  password?: string;
};

export default function LoginScreen({ navigation }: Props) {
  const [usuario, setUsuario] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!isRequired(usuario)) {
      nextErrors.usuario = 'El correo es obligatorio.';
    } else if (!isValidEmail(usuario)) {
      nextErrors.usuario = 'Ingresa un correo electrónico válido.';
    } else if (!hasValidDomain(usuario)) {
      nextErrors.usuario =
        'El correo debe ser @gmail.com, @unitec.edu, @hotmail.com o @outlook.com.';
    }

    if (!isRequired(telefono)) {
      nextErrors.telefono = 'El teléfono es obligatorio.';
    } else if (!isValidPhone(telefono)) {
      nextErrors.telefono = 'Ingresa un teléfono válido (8 a 15 dígitos).';
    }

    if (!isRequired(password)) {
      nextErrors.password = 'La contraseña es obligatoria.';
    } else if (!isValidPassword(password)) {
      nextErrors.password = 'La contraseña debe tener más de 8 caracteres.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    navigation.replace('MainTabs');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.form}>
        <Text variant="subtitle" style={styles.title}>
          Iniciar sesión
        </Text>

        <CustomInput
          type="email"
          placeholder="Correo electrónico"
          value={usuario}
          onChange={setUsuario}
          error={errors.usuario}
        />

        <CustomInput
          type="phone"
          placeholder="Teléfono"
          value={telefono}
          onChange={setTelefono}
          error={errors.telefono}
        />

        <CustomInput
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={setPassword}
          error={errors.password}
        />

        <CustomButton title="Entrar" onPress={handleSubmit} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
  },
  form: {
    width: '100%',
    maxWidth: 320,
    padding: 24,
    gap: 14,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
});
