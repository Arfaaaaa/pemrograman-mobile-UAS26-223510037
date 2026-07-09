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
        <ActivityIndicator color={type === 'primary' ? '#fff' : '#EC4899'} />
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
    backgroundColor: '#EC4899', // Pink
  },
  secondaryBg: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#EC4899', // Pink
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
    color: '#EC4899', // Pink
  },
});

export default CustomButton;
