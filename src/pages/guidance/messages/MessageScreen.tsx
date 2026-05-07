import React, { useEffect, useMemo, useState } from 'react';
import {
  ImageBackground,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import DingdongLogo from '../shared/components/DingdongLogo';
import { seededCompetitionEvents, seededPublicNews } from './data/competitionMessages';
import { loadReminderIds, loadSelectedRegion, saveReminderIds, saveSelectedRegion } from './services/messageStore';
import {
  cancelScheduledReminders,
  getNotificationSupport,
  requestMessageNotificationPermission,
  scheduleCompetitionReminder,
} from './services/notificationService';
import { CompetitionEvent, CompetitionRegion, NotificationSupport } from './types';

const regions: CompetitionRegion[] = ['深圳', '上海', '北京', '全部'];

function isEventVisible(event: CompetitionEvent) {
  return new Date(event.publishAt).getTime() <= Date.now();
}

export default function MessageScreen() {
  const [region, setRegion] = useState<CompetitionRegion>('深圳');
  const [reminderIds, setReminderIds] = useState<string[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const [notificationSupport, setNotificationSupport] = useState<NotificationSupport>({ available: true });

  useEffect(() => {
    async function bootstrap() {
      const [savedRegion, savedReminderIds, support] = await Promise.all([
        loadSelectedRegion(),
        loadReminderIds(),
        getNotificationSupport(),
      ]);
      setRegion(savedRegion);
      setReminderIds(savedReminderIds);
      setNotificationsEnabled(savedReminderIds.length > 0);
      setNotificationSupport(support);
    }

    void bootstrap();
  }, []);

  const visibleEvents = useMemo(() => {
    return seededCompetitionEvents.filter((event) => {
      const matchesRegion = region === '全部' ? true : event.city === region;
      return matchesRegion && isEventVisible(event);
    });
  }, [region]);

  const visibleNews = useMemo(() => {
    return seededPublicNews.filter((item) => region === '全部' || item.region === region);
  }, [region]);

  async function selectRegion(nextRegion: CompetitionRegion) {
    setRegion(nextRegion);
    await saveSelectedRegion(nextRegion);
  }

  async function toggleReminders() {
    if (isScheduling || !notificationSupport.available) {
      return;
    }

    setIsScheduling(true);
    try {
      if (notificationsEnabled) {
        await cancelScheduledReminders(reminderIds);
        await saveReminderIds([]);
        setReminderIds([]);
        setNotificationsEnabled(false);
        return;
      }

      const granted = await requestMessageNotificationPermission();
      if (!granted) {
        setNotificationsEnabled(false);
        return;
      }

      const ids = (
        await Promise.all(seededCompetitionEvents.map((event) => scheduleCompetitionReminder(event)))
      ).filter((item): item is string => Boolean(item));

      await saveReminderIds(ids);
      setReminderIds(ids);
      setNotificationsEnabled(ids.length > 0);
    } finally {
      setIsScheduling(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../../../../assets/homepage/homepage_bg.png')}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.heroCard}>
            <View style={styles.heroCopy}>
              <Text style={styles.heroEyebrow}>DINGDONG NEWS</Text>
              <Text style={styles.heroTitle}>少儿编程｜全国线下赛事活动</Text>
              <Text style={styles.heroSubtitle}>查看叮咚为你整理的赛事消息、地区活动和公开机器人比赛资讯。</Text>
            </View>
            <DingdongLogo size={86} />
          </View>

          <View style={styles.controlPanel}>
            <View style={styles.regionRow}>
              {regions.map((item) => {
                const active = item === region;
                return (
                  <Pressable
                    key={item}
                    style={[styles.regionChip, active && styles.regionChipActive]}
                    onPress={() => void selectRegion(item)}
                    accessibilityRole="button"
                    accessibilityLabel={`切换到${item}`}
                  >
                    <Text style={[styles.regionText, active && styles.regionTextActive]}>{item}</Text>
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              style={[styles.reminderButton, notificationsEnabled && styles.reminderButtonActive, !notificationSupport.available && styles.reminderButtonDisabled]}
              onPress={() => void toggleReminders()}
              disabled={!notificationSupport.available}
              accessibilityRole="button"
              accessibilityLabel={notificationsEnabled ? '关闭赛事提醒' : '开启赛事提醒'}
            >
              <Text style={[styles.reminderButtonText, notificationsEnabled && styles.reminderButtonTextActive, !notificationSupport.available && styles.reminderButtonTextDisabled]}>
                {!notificationSupport.available
                  ? '当前环境不支持本地提醒'
                  : notificationsEnabled
                    ? '已开启叮咚赛事提醒'
                    : '开启叮咚赛事提醒'}
              </Text>
            </Pressable>

            {!notificationSupport.available && notificationSupport.reason && (
              <Text style={styles.supportHint}>{notificationSupport.reason}</Text>
            )}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>活动赛事列表</Text>
            <Text style={styles.sectionHint}>{region}赛区</Text>
          </View>

          <View style={styles.cardStack}>
            {visibleEvents.map((event) => (
              <View key={event.id} style={styles.eventCard}>
                <Text style={styles.eventSummary}>{event.summary}</Text>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventMeta}>举办城市：{event.city}</Text>
                <Text style={styles.eventMeta}>状态：{event.statusLabel}</Text>
                <Text style={styles.eventDetail}>{event.detail}</Text>
              </View>
            ))}

            {visibleEvents.length === 0 && (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>当前地区还没有到发布时间的赛事消息</Text>
                <Text style={styles.emptyBody}>你可以先切换到“全部”，或者保留本地区并开启叮咚赛事提醒。</Text>
              </View>
            )}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>公开赛事资讯</Text>
            <Text style={styles.sectionHint}>公开来源</Text>
          </View>

          <View style={styles.cardStack}>
            {visibleNews.map((news) => (
              <Pressable
                key={news.id}
                style={styles.newsCard}
                onPress={() => void Linking.openURL(news.url)}
                accessibilityRole="button"
                accessibilityLabel={`打开资讯 ${news.title}`}
              >
                <Text style={styles.newsSource}>{news.source}</Text>
                <Text style={styles.newsTitle}>{news.title}</Text>
                <Text style={styles.newsSummary}>{news.summary}</Text>
                <Text style={styles.newsLink}>查看公开资讯</Text>
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
    backgroundColor: '#EEF9FF',
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.16,
  },
  content: {
    padding: 18,
    paddingBottom: 36,
  },
  heroCard: {
    borderRadius: 8,
    backgroundColor: '#9AD9FF',
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
    color: '#246487',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 8,
  },
  heroTitle: {
    color: '#18324B',
    fontSize: 28,
    fontWeight: '900',
  },
  heroSubtitle: {
    marginTop: 8,
    color: '#325B77',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },
  controlPanel: {
    marginTop: 14,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCECF7',
    padding: 14,
  },
  regionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  regionChip: {
    minHeight: 36,
    borderRadius: 18,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F5FA',
  },
  regionChipActive: {
    backgroundColor: '#2037A4',
  },
  regionText: {
    color: '#5F7388',
    fontSize: 13,
    fontWeight: '800',
  },
  regionTextActive: {
    color: '#FFFFFF',
  },
  reminderButton: {
    marginTop: 14,
    minHeight: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5D2',
  },
  reminderButtonActive: {
    backgroundColor: '#DFF8E7',
  },
  reminderButtonDisabled: {
    backgroundColor: '#EEF1F5',
  },
  reminderButtonText: {
    color: '#7B5B11',
    fontSize: 14,
    fontWeight: '900',
  },
  reminderButtonTextActive: {
    color: '#256C46',
  },
  reminderButtonTextDisabled: {
    color: '#718397',
  },
  supportHint: {
    marginTop: 10,
    color: '#718397',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
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
  cardStack: {
    gap: 12,
  },
  eventCard: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2EEF7',
    padding: 16,
  },
  eventSummary: {
    color: '#4B6A85',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 8,
  },
  eventTitle: {
    color: '#1F3351',
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 24,
  },
  eventMeta: {
    marginTop: 8,
    color: '#5D768B',
    fontSize: 13,
    fontWeight: '800',
  },
  eventDetail: {
    marginTop: 10,
    color: '#526B7F',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },
  emptyCard: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2EEF7',
    padding: 16,
  },
  emptyTitle: {
    color: '#1F3351',
    fontSize: 16,
    fontWeight: '900',
  },
  emptyBody: {
    marginTop: 8,
    color: '#667F94',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  newsCard: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2EEF7',
    padding: 16,
  },
  newsSource: {
    color: '#7B92A6',
    fontSize: 12,
    fontWeight: '900',
  },
  newsTitle: {
    marginTop: 8,
    color: '#20374E',
    fontSize: 17,
    fontWeight: '900',
    lineHeight: 23,
  },
  newsSummary: {
    marginTop: 8,
    color: '#5E7488',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },
  newsLink: {
    marginTop: 10,
    color: '#2037A4',
    fontSize: 13,
    fontWeight: '900',
  },
});
