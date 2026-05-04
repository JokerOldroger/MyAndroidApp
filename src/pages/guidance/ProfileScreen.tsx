import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>👤</Text>
        <Text style={styles.title}>个人信息</Text>
        <View style={styles.infoCard}>
          <Text style={styles.label}>用户名:</Text>
          <Text style={styles.value}>用户123456</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>邮箱:</Text>
          <Text style={styles.value}>user@example.com</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>手机:</Text>
          <Text style={styles.value}>138****8888</Text>
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
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    fontSize: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  infoCard: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});