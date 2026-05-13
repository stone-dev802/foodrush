// src/screens/RestaurantDetailsScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { MenuItem } from '../data/mockData';
import { useCartStore } from '../store/cartStore';
import { Colors, Spacing, Radius, FontSize } from '../theme/colors';
import MenuItemCard from '../components/MenuItemCard';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'RestaurantDetails'>;
  route: RouteProp<RootStackParamList, 'RestaurantDetails'>;
};

export default function RestaurantDetailsScreen({ navigation, route }: Props) {
  const { restaurant } = route.params;
  const { addToCart, getItemQty, getCount } = useCartStore();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const cartCount = getCount();

  // Group menu items by category
  const menuByCategory = restaurant.menu.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const categories = Object.keys(menuByCategory);

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item, restaurant.id, restaurant.name);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark} />

      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>{restaurant.emoji}</Text>

        {/* Back button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        {/* Favorite button */}
        <TouchableOpacity style={styles.favoriteBtn}>
          <Text style={styles.favoriteIcon}>♡</Text>
        </TouchableOpacity>

        {/* Badge */}
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>{restaurant.badge}</Text>
        </View>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Info */}
        <View style={styles.infoSection}>
          <Text style={styles.categoryLabel}>{restaurant.category.toUpperCase()}</Text>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tagsScroll}
          >
            {restaurant.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Stats row */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={[styles.statValue, { color: Colors.gold }]}>
                ⭐ {restaurant.rating}
              </Text>
              <Text style={styles.statLabel}>Note</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={[styles.statValue, { color: Colors.primary }]}>
                {restaurant.deliveryTime}
              </Text>
              <Text style={styles.statLabel}>Livraison</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={[styles.statValue, { color: Colors.green }]}>
                {restaurant.distance}
              </Text>
              <Text style={styles.statLabel}>Distance</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={[styles.statValue, { color: Colors.text }]}>
                {restaurant.deliveryFee.toLocaleString()}F
              </Text>
              <Text style={styles.statLabel}>Frais livr.</Text>
            </View>
          </View>

          {/* Open status */}
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: Colors.green }]} />
            <Text style={styles.statusText}>Ouvert maintenant</Text>
            <Text style={styles.minOrder}>
              · Min : {restaurant.minOrder.toLocaleString()} FCFA
            </Text>
          </View>
        </View>

        {/* Category tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.menuTabs}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.menuTab,
                activeSection === cat && styles.menuTabActive,
              ]}
              onPress={() => setActiveSection(activeSection === cat ? null : cat)}
            >
              <Text
                style={[
                  styles.menuTabText,
                  activeSection === cat && styles.menuTabTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Menu items */}
        <View style={styles.menuContainer}>
          {categories.map((cat) => {
            if (activeSection && activeSection !== cat) return null;
            return (
              <View key={cat}>
                <Text style={styles.menuCategoryTitle}>🍽️ {cat}</Text>
                {menuByCategory[cat].map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    qty={getItemQty(item.id)}
                    onAdd={() => handleAddToCart(item)}
                    onIncrease={() => handleAddToCart(item)}
                  />
                ))}
              </View>
            );
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Cart FAB */}
      {cartCount > 0 && (
        <View style={styles.cartFab}>
          <TouchableOpacity
            style={styles.cartFabBtn}
            onPress={() => navigation.navigate('Main')}
          >
            <Text style={styles.cartFabBadge}>{cartCount}</Text>
            <Text style={styles.cartFabText}>Voir mon panier</Text>
            <Text style={styles.cartFabArrow}>→</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  hero: {
    height: 220,
    backgroundColor: '#1a0a05',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heroEmoji: {
    fontSize: 80,
  },
  backBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: Radius.sm,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  backIcon: { color: Colors.text, fontSize: 20 },
  favoriteBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: Radius.sm,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  favoriteIcon: { color: Colors.text, fontSize: 20 },
  heroBadge: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  heroBadgeText: { color: Colors.white, fontSize: FontSize.xs, fontWeight: '700' },

  body: { flex: 1 },

  infoSection: {
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  categoryLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  tagsScroll: { marginBottom: Spacing.md },
  tag: {
    backgroundColor: Colors.dark3,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radius.full,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tagText: { fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '500' },

  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stat: { flex: 1, alignItems: 'center', gap: 4 },
  statValue: { fontSize: FontSize.base, fontWeight: '700' },
  statLabel: { fontSize: FontSize.xs, color: Colors.textMuted },
  statDivider: { width: 1, height: 32, backgroundColor: Colors.border },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: FontSize.sm, color: Colors.green, fontWeight: '600' },
  minOrder: { fontSize: FontSize.sm, color: Colors.textMuted },

  menuTabs: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
    flexDirection: 'row',
  },
  menuTab: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: Radius.full,
    backgroundColor: Colors.dark3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  menuTabActive: {
    backgroundColor: Colors.primaryBg,
    borderColor: Colors.primary,
  },
  menuTabText: { fontSize: FontSize.sm, color: Colors.textMuted, fontWeight: '600' },
  menuTabTextActive: { color: Colors.primary },

  menuContainer: { padding: Spacing.md },
  menuCategoryTitle: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },

  cartFab: {
    position: 'absolute',
    bottom: 20,
    left: Spacing.md,
    right: Spacing.md,
  },
  cartFabBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  cartFabBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    color: Colors.white,
    width: 28,
    height: 28,
    borderRadius: 14,
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '800',
    fontSize: FontSize.sm,
  },
  cartFabText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: '700',
  },
  cartFabArrow: { color: Colors.white, fontSize: 20 },
});
