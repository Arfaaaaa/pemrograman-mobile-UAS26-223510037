import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const CustomButton = ({ title, onPress, type = 'primary', loading = false, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        type === 'primary' ? styles.primaryBg : styles.secondaryBg,
        disabled && styles.disabledBg,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={type === 'primary' ? '#fff' : '#6366F1'} />
      ) : (
        <Text
          style={[
            styles.text,
            type === 'primary' ? styles.primaryText : styles.secondaryText,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%',
  },
  primaryBg: {
    backgroundColor: '#6366F1',
  },
  secondaryBg: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  disabledBg: {
    backgroundColor: '#E5E7EB',
    borderColor: '#E5E7EB',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#6366F1',
  },
});

export default CustomButton;
