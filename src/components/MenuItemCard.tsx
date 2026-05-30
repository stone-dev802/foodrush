import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useThemeStore } from '../store/themeStore';
import { getThemeColors } from '../theme/colors';
import { getFoodIcon } from '../theme/icons';

type MenuItemCardProps = {
  item: {
    id: string;
    name: string;
    description?: string;
    price: number;
    emoji?: string;
    category?: string;
    popular?: boolean;
  };
  onPress?: () => void;
  onAdd?: () => void;
  onAddToCart?: () => void;
};

export function MenuItemCard({ item, onPress, onAdd, onAddToCart }: MenuItemCardProps) {
  const { mode } = useThemeStore();
  const colors = getThemeColors(mode);
  const iconName = getFoodIcon(item.emoji ?? item.name, item.category);

  return (
    <Pressable style={({ pressed }) => [styles.card, { backgroundColor: colors.surface }, pressed && styles.pressed]} onPress={onPress}>
      <View style={[styles.foodVisual, { backgroundColor: colors.surfaceMuted }]}>
        <MaterialCommunityIcons name={iconName as never} size={34} color={colors.primary} />
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
            {item.name}
          </Text>
          {item.popular && (
            <View style={styles.badge}>
              <MaterialCommunityIcons name="fire" size={13} color="#EA580C" />
              <Text style={styles.badgeText}>Populaire</Text>
            </View>
          )}
        </View>

        {!!item.description && (
          <Text style={[styles.description, { color: colors.textMuted }]} numberOfLines={2}>
            {item.description}
          </Text>
        )}

        <View style={styles.footer}>
          <Text style={[styles.price, { color: colors.primary }]}>{item.price.toLocaleString('fr-FR')} FCFA</Text>
          <Pressable style={[styles.addButton, { backgroundColor: colors.primary }]} onPress={onAdd ?? onAddToCart}>
            <MaterialCommunityIcons name="plus" size={20} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

export default MenuItemCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
    padding: 14,
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
  foodVisual: {
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderRadius: 16,
    height: 76,
    justifyContent: 'center',
    width: 76,
  },
  content: {
    flex: 1,
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  name: {
    color: '#0F172A',
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
  },
  badge: {
    alignItems: 'center',
    backgroundColor: '#FFEDD5',
    borderRadius: 999,
    flexDirection: 'row',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#EA580C',
    fontSize: 11,
    fontWeight: '800',
  },
  description: {
    color: '#64748B',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 5,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  price: {
    color: '#F97316',
    fontSize: 15,
    fontWeight: '900',
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: '#F97316',
    borderRadius: 999,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
});
