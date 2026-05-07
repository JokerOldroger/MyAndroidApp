import AsyncStorage from '@react-native-async-storage/async-storage';

import { CompetitionRegion } from '../types';

const REGION_KEY = 'dingdong.message.region';
const REMINDER_KEY = 'dingdong.message.reminders';

export async function loadSelectedRegion(): Promise<CompetitionRegion> {
  const value = await AsyncStorage.getItem(REGION_KEY);
  if (value === '深圳' || value === '上海' || value === '北京' || value === '全部') {
    return value;
  }
  return '深圳';
}

export async function saveSelectedRegion(region: CompetitionRegion) {
  await AsyncStorage.setItem(REGION_KEY, region);
}

export async function loadReminderIds(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(REMINDER_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveReminderIds(ids: string[]) {
  await AsyncStorage.setItem(REMINDER_KEY, JSON.stringify(ids));
}
