import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/pages/HomeScreen';
import ProfileScreen from './src/pages/ProfileScreen';
import RecordScreen from './src/pages/RecordScreen';

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Record: undefined;
  Message: undefined;
  Contact: undefined;
  AI: undefined;
};

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
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: '个人信息' }} />
          <Stack.Screen name="Record" component={RecordScreen} options={{ title: '战绩查看' }} />
          <Stack.Screen name="Message" options={{ title: '消息' }}>
            {() => <PlaceholderScreen title="消息" />}
          </Stack.Screen>
          <Stack.Screen name="Contact" options={{ title: '联系我们' }}>
            {() => <PlaceholderScreen title="联系我们" />}
          </Stack.Screen>
          <Stack.Screen name="AI" options={{ title: 'AI助手' }}>
            {() => <PlaceholderScreen title="AI助手" />}
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
