import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const DOMINIOS_VALIDOS = ['@gmail.com', '@unitec.edu', '@hotmail.com', '@outlook.com'];

const Login: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');

    if (!usuario.trim() || !password.trim()) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const dominioValido = DOMINIOS_VALIDOS.some((d) => usuario.endsWith(d));
    if (!dominioValido) {
      setError('El correo debe ser @gmail.com, @unitec.edu, @hotmail.com o @outlook.com.');
      return;
    }

    if (password.length <= 8) {
      setError('La contraseña debe tener más de 8 caracteres.');
      return;
    }

    Alert.alert('Éxito', 'Inicio de sesión exitoso');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Iniciar sesión</Text>

        <TextInput
          placeholder="Usuario"
          value={usuario}
          onChangeText={setUsuario}
          style={styles.input}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          autoCapitalize="none"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  form: {
    width: '100%',
    maxWidth: 320,
    padding: 24,
    gap: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111111',
    textAlign: 'center',
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingVertical: 8,
    fontSize: 14,
    color: '#111111',
  },
  error: {
    color: '#c00000',
    fontSize: 12,
    marginTop: 2,
  },
  button: {
    marginTop: 12,
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#111111',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
  },
});

export default Login;
