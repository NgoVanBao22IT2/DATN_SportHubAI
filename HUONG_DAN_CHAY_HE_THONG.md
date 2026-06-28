# Huong Dan Chay He Thong DATN_SportHubAI

Tai lieu nay huong dan chay day du 3 phan: Backend, Web, Mobile.

## 1. Yeu cau moi truong

- Node.js 18+ (khuyen nghi Node.js 20 LTS)
- npm 9+
- MySQL 8+
- Expo Go (neu test mobile bang dien thoai)
- Android Studio/Xcode (neu test mobile bang emulator)

## 2. Cau truc du an

- backend: API server (Express + Sequelize + MySQL)
- web: Frontend web (Vite + React)
- mobile: App mobile (Expo + React Native)

## 3. Chuan bi Backend

### 3.1 Cai dependency

Mo terminal tai thu muc backend va chay:

```powershell
Set-Location e:\DATN\DATN_SportHubAI\backend
npm install
```

### 3.2 Cau hinh bien moi truong

- Tao file `.env` trong thu muc backend (neu chua co) tu `.env.example`.
- Cap nhat thong tin DB cho dung may ban.

Vi du:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=123456789
DB_NAME=arena_reserve
```

### 3.3 Chay backend

```powershell
Set-Location e:\DATN\DATN_SportHubAI\backend
npm run dev
```

Khi thanh cong, terminal se hien thong bao tuong tu:

- Ket noi MySQL thanh cong
- Sequelize sync thanh cong
- Server chay o port 5000

Health check:

- GET http://localhost:5000/health

### 3.4 Seed du lieu mau (tuy chon)

```powershell
Set-Location e:\DATN\DATN_SportHubAI\backend
npm run seed
```

## 4. Chay Web

### 4.1 Cai dependency

```powershell
Set-Location e:\DATN\DATN_SportHubAI\web
npm install
```

### 4.2 Chay dev server

```powershell
Set-Location e:\DATN\DATN_SportHubAI\web
npm run dev
```

Thuong se mo tai:

- http://localhost:5173

## 5. Chay Mobile (Expo)

### 5.1 Cai dependency

```powershell
Set-Location e:\DATN\DATN_SportHubAI\mobile
npm install
```

### 5.2 Chay Expo

```powershell
Set-Location e:\DATN\DATN_SportHubAI\mobile
npm start
```

Trong man hinh Expo:

- Bam `a` de mo Android emulator
- Bam `w` de mo ban web cua Expo
- Hoac quet QR bang Expo Go tren dien thoai

## 6. Luu y quan trong ve API Base URL

Hien tai Web va Mobile dang hard-code:

- `https://api.sporthubai.local/api/v1`

Neu ban chay local nhanh, co 2 cach:

### Cach A: Sua BASE_URL sang localhost

- Sua trong web: `web/src/core/api/apiClient.ts`
- Sua trong mobile: `mobile/src/core/api/apiClient.ts`

Doi thanh:

```ts
const BASE_URL = "http://localhost:5000/api/v1";
```

Luu y voi mobile chay tren thiet bi that, `localhost` se khong tro ve may tinh cua ban. Khi do dung IP LAN (192.168.1.99):

```ts
const BASE_URL = "http://192.168.1.99:5000/api/v1";
```

### Cach B: Giu nguyen domain `api.sporthubai.local`

Can cau hinh hosts + reverse proxy/SSL de domain nay tro dung backend local.

## 7. Lenh kiem tra nhanh

### Backend

```powershell
Set-Location e:\DATN\DATN_SportHubAI\backend
npm run ts:check
```

### Web

```powershell
Set-Location e:\DATN\DATN_SportHubAI\web
npm run build
```

### Mobile

```powershell
Set-Location e:\DATN\DATN_SportHubAI\mobile
npm run ts:check
```

## 8. Thu tu khoi dong de test day du

1. Khoi dong MySQL.
2. Chay backend (`npm run dev`).
3. Chay web hoac mobile.
4. Kiem tra endpoint health va thu dang ky/dang nhap.

## 9. Chay Mobile tren Thiet bi That (Android/iOS)

De chay app mobile tren dien thoai thuc te:

### 9.1 Sua API Base URL trong mobile

Sua file `mobile/src/core/api/apiClient.ts`:

```ts
const BASE_URL = "http://192.168.1.99:5000/api/v1";
```

### 9.2 Chay Expo ở chế độ local

```powershell
Set-Location e:\DATN\DATN_SportHubAI\mobile
npm start
```

Quet QR code bang Expo Go tren dien thoai (iOS va Android).

Luu y: Thiet bi di dong va may tinh phai ket noi cung 1 WiFi LAN.

### 9.3 Xac nhan ket noi

- Backend chay tren 192.168.1.99:5000
- Di toi man hinh Login tren mobile
- Thu dang ky hoac dang nhap
- Kiem tra API call thanh cong tren backend logs
