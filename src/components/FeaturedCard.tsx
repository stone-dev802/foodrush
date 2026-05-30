import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useThemeStore } from '../store/themeStore';
import { getThemeColors } from '../theme/colors';
import { getFoodIcon } from '../theme/icons';

type FeaturedCardProps = {
  restaurant: {
    id: string;
    name: string;
    category?: string;
    cuisine?: string;
    rating?: number;
    deliveryTime?: string;
    emoji?: string;
  };
  onPress?: () => void;
};

export function FeaturedCard({ restaurant, onPress }: FeaturedCardProps) {
  const { mode } = useThemeStore();
  const colors = getThemeColors(mode);
  const iconName = getFoodIcon(restaurant.emoji ?? restaurant.name, restaurant.category ?? restaurant.cuisine);

  return (
    <Pressable style={({ pressed }) => [styles.card, { backgroundColor: colors.primary }, pressed && styles.pressed]} onPress={onPress}>
      <View style={styles.visual}>
        <MaterialCommunityIcons name={iconName as never} size={46} color="#FFFFFF" />
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {restaurant.name}
        </Text>
        {!!(restaurant.category ?? restaurant.cuisine) && (
          <Text style={styles.category} numberOfLines={1}>
            {restaurant.category ?? restaurant.cuisine}
          </Text>
        )}
        <View style={styles.metaRow}>
          <MaterialCommunityIcons name="star" size={15} color="#FBBF24" />
          <Text style={styles.metaText}>{restaurant.rating ?? '4.8'}</Text>
          <MaterialCommunityIcons name="clock-outline" size={15} color="#FED7AA" />
          <Text style={styles.metaText}>{restaurant.deliveryTime ?? '25-35 min'}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default FeaturedCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F97316',
    borderRadius: 22,
    flexDirection: 'row',
    gap: 14,
    minWidth: 280,
    padding: 16,
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 22,
    elevation: 4,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  visual: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 18,
    height: 92,
    justifyContent: 'center',
    width: 92,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  category: {
    color: '#FFEDD5',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 5,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    marginTop: 14,
  },
  metaText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    marginRight: 8,
  },
});
