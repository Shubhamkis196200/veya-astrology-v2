import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import CosmicBackground from '../../../src/components/CosmicBackground';
import Button from '../../../src/components/Button';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../src/constants/theme';
import { useOnboardingStore } from '../../../src/stores/onboardingStore';

const { width } = Dimensions.get('window');

const INTEREST_OPTIONS = [
  { key: 'love', label: 'Love & Relationships', emoji: '💕', color: '#EC4899' },
  { key: 'career', label: 'Career & Success', emoji: '💼', color: '#3B82F6' },
  { key: 'health', label: 'Health & Wellness', emoji: '🌿', color: '#22C55E' },
  { key: 'finance', label: 'Finance & Wealth', emoji: '💰', color: '#F59E0B' },
  { key: 'family', label: 'Family & Home', emoji: '🏠', color: '#06B6D4' },
  { key: 'spirituality', label: 'Spiritual Growth', emoji: '🧘', color: '#8B5CF6' },
  { key: 'personal', label: 'Personal Growth', emoji: '🌱', color: '#10B981' },
  { key: 'creativity', label: 'Creativity', emoji: '🎨', color: '#F97316' },
];

export default function Interests() {
  const router = useRouter();
  const { data, setField, setStep } = useOnboardingStore();
  const selected = data.interests;
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setStep(6);
    Animated.timing(fadeIn, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const toggle = (key: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const updated = selected.includes(key)
      ? selected.filter(k => k !== key)
      : [...selected, key];
    setField('interests', updated);
  };

  return (
    <CosmicBackground variant="onboarding">
      <SafeAreaView style={styles.container}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '87.5%' }]} />
        </View>

        <Animated.View style={[styles.content, { opacity: fadeIn }]}>
          <Text style={styles.step}>Step 6 of 8</Text>
          <Text style={styles.emoji}>🎯</Text>
          <Text style={styles.title}>What matters most{'\n'}to you?</Text>
          <Text style={styles.subtitle}>Select your focus areas. Veya will tailor your readings to what you care about. Choose at least 2.</Text>

          <View style={styles.grid}>
            {INTEREST_OPTIONS.map(item => {
              const isSelected = selected.includes(item.key);
              return (
                <TouchableOpacity
                  key={item.key}
                  style={[
                    styles.card,
                    isSelected && { backgroundColor: `${item.color}15`, borderColor: `${item.color}40` },
                  ]}
                  onPress={() => toggle(item.key)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cardEmoji}>{item.emoji}</Text>
                  <Text style={[styles.cardLabel, isSelected && { color: item.color }]}>{item.label}</Text>
                  {isSelected && <View style={[styles.checkDot, { backgroundColor: item.color }]} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>

        <View style={styles.buttons}>
          <Button
            title="Almost There!"
            onPress={() => router.push('/(auth)/onboarding/complete')}
            disabled={selected.length < 2}
            variant="primary"
            size="lg"
            style={{ width: '100%' }}
          />
          <Button title="Back" onPress={() => router.back()} variant="ghost" size="md" />
        </View>
      </SafeAreaView>
    </CosmicBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xl, justifyContent: 'space-between' },
  progressBar: { height: 3, backgroundColor: COLORS.bgCardHover, borderRadius: 2, marginTop: SPACING.md, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 2 },
  content: { flex: 1 },
  step: { ...FONTS.overline, color: COLORS.primaryLight, textAlign: 'center', marginTop: SPACING.lg, marginBottom: SPACING.sm },
  emoji: { fontSize: 48, textAlign: 'center', marginBottom: SPACING.md },
  title: { ...FONTS.h2, color: COLORS.text, textAlign: 'center', marginBottom: SPACING.xs },
  subtitle: { ...FONTS.bodySm, color: COLORS.textSecondary, textAlign: 'center', maxWidth: 300, alignSelf: 'center', marginBottom: SPACING.lg },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, justifyContent: 'center' },
  card: {
    width: (width - SPACING.lg * 2 - SPACING.sm) / 2,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    position: 'relative',
  },
  cardEmoji: { fontSize: 32, marginBottom: SPACING.sm },
  cardLabel: { ...FONTS.bodySm, color: COLORS.textSecondary, fontWeight: '500', textAlign: 'center' },
  checkDot: { position: 'absolute', top: 10, right: 10, width: 10, height: 10, borderRadius: 5 },
  buttons: { gap: SPACING.sm, alignItems: 'center' },
});
