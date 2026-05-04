import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Record: undefined;
  Message: undefined;
  Contact: undefined;
  AI: undefined;
};

type NavigationScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const quickActions = [
  { label: '订阅充值', icon: require('../../../assets/dingyueguanli.png'), screen: 'Contact' },
  { label: '卡券', icon: require('../../../assets/kabao.png'), screen: 'Home' },
  { label: '记录', icon: require('../../../assets/jilu.png'), screen: 'Record' },
] as const;

const menuItems = [
  { label: '个人信息', screen: 'Profile' },
  { label: '战绩查看', screen: 'Record' },
  { label: 'Ai助手', screen: 'AI' },
  { label: '消息', screen: 'Message' },
] as const;

export default function NavigationScreen({ navigation }: NavigationScreenProps) {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.phoneFrame}>
        <ImageBackground
          source={require('../../../assets/guidance/bg.png')}
          style={styles.background}
          imageStyle={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.scrim} />

          <View style={styles.profileRow}>
            <Image source={require('../../../assets/touxiang.png')} style={styles.avatar} />
            <View>
              <Text style={styles.name}>Cher</Text>
              <Text style={styles.id}>ID:111111</Text>
            </View>
          </View>

          <View style={styles.bottomPanel}>
            <View style={styles.quickActionRow}>
              {quickActions.map((item) => (
                <TouchableOpacity
                  key={item.label}
                  activeOpacity={0.82}
                  style={styles.quickAction}
                  onPress={() => navigation.navigate(item.screen)}
                >
                  <Image source={item.icon} style={styles.quickIcon} />
                  <Text style={styles.quickLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.menuStack}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.label}
                  activeOpacity={0.84}
                  style={styles.menuButton}
                  onPress={() => navigation.navigate(item.screen)}
                >
                  <Text style={styles.menuText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#050313',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneFrame: {
    flex: 1,
    width: '100%',
    maxWidth: 430,
    overflow: 'hidden',
    backgroundColor: '#050313',
  },
  background: {
    flex: 1,
    justifyContent: 'space-between',
  },
  backgroundImage: {
    opacity: 0.98,
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(3, 2, 16, 0.08)',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 34,
    paddingTop: 46,
    gap: 18,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.42)',
  },
  name: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 31,
    fontWeight: '300',
    letterSpacing: 0,
  },
  id: {
    marginTop: 7,
    color: 'rgba(255,255,255,0.72)',
    fontSize: 18,
    letterSpacing: 0,
  },
  bottomPanel: {
    paddingHorizontal: 34,
    paddingBottom: 38,
  },
  quickActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  quickAction: {
    width: '30%',
    alignItems: 'center',
  },
  quickIcon: {
    width: 58,
    height: 58,
    resizeMode: 'contain',
    tintColor: '#1628a8',
    marginBottom: 8,
  },
  quickLabel: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  menuStack: {
    gap: 13,
  },
  menuButton: {
    minHeight: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(231,232,238,0.82)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.46)',
  },
  menuText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '700',
    letterSpacing: 0,
    textShadowColor: 'rgba(20, 20, 35, 0.24)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
