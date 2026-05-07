export type PersonaCard = {
  id: string;
  title: string;
  tag: string;
  cost: number;
  description: string;
};

export const pointsBalance = 2360;

export const redeemCodeHints = [
  '输入官方赛事兑换码可领取限时权益',
  '兑换码一般用于关卡解锁、叮咚个性或活动奖励',
];

export const personaCards: PersonaCard[] = [
  {
    id: 'star-coach',
    title: '星光教练卡',
    tag: '虚拟人设卡',
    cost: 680,
    description: '解锁更有陪伴感的叮咚教练人设风格。',
  },
  {
    id: 'mecha-captain',
    title: '机甲队长卡',
    tag: '虚拟人设卡',
    cost: 820,
    description: '让叮咚在训练与社区展示里拥有更酷的角色主题。',
  },
  {
    id: 'sensor-explorer',
    title: '感知探索卡',
    tag: '积分兑换',
    cost: 980,
    description: '用于兑换传感器专项训练体验与定制主题。',
  },
];

export const pointsSources = [
  { title: '玩家排名', detail: '在排行榜中取得更高名次，可稳定获得积分。', value: '+120 ~ +500' },
  { title: '社区作品', detail: '发布叮咚作品、训练记录和创意方案，可获得社区积分。', value: '+80 ~ +240' },
  { title: '参加竞赛', detail: '报名或完成线下/线上赛事活动，可获得竞赛奖励积分。', value: '+200 ~ +1000' },
];

export const pointsUsage = [
  '兑换高级教练服务',
  '兑换叮咚个性人设卡',
  '兑换专项关卡或传感器训练服务',
];
