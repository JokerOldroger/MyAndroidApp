import React, { useMemo, useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList, navigateToMainTab } from './navigationTypes';

type EnthusiastScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Enthusiast'>;
};

type ModuleDefinition = {
  id: 'speed' | 'distance' | 'obstacle' | 'loop';
  title: string;
  shortLabel: string;
  description: string;
  color: string;
  promptLine: string;
};

const moduleLibrary: ModuleDefinition[] = [
  {
    id: 'speed',
    title: '设置轮速',
    shortLabel: '轮速',
    description: '把左右轮都设置成相同速度，让机器人更容易走直线。',
    color: '#67D39A',
    promptLine: '把左右轮速都设置为 40，保持相同输出，让机器人稳定直线前进。',
  },
  {
    id: 'distance',
    title: '设置直线距离',
    shortLabel: '距离',
    description: '告诉 AI 要向前直线移动多远，比如 120 厘米。',
    color: '#7FDFFF',
    promptLine: '让机器人沿直线移动 120 厘米，到达目标点后停止。',
  },
  {
    id: 'obstacle',
    title: '障碍判断',
    shortLabel: '避障',
    description: '当前方距离小于 20 厘米时，停下并绕开障碍，再回到路线。',
    color: '#FFB86E',
    promptLine: '如果前方障碍距离小于 20 厘米，就立即停止，轻微右转绕开，再回到原来的直线路线。',
  },
  {
    id: 'loop',
    title: '往返循环',
    shortLabel: '循环',
    description: '完成一次前进后返回起点，并重复 3 轮，用来做往返跑训练。',
    color: '#D2A2FF',
    promptLine: '把前进和返回起点作为一轮，连续执行 3 轮往返跑训练。',
  },
];

const missionChecklist = [
  '轮式机器人要能沿直线稳定前进',
  'AI 指令里必须包含直线移动距离',
  '要说明轮速如何设置才能更直',
  '要有遇到障碍时的判断条件',
  '要加入往返跑的循环逻辑',
];

function buildCppCode(selectedModules: ModuleDefinition[]) {
  const hasSpeed = selectedModules.some((item) => item.id === 'speed');
  const hasDistance = selectedModules.some((item) => item.id === 'distance');
  const hasObstacle = selectedModules.some((item) => item.id === 'obstacle');
  const hasLoop = selectedModules.some((item) => item.id === 'loop');

  const codeLines = [
    '#include <iostream>',
    'using namespace std;',
    '',
    'double readObstacleDistance() {',
    '  return 30.0;',
    '}',
    '',
    'void setWheelSpeed(int leftSpeed, int rightSpeed) {',
    '  cout << "Set wheel speed: " << leftSpeed << ", " << rightSpeed << endl;',
    '}',
    '',
    'void moveStraight(double distanceCm) {',
    '  cout << "Move straight: " << distanceCm << " cm" << endl;',
    '}',
    '',
    'void stopRobot() {',
    '  cout << "Stop robot" << endl;',
    '}',
    '',
    'void turnRightSlightly() {',
    '  cout << "Turn right slightly" << endl;',
    '}',
    '',
    'void returnToLine() {',
    '  cout << "Return to original line" << endl;',
    '}',
    '',
    'int main() {',
  ];

  if (hasLoop) {
    codeLines.push('  for (int lap = 0; lap < 3; ++lap) {');
  }

  const indent = hasLoop ? '    ' : '  ';

  if (hasSpeed) {
    codeLines.push(`${indent}setWheelSpeed(40, 40);`);
  }

  if (hasObstacle) {
    codeLines.push(`${indent}if (readObstacleDistance() < 20.0) {`);
    codeLines.push(`${indent}  stopRobot();`);
    codeLines.push(`${indent}  turnRightSlightly();`);
    codeLines.push(`${indent}  returnToLine();`);
    codeLines.push(`${indent}}`);
  }

  if (hasDistance) {
    codeLines.push(`${indent}moveStraight(120.0);`);
  }

  if (hasLoop) {
    codeLines.push(`${indent}moveStraight(120.0);`);
    codeLines.push(`${indent}setWheelSpeed(-40, -40);`);
    codeLines.push(`${indent}moveStraight(120.0);`);
    codeLines.push('  }');
  }

  codeLines.push('  stopRobot();');
  codeLines.push('  return 0;');
  codeLines.push('}');

  return codeLines.join('\n');
}

