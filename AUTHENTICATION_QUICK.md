# 🚀 HƯỚNG DẪN NHANH - CHẠY DỰ ÁN VỚI AUTHENTICATION

## ✅ ĐÃ CÀI ĐẶT XONG

Dự án đã có đầy đủ tính năng:

- ✅ Đăng ký tài khoản
- ✅ Đăng nhập / Đăng xuất
- ✅ Lịch sử riêng cho mỗi user
- ✅ Guest mode (không cần đăng nhập)

---

## 🔧 CHẠY DỰ ÁN

### **Terminal 1 - Backend**

```bash
cd d:\Predict_Skin_Diseases\backend
npm run dev
```

### **Terminal 2 - ML API**

```bash
cd d:\Predict_Skin_Diseases\ml-api
venv\Scripts\activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### **Terminal 3 - Frontend**

```bash
cd d:\Predict_Skin_Diseases\frontend
npm run dev
```

---

## 🎯 TEST TÍNH NĂNG

### **1. Đăng Ký**

```
1. Mở http://localhost:3000
2. Click "Đăng ký"
3. Nhập thông tin:
   - Username: admin
   - Email: admin@test.com
   - Password: 123456
4. Click "Đăng Ký"
5. ✅ Tự động đăng nhập và chuyển về /detection
```

### **2. Upload Ảnh (User đã login)**

```
1. Vào trang "Phân tích"
2. Upload ảnh bệnh da
3. Xem kết quả
4. ✅ Kết quả được lưu vào database với user_id
```

### **3. Xem Lịch Sử**

```
1. Click tab "Lịch sử" (chỉ hiện khi đã login)
2. ✅ Thấy các ảnh đã phân tích
3. ✅ Chỉ thấy lịch sử của mình
```

### **4. Đăng Xuất**

```
1. Click "Đăng xuất" trên navigation
2. Confirm
3. ✅ Token bị xóa
4. ✅ Redirect về trang chủ
```

### **5. Test Guest Mode**

```
1. KHÔNG đăng nhập
2. Vào /detection
3. Upload ảnh
4. ✅ Vẫn xem được kết quả
5. Thử vào /history
6. ✅ Tự động redirect về /login
```

---

## 📊 KIỂM TRA DATABASE

```sql
-- Xem users
SELECT * FROM users;

-- Xem predictions với user_id
SELECT
    p.id,
    p.predicted_class,
    p.confidence,
    p.user_id,
    u.username,
    p.created_at
FROM predictions p
LEFT JOIN users u ON p.user_id = u.id
ORDER BY p.created_at DESC;

-- Đếm số predictions của mỗi user
SELECT
    u.username,
    COUNT(p.id) as total_predictions
FROM users u
LEFT JOIN predictions p ON u.id = p.user_id
GROUP BY u.id, u.username;
```

---

## 🔑 ROUTES MỚI

| Route        | Access        | Description         |
| ------------ | ------------- | ------------------- |
| `/`          | Public        | Trang chủ           |
| `/detection` | Public        | Phân tích ảnh       |
| `/history`   | **Protected** | Lịch sử (cần login) |
| `/login`     | Guest only    | Đăng nhập           |
| `/register`  | Guest only    | Đăng ký             |

---

## 🎨 UI CHANGES

### **Navigation (Chưa Login)**

```
[Logo] [Trang chủ] [Phân tích] [Đăng nhập] [Đăng ký]
```

### **Navigation (Đã Login)**

```
[Logo] [Trang chủ] [Phân tích] [Lịch sử] [Xin chào, username] [Đăng xuất]
```

---

## 🛠️ FILES MỚI

### **Frontend**

```
frontend/src/
├── stores/
│   └── auth.js                 # Pinia store cho authentication
├── views/
│   ├── Login.vue               # Trang đăng nhập
│   └── Register.vue            # Trang đăng ký
├── router/index.js             # Đã update với navigation guard
└── App.vue                     # Đã update với auth UI
```

### **Backend**

```
backend/src/
└── controllers/
    └── userController.js       # Đã fix lỗi import Op
```

### **Documentation**

```
AUTHENTICATION.md               # Tài liệu chi tiết về auth
AUTHENTICATION_QUICK.md         # File này
```

---

## 🔒 SECURITY

- ✅ Password được hash bằng bcrypt
- ✅ JWT token expire sau 7 ngày
- ✅ Routes được protect bằng navigation guard
- ✅ Backend verify token trên mọi request có auth
- ✅ Tự động logout khi token invalid (401)

---

## ⚠️ LƯU Ý

1. **Guest Mode**: Vẫn có thể dùng mà không cần login, nhưng không lưu lịch sử
2. **Private History**: Mỗi user chỉ thấy lịch sử của mình
3. **Token Expiry**: Token hết hạn sau 7 ngày, cần login lại
4. **Auto Redirect**:
   - Vào `/history` mà chưa login → redirect `/login`
   - Vào `/login` mà đã login → redirect `/`

---

## 🚨 TROUBLESHOOTING

### **Frontend không kết nối Backend**

```bash
# Check backend đang chạy
curl http://localhost:5000/health

# Check API URL trong frontend
# File: frontend/src/services/api.js
# baseURL: 'http://localhost:5000/api'
```

### **Không thấy navigation buttons**

```bash
# Clear cache và reload
Ctrl + Shift + R

# Hoặc xóa localStorage
localStorage.clear()
```

### **Token expired error**

```bash
# Đăng nhập lại
# Token hết hạn sau 7 ngày
```

---

## 📚 TÀI LIỆU CHI TIẾT

Xem file `AUTHENTICATION.md` để có thông tin đầy đủ về:

- Luồng hoạt động
- API endpoints
- Database schema
- Test cases chi tiết
- Security features

---

## 🎉 HOÀN THÀNH!

Dự án đã có đầy đủ tính năng authentication.

**Test ngay:**

1. Chạy 3 terminals (Backend, ML API, Frontend)
2. Vào http://localhost:3000
3. Đăng ký tài khoản mới
4. Upload ảnh và xem lịch sử
5. Đăng xuất và test guest mode

**Chúc bạn thành công! 🚀**
