import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type MainTabRoute = 'LearningMap' | 'Record' | 'Community' | 'AI' | 'Navigation';

export type RootStackParamList = {
  MainTabs: { tab?: MainTabRoute } | undefined;
  Profile: undefined;
  SuperAdvanced: undefined;
  Advanced: undefined;
  Intermediate: undefined;
  Beginner: undefined;
  Intro: undefined;
  Enthusiast: undefined;
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
