import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabsScreen from './src/pages/guidance/MainTabsScreen';
import ProfileScreen from './src/pages/guidance/ProfileScreen';
import SuperAdvancedScreen from './src/pages/guidance/SuperAdvancedScreen';
import AdvancedScreen from './src/pages/guidance/AdvancedScreen';
import IntermediateScreen from './src/pages/guidance/IntermediateScreen';
import BeginnerScreen from './src/pages/guidance/BeginnerScreen';
import IntroScreen from './src/pages/guidance/IntroScreen';
import EnthusiastScreen from './src/pages/guidance/EnthusiastScreen';
import ExchangeIslandScreen from './src/pages/guidance/ExchangeIslandScreen';
import { RootStackParamList } from './src/pages/guidance/navigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

function PlaceholderScreen({ title }: { title: string }) {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderTitle}>{title}</Text>
      <Text style={styles.placeholderText}>This page is ready for content.</Text>
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainTabs">
          <Stack.Screen name="MainTabs" component={MainTabsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: '个人信息' }} />
          <Stack.Screen name="SuperAdvanced" component={SuperAdvancedScreen} options={{ title: '超高级者' }} />
          <Stack.Screen name="Advanced" component={AdvancedScreen} options={{ title: '高级者' }} />
          <Stack.Screen name="Intermediate" component={IntermediateScreen} options={{ title: '中级者' }} />
          <Stack.Screen name="Beginner" component={BeginnerScreen} options={{ title: '初级者' }} />
          <Stack.Screen name="Intro" component={IntroScreen} options={{ title: '入门者' }} />
          <Stack.Screen name="Enthusiast" component={EnthusiastScreen} options={{ title: '爱好者' }} />
          <Stack.Screen name="ExchangeIsland" component={ExchangeIslandScreen} options={{ title: '交流岛' }} />
          <Stack.Screen name="Message" options={{ title: '消息' }}>
            {() => <PlaceholderScreen title="消息" />}
          </Stack.Screen>
          <Stack.Screen name="Contact" options={{ title: '联系我们' }}>
            {() => <PlaceholderScreen title="联系我们" />}
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

