import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import styles from '../styles/NotificationScreenStyles';

interface NotificationBodyPart {
  text: string;
  highlight?: boolean;
}

interface NotificationItem {
  id: string;
  title: string;
  body: string | NotificationBodyPart[];
  time: string;
  unread: boolean;
  type: 'success' | 'reminder' | 'promo' | 'request' | 'update';
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  leftBorder?: 'green' | 'brown';
  imageUrl?: string;
  hasActions?: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Đặt sân thành công!',
    body: 'Sân Tennis A1 đã được xác nhận vào lúc 18:00 ngày mai. Chúc bạn có một trận đấu tuyệt vời!',
    time: '2 phút trước',
    unread: true,
    type: 'success',
    icon: 'checkmark-circle',
    iconColor: '#22c55e',
    iconBg: '#dcfce7',
    leftBorder: 'green',
  },
  {
    id: '2',
    title: 'Nhắc nhở trận đấu',
    body: [
      { text: 'Đừng quên trận cầu lông với đội "Smasher" vào lúc ' },
      { text: '19:30 tối nay', highlight: true },
      { text: ' nhé.' },
    ],
    time: '45 phút trước',
    unread: true,
    type: 'reminder',
    icon: 'calendar-outline',
    iconColor: '#b45309',
    iconBg: '#fef3c7',
    leftBorder: 'brown',
  },
  {
    id: '3',
    title: 'Ưu đãi mùa giải mới',
    body: 'Giảm ngay 20% phí thuê sân cho tất cả các booking trong tuần này. Khám phá ngay!',
    time: '3 giờ trước',
    unread: false,
    type: 'promo',
    icon: 'search-outline',
    iconColor: '#0284c7',
    iconBg: '#e0f2fe',
    imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Yêu cầu tham gia mới',
    body: 'Minh Hoàng muốn tham gia đội bóng rổ của bạn. Hãy xem hồ sơ của anh ấy ngay.',
    time: '5 giờ trước',
    unread: false,
    type: 'request',
    icon: 'person-add-outline',
    iconColor: '#475569',
    iconBg: '#f1f5f9',
    hasActions: true,
  },
  {
    id: '5',
    title: 'Cập nhật ứng dụng',
    body: 'Phiên bản 2.4.0 đã sẵn sàng với tính năng "Tìm bạn chơi" thông minh hơn. Cập nhật ngay để trải nghiệm!',
    time: 'Hôm qua',
    unread: false,
    type: 'update',
    icon: 'refresh-outline',
    iconColor: '#475569',
    iconBg: '#f1f5f9',
  },
];

export const NotificationScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, unread: false, leftBorder: undefined }
          : item
      )
    );
  };

  const handleAction = (id: string, actionType: 'accept' | 'decline') => {
    const actionLabel = actionType === 'accept' ? 'chấp nhận' : 'bỏ qua';
    Alert.alert(
      'Xác nhận',
      `Bạn có chắc chắn muốn ${actionLabel} yêu cầu tham gia của Minh Hoàng không?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đồng ý',
          onPress: () => {
            setNotifications((prev) =>
              prev.map((item) =>
                item.id === id ? { ...item, hasActions: false } : item
              )
            );
            Alert.alert('Thành công', `Đã ${actionLabel} yêu cầu tham gia.`);
          },
        },
      ]
    );
  };

  const filteredNotifications = notifications.filter((item) => {
    if (activeTab === 'unread') {
      return item.unread;
    }
    return true;
  });

  const renderBody = (body: string | NotificationBodyPart[]) => {
    if (typeof body === 'string') {
      return <Text style={styles.bodyText}>{body}</Text>;
    }

    return (
      <Text style={styles.bodyText}>
        {body.map((part, index) => (
          <Text
            key={index}
            style={part.highlight ? styles.bodyTextHighlight : undefined}
          >
            {part.text}
          </Text>
        ))}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1989a8" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông báo</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            activeTab === 'all' && styles.filterButtonActive,
          ]}
          onPress={() => setActiveTab('all')}
        >
          <Text
            style={[
              styles.filterText,
              activeTab === 'all' && styles.filterTextActive,
            ]}
          >
            Tất cả
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            activeTab === 'unread' && styles.filterButtonActive,
          ]}
          onPress={() => setActiveTab('unread')}
        >
          <Text
            style={[
              styles.filterText,
              activeTab === 'unread' && styles.filterTextActive,
            ]}
          >
            Chưa đọc
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notification List */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off-outline" size={60} color="#cbd5e1" />
            <Text style={styles.emptyText}>Không có thông báo nào</Text>
          </View>
        ) : (
          filteredNotifications.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card,
                item.leftBorder === 'green' && styles.cardBorderGreen,
                item.leftBorder === 'brown' && styles.cardBorderBrown,
              ]}
              onPress={() => handleMarkAsRead(item.id)}
              activeOpacity={0.9}
            >
              {item.imageUrl && (
                <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
              )}
              <View style={styles.cardContent}>
                <View style={[styles.iconBox, { backgroundColor: item.iconBg }]}>
                  <Ionicons name={item.icon} size={22} color={item.iconColor} />
                </View>
                <View style={styles.textContainer}>
                  <View style={styles.titleRow}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <View style={styles.dotContainer}>
                      <Text style={styles.timeText}>{item.time}</Text>
                      {item.unread && (
                        <View
                          style={[
                            styles.dot,
                            { backgroundColor: item.leftBorder === 'green' ? '#22c55e' : '#b45309' },
                          ]}
                        />
                      )}
                    </View>
                  </View>
                  {renderBody(item.body)}

                  {item.hasActions && (
                    <View style={styles.actionRow}>
                      <TouchableOpacity
                        style={styles.acceptButton}
                        onPress={() => handleAction(item.id, 'accept')}
                      >
                        <Text style={styles.acceptButtonText}>Chấp nhận</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.declineButton}
                        onPress={() => handleAction(item.id, 'decline')}
                      >
                        <Text style={styles.declineButtonText}>Bỏ qua</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;
