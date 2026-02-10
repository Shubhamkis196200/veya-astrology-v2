import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS, ZODIAC } from '../../src/constants/theme';
import { useOnboardingStore } from '../../src/stores/onboardingStore';
import { formatDate } from '../../src/utils/astrology';

export default function ProfileScreen() {
  const { data, reset } = useOnboardingStore();
  const signInfo = data.sunSign ? ZODIAC[data.sunSign] : ZODIAC.aries;

  return (
    <View style={styles.container}>
      <LinearGradient colors={COLORS.gradientCosmic as unknown as string[]} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={styles.safe}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          <Text style={styles.title}>Your Profile</Text>

          {/* Avatar */}
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarSymbol}>{signInfo.symbol}</Text>
            </View>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.signLabel}>{signInfo.name} · {signInfo.element}</Text>
          </View>

          {/* Info Cards */}
          <View style={styles.infoCard}>
            <InfoRow icon="sunny" label="Sun Sign" value={signInfo.name} />
            <InfoRow icon="calendar" label="Birth Date" value={data.birthDate ? formatDate(data.birthDate) : '—'} />
            <InfoRow icon="time" label="Birth Time" value={data.birthTimeKnown && data.birthTime ? data.birthTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : 'Unknown'} />
            <InfoRow icon="location" label="Birth Place" value={data.birthPlace || '—'} />
            <InfoRow icon="heart" label="Focus Areas" value={`${data.interests.length} selected`} />
          </View>

          {/* Settings */}
          <View style={styles.infoCard}>
            <TouchableOpacity style={styles.settingsRow}>
              <Ionicons name="notifications-outline" size={20} color={COLORS.textSecondary} />
              <Text style={styles.settingsText}>Notifications</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsRow}>
              <Ionicons name="diamond-outline" size={20} color={COLORS.gold} />
              <Text style={styles.settingsText}>Upgrade to Premium</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.settingsRow, { borderBottomWidth: 0 }]} onPress={() => { reset(); }}>
              <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
              <Text style={[styles.settingsText, { color: COLORS.error }]}>Reset & Start Over</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          </View>

          <Text style={styles.version}>Veya v2.0.0 · Made with ✨</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoLeft}>
        <Ionicons name={icon as any} size={18} color={COLORS.primaryLight} />
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      <Text style={styles.infoValue} numberOfLines={1}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  scroll: { padding: SPACING.lg, paddingBottom: 100 },
  title: { ...FONTS.h2, color: COLORS.text, marginBottom: SPACING.xl },
  avatarSection: { alignItems: 'center', marginBottom: SPACING.xl },
  avatar: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: COLORS.primaryMuted, borderWidth: 2, borderColor: COLORS.primaryGlow,
    justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.md,
    shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 8,
  },
  avatarSymbol: { fontSize: 40 },
  name: { ...FONTS.h2, color: COLORS.text, marginBottom: 4 },
  signLabel: { ...FONTS.bodySm, color: COLORS.textMuted, textTransform: 'capitalize' },
  infoCard: {
    backgroundColor: COLORS.bgCard, borderRadius: RADIUS.lg, padding: SPACING.md,
    borderWidth: 1, borderColor: COLORS.border, marginBottom: SPACING.lg,
  },
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: SPACING.sm + 2, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight,
  },
  infoLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  infoLabel: { ...FONTS.bodySm, color: COLORS.textSecondary },
  infoValue: { ...FONTS.bodyMd, color: COLORS.text, fontSize: 14, maxWidth: 180, textAlign: 'right' },
  settingsRow: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    paddingVertical: SPACING.sm + 4, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight,
  },
  settingsText: { ...FONTS.body, color: COLORS.text, flex: 1 },
  version: { ...FONTS.caption, color: COLORS.textMuted, textAlign: 'center', marginTop: SPACING.lg },
});
