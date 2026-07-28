import React from 'react';
import { X, Bot, Users, Sparkles } from 'lucide-react';

interface AiModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'assistant' | 'matchmaking';
}

export const AiModal: React.FC<AiModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ width: '42px', height: '42px', background: '#e0f2fe', borderRadius: '12px', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {type === 'assistant' ? <Bot size={24} /> : <Users size={24} />}
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800 }}>
              {type === 'assistant' ? 'Trợ lý AI Tìm Sân Thông Minh' : 'Ghép Kèo AI Tự Động'}
            </h3>
            <p style={{ fontSize: '12px', color: '#64748b' }}>SportHubAI Smart Engine v2.4</p>
          </div>
        </div>
        <p style={{ fontSize: '14px', color: '#475569', marginBottom: '20px', lineHeight: 1.5 }}>
          {type === 'assistant'
            ? 'Nhập nhu cầu của bạn (ví dụ: "Tìm sân Cầu Lông khu vực Quận 7 giá dưới 150k sau 18h tối nay"). AI sẽ lập tức phân tích và chọn sân tốt nhất cho bạn.'
            : 'Tìm đối thủ hoặc đồng đội phù hợp với trình độ DUPR / trình độ chơi của bạn chỉ trong vài giây.'}
        </p>
        <input
          type="text"
          placeholder={type === 'assistant' ? 'Gõ yêu cầu tìm sân...' : 'Nhập môn thể thao & khu vực ghép kèo...'}
          style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', marginBottom: '16px', fontSize: '14px' }}
        />
        <button
          className="btn-search"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => {
            alert(type === 'assistant' ? 'SportHubAI đã tìm thấy 3 sân phù hợp nhất cho bạn!' : 'Đã đăng tin ghép kèo AI thành công! Hệ thống sẽ thông báo khi có người đăng ký.');
            onClose();
          }}
        >
          <Sparkles size={18} />
          <span>Phân tích & Thực hiện</span>
        </button>
      </div>
    </div>
  );
};
