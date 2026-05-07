import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import DingdongLogo from '../shared/components/DingdongLogo';
import { AppNavigationProp, MainTabRoute, navigateToMainTab } from '../shared/navigation/navigationTypes';

type CommunityScreenProps = {
  navigation: AppNavigationProp;
};

type HighlightAction =
  | { type: 'screen'; target: 'ExchangeIsland' | 'Contact' }
  | { type: 'tab'; target: MainTabRoute };

const highlights: Array<{ title: string; detail: string; action: HighlightAction }> = [
  { title: '作品展示', detail: '看看大家最近给叮咚做了什么作品和动作方案。', action: { type: 'screen', target: 'ExchangeIsland' } },
  { title: '练习小组', detail: '和队友一起约训练时间，互相提醒完成叮咚任务。', action: { type: 'screen', target: 'Contact' } },
  { title: '技巧讨论', detail: '交流叮咚走直线、避障和调参时的发现。', action: { type: 'tab', target: 'AI' } },
];

export default function CommunityScreen({ navigation }: CommunityScreenProps) {
  function openHighlight(action: HighlightAction) {
    if (action.type === 'tab') {
      navigateToMainTab(navigation, action.target);
      return;
    }

    navigation.navigate(action.target);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../../../../assets/homepage/homepage_bg.png')}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.page}>
          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.heroCard}>
              <View style={styles.heroCopy}>
                <Text style={styles.heroEyebrow}>DINGDONG COMMUNITY</Text>
                <Text style={styles.heroTitle}>叮咚交流社区</Text>
                <Text style={styles.heroSubtitle}>在这里分享作品、组队训练、交换叮咚比赛和运动控制小技巧。</Text>
              </View>
              <DingdongLogo size={86} />
            </View>

            <View style={styles.friendStrip}>
              {[
                require('../../../../assets/touxiang.png'),
                require('../../../../assets/portrait/头像.png'),
                require('../../../../assets/portrait/叮咚头像.png'),
                require('../../../../assets/portrait/好友列表头像.png'),
              ].map((source, index) => (
                <View key={`friend-${index}`} style={styles.friendBubble}>
                  <Image source={source} style={styles.friendAvatar} />
                </View>
              ))}
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>社区入口</Text>
              <Text style={styles.sectionTag}>GO</Text>
            </View>

            <View style={styles.cardStack}>
              {highlights.map((item) => (
                <Pressable
                  key={item.title}
                  style={styles.highlightCard}
                  onPress={() => openHighlight(item.action)}
                  accessibilityRole="button"
                  accessibilityLabel={`打开${item.title}`}
                >
                  <View style={styles.highlightDot} />
                  <View style={styles.highlightCopy}>
                    <Text style={styles.highlightTitle}>{item.title}</Text>
                    <Text style={styles.highlightDetail}>{item.detail}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEF9FF',
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.14,
  },
  page: {
    flex: 1,
  },
  content: {
    padding: 18,
    paddingBottom: 120,
  },
  heroCard: {
    borderRadius: 8,
    backgroundColor: '#C5B3FF',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroCopy: {
    flex: 1,
    paddingRight: 10,
  },
  heroEyebrow: {
    color: '#4E4491',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 8,
  },
  heroTitle: {
    color: '#253650',
    fontSize: 30,
    fontWeight: '900',
  },
  heroSubtitle: {
    marginTop: 8,
    color: '#5B5C7D',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },
  friendStrip: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 10,
  },
  friendBubble: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2EEF7',
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  sectionHeader: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#253650',
    fontSize: 22,
    fontWeight: '900',
  },
  sectionTag: {
    color: '#6E88A3',
    fontSize: 12,
    fontWeight: '900',
  },
  cardStack: {
    gap: 12,
  },
  highlightCard: {
    minHeight: 92,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2EEF7',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#67D39A',
    marginRight: 12,
  },
  highlightCopy: {
    flex: 1,
  },
  highlightTitle: {
    color: '#253650',
    fontSize: 16,
    fontWeight: '900',
  },
  highlightDetail: {
    marginTop: 4,
    color: '#6A8399',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 20,
  },
});
