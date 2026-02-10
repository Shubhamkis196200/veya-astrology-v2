import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING } from '../../src/constants/theme';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={COLORS.gradientCosmic as unknown as string[]} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={styles.safe}>
        <Text style={styles.title}>Explore</Text>
        <View style={styles.center}>
          <Text style={styles.emoji}>🌌</Text>
          <Text style={styles.heading}>Birth Chart & Transits</Text>
          <Text style={styles.subtitle}>3D interactive birth chart, compatibility engine, and real-time transit tracking.</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, padding: SPACING.lg },
  title: { ...FONTS.h2, color: COLORS.text, marginBottom: SPACING.lg },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emoji: { fontSize: 64, marginBottom: SPACING.lg },
  heading: { ...FONTS.h2, color: COLORS.text, marginBottom: SPACING.sm },
  subtitle: { ...FONTS.body, color: COLORS.textSecondary, textAlign: 'center', maxWidth: 280 },
});
