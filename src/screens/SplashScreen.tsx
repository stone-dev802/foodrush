// src/screens/SplashScreen.tsx

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Colors, FontSize, Spacing } from '../theme/colors';

type Props = {
  navigation: {
    replace: (screen: string) => void;
  };
};

export default function SplashScreen({ navigation }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Animate logo in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 80,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to Auth after delay (login bypass → go directly to Main)
    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark} />

      <Animated.View
        style={[
          styles.logoContainer,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.textContainer,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text style={styles.title}>
          Food<Text style={styles.titleAccent}>Rush</Text>
        </Text>
        <Text style={styles.subtitle}>Livraison rapide à votre porte</Text>
      </Animated.View>

      <Animated.View style={[styles.loaderContainer, { opacity: fadeAnim }]}>
        <ActivityIndicator size="small" color={Colors.primary} />
      </Animated.View>

      {/* Decorative blobs */}
      <View style={styles.blob1} />
      <View style={styles.blob2} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.lg,
  },
  logoContainer: {
    width: 148,
    height: 148,
    borderRadius: 36,
    backgroundColor: Colors.dark2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.borderActive,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 32,
    elevation: 20,
  },
  logoImage: {
    width: 148,
    height: 148,
  },
  textContainer: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -1,
  },
  titleAccent: {
    color: Colors.primary,
  },
  subtitle: {
    fontSize: FontSize.base,
    color: Colors.textMuted,
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 80,
  },
  blob1: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(255,75,43,0.06)',
    top: -60,
    right: -80,
  },
  blob2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,75,43,0.04)',
    bottom: -40,
    left: -60,
  },
});
