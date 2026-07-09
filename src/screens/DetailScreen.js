import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';

const DetailScreen = ({ route, navigation }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: product.image }} style={styles.image} />
        
        <View style={styles.infoContainer}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>Rp {product.price.toLocaleString('id-ID')}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.descTitle}>Deskripsi Produk</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <CustomButton 
          title="Tambah ke Keranjang" 
          onPress={() => alert('Produk ditambahkan ke keranjang')} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    backgroundColor: '#fff',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
  },
  category: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  name: {
    color: '#1F2937',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    color: '#6366F1',
    fontSize: 20,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  descTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 24,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
});

export default DetailScreen;
