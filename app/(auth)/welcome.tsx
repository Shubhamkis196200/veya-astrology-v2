import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CosmicBackground from '../../src/components/CosmicBackground';
import Button from '../../src/components/Button';
import { COLORS, FONTS, SPACING } from '../../src/constants/theme';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(40)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const subtitleFade = useRef(new Animated.Value(0)).current;
  const buttonFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // Logo appears
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.spring(logoScale, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
      ]),
      // Title slides in
      Animated.parallel([
        Animated.timing(fadeIn, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(slideUp, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]),
      // Subtitle
      Animated.timing(subtitleFade, { toValue: 1, duration: 500, useNativeDriver: true }),
      // Buttons
      Animated.timing(buttonFade, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <CosmicBackground variant="onboarding">
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Logo */}
          <Animated.View style={[styles.logoContainer, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
            <View style={styles.logoOrb}>
              <Text style={styles.logoEmoji}>🔮</Text>
            </View>
          </Animated.View>

          {/* Title */}
          <Animated.View style={{ opacity: fadeIn, transform: [{ translateY: slideUp }] }}>
            <Text style={styles.brand}>VEYA</Text>
            <View style={styles.divider} />
            <Text style={styles.title}>Your AI Astrologer{'\n'}That Knows You</Text>
          </Animated.View>

          {/* Subtitle */}
          <Animated.View style={{ opacity: subtitleFade }}>
            <Text style={styles.subtitle}>
              Personalized cosmic guidance powered by AI that learns your unique story.
              Not generic horoscopes — readings crafted for you.
            </Text>
          </Animated.View>

          {/* Features pills */}
          <Animated.View style={[styles.pills, { opacity: subtitleFade }]}>
            {['🧠 AI Memory', '🌌 3D Charts', '🗣️ Voice', '🔮 Multi-System'].map(pill => (
              <View key={pill} style={styles.pill}>
                <Text style={styles.pillText}>{pill}</Text>
              </View>
            ))}
          </Animated.View>
        </View>

        {/* Buttons */}
        <Animated.View style={[styles.buttons, { opacity: buttonFade }]}>
          <Button
            title="Begin Your Cosmic Journey"
            onPress={() => router.push('/(auth)/onboarding')}
            variant="primary"
            size="lg"
          />
          <Text style={styles.disclaimer}>Free to start · No credit card needed</Text>
        </Animated.View>
      </SafeAreaView>
    </CosmicBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: SPACING.xl,
  },
  logoOrb: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primaryMuted,
    borderWidth: 2,
    borderColor: COLORS.primaryGlow,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 10,
  },
  logoEmoji: {
    fontSize: 48,
  },
  brand: {
    ...FONTS.overline,
    fontSize: 16,
    color: COLORS.primaryLight,
    textAlign: 'center',
    letterSpacing: 8,
    marginBottom: SPACING.sm,
  },
  divider: {
    width: 40,
    height: 2,
    backgroundColor: COLORS.primaryGlow,
    borderRadius: 1,
    alignSelf: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    ...FONTS.display,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  subtitle: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    maxWidth: width * 0.85,
    lineHeight: 26,
    marginBottom: SPACING.lg,
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  pill: {
    backgroundColor: COLORS.bgCardHover,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pillText: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  buttons: {
    gap: SPACING.md,
    alignItems: 'center',
  },
  disclaimer: {
    ...FONTS.caption,
    color: COLORS.textMuted,
  },
});
