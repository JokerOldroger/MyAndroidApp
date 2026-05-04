import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function RecordScreen() {
  const records = [
    { name: '胜场', value: '128' },
    { name: '负场', value: '72' },
    { name: '胜率', value: '64%' },
    { name: '最高连胜', value: '15' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>战绩查看</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.statsContainer}>
          {records.map((item, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statName}>{item.name}</Text>
            </View>
          ))}
        </View>
        <View style={styles.historyContainer}>
          <Text style={styles.sectionTitle}>最近比赛</Text>
          <View style={styles.historyItem}>
            <Text style={styles.historyResult}>胜</Text>
            <Text style={styles.historyInfo}>2024-05-01 15:30</Text>
          </View>
          <View style={styles.historyItem}>
            <Text style={[styles.historyResult, { color: 'red' }]}>负</Text>
            <Text style={styles.historyInfo}>2024-05-01 14:00</Text>
          </View>
          <View style={styles.historyItem}>
            <Text style={styles.historyResult}>胜</Text>
            <Text style={styles.historyInfo}>2024-04-30 20:30</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '23%',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  statName: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  historyContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  historyResult: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  historyInfo: {
    fontSize: 14,
    color: '#666',
  },
});