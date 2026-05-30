import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { PAYMENT_METHODS } from '../data/mockData';
import { api } from '../services/api';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { useThemeStore } from '../store/themeStore';
import { getThemeColors } from '../theme/colors';
import { getPaymentIcon } from '../theme/icons';

export function PaymentScreen() {
  const navigation = useNavigation<any>();
  const { items, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { mode } = useThemeStore();
  const colors = getThemeColors(mode);
  const [selectedMethod, setSelectedMethod] = useState(PAYMENT_METHODS[0]?.id ?? 'cash');
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + (subtotal > 0 ? 700 : 0);

  const confirmPayment = async () => {
    if (!items.length) {
      Alert.alert('Panier vide', 'Ajoute un plat avant de payer.');
      return;
    }

    try {
      await api.fakePayment({ amount: total, method: selectedMethod });
      await api.createOrder({
        userId: user?.id,
        customerName: user?.name ?? 'Client FoodRush',
        paymentMethod: selectedMethod,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          restaurantId: item.restaurantId,
        })),
      });
    } catch {
      // The fake payment still succeeds locally when the backend is offline.
    }

    Alert.alert('Commande confirmee', 'Paiement fake valide. Ta commande est en preparation.', [
      {
        text: 'OK',
        onPress: () => {
          clearCart();
          navigation.navigate('Main');
        },
      },
    ]);
  };

  return (
    <ScrollView style={[styles.screen, { backgroundColor: colors.background }]} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Pressable style={[styles.backButton, { backgroundColor: colors.surface }]} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </Pressable>
        <View>
          <Text style={styles.eyebrow}>Paiement</Text>
          <Text style={[styles.title, { color: colors.text }]}>Finaliser</Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <View style={styles.cardTitleRow}>
          <Ionicons name="location-outline" size={20} color="#F97316" />
          <Text style={[styles.cardTitle, { color: colors.text }]}>Adresse de livraison</Text>
        </View>
        <Text style={[styles.cardText, { color: colors.textMuted }]}>Douala, Cameroun</Text>
        <View style={styles.eta}>
          <MaterialCommunityIcons name="bike-fast" size={18} color="#F97316" />
          <Text style={styles.etaText}>Arrivee estimee: 25-35 min</Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Mode de paiement</Text>
        {PAYMENT_METHODS.map((method) => {
          return (
          <Pressable
            key={method.id}
            style={[styles.method, selectedMethod === method.id && styles.methodActive]}
            onPress={() => setSelectedMethod(method.id)}
          >
            <View style={styles.methodIcon}>
              <MaterialCommunityIcons name={getPaymentIcon(method.id) as never} size={23} color="#F97316" />
            </View>
            <View style={styles.methodText}>
              <Text style={[styles.methodName, { color: colors.text }]}>{method.name}</Text>
              {!!method.subtitle && <Text style={[styles.methodDescription, { color: colors.textMuted }]}>{method.subtitle}</Text>}
            </View>
            <Ionicons
              name={selectedMethod === method.id ? 'radio-button-on' : 'radio-button-off'}
              size={21}
              color={selectedMethod === method.id ? '#F97316' : '#CBD5E1'}
            />
          </Pressable>
          );
        })}
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total a payer</Text>
          <Text style={styles.total}>{total.toLocaleString('fr-FR')} FCFA</Text>
        </View>
      </View>

      <Pressable style={styles.payButton} onPress={confirmPayment}>
        <Text style={styles.payText}>Confirmer le paiement fake</Text>
        <Ionicons name="checkmark-circle" size={21} color="#FFFFFF" />
      </Pressable>
    </ScrollView>
  );
}

export default PaymentScreen;

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F8FAFC', flex: 1 },
  content: { padding: 20, paddingBottom: 38 },
  header: { alignItems: 'center', flexDirection: 'row', gap: 14, marginBottom: 18, marginTop: 10 },
  backButton: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 999, height: 44, justifyContent: 'center', width: 44 },
  eyebrow: { color: '#F97316', fontSize: 13, fontWeight: '900', textTransform: 'uppercase' },
  title: { color: '#0F172A', fontSize: 30, fontWeight: '900', marginTop: 4 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 22, marginBottom: 16, padding: 16 },
  cardTitleRow: { alignItems: 'center', flexDirection: 'row', gap: 8, marginBottom: 8 },
  cardTitle: { color: '#0F172A', fontSize: 16, fontWeight: '900' },
  cardText: { color: '#64748B', fontSize: 14, fontWeight: '700' },
  eta: { alignItems: 'center', flexDirection: 'row', gap: 7, marginTop: 12 },
  etaText: { color: '#F97316', fontSize: 13, fontWeight: '900' },
  method: { alignItems: 'center', borderColor: '#F1F5F9', borderRadius: 18, borderWidth: 1, flexDirection: 'row', gap: 12, marginTop: 12, padding: 12 },
  methodActive: { backgroundColor: '#FFF7ED', borderColor: '#FED7AA' },
  methodIcon: { alignItems: 'center', backgroundColor: '#FFF7ED', borderRadius: 14, height: 42, justifyContent: 'center', width: 42 },
  methodText: { flex: 1 },
  methodName: { color: '#0F172A', fontSize: 15, fontWeight: '900' },
  methodDescription: { color: '#64748B', fontSize: 12, fontWeight: '600', marginTop: 3 },
  summary: { backgroundColor: '#0F172A', borderRadius: 22, marginBottom: 16, padding: 16 },
  summaryRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  summaryLabel: { color: '#CBD5E1', fontSize: 14, fontWeight: '800' },
  total: { color: '#FFFFFF', fontSize: 20, fontWeight: '900' },
  payButton: { alignItems: 'center', backgroundColor: '#F97316', borderRadius: 18, flexDirection: 'row', gap: 8, justifyContent: 'center', padding: 16 },
  payText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
});
