import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import DingdongLogo from '../shared/components/DingdongLogo';
import { RootStackParamList } from '../shared/navigation/navigationTypes';
import { storedBalance, subscriptionServices } from './data/subscriptionCatalog';

type SubscriptionScreenProps = NativeStackScreenProps<RootStackParamList, 'Subscription'>;

export default function SubscriptionScreen({ navigation }: SubscriptionScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroEyebrow}>DINGDONG SUBSCRIPTION</Text>
            <Text style={styles.heroTitle}>订阅充值</Text>
            <Text style={styles.heroSubtitle}>为叮咚训练账户补充余额，并解锁更多服务类别。</Text>
          </View>
          <DingdongLogo size={82} />
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>当前可用金额</Text>
          <Text style={styles.balanceValue}>¥{storedBalance}</Text>
          <Text style={styles.balanceHint}>可用于购买关卡解锁、高级教练、叮咚个性和传感器配件等服务。</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>可订阅服务</Text>
          <Text style={styles.sectionHint}>4类服务</Text>
        </View>

        <View style={styles.cardStack}>
          {subscriptionServices.map((item) => (
            <Pressable
              key={item.id}
              style={styles.serviceCard}
              onPress={() => navigation.navigate('SubscriptionDetail', { serviceId: item.id })}
              accessibilityRole="button"
              accessibilityLabel={`查看${item.title}详情`}
            >
              <View style={styles.serviceHeader}>
                <Text style={styles.serviceCategory}>{item.category}</Text>
                <Text style={styles.servicePrice}>{item.priceLabel}</Text>
              </View>
              <Text style={styles.serviceTitle}>{item.title}</Text>
              <Text style={styles.serviceSubtitle}>{item.subtitle}</Text>
              <Text style={styles.serviceAction}>查看详情</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EFF7FF',
  },
  content: {
    padding: 18,
    paddingBottom: 34,
  },
  heroCard: {
    borderRadius: 8,
    backgroundColor: '#A3D5FF',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroCopy: {
    flex: 1,
    paddingRight: 10,
  },
  heroEyebrow: {
    color: '#245C82',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 8,
  },
  heroTitle: {
    color: '#1C3550',
    fontSize: 30,
    fontWeight: '900',
  },
  heroSubtitle: {
    marginTop: 8,
    color: '#355F7A',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },
  balanceCard: {
    marginTop: 14,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCECF7',
    padding: 16,
  },
  balanceLabel: {
    color: '#6B8298',
    fontSize: 13,
    fontWeight: '800',
  },
  balanceValue: {
    marginTop: 6,
    color: '#1D3150',
    fontSize: 34,
    fontWeight: '900',
  },
  balanceHint: {
    marginTop: 8,
    color: '#5E7488',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },
  sectionHeader: {
    marginTop: 22,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#1D3150',
    fontSize: 22,
    fontWeight: '900',
  },
  sectionHint: {
    color: '#6E88A3',
    fontSize: 12,
    fontWeight: '900',
  },
  cardStack: {
    gap: 12,
  },
  serviceCard: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2EEF7',
    padding: 16,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceCategory: {
    color: '#6E88A3',
    fontSize: 12,
    fontWeight: '900',
  },
  servicePrice: {
    color: '#2B8C5A',
    fontSize: 18,
    fontWeight: '900',
  },
  serviceTitle: {
    marginTop: 10,
    color: '#20374E',
    fontSize: 18,
    fontWeight: '900',
  },
  serviceSubtitle: {
    marginTop: 6,
    color: '#5E7488',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },
  serviceAction: {
    marginTop: 12,
    color: '#2037A4',
    fontSize: 13,
    fontWeight: '900',
  },
});
