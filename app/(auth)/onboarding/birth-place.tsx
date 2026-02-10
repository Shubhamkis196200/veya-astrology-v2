import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Animated, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CosmicBackground from '../../../src/components/CosmicBackground';
import Button from '../../../src/components/Button';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../src/constants/theme';
import { useOnboardingStore } from '../../../src/stores/onboardingStore';

const { width } = Dimensions.get('window');

// Major cities for quick selection
const POPULAR_CITIES = [
  { name: 'New York, USA', lat: 40.7128, lng: -74.006 },
  { name: 'London, UK', lat: 51.5074, lng: -0.1278 },
  { name: 'Warsaw, Poland', lat: 52.2297, lng: 21.0122 },
  { name: 'Wrocław, Poland', lat: 51.1079, lng: 17.0385 },
  { name: 'Mumbai, India', lat: 19.076, lng: 72.8777 },
  { name: 'Delhi, India', lat: 28.6139, lng: 77.209 },
  { name: 'Los Angeles, USA', lat: 34.0522, lng: -118.2437 },
  { name: 'Paris, France', lat: 48.8566, lng: 2.3522 },
  { name: 'Berlin, Germany', lat: 52.52, lng: 13.405 },
  { name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503 },
  { name: 'Sydney, Australia', lat: -33.8688, lng: 151.2093 },
  { name: 'São Paulo, Brazil', lat: -23.5505, lng: -46.6333 },
  { name: 'Dubai, UAE', lat: 25.2048, lng: 55.2708 },
  { name: 'Toronto, Canada', lat: 43.6532, lng: -79.3832 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'Bangkok, Thailand', lat: 13.7563, lng: 100.5018 },
  { name: 'Moscow, Russia', lat: 55.7558, lng: 37.6173 },
  { name: 'Kraków, Poland', lat: 50.0647, lng: 19.945 },
  { name: 'Chicago, USA', lat: 41.8781, lng: -87.6298 },
  { name: 'Amsterdam, Netherlands', lat: 52.3676, lng: 4.9041 },
];

export default function BirthPlace() {
  const router = useRouter();
  const { data, setField, setStep } = useOnboardingStore();
  const [search, setSearch] = useState(data.birthPlace);
  const [selected, setSelected] = useState(data.birthPlace ? { name: data.birthPlace, lat: data.birthLat, lng: data.birthLng } : null);
  const fadeIn = useRef(new Animated.Value(0)).current;

  const filtered = search.length > 1
    ? POPULAR_CITIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : POPULAR_CITIES.slice(0, 8);

  useEffect(() => {
    setStep(3);
    Animated.timing(fadeIn, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const handleSelect = (city: typeof POPULAR_CITIES[0]) => {
    setSelected(city);
    setSearch(city.name);
  };

  const handleContinue = () => {
    if (selected) {
      setField('birthPlace', selected.name);
      setField('birthLat', selected.lat);
      setField('birthLng', selected.lng);
    } else if (search.trim()) {
      setField('birthPlace', search.trim());
    }
    router.push('/(auth)/onboarding/chart-reveal');
  };

  return (
    <CosmicBackground variant="onboarding">
      <SafeAreaView style={styles.container}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '50%' }]} />
        </View>

        <Animated.View style={[styles.content, { opacity: fadeIn }]}>
          <Text style={styles.step}>Step 4 of 8</Text>
          <Text style={styles.emoji}>🌍</Text>
          <Text style={styles.title}>Where were you born?</Text>
          <Text style={styles.subtitle}>Your birthplace determines your rising sign and planetary house positions.</Text>

          {/* Search */}
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color={COLORS.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search city..."
              placeholderTextColor={COLORS.textMuted}
              value={search}
              onChangeText={(t) => { setSearch(t); setSelected(null); }}
              autoFocus
              selectionColor={COLORS.primary}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => { setSearch(''); setSelected(null); }}>
                <Ionicons name="close-circle" size={20} color={COLORS.textMuted} />
              </TouchableOpacity>
            )}
          </View>

          {/* City List */}
          <FlatList
            data={filtered}
            keyExtractor={item => item.name}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.cityItem, selected?.name === item.name && styles.cityItemSelected]}
                onPress={() => handleSelect(item)}
              >
                <Ionicons
                  name="location"
                  size={18}
                  color={selected?.name === item.name ? COLORS.primaryLight : COLORS.textMuted}
                />
                <Text style={[styles.cityText, selected?.name === item.name && styles.cityTextSelected]}>
                  {item.name}
                </Text>
                {selected?.name === item.name && (
                  <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
                )}
              </TouchableOpacity>
            )}
          />
        </Animated.View>

        <View style={styles.buttons}>
          <Button title="Continue" onPress={handleContinue} disabled={!search.trim()} variant="primary" size="lg" style={{ width: '100%' }} />
          <Button title="Back" onPress={() => router.back()} variant="ghost" size="md" />
        </View>
      </SafeAreaView>
    </CosmicBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xl, justifyContent: 'space-between' },
  progressBar: { height: 3, backgroundColor: COLORS.bgCardHover, borderRadius: 2, marginTop: SPACING.md, marginBottom: SPACING.lg, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 2 },
  content: { flex: 1 },
  step: { ...FONTS.overline, color: COLORS.primaryLight, textAlign: 'center', marginBottom: SPACING.sm },
  emoji: { fontSize: 48, textAlign: 'center', marginBottom: SPACING.md },
  title: { ...FONTS.h2, color: COLORS.text, textAlign: 'center', marginBottom: SPACING.xs },
  subtitle: { ...FONTS.bodySm, color: COLORS.textSecondary, textAlign: 'center', maxWidth: 300, alignSelf: 'center', marginBottom: SPACING.lg },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgInput,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 4,
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  searchInput: { flex: 1, color: COLORS.text, fontSize: 16 },
  list: { flex: 1 },
  cityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm + 4,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    gap: SPACING.sm,
    marginBottom: 2,
  },
  cityItemSelected: { backgroundColor: COLORS.primaryMuted },
  cityText: { ...FONTS.body, color: COLORS.textSecondary, flex: 1 },
  cityTextSelected: { color: COLORS.primaryLight, fontWeight: '500' },
  buttons: { gap: SPACING.sm, alignItems: 'center', paddingTop: SPACING.md },
});
