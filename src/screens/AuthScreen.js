import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const AuthScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!isLogin && !name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi';
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email wajib diisi';
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Format email tidak valid';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password wajib diisi';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        setLoading(true);
        // Simulasi login menggunakan API DummyJSON
        // DummyJSON hanya menerima username, jadi kita paksa menggunakan akun 'emilys'
        const res = await fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: 'emilys', 
            password: 'emilyspass',
          }),
        });
        
        const data = await res.json();
        
        if (res.ok) {
          await AsyncStorage.setItem('userToken', data.accessToken || 'dummy_token');
          navigation.replace('MainApp');
        } else {
          setErrors({ ...errors, password: data.message || 'Login gagal' });
        }
      } catch (err) {
        alert('Gagal terhubung ke server');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>KampusMarket</Text>
          <Text style={styles.subtitle}>
            {isLogin ? 'Silakan masuk untuk melanjutkan' : 'Daftar untuk mulai berbelanja'}
          </Text>
        </View>

        <View style={styles.formContainer}>
          {!isLogin && (
            <CustomInput
              label="Nama Lengkap"
              placeholder="Masukkan nama Anda"
              value={name}
              onChangeText={setName}
              errorMessage={errors.name}
            />
          )}

          <CustomInput
            label="Email"
            placeholder="Masukkan email Anda"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            errorMessage={errors.email}
          />

          <CustomInput
            label="Password"
            placeholder="Masukkan password Anda"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            errorMessage={errors.password}
          />

          <CustomButton 
            title={isLogin ? 'Masuk' : 'Daftar'} 
            onPress={handleSubmit} 
          />

          <CustomButton 
            title={isLogin ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Masuk'} 
            type="secondary"
            onPress={() => {
              setIsLogin(!isLogin);
              setErrors({});
            }} 
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // Warna background yang lembut (nyaman di mata)
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  headerContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937', // Abu-abu gelap yang nyaman
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280', // Abu-abu lembut
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
});

export default AuthScreen;
