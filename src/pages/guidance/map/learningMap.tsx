import React from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView, ImageBackground, Image } from 'react-native';

import { AppNavigationProp } from '../shared/navigation/navigationTypes';

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
  { label: '超高级者', top: '5.4%', left: '23.5%', width: '24%', screen: 'SuperAdvanced' },
  { label: '高级者', top: '14.3%', right: '10.2%', width: '20%', screen: 'Advanced' },
  { label: '中级者', top: '24.4%', left: '16.5%', width: '20%', screen: 'Intermediate' },
  { label: '初级者', top: '42.2%', right: '5.8%', width: '21%', screen: 'Beginner' },
  { label: '入门者', top: '60.4%', left: '9.5%', width: '19%', screen: 'Intro' },
  { label: '爱好者', top: '60.0%', right: '9.5%', width: '19%', screen: 'Enthusiast' },
  { label: '交流岛', top: '74.4%', left: '36.5%', width: '19%', screen: 'ExchangeIsland' },
];

const friendAvatars = [
  require('../../../../assets/portrait/头像.png'),
  require('../../../../assets/portrait/好友列表头像.png'),
  require('../../../../assets/portrait/叮咚头像.png'),
];

export default function LearningMap({ navigation }: LearningMapProps) {
  return (
    <SafeAreaView style={styles.root}>
      <ImageBackground
        source={require('../../../../assets/navigation/navigation_bg.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Pressable
            style={styles.topRobotButton}
            onPress={() => navigation.navigate('MainTabs', { tab: 'AI' })}
            accessibilityRole="button"
            accessibilityLabel="打开叮咚教练聊天"
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
            {friendAvatars.map((source, index) => (
              <Pressable
                key={`friend-${index}`}
                style={styles.friendAvatarWrap}
                onPress={() => navigation.navigate('Profile')}
                accessibilityRole="button"
                accessibilityLabel={`打开叮咚伙伴资料${index + 1}`}
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
    top: '5.2%',
    left: '5.8%',
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.96)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  topRobotIcon: {
    fontSize: 24,
  },
  stageButton: {
    position: 'absolute',
    minHeight: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E7DAFF',
    paddingHorizontal: 10,
  },
  stageButtonText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#28308D',
    letterSpacing: 0,
  },
  friendsRow: {
    position: 'absolute',
    right: '6.2%',
    bottom: '15.2%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  friendAvatarWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.94)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F8E7F0',
  },
  friendAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
});
