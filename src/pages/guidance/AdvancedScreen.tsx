import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import StageLandingTemplate from './StageLandingTemplate';

type RootStackParamList = {
  Navigation: undefined;
  Home: undefined;
  Profile: undefined;
  Record: undefined;
  SuperAdvanced: undefined;
  Advanced: undefined;
  Intermediate: undefined;
  Beginner: undefined;
  Intro: undefined;
  Enthusiast: undefined;
  ExchangeIsland: undefined;
  Message: undefined;
  Contact: undefined;
  AI: undefined;
  LearningMap: undefined;
};

type AdvancedScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Advanced'>;
};

export default function AdvancedScreen({ navigation }: AdvancedScreenProps) {
  return (
    <StageLandingTemplate
      navigation={navigation}
      badge="ADVANCED STAGE"
      title="高级者"
      subtitle="开始练习更完整的任务流程，学习把结构、编程和路线安排组合起来。"
      themeColor="#8BE0A9"
      progress="78%"
      rankLabel="A"
      missions={[
        { title: '转弯更精准', detail: '调整角度参数，让机器人在两个任务点之间稳定转向。', reward: '160 XP' },
        { title: '双任务连通', detail: '把两个比赛动作串成一条完整流程。', reward: '进阶星星' },
        { title: '队友分工表', detail: '设计一份训练分工，明确谁搭建、谁调试、谁记录。', reward: '合作勋章' },
      ]}
      skills={[
        { label: '流程规划', progress: '80%' },
        { label: '结构稳定', progress: '76%' },
        { label: '团队合作', progress: '82%' },
      ]}
      rewardTitle="高级训练包"
      rewardBody="通关后可以获得一套高级任务清单和训练复盘卡。"
      helperTip="高级阶段最适合开始做训练记录，把每次修改后的表现写下来。"
    />
  );
}
