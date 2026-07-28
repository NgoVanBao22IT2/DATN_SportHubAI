# 🌐 SportHubAI Web Application - Hướng Dẫn Khởi Chạy & Sử Dụng

Tài liệu hướng dẫn chi tiết cách cài đặt, khởi chạy môi trường phát triển (Development) và đóng gói sản phẩm (Production Build) cho giao diện Web của ứng dụng **SportHubAI**.

---

## 🚀 1. Tóm Tắt Nhanh (Quick Start)

Mở Terminal (Command Prompt hoặc PowerShell) tại thư mục `web`:

```bash
# 1. Di chuyển vào thư mục web (nếu đang ở thư mục gốc dự án)
cd e:/DATN/DATN_SportHubAI/web

# 2. Cài đặt các thư viện phụ thuộc (Dependencies)
npm install

# 3. Khởi chạy Server ở chế độ Development
npm run dev
```

Sau khi chạy lệnh thành công, truy cập trình duyệt tại địa chỉ:
👉 **`http://localhost:5173/`**

---

## 🛠️ 2. Các Lệnh Thường Dùng (Scripts)

| Lệnh (Command) | Mô tả chi tiết |
|---|---|
| `npm run dev` | Khởi chạy máy chủ phát triển (Vite Dev Server) với tính năng Hot Module Replacement (HMR) cực nhanh tại cổng `5173`. |
| `npm run build` | Kiểm tra lỗi TypeScript (`tsc -b`) và đóng gói mã nguồn thành sản phẩm sản xuất tối ưu tại thư mục `dist/`. |
| `npm run preview` | Khởi chạy máy chủ xem trước kết quả đóng gói Production `dist/` ở cổng local. |
| `npm run lint` | Kiểm tra cú pháp và chất lượng mã nguồn bằng `oxlint`. |

---

## 🎨 3. Tổng Quan Tính Năng Giao Diện Web

Giao diện Web của **SportHubAI** được thiết kế hiện đại, đáp ứng chuẩn SEO và UX/UI hàng đầu:

1. **Thanh Điều Hướng (`Navbar`)**:
   - Logo hiệu ứng sáng **SportHubAI**.
   - Các mục điều hướng chính (`Trang chủ`, `Đặt sân`, `Khám phá`, `Bản đồ`, `Nổi bật`).
   - Nút `Đăng nhập`, `Đăng ký` và Icon chuông thông báo 🔔 với chấm đỏ hiển thị số lượng thông báo.

2. **Khối Hero Banner & Tìm Kiếm Thông Minh**:
   - Banner nhà thi đấu thể thao với overlay tối màu hiện đại.
   - Thanh tìm kiếm kính mờ (Glassmorphism) hỗ trợ tìm theo tên sân, địa điểm (Thành phố, Quận) và chọn Ngày/Giờ chơi.

3. **Danh Mục Thể Thao ("Khám phá")**:
   - Lưới 6 môn thể thao phổ biến: **Pickleball**, **Cầu lông**, **Bóng đá**, **Quần vợt**, **Bóng chuyền**, **Bóng rổ**.
   - Hỗ trợ lọc danh sách sân trực tiếp theo môn thể thao khi click.

4. **Khối Ưu Đãi & Tính Năng AI**:
   - Banner ưu đãi giảm 20% cho sân Pickleball mới.
   - **Trợ lý SportHubAI 🤖**: Đề xuất sân & khung giờ tối ưu theo nhu cầu bằng AI.
   - **Ghép Kèo AI ✨**: Tìm đối thủ/đồng đội phù hợp trình độ tự động.

5. **Lưới Sân Nổi Bật & Modal Đặt Sân**:
   - Hiển thị danh sách sân thể thao với đánh giá sao ⭐, lượt review, vị trí, nút thả tim yêu thích ❤️.
   - Modal Đặt Sân tương tác: Chọn ngày, chọn khung giờ vàng, tính tổng tiền tự động và xác nhận đặt sân.

6. **Hệ Sinh Thái SportHubAI (`Ecosystem`) & Footer**:
   - Giới thiệu 3 trụ cột: *Đề xuất thông minh*, *Xác nhận tức thì*, *Kết nối đồng đội*.
   - Chân trang chuyên nghiệp với thông tin liên hệ, mảng dịch vụ và các trang chính sách.

---

## 📂 4. Cấu Trúc Thư Mục Dự Án (`/web`)

```text
web/
├── node_modules/         # Thư viện phụ thuộc
├── public/               # Tài nguyên tĩnh (Favicon, logo...)
├── src/
│   ├── assets/           # Hình ảnh & icon tĩnh
│   ├── App.css           # Quy tắc Styling chi tiết cho từng component
│   ├── App.tsx           # Component chính chứa toàn bộ giao diện & logic
│   ├── index.css         # Design system (CSS Variables, Typography, Utilities)
│   └── main.tsx          # Điểm khởi tạo ứng dụng React
├── index.html            # Khung HTML chính (tích hợp Google Fonts & SEO Meta)
├── package.json          # Danh sách dependencies & lệnh chạy
├── tsconfig.json         # Cấu hình TypeScript
└── vite.config.ts        # Cấu hình máy chủ & công cụ đóng gói Vite
```

---

## ⚙️ 5. Yêu Cầu Hệ Thống (System Requirements)

- **Node.js**: phiên bản `>= 18.0.0` (Khuyên dùng LTS v20+).
- **npm**: phiên bản `>= 9.0.0`.
- Trình duyệt hỗ trợ: Chrome, Edge, Firefox, Safari phiên bản mới nhất.
