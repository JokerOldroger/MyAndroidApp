import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import StageLandingTemplate from './StageLandingTemplate';
import { RootStackParamList } from './navigationTypes';

type BeginnerScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Beginner'>;
};

export default function BeginnerScreen({ navigation }: BeginnerScreenProps) {
  return (
    <StageLandingTemplate
      navigation={navigation}
      badge="BEGINNER STAGE"
      title="初级者"
      subtitle="开始把基本搭建和简单程序组合起来，让机器人完成第一批小任务。"
      themeColor="#FFD77E"
      progress="52%"
      rankLabel="C+"
      missions={[
        { title: '前进与停止', detail: '让机器人前进、停下，再准确回到起始区域。', reward: '80 XP' },
        { title: '认识比赛区', detail: '观察任务台，找出 3 个可以得分的位置。', reward: '地图贴纸' },
        { title: '小组练习', detail: '和队友一起完成一次 5 分钟快搭任务。', reward: '合作星' },
      ]}
      skills={[
        { label: '基础搭建', progress: '55%' },
        { label: '简单程序', progress: '49%' },
        { label: '比赛观察', progress: '53%' },
      ]}
      rewardTitle="初级出发礼包"
      rewardBody="完成本阶段后，你会获得更多任务点提示和一个新的机器人装扮。"
      helperTip="初级阶段不用急着做复杂任务，先把一个简单动作练到稳定最有帮助。"
    />
  );
}