export default function EnthusiastScreen({ navigation }: EnthusiastScreenProps) {
  const [programBlocks, setProgramBlocks] = useState<ModuleDefinition[]>([]);
  const [feedback, setFeedback] = useState('先从下方模块库选择编程块，再把它们组合成一套让机器人走直线的方案。');
  const [hasPassed, setHasPassed] = useState(false);

  const selectedIds = programBlocks.map((item) => item.id);

  const aiPromptPreview = useMemo(() => {
    if (programBlocks.length === 0) {
      return 'AI 运动执行指令会显示在这里。先选择模块，再组合逻辑。';
    }

    return programBlocks.map((item, index) => `${index + 1}. ${item.promptLine}`).join('\n');
  }, [programBlocks]);

  const cppCode = useMemo(() => buildCppCode(programBlocks), [programBlocks]);

  function addModule(moduleItem: ModuleDefinition) {
    setProgramBlocks((current) => [...current, moduleItem]);
    setHasPassed(false);
    setFeedback(`已加入模块：${moduleItem.title}。继续把逻辑拼完整吧。`);
  }

  function moveBlock(index: number, direction: -1 | 1) {
    setProgramBlocks((current) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.length) {
        return current;
      }

      const next = [...current];
      const temp = next[index];
      next[index] = next[nextIndex];
      next[nextIndex] = temp;
      return next;
    });
    setHasPassed(false);
  }

  function removeBlock(index: number) {
    setProgramBlocks((current) => current.filter((_, itemIndex) => itemIndex !== index));
    setHasPassed(false);
  }

  function resetProgram() {
    setProgramBlocks([]);
    setHasPassed(false);
    setFeedback('程序区已清空。重新开始组合新的模块逻辑吧。');
  }

  function runProgram() {
    const needed: ModuleDefinition['id'][] = ['speed', 'distance', 'obstacle', 'loop'];
    const missing = needed.filter((item) => !selectedIds.includes(item));

    if (missing.length > 0) {
      const labelMap: Record<ModuleDefinition['id'], string> = {
        speed: '设置轮速',
        distance: '设置直线距离',
        obstacle: '障碍判断',
        loop: '往返循环',
      };
      setHasPassed(false);
      setFeedback(`还差这些关键模块：${missing.map((item) => labelMap[item]).join('、')}。补齐后再运行试试。`);
      return;
    }

    const speedIndex = selectedIds.indexOf('speed');
    const distanceIndex = selectedIds.indexOf('distance');
    const loopIndex = selectedIds.indexOf('loop');

    if (speedIndex > distanceIndex) {
      setHasPassed(false);
      setFeedback('建议先设置轮速，再设置直线移动距离，这样 AI 会先知道怎么稳定驱动轮子。');
      return;
    }

    if (loopIndex < distanceIndex) {
      setHasPassed(false);
      setFeedback('往返循环应该放在基础运动逻辑之后，让 AI 先学会直行，再重复执行。');
      return;
    }

    setHasPassed(true);
    setFeedback('闯关成功。机器人已经能根据轮速、距离、障碍判断和循环逻辑完成直线往返训练。');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../../../assets/homepage/homepage_bg.png')}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.heroCard}>
            <View style={styles.heroCopy}>
              <Text style={styles.heroBadge}>FUN CHALLENGE</Text>
              <Text style={styles.heroTitle}>爱好者任务闯关</Text>
              <Text style={styles.heroSubtitle}>
                目标：用模块化编程，让轮式移动机器人学会直线前进、避开障碍，并完成往返跑循环。
              </Text>
            </View>
            <Image source={require('../../../assets/bisai-2.png')} style={styles.heroImage} />
          </View>

          <View style={styles.missionCard}>
            <Text style={styles.sectionTitle}>本关目标</Text>
            {missionChecklist.map((item) => (
              <View key={item} style={styles.checkRow}>
                <View style={styles.checkDot} />
                <Text style={styles.checkText}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>模块库</Text>
            <Text style={styles.sectionTag}>DRAG STYLE</Text>
          </View>

          <View style={styles.moduleGrid}>
            {moduleLibrary.map((moduleItem) => (
              <Pressable
                key={moduleItem.id}
                style={[styles.moduleCard, { borderTopColor: moduleItem.color }]}
                onPress={() => addModule(moduleItem)}
              >
                <Text style={styles.moduleTitle}>{moduleItem.title}</Text>
                <Text style={styles.moduleDescription}>{moduleItem.description}</Text>
                <Text style={[styles.moduleAdd, { color: moduleItem.color }]}>点击加入</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>程序区</Text>
            <Text style={styles.sectionTag}>WORKSPACE</Text>
          </View>

          <View style={styles.workspaceCard}>
            {programBlocks.length === 0 ? (
              <Text style={styles.emptyWorkspaceText}>还没有模块。先从上面的模块库选择编程块。</Text>
            ) : (
              programBlocks.map((block, index) => (
                <View key={`${block.id}-${index}`} style={styles.programRow}>
                  <View style={[styles.programTag, { backgroundColor: block.color }]}>
                    <Text style={styles.programTagText}>{block.shortLabel}</Text>
                  </View>
                  <View style={styles.programCopy}>
                    <Text style={styles.programTitle}>{block.title}</Text>
                    <Text style={styles.programDescription}>{block.description}</Text>
                  </View>
                  <View style={styles.programActions}>
                    <Pressable style={styles.smallAction} onPress={() => moveBlock(index, -1)}>
                      <Text style={styles.smallActionText}>上移</Text>
                    </Pressable>
                    <Pressable style={styles.smallAction} onPress={() => moveBlock(index, 1)}>
                      <Text style={styles.smallActionText}>下移</Text>
                    </Pressable>
                    <Pressable style={styles.smallDangerAction} onPress={() => removeBlock(index)}>
                      <Text style={styles.smallDangerText}>删除</Text>
                    </Pressable>
                  </View>
                </View>
              ))
            )}
          </View>

          <View style={styles.actionRow}>
            <Pressable style={styles.primaryButton} onPress={runProgram}>
              <Text style={styles.primaryButtonText}>运行程序</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={resetProgram}>
              <Text style={styles.secondaryButtonText}>重置程序</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={() => navigateToMainTab(navigation, 'AI')}>
              <Text style={styles.secondaryButtonText}>问 AI 教练</Text>
            </Pressable>
          </View>

          <View style={[styles.feedbackCard, hasPassed ? styles.feedbackPass : styles.feedbackNormal]}>
            <Text style={styles.feedbackTitle}>{hasPassed ? '执行结果：成功' : '执行提示'}</Text>
            <Text style={styles.feedbackText}>{feedback}</Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>给 AI 的运动指令 Prompt</Text>
            <Text style={styles.sectionTag}>PROMPT</Text>
          </View>

          <View style={styles.promptCard}>
            <Text style={styles.promptText}>{aiPromptPreview}</Text>
          </View>

          {hasPassed && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>自动生成的 C++ 逻辑</Text>
                <Text style={styles.sectionTag}>C++</Text>
              </View>

              <View style={styles.codeCard}>
                <Text style={styles.codeText}>{cppCode}</Text>
              </View>

              <View style={styles.explainCard}>
                <Text style={styles.explainTitle}>设计思路与编译逻辑</Text>
                <Text style={styles.explainText}>
                  1. 先设置左右轮速一致，这样机器人更容易保持直线方向。
                  {'\n'}
                  2. 再给出直线移动距离，让控制器知道要前进多远。
                  {'\n'}
                  3. 使用 `if` 判断障碍距离是否小于 20 厘米，如果太近就先停下，再转向绕开。
                  {'\n'}
                  4. 使用 `for` 循环把前进和返回过程重复 3 轮，形成往返跑训练。
                  {'\n'}
                  5. 编译时，C++ 会先检查函数是否声明完整，再把主程序 `main()` 中的逻辑按顺序执行。
                </Text>
              </View>
            </>
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDF7F1',
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.14,
  },
  content: {
    padding: 18,
    paddingBottom: 34,
  },
  heroCard: {
    borderRadius: 8,
    backgroundColor: '#FFA98A',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroCopy: {
    flex: 1,
    paddingRight: 12,
  },
  heroBadge: {
    color: '#8A4A21',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 8,
  },
  heroTitle: {
    color: '#5C2710',
    fontSize: 30,
    fontWeight: '900',
  },
  heroSubtitle: {
    marginTop: 8,
    color: '#6E361D',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },
  heroImage: {
    width: 88,
    height: 88,
    resizeMode: 'contain',
  },
  missionCard: {
    marginTop: 14,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3E4D7',
    padding: 16,
  },
  sectionHeader: {
    marginTop: 18,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#4B3022',
    fontSize: 21,
    fontWeight: '900',
  },
  sectionTag: {
    color: '#8A7569',
    fontSize: 12,
    fontWeight: '900',
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#67D39A',
    marginRight: 10,
  },
  checkText: {
    flex: 1,
    color: '#5B4033',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  moduleGrid: {
    gap: 12,
  },
  moduleCard: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0E2D7',
    borderTopWidth: 5,
    padding: 14,
  },
  moduleTitle: {
    color: '#4E3428',
    fontSize: 17,
    fontWeight: '900',
  },
  moduleDescription: {
    marginTop: 6,
    color: '#7A6156',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 20,
  },
  moduleAdd: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '900',
  },
  workspaceCard: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0E2D7',
    padding: 14,
    gap: 12,
  },
  emptyWorkspaceText: {
    color: '#877065',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },
  programRow: {
    borderRadius: 8,
    backgroundColor: '#FFF8F4',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  programTag: {
    minWidth: 52,
    minHeight: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginRight: 10,
  },
  programTagText: {
    color: '#3A2A21',
    fontSize: 12,
    fontWeight: '900',
  },
  programCopy: {
    flex: 1,
    paddingRight: 10,
  },
  programTitle: {
    color: '#4B3428',
    fontSize: 15,
    fontWeight: '900',
  },
  programDescription: {
    marginTop: 4,
    color: '#7C665A',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
  },
  programActions: {
    gap: 6,
  },
  smallAction: {
    minWidth: 52,
    minHeight: 28,
    borderRadius: 14,
    backgroundColor: '#EAF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  smallActionText: {
    color: '#285179',
    fontSize: 11,
    fontWeight: '900',
  },
  smallDangerAction: {
    minWidth: 52,
    minHeight: 28,
    borderRadius: 14,
    backgroundColor: '#FFF0EF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  smallDangerText: {
    color: '#A2463B',
    fontSize: 11,
    fontWeight: '900',
  },
  actionRow: {
    marginTop: 14,
    gap: 10,
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: 26,
    backgroundColor: '#FFA98A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#4F2715',
    fontSize: 15,
    fontWeight: '900',
  },
  secondaryButton: {
    minHeight: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0E2D7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#5E4536',
    fontSize: 14,
    fontWeight: '900',
  },
  feedbackCard: {
    marginTop: 14,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
  },
  feedbackNormal: {
    backgroundColor: '#FFFFFF',
    borderColor: '#F0E2D7',
  },
  feedbackPass: {
    backgroundColor: '#EEFFF5',
    borderColor: '#92DFB2',
  },
  feedbackTitle: {
    color: '#4B3022',
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 6,
  },
  feedbackText: {
    color: '#6E584A',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },
  promptCard: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0E2D7',
    padding: 16,
  },
  promptText: {
    color: '#564036',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 22,
  },
  codeCard: {
    borderRadius: 8,
    backgroundColor: '#1F2430',
    padding: 16,
  },
  codeText: {
    color: '#EAF2FF',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 19,
  },
  explainCard: {
    marginTop: 14,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0E2D7',
    padding: 16,
  },
  explainTitle: {
    color: '#4D3327',
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 8,
  },
  explainText: {
    color: '#6D574A',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 22,
  },
});
