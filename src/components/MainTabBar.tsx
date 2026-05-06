import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppNavigationProp, MainTabRoute, navigateToMainTab } from '../pages/guidance/navigationTypes';

type MainTabBarProps = {
  currentRoute: MainTabRoute;
  navigation: AppNavigationProp;
};

type TabDefinition = {
  route: MainTabRoute;
  color: string;
  label: string;
};

const tabs: TabDefinition[] = [
  { route: 'LearningMap', color: '#67D39A', label: '地图' },
  { route: 'Record', color: '#FFB84D', label: '记录' },
  { route: 'Community', color: '#8D7CFF', label: '社区' },
  { route: 'AI', color: '#58C7F3', label: '聊天' },
  { route: 'Navigation', color: '#2037A4', label: '导航菜单' },
];

function TabIcon({ route, color, active }: { route: MainTabRoute; color: string; active: boolean }) {
  const strokeColor = active ? color : '#94A7BC';

  if (route === 'LearningMap') {
    return (
      <View style={styles.iconFrame}>
        <View style={[styles.pinHead, { borderColor: strokeColor }]} />
        <View style={[styles.pinTail, { backgroundColor: strokeColor }]} />
      </View>
    );
  }

  if (route === 'Record') {
    return (
      <View style={[styles.iconFrame, styles.barChart]}>
        <View style={[styles.chartBar, styles.chartBarShort, { backgroundColor: strokeColor }]} />
        <View style={[styles.chartBar, styles.chartBarMid, { backgroundColor: strokeColor }]} />
        <View style={[styles.chartBar, styles.chartBarTall, { backgroundColor: strokeColor }]} />
      </View>
    );
  }

  if (route === 'Community') {
    return (
      <View style={styles.iconFrame}>
        <View style={[styles.communityHeadMain, { backgroundColor: strokeColor }]} />
        <View style={[styles.communityHeadSide, styles.communityHeadLeft, { backgroundColor: strokeColor }]} />
        <View style={[styles.communityHeadSide, styles.communityHeadRight, { backgroundColor: strokeColor }]} />
        <View style={[styles.communityBodyMain, { backgroundColor: strokeColor }]} />
        <View style={[styles.communityBodySide, styles.communityBodyLeft, { backgroundColor: strokeColor }]} />
        <View style={[styles.communityBodySide, styles.communityBodyRight, { backgroundColor: strokeColor }]} />
      </View>
    );
  }

  if (route === 'AI') {
    return (
      <View style={styles.iconFrame}>
        <View style={[styles.chatBubble, { borderColor: strokeColor }]}>
          <View style={[styles.chatLine, { backgroundColor: strokeColor }]} />
          <View style={[styles.chatLine, styles.chatLineShort, { backgroundColor: strokeColor }]} />
        </View>
        <View style={[styles.chatTail, { backgroundColor: strokeColor }]} />
      </View>
    );
  }

  return (
    <View style={[styles.iconFrame, styles.gridIcon]}>
      {[0, 1, 2, 3].map((item) => (
        <View key={item} style={[styles.gridCell, { backgroundColor: strokeColor }]} />
      ))}
    </View>
  );
}

export default function MainTabBar({ currentRoute, navigation }: MainTabBarProps) {
  return (
    <View style={styles.wrap} pointerEvents="box-none">
      <View style={styles.bar} accessibilityRole="tablist">
        {tabs.map((tab) => {
          const isActive = tab.route === currentRoute;

          return (
            <Pressable
              key={tab.route}
              accessibilityRole="tab"
              accessibilityLabel={tab.label}
              accessibilityState={{ selected: isActive }}
              onPress={() => {
                if (!isActive) {
                  navigateToMainTab(navigation, tab.route);
                }
              }}
              style={styles.tabButton}
            >
              <View style={[styles.iconCircle, isActive && { backgroundColor: `${tab.color}22` }]}>
                <TabIcon route={tab.route} color={tab.color} active={isActive} />
              </View>
              <View style={[styles.activeLine, isActive && { backgroundColor: tab.color }]} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 18,
  },
  bar: {
    minHeight: 76,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2EEF7',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#89A9C8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 8,
  },
  tabButton: {
    width: '19%',
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  iconFrame: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinHead: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2.5,
    backgroundColor: '#FFFFFF',
  },
  pinTail: {
    width: 10,
    height: 10,
    borderRadius: 2,
    marginTop: -2,
    transform: [{ rotate: '45deg' }],
  },
  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 3,
  },
  chartBar: {
    width: 4,
    borderRadius: 2,
  },
  chartBarShort: {
    height: 8,
  },
  chartBarMid: {
    height: 13,
  },
  chartBarTall: {
    height: 18,
  },
  communityHeadMain: {
    position: 'absolute',
    top: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  communityHeadSide: {
    position: 'absolute',
    top: 5,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  communityHeadLeft: {
    left: 2,
  },
  communityHeadRight: {
    right: 2,
  },
  communityBodyMain: {
    position: 'absolute',
    top: 11,
    width: 14,
    height: 7,
    borderRadius: 4,
  },
  communityBodySide: {
    position: 'absolute',
    top: 12,
    width: 8,
    height: 6,
    borderRadius: 3,
  },
  communityBodyLeft: {
    left: 1,
  },
  communityBodyRight: {
    right: 1,
  },
  chatBubble: {
    width: 18,
    height: 14,
    borderRadius: 6,
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  chatLine: {
    width: 9,
    height: 2,
    borderRadius: 1,
  },
  chatLineShort: {
    width: 6,
  },
  chatTail: {
    position: 'absolute',
    bottom: 1,
    right: 2,
    width: 7,
    height: 7,
    borderRadius: 2,
    transform: [{ rotate: '35deg' }],
  },
  gridIcon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
    alignContent: 'center',
    justifyContent: 'center',
  },
  gridCell: {
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  activeLine: {
    marginTop: 4,
    width: 20,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
});
