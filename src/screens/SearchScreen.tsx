import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CategoryPill } from '../components/CategoryPill';
import { RestaurantCard } from '../components/RestaurantCard';
import * as mockData from '../data/mockData';
import { useRestaurants } from '../hooks/useRestaurants';
import { useThemeStore } from '../store/themeStore';
import { getThemeColors } from '../theme/colors';

const categories = ((mockData as any).categories ?? (mockData as any).CATEGORIES ?? []) as any[];
const POPULAR_SEARCHES = ['Burger', 'Pizza', 'Poulet', 'Riz', 'Cafe'];

export function SearchScreen() {
  const navigation = useNavigation<any>();
  const { mode } = useThemeStore();
  const { restaurants, source } = useRestaurants();
  const colors = getThemeColors(mode);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return restaurants.filter((restaurant) => {
      const matchesCategory =
        activeCategory === 'all' ||
        restaurant.categoryId === activeCategory ||
        restaurant.category === activeCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        restaurant.name?.toLowerCase().includes(normalizedQuery) ||
        restaurant.category?.toLowerCase().includes(normalizedQuery) ||
        restaurant.cuisine?.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <ScrollView style={[styles.screen, { backgroundColor: colors.background }]} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Ionicons name="search" size={23} color="#F97316" />
        </View>
        <View>
          <Text style={styles.eyebrow}>Recherche</Text>
          <Text style={[styles.title, { color: colors.text }]}>Trouver un plat</Text>
        </View>
      </View>

      <View style={[styles.searchBox, { backgroundColor: colors.surface }]}>
        <Ionicons name="search" size={20} color="#94A3B8" />
        <TextInput
          placeholder="Restaurant, plat ou categorie"
          placeholderTextColor="#94A3B8"
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
        />
        {!!query && (
          <Pressable onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={20} color="#CBD5E1" />
          </Pressable>
        )}
      </View>

      <View style={[styles.quickSection, { backgroundColor: colors.surface }]}>
        <View style={styles.quickTitleRow}>
          <MaterialCommunityIcons name="fire" size={18} color="#F97316" />
          <Text style={[styles.quickTitle, { color: colors.text }]}>Recherches populaires</Text>
        </View>
        <View style={styles.quickTags}>
          {POPULAR_SEARCHES.map((tag) => (
            <Pressable key={tag} style={styles.tag} onPress={() => setQuery(tag)}>
              <Text style={styles.tagText}>{tag}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => (
          <CategoryPill label={item.name} emoji={item.emoji} active={activeCategory === item.id} onPress={() => setActiveCategory(item.id)} />
        )}
      />

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Resultats</Text>
        <Text style={styles.sectionMeta}>{results.length} · {source === 'api' ? 'API' : 'local'}</Text>
      </View>

      {results.length === 0 ? (
        <View style={[styles.empty, { backgroundColor: colors.surface }]}>
          <Ionicons name="restaurant-outline" size={38} color="#CBD5E1" />
          <Text style={styles.emptyTitle}>Aucun resultat</Text>
          <Text style={styles.emptyText}>Essaie une autre recherche ou une autre categorie.</Text>
        </View>
      ) : (
        results.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} onPress={() => navigation.navigate('RestaurantDetails', { restaurantId: restaurant.id })} />
        ))
      )}
    </ScrollView>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F8FAFC', flex: 1 },
  content: { padding: 20, paddingBottom: 38 },
  header: { alignItems: 'center', flexDirection: 'row', gap: 12, marginBottom: 18, marginTop: 10 },
  headerIcon: { alignItems: 'center', backgroundColor: '#FFF7ED', borderRadius: 16, height: 48, justifyContent: 'center', width: 48 },
  eyebrow: { color: '#F97316', fontSize: 13, fontWeight: '900', textTransform: 'uppercase' },
  title: { color: '#0F172A', fontSize: 30, fontWeight: '900', marginTop: 4 },
  searchBox: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, flexDirection: 'row', gap: 10, paddingHorizontal: 14, paddingVertical: 12 },
  searchInput: { color: '#0F172A', flex: 1, fontSize: 15, fontWeight: '700' },
  quickSection: { backgroundColor: '#FFFFFF', borderRadius: 20, marginTop: 16, padding: 14 },
  quickTitleRow: { alignItems: 'center', flexDirection: 'row', gap: 7 },
  quickTitle: { color: '#0F172A', fontSize: 15, fontWeight: '900' },
  quickTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 9, marginTop: 12 },
  tag: { backgroundColor: '#FFF7ED', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  tagText: { color: '#F97316', fontSize: 13, fontWeight: '900' },
  categoryList: { gap: 10, paddingVertical: 18 },
  sectionHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { color: '#0F172A', fontSize: 20, fontWeight: '900' },
  sectionMeta: { color: '#94A3B8', fontSize: 13, fontWeight: '900' },
  empty: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24 },
  emptyTitle: { color: '#0F172A', fontSize: 18, fontWeight: '900', marginTop: 10 },
  emptyText: { color: '#64748B', fontSize: 13, fontWeight: '600', marginTop: 5, textAlign: 'center' },
});
