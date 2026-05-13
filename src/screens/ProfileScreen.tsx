// src/screens/ProfileScreen.tsx

import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar,
} from 'react-native';
import { Colors, Spacing, Radius, FontSize } from '../theme/colors';

const MENU_ITEMS = [
  { emoji: '📦', label: 'Mes commandes', sub: '3 commandes passées' },
  { emoji: '📍', label: 'Mes adresses', sub: 'Bastos, Yaoundé' },
  { emoji: '💳', label: 'Modes de paiement', sub: 'MTN MoMo · Orange Money' },
  { emoji: '❤️', label: 'Favoris', sub: '2 restaurants' },
  { emoji: '🎁', label: 'Mes promotions', sub: 'RUSH237 actif' },
  { emoji: '🔔', label: 'Notifications', sub: 'Activées' },
  { emoji: '🔒', label: 'Sécurité & confidentialité', sub: '' },
  { emoji: '❓', label: 'Aide & Support', sub: '' },
  { emoji: '📝', label: 'Conditions d\'utilisation', sub: '' },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mon Profil 👤</Text>
        </View>

        {/* Avatar & info */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Pierre Kamga</Text>
            <Text style={styles.profileEmail}>pierre@decatechs.cm</Text>
            <View style={styles.profileBadge}>
              <Text style={styles.profileBadgeText}>⭐ Client Premium</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { value: '3', label: 'Commandes' },
            { value: '4.8', label: 'Note moy.' },
            { value: '2', label: 'Favoris' },
          ].map((s) => (
            <View key={s.label} style={styles.statBox}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Promo card */}
        <View style={styles.promoCard}>
          <Text style={styles.promoEmoji}>🎉</Text>
          <View style={styles.promoInfo}>
            <Text style={styles.promoTitle}>Code actif : RUSH237</Text>
            <Text style={styles.promoSub}>Livraison gratuite · 1ère commande</Text>
          </View>
          <TouchableOpacity style={styles.promoShare}>
            <Text style={styles.promoShareText}>Partager</Text>
          </TouchableOpacity>
        </View>

        {/* Menu items */}
        <View style={styles.menuSection}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity key={i} style={styles.menuItem}>
              <Text style={styles.menuItemEmoji}>{item.emoji}</Text>
              <View style={styles.menuItemInfo}>
                <Text style={styles.menuItemLabel}>{item.label}</Text>
                {item.sub ? (
                  <Text style={styles.menuItemSub}>{item.sub}</Text>
                ) : null}
              </View>
              <Text style={styles.menuItemArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>🚪 Se déconnecter</Text>
        </TouchableOpacity>

        <Text style={styles.version}>FoodRush v1.0.0 · Made in Cameroun 🇨🇲</Text>
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.dark },
  container: { flex: 1 },
  header: { paddingHorizontal: Spacing.md, paddingTop: Spacing.md, paddingBottom: Spacing.sm },
  headerTitle: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.text },

  profileCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    marginHorizontal: Spacing.md, marginBottom: Spacing.md,
    backgroundColor: Colors.card, borderRadius: Radius.lg, padding: Spacing.md,
    borderWidth: 1, borderColor: Colors.border,
  },
  avatar: {
    width: 64, height: 64, borderRadius: 32, backgroundColor: Colors.dark3,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: Colors.primary,
  },
  avatarEmoji: { fontSize: 32 },
  profileInfo: { flex: 1, gap: 4 },
  profileName: { fontSize: FontSize.lg, fontWeight: '800', color: Colors.text },
  profileEmail: { fontSize: FontSize.sm, color: Colors.textMuted },
  profileBadge: {
    backgroundColor: Colors.primaryBg, borderRadius: Radius.full,
    paddingHorizontal: 10, paddingVertical: 3, alignSelf: 'flex-start',
    borderWidth: 1, borderColor: Colors.borderActive,
  },
  profileBadgeText: { fontSize: FontSize.xs, color: Colors.primary, fontWeight: '700' },
  editBtn: {
    width: 36, height: 36, borderRadius: Radius.sm, backgroundColor: Colors.dark3,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.border,
  },
  editIcon: { fontSize: 16 },

  statsRow: {
    flexDirection: 'row', marginHorizontal: Spacing.md, marginBottom: Spacing.md,
    backgroundColor: Colors.card, borderRadius: Radius.md, overflow: 'hidden',
    borderWidth: 1, borderColor: Colors.border,
  },
  statBox: {
    flex: 1, alignItems: 'center', padding: Spacing.md,
    borderRightWidth: 1, borderRightColor: Colors.border,
  },
  statValue: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.primary },
  statLabel: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },

  promoCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    marginHorizontal: Spacing.md, marginBottom: Spacing.md,
    backgroundColor: 'rgba(255,75,43,0.08)', borderRadius: Radius.md,
    padding: Spacing.md, borderWidth: 1, borderColor: 'rgba(255,75,43,0.2)',
  },
  promoEmoji: { fontSize: 28 },
  promoInfo: { flex: 1 },
  promoTitle: { fontSize: FontSize.sm, fontWeight: '700', color: Colors.primary },
  promoSub: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  promoShare: {
    backgroundColor: Colors.primary, borderRadius: Radius.sm,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  promoShareText: { color: Colors.white, fontSize: FontSize.xs, fontWeight: '700' },

  menuSection: {
    marginHorizontal: Spacing.md, backgroundColor: Colors.card,
    borderRadius: Radius.md, overflow: 'hidden',
    borderWidth: 1, borderColor: Colors.border, marginBottom: Spacing.md,
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    padding: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  menuItemEmoji: { fontSize: 22, minWidth: 28, textAlign: 'center' },
  menuItemInfo: { flex: 1 },
  menuItemLabel: { fontSize: FontSize.base, fontWeight: '600', color: Colors.text },
  menuItemSub: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  menuItemArrow: { fontSize: 22, color: Colors.textMuted },

  logoutBtn: {
    marginHorizontal: Spacing.md, marginBottom: Spacing.md,
    backgroundColor: Colors.errorBg, borderRadius: Radius.md, padding: Spacing.md,
    alignItems: 'center', borderWidth: 1, borderColor: 'rgba(244,67,54,0.2)',
  },
  logoutText: { fontSize: FontSize.base, fontWeight: '700', color: Colors.error },
  version: {
    textAlign: 'center', fontSize: FontSize.xs, color: Colors.textMuted, marginBottom: Spacing.sm,
  },
});
