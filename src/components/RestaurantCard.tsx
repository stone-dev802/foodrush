import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useThemeStore } from '../store/themeStore';
import { useFavoritesStore } from '../store/favoritesStore';
import { getThemeColors } from '../theme/colors';
import { getRestaurantImage } from '../theme/restaurantImages';

type RestaurantCardProps = {
  restaurant: {
    id: string | number;
    name: string;
    category?: string;
    cuisine?: string;
    rating?: number;
    distance?: string;
    deliveryTime?: string;
    emoji?: string;
  };
  onPress?: () => void;
};

export function RestaurantCard({ restaurant, onPress }: RestaurantCardProps) {
  const { mode } = useThemeStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const colors = getThemeColors(mode);
  const imageUri = getRestaurantImage(restaurant.category ?? restaurant.cuisine);
  const favorite = isFavorite(restaurant.id);

  return (
    <Pressable style={({ pressed }) => [styles.card, { backgroundColor: colors.surface }, pressed && styles.pressed]} onPress={onPress}>
      <View style={styles.visual}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <Pressable
          style={styles.favorite}
          onPress={(event) => {
            event.stopPropagation();
            toggleFavorite(restaurant.id);
          }}
        >
          <MaterialCommunityIcons
            name={favorite ? 'heart' : 'heart-outline'}
            size={17}
            color={favorite ? colors.primary : colors.text}
          />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
            {restaurant.name}
          </Text>
          <View style={[styles.badge, { backgroundColor: colors.primary }]}>
            <Text style={styles.badgeText}>Promo</Text>
          </View>
        </View>
        {!!(restaurant.category ?? restaurant.cuisine) && (
          <Text style={[styles.category, { color: colors.textMuted }]} numberOfLines={1}>
            {restaurant.category ?? restaurant.cuisine}
          </Text>
        )}

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="star" size={15} color="#F59E0B" />
            <Text style={[styles.metaText, { color: colors.textMuted }]}>{restaurant.rating ?? '4.7'}</Text>
          </View>
          <Text style={[styles.dot, { color: colors.textSoft }]}>•</Text>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="clock-outline" size={15} color="#64748B" />
            <Text style={[styles.metaText, { color: colors.textMuted }]}>{restaurant.deliveryTime ?? '25-35 min'}</Text>
          </View>
          {!!restaurant.distance && (
            <View style={styles.metaItem}>
              <MaterialCommunityIcons name="map-marker-outline" size={15} color="#64748B" />
              <Text style={[styles.metaText, { color: colors.textMuted }]}>{restaurant.distance}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

export default RestaurantCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
    padding: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }],
  },
  visual: {
    borderRadius: 18,
    height: 118,
    overflow: 'hidden',
    width: 142,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  favorite: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 999,
    height: 32,
    justifyContent: 'center',
    left: 10,
    position: 'absolute',
    top: 10,
    width: 32,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  name: {
    color: '#0F172A',
    flex: 1,
    fontSize: 18,
    fontWeight: '900',
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  category: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
  },
  dot: {
    fontSize: 12,
    fontWeight: '900',
  },
  metaItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  metaText: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '700',
  },
});
