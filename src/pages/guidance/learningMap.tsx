import React from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView, ImageBackground, Image } from 'react-native';

import { AppNavigationProp } from './navigationTypes';

type LearningMapProps = {
  navigation: AppNavigationProp;
};

type StageButton = {
  label: string;
  top: `${number}%`;
  left?: `${number}%`;
  right?: `${number}%`;
  width: `${number}%`;
  screen:
    | 'SuperAdvanced'
    | 'Advanced'
    | 'Intermediate'
    | 'Beginner'
    | 'Intro'
    | 'Enthusiast'
    | 'ExchangeIsland';
};

const stageButtons: StageButton[] = [
  { label: '超高级者', top: '5.0%', left: '21.5%', width: '28%', screen: 'SuperAdvanced' },
  { label: '高级者', top: '13.6%', right: '8.0%', width: '22.5%', screen: 'Advanced' },
  { label: '中级者', top: '23.2%', left: '13.5%', width: '22.5%', screen: 'Intermediate' },
  { label: '初级者', top: '41.2%', right: '2.5%', width: '24.5%', screen: 'Beginner' },
  { label: '入门者', top: '58.8%', left: '7.0%', width: '21.5%', screen: 'Intro' },
  { label: '爱好者', top: '58.7%', right: '7.0%', width: '21.5%', screen: 'Enthusiast' },
  { label: '交流岛', top: '72.8%', left: '34.0%', width: '22.5%', screen: 'ExchangeIsland' },
];

const friendAvatars = [
  require('../../../assets/touxiang.png'),
  require('../../../assets/portrait/头像.png'),
  require('../../../assets/portrait/好友列表头像.png'),
  require('../../../assets/portrait/叮咚头像.png'),
];

export default function LearningMap({ navigation }: LearningMapProps) {
  return (
    <SafeAreaView style={styles.root}>
      <ImageBackground
        source={require('../../../assets/navigation/navigation_bg.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Pressable
            style={styles.topRobotButton}
            onPress={() => navigation.navigate('MainTabs', { tab: 'AI' })}
            accessibilityRole="button"
            accessibilityLabel="打开AI聊天"
          >
            <Text style={styles.topRobotIcon}>🤖</Text>
          </Pressable>

          {stageButtons.map((item) => (
            <Pressable
              key={item.label}
              onPress={() => navigation.navigate(item.screen)}
              accessibilityRole="button"
              accessibilityLabel={`进入${item.label}`}
              style={[
                styles.stageButton,
                {
                  top: item.top,
                  left: item.left,
                  right: item.right,
                  width: item.width,
                },
              ]}
            >
              <Text style={styles.stageButtonText}>{item.label}</Text>
            </Pressable>
          ))}

          <View style={styles.friendsRow}>
            <Pressable
              style={styles.addButton}
              onPress={() => navigation.navigate('Contact')}
              accessibilityRole="button"
              accessibilityLabel="打开联系页面"
            >
              <Text style={styles.addButtonText}>+</Text>
            </Pressable>
            {friendAvatars.map((source, index) => (
              <Pressable
                key={`friend-${index}`}
                style={styles.friendAvatarWrap}
                onPress={() => navigation.navigate('Profile')}
                accessibilityRole="button"
                accessibilityLabel={`打开好友资料${index + 1}`}
              >
                <Image source={source} style={styles.friendAvatar} />
              </Pressable>
            ))}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#B88EFF',
  },
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    position: 'relative',
  },
  topRobotButton: {
    position: 'absolute',
    top: '5.0%',
    left: '6.2%',
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7B4BE6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  topRobotIcon: {
    fontSize: 28,
  },
  stageButton: {
    position: 'absolute',
    minHeight: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E7DAFF',
    shadowColor: '#8A62E3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 7,
    elevation: 5,
  },
  stageButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#28308D',
    letterSpacing: 0,
  },
  friendsRow: {
    position: 'absolute',
    left: '6.0%',
    right: '13.0%',
    bottom: '18.0%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2037A4',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4B2AA8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 38,
    marginTop: -2,
  },
  friendAvatarWrap: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFF6F3',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#F8E7F0',
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
