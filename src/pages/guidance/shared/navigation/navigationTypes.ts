import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { SubscriptionServiceId } from '../../subscription/data/subscriptionCatalog';
import type { EnthusiastLevelId } from '../../stage-challenge/data/enthusiastLevels';

export type MainTabRoute = 'LearningMap' | 'Record' | 'Community' | 'AI' | 'Navigation';

export type RootStackParamList = {
  MainTabs: { tab?: MainTabRoute } | undefined;
  Profile: undefined;
  Subscription: undefined;
  SubscriptionDetail: { serviceId: SubscriptionServiceId };
  Coupon: undefined;
  SuperAdvanced: undefined;
  Advanced: undefined;
  Intermediate: undefined;
  Beginner: undefined;
  Intro: undefined;
  Enthusiast: undefined;
  EnthusiastLevel: { levelId: EnthusiastLevelId };
  ExchangeIsland: undefined;
  Message: undefined;
  Contact: undefined;
};

export type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type NavigationLike = {
  navigate: (...args: any[]) => void;
};

export function navigateToMainTab(navigation: NavigationLike, tab: MainTabRoute) {
  navigation.navigate('MainTabs', { tab });
}
