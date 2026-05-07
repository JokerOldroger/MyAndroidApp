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

import DingdongLogo from './DingdongLogo';

const quickStats = [
  { label: '等级', value: 'Lv.18', accent: '#5CC8FF' },
  { label: '奖章', value: '26', accent: '#FFB84D' },
  { label: '连胜', value: '7', accent: '#58D6A1' },
];

const infoRows = [
  { label: '用户名', value: '叮咚小队员_111111' },
  { label: '战队', value: '叮咚机器人探索小队' },
  { label: '学校', value: 'Future Lab Academy' },
  { label: '邮箱', value: 'dingdong@example.com' },
];

const skillBars: Array<{ label: string; progress: `${number}%`; color: string }> = [
  { label: '叮咚搭建', progress: '88%', color: '#5CC8FF' },
  { label: '图形化编程', progress: '81%', color: '#FF8CA8' },
  { label: '运动控制', progress: '74%', color: '#FFB84D' },
];

const badges = [
  { title: '本月之星', subtitle: '完成 12 次叮咚挑战', icon: require('../../../../../assets/bisai.png') },
  { title: '任务达人', subtitle: '连续签到 9 天', icon: require('../../../../../assets/renwu.png') },
  { title: '卡券宝箱', subtitle: '解锁 3 个惊喜', icon: require('../../../../../assets/kabao.png') },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../../../../../assets/homepage/homepage_bg.png')}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.heroCard}>
            <View style={styles.heroTop}>
              <View style={styles.heroCopy}>
                <Text style={styles.heroEyebrow}>DINGDONG PROFILE</Text>
                <Text style={styles.heroTitle}>叮咚成长档案</Text>
                <Text style={styles.heroSubtitle}>看看你和叮咚的角色资料、成长能力和闪亮奖章</Text>
              </View>
              <DingdongLogo size={88} />
            </View>

            <View style={styles.playerPanel}>
              <Image source={require('../../../../../assets/portrait/头像.png')} style={styles.avatar} />
              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>叮咚学员 Cher</Text>
                <Text style={styles.playerMeta}>高级小工程师 · 叮咚运动控制训练营</Text>
                <View style={styles.energyRow}>
                  <View style={styles.energyTrack}>
                    <View style={styles.energyFill} />
                  </View>
                  <Text style={styles.energyText}>叮咚协同能量 92%</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            {quickStats.map((item) => (
              <View key={item.label} style={styles.statCard}>
                <View style={[styles.statDot, { backgroundColor: item.accent }]} />
                <Text style={styles.statValue}>{item.value}</Text>
                <Text style={styles.statLabel}>{item.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>角色档案</Text>
            <Text style={styles.sectionTag}>INFO</Text>
          </View>

          <View style={styles.infoPanel}>
            {infoRows.map((row) => (
              <View key={row.label} style={styles.infoRow}>
                <Text style={styles.infoLabel}>{row.label}</Text>
                <Text style={styles.infoValue}>{row.value}</Text>
              </View>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>技能成长</Text>
            <Text style={styles.sectionTag}>POWER</Text>
          </View>

          <View style={styles.skillsPanel}>
            {skillBars.map((skill) => (
              <View key={skill.label} style={styles.skillItem}>
                <View style={styles.skillHeader}>
                  <Text style={styles.skillLabel}>{skill.label}</Text>
                  <Text style={styles.skillPercent}>{skill.progress}</Text>
                </View>
                <View style={styles.skillTrack}>
                  <View style={[styles.skillFill, { width: skill.progress, backgroundColor: skill.color }]} />
                </View>
              </View>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>闪亮奖章</Text>
            <Text style={styles.sectionTag}>BADGES</Text>
          </View>

          <View style={styles.badgesGrid}>
            {badges.map((badge) => (
              <View key={badge.title} style={styles.badgeCard}>
                <View style={styles.badgeIconWrap}>
                  <Image source={badge.icon} style={styles.badgeIcon} />
                </View>
                <Text style={styles.badgeTitle}>{badge.title}</Text>
                <Text style={styles.badgeSubtitle}>{badge.subtitle}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E7FBFF',
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.16,
  },
  content: {
    padding: 18,
    paddingBottom: 34,
  },
  heroCard: {
    borderRadius: 8,
    backgroundColor: '#79E0FF',
    padding: 18,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroCopy: {
    flex: 1,
    paddingRight: 8,
  },
  heroEyebrow: {
    color: '#1A638B',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 8,
  },
  heroTitle: {
    color: '#183852',
    fontSize: 34,
    fontWeight: '900',
  },
  heroSubtitle: {
    marginTop: 8,
    color: '#24556E',
    fontSize: 15,
    fontWeight: '700',
  },
  playerPanel: {
    marginTop: 18,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.92)',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: '#EEF8FF',
  },
  playerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  playerName: {
    color: '#203851',
    fontSize: 24,
    fontWeight: '900',
  },
  playerMeta: {
    marginTop: 4,
    color: '#688097',
    fontSize: 13,
    fontWeight: '700',
  },
  energyRow: {
    marginTop: 10,
  },
  energyTrack: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#DCEAF4',
  },
  energyFill: {
    width: '92%',
    height: '100%',
    borderRadius: 6,
    backgroundColor: '#56D492',
  },
  energyText: {
    marginTop: 6,
    color: '#5B7288',
    fontSize: 12,
    fontWeight: '800',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  statCard: {
    flex: 1,
    minHeight: 96,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderWidth: 1,
    borderColor: '#DCECF7',
    justifyContent: 'center',
  },
  statDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  statValue: {
    color: '#203851',
    fontSize: 24,
    fontWeight: '900',
  },
  statLabel: {
    marginTop: 4,
    color: '#698298',
    fontSize: 12,
    fontWeight: '800',
  },
  sectionHeader: {
    marginTop: 22,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#213851',
    fontSize: 22,
    fontWeight: '900',
  },
  sectionTag: {
    color: '#6C88A1',
    fontSize: 12,
    fontWeight: '900',
  },
  infoPanel: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderWidth: 1,
    borderColor: '#DCECF7',
    gap: 10,
  },
  infoRow: {
    minHeight: 56,
    borderRadius: 8,
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoLabel: {
    color: '#62809C',
    fontSize: 13,
    fontWeight: '800',
  },
  infoValue: {
    color: '#213851',
    fontSize: 14,
    fontWeight: '900',
    maxWidth: '60%',
    textAlign: 'right',
  },
  skillsPanel: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderWidth: 1,
    borderColor: '#DCECF7',
    gap: 14,
  },
  skillItem: {
    gap: 8,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillLabel: {
    color: '#223851',
    fontSize: 15,
    fontWeight: '900',
  },
  skillPercent: {
    color: '#698298',
    fontSize: 13,
    fontWeight: '900',
  },
  skillTrack: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#EBF3F8',
  },
  skillFill: {
    height: '100%',
    borderRadius: 6,
  },
  badgesGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  badgeCard: {
    flex: 1,
    minHeight: 168,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderWidth: 1,
    borderColor: '#DCECF7',
    alignItems: 'center',
  },
  badgeIconWrap: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#E9F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  badgeIcon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  badgeTitle: {
    color: '#213851',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
  },
  badgeSubtitle: {
    marginTop: 6,
    color: '#6C8399',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
});
