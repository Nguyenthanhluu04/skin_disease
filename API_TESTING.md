# API Testing với cURL

## 1. Health Check

### Backend

curl http://localhost:5000/health

### ML API

curl http://localhost:8000/health

## 2. Test Prediction

### Upload và phân tích ảnh

curl -X POST http://localhost:5000/api/predictions/predict \
 -F "image=@path/to/your/image.jpg"

### Hoặc sử dụng PowerShell (Windows)

$form = @{
image = Get-Item -Path "C:\path\to\image.jpg"
}
Invoke-RestMethod -Uri "http://localhost:5000/api/predictions/predict" -Method Post -Form $form

## 3. Get History

curl http://localhost:5000/api/predictions/history

## 4. Get Prediction by ID

curl http://localhost:5000/api/predictions/1

## 5. Delete Prediction

curl -X DELETE http://localhost:5000/api/predictions/1

## 6. Register User (Optional)

curl -X POST http://localhost:5000/api/users/register \
 -H "Content-Type: application/json" \
 -d '{
"username": "testuser",
"email": "test@example.com",
"password": "password123",
"full_name": "Test User"
}'

## 7. Login (Optional)

curl -X POST http://localhost:5000/api/users/login \
 -H "Content-Type: application/json" \
 -d '{
"username": "testuser",
"password": "password123"
}'

## 8. ML API - Direct Prediction

curl -X POST http://localhost:8000/predict \
 -F "file=@path/to/your/image.jpg"

## 9. Get All Classes

curl http://localhost:8000/classes

---

## Sử dụng Postman

### Import vào Postman:

1. **Health Check**

   - Method: GET
   - URL: http://localhost:5000/health

2. **Predict Image**

   - Method: POST
   - URL: http://localhost:5000/api/predictions/predict
   - Body: form-data
   - Key: image (type: File)
   - Value: Chọn file ảnh

3. **Get History**

   - Method: GET
   - URL: http://localhost:5000/api/predictions/history?limit=10

4. **Delete Prediction**
   - Method: DELETE
   - URL: http://localhost:5000/api/predictions/{id}

---

## Python Script để Test

```python
import requests

# Test prediction
url = "http://localhost:5000/api/predictions/predict"
files = {"image": open("test_image.jpg", "rb")}
response = requests.post(url, files=files)
print(response.json())
```

---

## JavaScript/Node.js để Test

```javascript
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const form = new FormData();
form.append("image", fs.createReadStream("test_image.jpg"));

axios
  .post("http://localhost:5000/api/predictions/predict", form, {
    headers: form.getHeaders(),
  })
  .then((response) => console.log(response.data))
  .catch((error) => console.error(error));
```
