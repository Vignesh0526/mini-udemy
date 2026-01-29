@echo off
echo ==============================================
echo       MINI UDEMY - RUN INSTRUCTIONS
echo ==============================================

echo [1] CONFIGURATION
echo     Database: MySQL (miniudemy)
echo     User:     root
echo     Pass:     vignesh
echo     Status:   configured in application.properties

echo [2] FRONTEND
echo     Status:   RUNNING
echo     URL:      http://localhost:5174
echo     (If not open, check the terminal window)

echo [3] BACKEND
echo     Status:   NOT STARTED (Action Required)
echo     Reason:   'mvn' is not installed in your terminal environment.
echo     Action:   The folder 'backend' will open now. 
echo               1. Open this folder in IntelliJ IDEA.
echo               2. Locate 'BackendApplication.java'.
echo               3. Click the green 'Run' button.
echo               NOTE: First run may take 5-10 minutes to download dependencies!

echo Opening Backend folder...
start "" "c:\Users\vigne\OneDrive\Desktop\Mini Udemy\backend"

echo Opening Frontend URL...
start http://localhost:5174

pause
