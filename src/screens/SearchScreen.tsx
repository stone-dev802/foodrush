// src/screens/SearchScreen.tsx

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, SafeAreaView, StatusBar,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { RESTAURANTS, CATEGORIES, Restaurant } from '../data/mockData';
import { Colors, Spacing, Radius, FontSize } from '../theme/colors';
import RestaurantCard from '../components/RestaurantCard';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Main'>;
};

const POPULAR_SEARCHES = ['Burger', 'Pizza', 'Poulet braisé', 'Sushi', 'Ndolé', 'Café'];

export default function SearchScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');

  const results = query.length > 1
    ? RESTAURANTS.filter(r =>
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.tags.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
        r.menu.some(m => m.name.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explorer 🔍</Text>
      </View>

      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Restaurant, plat, cuisine..."
          placeholderTextColor={Colors.textMuted}
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {query.length < 2 ? (
          <>
            <Text style={styles.sectionTitle}>Recherches populaires</Text>
            <View style={styles.tagsWrap}>
              {POPULAR_SEARCHES.map(s => (
                <TouchableOpacity key={s} style={styles.popularTag} onPress={() => setQuery(s)}>
                  <Text style={styles.popularTagText}>🔥 {s}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Catégories</Text>
            <View style={styles.categoriesGrid}>
              {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                <TouchableOpacity key={cat.id} style={styles.catCard} onPress={() => setQuery(cat.label)}>
                  <Text style={styles.catEmoji}>{cat.emoji}</Text>
                  <Text style={styles.catLabel}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>
              {results.length > 0
                ? `${results.length} résultat${results.length > 1 ? 's' : ''} pour "${query}"`
                : `Aucun résultat pour "${query}"`}
            </Text>
            {results.length === 0 ? (
              <View style={styles.noResult}>
                <Text style={styles.noResultEmoji}>😔</Text>
                <Text style={styles.noResultText}>Aucun restaurant ou plat trouvé</Text>
              </View>
            ) : (
              results.map((r, i) => (
                <RestaurantCard
                  key={r.id}
                  restaurant={r}
                  onPress={() => navigation.navigate('RestaurantDetails', { restaurant: r })}
                  delay={i * 50}
                />
              ))
            )}
          </>
        )}
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.dark },
  header: {
    paddingHorizontal: Spacing.md, paddingTop: Spacing.md, paddingBottom: Spacing.sm,
  },
  headerTitle: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.text },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.card, borderRadius: Radius.md, borderWidth: 1,
    borderColor: Colors.border, paddingHorizontal: Spacing.md,
    paddingVertical: 13, marginHorizontal: Spacing.md, marginBottom: Spacing.md,
  },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, color: Colors.text, fontSize: FontSize.base },
  clearIcon: { color: Colors.textMuted, fontSize: 16, padding: 4 },
  body: { flex: 1, paddingHorizontal: Spacing.md },
  sectionTitle: {
    fontSize: FontSize.md, fontWeight: '700', color: Colors.text,
    marginBottom: Spacing.sm, marginTop: Spacing.sm,
  },
  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.md },
  popularTag: {
    backgroundColor: Colors.card, borderRadius: Radius.full, paddingHorizontal: 14,
    paddingVertical: 8, borderWidth: 1, borderColor: Colors.border,
  },
  popularTagText: { fontSize: FontSize.sm, color: Colors.text, fontWeight: '500' },
  categoriesGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.md,
  },
  catCard: {
    width: '30%', backgroundColor: Colors.card, borderRadius: Radius.md,
    padding: Spacing.md, alignItems: 'center', gap: Spacing.xs,
    borderWidth: 1, borderColor: Colors.border,
  },
  catEmoji: { fontSize: 32 },
  catLabel: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.text },
  noResult: { alignItems: 'center', paddingVertical: Spacing.xxl, gap: Spacing.md },
  noResultEmoji: { fontSize: 56 },
  noResultText: { fontSize: FontSize.base, color: Colors.textMuted },
});
