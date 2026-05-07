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

import DingdongLogo from '../../shared/components/DingdongLogo';
import { MainTabRoute, NavigationLike, navigateToMainTab } from '../../shared/navigation/navigationTypes';

type StageMission = {
  title: string;
  detail: string;
  reward: string;
};

type StageSkill = {
  label: string;
  progress: `${number}%`;
};

type StageLandingTemplateProps = {
  navigation: NavigationLike;
  badge: string;
  title: string;
  subtitle: string;
  themeColor: string;
  progress: `${number}%`;
  rankLabel: string;
  missions: StageMission[];
  skills: StageSkill[];
  rewardTitle: string;
  rewardBody: string;
  helperTip: string;
};

const helperLinks: Array<{ label: string; screen: MainTabRoute }> = [
  { label: '问叮咚教练', screen: 'AI' },
  { label: '查看战绩', screen: 'Record' },
  { label: '返回地图', screen: 'LearningMap' },
];

export default function StageLandingTemplate({
  navigation,
  badge,
  title,
  subtitle,
  themeColor,
  progress,
  rankLabel,
  missions,
  skills,
  rewardTitle,
  rewardBody,
  helperTip,
}: StageLandingTemplateProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../../../../../assets/homepage/homepage_bg.png')}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={[styles.heroCard, { backgroundColor: themeColor }]}>
            <View style={styles.heroCopy}>
              <Text style={styles.badge}>{badge}</Text>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>

              <View style={styles.progressRow}>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: progress }]} />
                </View>
                <Text style={styles.progressText}>{progress}</Text>
              </View>
            </View>

            <View style={styles.heroSide}>
              <DingdongLogo size={88} />
              <View style={styles.rankBadge}>
                <Text style={styles.rankBadgeText}>{rankLabel}</Text>
              </View>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>今日任务</Text>
            <Text style={styles.sectionTag}>MISSION</Text>
          </View>

          <View style={styles.missionsPanel}>
            {missions.map((mission, index) => (
              <View key={mission.title} style={styles.missionCard}>
                <View style={[styles.missionIndex, { backgroundColor: index % 2 === 0 ? '#67D39A' : '#FFB84D' }]}>
                  <Text style={styles.missionIndexText}>{index + 1}</Text>
                </View>
                <View style={styles.missionCopy}>
                  <Text style={styles.missionTitle}>{mission.title}</Text>
                  <Text style={styles.missionDetail}>{mission.detail}</Text>
                  <Text style={styles.missionReward}>奖励：{mission.reward}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>成长能力</Text>
            <Text style={styles.sectionTag}>SKILL</Text>
          </View>

          <View style={styles.skillsPanel}>
            {skills.map((skill) => (
              <View key={skill.label} style={styles.skillItem}>
                <View style={styles.skillHeader}>
                  <Text style={styles.skillLabel}>{skill.label}</Text>
                  <Text style={styles.skillPercent}>{skill.progress}</Text>
                </View>
                <View style={styles.skillTrack}>
                  <View style={[styles.skillFill, { width: skill.progress, backgroundColor: themeColor }]} />
                </View>
              </View>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>通关奖励</Text>
            <Text style={styles.sectionTag}>REWARD</Text>
          </View>

          <View style={styles.rewardCard}>
            <Image source={require('../../../../../assets/kabao.png')} style={styles.rewardIcon} />
            <View style={styles.rewardCopy}>
              <Text style={styles.rewardTitle}>{rewardTitle}</Text>
              <Text style={styles.rewardBody}>{rewardBody}</Text>
            </View>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>叮咚教练提示</Text>
            <Text style={styles.tipBody}>{helperTip}</Text>
          </View>

          <View style={styles.actionRow}>
            {helperLinks.map((item) => (
              <Pressable
                key={item.label}
                style={[
                  styles.actionButton,
                  item.screen === 'AI' ? [styles.primaryAction, { backgroundColor: themeColor }] : styles.secondaryAction,
                ]}
                onPress={() => navigateToMainTab(navigation, item.screen)}
                accessibilityRole="button"
                accessibilityLabel={item.label}
              >
                <Text
                  style={[
                    styles.actionButtonText,
                    item.screen === 'AI' ? styles.primaryActionText : styles.secondaryActionText,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
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
    backgroundColor: '#EAFBFF',
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
  content: {
    padding: 18,
    paddingBottom: 34,
  },
  heroCard: {
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroCopy: {
    flex: 1,
    paddingRight: 12,
  },
  badge: {
    color: '#1B6489',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 8,
  },
  title: {
    color: '#17364E',
    fontSize: 31,
    fontWeight: '900',
  },
  subtitle: {
    marginTop: 8,
    color: '#28566F',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
  },
  progressRow: {
    marginTop: 14,
  },
  progressTrack: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  progressText: {
    marginTop: 6,
    color: '#21435C',
    fontSize: 12,
    fontWeight: '900',
  },
  heroSide: {
    alignItems: 'center',
  },
  rankBadge: {
    marginTop: 8,
    minWidth: 74,
    minHeight: 30,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankBadgeText: {
    color: '#21435C',
    fontSize: 13,
    fontWeight: '900',
  },
  sectionHeader: {
    marginTop: 18,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#213851',
    fontSize: 22,
    fontWeight: '900',
  },
  sectionTag: {
    color: '#6A8399',
    fontSize: 12,
    fontWeight: '900',
  },
  missionsPanel: {
    gap: 12,
  },
  missionCard: {
    minHeight: 88,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8EDF8',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  missionIndex: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  missionIndexText: {
    color: '#17364E',
    fontSize: 16,
    fontWeight: '900',
  },
  missionCopy: {
    flex: 1,
  },
  missionTitle: {
    color: '#213851',
    fontSize: 16,
    fontWeight: '900',
  },
  missionDetail: {
    marginTop: 4,
    color: '#648096',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 20,
  },
  missionReward: {
    marginTop: 6,
    color: '#2A8E65',
    fontSize: 12,
    fontWeight: '900',
  },
  skillsPanel: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8EDF8',
    padding: 16,
    gap: 14,
  },
  skillItem: {
    gap: 8,
  },
  skillHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skillLabel: {
    color: '#213851',
    fontSize: 15,
    fontWeight: '900',
  },
  skillPercent: {
    color: '#6A8399',
    fontSize: 12,
    fontWeight: '900',
  },
  skillTrack: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#EDF4F8',
  },
  skillFill: {
    height: '100%',
    borderRadius: 6,
  },
  rewardCard: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8EDF8',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardIcon: {
    width: 54,
    height: 54,
    resizeMode: 'contain',
    marginRight: 12,
  },
  rewardCopy: {
    flex: 1,
  },
  rewardTitle: {
    color: '#213851',
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 4,
  },
  rewardBody: {
    color: '#648096',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 20,
  },
  tipCard: {
    marginTop: 14,
    borderRadius: 8,
    backgroundColor: '#FFF9D8',
    borderWidth: 1,
    borderColor: '#FFE599',
    padding: 16,
  },
  tipTitle: {
    color: '#6B5712',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 6,
  },
  tipBody: {
    color: '#7B692C',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 20,
  },
  actionRow: {
    marginTop: 16,
    gap: 10,
  },
  actionButton: {
    minHeight: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  primaryAction: {},
  secondaryAction: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8EDF8',
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '900',
  },
  primaryActionText: {
    color: '#17364E',
  },
  secondaryActionText: {
    color: '#21435C',
  },
});
