import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AppNavigationProp } from './navigationTypes';

type RecordScreenProps = {
  navigation: AppNavigationProp;
};

const achievements = [
  { title: 'Speed Builder', value: '12', color: '#4ED6A7' },
  { title: 'Code Streak', value: '9', color: '#FFB84D' },
  { title: 'Team Helper', value: '6', color: '#73A7FF' },
];

const leaderboard = [
  { rank: 1, name: 'Mia', score: 2480, accent: '#FFD166' },
  { rank: 2, name: 'Cher', score: 2360, accent: '#7A8CFF', current: true },
  { rank: 3, name: 'Leo', score: 2295, accent: '#FF8FA3' },
  { rank: 4, name: 'Yoyo', score: 2140, accent: '#54D6A1' },
  { rank: 5, name: 'Max', score: 2075, accent: '#58C7F3' },
];

const badges: Array<{ label: string; progress: `${number}%` }> = [
  { label: '机器人搭建', progress: '85%' },
  { label: '程序调试', progress: '72%' },
  { label: '赛场协作', progress: '94%' },
];

export default function RecordScreen({ navigation: _navigation }: RecordScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../../../assets/homepage/homepage_bg.png')}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.page}>
          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.hero}>
              <View style={styles.heroCopy}>
                <Text style={styles.eyebrow}>ROBOT LEAGUE</Text>
                <Text style={styles.title}>成就星球</Text>
                <Text style={styles.subtitle}>查看排名、奖章和本周竞赛能量</Text>
              </View>
              <Image source={require('../../../assets/bisai-2.png')} style={styles.heroIcon} />
            </View>

            <View style={styles.playerCard}>
              <View style={styles.playerTop}>
                <Image source={require('../../../assets/portrait/叮咚头像.png')} style={styles.avatar} />
                <View style={styles.playerInfo}>
                  <Text style={styles.playerName}>Cher</Text>
                  <Text style={styles.playerMeta}>高级小工程师 · 12岁</Text>
                </View>
                <View style={styles.rankPill}>
                  <Text style={styles.rankNumber}>#2</Text>
                  <Text style={styles.rankLabel}>本周</Text>
                </View>
              </View>

              <View style={styles.xpTrack}>
                <View style={styles.xpFill} />
              </View>
              <View style={styles.xpRow}>
                <Text style={styles.xpText}>2360 XP</Text>
                <Text style={styles.xpText}>距离第一名 120 XP</Text>
              </View>
            </View>

            <View style={styles.statsGrid}>
              {achievements.map((item) => (
                <View key={item.title} style={[styles.statTile, { borderTopColor: item.color }]}>
                  <Text style={[styles.statValue, { color: item.color }]}>{item.value}</Text>
                  <Text style={styles.statTitle}>{item.title}</Text>
                </View>
              ))}
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>排行榜</Text>
              <Text style={styles.sectionHint}>TOP 5</Text>
            </View>

            <View style={styles.leaderboard}>
              {leaderboard.map((player) => (
                <View key={player.name} style={[styles.rankRow, player.current && styles.currentRank]}>
                  <View style={[styles.rankBadge, { backgroundColor: player.accent }]}>
                    <Text style={styles.rankBadgeText}>{player.rank}</Text>
                  </View>
                  <View style={styles.rankAvatarWrap}>
                    <Image source={require('../../../assets/portrait/好友列表头像.png')} style={styles.rankAvatar} />
                  </View>
                  <View style={styles.rankInfo}>
                    <Text style={styles.rankName}>{player.name}</Text>
                    <Text style={styles.rankRole}>{player.current ? '我的排名' : '机器人挑战者'}</Text>
                  </View>
                  <Text style={styles.rankScore}>{player.score}</Text>
                </View>
              ))}
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>能力徽章</Text>
              <Text style={styles.sectionHint}>LEVEL UP</Text>
            </View>

            <View style={styles.badgePanel}>
              {badges.map((badge) => (
                <View key={badge.label} style={styles.badgeItem}>
                  <View style={styles.badgeIcon}>
                    <Image source={require('../../../assets/renwu.png')} style={styles.badgeImage} />
                  </View>
                  <View style={styles.badgeCopy}>
                    <Text style={styles.badgeLabel}>{badge.label}</Text>
                    <View style={styles.badgeTrack}>
                      <View style={[styles.badgeFill, { width: badge.progress }]} />
                    </View>
                  </View>
                  <Text style={styles.badgePercent}>{badge.progress}</Text>
                </View>
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
    backgroundColor: '#DFF7FF',
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.18,
  },
  page: {
    flex: 1,
  },
  content: {
    padding: 18,
    paddingBottom: 120,
  },
  hero: {
    minHeight: 150,
    borderRadius: 8,
    backgroundColor: '#6BD7FF',
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  heroCopy: {
    flex: 1,
  },
  eyebrow: {
    color: '#1D5F87',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
    marginBottom: 8,
  },
  title: {
    color: '#17324D',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 0,
  },
  subtitle: {
    marginTop: 8,
    color: '#24536D',
    fontSize: 15,
    fontWeight: '700',
  },
  heroIcon: {
    width: 104,
    height: 104,
    resizeMode: 'contain',
  },
  playerCard: {
    marginTop: 14,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderWidth: 2,
    borderColor: '#D7F0FF',
  },
  playerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F4F7FF',
  },
  playerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  playerName: {
    color: '#253650',
    fontSize: 24,
    fontWeight: '900',
  },
  playerMeta: {
    color: '#697B91',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 3,
  },
  rankPill: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFF0A8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFD45D',
  },
  rankNumber: {
    color: '#5C4300',
    fontSize: 22,
    fontWeight: '900',
  },
  rankLabel: {
    color: '#7B6210',
    fontSize: 11,
    fontWeight: '900',
  },
  xpTrack: {
    height: 16,
    borderRadius: 8,
    backgroundColor: '#EAF1F7',
    marginTop: 16,
    overflow: 'hidden',
  },
  xpFill: {
    width: '78%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#53D58A',
  },
  xpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  xpText: {
    color: '#607184',
    fontSize: 12,
    fontWeight: '800',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  statTile: {
    flex: 1,
    minHeight: 92,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderTopWidth: 5,
    borderWidth: 1,
    borderColor: '#E7F0F8',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '900',
  },
  statTitle: {
    color: '#53677C',
    fontSize: 12,
    fontWeight: '900',
    marginTop: 4,
  },
  sectionHeader: {
    marginTop: 22,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#1D3150',
    fontSize: 22,
    fontWeight: '900',
  },
  sectionHint: {
    color: '#6E88A3',
    fontSize: 12,
    fontWeight: '900',
  },
  leaderboard: {
    gap: 10,
  },
  rankRow: {
    minHeight: 72,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5EEF7',
  },
  currentRank: {
    backgroundColor: '#F4FFF8',
    borderColor: '#53D58A',
    borderWidth: 2,
  },
  rankBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankBadgeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  rankAvatarWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#F1F5FF',
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  rankInfo: {
    flex: 1,
    marginLeft: 10,
  },
  rankName: {
    color: '#293A52',
    fontSize: 17,
    fontWeight: '900',
  },
  rankRole: {
    color: '#718397',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  rankScore: {
    color: '#263B5A',
    fontSize: 18,
    fontWeight: '900',
  },
  badgePanel: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E5EEF7',
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EAF8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  badgeCopy: {
    flex: 1,
    marginHorizontal: 10,
  },
  badgeLabel: {
    color: '#293A52',
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 7,
  },
  badgeTrack: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#EDF3F8',
  },
  badgeFill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#7A8CFF',
  },
  badgePercent: {
    width: 42,
    color: '#607184',
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'right',
  },
});
