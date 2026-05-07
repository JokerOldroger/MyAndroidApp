export type SubscriptionServiceId =
  | 'level-pack'
  | 'coach-llm'
  | 'dingdong-style'
  | 'sensor-kit';

export type SubscriptionService = {
  id: SubscriptionServiceId;
  title: string;
  subtitle: string;
  priceLabel: string;
  amount: number;
  category: string;
  detailTitle: string;
  detailBody: string;
  perks: string[];
};

export const storedBalance = 298;

export const subscriptionServices: SubscriptionService[] = [
  {
    id: 'level-pack',
    title: '关卡解锁包',
    subtitle: '解锁新的训练关卡与挑战世界',
    priceLabel: '¥98',
    amount: 98,
    category: '关卡解锁',
    detailTitle: '解锁更高阶关卡',
    detailBody: '适合想持续推进叮咚训练地图的学员。购买后可开启更多世界、更多闯关任务与更高阶练习内容。',
    perks: ['新增训练关卡', '开放进阶地图', '持续积累闯关进度'],
  },
  {
    id: 'coach-llm',
    title: '高级教练 LLM',
    subtitle: '更细致的叮咚编程与调参建议',
    priceLabel: '¥168',
    amount: 168,
    category: '高级教练',
    detailTitle: '升级叮咚教练能力',
    detailBody: '适合需要更深入编程指导的学员。高级教练会提供更完整的运动控制建议、调参思路和训练拆解。',
    perks: ['更细节的编程建议', '更完整的运动控制提示', '更适合竞赛训练'],
  },
  {
    id: 'dingdong-style',
    title: '叮咚个性定制',
    subtitle: '解锁个性皮肤、语音和角色设定',
    priceLabel: '¥66',
    amount: 66,
    category: '个性定制',
    detailTitle: '打造专属叮咚个性',
    detailBody: '适合希望叮咚更有陪伴感的孩子。可以解锁不同主题的人设风格、语音风格和个性配色。',
    perks: ['专属叮咚形象', '个性语音风格', '虚拟角色装扮'],
  },
  {
    id: 'sensor-kit',
    title: '传感器配件包',
    subtitle: '为叮咚加入更多传感器训练任务',
    priceLabel: '¥128',
    amount: 128,
    category: '传感器配件',
    detailTitle: '扩展叮咚感知能力',
    detailBody: '适合进行更复杂机器人任务训练的孩子。通过配件包可延展颜色、避障与交互类练习。',
    perks: ['更多感知训练任务', '扩展控制场景', '适配高级课程'],
  },
];
