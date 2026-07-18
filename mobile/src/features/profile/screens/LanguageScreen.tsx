import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import styles from '../styles/LanguageScreenStyles';

interface LanguageOption {
  code: 'vi' | 'en';
  title: string;
  flagUrl: string;
}

const languages: LanguageOption[] = [
  {
    code: 'vi',
    title: 'Tiếng Việt',
    flagUrl: 'https://flagcdn.com/w160/vn.png',
  },
  {
    code: 'en',
    title: 'English',
    flagUrl: 'https://flagcdn.com/w160/gb.png',
  },
];

export const LanguageScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedLanguage, setSelectedLanguage] = useState<'vi' | 'en'>('vi');

  const handleSave = () => {
    const selectedLangTitle = selectedLanguage === 'vi' ? 'Tiếng Việt' : 'English';
    Alert.alert(
      'Thành công',
      `Đã cập nhật ngôn ngữ ứng dụng thành ${selectedLangTitle}.`,
      [
        {
          text: 'Đồng ý',
          onPress: () => navigation.goBack(),
        },
      ]
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
        <Text style={styles.headerTitle}>Ngôn ngữ</Text>
      </View>

      {/* Main Content Card */}
      <View style={styles.card}>
        <Text style={styles.description}>
          Chọn ngôn ngữ bạn muốn sử dụng trong ứng dụng SportHub.
        </Text>

        {/* Language Options */}
        {languages.map((item) => {
          const isSelected = selectedLanguage === item.code;
          return (
            <TouchableOpacity
              key={item.code}
              style={[
                styles.optionButton,
                isSelected ? styles.optionButtonSelected : styles.optionButtonUnselected,
              ]}
              onPress={() => setSelectedLanguage(item.code)}
              activeOpacity={0.7}
            >
              <View style={styles.optionLeft}>
                <View style={styles.flagContainer}>
                  <Image
                    source={{ uri: item.flagUrl }}
                    style={styles.flagImage}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.optionTitle}>{item.title}</Text>
              </View>

              <View style={[styles.radioOuter, isSelected && styles.radioOuterActive]}>
                {isSelected && <View style={styles.radioInnerActive} />}
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Translation Graphic Icon */}
        <View style={styles.graphicContainer}>
          <MaterialCommunityIcons name="translate" size={70} color="#a5f3fc" style={{ opacity: 0.8 }} />
          <Text style={styles.graphicSubtitle}>Tùy chỉnh trải nghiệm của bạn</Text>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.8}>
        <Text style={styles.saveButtonText}>LƯU</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageScreen;
