import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { products, categories } from '../data/mockData';
import ProductCard from '../components/ProductCard';

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let result = products;
    if (selectedCategory !== 'Semua') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (searchQuery.trim() !== '') {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredProducts(result);
  }, [searchQuery, selectedCategory]);

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

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} onPress={handleProductPress} />}
        numColumns={2}
        contentContainerStyle={styles.productList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Produk tidak ditemukan</Text>
          </View>
        }
      />
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
    backgroundColor: '#6366F1',
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  emptyText: {
    color: '#6B7280',
    fontSize: 16,
  },
});

export default HomeScreen;
