# Skin Disease Detection - Project Structure

```
d:\Predict_Skin_Diseases\
│
├── 📄 README.md                    # Tài liệu dự án chính
├── 📄 INSTALLATION.md              # Hướng dẫn cài đặt chi tiết
├── 📄 API_TESTING.md               # Hướng dẫn test API
├── 📄 DATABASE.sql                 # Database schema
├── 📄 assignment.md                # Yêu cầu đề bài
├── 📄 start-all.ps1                # Script chạy tất cả services
│
├── 📁 frontend/                    # Vue.js 3 Frontend
│   ├── 📁 public/
│   ├── 📁 src/
│   │   ├── 📁 assets/              # Hình ảnh, icons
│   │   ├── 📁 components/
│   │   │   ├── 📄 ImageUpload.vue      # Component upload ảnh
│   │   │   ├── 📄 ResultDisplay.vue    # Hiển thị kết quả
│   │   │   └── 📄 HistoryList.vue      # Danh sách lịch sử
│   │   ├── 📁 views/
│   │   │   ├── 📄 Home.vue             # Trang chủ
│   │   │   ├── 📄 Detection.vue        # Trang phân tích
│   │   │   └── 📄 History.vue          # Trang lịch sử
│   │   ├── 📁 router/
│   │   │   └── 📄 index.js             # Vue Router config
│   │   ├── 📁 services/
│   │   │   └── 📄 api.js               # Axios API service
│   │   ├── 📄 App.vue              # Root component
│   │   ├── 📄 main.js              # Entry point
│   │   └── 📄 style.css            # Global styles
│   ├── 📄 index.html
│   ├── 📄 package.json             # Dependencies
│   ├── 📄 vite.config.js           # Vite configuration
│   ├── 📄 tailwind.config.js       # Tailwind CSS config
│   ├── 📄 postcss.config.js        # PostCSS config
│   └── 📄 .gitignore
│
├── 📁 backend/                     # Express.js Backend
│   ├── 📁 src/
│   │   ├── 📁 config/
│   │   │   └── 📄 database.js          # Sequelize config
│   │   ├── 📁 controllers/
│   │   │   ├── 📄 predictionController.js  # Prediction logic
│   │   │   └── 📄 userController.js        # User auth logic
│   │   ├── 📁 models/
│   │   │   ├── 📄 Prediction.js        # Prediction model
│   │   │   └── 📄 User.js              # User model
│   │   ├── 📁 routes/
│   │   │   ├── 📄 predictionRoutes.js  # Prediction routes
│   │   │   └── 📄 userRoutes.js        # User routes
│   │   ├── 📁 middleware/
│   │   │   ├── 📄 upload.js            # Multer config
│   │   │   └── 📄 auth.js              # JWT authentication
│   │   └── 📁 services/
│   │       └── 📄 pythonApiService.js  # Call Python API
│   ├── 📁 uploads/                 # Uploaded images storage
│   ├── 📄 server.js                # Express server
│   ├── 📄 package.json             # Dependencies
│   ├── 📄 .env                     # Environment variables
│   └── 📄 .gitignore
│
└── 📁 ml-api/                      # Python FastAPI ML Service
    ├── 📁 app/
    │   ├── 📄 main.py              # FastAPI application
    │   ├── 📄 model.py             # ViT model wrapper
    │   └── 📄 utils.py             # Helper functions
    ├── 📁 models/                  # Model cache directory
    ├── 📁 temp_uploads/            # Temporary upload storage
    ├── 📄 requirements.txt         # Python dependencies
    ├── 📄 .env                     # Environment variables
    └── 📄 .gitignore
```

## 🎯 Chức năng từng thành phần

### Frontend (Vue.js)

- **Home.vue**: Giới thiệu hệ thống, thông tin về các loại bệnh
- **Detection.vue**: Trang chính để upload và phân tích ảnh
- **History.vue**: Xem lại lịch sử các lần phân tích
- **ImageUpload.vue**: Component xử lý drag & drop và preview ảnh
- **ResultDisplay.vue**: Hiển thị kết quả phân tích với các confidence scores
- **HistoryList.vue**: Component hiển thị danh sách lịch sử

### Backend (Express.js)

- **database.js**: Cấu hình kết nối MySQL với Sequelize
- **predictionController.js**: Xử lý upload ảnh, gọi ML API, lưu kết quả
- **userController.js**: Xử lý đăng ký, đăng nhập (optional)
- **Prediction.js**: Model định nghĩa bảng predictions
- **User.js**: Model định nghĩa bảng users
- **upload.js**: Middleware Multer để xử lý file upload
- **auth.js**: Middleware JWT authentication
- **pythonApiService.js**: Service gọi Python ML API

### ML API (Python FastAPI)

- **main.py**: FastAPI app với các endpoints
- **model.py**: Wrapper cho Vision Transformer model
- **utils.py**: Helper functions (save file, cleanup, format)

## 🔄 Luồng xử lý chính

### 1. Upload và Phân tích

```
User → Frontend (ImageUpload) → Backend (Multer) → ML API (ViT Model) → Backend (Save DB) → Frontend (Display)
```

### 2. Xem lịch sử

```
User → Frontend (History) → Backend API → MySQL → Backend → Frontend (HistoryList)
```

### 3. Xóa phân tích

```
User → Frontend → Backend (Delete file & DB record) → Frontend (Update list)
```

## 📊 Database Schema

### Table: predictions

- id (PRIMARY KEY)
- image_path (VARCHAR)
- predicted_class (VARCHAR)
- confidence (FLOAT)
- all_predictions (JSON)
- user_id (INT, FOREIGN KEY, nullable)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### Table: users (optional)

- id (PRIMARY KEY)
- username (VARCHAR, UNIQUE)
- email (VARCHAR, UNIQUE)
- password (VARCHAR, hashed)
- full_name (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

## 🚀 Ports sử dụng

- **3000**: Vue.js Frontend
- **5000**: Express.js Backend
- **8000**: FastAPI ML API
- **3306**: MySQL Database

## 📦 Dependencies chính

### Frontend

- vue@3.4.21
- vue-router@4.3.0
- pinia@2.1.7
- axios@1.6.8
- tailwindcss@3.4.3
- vee-validate@4.12.6

### Backend

- express@4.19.2
- sequelize@6.37.3
- mysql2@3.9.7
- multer@1.4.5-lts.1
- jsonwebtoken@9.0.2
- bcryptjs@2.4.3
- axios@1.6.8

### ML API

- fastapi@0.111.0
- uvicorn@0.29.0
- transformers@4.40.2
- torch@2.3.0
- pillow@10.3.0
