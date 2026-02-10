import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING } from '../../src/constants/theme';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={COLORS.gradientCosmic as unknown as string[]} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={styles.safe}>
        <Text style={styles.title}>Ask Veya</Text>
        <View style={styles.center}>
          <Text style={styles.emoji}>🔮</Text>
          <Text style={styles.heading}>AI Chat Coming Soon</Text>
          <Text style={styles.subtitle}>Your personal AI astrologer that learns from every conversation.</Text>
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
