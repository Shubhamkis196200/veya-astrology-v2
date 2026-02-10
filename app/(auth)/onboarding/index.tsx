import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Animated, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CosmicBackground from '../../../src/components/CosmicBackground';
import Button from '../../../src/components/Button';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../src/constants/theme';
import { useOnboardingStore } from '../../../src/stores/onboardingStore';

const { width } = Dimensions.get('window');

export default function OnboardingName() {
  const router = useRouter();
  const { data, setField, setStep } = useOnboardingStore();
  const [name, setName] = useState(data.name);
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    setStep(0);
    Animated.parallel([
      Animated.timing(fadeIn, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideUp, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleContinue = () => {
    setField('name', name.trim());
    router.push('/(auth)/onboarding/birth-date');
  };

  return (
    <CosmicBackground variant="onboarding">
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
          {/* Progress */}
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '12.5%' }]} />
          </View>

          <Animated.View style={[styles.content, { opacity: fadeIn, transform: [{ translateY: slideUp }] }]}>
            <Text style={styles.step}>Step 1 of 8</Text>
            <Text style={styles.emoji}>✨</Text>
            <Text style={styles.title}>What's your name?</Text>
            <Text style={styles.subtitle}>This is how Veya will greet you on your cosmic journey.</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor={COLORS.textMuted}
              value={name}
              onChangeText={setName}
              autoFocus
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => name.trim() && handleContinue()}
              selectionColor={COLORS.primary}
            />
          </Animated.View>

          <View style={styles.buttons}>
            <Button
              title="Continue"
              onPress={handleContinue}
              disabled={!name.trim()}
              variant="primary"
              size="lg"
              style={{ width: '100%' }}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </CosmicBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: SPACING.lg },
  flex: { flex: 1, justifyContent: 'space-between', paddingBottom: SPACING.xl },
  progressBar: {
    height: 3,
    backgroundColor: COLORS.bgCardHover,
    borderRadius: 2,
    marginTop: SPACING.md,
    marginBottom: SPACING.xxl,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  step: { ...FONTS.overline, color: COLORS.primaryLight, marginBottom: SPACING.md },
  emoji: { fontSize: 56, marginBottom: SPACING.lg },
  title: { ...FONTS.h1, color: COLORS.text, textAlign: 'center', marginBottom: SPACING.sm },
  subtitle: { ...FONTS.body, color: COLORS.textSecondary, textAlign: 'center', maxWidth: width * 0.8, marginBottom: SPACING.xxl },
  input: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: COLORS.bgInput,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md + 2,
    color: COLORS.text,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
  buttons: { gap: SPACING.md },
});
