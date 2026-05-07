export type EnthusiastLevelId = 'intro' | 'level1' | 'level2' | 'level3' | 'level4' | 'level5';

export type EnthusiastLevel = {
  id: EnthusiastLevelId;
  title: string;
  shortLabel: string;
  currentTag: string;
  status: 'completed' | 'current' | 'locked';
  top: `${number}%`;
  left?: `${number}%`;
  right?: `${number}%`;
  width: `${number}%`;
  themeColor: string;
  modules: Array<'speed' | 'distance' | 'obstacle' | 'loop'>;
  missionTitle: string;
  missionBody: string;
  rewardTitle: string;
  rewardBody: string;
  helperTip: string;
};

export const enthusiastLevels: EnthusiastLevel[] = [
  {
    id: 'intro',
    title: '入门',
    shortLabel: '1',
    currentTag: '第1关',
    status: 'completed',
    top: '21.5%',
    left: '16%',
    width: '23%',
    themeColor: '#B9D1FF',
    modules: ['speed', 'distance'],
    missionTitle: '轻松直行',
    missionBody: '让叮咚先学会稳定前进和停止。',
    rewardTitle: '起步徽章',
    rewardBody: '完成后可以解锁更复杂的避障任务。',
    helperTip: '先保持速度一致，再观察叮咚是否能稳定前进。',
  },
  {
    id: 'level1',
    title: '当前',
    shortLabel: '2',
    currentTag: '第2关',
    status: 'current',
    top: '37%',
    right: '12%',
    width: '23%',
    themeColor: '#7A8CFF',
    modules: ['speed', 'distance'],
    missionTitle: '精准直线',
    missionBody: '给叮咚加入更准确的距离控制。',
    rewardTitle: '直线小能手',
    rewardBody: '通过后可解锁避障节点。',
    helperTip: '把轮速调平，再让叮咚的前进距离尽量固定。',
  },
  {
    id: 'level2',
    title: '下一关',
    shortLabel: '3',
    currentTag: '第3关',
    status: 'locked',
    top: '55.5%',
    left: '18%',
    width: '23%',
    themeColor: '#FFB86E',
    modules: ['speed', 'distance', 'obstacle'],
    missionTitle: '避开障碍',
    missionBody: '学会让叮咚停下、绕开，再回到路线。',
    rewardTitle: '避障徽章',
    rewardBody: '完成后可开启循环训练。',
    helperTip: '先观察障碍阈值，再决定叮咚的转向动作。',
  },
  {
    id: 'level3',
    title: '循环',
    shortLabel: '4',
    currentTag: '第4关',
    status: 'locked',
    top: '69.5%',
    right: '15%',
    width: '21%',
    themeColor: '#D2A2FF',
    modules: ['speed', 'distance', 'obstacle', 'loop'],
    missionTitle: '往返循环',
    missionBody: '让叮咚完成完整跑点动作。',
    rewardTitle: '循环挑战卡',
    rewardBody: '完成后能进入高阶路线。',
    helperTip: '循环要放在基础运动逻辑后面，避免叮咚动作顺序混乱。',
  },
  {
    id: 'level4',
    title: '综合',
    shortLabel: '5',
    currentTag: '第5关',
    status: 'locked',
    top: '84.2%',
    left: '23%',
    width: '21%',
    themeColor: '#8BE0A9',
    modules: ['speed', 'distance', 'obstacle', 'loop'],
    missionTitle: '综合任务',
    missionBody: '让叮咚完成更完整的任务流程。',
    rewardTitle: '综合训练箱',
    rewardBody: '完成后可进入最终挑战。',
    helperTip: '像比赛一样整体考虑叮咚动作衔接。',
  },
  {
    id: 'level5',
    title: '终章',
    shortLabel: '6',
    currentTag: '第6关',
    status: 'locked',
    top: '11.5%',
    right: '10%',
    width: '22%',
    themeColor: '#7FE4FF',
    modules: ['speed', 'distance', 'obstacle', 'loop'],
    missionTitle: '最终试炼',
    missionBody: '组织一套稳定、清晰的叮咚运动控制方案。',
    rewardTitle: '爱好者世界完成章',
    rewardBody: '通关后将解锁更高阶的世界。',
    helperTip: '保持简洁，比给叮咚堆砌更多动作更重要。',
  },
];

export const enthusiastCurrentLevelId: EnthusiastLevelId = 'level1';
export const enthusiastMapBackdrop = require('../../../../../assets/map/爱好者map.jpeg');
