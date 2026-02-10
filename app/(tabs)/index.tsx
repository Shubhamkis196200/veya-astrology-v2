import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, FONTS, SPACING, RADIUS, ZODIAC } from '../../src/constants/theme';
import { useOnboardingStore } from '../../src/stores/onboardingStore';

const { width } = Dimensions.get('window');

export default function TodayScreen() {
  const router = useRouter();
  const { data } = useOnboardingStore();
  const [refreshing, setRefreshing] = useState(false);
  const signInfo = data.sunSign ? ZODIAC[data.sunSign] : ZODIAC.aries;

  const today = new Date();
  const greeting = today.getHours() < 12 ? 'Good morning' : today.getHours() < 18 ? 'Good afternoon' : 'Good evening';
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  // Placeholder reading (will be replaced with AI + RAG)
  const [reading] = useState({
    message: "The cosmos is aligning in interesting ways today. Trust your intuition — it's sharper than usual. A creative opportunity may present itself this afternoon. Stay open to unexpected connections.",
    energy: 78,
    luckyNumber: 7,
    luckyColor: 'Amethyst',
    focus: 'Communication',
    mood: '✨ Inspired',
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // TODO: Fetch from AI with RAG
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient colors={COLORS.gradientCosmic as unknown as string[]} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={styles.safe}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>{greeting}, {data.name} ✨</Text>
              <Text style={styles.date}>{dateStr}</Text>
            </View>
            <View style={styles.signBadge}>
              <Text style={styles.signBadgeText}>{signInfo.symbol} {signInfo.name}</Text>
            </View>
          </View>

          {/* Daily Reading Card */}
          <View style={styles.readingCard}>
            <LinearGradient
              colors={['rgba(139, 92, 246, 0.12)', 'rgba(6, 182, 212, 0.06)']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <View style={styles.readingHeader}>
              <Text style={styles.readingIcon}>🔮</Text>
              <View>
                <Text style={styles.readingTitle}>Your Daily Reading</Text>
                <Text style={styles.readingSubtitle}>Personalized for you</Text>
              </View>
            </View>

            <Text style={styles.readingText}>{reading.message}</Text>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Energy</Text>
                <View style={styles.energyBarBg}>
                  <View style={[styles.energyBarFill, { width: `${reading.energy}%` }]} />
                </View>
                <Text style={styles.statValue}>{reading.energy}%</Text>
              </View>
            </View>

            <View style={styles.miniStats}>
              <View style={styles.miniStat}>
                <Text style={styles.miniStatEmoji}>🔢</Text>
                <Text style={styles.miniStatLabel}>Lucky</Text>
                <Text style={styles.miniStatValue}>{reading.luckyNumber}</Text>
              </View>
              <View style={styles.miniStat}>
                <Text style={styles.miniStatEmoji}>💎</Text>
                <Text style={styles.miniStatLabel}>Color</Text>
                <Text style={styles.miniStatValue}>{reading.luckyColor}</Text>
              </View>
              <View style={styles.miniStat}>
                <Text style={styles.miniStatEmoji}>🎯</Text>
                <Text style={styles.miniStatLabel}>Focus</Text>
                <Text style={styles.miniStatValue}>{reading.focus}</Text>
              </View>
              <View style={styles.miniStat}>
                <Text style={styles.miniStatEmoji}>💫</Text>
                <Text style={styles.miniStatLabel}>Mood</Text>
                <Text style={styles.miniStatValue}>{reading.mood}</Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actions}>
            {[
              { icon: 'chatbubble-ellipses', color: COLORS.primary, bg: COLORS.primaryMuted, label: 'Ask Veya', tab: 'chat' },
              { icon: 'planet', color: COLORS.secondary, bg: 'rgba(6,182,212,0.15)', label: 'My Chart', tab: 'explore' },
              { icon: 'moon', color: COLORS.gold, bg: 'rgba(245,158,11,0.15)', label: 'Rituals', tab: 'rituals' },
            ].map((item) => (
              <TouchableOpacity
                key={item.label}
                style={styles.actionCard}
                onPress={() => router.push(`/(tabs)/${item.tab}` as any)}
                activeOpacity={0.7}
              >
                <View style={[styles.actionIconBg, { backgroundColor: item.bg }]}>
                  <Ionicons name={item.icon as any} size={24} color={item.color} />
                </View>
                <Text style={styles.actionLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Morning Ritual CTA */}
          <TouchableOpacity style={styles.ritualCta} activeOpacity={0.8}>
            <LinearGradient
              colors={COLORS.gradientSunrise as unknown as string[]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[StyleSheet.absoluteFill, { borderRadius: RADIUS.lg }]}
            />
            <View style={styles.ritualCtaContent}>
              <Text style={styles.ritualCtaEmoji}>🌅</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.ritualCtaTitle}>Morning Ritual</Text>
                <Text style={styles.ritualCtaText}>Set your intention for today</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.7)" />
            </View>
          </TouchableOpacity>

          {/* Cosmic Tip */}
          <View style={styles.tipCard}>
            <Text style={styles.tipEmoji}>💡</Text>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Tip</Text>
              <Text style={styles.tipText}>Pull to refresh for a new cosmic perspective. The more you use Veya, the more personal your readings become.</Text>
            </View>
          </View>

          <View style={{ height: 20 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  scroll: { padding: SPACING.lg, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: SPACING.xl },
  greeting: { ...FONTS.h2, color: COLORS.text, marginBottom: 4 },
  date: { ...FONTS.bodySm, color: COLORS.textMuted },
  signBadge: { backgroundColor: COLORS.primaryMuted, paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20 },
  signBadgeText: { ...FONTS.caption, color: COLORS.primaryLight, fontWeight: '600' },

  readingCard: {
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  readingHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.md },
  readingIcon: { fontSize: 32 },
  readingTitle: { ...FONTS.h3, color: COLORS.text },
  readingSubtitle: { ...FONTS.caption, color: COLORS.textMuted },
  readingText: { ...FONTS.body, color: COLORS.textSecondary, lineHeight: 26, marginBottom: SPACING.lg },

  statsRow: { marginBottom: SPACING.md },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  statLabel: { ...FONTS.caption, color: COLORS.textMuted, width: 50 },
  statValue: { ...FONTS.caption, color: COLORS.primaryLight, fontWeight: '600', width: 36 },
  energyBarBg: { flex: 1, height: 6, backgroundColor: COLORS.bgInput, borderRadius: 3 },
  energyBarFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 3 },

  miniStats: { flexDirection: 'row', gap: SPACING.sm },
  miniStat: { flex: 1, backgroundColor: COLORS.bgCard, borderRadius: RADIUS.md, padding: SPACING.sm + 2, alignItems: 'center' },
  miniStatEmoji: { fontSize: 18, marginBottom: 4 },
  miniStatLabel: { ...FONTS.caption, color: COLORS.textMuted, fontSize: 10, marginBottom: 2 },
  miniStatValue: { ...FONTS.caption, color: COLORS.text, fontWeight: '600', fontSize: 11, textAlign: 'center' },

  sectionTitle: { ...FONTS.h3, color: COLORS.text, marginBottom: SPACING.md },
  actions: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.xl },
  actionCard: { flex: 1, backgroundColor: COLORS.bgCard, borderRadius: RADIUS.lg, padding: SPACING.md, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  actionIconBg: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm },
  actionLabel: { ...FONTS.caption, color: COLORS.text, fontWeight: '500' },

  ritualCta: { borderRadius: RADIUS.lg, marginBottom: SPACING.lg, overflow: 'hidden' },
  ritualCtaContent: { flexDirection: 'row', alignItems: 'center', padding: SPACING.md + 4, gap: SPACING.sm },
  ritualCtaEmoji: { fontSize: 28 },
  ritualCtaTitle: { ...FONTS.bodyMd, color: '#fff' },
  ritualCtaText: { ...FONTS.caption, color: 'rgba(255,255,255,0.7)' },

  tipCard: {
    backgroundColor: 'rgba(245,158,11,0.08)',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    flexDirection: 'row',
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.15)',
  },
  tipEmoji: { fontSize: 20 },
  tipContent: { flex: 1 },
  tipTitle: { ...FONTS.caption, color: COLORS.gold, fontWeight: '600', marginBottom: 2 },
  tipText: { ...FONTS.caption, color: COLORS.textSecondary, lineHeight: 18 },
});
