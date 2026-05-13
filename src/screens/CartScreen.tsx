// src/screens/CartScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { useCartStore } from '../store/cartStore';
import { Colors, Spacing, Radius, FontSize } from '../theme/colors';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Main'>;
};

export default function CartScreen({ navigation }: Props) {
  const { items, incrementQty, decrementQty, removeFromCart, getTotal, clearCart } =
    useCartStore();

  const total = getTotal();
  const deliveryFee = items.length > 0 ? 500 : 0;
  const serviceFee = items.length > 0 ? 200 : 0;
  const grandTotal = total + deliveryFee + serviceFee;

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.dark} />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mon Panier 🛒</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>Votre panier est vide</Text>
          <Text style={styles.emptySubtitle}>
            Parcourez nos restaurants et ajoutez vos plats favoris
          </Text>
          <TouchableOpacity
            style={styles.browseBtn}
            onPress={() => navigation.navigate('Main')}
          >
            <Text style={styles.browseBtnText}>Parcourir les restaurants</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mon Panier 🛒</Text>
        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.clearAll}>Vider</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.itemsList} showsVerticalScrollIndicator={false}>
        {/* Restaurant group label */}
        {items.length > 0 && (
          <View style={styles.restoLabel}>
            <Text style={styles.restoLabelText}>
              📍 {items[0].restoName}
              {new Set(items.map((i) => i.restoId)).size > 1 && ' + autres'}
            </Text>
          </View>
        )}

        {/* Cart items */}
        {items.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Text style={styles.itemEmoji}>{item.emoji}</Text>

            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.itemResto}>{item.restoName}</Text>
              <Text style={styles.itemPrice}>
                {(item.price * item.qty).toLocaleString()} FCFA
              </Text>
            </View>

            <View style={styles.itemRight}>
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeFromCart(item.id)}
              >
                <Text style={styles.removeBtnText}>✕</Text>
              </TouchableOpacity>

              <View style={styles.qtyControl}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => decrementQty(item.id)}
                >
                  <Text style={styles.qtyBtnText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtyValue}>{item.qty}</Text>
                <TouchableOpacity
                  style={[styles.qtyBtn, styles.qtyBtnPlus]}
                  onPress={() => incrementQty(item.id)}
                >
                  <Text style={[styles.qtyBtnText, { color: Colors.white }]}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Promo code input */}
        <View style={styles.promoSection}>
          <Text style={styles.promoLabel}>Code promo</Text>
          <View style={styles.promoRow}>
            <View style={styles.promoInput}>
              <Text style={styles.promoInputText}>RUSH237</Text>
            </View>
            <TouchableOpacity style={styles.promoApplyBtn}>
              <Text style={styles.promoApplyText}>Appliquer</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Récapitulatif</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Sous-total ({items.reduce((s, i) => s + i.qty, 0)} articles)
            </Text>
            <Text style={styles.summaryValue}>{total.toLocaleString()} F</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Frais de livraison</Text>
            <Text style={styles.summaryValue}>{deliveryFee.toLocaleString()} F</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Frais de service</Text>
            <Text style={styles.summaryValue}>{serviceFee.toLocaleString()} F</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Code promo</Text>
            <Text style={[styles.summaryValue, { color: Colors.green }]}>-0 F</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{grandTotal.toLocaleString()} FCFA</Text>
          </View>
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Checkout button */}
      <View style={styles.checkoutContainer}>
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => navigation.navigate('Payment')}
        >
          <Text style={styles.checkoutTotal}>{grandTotal.toLocaleString()} FCFA</Text>
          <Text style={styles.checkoutText}>Passer la commande →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.dark },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.text },
  clearAll: { fontSize: FontSize.sm, color: Colors.error, fontWeight: '600' },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    padding: Spacing.xl,
  },
  emptyEmoji: { fontSize: 72 },
  emptyTitle: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.text },
  emptySubtitle: {
    fontSize: FontSize.base,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  browseBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 14,
    borderRadius: Radius.md,
    marginTop: Spacing.sm,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  browseBtnText: { color: Colors.white, fontWeight: '700', fontSize: FontSize.md },

  itemsList: { flex: 1, padding: Spacing.md },

  restoLabel: {
    backgroundColor: Colors.primaryBg,
    borderRadius: Radius.sm,
    padding: Spacing.sm,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.borderActive,
  },
  restoLabelText: { fontSize: FontSize.sm, color: Colors.primary, fontWeight: '600' },

  cartItem: {
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
  itemEmoji: { fontSize: 36, minWidth: 44, textAlign: 'center' },
  itemInfo: { flex: 1 },
  itemName: { fontSize: FontSize.base, fontWeight: '600', color: Colors.text },
  itemResto: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  itemPrice: {
    fontSize: FontSize.base,
    fontWeight: '700',
    color: Colors.primary,
    marginTop: 4,
  },
  itemRight: { alignItems: 'flex-end', gap: Spacing.sm },
  removeBtn: {
    backgroundColor: Colors.errorBg,
    borderRadius: Radius.sm,
    padding: 6,
  },
  removeBtnText: { color: Colors.error, fontSize: 13, fontWeight: '700' },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.dark3,
    borderRadius: Radius.sm,
    padding: 4,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: Colors.dark2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  qtyBtnPlus: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  qtyBtnText: { color: Colors.text, fontSize: 18, fontWeight: '700', lineHeight: 22 },
  qtyValue: {
    fontSize: FontSize.md,
    fontWeight: '800',
    color: Colors.text,
    minWidth: 22,
    textAlign: 'center',
  },

  promoSection: {
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  promoLabel: { fontSize: FontSize.sm, color: Colors.textMuted, fontWeight: '600' },
  promoRow: { flexDirection: 'row', gap: Spacing.sm },
  promoInput: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: Radius.sm,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  promoInputText: { color: Colors.textMuted, fontSize: FontSize.base },
  promoApplyBtn: {
    backgroundColor: Colors.dark3,
    borderRadius: Radius.sm,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
  },
  promoApplyText: { color: Colors.text, fontSize: FontSize.sm, fontWeight: '600' },

  summaryCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
  },
  summaryTitle: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryLabel: { fontSize: FontSize.sm, color: Colors.textMuted },
  summaryValue: { fontSize: FontSize.sm, color: Colors.text, fontWeight: '600' },
  separator: { height: 1, backgroundColor: Colors.border, marginVertical: 4 },
  totalLabel: { fontSize: FontSize.md, fontWeight: '800', color: Colors.text },
  totalValue: {
    fontSize: FontSize.lg,
    fontWeight: '800',
    color: Colors.primary,
  },

  checkoutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.md,
    backgroundColor: Colors.dark2,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  checkoutBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  checkoutTotal: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
  checkoutText: { color: Colors.white, fontSize: FontSize.md, fontWeight: '800' },
});
