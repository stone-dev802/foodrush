// src/components/RestaurantCard.tsx

import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated,
} from 'react-native';
import { Restaurant } from '../data/mockData';
import { Colors, Spacing, Radius, FontSize } from '../theme/colors';

type Props = {
  restaurant: Restaurant;
  onPress: () => void;
  delay?: number;
};

export default function RestaurantCard({ restaurant, onPress, delay = 0 }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, delay, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
        {/* Image placeholder */}
        <View style={styles.imageArea}>
          <Text style={styles.emoji}>{restaurant.emoji}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{restaurant.badge}</Text>
          </View>
          {restaurant.isOpen && (
            <View style={styles.openBadge}>
              <View style={styles.openDot} />
              <Text style={styles.openText}>Ouvert</Text>
            </View>
          )}
        </View>

        {/* Info */}
        <View style={styles.info}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <View style={styles.ratingChip}>
              <Text style={styles.ratingStar}>⭐</Text>
              <Text style={styles.ratingValue}>{restaurant.rating}</Text>
            </View>
          </View>

          <View style={styles.tagsRow}>
            {restaurant.tags.slice(0, 3).map((t) => (
              <View key={t} style={styles.tag}>
                <Text style={styles.tagText}>{t}</Text>
              </View>
            ))}
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.meta}>⏱️ {restaurant.deliveryTime}</Text>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.meta}>📍 {restaurant.distance}</Text>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.meta}>
              Livr. {restaurant.deliveryFee.toLocaleString()} F
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  imageArea: {
    height: 160,
    backgroundColor: '#1a0a05',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  emoji: { fontSize: 64 },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  badgeText: { color: Colors.white, fontSize: FontSize.xs, fontWeight: '700' },
  openBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.greenBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: 'rgba(76,175,80,0.3)',
  },
  openDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.green },
  openText: { fontSize: FontSize.xs, color: Colors.green, fontWeight: '600' },
  info: { padding: Spacing.md, gap: Spacing.xs },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: FontSize.md, fontWeight: '800', color: Colors.text, flex: 1 },
  ratingChip: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: Colors.dark3, paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: Radius.full,
  },
  ratingStar: { fontSize: 11 },
  ratingValue: { fontSize: FontSize.xs, fontWeight: '700', color: Colors.gold },
  tagsRow: { flexDirection: 'row', gap: Spacing.xs, flexWrap: 'wrap' },
  tag: {
    backgroundColor: Colors.dark3, paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: Radius.full, borderWidth: 1, borderColor: Colors.border,
  },
  tagText: { fontSize: FontSize.xs, color: Colors.textMuted },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  meta: { fontSize: FontSize.xs, color: Colors.textMuted },
  metaDot: { color: Colors.border, fontSize: FontSize.xs },
});
