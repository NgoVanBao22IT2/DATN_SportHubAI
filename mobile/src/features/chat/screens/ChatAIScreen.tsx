import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import styles from '../styles/ChatAIScreenStyles';

type ChatAINavigationProp = StackNavigationProp<RootStackParamList, 'ChatAI'>;

type ChatRole = 'assistant' | 'user';

type ChatResult = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  results?: ChatResult[];
};

type QuickAction = {
  label: string;
  prompt: string;
};

const QUICK_ACTIONS: QuickAction[] = [
  { label: 'Tìm sân Pickleball gần đây', prompt: 'Tìm sân Pickleball gần đây' },
  { label: 'Kiểm tra lịch đặt của tôi', prompt: 'Kiểm tra lịch đặt của tôi' },
  { label: 'Quy định hủy sân', prompt: 'Quy định hủy sân' },
];

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop';

const MOCK_RESULTS: Record<string, ChatResult[]> = {
  badminton: [
    {
      id: 'sunrise',
      title: 'Sân Cầu Lông Sunrise',
      subtitle: 'Trống: Sân 2, Sân 5 (19:30)',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: 'unrise',
      title: 'Sân Cầu Lông unrise',
      subtitle: 'Trống: Sân 1, Sân 4 (20:00)',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4a8b8c9?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: 'ace',
      title: 'ACE Badminton',
      subtitle: 'Trống: 19:00 - 21:00, còn 3 cụm sân',
      image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=400&auto=format&fit=crop',
    },
  ],
  pickleball: [
    {
      id: 'pb-1',
      title: 'Pickleball Center Q7',
      subtitle: 'Còn 2 sân trống tối nay',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=500&auto=format&fit=crop',
    },
  ],
};

const buildResponse = (prompt: string) => {
  const normalized = prompt.trim().toLowerCase();

  if (!normalized) {
    return {
      content: 'Bạn muốn mình tìm sân, kiểm tra lịch đặt hay xem quy định hủy sân?',
    };
  }

  if (normalized.includes('hủy') || normalized.includes('huy')) {
    return {
      content:
        'Quy định hủy sân thường phụ thuộc từng sân. Mình có thể giúp bạn xem chi tiết chính sách của sân cụ thể hoặc tìm sân có chính sách linh hoạt hơn.',
    };
  }

  if (normalized.includes('lịch đặt') || normalized.includes('đặt của tôi') || normalized.includes('dat cua toi')) {
    return {
      content:
        'Mình chưa thấy liên kết tài khoản trong phiên này. Nếu bạn muốn, mình có thể mở danh sách các booking gần nhất sau khi bạn đăng nhập.',
    };
  }

  if (normalized.includes('pickleball')) {
    return {
      content:
        'Mình đã tìm được một số sân Pickleball phù hợp. Bạn muốn xem sân có vị trí gần bạn nhất hay sân rẻ nhất?',
      results: MOCK_RESULTS.pickleball,
    };
  }

  if (normalized.includes('cầu lông') || normalized.includes('cau long') || normalized.includes('badminton')) {
    return {
      content:
        'Tôi đã tìm thấy 3 sân cầu lông tại Quận 7 còn từ 19:00 - 21:00. Bạn có muốn xem danh sách không?',
      results: MOCK_RESULTS.badminton,
    };
  }

  if (normalized.includes('quận 7') || normalized.includes('q7')) {
    return {
      content:
        'Mình ưu tiên khu vực Quận 7 cho bạn. Bạn muốn lọc theo môn thể thao hay khung giờ cụ thể?',
    };
  }

  return {
    content:
      'Mình có thể hỗ trợ tìm sân, đặt lịch hoặc tra cứu thông tin thể thao. Hãy nói rõ môn, khu vực và khung giờ bạn cần nhé.',
  };
};

const initialMessages: ChatMessage[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content:
      'Chào bạn! Tôi là trợ lý ảo SportHub. Tôi có thể giúp bạn tìm sân, đặt lịch hoặc giải đáp các thắc mắc về môn thể thao bạn yêu thích. Bạn cần hỗ trợ gì hôm nay?',
  },
];

