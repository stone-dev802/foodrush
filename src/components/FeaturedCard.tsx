// src/components/FeaturedCard.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Restaurant } from '../data/mockData';
import { Colors, Spacing, Radius, FontSize } from '../theme/colors';

type Props = {
  restaurant: Restaurant;
  onPress: () => void;
};

export default function FeaturedCard({ restaurant, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.imageArea}>
        <Text style={styles.emoji}>{restaurant.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{restaurant.name}</Text>
        <View style={styles.meta}>
          <Text style={styles.rating}>⭐ {restaurant.rating}</Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.time}>{restaurant.deliveryTime}</Text>
        </View>
        <View style={styles.feeChip}>
          <Text style={styles.feeText}>Livr. {restaurant.deliveryFee.toLocaleString()} F</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180,
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  imageArea: {
    height: 110,
    backgroundColor: '#1a0a05',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 48 },
  info: { padding: Spacing.sm, gap: 4 },
  name: { fontSize: FontSize.sm, fontWeight: '700', color: Colors.text },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rating: { fontSize: FontSize.xs, color: Colors.gold },
  dot: { color: Colors.border, fontSize: FontSize.xs },
  time: { fontSize: FontSize.xs, color: Colors.textMuted },
  feeChip: {
    backgroundColor: Colors.dark3,
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  feeText: { fontSize: FontSize.xs, color: Colors.textMuted },
});
