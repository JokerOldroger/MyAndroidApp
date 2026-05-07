import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import DingdongLogo from '../shared/components/DingdongLogo';
import { RootStackParamList } from '../shared/navigation/navigationTypes';
import { subscriptionServices } from './data/subscriptionCatalog';

type SubscriptionDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'SubscriptionDetail'>;

export default function SubscriptionDetailScreen({ route }: SubscriptionDetailScreenProps) {
  const service = subscriptionServices.find((item) => item.id === route.params.serviceId) ?? subscriptionServices[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroEyebrow}>{service.category}</Text>
            <Text style={styles.heroTitle}>{service.title}</Text>
            <Text style={styles.heroSubtitle}>{service.subtitle}</Text>
          </View>
          <DingdongLogo size={82} />
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>{service.detailTitle}</Text>
          <Text style={styles.detailBody}>{service.detailBody}</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>服务包含</Text>
          <Text style={styles.sectionHint}>{service.priceLabel}</Text>
        </View>

        <View style={styles.listCard}>
          {service.perks.map((perk) => (
            <View key={perk} style={styles.listRow}>
              <View style={styles.dot} />
              <Text style={styles.listText}>{perk}</Text>
            </View>
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
  detailCard: {
    marginTop: 14,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCECF7',
    padding: 16,
  },
  detailTitle: {
    color: '#1D3150',
    fontSize: 20,
    fontWeight: '900',
  },
  detailBody: {
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
    color: '#2B8C5A',
    fontSize: 16,
    fontWeight: '900',
  },
  listCard: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCECF7',
    padding: 16,
    gap: 10,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#67D39A',
    marginRight: 10,
  },
  listText: {
    flex: 1,
    color: '#5E7488',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
});
