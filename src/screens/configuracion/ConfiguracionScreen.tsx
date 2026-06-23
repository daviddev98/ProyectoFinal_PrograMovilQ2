import React, { useMemo } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

import ScreenHeader from '../../components/ScreenHeader';
import CustomButton from '../../components/CustomButton';
import { Card, CardContent, Switch, Text } from '../../components/ui';
import { useAppSettings } from '../../hooks/useAppSettings';
import { ThemeColors } from '../../constants/themes';
import { radius, spacing } from '../../constants/theme';
import { RootStackParamList } from '../../types/navigation';
import { supabase } from '../../services/supabaseClient';
import { clearUserStorage, logoutSettings } from '../../store/slices/settingsSlice';
import { useAppDispatch } from '../../store/hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'Configuracion'>;

export default function ConfiguracionScreen({ navigation }: Props) {
  const rootNavigation = useNavigation();
  const dispatch = useAppDispatch();
  const { colors, isDark, theme, setTheme, email, profileImageUri, saveProfileImage } =
    useAppSettings();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro de que deseas cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Cerrar sesión',
        style: 'destructive',
        onPress: async () => { 
          try {
            await supabase.auth.signOut(); 
            
            dispatch(logoutSettings()); 
            dispatch(clearUserStorage());
            
            setTimeout(() => {
              rootNavigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                })
              );
            }, 100);
          } catch (error) {
            Alert.alert('Error', 'No se pudo cerrar la sesión correctamente.');
          }
        },
      },
    ]);
  };

  const handlePickProfileImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a tu galería para cambiar la foto.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      await saveProfileImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Configuración" onBackPress={() => navigation.goBack()} />

        <View style={styles.profileSection}>
          <Pressable onPress={handlePickProfileImage} style={styles.avatarWrapper}>
            {profileImageUri ? (
              <Image source={{ uri: profileImageUri }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={28} color={colors.mutedForeground} />
              </View>
            )}
            <View style={styles.editBadge}>
              <Ionicons name="camera" size={12} color={colors.primaryForeground} />
            </View>
          </Pressable>

          <Text variant="default" style={styles.email}>
            {email || 'Sin correo registrado'}
          </Text>
        </View>

        <Card style={styles.settingCard}>
          <CardContent style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text variant="default" style={styles.settingTitle}>
                Modo oscuro
              </Text>
              <Text variant="muted">Cambia la apariencia de la aplicación</Text>
            </View>
            <Switch
              checked={isDark}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
          </CardContent>
        </Card>

        <Card style={styles.settingCard}>
          <CardContent style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text variant="default" style={styles.settingTitle}>
                Foto de perfil
              </Text>
              <Text variant="muted">Selecciona una imagen desde tu galería</Text>
            </View>
            <Pressable style={styles.profileButton} onPress={handlePickProfileImage}>
              <Text variant="link">Cambiar</Text>
            </Pressable>
          </CardContent>
        </Card>

        <Text variant="muted" style={styles.themeHint}>
          Tema actual: {theme === 'dark' ? 'Oscuro' : 'Claro'}
        </Text>

        <CustomButton title="Cerrar sesión" onPress={handleLogout} variant="secondary" />
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl,
    },
    profileSection: {
      alignItems: 'center',
      marginBottom: spacing.xl,
      gap: spacing.sm,
    },
    avatarWrapper: {
      position: 'relative',
    },
    avatar: {
      width: 72,
      height: 72,
      borderRadius: radius.full,
      borderWidth: 2,
      borderColor: colors.border,
    },
    avatarPlaceholder: {
      width: 72,
      height: 72,
      borderRadius: radius.full,
      backgroundColor: colors.secondary,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: colors.border,
    },
    editBadge: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: 24,
      height: 24,
      borderRadius: radius.full,
      backgroundColor: colors.foreground,
      alignItems: 'center',
      justifyContent: 'center',
    },
    email: {
      fontSize: 14,
      fontWeight: '500',
    },
    settingCard: {
      marginBottom: spacing.md,
    },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.md,
      paddingTop: spacing.md,
    },
    settingInfo: {
      flex: 1,
      gap: 4,
    },
    settingTitle: {
      fontWeight: '600',
    },
    profileButton: {
      paddingVertical: 4,
      paddingHorizontal: 8,
    },
    themeHint: {
      marginBottom: spacing.lg,
      textAlign: 'center',
    },
  });
