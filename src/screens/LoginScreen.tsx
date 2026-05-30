import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../services/api';
import { useAuthStore } from '../store/authStore';

export function LoginScreen() {
  const navigation = useNavigation<any>();
  const { setSession } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Connexion', 'Renseigne ton email et ton mot de passe.');
      return;
    }

    try {
      const session = await api.login({ email, password });
      setSession(session);
      Alert.alert('Connexion reussie', 'Tu es connecte via le backend.');
    } catch (error) {
      Alert.alert(
        'Connexion impossible',
        "L'API n'a pas valide la connexion. Verifie le backend ou cree d'abord un compte.",
      );
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.logoWrap}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      </View>

      <Text style={styles.title}>Connexion</Text>
      <Text style={styles.subtitle}>Connecte-toi pour commander rapidement.</Text>

      <View style={styles.form}>
        <View style={styles.inputWrap}>
          <Ionicons name="mail-outline" size={20} color="#94A3B8" />
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={email}
          />
        </View>

        <View style={styles.inputWrap}>
          <Ionicons name="lock-closed-outline" size={20} color="#94A3B8" />
          <TextInput
            onChangeText={setPassword}
            placeholder="Mot de passe"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            style={styles.input}
            value={password}
          />
        </View>
      </View>

      <Pressable style={styles.primaryButton} onPress={handleLogin}>
        <Text style={styles.primaryText}>Se connecter</Text>
        <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.secondaryText}>Créer un compte</Text>
      </Pressable>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F8FAFC',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 22,
  },
  logo: {
    borderRadius: 26,
    height: 120,
    width: 120,
  },
  title: {
    color: '#0F172A',
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: '#64748B',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
    marginTop: 8,
    textAlign: 'center',
  },
  form: {
    gap: 12,
    marginTop: 28,
  },
  inputWrap: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  input: {
    color: '#0F172A',
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#F97316',
    borderRadius: 18,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginTop: 18,
    padding: 16,
  },
  primaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  secondaryButton: {
    alignItems: 'center',
    marginTop: 16,
    padding: 12,
  },
  secondaryText: {
    color: '#F97316',
    fontSize: 15,
    fontWeight: '900',
  },
});
