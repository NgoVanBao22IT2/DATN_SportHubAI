import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/BookingTypeModalStyles';

interface BookingTypeModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectDayBooking: () => void;
  onSelectEventBooking: () => void;
}

export const BookingTypeModal: React.FC<BookingTypeModalProps> = ({
  visible,
  onClose,
  onSelectDayBooking,
  onSelectEventBooking,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* ======== BACKDROP ======== */}
      <View style={styles.backdrop}>
        {/* ======== DIALOG ======== */}
        <View style={styles.dialog}>
          {/* ---- Header ---- */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Chọn hình thức đặt</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={20} color="#41493e" />
            </TouchableOpacity>
          </View>

          {/* ---- Content Body ---- */}
          <View style={styles.contentBody}>
            {/* Option 1: Đặt lịch ngày */}
            <TouchableOpacity
              style={[styles.optionCard, styles.optionCardDay]}
              onPress={onSelectDayBooking}
              activeOpacity={0.8}
            >
              {/* Icon */}
              <View style={[styles.iconCircle, styles.iconCircleDay]}>
                <Ionicons name="calendar" size={24} color="#ffffff" />
              </View>

              {/* Text */}
              <View style={styles.textContainer}>
                <Text style={[styles.optionTitle, styles.optionTitleDay]}>
                  Đặt lịch ngày
                </Text>
                <Text style={styles.optionDescription}>
                  Chọn giờ theo ô lưới,{'\n'}dễ dàng xem khoảng{'\n'}trống
                  trong ngày.
                </Text>
              </View>

              {/* Arrow */}
              <View style={[styles.arrowButton, styles.arrowButtonDay]}>
                <Ionicons name="arrow-forward" size={16} color="#ffffff" />
              </View>
            </TouchableOpacity>

            {/* Option 2: Đặt lịch sự kiện */}
            <TouchableOpacity
              style={[styles.optionCard, styles.optionCardEvent]}
              onPress={onSelectEventBooking}
              activeOpacity={0.8}
            >
              {/* New Badge */}
              <View style={styles.newBadgeContainer}>
                <View style={styles.newBadge}>
                  <Ionicons name="star" size={12} color="#6b4500" />
                  <Text style={styles.newBadgeText}>New</Text>
                </View>
              </View>

              {/* Icon */}
              <View style={[styles.iconCircle, styles.iconCircleEvent]}>
                <Ionicons
                  name="calendar-number"
                  size={24}
                  color="#ffffff"
                />
              </View>

              {/* Text */}
              <View style={styles.textContainer}>
                <Text style={[styles.optionTitle, styles.optionTitleEvent]}>
                  Đặt lịch sự kiện
                </Text>
                <Text style={styles.optionDescription}>
                  Dành cho các giải đấu, sự kiện dài ngày hoặc đặt cố định
                  theo{'\n'}tháng.
                </Text>
              </View>

              {/* Arrow */}
              <View style={[styles.arrowButton, styles.arrowButtonEvent]}>
                <Ionicons name="arrow-forward" size={16} color="#ffffff" />
              </View>
            </TouchableOpacity>
          </View>

          {/* ---- Footer Hint ---- */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Hỗ trợ đặt hộ nhanh chóng qua Hotline:{' '}
              <Text style={styles.footerHighlight}>1900 xxxx</Text>
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BookingTypeModal;
