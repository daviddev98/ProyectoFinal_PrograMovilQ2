import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { Text } from '../components/ui';
import { useAppSettings } from '../hooks/useAppSettings';
import { spacing } from '../constants/theme';
import { RootStackParamList } from '../types/navigation';
import {
  hasValidDomain,
  isRequired,
  isValidEmail,
  isValidPassword,
} from '../utils/validation';
import { supabase } from '../services/supabaseClient';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

type FormErrors = {
  usuario?: string;
  password?: string;
};

export default function LoginScreen({ navigation }: Props) {
  const { colors, saveEmail } = useAppSettings();
  const [usuario, setUsuario] = useState('');
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

    if (!isRequired(password)) {
      nextErrors.password = 'La contraseña es obligatoria.';
    } else if (!isValidPassword(password)) {
      nextErrors.password = 'La contraseña debe tener más de 8 caracteres.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {

      const { data, error } = await supabase.auth.signInWithPassword({
        email: usuario.trim(),
        password: password.trim(),
      });

      
      if (error) {
        Alert.alert(
          'Error de inicio de sesión', 
          'El correo o la contraseña son incorrectos, o la cuenta aún no ha sido registrada.'
        );
        return;
      }
      
      if (data.user) {
        await saveEmail(usuario.trim());
        navigation.replace('MainTabs'); 
      }

    } catch (err) {
      Alert.alert('Error', 'Ocurrió un problema inesperado al conectar con el servidor.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
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
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={setPassword}
          error={errors.password}
        />

        <CustomButton title="Entrar" onPress={handleSubmit} />
        <Text 
          style={{ textAlign: 'center', 
            marginTop: 12, 
            fontSize: 14, 
            textDecorationLine: 'underline', 
            color: colors.foreground }} 
          onPress={() => navigation.navigate('Register')}
        >
          ¿No tienes cuenta? Regístrate aquí
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 320,
    padding: spacing.xl,
    gap: 14,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
});