const ChatAIScreen = () => {
  const navigation = useNavigation<ChatAINavigationProp>();
  const listRef = useRef<FlatList<ChatMessage>>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const userAvatar = DEFAULT_AVATAR;

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    listRef.current?.scrollToEnd({ animated: true });
  }, [messages, isTyping]);

  const appendAssistantReply = (prompt: string) => {
    setIsTyping(true);

    typingTimerRef.current = setTimeout(() => {
      const reply = buildResponse(prompt);
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: reply.content,
        results: reply.results,
      };

      setMessages((current) => [...current, assistantMessage]);
      setIsTyping(false);
    }, 650);
  };

  const sendMessage = (rawMessage: string) => {
    const content = rawMessage.trim();
    if (!content || isTyping) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
    };

    setMessages((current) => [...current, userMessage]);
    setInputValue('');
    appendAssistantReply(content);
  };

  const handleQuickAction = (prompt: string) => {
    sendMessage(prompt);
  };

  const handleMenuPress = () => {
    Alert.alert('Tùy chọn', 'Khu vực này có thể được nối với lịch sử chat hoặc cài đặt trợ lý sau.');
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    if (item.role === 'user') {
      return (
        <View style={styles.userRow}>
          <View style={styles.userBubble}>
            <Text style={styles.userText}>{item.content}</Text>
          </View>
          <Image source={{ uri: userAvatar }} style={styles.userAvatar} />
        </View>
      );
    }

    return (
      <View style={styles.assistantRow}>
        <View style={styles.avatarBubble}>
          <Ionicons name="sparkles" size={22} color="#ffffff" />
        </View>

        <View style={styles.assistantCard}>
          <Text style={styles.assistantText}>{item.content}</Text>

          {item.results?.length ? <View style={styles.resultDivider} /> : null}

          {item.results?.map((result) => (
            <View key={result.id} style={styles.resultCard}>
              <Image source={{ uri: result.image }} style={styles.resultImage} />
              <View style={styles.resultInfo}>
                <Text style={styles.resultTitle} numberOfLines={1}>
                  {result.title}
                </Text>
                <Text style={styles.resultSubtitle} numberOfLines={2}>
                  {result.subtitle}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 12 : 0}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1989a8" />

      <View style={styles.backgroundGlowTop} />
      <View style={styles.backgroundGlowBottom} />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.85}>
            <Ionicons name="arrow-back" size={26} color="#ffffff" />
          </TouchableOpacity>

          <View style={styles.titleWrap}>
            <Text style={styles.title} numberOfLines={1}>
              Trợ lý SportHub
            </Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              Tìm sân, đặt lịch và trả lời nhanh
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress} activeOpacity={0.8}>
          <Ionicons name="ellipsis-vertical" size={22} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.quickActions}>
              {QUICK_ACTIONS.map((action) => (
                <TouchableOpacity
                  key={action.label}
                  style={styles.quickActionPill}
                  onPress={() => handleQuickAction(action.prompt)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.quickActionText}>{action.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          }
          ListFooterComponent={
            isTyping ? (
              <View style={styles.assistantRow}>
                <View style={styles.avatarBubble}>
                  <Ionicons name="sparkles" size={22} color="#ffffff" />
                </View>
                <View style={styles.assistantCard}>
                  <View style={styles.typingRow}>
                    <View style={styles.typingDot} />
                    <View style={styles.typingDot} />
                    <View style={styles.typingDot} />
                  </View>
                </View>
              </View>
            ) : (
              <Text style={styles.emptyHint}>
                Gợi ý: nhập môn thể thao, khu vực và khung giờ để trợ lý tìm nhanh.
              </Text>
            )
          }
        />
      </View>

      <View style={styles.inputArea}>
        <View style={styles.inputShell}>
          <TouchableOpacity style={styles.attachButton} activeOpacity={0.8} onPress={() => Alert.alert('Thêm nội dung', 'Chức năng đính kèm có thể mở rộng sau.')}>
            <Ionicons name="add" size={30} color="#38484d" />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Nhập nội dung tin nhắn..."
            placeholderTextColor="#6b7280"
            value={inputValue}
            onChangeText={setInputValue}
            onSubmitEditing={() => sendMessage(inputValue)}
            returnKeyType="send"
            editable={!isTyping}
          />

          <TouchableOpacity style={styles.sendButton} activeOpacity={0.85} onPress={() => sendMessage(inputValue)}>
            <Ionicons name="send" size={22} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatAIScreen;