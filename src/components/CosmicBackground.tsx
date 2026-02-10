import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/theme';

const { width, height } = Dimensions.get('window');

// Animated cosmic star particle
function Star({ delay, size, x, y, duration }: { delay: number; size: number; x: number; y: number; duration: number }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(opacity, { toValue: 0.8, duration: duration * 0.4, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 1, duration: duration * 0.4, useNativeDriver: true }),
        ]),
        Animated.delay(duration * 0.2),
        Animated.parallel([
          Animated.timing(opacity, { toValue: 0, duration: duration * 0.4, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 0.3, duration: duration * 0.4, useNativeDriver: true }),
        ]),
      ]).start(() => animate());
    };
    animate();
  }, []);

  return (
    <Animated.View
      style={[
        styles.star,
        {
          left: x,
          top: y,
          width: size,
          height: size,
          borderRadius: size / 2,
          opacity,
          transform: [{ scale }],
          backgroundColor: Math.random() > 0.5 ? COLORS.primaryLight : COLORS.secondaryLight,
        },
      ]}
    />
  );
}

// Animated glowing orb
function GlowOrb({ color, size, x, y }: { color: string; size: number; x: number; y: number }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.3, duration: 3000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 3000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity: 0.15,
        transform: [{ scale: pulseAnim }],
      }}
    />
  );
}

interface Props {
  children: React.ReactNode;
  variant?: 'default' | 'onboarding' | 'reveal';
}

export default function CosmicBackground({ children, variant = 'default' }: Props) {
  // Generate random stars
  const stars = useRef(
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      delay: Math.random() * 4000,
      duration: Math.random() * 3000 + 2000,
    }))
  ).current;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={variant === 'reveal' 
          ? ['#0A0020', '#1A0A3E', '#0D0D2B']
          : [COLORS.bg, COLORS.bgSecondary, COLORS.bgTertiary]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Ambient glow orbs */}
      <GlowOrb color={COLORS.primary} size={300} x={width * 0.2} y={height * 0.15} />
      <GlowOrb color={COLORS.secondary} size={200} x={width * 0.8} y={height * 0.6} />
      {variant === 'reveal' && (
        <GlowOrb color={COLORS.gold} size={250} x={width * 0.5} y={height * 0.4} />
      )}

      {/* Stars */}
      {stars.map(star => (
        <Star key={star.id} {...star} />
      ))}

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  star: {
    position: 'absolute',
  },
});
