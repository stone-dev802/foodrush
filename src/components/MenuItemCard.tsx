// src/components/MenuItemCard.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MenuItem } from '../data/mockData';
import { Colors, Spacing, Radius, FontSize } from '../theme/colors';

type Props = {
  item: MenuItem;
  qty: number;
  onAdd: () => void;
  onIncrease: () => void;
};

export default function MenuItemCard({ item, qty, onAdd, onIncrease }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>{item.emoji}</Text>

      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{item.name}</Text>
          {item.popular && (
            <View style={styles.popularBadge}>
              <Text style={styles.popularText}>🔥 Populaire</Text>
            </View>
          )}
        </View>
        <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.price}>{item.price.toLocaleString()} FCFA</Text>
      </View>

      <View style={styles.right}>
        {qty === 0 ? (
          <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
            <Text style={styles.addBtnText}>+</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtyBadge}>
            <Text style={styles.qtyText}>{qty}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  emoji: { fontSize: 38, minWidth: 44, textAlign: 'center' },
  info: { flex: 1, gap: 3 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, flexWrap: 'wrap' },
  name: { fontSize: FontSize.base, fontWeight: '700', color: Colors.text },
  popularBadge: {
    backgroundColor: 'rgba(255,75,43,0.12)',
    borderRadius: Radius.full,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: Colors.borderActive,
  },
  popularText: { fontSize: 9, color: Colors.primary, fontWeight: '700' },
  desc: { fontSize: FontSize.xs, color: Colors.textMuted, lineHeight: 16 },
  price: { fontSize: FontSize.sm, fontWeight: '700', color: Colors.primary, marginTop: 2 },
  right: { alignItems: 'center', justifyContent: 'center' },
  addBtn: {
    width: 34,
    height: 34,
    borderRadius: Radius.sm,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addBtnText: { color: Colors.white, fontSize: 22, fontWeight: '700', lineHeight: 26 },
  qtyBadge: {
    width: 34,
    height: 34,
    borderRadius: Radius.sm,
    backgroundColor: Colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.borderActive,
  },
  qtyText: { color: Colors.primary, fontSize: FontSize.base, fontWeight: '800' },
});
