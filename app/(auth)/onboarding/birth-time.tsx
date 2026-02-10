import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import CosmicBackground from '../../../src/components/CosmicBackground';
import Button from '../../../src/components/Button';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../src/constants/theme';
import { useOnboardingStore } from '../../../src/stores/onboardingStore';
import { formatTime } from '../../../src/utils/astrology';

export default function BirthTime() {
  const router = useRouter();
  const { data, setField, setStep } = useOnboardingStore();
  const [time, setTime] = useState(data.birthTime || new Date(2000, 0, 1, 12, 0));
  const [showPicker, setShowPicker] = useState(Platform.OS === 'ios');
  const [timeKnown, setTimeKnown] = useState(data.birthTimeKnown);
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setStep(2);
    Animated.timing(fadeIn, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const handleContinue = () => {
    setField('birthTimeKnown', timeKnown);
    setField('birthTime', timeKnown ? time : null);
    router.push('/(auth)/onboarding/birth-place');
  };

  return (
    <CosmicBackground variant="onboarding">
      <SafeAreaView style={styles.container}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '37.5%' }]} />
        </View>

        <Animated.View style={[styles.content, { opacity: fadeIn }]}>
          <Text style={styles.step}>Step 3 of 8</Text>
          <Text style={styles.emoji}>🕐</Text>
          <Text style={styles.title}>What time were{'\n'}you born?</Text>
          <Text style={styles.subtitle}>Birth time reveals your rising sign and houses — the blueprint of your cosmic personality.</Text>

          {/* Toggle */}
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[styles.toggleBtn, timeKnown && styles.toggleActive]}
              onPress={() => setTimeKnown(true)}
            >
              <Text style={[styles.toggleText, timeKnown && styles.toggleTextActive]}>I know my time</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleBtn, !timeKnown && styles.toggleActive]}
              onPress={() => setTimeKnown(false)}
            >
              <Text style={[styles.toggleText, !timeKnown && styles.toggleTextActive]}>I'm not sure</Text>
            </TouchableOpacity>
          </View>

          {timeKnown ? (
            <>
              {Platform.OS === 'android' && !showPicker && (
                <TouchableOpacity style={styles.timeButton} onPress={() => setShowPicker(true)}>
                  <Text style={styles.timeButtonText}>{formatTime(time)}</Text>
                </TouchableOpacity>
              )}
              {showPicker && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(_, selected) => {
                    if (Platform.OS === 'android') setShowPicker(false);
                    if (selected) setTime(selected);
                  }}
                  textColor={COLORS.text}
                  themeVariant="dark"
                />
              )}
              <View style={styles.selectedTime}>
                <Text style={styles.selectedTimeText}>{formatTime(time)}</Text>
              </View>
            </>
          ) : (
            <View style={styles.unknownCard}>
              <Text style={styles.unknownEmoji}>🌙</Text>
              <Text style={styles.unknownTitle}>That's okay!</Text>
              <Text style={styles.unknownText}>We'll use noon as default. Your sun sign and core readings will still be highly accurate. Rising sign calculations may be approximate.</Text>
            </View>
          )}
        </Animated.View>

        <View style={styles.buttons}>
          <Button title="Continue" onPress={handleContinue} variant="primary" size="lg" style={{ width: '100%' }} />
          <Button title="Back" onPress={() => router.back()} variant="ghost" size="md" />
        </View>
      </SafeAreaView>
    </CosmicBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xl, justifyContent: 'space-between' },
  progressBar: { height: 3, backgroundColor: COLORS.bgCardHover, borderRadius: 2, marginTop: SPACING.md, marginBottom: SPACING.xxl, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 2 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  step: { ...FONTS.overline, color: COLORS.primaryLight, marginBottom: SPACING.md },
  emoji: { fontSize: 56, marginBottom: SPACING.lg },
  title: { ...FONTS.h1, color: COLORS.text, textAlign: 'center', marginBottom: SPACING.sm },
  subtitle: { ...FONTS.body, color: COLORS.textSecondary, textAlign: 'center', maxWidth: 320, marginBottom: SPACING.xl },
  toggleRow: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.xl },
  toggleBtn: {
    backgroundColor: COLORS.bgInput,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xl,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 4,
  },
  toggleActive: { backgroundColor: COLORS.primaryMuted, borderColor: COLORS.primary },
  toggleText: { ...FONTS.bodySm, color: COLORS.textMuted, fontWeight: '500' },
  toggleTextActive: { color: COLORS.primaryLight },
  timeButton: {
    backgroundColor: COLORS.bgInput,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
  },
  timeButtonText: { ...FONTS.bodyLg, color: COLORS.text, fontWeight: '500' },
  selectedTime: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.primaryMuted,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2,
  },
  selectedTimeText: { ...FONTS.bodyMd, color: COLORS.primaryLight },
  unknownCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    maxWidth: 320,
  },
  unknownEmoji: { fontSize: 36, marginBottom: SPACING.sm },
  unknownTitle: { ...FONTS.h3, color: COLORS.text, marginBottom: SPACING.xs },
  unknownText: { ...FONTS.bodySm, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 20 },
  buttons: { gap: SPACING.sm, alignItems: 'center' },
});
