# 🔐 Hướng Dẫn Sử Dụng Tính Năng Đăng Nhập/Đăng Ký

## ✨ Tính Năng Mới

### 1. **Đăng Ký Tài Khoản**

- Tạo tài khoản mới với username, email, password
- Tự động đăng nhập sau khi đăng ký thành công

### 2. **Đăng Nhập**

- Đăng nhập bằng username và password
- Token được lưu tự động (7 ngày)
- Tự động redirect về trang Detection

### 3. **Đăng Xuất**

- Click nút "Đăng xuất" trên navigation
- Xóa token và thông tin user
- Redirect về trang chủ

### 4. **Lịch Sử Riêng Tư**

- Mỗi user chỉ thấy lịch sử phân tích của mình
- Lịch sử được lưu tự động khi upload ảnh
- Chỉ hiển thị tab "Lịch sử" khi đã đăng nhập

---

## 🚀 Luồng Sử Dụng

### **Cách 1: Sử Dụng Với Tài Khoản**

```
1. Đăng ký tài khoản (/register)
   ├─ Nhập thông tin: username, email, password
   └─ Tự động đăng nhập

2. Phân tích ảnh (/detection)
   ├─ Upload ảnh bệnh da
   ├─ Nhận kết quả phân tích
   └─ Kết quả được lưu vào lịch sử

3. Xem lịch sử (/history)
   ├─ Chỉ thấy lịch sử của mình
   ├─ Có thể xóa các phân tích cũ
   └─ Dữ liệu riêng tư, an toàn

4. Đăng xuất
   └─ Click "Đăng xuất" trên navigation
```

### **Cách 2: Sử Dụng Không Cần Đăng Nhập (Guest)**

```
1. Vào trang phân tích (/detection)
2. Upload ảnh và xem kết quả
3. Lịch sử KHÔNG được lưu
4. Không truy cập được /history
```

---

## 🔧 Chi Tiết Kỹ Thuật

### **Frontend (Vue.js)**

#### **1. Auth Store (Pinia)**

Quản lý state authentication toàn cục:

```javascript
// src/stores/auth.js
- user: Thông tin user (username, email, full_name)
- token: JWT token
- isAuthenticated: Boolean computed
- login(): Đăng nhập
- register(): Đăng ký
- logout(): Đăng xuất
- initAuth(): Khởi tạo auth từ localStorage
```

#### **2. Router Navigation Guard**

Bảo vệ routes:

```javascript
// src/router/index.js
- /history: Chỉ cho user đã đăng nhập (requiresAuth)
- /login, /register: Chỉ cho guest (guest)
- Auto redirect nếu không có quyền
```

#### **3. Components Mới**

- `Login.vue`: Form đăng nhập
- `Register.vue`: Form đăng ký
- `App.vue`: Cập nhật navigation với auth buttons

#### **4. API Interceptor**

```javascript
// src/services/api.js
Request Interceptor:
- Tự động thêm Bearer token vào headers
- Token lấy từ localStorage

Response Interceptor:
- Xử lý 401 Unauthorized
- Auto logout và redirect về login
```

---

### **Backend (Express.js)**

#### **1. User Model**

```javascript
// backend/src/models/User.js
- Tự động hash password khi tạo/update (bcrypt)
- Method comparePassword() để verify
```

#### **2. Authentication Middleware**

```javascript
// backend/src/middleware/auth.js
- authenticate: Bắt buộc phải đăng nhập
- optionalAuth: Tùy chọn (dùng cho predictions)
```

#### **3. Protected Endpoints**

```javascript
POST   /api/users/register  - Đăng ký
POST   /api/users/login     - Đăng nhập
GET    /api/predictions/history - Lấy lịch sử (của user đã login)
```

#### **4. JWT Token**

- Expire: 7 ngày
- Payload: { userId }
- Secret: Từ .env (JWT_SECRET)

---

## 📊 Database Schema

### **Bảng Users**

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,  -- bcrypt hashed
    full_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### **Bảng Predictions (Đã Cập Nhật)**

```sql
CREATE TABLE predictions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    image_path VARCHAR(500) NOT NULL,
    predicted_class VARCHAR(100) NOT NULL,
    confidence FLOAT NOT NULL,
    all_predictions JSON,
    user_id INT NULL,  -- NULL = guest, có giá trị = user đã login
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
```

---

## 🧪 Test Cases

### **Test 1: Đăng Ký**

```
1. Vào /register
2. Nhập:
   - Username: testuser
   - Email: test@example.com
   - Password: 123456
   - Full Name: Test User
3. Click "Đăng Ký"
4. ✅ Chuyển về /detection
5. ✅ Thấy "Xin chào, testuser" trên nav
```

### **Test 2: Đăng Nhập**

```
1. Vào /login
2. Nhập username + password
3. Click "Đăng Nhập"
4. ✅ Chuyển về /detection
5. ✅ Navigation hiển thị user info
```

### **Test 3: Upload Ảnh (Đã Login)**

```
1. Đăng nhập
2. Vào /detection
3. Upload ảnh
4. ✅ Kết quả hiển thị
5. Vào /history
6. ✅ Thấy ảnh vừa upload trong lịch sử
```

### **Test 4: Lịch Sử Riêng Tư**

