// src/screens/PaymentScreen.tsx

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  Animated,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { useCartStore } from '../store/cartStore';
import { PAYMENT_METHODS } from '../data/mockData';
import { Colors, Spacing, Radius, FontSize } from '../theme/colors';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Payment'>;
};

export default function PaymentScreen({ navigation }: Props) {
  const { items, getTotal, clearCart } = useCartStore();
  const [selectedMethod, setSelectedMethod] = useState('mtn');
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const total = getTotal();
  const deliveryFee = 500;
  const serviceFee = 200;
  const grandTotal = total + deliveryFee + serviceFee;

  const handleConfirmOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 60,
        friction: 6,
        useNativeDriver: true,
      }).start();
    }, 1500);
  };

  const handleSuccessClose = () => {
    clearCart();
    setShowSuccess(false);
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paiement 💳</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Order summary mini */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RÉCAPITULATIF</Text>
          <View style={styles.summaryCard}>
            {items.map((item) => (
              <View key={item.id} style={styles.summaryRow}>
                <Text style={styles.summaryItemName}>
                  {item.emoji} {item.name}{' '}
                  <Text style={styles.summaryQty}>×{item.qty}</Text>
                </Text>
                <Text style={styles.summaryItemPrice}>
                  {(item.price * item.qty).toLocaleString()} F
                </Text>
              </View>
            ))}
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Livraison</Text>
              <Text style={styles.summaryValue}>{deliveryFee.toLocaleString()} F</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Frais de service</Text>
              <Text style={styles.summaryValue}>{serviceFee.toLocaleString()} F</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total à payer</Text>
              <Text style={styles.totalValue}>{grandTotal.toLocaleString()} FCFA</Text>
            </View>
          </View>
        </View>

        {/* Delivery address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ADRESSE DE LIVRAISON</Text>
          <View style={styles.addressCard}>
            <Text style={styles.addressIcon}>📍</Text>
            <View style={styles.addressInfo}>
              <Text style={styles.addressName}>Pierre Kamga</Text>
              <Text style={styles.addressText}>
                Quartier Bastos, Yaoundé, Cameroun
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.addressChange}>Changer</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MODE DE PAIEMENT</Text>
          {PAYMENT_METHODS.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodCard,
                selectedMethod === method.id && styles.methodCardActive,
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <Text style={styles.methodIcon}>{method.icon}</Text>
              <View style={styles.methodInfo}>
                <Text style={styles.methodName}>{method.name}</Text>
                <Text style={styles.methodSub}>{method.subtitle}</Text>
              </View>
              <View
                style={[
                  styles.radio,
                  selectedMethod === method.id && styles.radioActive,
                ]}
              >
                {selectedMethod === method.id && (
                  <View style={styles.radioDot} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Estimated time */}
        <View style={styles.etaCard}>
          <Text style={styles.etaEmoji}>🛵</Text>
          <View>
            <Text style={styles.etaTitle}>Temps de livraison estimé</Text>
            <Text style={styles.etaValue}>25 – 40 minutes</Text>
          </View>
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Confirm button */}
      <View style={styles.confirmContainer}>
        <TouchableOpacity
          style={[styles.confirmBtn, loading && styles.confirmBtnLoading]}
          onPress={handleConfirmOrder}
          disabled={loading}
        >
          <Text style={styles.confirmBtnText}>
            {loading ? 'Traitement en cours...' : `Confirmer & Payer · ${grandTotal.toLocaleString()} FCFA`}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.successCard, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.successEmoji}>🎉</Text>
            <Text style={styles.successTitle}>Commande confirmée !</Text>
            <Text style={styles.successSub}>
              Votre commande a été passée avec succès. Le livreur est en route !
            </Text>
            <View style={styles.successInfo}>
              <View style={styles.successInfoRow}>
                <Text style={styles.successInfoLabel}>Numéro de commande</Text>
                <Text style={styles.successInfoValue}>#FRU-{Math.floor(Math.random() * 9000) + 1000}</Text>
              </View>
              <View style={styles.successInfoRow}>
                <Text style={styles.successInfoLabel}>Livraison estimée</Text>
                <Text style={styles.successInfoValue}>25 – 40 min</Text>
              </View>
              <View style={styles.successInfoRow}>
                <Text style={styles.successInfoLabel}>Montant payé</Text>
                <Text style={[styles.successInfoValue, { color: Colors.primary }]}>
                  {grandTotal.toLocaleString()} FCFA
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.successBtn} onPress={handleSuccessClose}>
              <Text style={styles.successBtnText}>Retour à l'accueil</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.dark },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: Radius.sm,
    backgroundColor: Colors.card, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.border,
  },
  backIcon: { color: Colors.text, fontSize: 20 },
  headerTitle: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.text },

  body: { flex: 1 },

  section: { padding: Spacing.md, gap: Spacing.sm },
  sectionTitle: {
    fontSize: FontSize.xs, fontWeight: '700', color: Colors.textMuted,
    letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4,
  },

  summaryCard: {
    backgroundColor: Colors.card, borderRadius: Radius.md, padding: Spacing.md,
    borderWidth: 1, borderColor: Colors.border, gap: 10,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryItemName: { fontSize: FontSize.sm, color: Colors.text, flex: 1 },
  summaryQty: { color: Colors.textMuted },
  summaryItemPrice: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.text },
  divider: { height: 1, backgroundColor: Colors.border },
  summaryLabel: { fontSize: FontSize.sm, color: Colors.textMuted },
  summaryValue: { fontSize: FontSize.sm, color: Colors.text, fontWeight: '600' },
  totalLabel: { fontSize: FontSize.md, fontWeight: '800', color: Colors.text },
  totalValue: { fontSize: FontSize.lg, fontWeight: '800', color: Colors.primary },

  addressCard: {
    backgroundColor: Colors.card, borderRadius: Radius.md, padding: Spacing.md,
    borderWidth: 1, borderColor: Colors.border, flexDirection: 'row',
    alignItems: 'center', gap: Spacing.sm,
  },
  addressIcon: { fontSize: 24 },
  addressInfo: { flex: 1 },
  addressName: { fontSize: FontSize.base, fontWeight: '700', color: Colors.text },
  addressText: { fontSize: FontSize.sm, color: Colors.textMuted, marginTop: 2 },
  addressChange: { fontSize: FontSize.sm, color: Colors.primary, fontWeight: '600' },

  methodCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.card, borderRadius: Radius.md, padding: Spacing.md,
    borderWidth: 2, borderColor: Colors.border, marginBottom: Spacing.sm,
    transition: '0.2s',
  },
  methodCardActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryBg },
  methodIcon: { fontSize: 28, minWidth: 36, textAlign: 'center' },
  methodInfo: { flex: 1 },
  methodName: { fontSize: FontSize.base, fontWeight: '700', color: Colors.text },
  methodSub: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  radio: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  radioActive: { borderColor: Colors.primary },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary },

  etaCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    marginHorizontal: Spacing.md, padding: Spacing.md,
    backgroundColor: Colors.dark3, borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.border,
  },
  etaEmoji: { fontSize: 32 },
  etaTitle: { fontSize: FontSize.sm, color: Colors.textMuted },
  etaValue: { fontSize: FontSize.base, fontWeight: '700', color: Colors.text, marginTop: 2 },

  confirmContainer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: Spacing.md, backgroundColor: Colors.dark2,
    borderTopWidth: 1, borderTopColor: Colors.border,
  },
  confirmBtn: {
    backgroundColor: Colors.primary, borderRadius: Radius.md, padding: 16,
    alignItems: 'center',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4, shadowRadius: 16, elevation: 12,
  },
  confirmBtnLoading: { opacity: 0.7 },
  confirmBtnText: { color: Colors.white, fontSize: FontSize.base, fontWeight: '800' },

  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.85)',
    alignItems: 'center', justifyContent: 'center', padding: Spacing.lg,
  },
  successCard: {
    backgroundColor: Colors.card, borderRadius: Radius.xl, padding: Spacing.lg,
    width: '100%', alignItems: 'center', gap: Spacing.md,
    borderWidth: 1, borderColor: Colors.border,
  },
  successEmoji: { fontSize: 72 },
  successTitle: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.text },
  successSub: {
    fontSize: FontSize.sm, color: Colors.textMuted,
    textAlign: 'center', lineHeight: 20,
  },
  successInfo: {
    width: '100%', backgroundColor: Colors.dark3, borderRadius: Radius.md,
    padding: Spacing.md, gap: Spacing.sm,
    borderWidth: 1, borderColor: Colors.border,
  },
  successInfoRow: { flexDirection: 'row', justifyContent: 'space-between' },
  successInfoLabel: { fontSize: FontSize.sm, color: Colors.textMuted },
  successInfoValue: { fontSize: FontSize.sm, fontWeight: '700', color: Colors.text },
  successBtn: {
    backgroundColor: Colors.primary, borderRadius: Radius.md,
    padding: 14, width: '100%', alignItems: 'center',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4, shadowRadius: 16, elevation: 12,
  },
  successBtnText: { color: Colors.white, fontWeight: '800', fontSize: FontSize.md },
});
