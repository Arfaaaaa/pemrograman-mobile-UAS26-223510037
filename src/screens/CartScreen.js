import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import { CartContext } from '../context/CartContext';
import CustomButton from '../components/CustomButton';

const CartScreen = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * 16000 * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (Platform.OS === 'web') {
      alert('Checkout berhasil! Terima kasih telah berbelanja.');
    } else {
      Alert.alert('Sukses', 'Checkout berhasil! Terima kasih telah berbelanja.');
    }
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Keranjang Belanja</Text>
        <Text style={styles.subtitle}>Keranjang Anda masih kosong.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.title}</Text>
              <Text style={styles.itemPrice}>Rp {(item.price * 16000).toLocaleString('id-ID')}</Text>
              <Text style={styles.itemQuantity}>Jumlah: {item.quantity}</Text>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
              <Text style={styles.removeText}>Hapus</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.bottomBar}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalPrice}>Rp {calculateTotal().toLocaleString('id-ID')}</Text>
        </View>
        <CustomButton title="Checkout" onPress={handleCheckout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6B7280',
    fontSize: 16,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#EC4899',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#f3f4f6',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#EC4899',
    fontWeight: '500',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 12,
    color: '#6B7280',
  },
  removeButton: {
    padding: 8,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
  },
  removeText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: 'bold',
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
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    color: '#4B5563',
    fontWeight: '500',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EC4899',
  },
});

export default CartScreen;
