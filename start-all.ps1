# Script để chạy tất cả services cùng lúc
# Windows PowerShell

Write-Host "Starting Skin Disease Detection System..." -ForegroundColor Green

# Start Backend
Write-Host "`nStarting Backend (Express.js)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"

# Start ML API
Write-Host "Starting ML API (FastAPI)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd ml-api; venv\Scripts\activate; uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"

# Start Frontend
Write-Host "Starting Frontend (Vue.js)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "`n✅ All services are starting..." -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host "ML API:   http://localhost:8000" -ForegroundColor Cyan
