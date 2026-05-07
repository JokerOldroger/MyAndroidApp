import { CompetitionEvent, PublicNewsItem } from '../types';

export const seededCompetitionEvents: CompetitionEvent[] = [
  {
    id: 'shenzhen-monster-game',
    title: 'Children Robot Monster Game 儿童机器人怪兽挑战赛',
    city: '深圳',
    statusLabel: '6月 全城正式启动',
    summary: '少儿编程 | 全国线下赛事活动',
    detail:
      '少儿机器人编程对战赛，趣味闯关、机甲创意比拼，零基础孩子也能参与实战竞技。适合用叮咚完成运动控制挑战与编程策略练习。',
    publishAt: '2026-06-01T09:00:00+08:00',
    remindAt: '2026-05-20T09:00:00+08:00',
  },
  {
    id: 'shanghai-salon',
    title: '上海20人精品编程线下沙龙',
    city: '上海',
    statusLabel: '限20人精品小班',
    summary: '少儿编程 | 全国线下赛事活动',
    detail:
      '小班制编程实操、逻辑思维集训，面对面导师带教，沉浸式体验趣味编程创作。可以现场练习如何把程序下发给叮咚完成动作。',
    publishAt: '2026-05-18T10:00:00+08:00',
    remindAt: '2026-05-15T18:00:00+08:00',
  },
  {
    id: 'beijing-sanlitun-cup',
    title: '北京三里屯机器人大赛',
    city: '北京',
    statusLabel: '赛事正式启动招募',
    summary: '少儿编程 | 全国线下赛事活动',
    detail:
      '青少年机器人编程竞技盛会，现场比拼编程操控、机器人搭建与智能任务挑战，可报名参赛、现场观赛。适合参考叮咚的运动控制练习。',
    publishAt: '2026-05-12T09:30:00+08:00',
    remindAt: '2026-05-10T18:00:00+08:00',
  },
];

export const seededPublicNews: PublicNewsItem[] = [
  {
    id: 'news-sz-maker',
    title: '深圳创客周发布青少年机器人实践活动预告',
    source: '深圳创客周公开资讯',
    region: '深圳',
    summary: '聚焦青少年机器人实践、编程体验和公开挑战活动，可作为叮咚训练营外部资讯参考。',
    url: 'https://www.szmaker.org/',
  },
  {
    id: 'news-sh-education-tech',
    title: '上海青少年科技教育活动周开放报名信息',
    source: '上海科技教育公开资讯',
    region: '上海',
    summary: '关注编程、机器人与科技实践活动，适合作为线下活动补充阅读。',
    url: 'https://www.shedu.net.cn/',
  },
  {
    id: 'news-bj-stem',
    title: '北京青少年科技赛事公开资讯汇总',
    source: '北京青少年科技教育公开资讯',
    region: '北京',
    summary: '汇总青少年机器人、编程与科技赛事的公开信息，适合跟踪后续比赛动态。',
    url: 'https://www.bast.net.cn/',
  },
];
