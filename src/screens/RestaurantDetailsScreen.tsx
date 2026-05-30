import React, { useMemo } from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MenuItemCard } from '../components/MenuItemCard';
import { useRestaurantDetails } from '../hooks/useRestaurantDetails';
import { useCartStore } from '../store/cartStore';
import { useFavoritesStore } from '../store/favoritesStore';
import { useThemeStore } from '../store/themeStore';
import { getThemeColors } from '../theme/colors';
import { getFoodIcon } from '../theme/icons';
import { getRestaurantImage } from '../theme/restaurantImages';

export function RestaurantDetailsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { addItem } = useCartStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { mode } = useThemeStore();
  const colors = getThemeColors(mode);
  const restaurantId = route.params?.restaurantId;
  const { restaurant, source } = useRestaurantDetails(restaurantId);
  const menu = useMemo(() => restaurant?.menu ?? [], [restaurant]);
  const heroImage = getRestaurantImage(restaurant?.category ?? restaurant?.cuisine);
  const favorite = restaurant ? isFavorite(restaurant.id) : false;

  if (!restaurant) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Ionicons name="restaurant-outline" size={42} color="#CBD5E1" />
        <Text style={styles.centerText}>Restaurant introuvable</Text>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ImageBackground source={{ uri: heroImage }} style={styles.hero} imageStyle={styles.heroImage}>
          <View style={styles.heroOverlay} />
          <View style={styles.heroTop}>
            <Pressable style={styles.heroButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
            </Pressable>
            <Pressable style={styles.heroButton} onPress={() => toggleFavorite(restaurant.id)}>
              <Ionicons name={favorite ? 'heart' : 'heart-outline'} size={22} color={favorite ? '#FF7A2B' : '#FFFFFF'} />
            </Pressable>
          </View>
          <View style={styles.heroIcon}>
            <MaterialCommunityIcons name={getFoodIcon(restaurant.emoji ?? restaurant.name, restaurant.category) as never} size={64} color="#FFFFFF" />
          </View>
        </ImageBackground>

        <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.name, { color: colors.text }]}>{restaurant.name}</Text>
          <Text style={[styles.category, { color: colors.textMuted }]}>{restaurant.category ?? restaurant.cuisine ?? 'Restaurant'}</Text>
          <Text style={[styles.sourceText, { color: colors.textSoft }]}>
            Source: {source === 'api' ? 'API backend' : 'donnees locales'}
          </Text>

          <View style={styles.stats}>
            <View style={styles.stat}>
              <MaterialCommunityIcons name="star" size={17} color="#F59E0B" />
              <Text style={styles.statText}>{restaurant.rating ?? '4.8'}</Text>
            </View>
            <View style={styles.stat}>
              <Ionicons name="time-outline" size={17} color="#64748B" />
              <Text style={styles.statText}>{restaurant.deliveryTime ?? '25-35 min'}</Text>
            </View>
            {!!restaurant.distance && (
              <View style={styles.stat}>
                <Ionicons name="location-outline" size={17} color="#64748B" />
                <Text style={styles.statText}>{restaurant.distance}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <MaterialCommunityIcons name="silverware-fork-knife" size={21} color="#F97316" />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Menu</Text>
          </View>
          <Text style={styles.sectionMeta}>{menu.length} plats</Text>
        </View>

        {menu.map((item: any) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onAdd={() =>
              addItem({
                id: item.id,
                name: item.name,
                price: item.price,
                emoji: item.emoji,
                category: item.category,
                restaurantId: restaurant.id,
              })
            }
          />
        ))}
      </ScrollView>

      <Pressable style={styles.cartFab} onPress={() => navigation.navigate('Main', { screen: 'Cart' })}>
        <Ionicons name="cart" size={21} color="#FFFFFF" />
        <Text style={styles.cartFabText}>Voir le panier</Text>
        <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

export default RestaurantDetailsScreen;

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F8FAFC', flex: 1 },
  content: { paddingBottom: 100 },
  center: { alignItems: 'center', backgroundColor: '#F8FAFC', flex: 1, justifyContent: 'center', padding: 24 },
  centerText: { color: '#64748B', fontSize: 16, fontWeight: '800', marginTop: 10 },
  hero: { backgroundColor: '#F97316', borderBottomLeftRadius: 28, borderBottomRightRadius: 28, minHeight: 270, overflow: 'hidden', padding: 20 },
  heroImage: { borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.42)' },
  heroTop: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  heroButton: { alignItems: 'center', backgroundColor: 'rgba(15,23,42,0.18)', borderRadius: 999, height: 44, justifyContent: 'center', width: 44 },
  heroIcon: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  infoCard: { backgroundColor: '#FFFFFF', borderRadius: 24, marginHorizontal: 20, marginTop: -36, padding: 18 },
  name: { color: '#0F172A', fontSize: 25, fontWeight: '900' },
  category: { color: '#64748B', fontSize: 14, fontWeight: '700', marginTop: 5 },
  sourceText: { fontSize: 11, fontWeight: '700', marginTop: 6 },
  stats: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 16 },
  stat: { alignItems: 'center', flexDirection: 'row', gap: 5 },
  statText: { color: '#475569', fontSize: 13, fontWeight: '800' },
  sectionHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, marginHorizontal: 20, marginTop: 24 },
  sectionTitleRow: { alignItems: 'center', flexDirection: 'row', gap: 7 },
  sectionTitle: { color: '#0F172A', fontSize: 20, fontWeight: '900' },
  sectionMeta: { color: '#94A3B8', fontSize: 13, fontWeight: '900' },
  cartFab: { alignItems: 'center', backgroundColor: '#0F172A', borderRadius: 18, bottom: 22, flexDirection: 'row', gap: 8, justifyContent: 'center', left: 20, padding: 16, position: 'absolute', right: 20 },
  cartFabText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
});
