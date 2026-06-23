import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as WebBrowser from 'expo-web-browser';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { Text } from '../../components/ui';
import { useAppDispatch } from '../../store/hooks';
import { useAppSettings } from '../../hooks/useAppSettings';
import { spacing } from '../../constants/theme';
import { RootStackParamList } from '../../types/navigation';
import { supabase } from '../../services/supabaseClient';
import {
  hasValidDomain,
  isRequired,
  isValidEmail,
  isValidPassword,
} from '../../utils/validation';
import { logoutSettings } from '../../store/slices/settingsSlice';
import { store } from '../../store';

WebBrowser.maybeCompleteAuthSession();

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

type FormErrors = {
  name?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
};

export default function RegisterScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const { colors, saveEmail, saveProfileImage } = useAppSettings();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.user) {
        if (session.user.email) {
          await saveEmail(session.user.email);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const validateForm = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!isRequired(name)) {
      nextErrors.name = 'El nombre completo es obligatorio.';
    }

    if (!isRequired(phoneNumber)) {
      nextErrors.phoneNumber = 'El número de teléfono es obligatorio.';
    }

    if (!isRequired(email)) {
      nextErrors.email = 'El correo es obligatorio.';
    } else if (!isValidEmail(email)) {
      nextErrors.email = 'Ingresa un correo electrónico válido.';
    } else if (!hasValidDomain(email)) {
      nextErrors.email =
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

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
          data: {
            full_name: name.trim(),
            phone_number: phoneNumber.trim(),
          },
        },
      });

      if (error) {
        Alert.alert('Error al registrarse', error.message);
        return;
      }

      if (data.user) {
        Alert.alert(
          '¡Registro exitoso!',
          'Tu cuenta fue creada correctamente. Revisa tu correo si se requiere confirmación.',
          [
            {
              text: 'Ir a Iniciar sesión',
              onPress: () => navigation.navigate('Login'),
            },
          ]
        );
      }
    } catch (err) {
      Alert.alert('Error', 'Ocurrió un problema inesperado.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      
      const redirectUrl = 'controldegastos://auth/v1/callback';

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true,
        },
      });

      if (error) throw error;

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

    
            await saveProfileImage(''); 

            const { data: { user } } = await supabase.auth.getUser();
            if (user?.email) {
              await saveEmail(user.email);
            }

            console.log('¡Registro con Google exitoso!');
            
            navigation.replace('MainTabs');
            return;
          } else {
            Alert.alert('Error', 'No se pudieron recuperar los tokens de registro de la URL.');
          }
        }
      }
    } catch (err: any) {
      Alert.alert('Error con Google', err.message || 'No se pudo registrar con Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.form}>
        <Text variant="subtitle" style={styles.title}>
          Crear cuenta
        </Text>

        <CustomInput
          type="default"
          placeholder="Nombre completo"
          value={name}
          onChange={setName}
          error={errors.name}
        />

        <CustomInput
          type="number"
          placeholder="Número de teléfono"
          value={phoneNumber}
          onChange={setPhoneNumber}
          error={errors.phoneNumber}
        />

        <CustomInput
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={setEmail}
          error={errors.email}
        />

        <CustomInput
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={setPassword}
          error={errors.password}
        />

        <View style={styles.buttonGap}>
          <CustomButton 
            title={loading ? 'Registrando...' : 'Registrarse'} 
            onPress={handleRegister} 
          />
          
          <CustomButton 
            title="Registrarse con Google" 
            onPress={handleGoogleSignUp}
            // variant="secondary" <- Si tu CustomButton acepta variantes, actívalo
          />
        </View>

        <Text 
          style={[styles.linkText, { color: colors.foreground }]} 
          onPress={() => navigation.navigate('Login')}
        >
          ¿Ya tienes cuenta? Inicia sesión aquí
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
  linkText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});