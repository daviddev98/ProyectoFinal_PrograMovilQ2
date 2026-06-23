import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as WebBrowser from 'expo-web-browser';
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

WebBrowser.maybeCompleteAuthSession();

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

type FormErrors = {
  usuario?: string;
  password?: string;
};

export default function LoginScreen({ navigation }: Props) {
  const { colors, saveEmail, saveProfileImage } = useAppSettings();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loadingGoogle, setLoadingGoogle] = useState(false);
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
        await saveProfileImage('');
        navigation.replace('MainTabs'); 
      }

    } catch (err) {
      Alert.alert('Error', 'Ocurrió un problema inesperado al conectar con el servidor.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoadingGoogle(true); 
      
      const redirectUrl = 'controldegastos://auth/v1/callback';

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true,
        },
      });

      if (error) {
        Alert.alert('Error de autenticación', error.message);
        return;
      }

      if (data?.url) {
        
        const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);
        
        
        if (result.type === 'success' && result.url) {
          
         
          const extractToken = (url: string, key: string) => {
            const matches = url.match(new RegExp(`${key}=([^&]*)`));
            return matches ? matches[1] : null;
          };

          const hashToken = extractToken(result.url, 'access_token');
          const hashRefresh = extractToken(result.url, 'refresh_token');

          if (hashToken && hashRefresh) {
           
            await supabase.auth.setSession({
              access_token: hashToken,
              refresh_token: hashRefresh,
            });

           
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.email) {
              await saveEmail(user.email);
            }

            console.log('¡Inicio de sesión con Google exitoso!');
            await saveProfileImage('');
            navigation.replace('MainTabs');
         
          } else {
            Alert.alert('Error', 'No se pudieron recuperar los tokens de inicio de sesión de la URL.');
          }
        }
      }
    } catch (err) {
      Alert.alert('Error', 'Ocurrió un error inesperado al conectar con Google.');
    } finally {
      setLoadingGoogle(false); 
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

        <View style={styles.buttonGap}>
          <CustomButton title="Entrar" onPress={handleSubmit} />
          
          <CustomButton 
            title={loadingGoogle ? 'Cargando Google...' : 'Iniciar sesión con Google'} 
            onPress={handleGoogleLogin}
          />
        </View>

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
  buttonGap: {
    gap: 10,
    marginTop: 6,
  },
});
