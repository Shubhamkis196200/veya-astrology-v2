import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import CosmicBackground from '../../../src/components/CosmicBackground';
import Button from '../../../src/components/Button';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../src/constants/theme';
import { useOnboardingStore } from '../../../src/stores/onboardingStore';
import { formatDate } from '../../../src/utils/astrology';

export default function BirthDate() {
  const router = useRouter();
  const { data, setField, setStep } = useOnboardingStore();
  const [date, setDate] = useState(data.birthDate || new Date(2000, 0, 1));
  const [showPicker, setShowPicker] = useState(Platform.OS === 'ios');
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setStep(1);
    Animated.timing(fadeIn, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const handleContinue = () => {
    setField('birthDate', date);
    router.push('/(auth)/onboarding/birth-time');
  };

  return (
    <CosmicBackground variant="onboarding">
      <SafeAreaView style={styles.container}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '25%' }]} />
        </View>

        <Animated.View style={[styles.content, { opacity: fadeIn }]}>
          <Text style={styles.step}>Step 2 of 8</Text>
          <Text style={styles.emoji}>🌟</Text>
          <Text style={styles.title}>When were you born?</Text>
          <Text style={styles.subtitle}>Your birth date reveals your sun sign — the core of your cosmic identity.</Text>

          {Platform.OS === 'android' && !showPicker && (
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)}>
              <Text style={styles.dateButtonText}>{formatDate(date)}</Text>
            </TouchableOpacity>
          )}

          {showPicker && (
            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                maximumDate={new Date()}
                minimumDate={new Date(1920, 0, 1)}
                onChange={(_, selected) => {
                  if (Platform.OS === 'android') setShowPicker(false);
                  if (selected) setDate(selected);
                }}
                textColor={COLORS.text}
                themeVariant="dark"
              />
            </View>
          )}

          <View style={styles.selectedDate}>
            <Text style={styles.selectedDateText}>{formatDate(date)}</Text>
          </View>
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
  pickerContainer: { marginVertical: SPACING.lg },
  dateButton: {
    backgroundColor: COLORS.bgInput,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md + 2,
  },
  dateButtonText: { ...FONTS.bodyLg, color: COLORS.text, fontWeight: '500' },
  selectedDate: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.primaryMuted,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2,
  },
  selectedDateText: { ...FONTS.bodyMd, color: COLORS.primaryLight },
  buttons: { gap: SPACING.sm, alignItems: 'center' },
});
