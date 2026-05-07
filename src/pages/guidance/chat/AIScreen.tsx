import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import DingdongLogo from '../shared/components/DingdongLogo';
import {
  ChatMessage,
  getRobotCoachReply,
  makeAssistantMessage,
  makeUserMessage,
} from '../../../services/chat/robotCoach';
import { AppNavigationProp } from '../shared/navigation/navigationTypes';

type AIScreenProps = {
  navigation: AppNavigationProp;
};

const starterPrompts = [
  '怎么让叮咚走直线？',
  '比赛前应该怎么准备叮咚？',
  '叮咚的传感器能做什么？',
  '如何给叮咚安排队友分工？',
];

const welcomeMessage = makeAssistantMessage(
  '你好，我是叮咚教练。你可以问我搭建、编程、传感器、比赛策略和团队合作，我会把适合的指令整理给叮咚去执行运动控制。'
);

export default function AIScreen({ navigation: _navigation }: AIScreenProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modeLabel, setModeLabel] = useState('叮咚训练模式');
  const scrollRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages, isLoading]);

  async function sendMessage(rawText?: string) {
    const content = (rawText ?? input).trim();
    if (!content || isLoading) {
      return;
    }

    const userMessage = makeUserMessage(content);
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const result = await getRobotCoachReply(nextMessages);
      setModeLabel(
        result.mode === 'proxy'
          ? '在线叮咚教练'
          : result.mode === 'openai-compatible'
            ? '实时问答'
            : '本地训练模式'
      );
      setMessages((current) => [...current, makeAssistantMessage(result.reply)]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../../../../assets/homepage/homepage_bg.png')}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.page}>
          <KeyboardAvoidingView
            style={styles.keyboardArea}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <View style={styles.hero}>
              <View style={styles.heroCopy}>
                <Text style={styles.heroEyebrow}>DINGDONG COACH</Text>
                <Text style={styles.heroTitle}>叮咚学习聊天站</Text>
                <Text style={styles.heroSubtitle}>像聊天一样为叮咚准备编程指令和运动控制方案，小朋友也能轻松问问题</Text>
              </View>
              <DingdongLogo size={86} />
            </View>

            <View style={styles.statusBar}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>{modeLabel}</Text>
              <Text style={styles.statusHint}>实时问答 · 儿童友好</Text>
            </View>

            <View style={styles.promptsWrap}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.promptsRow}>
                {starterPrompts.map((prompt) => (
                  <Pressable key={prompt} style={styles.promptChip} onPress={() => sendMessage(prompt)}>
                    <Text style={styles.promptText}>{prompt}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            <ScrollView
              ref={scrollRef}
              style={styles.chatArea}
              contentContainerStyle={styles.chatContent}
              showsVerticalScrollIndicator={false}
            >
              {messages.map((message) => (
                <View
                  key={message.id}
                  style={[
                    styles.messageRow,
                    message.role === 'user' ? styles.userRow : styles.assistantRow,
                  ]}
                >
                  {message.role === 'assistant' && (
                    <View style={styles.avatarWrap}>
                      <Image source={require('../../../../assets/portrait/叮咚头像.png')} style={styles.assistantAvatar} />
                    </View>
                  )}
                  <View
                    style={[
                      styles.messageBubble,
                      message.role === 'user' ? styles.userBubble : styles.assistantBubble,
                    ]}
                  >
                    <Text
                      style={[
                        styles.messageText,
                        message.role === 'user' ? styles.userText : styles.assistantText,
                      ]}
                    >
                      {message.content}
                    </Text>
                  </View>
                </View>
              ))}

              {isLoading && (
                <View style={[styles.messageRow, styles.assistantRow]}>
                  <View style={styles.avatarWrap}>
                    <Image source={require('../../../../assets/portrait/叮咚头像.png')} style={styles.assistantAvatar} />
                  </View>
                  <View style={[styles.messageBubble, styles.assistantBubble, styles.loadingBubble]}>
                    <ActivityIndicator color="#3A89C9" />
                    <Text style={styles.loadingText}>叮咚教练正在整理下发方案...</Text>
                  </View>
                </View>
              )}
            </ScrollView>

            <View style={styles.inputPanel}>
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="问我叮咚比赛、编程、传感器、运动控制..."
                placeholderTextColor="#7A96AE"
                style={styles.input}
                multiline
                maxLength={240}
                editable={!isLoading}
              />
              <Pressable
                style={[styles.sendButton, (!input.trim() || isLoading) && styles.sendButtonDisabled]}
                onPress={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                accessibilityRole="button"
                accessibilityLabel="发送消息"
              >
                <Text style={styles.sendButtonText}>发送</Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8FAFF',
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.16,
  },
  page: {
    flex: 1,
  },
  keyboardArea: {
    flex: 1,
    padding: 18,
    paddingBottom: 108,
  },
  hero: {
    borderRadius: 8,
    backgroundColor: '#7EE2FF',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroCopy: {
    flex: 1,
    paddingRight: 8,
  },
  heroEyebrow: {
    color: '#1D648A',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 8,
  },
  heroTitle: {
    color: '#19364E',
    fontSize: 30,
    fontWeight: '900',
  },
  heroSubtitle: {
    marginTop: 8,
    color: '#27566F',
    fontSize: 14,
    fontWeight: '700',
  },
  statusBar: {
    marginTop: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8EDF8',
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#59D694',
    marginRight: 8,
  },
  statusText: {
    color: '#223951',
    fontSize: 14,
    fontWeight: '900',
  },
  statusHint: {
    marginLeft: 'auto',
    color: '#6A8399',
    fontSize: 12,
    fontWeight: '800',
  },
  promptsWrap: {
    marginTop: 12,
  },
  promptsRow: {
    gap: 10,
    paddingRight: 18,
  },
  promptChip: {
    minHeight: 38,
    borderRadius: 19,
    paddingHorizontal: 14,
    justifyContent: 'center',
    backgroundColor: '#FFF7C6',
    borderWidth: 1,
    borderColor: '#FFE08A',
  },
  promptText: {
    color: '#6B5510',
    fontSize: 13,
    fontWeight: '800',
  },
  chatArea: {
    flex: 1,
    marginTop: 12,
  },
  chatContent: {
    paddingBottom: 12,
    gap: 12,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  assistantRow: {
    justifyContent: 'flex-start',
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  avatarWrap: {
    width: 42,
    marginRight: 8,
  },
  assistantAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  messageBubble: {
    maxWidth: '78%',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  assistantBubble: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCECF7',
    borderBottomLeftRadius: 6,
  },
  userBubble: {
    backgroundColor: '#65CFFF',
    borderBottomRightRadius: 6,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
  },
  assistantText: {
    color: '#25405A',
  },
  userText: {
    color: '#143147',
  },
  loadingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  loadingText: {
    color: '#56809E',
    fontSize: 14,
    fontWeight: '800',
  },
  inputPanel: {
    marginTop: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCECF7',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    minHeight: 46,
    maxHeight: 110,
    paddingHorizontal: 10,
    paddingTop: 10,
    color: '#20374E',
    fontSize: 15,
    fontWeight: '700',
  },
  sendButton: {
    minWidth: 78,
    height: 44,
    borderRadius: 22,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#67D39A',
  },
  sendButtonDisabled: {
    backgroundColor: '#B8D8C6',
  },
  sendButtonText: {
    color: '#17384D',
    fontSize: 15,
    fontWeight: '900',
  },
});
