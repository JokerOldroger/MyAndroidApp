import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import StageLandingTemplate from '../shared/StageLandingTemplate';
import { RootStackParamList } from '../../shared/navigation/navigationTypes';

type SuperAdvancedScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SuperAdvanced'>;
};

export default function SuperAdvancedScreen({ navigation }: SuperAdvancedScreenProps) {
  return (
    <StageLandingTemplate
      navigation={navigation}
      badge="SUPER STAGE"
      title="超高级者"
      subtitle="挑战复合任务、比赛策略和高阶自动化，让叮咚做出更聪明的判断。"
      themeColor="#7FE4FF"
      progress="91%"
      rankLabel="S+"
      missions={[
        { title: '多传感器联动', detail: '让叮咚同时使用颜色与距离判断来完成任务。', reward: '240 XP' },
        { title: '比赛复盘挑战', detail: '分析一次失败回合，找出 2 个可优化点。', reward: '勋章碎片' },
        { title: 'AI 策略训练', detail: '用 叮咚教练整理一套终局得分策略。', reward: '高级徽章' },
      ]}
      skills={[
        { label: '策略设计', progress: '92%' },
        { label: '程序调优', progress: '88%' },
        { label: '临场判断', progress: '84%' },
      ]}
      rewardTitle="超高级挑战宝箱"
      rewardBody="完成本阶段训练后，可解锁一套高分路线模板和专属进阶勋章。"
      helperTip="先让叮咚稳定完成，再追求更快更复杂。高阶选手最重要的是稳定性。"
    />
  );
}
