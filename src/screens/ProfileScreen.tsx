import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useFavoritesStore } from '../store/favoritesStore';
import { useThemeStore } from '../store/themeStore';
import { getThemeColors } from '../theme/colors';

const MENU_ITEMS = [
  { key: 'orders', label: 'menu.orders', sub: 'menu.ordersSub', icon: 'receipt-text-outline' },
  { key: 'addresses', label: 'menu.addresses', sub: 'menu.addressesSub', icon: 'map-marker-outline' },
  { key: 'payment', label: 'menu.payment', sub: 'menu.paymentSub', icon: 'credit-card-outline' },
  { key: 'favorites', label: 'menu.favorites', sub: 'menu.favoritesSub', icon: 'heart-outline' },
  { key: 'promotions', label: 'menu.promotions', sub: 'menu.promotionsSub', icon: 'ticket-percent-outline' },
  { key: 'notifications', label: 'menu.notifications', sub: 'menu.notificationsSub', icon: 'bell-outline' },
  { key: 'security', label: 'menu.security', sub: 'menu.securitySub', icon: 'shield-lock-outline' },
  { key: 'support', label: 'menu.support', sub: 'menu.supportSub', icon: 'lifebuoy' },
  { key: 'terms', label: 'menu.terms', sub: 'menu.termsSub', icon: 'file-document-outline' },
];

