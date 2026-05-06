import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import StageLandingTemplate from './StageLandingTemplate';
import { RootStackParamList } from './navigationTypes';

type IntermediateScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Intermediate'>;
};

export default function IntermediateScreen({ navigation }: IntermediateScreenProps) {
  return (
    <StageLandingTemplate
      navigation={navigation}
      badge="INTERMEDIATE STAGE"
      title="中级者"
      subtitle="继续练习判断、循环和更稳定的动作，让机器人开始像选手一样工作。"
      themeColor="#FFB8D1"
      progress="66%"
      rankLabel="B+"
      missions={[
        { title: '循环巡航', detail: '使用重复指令让机器人完成固定路线巡航。', reward: '120 XP' },
        { title: '传感器初判断', detail: '让机器人在看见颜色后再做出不同动作。', reward: '感应贴纸' },
        { title: '结构升级', detail: '把机器人前部改成更不容易碰歪的结构。', reward: '改装零件' },
      ]}
      skills={[
        { label: '逻辑判断', progress: '68%' },
        { label: '路线控制', progress: '65%' },
        { label: '问题排查', progress: '61%' },
      ]}
      rewardTitle="中级成长礼包"
      rewardBody="完成后将获得一张结构优化卡和新的训练挑战徽章。"
      helperTip="如果机器人表现不稳定，可以先把速度调慢，再重新观察每一步。"
    />
  );
}
