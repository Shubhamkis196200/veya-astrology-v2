import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CosmicBackground from '../../../src/components/CosmicBackground';
import Button from '../../../src/components/Button';
import { COLORS, FONTS, SPACING, RADIUS, ZODIAC } from '../../../src/constants/theme';
import { useOnboardingStore } from '../../../src/stores/onboardingStore';

// Pre-written personality snapshots per sign (AI will personalize later with RAG)
const PERSONALITIES: Record<string, { title: string; traits: string[]; description: string }> = {
  aries: { title: 'The Bold Pioneer', traits: ['Courageous', 'Passionate', 'Direct', 'Competitive'], description: 'You charge through life with unstoppable energy. Your natural leadership draws people to you, though your impatience sometimes sparks conflict. You thrive when challenged.' },
  taurus: { title: 'The Grounded Creator', traits: ['Reliable', 'Sensual', 'Patient', 'Determined'], description: 'You build lasting beauty in everything you touch. Your love of comfort and stability grounds those around you. When you commit, nothing shakes your resolve.' },
  gemini: { title: 'The Curious Connector', traits: ['Witty', 'Adaptable', 'Curious', 'Expressive'], description: 'Your mind moves at the speed of light, connecting ideas no one else sees. Communication is your superpower — you can talk to anyone about anything.' },
  cancer: { title: 'The Intuitive Nurturer', traits: ['Empathetic', 'Protective', 'Intuitive', 'Creative'], description: 'You feel everything deeply and remember what others forget. Your emotional intelligence makes you the person everyone turns to. Home is your sanctuary.' },
  leo: { title: 'The Radiant Leader', traits: ['Generous', 'Confident', 'Creative', 'Warm'], description: 'You were born to shine. Your warmth lights up every room, and your generosity inspires loyalty. When you believe in something, your passion is magnetic.' },
  virgo: { title: 'The Thoughtful Analyst', traits: ['Precise', 'Helpful', 'Observant', 'Dedicated'], description: 'You see patterns where others see chaos. Your attention to detail and desire to improve things makes you invaluable. You heal through practical wisdom.' },
  libra: { title: 'The Graceful Diplomat', traits: ['Harmonious', 'Fair', 'Charming', 'Artistic'], description: 'You create beauty and balance wherever you go. Your ability to see all perspectives makes you a natural mediator. Relationships are where you grow most.' },
  scorpio: { title: 'The Depth Seeker', traits: ['Intense', 'Perceptive', 'Transformative', 'Loyal'], description: 'You see beneath the surface of everything. Your emotional depth is both your power and your challenge. When you transform, you emerge stronger than before.' },
  sagittarius: { title: 'The Adventurous Philosopher', traits: ['Optimistic', 'Honest', 'Adventurous', 'Wise'], description: 'You seek meaning in every experience. Your hunger for truth and freedom takes you on journeys — physical, intellectual, and spiritual.' },
  capricorn: { title: 'The Strategic Builder', traits: ['Ambitious', 'Disciplined', 'Wise', 'Responsible'], description: 'You play the long game and win. Your patience and work ethic build empires. Behind your composed exterior lies a dry wit that catches everyone off guard.' },
  aquarius: { title: 'The Visionary Rebel', traits: ['Innovative', 'Independent', 'Humanitarian', 'Original'], description: 'You see the future before it arrives. Your mind works differently — and that\'s your greatest gift. You care deeply about humanity, even when you seem detached.' },
  pisces: { title: 'The Dreaming Mystic', traits: ['Compassionate', 'Imaginative', 'Sensitive', 'Spiritual'], description: 'You dissolve boundaries between worlds. Your empathy and creativity flow from a deep spiritual well. You understand emotions most people can\'t name.' },
};

export default function Personality() {
  const router = useRouter();
  const { data, setStep } = useOnboardingStore();
  const sign = data.sunSign || 'aries';
  const personality = PERSONALITIES[sign];
  const signInfo = ZODIAC[sign];

  const fadeIn = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setStep(5);
    // Simulate AI "analyzing" (builds anticipation)
    setTimeout(() => {
      setLoading(false);
      Animated.timing(fadeIn, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    }, 2000);
  }, []);

  return (
    <CosmicBackground variant="onboarding">
      <SafeAreaView style={styles.container}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '75%' }]} />
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingEmoji}>🔮</Text>
            <Text style={styles.loadingTitle}>Analyzing your cosmic blueprint...</Text>
            <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: SPACING.lg }} />
            <Text style={styles.loadingSubtext}>Mapping planetary positions at your birth</Text>
          </View>
        ) : (
          <>
            <Animated.View style={[styles.content, { opacity: fadeIn }]}>
              <Text style={styles.step}>Step 5 of 8</Text>

              <View style={styles.header}>
                <Text style={styles.signSymbol}>{signInfo.symbol}</Text>
                <Text style={styles.personalityTitle}>{personality.title}</Text>
              </View>

              {/* Traits */}
              <View style={styles.traitsRow}>
                {personality.traits.map(trait => (
                  <View key={trait} style={styles.traitPill}>
                    <Text style={styles.traitText}>{trait}</Text>
                  </View>
                ))}
              </View>

              {/* Description */}
              <View style={styles.descriptionCard}>
                <Text style={styles.descriptionText}>{personality.description}</Text>
              </View>

              <Text style={styles.note}>✨ This is just your sun sign. With Veya's AI, your readings will become deeply personal over time.</Text>
            </Animated.View>

            <View style={styles.buttons}>
              <Button
                title="Choose Your Focus Areas"
                onPress={() => router.push('/(auth)/onboarding/interests')}
                variant="primary"
                size="lg"
                style={{ width: '100%' }}
              />
              <Button title="Back" onPress={() => router.back()} variant="ghost" size="md" />
            </View>
          </>
        )}
      </SafeAreaView>
    </CosmicBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xl, justifyContent: 'space-between' },
  progressBar: { height: 3, backgroundColor: COLORS.bgCardHover, borderRadius: 2, marginTop: SPACING.md, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 2 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingEmoji: { fontSize: 64, marginBottom: SPACING.lg },
  loadingTitle: { ...FONTS.h2, color: COLORS.text, textAlign: 'center' },
  loadingSubtext: { ...FONTS.bodySm, color: COLORS.textMuted, marginTop: SPACING.md },
  content: { flex: 1, paddingTop: SPACING.lg },
  step: { ...FONTS.overline, color: COLORS.primaryLight, textAlign: 'center', marginBottom: SPACING.lg },
  header: { alignItems: 'center', marginBottom: SPACING.lg },
  signSymbol: { fontSize: 48, marginBottom: SPACING.sm },
  personalityTitle: { ...FONTS.h1, color: COLORS.text, textAlign: 'center' },
  traitsRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: SPACING.sm, marginBottom: SPACING.lg },
  traitPill: {
    backgroundColor: COLORS.primaryMuted,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.primaryGlow,
  },
  traitText: { ...FONTS.bodySm, color: COLORS.primaryLight, fontWeight: '500' },
  descriptionCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  descriptionText: { ...FONTS.body, color: COLORS.textSecondary, lineHeight: 26 },
  note: { ...FONTS.caption, color: COLORS.textMuted, textAlign: 'center', lineHeight: 18 },
  buttons: { gap: SPACING.sm, alignItems: 'center' },
});
