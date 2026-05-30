import React, { useMemo, useState } from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { CategoryPill } from '../components/CategoryPill';
import { RestaurantCard } from '../components/RestaurantCard';
import * as mockData from '../data/mockData';
import { useRestaurants } from '../hooks/useRestaurants';
import { useThemeStore } from '../store/themeStore';
import { getThemeColors } from '../theme/colors';

const categories = ((mockData as any).categories ?? (mockData as any).CATEGORIES ?? []) as any[];

export function HomeScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { mode } = useThemeStore();
  const { restaurants, loading, source } = useRestaurants();
  const colors = getThemeColors(mode);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchesCategory =
        activeCategory === 'all' ||
        restaurant.categoryId === activeCategory ||
        restaurant.category === activeCategory;
      const matchesQuery = restaurant.name?.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query, restaurants]);

  const openRestaurant = (restaurantId: string) => {
    navigation.navigate('RestaurantDetails', { restaurantId });
  };

  return (
    <ScrollView style={[styles.screen, { backgroundColor: colors.background }]} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <View style={styles.locationRow}>
            <View style={[styles.locationIcon, { backgroundColor: colors.surfaceMuted }]}>
              <Ionicons name="location-outline" size={15} color={colors.primary} />
            </View>
            <Text style={[styles.location, { color: colors.text }]}>{t('home.location')}</Text>
            <Ionicons name="chevron-down" size={14} color={colors.textMuted} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>{t('home.greeting')}</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>{t('home.subtitle')}</Text>
        </View>
        <Pressable style={styles.avatar} onPress={() => navigation.navigate('Profile')}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80' }}
            style={styles.avatarImage}
          />
        </Pressable>
      </View>

      <View style={styles.searchRow}>
        <View style={[styles.searchBox, { backgroundColor: colors.surface }]}>
          <Ionicons name="search" size={21} color={colors.textSoft} />
          <TextInput
            placeholder={t('home.searchPlaceholder')}
            placeholderTextColor={colors.textSoft}
            style={[styles.searchInput, { color: colors.text }]}
            value={query}
            onChangeText={setQuery}
          />
          {!!query && (
            <Pressable onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.textSoft} />
            </Pressable>
          )}
        </View>
        <Pressable style={[styles.filterButton, { backgroundColor: colors.surface }]}>
          <Ionicons name="options-outline" size={24} color={colors.text} />
        </Pressable>
      </View>

      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85' }}
        style={styles.promo}
        imageStyle={styles.promoImage}
      >
        <View style={styles.promoOverlay} />
        <View style={styles.discountBubble}>
          <Text style={styles.discountText}>-30%</Text>
        </View>
        <View style={styles.promoContent}>
          <View style={styles.specialBadge}>
            <MaterialCommunityIcons name="fire" size={13} color="#FFB36A" />
            <Text style={styles.specialText}>{t('home.specialOffer')}</Text>
          </View>
          <Text style={styles.promoTitle}>{t('home.promoTitle')}</Text>
          <Text style={styles.promoText}>{t('home.promoValidity')}</Text>
          <Pressable style={styles.promoButton}>
            <Text style={styles.promoButtonText}>{t('home.orderNow')}</Text>
            <View style={styles.promoArrow}>
              <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
            </View>
          </Pressable>
        </View>
      </ImageBackground>

      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => (
          <CategoryPill
            label={item.label ?? item.name}
            emoji={item.emoji}
            active={activeCategory === item.id}
            onPress={() => setActiveCategory(item.id)}
          />
        )}
      />

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('home.popularRestaurants')}</Text>
        <Pressable style={styles.seeAll} onPress={() => navigation.navigate('Search')}>
          <Text style={[styles.seeAllText, { color: colors.primary }]}>
            {loading ? t('common.loading') : t('common.seeAll')}
          </Text>
          <Ionicons name="chevron-forward" size={14} color={colors.primary} />
        </Pressable>
      </View>
      <Text style={[styles.sourceText, { color: colors.textSoft }]}>
        {t('common.source')}: {source === 'api' ? t('common.apiBackend') : t('common.localData')}
      </Text>

      {filteredRestaurants.length === 0 ? (
        <View style={[styles.empty, { backgroundColor: colors.surface }]}>
          <Ionicons name="restaurant-outline" size={36} color="#CBD5E1" />
          <Text style={[styles.emptyText, { color: colors.textMuted }]}>{t('home.emptyRestaurants')}</Text>
        </View>
      ) : (
        filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} onPress={() => openRestaurant(String(restaurant.id))} />
        ))
      )}
    </ScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F8FAFC', flex: 1 },
  content: { padding: 24, paddingBottom: 38 },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 26, marginTop: 10 },
  locationRow: { alignItems: 'center', flexDirection: 'row', gap: 5 },
  locationIcon: { alignItems: 'center', borderRadius: 999, height: 24, justifyContent: 'center', width: 24 },
  location: { color: '#171717', fontSize: 13, fontWeight: '900' },
  title: { color: '#0F172A', fontSize: 31, fontWeight: '900', letterSpacing: 0, marginTop: 22 },
  subtitle: { color: '#64748B', fontSize: 14, fontWeight: '600', marginTop: 6 },
  avatar: { borderRadius: 999, height: 48, overflow: 'hidden', width: 48 },
  avatarImage: { height: '100%', width: '100%' },
  searchRow: { alignItems: 'center', flexDirection: 'row', gap: 14, marginBottom: 24 },
  searchBox: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 3,
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    height: 62,
    paddingHorizontal: 18,
    shadowColor: '#1F160F',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.06,
    shadowRadius: 28,
  },
  filterButton: {
    alignItems: 'center',
    borderRadius: 20,
    elevation: 3,
    height: 62,
    justifyContent: 'center',
    shadowColor: '#1F160F',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.06,
    shadowRadius: 28,
    width: 62,
  },
  searchInput: { color: '#0F172A', flex: 1, fontSize: 14, fontWeight: '600' },
  promo: { borderRadius: 24, height: 182, justifyContent: 'center', marginBottom: 24, overflow: 'hidden' },
  promoImage: { borderRadius: 24 },
  promoOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.58)' },
  promoContent: { maxWidth: '62%', paddingLeft: 22 },
  discountBubble: {
    alignItems: 'center',
    backgroundColor: '#F36B21',
    borderRadius: 999,
    height: 58,
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    top: 16,
    width: 58,
  },
  discountText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  specialBadge: { alignItems: 'center', alignSelf: 'flex-start', backgroundColor: 'rgba(243,107,33,0.18)', borderRadius: 999, flexDirection: 'row', gap: 5, marginBottom: 12, paddingHorizontal: 9, paddingVertical: 6 },
  specialText: { color: '#FFB36A', fontSize: 11, fontWeight: '900' },
  promoTitle: { color: '#FFFFFF', fontSize: 21, fontWeight: '900', lineHeight: 27 },
  promoText: { color: '#F4E8DD', fontSize: 12, fontWeight: '600', marginTop: 8 },
  promoButton: { alignItems: 'center', alignSelf: 'flex-start', backgroundColor: '#FFFFFF', borderRadius: 999, flexDirection: 'row', gap: 10, marginTop: 18, paddingHorizontal: 14, paddingVertical: 10 },
  promoButtonText: { color: '#171717', fontSize: 11, fontWeight: '900' },
  promoArrow: { alignItems: 'center', backgroundColor: '#F36B21', borderRadius: 999, height: 22, justifyContent: 'center', width: 22 },
  categoryList: { gap: 12, paddingBottom: 24 },
  sectionHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14, marginTop: 2 },
  sectionTitle: { color: '#0F172A', fontSize: 18, fontWeight: '900' },
  seeAll: { alignItems: 'center', flexDirection: 'row', gap: 2 },
  seeAllText: { fontSize: 12, fontWeight: '900' },
  sourceText: { fontSize: 11, fontWeight: '700', marginBottom: 10, marginTop: -6 },
  empty: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, padding: 24 },
  emptyText: { color: '#64748B', fontSize: 15, fontWeight: '800', marginTop: 8 },
});
