import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import CosmicBackground from '../../../src/components/CosmicBackground';
import Button from '../../../src/components/Button';
import { COLORS, FONTS, SPACING, RADIUS, ZODIAC } from '../../../src/constants/theme';
import { useOnboardingStore } from '../../../src/stores/onboardingStore';

const { width } = Dimensions.get('window');

export default function Complete() {
  const router = useRouter();
  const { data, setStep, setCompleted, persist } = useOnboardingStore();
  const signInfo = data.sunSign ? ZODIAC[data.sunSign] : ZODIAC.aries;

  const scaleIn = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;
  const confettiScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setStep(7);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    Animated.sequence([
      Animated.spring(scaleIn, { toValue: 1, tension: 50, friction: 6, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(fadeIn, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(confettiScale, { toValue: 1, tension: 40, friction: 5, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  const handleComplete = async () => {
    setCompleted(true);
    await persist();
    router.replace('/(tabs)');
  };

  return (
    <CosmicBackground variant="reveal">
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Celebration */}
          <Animated.View style={[styles.celebration, { transform: [{ scale: confettiScale }] }]}>
            <Text style={styles.confetti}>🎉</Text>
          </Animated.View>

          <Animated.View style={[styles.main, { transform: [{ scale: scaleIn }] }]}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarSymbol}>{signInfo.symbol}</Text>
            </View>
          </Animated.View>

          <Animated.View style={{ opacity: fadeIn, alignItems: 'center' }}>
            <Text style={styles.welcome}>Welcome to the cosmos,</Text>
            <Text style={styles.name}>{data.name}! ✨</Text>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Your Cosmic Profile</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>☀️ Sun</Text>
                <Text style={styles.summaryValue}>{signInfo.name}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>📍 Born</Text>
                <Text style={styles.summaryValue} numberOfLines={1}>{data.birthPlace}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>🎯 Focus</Text>
                <Text style={styles.summaryValue}>{data.interests.length} areas</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>🧠 AI</Text>
                <Text style={[styles.summaryValue, { color: COLORS.success }]}>Ready to learn you</Text>
              </View>
            </View>

            <Text style={styles.note}>Veya's AI will personalize your experience{'\n'}more with every conversation.</Text>
          </Animated.View>
        </View>

        <Animated.View style={[styles.buttons, { opacity: fadeIn }]}>
          <Button
            title="Enter the Cosmos 🚀"
            onPress={handleComplete}
            variant="gold"
            size="lg"
            style={{ width: '100%' }}
          />
        </Animated.View>
      </SafeAreaView>
    </CosmicBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xl, justifyContent: 'space-between' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  celebration: { position: 'absolute', top: 60 },
  confetti: { fontSize: 48 },
  main: { marginBottom: SPACING.xl },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primaryMuted,
    borderWidth: 3,
    borderColor: COLORS.primaryGlow,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 10,
  },
  avatarSymbol: { fontSize: 56 },
  welcome: { ...FONTS.body, color: COLORS.textSecondary, marginBottom: SPACING.xs },
  name: { ...FONTS.h1, color: COLORS.text, textAlign: 'center', marginBottom: SPACING.xl },
  summaryCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    width: width * 0.85,
    marginBottom: SPACING.lg,
  },
  summaryTitle: { ...FONTS.label, color: COLORS.primaryLight, textAlign: 'center', marginBottom: SPACING.md },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  summaryLabel: { ...FONTS.bodySm, color: COLORS.textMuted },
  summaryValue: { ...FONTS.bodyMd, color: COLORS.text, fontSize: 14 },
  note: { ...FONTS.caption, color: COLORS.textMuted, textAlign: 'center', lineHeight: 18 },
  buttons: { alignItems: 'center' },
});
