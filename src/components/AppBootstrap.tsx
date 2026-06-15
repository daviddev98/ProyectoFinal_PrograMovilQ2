import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useAppSettings } from '../hooks/useAppSettings';
import { useAppDispatch } from '../store/hooks';
import { loadSettings } from '../store/slices/settingsSlice';

type Props = {
  children: React.ReactNode;
};

export default function AppBootstrap({ children }: Props) {
  const dispatch = useAppDispatch();
  const { isReady, colors } = useAppSettings();

  useEffect(() => {
    dispatch(loadSettings());
  }, [dispatch]);

  if (!isReady) {
    return (
      <View style={[styles.loading, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
