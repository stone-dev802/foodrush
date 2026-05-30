import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useThemeStore } from '../store/themeStore';
import { getThemeColors } from '../theme/colors';
import { getCategoryIcon } from '../theme/icons';

type CategoryPillProps = {
  label: string;
  emoji?: string;
  active?: boolean;
  onPress?: () => void;
};

export function CategoryPill({ label, emoji = '', active = false, onPress }: CategoryPillProps) {
  const { mode } = useThemeStore();
  const colors = getThemeColors(mode);
  const iconName = getCategoryIcon(emoji || label);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: active ? colors.surface : colors.surface, borderColor: active ? colors.primary : colors.border },
        active && styles.containerActive,
        pressed && styles.containerPressed,
      ]}
    >
      <View style={[styles.iconBadge, { backgroundColor: active ? colors.primary : colors.surfaceMuted }]}>
        <MaterialCommunityIcons
          name={iconName as never}
          size={28}
          color={active ? '#FFFFFF' : colors.primary}
        />
      </View>
      <Text style={[styles.label, { color: active ? colors.primary : colors.textMuted }]} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

export default CategoryPill;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#F1F5F9',
    borderRadius: 22,
    borderWidth: 1,
    gap: 9,
    height: 86,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    width: 74,
  },
  containerActive: {
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 2,
  },
  containerPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
  iconBadge: {
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderRadius: 18,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
});
