# Hướng Dẫn Chạy Dự Án Chi Tiết

## I. CÀI ĐẶT YÊU CẦU

### 1. Cài đặt Node.js

- Tải và cài đặt Node.js 18+ từ: https://nodejs.org/
- Kiểm tra: `node --version` và `npm --version`

### 2. Cài đặt Python

- Tải và cài đặt Python 3.9+ từ: https://www.python.org/
- Kiểm tra: `python --version`

### 3. Cài đặt MySQL

- Tải và cài đặt MySQL 8.0+ từ: https://dev.mysql.com/downloads/
- Hoặc sử dụng XAMPP/WAMP

## II. SETUP DATABASE

### 1. Tạo Database

Mở MySQL Command Line hoặc phpMyAdmin và chạy:

```sql
CREATE DATABASE skin_disease_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Kiểm tra kết nối

```sql
SHOW DATABASES;
```

## III. SETUP BACKEND (Express.js)

### 1. Di chuyển vào thư mục backend

```bash
cd d:\Predict_Skin_Diseases\backend
```

### 2. Cài đặt packages

```bash
npm install
```

### 3. Cấu hình file .env

Mở file `.env` và chỉnh sửa:

```env
PORT=5000
NODE_ENV=development

# Database - THAY ĐỔI THÔNG TIN NÀY
DB_HOST=localhost
DB_PORT=3306
DB_NAME=skin_disease_db
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD

# Python API
PYTHON_API_URL=http://localhost:8000

# JWT Secret
JWT_SECRET=skin_disease_secret_key_2024

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
```

### 4. Chạy backend

```bash
npm run dev
```

Nếu thành công, bạn sẽ thấy:

```
✅ Database connection established successfully
✅ Database models synchronized
🚀 Server is running on http://localhost:5000
```

### 5. Test API

Mở trình duyệt và truy cập: http://localhost:5000/health

## IV. SETUP ML API (Python FastAPI)

### 1. Di chuyển vào thư mục ml-api

```bash
cd d:\Predict_Skin_Diseases\ml-api
```

### 2. Tạo môi trường ảo Python

```bash
python -m venv venv
```

### 3. Kích hoạt môi trường ảo

**Windows (PowerShell):**

```bash
venv\Scripts\Activate.ps1
```

**Windows (CMD):**

```bash
venv\Scripts\activate.bat
```

### 4. Cài đặt các thư viện

```bash
pip install -r requirements.txt
```

⚠️ **Lưu ý**: Quá trình cài đặt có thể mất 5-10 phút do tải PyTorch

### 5. Chạy ML API

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Nếu thành công, bạn sẽ thấy:

```
Using device: cpu (hoặc cuda nếu có GPU)
Model loaded successfully!
```

### 6. Test ML API

Mở trình duyệt và truy cập:

- http://localhost:8000 - API info
- http://localhost:8000/docs - Swagger UI

## V. SETUP FRONTEND (Vue.js)

### 1. Di chuyển vào thư mục frontend

```bash
cd d:\Predict_Skin_Diseases\frontend
```

### 2. Cài đặt packages

```bash
npm install
```

### 3. Chạy frontend

```bash
npm run dev
```

Nếu thành công, bạn sẽ thấy:

```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
```

### 4. Truy cập ứng dụng

Mở trình duyệt và truy cập: http://localhost:3000

## VI. KIỂM TRA HỆ THỐNG

### 1. Kiểm tra tất cả services đang chạy:

- ✅ Frontend: http://localhost:3000
- ✅ Backend: http://localhost:5000/health
- ✅ ML API: http://localhost:8000/health
- ✅ Database: MySQL đang chạy

### 2. Test upload ảnh:

1. Vào trang "Phân tích"
2. Upload một ảnh bệnh da
3. Xem kết quả phân tích

## VII. TROUBLESHOOTING

### Lỗi 1: Backend không kết nối được database

```
Error: ER_ACCESS_DENIED_ERROR
```

**Giải pháp**:

- Kiểm tra lại thông tin đăng nhập MySQL trong file `.env`
- Đảm bảo MySQL service đang chạy

### Lỗi 2: Python API không load được model

```
Failed to load model
```

**Giải pháp**:

- Đảm bảo đã cài đặt đầy đủ các thư viện trong `requirements.txt`
- Kiểm tra kết nối internet (model sẽ tự động tải từ Hugging Face)

### Lỗi 3: Frontend không gọi được Backend API

```
Network Error
```

**Giải pháp**:

- Đảm bảo Backend đang chạy trên port 5000
- Kiểm tra CORS settings trong Backend

### Lỗi 4: Port đã được sử dụng

```
Error: listen EADDRINUSE: address already in use
```

**Giải pháp**:

- Đóng các process đang dùng port đó
- Hoặc thay đổi port trong file `.env`

## VIII. TẮT HỆ THỐNG

Để tắt các services:

1. Nhấn `Ctrl + C` trong mỗi terminal đang chạy service
2. Deactivate Python virtual environment: `deactivate`

## IX. CHẠY LẠI SAU KHI TẮT

### Terminal 1 - Backend:

```bash
cd d:\Predict_Skin_Diseases\backend
npm run dev
```

### Terminal 2 - ML API:

```bash
cd d:\Predict_Skin_Diseases\ml-api
venv\Scripts\activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Terminal 3 - Frontend:

```bash
cd d:\Predict_Skin_Diseases\frontend
npm run dev
```

## X. BUILD CHO PRODUCTION

### Frontend:

```bash
cd frontend
npm run build
```

### Backend & ML API:

- Thay đổi `NODE_ENV=production` trong `.env`
- Sử dụng PM2 hoặc Docker để deploy

## XI. GHI CHÚ QUAN TRỌNG

1. **Model tự động tải**: Lần đầu chạy ML API, model sẽ tự động tải từ Hugging Face (~500MB)
2. **Database tự động tạo bảng**: Backend sẽ tự động tạo các bảng cần thiết khi khởi động
3. **Upload folder**: Backend tự động tạo thư mục `uploads/` để lưu ảnh
4. **Không commit .env**: File `.env` đã được thêm vào `.gitignore`

## XII. LIÊN HỆ HỖ TRỢ

Nếu gặp vấn đề, vui lòng:

1. Kiểm tra log trong terminal
2. Kiểm tra file `.env` đã cấu hình đúng
3. Đảm bảo tất cả services đã được cài đặt đầy đủ
