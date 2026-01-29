@echo off
echo Starting Mini Udemy Application...
echo.

echo 1. DATABASE: 
echo    Ensure MySQL is running on port 3306.
echo    User: root, Password: vignesh
echo    Database 'miniudemy' will be created automatically.
echo.

echo 2. BACKEND (Spring Boot):
echo    Since Maven is not in your global path, please run the backend using IntelliJ IDEA.
echo    Open the 'backend' folder and run 'BackendApplication.java'.
echo.

echo 3. FRONTEND (React):
echo    Starting frontend server...
cd frontend
npm run dev
pause
