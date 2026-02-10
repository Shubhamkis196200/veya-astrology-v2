import { COLORS } from '../constants/theme';

export const config = {
  supabase: {
    url: process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://hklobvemixzzivdcrgbk.supabase.co',
    anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrbG9idmVtaXh6eml2ZGNyZ2JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3NTE3OTgsImV4cCI6MjA4NjMyNzc5OH0.TJvknLpBzKxirJa3ibwpWRijFQTAKJCsyMDoerEelRM',
  },
  openai: {
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY || '',
  },
};