```
1. Tạo 2 users: user1, user2
2. User1 login -> upload ảnh A
3. User2 login -> upload ảnh B
4. User1 vào /history
5. ✅ Chỉ thấy ảnh A (không thấy ảnh B)
6. User2 vào /history
7. ✅ Chỉ thấy ảnh B (không thấy ảnh A)
```

### **Test 5: Đăng Xuất**

```
1. Đăng nhập
2. Click "Đăng xuất"
3. ✅ Confirm dialog xuất hiện
4. Click OK
5. ✅ Redirect về /
6. ✅ Navigation hiển thị "Đăng nhập" / "Đăng ký"
7. Vào /history
8. ✅ Auto redirect về /login
```

### **Test 6: Guest Mode**

```
1. KHÔNG đăng nhập
2. Vào /detection
3. Upload ảnh
4. ✅ Kết quả hiển thị bình thường
5. Vào /history
6. ✅ Auto redirect về /login
7. Click "Tiếp tục không đăng nhập"
8. ✅ Về trang chủ
```

---

## 🛡️ Security Features

### **1. Password Security**

- Sử dụng bcrypt với salt rounds = 10
- Password không bao giờ lưu dạng plain text

### **2. JWT Token**

- Signed với secret key
- Expire sau 7 ngày
- Stored in localStorage (có thể chuyển sang httpOnly cookie nếu cần)

### **3. Route Protection**

- Frontend: Vue Router navigation guards
- Backend: JWT middleware verification

### **4. Input Validation**

- Username: Min 3 ký tự
- Password: Min 6 ký tự
- Email: Valid email format
- Express-validator cho backend validation

### **5. Error Handling**

- Không expose thông tin nhạy cảm
- Generic error messages cho security
- Proper HTTP status codes

---

## 🔄 API Workflow

### **Register Flow**

```
Frontend                Backend              Database
   |                       |                     |
   |-- POST /register ---->|                     |
   |   {username, email,   |                     |
   |    password}          |                     |
   |                       |-- Check exists ---->|
   |                       |<----- Result -------|
   |                       |                     |
   |                       |-- Hash password     |
   |                       |-- Create user ----->|
   |                       |<----- User ---------|
   |                       |                     |
   |                       |-- Generate JWT      |
   |<-- {user, token} -----|                     |
   |                       |                     |
   |-- Save to localStorage|                     |
```

### **Login Flow**

```
Frontend                Backend              Database
   |                       |                     |
   |-- POST /login ------->|                     |
   |   {username, pass}    |                     |
   |                       |-- Find user ------->|
   |                       |<----- User ---------|
   |                       |                     |
   |                       |-- Compare password  |
   |                       |-- Generate JWT      |
   |<-- {user, token} -----|                     |
   |                       |                     |
   |-- Save to localStorage|                     |
```

### **Prediction with Auth**

```
Frontend                Backend              ML API
   |                       |                     |
   |-- POST /predict ----->|                     |
   |   Header: Bearer token|                     |
   |   FormData: image     |                     |
   |                       |-- Verify JWT        |
   |                       |-- Extract userId    |
   |                       |                     |
   |                       |-- POST /predict --->|
   |                       |<-- Result ----------|
   |                       |                     |
   |                       |-- Save to DB        |
   |                       |   (with user_id)    |
   |<-- Result ------------|                     |
```

---

## 📱 UI/UX Changes

### **Navigation Bar**

**Before:**

```
[Logo] [Trang chủ] [Phân tích] [Lịch sử]
```

**After (Guest):**

```
[Logo] [Trang chủ] [Phân tích] [Đăng nhập] [Đăng ký]
```

**After (Logged In):**

```
[Logo] [Trang chủ] [Phân tích] [Lịch sử] [Xin chào, username] [Đăng xuất]
```

---

## 🎨 New Pages

### **1. /login**

- Form đăng nhập
- Link đến /register
- Option "Tiếp tục không đăng nhập"

### **2. /register**

- Form đăng ký
- Validation real-time
- Password confirmation
- Link đến /login

---

## ⚙️ Environment Variables

Đảm bảo file `.env` trong backend có:

```env
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

---

## 🚨 Troubleshooting

### **Lỗi: "Token không hợp lệ"**

- Xóa localStorage: `localStorage.clear()`
- Đăng nhập lại

### **Lỗi: "Username hoặc email đã tồn tại"**

- Dùng username/email khác
- Hoặc đăng nhập với tài khoản đã có

### **Không thấy lịch sử sau khi upload**

- Kiểm tra đã đăng nhập chưa
- Check token còn hạn không
- Reload trang /history

### **Auto logout không mong muốn**

- Token có thể hết hạn (7 ngày)
- Backend trả 401 -> auto logout
- Đăng nhập lại

---

## 📝 Notes

1. **Guest Mode**: Vẫn có thể dùng app mà không cần đăng nhập, nhưng lịch sử không được lưu
2. **Token Expiry**: Token hết hạn sau 7 ngày, user cần đăng nhập lại
3. **Privacy**: Mỗi user chỉ thấy lịch sử của mình, dữ liệu riêng tư
4. **Security**: Password được hash, token được sign, routes được protect

---

**🎉 Tính năng authentication đã hoàn thành và sẵn sàng sử dụng!**
