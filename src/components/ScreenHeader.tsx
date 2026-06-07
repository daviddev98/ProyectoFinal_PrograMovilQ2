import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../constants/theme';
import { Button, Text } from './ui';

type Props = {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  onMenuPress?: () => void;
};

export default function ScreenHeader({
  title,
  showBack = true,
  onBackPress,
  onMenuPress,
}: Props) {
  return (
    <View style={styles.container}>
      {showBack ? (
        <Button variant="outline" size="icon" onPress={onBackPress}>
          <Ionicons name="arrow-back" size={18} color={colors.foreground} />
        </Button>
      ) : (
        <View style={styles.placeholder} />
      )}

      <Text variant="subtitle" style={styles.title}>
        {title}
      </Text>

      <Button variant="outline" size="icon" onPress={onMenuPress}>
        <Ionicons name="ellipsis-horizontal" size={18} color={colors.foreground} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
  },
  placeholder: {
    width: 40,
  },
});
