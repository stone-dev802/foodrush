import React from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCartStore } from '../store/cartStore';
import { useThemeStore } from '../store/themeStore';
import { getThemeColors } from '../theme/colors';
import { getFoodIcon } from '../theme/icons';

export function CartScreen() {
  const navigation = useNavigation<any>();
  const { items, addItem, removeItem, clearCart } = useCartStore();
  const { mode } = useThemeStore();
  const colors = getThemeColors(mode);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 700 : 0;
  const total = subtotal + deliveryFee;

  return (
    <ScrollView style={[styles.screen, { backgroundColor: colors.background }]} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>Panier</Text>
          <Text style={[styles.title, { color: colors.text }]}>Ma commande</Text>
        </View>
        {!!items.length && (
          <Pressable style={styles.clearButton} onPress={clearCart}>
            <Ionicons name="trash-outline" size={19} color="#DC2626" />
          </Pressable>
        )}
      </View>

      {items.length === 0 ? (
        <View style={[styles.empty, { backgroundColor: colors.surface }]}>
          <Ionicons name="cart-outline" size={50} color="#CBD5E1" />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>Ton panier est vide</Text>
          <Text style={[styles.emptyText, { color: colors.textMuted }]}>Ajoute un plat depuis un restaurant pour commencer.</Text>
          <Pressable style={styles.primaryButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.primaryText}>Explorer les restaurants</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            {items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <View style={styles.itemVisual}>
                  <MaterialCommunityIcons name={getFoodIcon(item.emoji ?? item.name, item.category) as never} size={28} color="#F97316" />
                </View>
                <View style={styles.itemContent}>
                  <Text style={[styles.itemName, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{item.price.toLocaleString('fr-FR')} FCFA</Text>
                </View>
                <View style={styles.quantity}>
                  <Pressable style={styles.quantityButton} onPress={() => removeItem(item.id)}>
                    <Ionicons name="remove" size={17} color="#F97316" />
                  </Pressable>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <Pressable style={styles.quantityButton} onPress={() => addItem(item)}>
                    <Ionicons name="add" size={17} color="#F97316" />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>

          <View style={[styles.summary, { backgroundColor: colors.surface }]}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>Sous-total</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>{subtotal.toLocaleString('fr-FR')} FCFA</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>Livraison</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>{deliveryFee.toLocaleString('fr-FR')} FCFA</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={[styles.totalLabel, { color: colors.text }]}>Total</Text>
              <Text style={styles.totalValue}>{total.toLocaleString('fr-FR')} FCFA</Text>
            </View>
          </View>

          <Pressable style={styles.checkoutButton} onPress={() => navigation.navigate('Payment')}>
            <Text style={styles.checkoutText}>Passer au paiement</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </Pressable>
        </>
      )}
    </ScrollView>
  );
}

export default CartScreen;

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F8FAFC', flex: 1 },
  content: { padding: 20, paddingBottom: 38 },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    marginTop: 10,
  },
  eyebrow: { color: '#F97316', fontSize: 13, fontWeight: '900', textTransform: 'uppercase' },
  title: { color: '#0F172A', fontSize: 30, fontWeight: '900', marginTop: 4 },
  clearButton: {
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 999,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  empty: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
  },
  emptyTitle: { color: '#0F172A', fontSize: 20, fontWeight: '900', marginTop: 12 },
  emptyText: { color: '#64748B', fontSize: 14, fontWeight: '600', lineHeight: 20, marginTop: 6, textAlign: 'center' },
  primaryButton: { backgroundColor: '#F97316', borderRadius: 16, marginTop: 20, paddingHorizontal: 18, paddingVertical: 13 },
  primaryText: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 8 },
  itemRow: {
    alignItems: 'center',
    borderBottomColor: '#F1F5F9',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 10,
  },
  itemVisual: {
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderRadius: 15,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  itemContent: { flex: 1 },
  itemName: { color: '#0F172A', fontSize: 15, fontWeight: '900' },
  itemPrice: { color: '#F97316', fontSize: 13, fontWeight: '800', marginTop: 4 },
  quantity: { alignItems: 'center', flexDirection: 'row', gap: 9 },
  quantityButton: {
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderRadius: 999,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  quantityText: { color: '#0F172A', fontSize: 14, fontWeight: '900', minWidth: 18, textAlign: 'center' },
  summary: { backgroundColor: '#FFFFFF', borderRadius: 22, marginTop: 16, padding: 16 },
  summaryRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { color: '#64748B', fontSize: 14, fontWeight: '700' },
  summaryValue: { color: '#0F172A', fontSize: 14, fontWeight: '900' },
  divider: { backgroundColor: '#E2E8F0', height: 1, marginBottom: 12, marginTop: 2 },
  totalLabel: { color: '#0F172A', fontSize: 18, fontWeight: '900' },
  totalValue: { color: '#F97316', fontSize: 20, fontWeight: '900' },
  checkoutButton: {
    alignItems: 'center',
    backgroundColor: '#F97316',
    borderRadius: 18,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginTop: 16,
    padding: 16,
  },
  checkoutText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
});
