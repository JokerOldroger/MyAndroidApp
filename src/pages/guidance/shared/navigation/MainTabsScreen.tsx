import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import AIScreen from '../../chat/AIScreen';
import CommunityScreen from '../../community/CommunityScreen';
import LearningMap from '../../map/learningMap';
import NavigationScreen from '../../navigation-menu/NavigationScreen';
import RecordScreen from '../../record/RecordScreen';
import MainTabBar from '../components/MainTabBar';
import { MainTabRoute, RootStackParamList } from './navigationTypes';

type MainTabsScreenProps = NativeStackScreenProps<RootStackParamList, 'MainTabs'>;

const tabScreens: Record<MainTabRoute, React.ComponentType<{ navigation: MainTabsScreenProps['navigation'] }>> = {
  LearningMap,
  Record: RecordScreen,
  Community: CommunityScreen,
  AI: AIScreen,
  Navigation: NavigationScreen,
};

export default function MainTabsScreen({ navigation, route }: MainTabsScreenProps) {
  const currentTab = route.params?.tab ?? 'LearningMap';
  const ScreenComponent = tabScreens[currentTab];

  return (
    <View style={styles.container}>
      <View style={styles.sceneContainer}>
        <ScreenComponent navigation={navigation} />
      </View>

      <MainTabBar currentRoute={currentTab} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FC',
  },
  sceneContainer: {
    flex: 1,
  },
});
