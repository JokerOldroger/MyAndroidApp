import Constants from 'expo-constants';

import { CompetitionEvent, NotificationSupport } from '../types';

async function loadNotificationsModule() {
  return import('expo-notifications');
}

export async function getNotificationSupport(): Promise<NotificationSupport> {
  const executionEnvironment = Constants.executionEnvironment;

  if (executionEnvironment === 'storeClient') {
    return {
      available: false,
      reason: 'Expo Go 暂不支持本地赛事提醒，请使用开发构建版本体验提醒功能。',
    };
  }

  return {
    available: true,
  };
}

export async function requestMessageNotificationPermission() {
  const support = await getNotificationSupport();
  if (!support.available) {
    return false;
  }

  const Notifications = await loadNotificationsModule();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const settings = await Notifications.getPermissionsAsync();
  if (settings.granted) {
    return true;
  }

  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

export async function scheduleCompetitionReminder(event: CompetitionEvent) {
  const support = await getNotificationSupport();
  if (!support.available) {
    return null;
  }

  const triggerDate = new Date(event.remindAt);
  if (Number.isNaN(triggerDate.getTime()) || triggerDate.getTime() <= Date.now()) {
    return null;
  }

  const Notifications = await loadNotificationsModule();

  return Notifications.scheduleNotificationAsync({
    content: {
      title: `叮咚赛事提醒｜${event.city}`,
      body: `${event.title} 即将开始，记得查看报名与活动安排。`,
      data: {
        route: 'Message',
        eventId: event.id,
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: triggerDate,
    },
  });
}

export async function cancelScheduledReminders(ids: string[]) {
  const support = await getNotificationSupport();
  if (!support.available || ids.length === 0) {
    return;
  }

  const Notifications = await loadNotificationsModule();
  await Promise.all(ids.map((id) => Notifications.cancelScheduledNotificationAsync(id)));
}
