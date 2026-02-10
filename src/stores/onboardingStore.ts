import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ZodiacSign } from '../constants/theme';

export interface OnboardingData {
  name: string;
  birthDate: Date | null;
  birthTime: Date | null;
  birthTimeKnown: boolean;
  birthPlace: string;
  birthLat: number | null;
  birthLng: number | null;
  sunSign: ZodiacSign | null;
  moonSign: ZodiacSign | null;
  risingSign: ZodiacSign | null;
  interests: string[];
}

interface OnboardingStore {
  data: OnboardingData;
  step: number;
  completed: boolean;
  setField: <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => void;
  setStep: (step: number) => void;
  setCompleted: (completed: boolean) => void;
  reset: () => void;
  persist: () => Promise<void>;
  load: () => Promise<boolean>;
}

const DEFAULT_DATA: OnboardingData = {
  name: '',
  birthDate: null,
  birthTime: null,
  birthTimeKnown: true,
  birthPlace: '',
  birthLat: null,
  birthLng: null,
  sunSign: null,
  moonSign: null,
  risingSign: null,
  interests: [],
};

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  data: { ...DEFAULT_DATA },
  step: 0,
  completed: false,

  setField: (key, value) => set(state => ({
    data: { ...state.data, [key]: value },
  })),

  setStep: (step) => set({ step }),
  setCompleted: (completed) => set({ completed }),

  reset: () => set({ data: { ...DEFAULT_DATA }, step: 0, completed: false }),

  persist: async () => {
    const { data, completed } = get();
    await AsyncStorage.setItem('veya_onboarding', JSON.stringify({
      data: {
        ...data,
        birthDate: data.birthDate?.toISOString() || null,
        birthTime: data.birthTime?.toISOString() || null,
      },
      completed,
    }));
  },

  load: async () => {
    try {
      const raw = await AsyncStorage.getItem('veya_onboarding');
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      set({
        data: {
          ...parsed.data,
          birthDate: parsed.data.birthDate ? new Date(parsed.data.birthDate) : null,
          birthTime: parsed.data.birthTime ? new Date(parsed.data.birthTime) : null,
        },
        completed: parsed.completed,
      });
      return parsed.completed;
    } catch {
      return false;
    }
  },
}));
