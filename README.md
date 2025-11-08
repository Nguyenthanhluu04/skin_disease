# Hệ Thống Phân Tích Bệnh Ngoài Da

Dự án sử dụng AI (Vision Transformer) để phân tích và phân loại bệnh da từ hình ảnh người dùng tải lên.

## 🎯 Tính Năng

- ✅ Upload và phân tích ảnh bệnh da
- ✅ Phát hiện 7 loại bệnh da khác nhau
- ✅ Hiển thị độ tin cậy của kết quả
- ✅ Lưu lịch sử phân tích
- ✅ Giao diện thân thiện, responsive
- ✅ API RESTful đầy đủ

## 🏗️ Kiến Trúc Hệ Thống

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│  Frontend   │ ───► │   Backend   │ ───► │   ML API    │
│  (Vue.js)   │      │ (Express.js)│      │  (FastAPI)  │
└─────────────┘      └─────────────┘      └─────────────┘
                            │
                            ▼
                     ┌─────────────┐
                     │   MySQL DB  │
                     └─────────────┘
```

## 📦 Tech Stack

### Frontend

- **Vue.js 3** (Composition API)
- **Vite** - Build tool
- **Vue Router** - Routing
- **Pinia** - State management
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **VeeValidate** - Form validation

### Backend

- **Express.js** - Web framework
- **Sequelize** - ORM
- **MySQL** - Database
- **Multer** - File upload
- **JWT** - Authentication
- **Axios** - HTTP client
- **Morgan** - Logging

### ML API

- **FastAPI** - API framework
- **Transformers** - Hugging Face library
- **PyTorch** - Deep learning framework
- **Pillow** - Image processing
- **Uvicorn** - ASGI server

### Model

- **Vision Transformer (ViT)** - Google's ViT fine-tuned
- **Dataset**: HAM10000 (10,000+ ảnh)
- **Classes**: 7 loại bệnh da

## 🚀 Cài Đặt và Chạy

### Yêu Cầu Hệ Thống

- Node.js 18+
- Python 3.9+
- MySQL 8.0+
- 4GB RAM (khuyến nghị 8GB)

### 1. Clone Repository

```bash
cd d:\Predict_Skin_Diseases
```

### 2. Setup Database

```sql
CREATE DATABASE skin_disease_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Setup Backend (Express.js)

```bash
cd backend
npm install
```

Cấu hình file `.env`:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=skin_disease_db
DB_USER=root
DB_PASSWORD=your_password
PYTHON_API_URL=http://localhost:8000
JWT_SECRET=your_secret_key
```

Chạy backend:

```bash
npm run dev
```

### 4. Setup ML API (Python)

```bash
cd ml-api
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Chạy ML API:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 5. Setup Frontend (Vue.js)

```bash
cd frontend
npm install
```

Chạy frontend:

```bash
npm run dev
```

## 📱 Truy Cập Ứng Dụng

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **ML API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 🎨 Giao Diện

1. **Trang chủ**: Giới thiệu hệ thống
2. **Phân tích**: Upload và phân tích ảnh
3. **Lịch sử**: Xem lại các phân tích trước

## 📊 API Endpoints

### Backend API (Express.js)

#### Predictions

```
POST   /api/predictions/predict   - Upload và phân tích ảnh
GET    /api/predictions/history   - Lấy lịch sử phân tích
GET    /api/predictions/:id       - Lấy chi tiết phân tích
DELETE /api/predictions/:id       - Xóa phân tích
```

#### Users (Optional)

```
POST   /api/users/register        - Đăng ký
POST   /api/users/login           - Đăng nhập
```

### ML API (FastAPI)

```
GET    /                          - API info
GET    /health                    - Health check
POST   /predict                   - Predict image
GET    /classes                   - Get all classes
```

## 🏥 Các Loại Bệnh Được Phát Hiện

1. **AKIEC** - Keratosis quang hóa / Carcinoma tại chỗ
2. **BCC** - Ung thư tế bào đáy (Basal Cell Carcinoma)
3. **BKL** - Tổn thương lành tính giống sừng
4. **DF** - U xơ da (Dermatofibroma)
5. **MEL** - Melanoma (Ung thư da ác tính)
6. **NV** - Nốt ruồi lành tính (Melanocytic Nevi)
7. **VASC** - Tổn thương mạch máu da

## ⚠️ Lưu Ý

- Hệ thống chỉ mang tính chất tham khảo
- Không thay thế chẩn đoán y tế chuyên nghiệp
- Upload ảnh rõ nét, đủ ánh sáng để có kết quả tốt nhất
- Tham khảo ý kiến bác sĩ chuyên khoa để có chẩn đoán chính xác

## 📝 License

MIT License

## 👨‍💻 Developer

Dự án môn học - Phân tích bệnh ngoài da với AI

## 🔗 Links

- Model: https://huggingface.co/Anwarkh1/Skin_Cancer-Image_Classification
- Dataset: HAM10000
