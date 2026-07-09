import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';

const ProfileScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Kembali ke AuthStack (Login)
    navigation.replace('Auth');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>U</Text>
        </View>
        <Text style={styles.name}>User Terdaftar</Text>
        <Text style={styles.email}>user@example.com</Text>
      </View>

      <View style={styles.menuContainer}>
        <CustomButton title="Keluar (Logout)" onPress={handleLogout} type="secondary" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  profileHeader: {
    backgroundColor: '#fff',
    padding: 32,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#6B7280',
  },
  menuContainer: {
    padding: 24,
    marginTop: 20,
  }
});

export default ProfileScreen;
