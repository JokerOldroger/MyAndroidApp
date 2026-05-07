import React, { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import DingdongLogo from '../shared/components/DingdongLogo';
import { personaCards, pointsBalance, pointsSources, pointsUsage, redeemCodeHints } from './data/couponData';

export default function CouponScreen() {
  const [code, setCode] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroEyebrow}>DINGDONG COUPON</Text>
            <Text style={styles.heroTitle}>卡券中心</Text>
            <Text style={styles.heroSubtitle}>输入官方兑换码，管理虚拟人设卡，并用积分兑换叮咚高级服务。</Text>
          </View>
          <DingdongLogo size={82} />
        </View>

        <View style={styles.inputCard}>
          <Text style={styles.inputTitle}>官方兑换码</Text>
          <View style={styles.inputPanel}>
            <TextInput
              value={code}
              onChangeText={setCode}
              placeholder="输入官方发布的兑换码"
              placeholderTextColor="#7A96AE"
              style={styles.input}
              maxLength={24}
            />
            <Pressable style={styles.redeemButton} accessibilityRole="button" accessibilityLabel="兑换卡券">
              <Text style={styles.redeemButtonText}>兑换</Text>
            </Pressable>
          </View>
          {redeemCodeHints.map((hint) => (
            <Text key={hint} style={styles.hintText}>{hint}</Text>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>虚拟人设卡</Text>
          <Text style={styles.sectionHint}>{personaCards.length}张</Text>
        </View>

        <View style={styles.cardStack}>
          {personaCards.map((card) => (
            <View key={card.id} style={styles.personaCard}>
              <View style={styles.personaHeader}>
                <Text style={styles.personaTag}>{card.tag}</Text>
                <Text style={styles.personaCost}>{card.cost}积分</Text>
              </View>
              <Text style={styles.personaTitle}>{card.title}</Text>
              <Text style={styles.personaDescription}>{card.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.pointsCard}>
          <Text style={styles.pointsLabel}>当前积分</Text>
          <Text style={styles.pointsValue}>{pointsBalance}</Text>
          <Text style={styles.pointsBody}>积分可用于兑换高级教练服务、叮咚个性人设卡，以及专项训练权益。</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>积分来源</Text>
          <Text style={styles.sectionHint}>成长路径</Text>
        </View>

        <View style={styles.cardStack}>
          {pointsSources.map((item) => (
            <View key={item.title} style={styles.sourceCard}>
              <View style={styles.sourceHeader}>
                <Text style={styles.sourceTitle}>{item.title}</Text>
                <Text style={styles.sourceValue}>{item.value}</Text>
              </View>
              <Text style={styles.sourceDetail}>{item.detail}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>积分用途</Text>
          <Text style={styles.sectionHint}>兑换方向</Text>
        </View>

        <View style={styles.usageCard}>
          {pointsUsage.map((item) => (
            <View key={item} style={styles.usageRow}>
              <View style={styles.dot} />
              <Text style={styles.usageText}>{item}</Text>
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
    backgroundColor: '#F4FAFF',
  },
  content: {
    padding: 18,
    paddingBottom: 34,
  },
  heroCard: {
    borderRadius: 8,
    backgroundColor: '#C7B6FF',
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
    color: '#4F4693',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 8,
  },
  heroTitle: {
    color: '#24354D',
    fontSize: 30,
    fontWeight: '900',
  },
  heroSubtitle: {
    marginTop: 8,
    color: '#5E5C7A',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },
  inputCard: {
    marginTop: 14,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCECF7',
    padding: 16,
  },
  inputTitle: {
    color: '#20374E',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 10,
  },
  inputPanel: {
    borderRadius: 8,
    backgroundColor: '#F8FBFF',
    borderWidth: 1,
    borderColor: '#DCECF7',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    minHeight: 42,
    color: '#20374E',
    fontSize: 15,
    fontWeight: '700',
    paddingHorizontal: 8,
  },
  redeemButton: {
    minWidth: 78,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#67D39A',
  },
  redeemButtonText: {
    color: '#17384D',
    fontSize: 14,
    fontWeight: '900',
  },
  hintText: {
    marginTop: 8,
    color: '#6D8397',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
  },
  sectionHeader: {
    marginTop: 22,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  personaCard: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2EEF7',
    padding: 16,
  },
  personaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  personaTag: {
    color: '#6E88A3',
    fontSize: 12,
    fontWeight: '900',
  },
  personaCost: {
    color: '#7A4DCE',
    fontSize: 16,
    fontWeight: '900',
  },
  personaTitle: {
    marginTop: 10,
    color: '#20374E',
    fontSize: 18,
    fontWeight: '900',
  },
  personaDescription: {
    marginTop: 6,
    color: '#5E7488',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },
  pointsCard: {
    marginTop: 14,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCECF7',
    padding: 16,
  },
  pointsLabel: {
    color: '#6B8298',
    fontSize: 13,
    fontWeight: '800',
  },
  pointsValue: {
    marginTop: 6,
    color: '#1D3150',
    fontSize: 34,
    fontWeight: '900',
  },
  pointsBody: {
    marginTop: 8,
    color: '#5E7488',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },
  sourceCard: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2EEF7',
    padding: 16,
  },
  sourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sourceTitle: {
    color: '#20374E',
    fontSize: 16,
    fontWeight: '900',
  },
  sourceValue: {
    color: '#2B8C5A',
    fontSize: 14,
    fontWeight: '900',
  },
  sourceDetail: {
    marginTop: 6,
    color: '#5E7488',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },
  usageCard: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCECF7',
    padding: 16,
    gap: 10,
  },
  usageRow: {
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
  usageText: {
    flex: 1,
    color: '#5E7488',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
});
