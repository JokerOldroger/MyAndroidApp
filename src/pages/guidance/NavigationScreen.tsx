import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AppNavigationProp, MainTabRoute, navigateToMainTab } from './navigationTypes';

type NavigationScreenProps = {
  navigation: AppNavigationProp;
};

type QuickAction =
  | {
      label: string;
      icon: any;
      type: 'screen';
      target: 'Contact';
    }
  | {
      label: string;
      icon: any;
      type: 'tab';
      target: MainTabRoute;
    };

const quickActions: QuickAction[] = [
  { label: '订阅充值', icon: require('../../../assets/dingyueguanli.png'), target: 'Contact', type: 'screen' },
  { label: '卡券', icon: require('../../../assets/kabao.png'), target: 'LearningMap', type: 'tab' },
  { label: '记录', icon: require('../../../assets/jilu.png'), target: 'Record', type: 'tab' },
];

export default function NavigationScreen({ navigation }: NavigationScreenProps) {
  function openQuickAction(item: QuickAction) {
    if (item.type === 'tab') {
      navigateToMainTab(navigation, item.target);
      return;
    }

    navigation.navigate(item.target);
  }

  return (
    <SafeAreaView style={styles.root}>
      <ImageBackground
        source={require('../../../assets/guidance/bg.png')}
        style={styles.background}
        imageStyle={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.scrim} />

        <View style={styles.profileRow}>
          <Pressable
            style={styles.avatarWrap}
            onPress={() => navigation.navigate('Profile')}
            accessibilityRole="button"
            accessibilityLabel="打开个人资料"
          >
            <Image source={require('../../../assets/touxiang.png')} style={styles.avatar} />
          </Pressable>
          <View>
            <Text style={styles.name}>Cher</Text>
            <Text style={styles.id}>ID:111111</Text>
          </View>
        </View>

        <View style={styles.bottomPanel}>
          <View style={styles.quickActionRow}>
            {quickActions.map((item) => (
              <Pressable
                key={item.label}
                style={styles.quickAction}
                onPress={() => openQuickAction(item)}
                accessibilityRole="button"
                accessibilityLabel={`打开${item.label}`}
              >
                <Image source={item.icon} style={styles.quickIcon} />
                <Text style={styles.quickLabel}>{item.label}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.menuStack}>
            <Pressable
              style={styles.menuButton}
              onPress={() => navigation.navigate('Profile')}
              accessibilityRole="button"
              accessibilityLabel="打开个人信息"
            >
              <Text style={styles.menuText}>个人信息</Text>
            </Pressable>
            <Pressable
              style={styles.menuButton}
              onPress={() => navigateToMainTab(navigation, 'Record')}
              accessibilityRole="button"
              accessibilityLabel="打开战绩查看"
            >
              <Text style={styles.menuText}>战绩查看</Text>
            </Pressable>
            <Pressable
              style={styles.menuButton}
              onPress={() => navigateToMainTab(navigation, 'AI')}
              accessibilityRole="button"
              accessibilityLabel="打开AI助手"
            >
              <Text style={styles.menuText}>AI助手</Text>
            </Pressable>
            <Pressable
              style={styles.menuButton}
              onPress={() => navigation.navigate('Message')}
              accessibilityRole="button"
              accessibilityLabel="打开消息中心"
            >
              <Text style={styles.menuText}>消息</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#080517',
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.98,
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(4, 2, 16, 0.08)',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 34,
    paddingTop: 44,
    gap: 18,
  },
  avatarWrap: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.42)',
  },
  name: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 31,
    fontWeight: '300',
    letterSpacing: 0,
  },
  id: {
    marginTop: 7,
    color: 'rgba(255,255,255,0.74)',
    fontSize: 18,
    letterSpacing: 0,
  },
  bottomPanel: {
    marginTop: 'auto',
    paddingHorizontal: 34,
    paddingBottom: 112,
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
    tintColor: '#1B2BAA',
    marginBottom: 8,
  },
  quickLabel: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
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
    backgroundColor: 'rgba(231,232,238,0.88)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.48)',
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '700',
    letterSpacing: 0,
    textShadowColor: 'rgba(20, 20, 35, 0.24)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
