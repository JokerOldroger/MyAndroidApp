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

type ExchangeIslandScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ExchangeIsland'>;
};

export default function ExchangeIslandScreen({ navigation }: ExchangeIslandScreenProps) {
  return (
    <StageLandingTemplate
      navigation={navigation}
      badge="EXCHANGE ISLAND"
      title="交流岛"
      subtitle="分享作品、讨论比赛、交换灵感，这里适合把学习变成一起完成的冒险。"
      themeColor="#C8A7FF"
      progress="63%"
      rankLabel="TEAM"
      missions={[
        { title: '交流一条技巧', detail: '写下一个你觉得很有用的搭建或调试小经验。', reward: '交流积分' },
        { title: '点评作品', detail: '看看别人的机器人设计，并说出一个你喜欢的地方。', reward: '友谊章' },
        { title: '组队挑战', detail: '和伙伴定一个小目标，一起完成一次练习。', reward: '合作之星' },
      ]}
      skills={[
        { label: '表达分享', progress: '70%' },
        { label: '合作协调', progress: '66%' },
        { label: '作品观察', progress: '61%' },
      ]}
      rewardTitle="交流岛纪念章"
      rewardBody="完成交流任务后，可以获得作品展示位和新的合作称号。"
      helperTip="当你说出自己学到了什么时，记忆会更深，也更容易帮助到队友。"
    />
  );
}
