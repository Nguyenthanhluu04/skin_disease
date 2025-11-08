# SQL Database Schema

## Tạo Database
```sql
CREATE DATABASE skin_disease_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE skin_disease_db;
```

## Bảng Users (Optional - dùng cho authentication)
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## Bảng Predictions
```sql
CREATE TABLE predictions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    image_path VARCHAR(500) NOT NULL,
    predicted_class VARCHAR(100) NOT NULL,
    confidence FLOAT NOT NULL,
    all_predictions JSON,
    user_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_predicted_class (predicted_class),
    INDEX idx_created_at (created_at),
    INDEX idx_user_id (user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## Sample Data (Optional)
```sql
-- Insert sample user
INSERT INTO users (username, email, password, full_name) 
VALUES ('demo', 'demo@example.com', '$2a$10$demo_hashed_password', 'Demo User');

-- Insert sample prediction
INSERT INTO predictions (image_path, predicted_class, confidence, all_predictions, user_id)
VALUES (
    '/uploads/sample.jpg',
    'nv',
    0.9234,
    '{"nv": 0.9234, "bkl": 0.0453, "mel": 0.0201, "bcc": 0.0089, "akiec": 0.0012, "vasc": 0.0008, "df": 0.0003}',
    1
);
```

## Queries hữu ích

### Lấy 10 phân tích gần nhất
```sql
SELECT * FROM predictions 
ORDER BY created_at DESC 
LIMIT 10;
```

### Thống kê số lượng từng loại bệnh
```sql
SELECT 
    predicted_class,
    COUNT(*) as count,
    AVG(confidence) as avg_confidence
FROM predictions
GROUP BY predicted_class
ORDER BY count DESC;
```

### Lấy phân tích có độ tin cậy cao
```sql
SELECT * FROM predictions
WHERE confidence >= 0.8
ORDER BY confidence DESC;
```

### Xóa các phân tích cũ hơn 30 ngày
```sql
DELETE FROM predictions 
WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY);
```

## Backup Database
```sql
-- Backup toàn bộ database
mysqldump -u root -p skin_disease_db > backup_skin_disease.sql

-- Restore từ backup
mysql -u root -p skin_disease_db < backup_skin_disease.sql
```

## Notes
- Sequelize ORM sẽ tự động tạo bảng khi chạy backend
- Không cần chạy các câu lệnh CREATE TABLE thủ công
- Schema trên chỉ để tham khảo cấu trúc database
