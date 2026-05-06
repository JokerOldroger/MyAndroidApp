import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import StageLandingTemplate from './StageLandingTemplate';
import { RootStackParamList } from './navigationTypes';

type IntroScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Intro'>;
};

export default function IntroScreen({ navigation }: IntroScreenProps) {
  return (
    <StageLandingTemplate
      navigation={navigation}
      badge="INTRO STAGE"
      title="入门者"
      subtitle="第一次认识机器人比赛，从零开始也没关系，这里会一步一步带你上手。"
      themeColor="#B9D1FF"
      progress="28%"
      rankLabel="START"
      missions={[
        { title: '认识机器人', detail: '看看机器人有哪些部分，知道轮子、机身和传感器的名字。', reward: '40 XP' },
        { title: '学会开始按钮', detail: '练习启动、停止和重新开始一次简单动作。', reward: '入门徽章' },
        { title: '找到任务区', detail: '在比赛图上指出起点、任务区和终点。', reward: '地图星星' },
      ]}
      skills={[
        { label: '基础认知', progress: '32%' },
        { label: '操作熟悉', progress: '24%' },
        { label: '规则理解', progress: '29%' },
      ]}
      rewardTitle="入门欢迎箱"
      rewardBody="完成欢迎训练后，可以解锁你的第一枚启程勋章。"
      helperTip="刚开始时多观察、多提问就很好，机器人学习本来就是一步一步来的。"
    />
  );
}
