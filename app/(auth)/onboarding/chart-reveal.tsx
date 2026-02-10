import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import CosmicBackground from '../../../src/components/CosmicBackground';
import Button from '../../../src/components/Button';
import { COLORS, FONTS, SPACING, RADIUS, ZODIAC } from '../../../src/constants/theme';
import { useOnboardingStore } from '../../../src/stores/onboardingStore';
import { getSunSign, getElementColor } from '../../../src/utils/astrology';

const { width } = Dimensions.get('window');

export default function ChartReveal() {
  const router = useRouter();
  const { data, setField, setStep } = useOnboardingStore();

  // Calculate sign
  const sunSign = data.birthDate ? getSunSign(data.birthDate) : 'aries';
  const signInfo = ZODIAC[sunSign];
  const elementColor = getElementColor(signInfo.element);

  // Animations
  const orbScale = useRef(new Animated.Value(0)).current;
  const orbGlow = useRef(new Animated.Value(0)).current;
  const symbolScale = useRef(new Animated.Value(0)).current;
  const symbolRotate = useRef(new Animated.Value(0)).current;
  const nameOpacity = useRef(new Animated.Value(0)).current;
  const nameSlide = useRef(new Animated.Value(30)).current;
  const detailsOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setStep(4);
    setField('sunSign', sunSign);

    // Epic reveal sequence
    Animated.sequence([
      // 1. Orb appears
      Animated.spring(orbScale, { toValue: 1, tension: 40, friction: 5, useNativeDriver: true }),
      // 2. Glow intensifies
      Animated.timing(orbGlow, { toValue: 1, duration: 500, useNativeDriver: true }),
      // 3. Zodiac symbol spins in
      Animated.parallel([
        Animated.spring(symbolScale, { toValue: 1, tension: 60, friction: 6, useNativeDriver: true }),
        Animated.timing(symbolRotate, { toValue: 1, duration: 800, useNativeDriver: true }),
      ]),
      // 4. Haptic + Name reveals
      Animated.parallel([
        Animated.timing(nameOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(nameSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
      // 5. Details fade in
      Animated.timing(detailsOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      // 6. Button
      Animated.timing(buttonOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();

    // Haptic on reveal
    setTimeout(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success), 1200);
  }, []);

  const spin = symbolRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <CosmicBackground variant="reveal">
      <SafeAreaView style={styles.container}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '62.5%' }]} />
        </View>

        <View style={styles.content}>
          {/* Cosmic Orb */}
          <Animated.View style={[styles.orbOuter, { transform: [{ scale: orbScale }] }]}>
            <Animated.View style={[styles.orbGlow, { opacity: orbGlow, backgroundColor: elementColor }]} />
            <View style={[styles.orbInner, { borderColor: elementColor }]}>
              <Animated.Text style={[styles.symbol, { transform: [{ scale: symbolScale }, { rotate: spin }] }]}>
                {signInfo.symbol}
              </Animated.Text>
            </View>
          </Animated.View>

          {/* Sign Name */}
          <Animated.View style={{ opacity: nameOpacity, transform: [{ translateY: nameSlide }] }}>
            <Text style={styles.greeting}>
              {data.name}, you are a
            </Text>
            <Text style={[styles.signName, { color: elementColor }]}>
              {signInfo.name}
            </Text>
            <Text style={styles.signDates}>{signInfo.dates}</Text>
          </Animated.View>

          {/* Details */}
          <Animated.View style={[styles.detailsGrid, { opacity: detailsOpacity }]}>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>Element</Text>
              <Text style={[styles.detailValue, { color: elementColor }]}>
                {signInfo.element.charAt(0).toUpperCase() + signInfo.element.slice(1)}
              </Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>Sun Sign</Text>
              <Text style={styles.detailValue}>{signInfo.symbol} {signInfo.name}</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>Birth Place</Text>
              <Text style={styles.detailValue} numberOfLines={1}>{data.birthPlace || 'Unknown'}</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>Rising Sign</Text>
              <Text style={[styles.detailValue, { color: COLORS.textMuted }]}>
                {data.birthTimeKnown ? 'Calculating...' : 'Needs birth time'}
              </Text>
            </View>
          </Animated.View>
        </View>

        <Animated.View style={[styles.buttons, { opacity: buttonOpacity }]}>
          <Button
            title="Discover Your Full Profile ✨"
            onPress={() => router.push('/(auth)/onboarding/personality')}
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
  progressBar: { height: 3, backgroundColor: COLORS.bgCardHover, borderRadius: 2, marginTop: SPACING.md, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: COLORS.gold, borderRadius: 2 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  orbOuter: { width: 160, height: 160, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.xl },
  orbGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.2,
  },
  orbInner: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  symbol: { fontSize: 64 },
  greeting: { ...FONTS.body, color: COLORS.textSecondary, textAlign: 'center', marginBottom: SPACING.xs },
  signName: { ...FONTS.display, fontSize: 42, textAlign: 'center', marginBottom: SPACING.xs },
  signDates: { ...FONTS.bodySm, color: COLORS.textMuted, textAlign: 'center', marginBottom: SPACING.xl },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    maxWidth: width * 0.85,
    justifyContent: 'center',
  },
  detailCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    minWidth: (width * 0.85 - SPACING.sm) / 2 - 1,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  detailLabel: { ...FONTS.caption, color: COLORS.textMuted, marginBottom: 4 },
  detailValue: { ...FONTS.bodyMd, color: COLORS.text },
  buttons: { alignItems: 'center' },
});
