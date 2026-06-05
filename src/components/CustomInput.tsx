import React, { useState } from 'react';
import { 
  TextInput, 
  TouchableOpacity, 
  View, 
  Text, 
  StyleSheet, 
  KeyboardTypeOptions 
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

type Props = {
  type?: 'text' | 'email' | 'password';
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
};

export default function CustomInput({ type = 'text', placeholder, value, onChange }: Props) {
  const [isSecureText, setIsSecureText] = useState(type === 'password');
  const isPasswordField = type === 'password';

  const icon: typeof MaterialIcons['name'] | undefined =
    type === 'email' ? 'alternate-email' : type === 'password' ? 'lock' : undefined;

  const keyboardType: KeyboardTypeOptions = type === 'email' ? 'email-address' : 'default';

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputContainer}>
        {icon && <MaterialIcons name={icon as any} size={20} color="#666666" style={styles.icon} />}
        
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
});