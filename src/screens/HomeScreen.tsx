// src/screens/HomeScreen.tsx

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { RESTAURANTS, CATEGORIES, Restaurant } from '../data/mockData';
import { Colors, Spacing, Radius, FontSize } from '../theme/colors';
import RestaurantCard from '../components/RestaurantCard';
import CategoryPill from '../components/CategoryPill';
import FeaturedCard from '../components/FeaturedCard';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Main'>;
};

export default function HomeScreen({ navigation }: Props) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredRestaurants = RESTAURANTS.filter((r) => {
    const matchCat = activeCategory === 'all' || r.category === activeCategory;
    const matchSearch =
      search === '' ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const featuredRestos = RESTAURANTS.slice(0, 3);

  const handleRestaurantPress = useCallback(
    (restaurant: Restaurant) => {
      navigation.navigate('RestaurantDetails', { restaurant });
    },
    [navigation]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark} />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.locationRow}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationLabel}>Livraison à </Text>
            <Text style={styles.locationCity}>Yaoundé, CM ▾</Text>
          </View>
          <View style={styles.headerBottom}>
            <View>
              <Text style={styles.greeting}>
                Bonjour, <Text style={styles.greetingName}>Pierre 👋</Text>
              </Text>
              <Text style={styles.subGreeting}>Qu'est-ce qui vous fait envie ?</Text>
            </View>
            <TouchableOpacity style={styles.avatarBtn}>
              <Text style={styles.avatarEmoji}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search (sticky) */}
        <View style={styles.searchWrapper}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Restaurant, plat, cuisine..."
              placeholderTextColor={Colors.textMuted}
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Text style={styles.clearIcon}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Promo banner */}
        <View style={styles.promoBanner}>
          <Text style={styles.promoEmoji}>🎉</Text>
          <View style={styles.promoText}>
            <Text style={styles.promoTitle}>Livraison GRATUITE</Text>
            <Text style={styles.promoSub}>Sur votre 1ère commande · Code : RUSH237</Text>
          </View>
          <TouchableOpacity style={styles.promoBtn}>
            <Text style={styles.promoBtnText}>Profiter</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat.id}
              label={cat.label}
              emoji={cat.emoji}
              active={activeCategory === cat.id}
              onPress={() => setActiveCategory(cat.id)}
            />
          ))}
        </ScrollView>

        {/* Featured (only when 'all') */}
        {activeCategory === 'all' && search === '' && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🔥 Populaires</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>Voir tout</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredContainer}
            >
              {featuredRestos.map((r) => (
                <FeaturedCard
                  key={r.id}
                  restaurant={r}
                  onPress={() => handleRestaurantPress(r)}
                />
              ))}
            </ScrollView>
          </>
        )}

        {/* All Restaurants */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {activeCategory === 'all' ? 'Tous les restaurants' : 'Résultats'}
          </Text>
          <Text style={styles.resultCount}>{filteredRestaurants.length} trouvés</Text>
        </View>

        {filteredRestaurants.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>😔</Text>
            <Text style={styles.emptyText}>Aucun résultat pour "{search}"</Text>
            <TouchableOpacity onPress={() => { setSearch(''); setActiveCategory('all'); }}>
              <Text style={styles.emptyReset}>Réinitialiser la recherche</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredRestaurants.map((r, i) => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              onPress={() => handleRestaurantPress(r)}
              delay={i * 60}
            />
          ))
        )}

        <View style={{ height: Spacing.xxl + 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  locationIcon: { fontSize: 13, marginRight: 4 },
  locationLabel: { fontSize: FontSize.sm, color: Colors.textMuted },
  locationCity: { fontSize: FontSize.sm, color: Colors.text, fontWeight: '700' },
  headerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: Colors.text,
  },
  greetingName: { color: Colors.primary },
  subGreeting: { fontSize: FontSize.sm, color: Colors.textMuted, marginTop: 2 },
  avatarBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  avatarEmoji: { fontSize: 22 },

  searchWrapper: {
    backgroundColor: Colors.dark,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    gap: Spacing.sm,
  },
  searchIcon: { fontSize: 16 },
  searchInput: {
    flex: 1,
    color: Colors.text,
    fontSize: FontSize.base,
  },
  clearIcon: { color: Colors.textMuted, fontSize: 16, padding: 4 },

  promoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    backgroundColor: 'rgba(255,75,43,0.08)',
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,75,43,0.2)',
    gap: Spacing.sm,
  },
  promoEmoji: { fontSize: 28 },
  promoText: { flex: 1 },
  promoTitle: { fontSize: FontSize.sm, fontWeight: '700', color: Colors.primary },
  promoSub: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  promoBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.sm,
  },
  promoBtnText: { color: Colors.white, fontSize: FontSize.xs, fontWeight: '700' },

  categoriesContainer: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
    flexDirection: 'row',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '800',
    color: Colors.text,
  },
  seeAll: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  resultCount: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },

  featuredContainer: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
    flexDirection: 'row',
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    gap: Spacing.md,
  },
  emptyEmoji: { fontSize: 56 },
  emptyText: { fontSize: FontSize.base, color: Colors.textMuted },
  emptyReset: { fontSize: FontSize.base, color: Colors.primary, fontWeight: '600' },
});
