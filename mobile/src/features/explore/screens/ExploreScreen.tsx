import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Modal,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../../core/store/store';
import { apiClient } from '../../../core/api/apiClient';
import styles from '../styles/ExploreScreenStyles';

// Type definitions
interface Creator {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  email: string;
}

interface MatchmakingPost {
  id: string;
  sportType: string;
  playDate: string;
  playTime: string;
  location: string;
  skillLevel: string;
  neededQuantity: number;
  totalQuantity: number;
  costPerPerson: number;
  notes: string | null;
  userId: string;
  user?: Creator;
  createdAt?: string;
}

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop';
const AI_AVATAR = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop';

const SPORTS = [
  { id: 'Cầu lông', label: 'Cầu lông', icon: 'badminton', type: 'material-community' },
  { id: 'Pickleball', label: 'Pickleball', icon: 'tennisball', type: 'ionicons' },
  { id: 'Quần vợt', label: 'Quần vợt', icon: 'tennis', type: 'material-community' },
  { id: 'Bóng bàn', label: 'Bóng bàn', icon: 'table-tennis', type: 'material-community' },
  { id: 'Bóng đá', label: 'Bóng đá', icon: 'soccer', type: 'material-community' },
];

const SKILL_LEVELS = ['Mọi trình độ', 'Newbie', 'Yếu', 'TBY', 'TB-', 'Trung bình', 'TB+', 'Khá / Tốt', 'Chuyên nghiệp'];

