import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import ProductCard from '../components/ProductCard';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['Semua']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // State for API
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('https://dummyjson.com/products?limit=150');
        if (!response.ok) {
          throw new Error('Gagal mengambil data dari server');
        }
        const data = await response.json();
        
        // Filter out cosmetic, fragrances, groceries to match "KampusMarket" theme
        const allowedCategories = [
          'laptops', 'smartphones', 'tablets', 'mobile-accessories', 
          'mens-shirts', 'womens-bags', 'sports-accessories', 
          'mens-shoes', 'womens-shoes', 'mens-watches', 'womens-watches'
        ];
        const campusProducts = data.products.filter(item => allowedCategories.includes(item.category));
        
        setProducts(campusProducts);
        
        // Extract unique categories from filtered products
        const uniqueCategories = ['Semua', ...new Set(campusProducts.map(item => item.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message || 'Terjadi kesalahan');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;
    if (selectedCategory !== 'Semua') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (searchQuery.trim() !== '') {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, products]);

  const handleProductPress = (product) => {
    navigation.navigate('Detail', { product });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari produk..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.categoryChipSelected
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextSelected
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#EC4899" />
          <Text style={styles.statusText}>Sedang memuat data...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Gagal: {error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => {
            setIsLoading(true);
            setError(null);
            fetch('https://dummyjson.com/products?limit=150')
              .then(res => res.json())
              .then(data => {
                const allowedCategories = [
                  'laptops', 'smartphones', 'tablets', 'mobile-accessories', 
                  'mens-shirts', 'womens-bags', 'sports-accessories', 
                  'mens-shoes', 'womens-shoes', 'mens-watches', 'womens-watches'
                ];
                const campusProducts = data.products.filter(item => allowedCategories.includes(item.category));
                setProducts(campusProducts);
                setCategories(['Semua', ...new Set(campusProducts.map(item => item.category))]);
                setIsLoading(false);
              })
              .catch(err => {
                setError(err.message);
                setIsLoading(false);
              });
          }}>
            <Text style={styles.retryText}>Coba Lagi</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductCard product={item} onPress={handleProductPress} />}
          numColumns={2}
          contentContainerStyle={styles.productList}
          ListEmptyComponent={
            <View style={styles.centerContainer}>
              <Text style={styles.emptyText}>Produk tidak ditemukan</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  categoryContainer: {
    backgroundColor: '#fff',
    paddingBottom: 12,
  },
  categoryScroll: {
    paddingHorizontal: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  categoryChipSelected: {
    backgroundColor: '#EC4899', // Pink
  },
  categoryText: {
    color: '#4B5563',
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: '#fff',
  },
  productList: {
    padding: 8,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  emptyText: {
    color: '#6B7280',
    fontSize: 16,
  },
  statusText: {
    marginTop: 10,
    color: '#EC4899', // Pink
    fontSize: 16,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 16,
    marginBottom: 10,
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#EC4899', // Pink
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default HomeScreen;
