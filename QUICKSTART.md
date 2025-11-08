# ⚡ HƯỚNG DẪN NHANH - CHẠY DỰ ÁN

## 📋 YÊU CẦU

- ✅ Node.js 18+
- ✅ Python 3.9+
- ✅ MySQL 8.0+
- ✅ 4GB RAM

---

## 🚀 CÀI ĐẶT VÀ CHẠY (3 BƯỚC)

### BƯỚC 1: Tạo Database

```sql
CREATE DATABASE skin_disease_db;
```

### BƯỚC 2: Setup Backend

```bash
cd backend
npm install
```

**Sửa file `.env`:**

```env
DB_USER=root
DB_PASSWORD=your_password_here
```

**Chạy:**

```bash
npm run dev
```

### BƯỚC 3: Setup ML API

```bash
cd ml-api
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### BƯỚC 4: Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## ✅ KIỂM TRA

Mở 3 link sau:

- 🌐 Frontend: http://localhost:3000
- 🔧 Backend: http://localhost:5000/health
- 🤖 ML API: http://localhost:8000/health

---

## 🎯 SỬ DỤNG

1. Vào http://localhost:3000
2. Click "Phân tích"
3. Kéo thả hoặc chọn ảnh bệnh da
4. Xem kết quả phân tích
5. Kiểm tra lịch sử trong tab "Lịch sử"

---

## 🔧 LỖI THƯỜNG GẶP

### Backend không kết nối DB

```
❌ ER_ACCESS_DENIED_ERROR
```

→ Kiểm tra lại `DB_PASSWORD` trong file `.env`

### Python không load model

```
❌ Failed to load model
```

→ Chờ model tải từ Hugging Face (lần đầu ~5-10 phút)

### Port đã được sử dụng

```
❌ EADDRINUSE
```

→ Đóng process đang dùng port hoặc đổi port trong `.env`

---

## 📱 CHỨC NĂNG

✅ Upload ảnh drag & drop  
✅ Phân tích 7 loại bệnh da  
✅ Hiển thị độ tin cậy  
✅ Lưu lịch sử phân tích  
✅ Xóa lịch sử cũ  
✅ Responsive design

---

## 📚 TÀI LIỆU CHI TIẾT

- **README.md** - Tổng quan dự án
- **INSTALLATION.md** - Hướng dẫn cài đặt chi tiết
- **API_TESTING.md** - Test API
- **PROJECT_STRUCTURE.md** - Cấu trúc dự án
- **DATABASE.sql** - Database schema

---

## 🏥 7 LOẠI BỆNH PHÁT HIỆN

1. **AKIEC** - Keratosis quang hóa
2. **BCC** - Ung thư tế bào đáy
3. **BKL** - Tổn thương lành tính
4. **DF** - U xơ da
5. **MEL** - Melanoma (ung thư da)
6. **NV** - Nốt ruồi lành tính
7. **VASC** - Tổn thương mạch máu

---

## ⚠️ LƯU Ý

- Kết quả chỉ mang tính tham khảo
- Không thay thế chẩn đoán y tế
- Nên tham khảo bác sĩ chuyên khoa

---

## 🎓 CÔNG NGHỆ SỬ DỤNG

**Frontend:** Vue.js 3 + Vite + Tailwind CSS  
**Backend:** Express.js + Sequelize + MySQL  
**ML API:** FastAPI + PyTorch + Transformers  
**Model:** Vision Transformer (ViT) từ Hugging Face

---

## 📞 HỖ TRỢ

Nếu gặp lỗi, kiểm tra:

1. ✅ MySQL đang chạy
2. ✅ File `.env` đã cấu hình đúng
3. ✅ Đã cài đặt đủ dependencies
4. ✅ Internet kết nối (để tải model)

---

**🎉 Chúc bạn thành công với dự án!**