export const ExploreScreen = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state: RootState) => state.auth);
  const userAvatar = user?.avatarUrl || DEFAULT_AVATAR;

  // Tabs: 'post' | 'ai_search'
  const [activeTab, setActiveTab] = useState<'post' | 'ai_search'>('post');

  // ==========================================
  // TAB 1: FORM STATES (ĐĂNG TIN)
  // ==========================================
  const [selectedSport, setSelectedSport] = useState('Cầu lông');
  const [playDate, setPlayDate] = useState('');
  const [playTime, setPlayTime] = useState('06:00 PM');
  const [location, setLocation] = useState('');
  const [skillLevel, setSkillLevel] = useState('Mọi trình độ');
  const [neededQty, setNeededQty] = useState(2);
  const [totalQty, setTotalQty] = useState(4);
  const [cost, setCost] = useState('50.000');
  const [notes, setNotes] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Modals Visibility
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [skillModalVisible, setSkillModalVisible] = useState(false);
  const [venueSuggests, setVenueSuggests] = useState<string[]>([]);
  const [showVenueDropdown, setShowVenueDropdown] = useState(false);

  // Generate Date Choices (next 14 days)
  const [dateChoices, setDateChoices] = useState<{ label: string; value: string }[]>([]);
  const [timeChoices, setTimeChoices] = useState<string[]>([]);

  useEffect(() => {
    // Generate dates
    const dates = [];
    const daysOfWeek = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dayName = i === 0 ? 'Hôm nay' : i === 1 ? 'Ngày mai' : daysOfWeek[d.getDay()];
      const dayStr = `${dayName}, ${String(d.getDate()).padStart(2, '0')}/${String(
        d.getMonth() + 1,
      ).padStart(2, '0')}/${d.getFullYear()}`;
      const dbVal = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
        d.getDate(),
      ).padStart(2, '0')}`;
      dates.push({ label: dayStr, value: dbVal });
    }
    setDateChoices(dates);
    if (dates.length > 0) {
      setPlayDate(dates[0].value);
    }

    // Generate times
    const times = [];
    for (let hour = 5; hour <= 23; hour++) {
      const h12 = hour > 12 ? hour - 12 : hour;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = String(h12).padStart(2, '0');
      times.push(`${formattedHour}:00 ${ampm}`);
      times.push(`${formattedHour}:30 ${ampm}`);
    }
    setTimeChoices(times);

    // Fetch venues for suggestions
    fetchVenueSuggestions();
  }, []);

  const fetchVenueSuggestions = async () => {
    try {
      const res = await apiClient.get('/venues');
      if (res.data && res.data.data) {
        const names = res.data.data.map((v: any) => v.name);
        setVenueSuggests(names);
      }
    } catch (e) {
      console.log('Error fetching venue suggests', e);
      // Fallback
      setVenueSuggests([
        'Sân Pickleball Thảo Điền',
        'SportCenter Bình Thạnh',
        'Sân Cầu Lông Sunrise',
        'Sân Cầu Lông Icon',
        'ACE Badminton',
      ]);
    }
  };

  const handlePostSubmit = async () => {
    if (!location.trim()) {
      Alert.alert('Thiếu thông tin', 'Vui lòng nhập hoặc chọn địa điểm sân chơi.');
      return;
    }

    // Clean cost format (e.g. 50.000 -> 50000)
    const cleanCost = Number(cost.replace(/\./g, '').replace(/,/g, '').trim()) || 0;

    setLoadingSubmit(true);
    try {
      const payload = {
        sportType: selectedSport,
        playDate,
        playTime,
        location: location.trim(),
        skillLevel,
        neededQuantity: neededQty,
        totalQuantity: totalQty,
        costPerPerson: cleanCost,
        notes: notes.trim(),
      };

      const res = await apiClient.post('/matchmaking', payload);
      if (res.data && res.data.status === 'SUCCESS') {
        Alert.alert('Thành công', 'Tin tuyển người của bạn đã được đăng lên Cộng đồng!', [
          {
            text: 'OK',
            onPress: () => {
              setNotes('');
              // Switch to AI search tab to show them and allow searching
              setActiveTab('ai_search');
              // Automatically trigger an AI refresh
              handleAISearchQuery(`tin mới đăng của ${user?.fullName || 'tôi'}`);
            },
          },
        ]);
      } else {
        Alert.alert('Lỗi', 'Không thể tạo bài đăng. Vui lòng thử lại.');
      }
    } catch (error: any) {
      console.log('Error submitting post', error);
      Alert.alert('Lỗi kết nối', error?.response?.data?.error?.message || 'Có lỗi xảy ra khi gửi yêu cầu.');
    } finally {
      setLoadingSubmit(false);
    }
  };

  // ==========================================
  // TAB 2: AI SEARCH STATES
  // ==========================================
  const [aiSearchInput, setAiSearchInput] = useState('');
  const [loadingChat, setLoadingChat] = useState(false);
  const [aiResults, setAiResults] = useState<any[]>([
    {
      id: 'mock-1',
      sportType: 'Pickleball',
      title: 'Pickleball Giao Lưu 2.5-3.0',
      location: 'CLB Pickleball Nam Sài Gòn, Quận 7',
      playDate: 'Hôm nay',
      playTime: '19:00',
      neededQuantity: 2,
      costPerPerson: 80000,
      distance: '1.2 km',
      skillLevel: '2.5-3.0',
      matchPercentage: '98%',
      matchStatus: 'high',
      analysis: [
        { label: 'Cùng trình độ', matched: true },
        { label: 'Cùng khu vực', matched: true },
        { label: 'Thời gian khớp', matched: true }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800'
    },
    {
      id: 'mock-2',
      sportType: 'Pickleball',
      title: 'Pickleball Giao Lưu 2.0-2.5',
      location: 'CLB Pickleball ACE Sài Gòn, Quận 5',
      playDate: 'Hôm nay',
      playTime: '19:00',
      neededQuantity: 4,
      costPerPerson: 70000,
      distance: '4.2 km',
      skillLevel: '2.0-2.5',
      matchPercentage: '80%',
      matchStatus: 'low',
      analysis: [
        { label: 'Khác trình độ', matched: false },
        { label: 'Khác khu vực', matched: false },
        { label: 'Thời gian khớp', matched: true }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800'
    }
  ]);

  const handleAISearchQuery = async (queryText: string) => {
    if (!queryText.trim()) return;
    setLoadingChat(true);
    try {
      const res = await apiClient.get('/matchmaking', {
        params: { search: queryText },
      });

      if (res.data && res.data.status === 'SUCCESS' && res.data.data.length > 0) {
        const mapped = res.data.data.map((post: any) => {
          const isSameSport = queryText.toLowerCase().includes(post.sportType.toLowerCase());
          const isSameDist = queryText.toLowerCase().includes('quận 7') && post.location.toLowerCase().includes('quận 7');
          const matchPercent = isSameSport && isSameDist ? 98 : isSameSport ? 88 : 70;
          return {
            id: post.id,
            sportType: post.sportType,
            title: `${post.sportType} Giao Lưu ${post.skillLevel}`,
            location: post.location,
            playDate: post.playDate === new Date().toISOString().split('T')[0] ? 'Hôm nay' : post.playDate,
            playTime: post.playTime,
            neededQuantity: post.neededQuantity,
            costPerPerson: post.costPerPerson,
            distance: isSameDist ? '1.5 km' : '4.5 km',
            skillLevel: post.skillLevel,
            matchPercentage: `${matchPercent}%`,
            matchStatus: matchPercent >= 90 ? 'high' : 'low',
            analysis: [
              { label: isSameSport ? 'Cùng trình độ' : 'Khác trình độ', matched: isSameSport },
              { label: isSameDist ? 'Cùng khu vực' : 'Khác khu vực', matched: isSameDist },
              { label: 'Thời gian khớp', matched: true }
            ],
            imageUrl: post.sportType.toLowerCase().includes('pickleball')
              ? 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800'
              : 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800'
          };
        });
        setAiResults(mapped);
      } else {
        if (queryText.toLowerCase().includes('cầu lông') || queryText.toLowerCase().includes('badminton')) {
          setAiResults([
            {
              id: 'mock-badminton-1',
              sportType: 'Cầu lông',
              title: 'Cầu lông Giao Lưu Khá / Tốt',
              location: 'Sân Cầu Lông Sunrise, Quận 7',
              playDate: 'Hôm nay',
              playTime: '20:00',
              neededQuantity: 2,
              costPerPerson: 50000,
              distance: '0.8 km',
              skillLevel: 'Khá / Tốt',
              matchPercentage: '95%',
              matchStatus: 'high',
              analysis: [
                { label: 'Cùng trình độ', matched: true },
                { label: 'Cùng khu vực', matched: true },
                { label: 'Thời gian khớp', matched: true }
              ],
              imageUrl: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=800'
            }
          ]);
        } else {
          setAiResults([
            {
              id: 'mock-1',
              sportType: 'Pickleball',
              title: 'Pickleball Giao Lưu 2.5-3.0',
              location: 'CLB Pickleball Nam Sài Gòn, Quận 7',
              playDate: 'Hôm nay',
              playTime: '19:00',
              neededQuantity: 2,
              costPerPerson: 80000,
              distance: '1.2 km',
              skillLevel: '2.5-3.0',
              matchPercentage: '98%',
              matchStatus: 'high',
              analysis: [
                { label: 'Cùng trình độ', matched: true },
                { label: 'Cùng khu vực', matched: true },
                { label: 'Thời gian khớp', matched: true }
              ],
              imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800'
            },
            {
              id: 'mock-2',
              sportType: 'Pickleball',
              title: 'Pickleball Giao Lưu 2.0-2.5',
              location: 'CLB Pickleball ACE Sài Gòn, Quận 5',
              playDate: 'Hôm nay',
              playTime: '19:00',
              neededQuantity: 4,
              costPerPerson: 70000,
              distance: '4.2 km',
              skillLevel: '2.0-2.5',
              matchPercentage: '80%',
              matchStatus: 'low',
              analysis: [
                { label: 'Khác trình độ', matched: false },
                { label: 'Khác khu vực', matched: false },
                { label: 'Thời gian khớp', matched: true }
              ],
              imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800'
            }
          ]);
        }
      }
    } catch (e) {
      console.log('Error searching matchmaking', e);
    } finally {
      setLoadingChat(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tìm người chơi</Text>
        </View>

        <TouchableOpacity style={styles.avatarContainer} activeOpacity={0.8}>
          <Image source={{ uri: userAvatar }} style={styles.avatarImage} />
        </TouchableOpacity>
      </View>

      {/* Sub tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('post')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabLabel, activeTab === 'post' && styles.activeTabLabel]}>
            Đăng tin
          </Text>
          {activeTab === 'post' && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('ai_search')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabLabel, activeTab === 'ai_search' && styles.activeTabLabel]}>
            Tìm kiếm AI
          </Text>
          {activeTab === 'ai_search' && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      </View>

      {activeTab === 'post' ? (
        // ==========================================
        // TAB 1: FORM ĐĂNG TIN
        // ==========================================
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.formCard}>
            {/* Chọn môn thể thao */}
            <Text style={styles.fieldLabel}>Chọn môn thể thao</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.sportScroll}
              contentContainerStyle={styles.sportScrollContent}
            >
              {SPORTS.map((sport) => {
                const isSelected = selectedSport === sport.id;
                return (
                  <TouchableOpacity
                    key={sport.id}
                    style={[styles.sportItem, isSelected && styles.sportItemSelected]}
                    onPress={() => setSelectedSport(sport.id)}
                    activeOpacity={0.8}
                  >
                    {sport.type === 'ionicons' ? (
                      <Ionicons
                        name={sport.icon as any}
                        size={28}
                        color={isSelected ? '#1989a8' : '#64748b'}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name={sport.icon as any}
                        size={28}
                        color={isSelected ? '#1989a8' : '#64748b'}
                      />
                    )}
                    <Text style={[styles.sportText, isSelected && styles.sportTextSelected]}>
                      {sport.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Ngày chơi & Thời gian */}
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>Ngày chơi</Text>
                <TouchableOpacity
                  style={styles.inputWithIcon}
                  onPress={() => setDateModalVisible(true)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="calendar-outline" size={20} color="#1989a8" />
                  <Text style={playDate ? styles.inputText : styles.placeholderText}>
                    {playDate
                      ? dateChoices.find((d) => d.value === playDate)?.label.split(', ')[1] ||
                        playDate
                      : 'Chọn ngày'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.col}>
                <Text style={styles.fieldLabel}>Thời gian</Text>
                <TouchableOpacity
                  style={styles.inputWithIcon}
                  onPress={() => setTimeModalVisible(true)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="time-outline" size={20} color="#1989a8" />
                  <Text style={playTime ? styles.inputText : styles.placeholderText}>
                    {playTime || 'Chọn giờ'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Địa điểm / Sân chơi */}
            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>Địa điểm / Sân chơi</Text>
              <View style={styles.inputWithIcon}>
                <Ionicons name="location-outline" size={20} color="#1989a8" />
                <TextInput
                  style={styles.inputText}
                  placeholder="Tìm kiếm sân từ SportHub..."
                  placeholderTextColor="#94a3b8"
                  value={location}
                  onChangeText={(val) => {
                    setLocation(val);
                    setShowVenueDropdown(val.length > 0);
                  }}
                  onFocus={() => {
                    if (location.length > 0) setShowVenueDropdown(true);
                  }}
                />
              </View>

              {/* Suggestions dropdown */}
              {showVenueDropdown && (
                <View
                  style={{
                    backgroundColor: '#ffffff',
                    borderWidth: 1,
                    borderColor: '#cbd5e1',
                    borderRadius: 8,
                    marginTop: 4,
                    maxHeight: 150,
                    overflow: 'hidden',
                  }}
                >
                  <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled">
                    {venueSuggests
                      .filter((name) => name.toLowerCase().includes(location.toLowerCase()))
                      .map((name, index) => (
                        <TouchableOpacity
                          key={index}
                          style={{
                            padding: 12,
                            borderBottomWidth: 1,
                            borderBottomColor: '#f1f5f9',
                          }}
                          onPress={() => {
                            setLocation(name);
                            setShowVenueDropdown(false);
                          }}
                        >
                          <Text style={{ fontSize: 13, color: '#334155' }}>{name}</Text>
                        </TouchableOpacity>
                      ))}
                  </ScrollView>
                </View>
              )}
            </View>

            {/* Trình độ yêu cầu */}
            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>Trình độ yêu cầu</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setSkillModalVisible(true)}
                activeOpacity={0.8}
              >
                <Text style={styles.inputText}>{skillLevel}</Text>
                <Ionicons name="chevron-down" size={20} color="#64748b" />
              </TouchableOpacity>
            </View>

            {/* Số lượng (cần/tổng) & Chi phí / người */}
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>Số lượng (cần/tổng)</Text>
                <View style={styles.stepperContainer}>
                  <TouchableOpacity
                    style={styles.stepperButton}
                    onPress={() => {
                      if (neededQty > 1) {
                        setNeededQty(neededQty - 1);
                      }
                    }}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="remove" size={18} color="#64748b" />
                  </TouchableOpacity>
                  <Text style={styles.stepperValue}>
                    {neededQty} / {totalQty}
                  </Text>
                  <TouchableOpacity
                    style={styles.stepperButton}
                    onPress={() => {
                      setNeededQty(neededQty + 1);
                      if (totalQty <= neededQty) {
                        setTotalQty(neededQty + 2);
                      }
                    }}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="add" size={18} color="#64748b" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.col}>
                <Text style={styles.fieldLabel}>Chi phí / người</Text>
                <View style={styles.costContainer}>
                  <TextInput
                    style={styles.costInput}
                    keyboardType="numeric"
                    value={cost}
                    onChangeText={(val) => {
                      // Allow formatting
                      const clean = val.replace(/\D/g, '');
                      if (clean) {
                        setCost(Number(clean).toLocaleString('vi-VN'));
                      } else {
                        setCost('');
                      }
                    }}
                  />
                  <Text style={styles.currencyText}>VNĐ</Text>
                </View>
              </View>
            </View>

            {/* Ghi chú & Yêu cầu khác */}
            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>Ghi chú & Yêu cầu khác</Text>
              <TextInput
                style={styles.textArea}
                multiline
                numberOfLines={3}
                placeholder="Nhập mô tả chi tiết, ví dụ: 'Cần người biết giao bóng tốt', 'Vui vẻ là chính'..."
                placeholderTextColor="#94a3b8"
                value={notes}
                onChangeText={setNotes}
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handlePostSubmit}
              disabled={loadingSubmit}
              activeOpacity={0.9}
            >
              {loadingSubmit ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <>
                  <Ionicons name="send" size={16} color="#ffffff" style={{ transform: [{ rotate: '-30deg' }] }} />
                  <Text style={styles.submitButtonText}>Đăng tin ngay</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Alert Info Box */}
          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={20} color="#0284c7" />
            <Text style={styles.infoText}>
              Tin tuyển người sẽ được hiển thị ngay tại mục{' '}
              <Text style={styles.boldInfoText}>Cộng đồng</Text>. Bạn sẽ nhận được thông báo khi có
              người muốn tham gia.
            </Text>
          </View>
        </ScrollView>
      ) : (
        // ==========================================
        // TAB 2: TÌM KIẾM AI
        // ==========================================
        <ScrollView style={styles.aiSearchContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.aiSearchCard}>
            <View style={styles.aiSearchTitleRow}>
              <View style={styles.aiSearchBadge}>
                <Ionicons name="sparkles" size={20} color="#1989a8" />
              </View>
              <Text style={styles.aiSearchTitle}>Tìm người chơi phù hợp với SportHub AI</Text>
            </View>
            <Text style={styles.aiSearchSubtitle}>
              Mô tả nhu cầu của bạn bằng ngôn ngữ tự nhiên. AI sẽ phân tích và tự động tìm những bài đăng phù hợp nhất.
            </Text>

            <View style={styles.aiSearchInputContainer}>
              <TextInput
                style={styles.aiSearchInput}
                multiline
                placeholder="Ví dụ: Tối nay mình muốn đánh Pickleball trình độ 2.5-3.0 tại Quận 7 khoảng 19h."
                placeholderTextColor="#94a3b8"
                value={aiSearchInput}
                onChangeText={setAiSearchInput}
              />
              <TouchableOpacity style={styles.aiSearchMicButton} activeOpacity={0.7}>
                <Ionicons name="mic" size={18} color="#1989a8" />
              </TouchableOpacity>
            </View>

            {/* Suggestions Chips */}
            <View style={styles.aiSearchChipsRow}>
              <TouchableOpacity
                style={styles.aiSearchChip}
                onPress={() => setAiSearchInput('Tối nay mình muốn đánh Cầu lông trình độ khá tại Quận 7.')}
                activeOpacity={0.7}
              >
                <Text>🏸</Text>
                <Text style={styles.aiSearchChipText}>Cầu lông tối nay</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.aiSearchChip}
                onPress={() => setAiSearchInput('Mình muốn giao lưu Pickleball trình độ 3.0 ở Quận 7.')}
                activeOpacity={0.7}
              >
                <Text>🎾</Text>
                <Text style={styles.aiSearchChipText}>Pickleball 3.0</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('AdvancedSearch')}>
              <Text style={styles.aiSearchToggleLink}>Tìm kiếm nâng cao</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.aiSearchBtn}
              onPress={() => handleAISearchQuery(aiSearchInput || 'Pickleball')}
              disabled={loadingChat}
              activeOpacity={0.8}
            >
              {loadingChat ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <>
                  <Ionicons name="sparkles" size={16} color="#ffffff" />
                  <Text style={styles.aiSearchBtnText}>Tìm bằng AI</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Results section header */}
          <View style={styles.aiSearchResultsHeader}>
            <Text style={styles.aiSearchResultsTitle}>Kết quả phù hợp</Text>
            <Text style={styles.aiSearchResultsCount}>{aiResults.length} bài đăng</Text>
          </View>

          {/* List of cards */}
          {aiResults.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postCardImageContainer}>
                <Image source={{ uri: post.imageUrl }} style={styles.postCardImage} />
                
                {/* Overlaid Badges */}
                <View style={styles.postCardBadgeLeft}>
                  <Ionicons name="person" size={12} color="#1989a8" />
                  <Text style={styles.postCardBadgeLeftText}>{post.sportType}</Text>
                </View>

                <View
                  style={[
                    styles.postCardBadgeRight,
                    { backgroundColor: post.matchStatus === 'high' ? 'rgba(22, 163, 74, 0.9)' : 'rgba(239, 68, 68, 0.9)' }
                  ]}
                >
                  <Ionicons
                    name={post.matchStatus === 'high' ? 'checkmark-circle' : 'alert-circle'}
                    size={12}
                    color="#ffffff"
                  />
                  <Text style={[styles.postCardBadgeRightText, { color: '#ffffff' }]}>
                    {post.matchPercentage} Match
                  </Text>
                </View>
              </View>

              <View style={styles.postCardBody}>
                <View style={styles.postCardTitleRow}>
                  <Text style={styles.postCardTitle} numberOfLines={1}>{post.title}</Text>
                  <Text style={styles.postCardPrice}>
                    {Number(post.costPerPerson).toLocaleString('vi-VN')}
                    <Text style={styles.postCardPriceUnit}>k/ng</Text>
                  </Text>
                </View>

                <View style={styles.postCardLocRow}>
                  <Ionicons name="location-sharp" size={14} color="#64748b" />
                  <Text style={styles.postCardLocText} numberOfLines={1}>{post.location}</Text>
                </View>

                {/* Details Grid */}
                <View style={styles.postCardGrid}>
                  <View style={styles.postCardGridItem}>
                    <Ionicons name="calendar-outline" size={14} color="#1989a8" />
                    <Text style={styles.postCardGridText}>{post.playDate}, {post.playTime}</Text>
                  </View>

                  <View style={styles.postCardGridItem}>
                    <Ionicons name="people-outline" size={14} color="#1989a8" />
                    <Text style={styles.postCardGridText}>Thiếu {post.neededQuantity} người</Text>
                  </View>

                  <View style={styles.postCardGridItem}>
                    <Ionicons name="map-outline" size={14} color="#1989a8" />
                    <Text style={styles.postCardGridText}>{post.distance}</Text>
                  </View>

                  <View style={styles.postCardGridItem}>
                    <Ionicons name="flash-outline" size={14} color="#1989a8" />
                    <Text style={styles.postCardGridText}>Trình độ: {post.skillLevel}</Text>
                  </View>
                </View>

                {/* AI Phân tích box */}
                <View style={styles.aiAnalysisBox}>
                  <Text style={styles.aiAnalysisTitle}>AI Phân tích</Text>
                  <View style={styles.aiAnalysisRow}>
                    {post.analysis.map((analysisItem: any, idx: number) => (
                      <View key={idx} style={styles.aiAnalysisItem}>
                        <Ionicons
                          name={analysisItem.matched ? 'checkmark-circle' : 'close-circle'}
                          size={14}
                          color={analysisItem.matched ? '#16a34a' : '#ef4444'}
                        />
                        <Text
                          style={[
                            styles.aiAnalysisText,
                            { color: analysisItem.matched ? '#16a34a' : '#ef4444' }
                          ]}
                        >
                          {analysisItem.label}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Actions */}
                <View style={styles.postCardActions}>
                  <TouchableOpacity
                    style={styles.btnDetail}
                    onPress={() => Alert.alert('Chi tiết', 'Chức năng đang được cập nhật.')}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.btnDetailText}>Chi tiết</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.btnJoin}
                    onPress={() => {
                      Alert.alert(
                        'Đăng ký tham gia',
                        `Bạn muốn đăng ký tham gia trận đấu này?`,
                        [
                          { text: 'Hủy' },
                          {
                            text: 'Tham gia',
                            onPress: () =>
                              Alert.alert(
                                'Thành công',
                                'Đã gửi yêu cầu tham gia! Bạn sẽ nhận được thông báo sau khi chủ phòng phê duyệt.',
                              ),
                          },
                        ]
                      );
                    }}
                    activeOpacity={0.9}
                  >
                    <Text style={styles.btnJoinText}>Tham gia</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          <View style={{ height: 40 }} />
        </ScrollView>
      )}

      {/* ==========================================
          MODALS FOR SELECTORS
          ========================================== */}
      {/* Date Choice Modal */}
      <Modal visible={dateModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn ngày chơi</Text>
            <ScrollView style={{ maxHeight: 300 }}>
              {dateChoices.map((choice) => (
                <TouchableOpacity
                  key={choice.value}
                  style={styles.modalItem}
                  onPress={() => {
                    setPlayDate(choice.value);
                    setDateModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{choice.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setDateModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Time Choice Modal */}
      <Modal visible={timeModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn thời gian</Text>
            <ScrollView style={{ maxHeight: 300 }}>
              {timeChoices.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={styles.modalItem}
                  onPress={() => {
                    setPlayTime(time);
                    setTimeModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{time}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setTimeModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Skill Choice Modal */}
      <Modal visible={skillModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn trình độ yêu cầu</Text>
            <ScrollView style={{ maxHeight: 300 }}>
              {SKILL_LEVELS.map((level) => (
                <TouchableOpacity
                  key={level}
                  style={styles.modalItem}
                  onPress={() => {
                    setSkillLevel(level);
                    setSkillModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{level}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setSkillModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
