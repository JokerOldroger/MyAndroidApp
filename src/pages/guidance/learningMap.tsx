import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Record: undefined;
  Message: undefined;
  Contact: undefined;
  AI: undefined;
  LearningMap: undefined;
};

type LearningMapProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'LearningMap'>;
};

const { width, height } = Dimensions.get('window');

const levelButtons = [
  { name: '爱好者', color: '#FF6B6B', size: 50, rotate: '15deg', top: 400, right: 90 },
  { name: '初级', color: '#4ECDC4', size: 50, rotate: '10deg', top: 260, right: 70 },
  { name: '中级', color: '#45B7D1', size: 50, rotate: '-8deg', top: 160, left: 80 },
  { name: '高级', color: '#96CEB4', size: 50, rotate: '12deg', top: 90, right: 80 },
  { name: '交流岛', color: '#FFEAA7', size: 50, rotate: '-15deg', top: 390, left: 70 },
  { name: '超高级', color: '#DDA0DD', size: 50, rotate: '-8deg', top: 42, left: 115 },
  { name: '入门者', color: '#DAA0DD', size: 50, rotate: '-25deg', top: 535, left: 135 },
];

export default function LearningMap({ navigation }: LearningMapProps) {
  return (
    <ImageBackground
      source={require('../../../assets/homepage/homepage_bg.png')}
      style={styles.container}
      resizeMode="stretch"
    >
      <SafeAreaView style={styles.overlay}>

        <View style={styles.mapContainer}>
          {levelButtons.map((btn, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.levelButton,
                {
                  width: btn.size*2,
                  height: btn.size,
                  borderRadius: btn.size / 2,
                  backgroundColor: btn.color,
                  transform: [{ rotate: btn.rotate }],
                  position: 'absolute',
                  top: btn.top,
                  left: btn.left,
                  right: btn.right,
                },
              ]}
              onPress={() => console.log(`${btn.name} pressed`)}
            >
              <Text style={styles.levelButtonText}>{btn.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.bottomButton} onPress={() => console.log('Battle pressed')}>
            <Text style={styles.bottomButtonIcon}>⚔️</Text>
            <Text style={styles.bottomButtonText}>Battle</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomButton} onPress={() => console.log('Task pressed')}>
            <Text style={styles.bottomButtonIcon}>📋</Text>
            <Text style={styles.bottomButtonText}>任务</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.bottomButtonIcon}>👤</Text>
            <Text style={styles.bottomButtonText}>我的</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    padding: 20,
    backgroundColor: 'rgba(74,144,226,0.85)',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
    padding: 20,
  },
  levelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  levelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: 'transparent',
  },
  bottomButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    minWidth: 90,
  },
  bottomButtonIcon: {
    fontSize: 28,
    marginBottom: 5,
  },
  bottomButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
});
