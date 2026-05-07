import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AIScreen from './src/pages/guidance/chat/AIScreen';
import CommunityScreen from './src/pages/guidance/community/CommunityScreen';
import ExchangeIslandScreen from './src/pages/guidance/community/ExchangeIslandScreen';
import CouponScreen from './src/pages/guidance/coupon/CouponScreen';
import LearningMap from './src/pages/guidance/map/learningMap';
import MessageScreen from './src/pages/guidance/messages/MessageScreen';
import NavigationScreen from './src/pages/guidance/navigation-menu/NavigationScreen';
import RecordScreen from './src/pages/guidance/record/RecordScreen';
import AdvancedScreen from './src/pages/guidance/stage-challenge/screens/AdvancedScreen';
import BeginnerScreen from './src/pages/guidance/stage-challenge/screens/BeginnerScreen';
import EnthusiastLevelScreen from './src/pages/guidance/stage-challenge/screens/EnthusiastLevelScreen';
import EnthusiastScreen from './src/pages/guidance/stage-challenge/screens/EnthusiastScreen';
import IntermediateScreen from './src/pages/guidance/stage-challenge/screens/IntermediateScreen';
import IntroScreen from './src/pages/guidance/stage-challenge/screens/IntroScreen';
import SuperAdvancedScreen from './src/pages/guidance/stage-challenge/screens/SuperAdvancedScreen';
import SubscriptionDetailScreen from './src/pages/guidance/subscription/SubscriptionDetailScreen';
import SubscriptionScreen from './src/pages/guidance/subscription/SubscriptionScreen';
import ProfileScreen from './src/pages/guidance/shared/components/ProfileScreen';
import MainTabsScreen from './src/pages/guidance/shared/navigation/MainTabsScreen';
import { RootStackParamList } from './src/pages/guidance/shared/navigation/navigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

function PlaceholderScreen({ title }: { title: string }) {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderTitle}>{title}</Text>
      <Text style={styles.placeholderText}>叮咚已经为这个页面预留好了位置，后续可以继续补充内容。</Text>
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainTabs">
          <Stack.Screen name="MainTabs" component={MainTabsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: '叮咚档案' }} />
          <Stack.Screen name="Subscription" component={SubscriptionScreen} options={{ title: '订阅充值' }} />
          <Stack.Screen name="SubscriptionDetail" component={SubscriptionDetailScreen} options={{ title: '服务详情' }} />
          <Stack.Screen name="Coupon" component={CouponScreen} options={{ title: '卡券中心' }} />
          <Stack.Screen name="SuperAdvanced" component={SuperAdvancedScreen} options={{ title: '超高级者' }} />
          <Stack.Screen name="Advanced" component={AdvancedScreen} options={{ title: '高级者' }} />
          <Stack.Screen name="Intermediate" component={IntermediateScreen} options={{ title: '中级者' }} />
          <Stack.Screen name="Beginner" component={BeginnerScreen} options={{ title: '初级者' }} />
          <Stack.Screen name="Intro" component={IntroScreen} options={{ title: '入门者' }} />
          <Stack.Screen name="Enthusiast" component={EnthusiastScreen} options={{ title: '叮咚爱好者世界' }} />
          <Stack.Screen name="EnthusiastLevel" component={EnthusiastLevelScreen} options={{ title: '叮咚编程闯关' }} />
          <Stack.Screen name="ExchangeIsland" component={ExchangeIslandScreen} options={{ title: '交流岛' }} />
          <Stack.Screen name="Message" component={MessageScreen} options={{ title: '叮咚消息站' }} />
          <Stack.Screen name="Contact" options={{ title: '联系我们' }}>
            {() => <PlaceholderScreen title="联系叮咚" />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  placeholderTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222',
    marginBottom: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