export function ProfileScreen() {
  const { i18n, t } = useTranslation();
  const navigation = useNavigation<any>();
  const { favoriteRestaurantIds } = useFavoritesStore();
  const { mode, isDark, toggleTheme } = useThemeStore();
  const colors = getThemeColors(mode);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr');
  };

  const handleMenuPress = (key: string) => {
    if (key === 'orders') {
      Alert.alert(t('profile.ordersTitle'), t('profile.ordersText'));
      return;
    }

    if (key === 'addresses') {
      Alert.alert(t('profile.addressesTitle'), t('profile.addressesText'));
      return;
    }

    if (key === 'payment') {
      Alert.alert(t('profile.paymentTitle'), t('profile.paymentText'));
      return;
    }

    if (key === 'favorites') {
      Alert.alert(
        t('profile.favoritesTitle'),
        favoriteRestaurantIds.length
          ? t('profile.favoritesCount', { count: favoriteRestaurantIds.length })
          : t('profile.favoritesEmpty'),
      );
      return;
    }

    if (key === 'promotions') {
      Alert.alert(t('profile.promotionsTitle'), t('profile.promotionsText'));
      return;
    }

    if (key === 'notifications') {
      Alert.alert(t('profile.notificationsTitle'), t('profile.notificationsText'));
      return;
    }

    if (key === 'support') {
      Alert.alert(t('profile.supportTitle'), t('profile.supportText'));
      return;
    }

    Alert.alert(t(`menu.${key}`), t('profile.genericReady'));
  };

  const handleLogout = () => {
    Alert.alert(t('profile.logoutTitle'), t('profile.logoutText'), [
      { text: t('profile.cancel'), style: 'cancel' },
      { text: t('profile.confirm'), style: 'destructive', onPress: () => navigation.navigate('Login') },
    ]);
  };

  return (
    <ScrollView style={[styles.screen, { backgroundColor: colors.background }]} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>{t('profile.account')}</Text>
          <Text style={[styles.title, { color: colors.text }]}>{t('profile.myProfile')}</Text>
        </View>
        <Pressable style={[styles.headerButton, { backgroundColor: colors.surface }]} onPress={() => Alert.alert(t('profile.myProfile'), t('profile.editSoon'))}>
          <Ionicons name="create-outline" size={21} color={colors.primary} />
        </Pressable>
      </View>

      <View style={[styles.profileCard, { backgroundColor: colors.surface }]}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={34} color="#FFFFFF" />
        </View>
        <View style={styles.profileInfo}>
          <Text style={[styles.name, { color: colors.text }]}>ThomyStone</Text>
          <Text style={[styles.phone, { color: colors.textMuted }]}>{t('profile.client')}</Text>
          <View style={styles.badge}>
            <MaterialCommunityIcons name="star" size={13} color="#B45309" />
            <Text style={styles.badgeText}>{t('profile.premium')}</Text>
          </View>
        </View>
      </View>

      <Pressable style={[styles.themeCard, { backgroundColor: colors.surface }]} onPress={toggleTheme}>
        <View style={[styles.themeIcon, { backgroundColor: colors.surfaceMuted }]}>
          <Ionicons name={isDark ? 'moon' : 'sunny'} size={22} color={colors.primary} />
        </View>
        <View style={styles.menuText}>
          <Text style={[styles.menuLabel, { color: colors.text }]}>{t('profile.appearance')}</Text>
          <Text style={[styles.menuSub, { color: colors.textMuted }]}>
            {isDark ? t('profile.darkMode') : t('profile.lightMode')}
          </Text>
        </View>
        <View style={[styles.switchTrack, isDark && styles.switchTrackActive]}>
          <View style={[styles.switchThumb, isDark && styles.switchThumbActive]} />
        </View>
      </Pressable>

      <Pressable style={[styles.themeCard, { backgroundColor: colors.surface }]} onPress={toggleLanguage}>
        <View style={[styles.themeIcon, { backgroundColor: colors.surfaceMuted }]}>
          <Ionicons name="language-outline" size={22} color={colors.primary} />
        </View>
        <View style={styles.menuText}>
          <Text style={[styles.menuLabel, { color: colors.text }]}>{t('profile.language')}</Text>
          <Text style={[styles.menuSub, { color: colors.textMuted }]}>{t('profile.currentLanguage')}</Text>
        </View>
        <Text style={[styles.languageBadge, { color: colors.primary, borderColor: colors.border }]}>
          {i18n.language === 'fr' ? 'FR' : 'EN'}
        </Text>
      </Pressable>

      <View style={styles.promoCard}>
        <MaterialCommunityIcons name="ticket-percent-outline" size={24} color="#FFFFFF" />
        <View style={styles.promoCopy}>
          <Text style={styles.promoTitle}>{t('profile.offersTitle')}</Text>
          <Text style={styles.promoText}>{t('profile.offersText')}</Text>
        </View>
      </View>

      <View style={[styles.menu, { backgroundColor: colors.surface }]}>
        {MENU_ITEMS.map((item) => (
          <Pressable key={item.key} style={({ pressed }) => [styles.menuItem, pressed && styles.pressed]} onPress={() => handleMenuPress(item.key)}>
            <View style={[styles.menuIcon, { backgroundColor: colors.surfaceMuted }]}>
              <MaterialCommunityIcons name={item.icon as never} size={22} color={colors.primary} />
            </View>
            <View style={styles.menuText}>
              <Text style={[styles.menuLabel, { color: colors.text }]}>{t(item.label)}</Text>
              <Text style={[styles.menuSub, { color: colors.textMuted }]}>{t(item.sub)}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
          </Pressable>
        ))}
      </View>

      <Pressable style={[styles.logoutButton, { backgroundColor: colors.dangerSurface }]} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color={colors.danger} />
        <Text style={[styles.logoutText, { color: colors.danger }]}>{t('profile.logout')}</Text>
      </Pressable>

      <Text style={styles.version}>{t('profile.version')}</Text>
    </ScrollView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F8FAFC',
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 38,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    marginTop: 10,
  },
  eyebrow: {
    color: '#F97316',
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    color: '#0F172A',
    fontSize: 30,
    fontWeight: '900',
    marginTop: 4,
  },
  headerButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    flexDirection: 'row',
    gap: 14,
    padding: 16,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: '#F97316',
    borderRadius: 24,
    height: 68,
    justifyContent: 'center',
    width: 68,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '900',
  },
  phone: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 3,
  },
  badge: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FEF3C7',
    borderRadius: 999,
    flexDirection: 'row',
    gap: 4,
    marginTop: 10,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  badgeText: {
    color: '#B45309',
    fontSize: 12,
    fontWeight: '900',
  },
  promoCard: {
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 22,
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    padding: 16,
  },
  promoCopy: {
    flex: 1,
  },
  promoTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  promoText: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 3,
  },
  themeCard: {
    alignItems: 'center',
    borderRadius: 22,
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    padding: 14,
  },
  themeIcon: {
    alignItems: 'center',
    borderRadius: 14,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  switchTrack: {
    backgroundColor: '#CBD5E1',
    borderRadius: 999,
    height: 28,
    justifyContent: 'center',
    paddingHorizontal: 3,
    width: 50,
  },
  switchTrackActive: {
    backgroundColor: '#F97316',
  },
  switchThumb: {
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    height: 22,
    width: 22,
  },
  switchThumbActive: {
    alignSelf: 'flex-end',
  },
  languageBadge: {
    borderRadius: 999,
    borderWidth: 1,
    fontSize: 13,
    fontWeight: '900',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  menu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    marginTop: 16,
    overflow: 'hidden',
  },
  menuItem: {
    alignItems: 'center',
    borderBottomColor: '#F1F5F9',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 14,
  },
  pressed: {
    backgroundColor: '#FFF7ED',
  },
  menuIcon: {
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderRadius: 14,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  menuText: {
    flex: 1,
  },
  menuLabel: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '900',
  },
  menuSub: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 3,
  },
  logoutButton: {
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 18,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginTop: 16,
    padding: 15,
  },
  logoutText: {
    color: '#DC2626',
    fontSize: 15,
    fontWeight: '900',
  },
  version: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 18,
    textAlign: 'center',
  },
});
