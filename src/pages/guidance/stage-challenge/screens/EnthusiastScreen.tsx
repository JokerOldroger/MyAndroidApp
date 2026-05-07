import React from 'react';
import { ImageBackground, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../shared/navigation/navigationTypes';
import {
  enthusiastCurrentLevelId,
  enthusiastLevels,
  enthusiastMapBackdrop,
} from '../data/enthusiastLevels';

type EnthusiastScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Enthusiast'>;
};

export default function EnthusiastScreen({ navigation }: EnthusiastScreenProps) {
  const currentLevel =
    enthusiastLevels.find((item) => item.id === enthusiastCurrentLevelId) ?? enthusiastLevels[1];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={enthusiastMapBackdrop} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          {enthusiastLevels.map((level) => {
            const isCurrent = level.id === currentLevel.id;
            const isCompleted = level.status === 'completed';
            const isLocked = level.status === 'locked';

            return (
              <Pressable
                key={level.id}
                style={[
                  styles.levelNode,
                  {
                    top: level.top,
                    left: level.left,
                    right: level.right,
                    width: level.width,
                    borderColor: isCurrent ? '#5A39D6' : isCompleted ? '#67D39A' : '#E8E0FF',
                    backgroundColor: isCurrent ? '#FFFFFF' : 'rgba(255,255,255,0.92)',
                  },
                ]}
                onPress={() => navigation.navigate('EnthusiastLevel', { levelId: level.id })}
                accessibilityRole="button"
                accessibilityLabel={`${level.currentTag}${isCurrent ? '，当前关卡' : isCompleted ? '，已完成' : '，未解锁'}，点击进入`}
              >
                <View style={[styles.levelBadge, isCurrent && styles.levelBadgeCurrent, isCompleted && styles.levelBadgeCompleted, isLocked && styles.levelBadgeLocked]}>
                  <Text style={styles.levelBadgeText}>{level.shortLabel}</Text>
                </View>
                <Text style={styles.levelMeta}>{level.currentTag}</Text>
              </Pressable>
            );
          })}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#5E2BD6',
  },
  background: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'rgba(78, 26, 170, 0.03)',
  },
  levelNode: {
    position: 'absolute',
    minHeight: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  levelBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#CFC3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelBadgeCurrent: {
    backgroundColor: '#5A39D6',
  },
  levelBadgeCompleted: {
    backgroundColor: '#67D39A',
  },
  levelBadgeLocked: {
    backgroundColor: '#DDD5F8',
  },
  levelBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  levelMeta: {
    color: '#2A2D59',
    fontSize: 12,
    fontWeight: '800',
  },
});
