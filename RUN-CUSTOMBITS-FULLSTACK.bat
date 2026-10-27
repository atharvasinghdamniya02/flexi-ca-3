@echo off
setlocal
cd /d "%~dp0"
echo ==========================================
echo       CustomBits Full-Stack Launcher
echo ==========================================
where node >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js is not installed. Install Node.js LTS from https://nodejs.org/ then reopen this file.
  pause
  exit /b 1
)
where npm >nul 2>nul
if errorlevel 1 (
  echo ERROR: npm was not found. Reinstall Node.js LTS and make sure Add to PATH is enabled.
  pause
  exit /b 1
)
if not exist "server\.env" (
  copy "server\.env.example" "server\.env" >nul
  echo Created server\.env from the example configuration.
)
echo.
echo IMPORTANT: MongoDB Community Server must be running locally.
echo Installing project dependencies; this needs internet access the first time.
call npm run install:all
if errorlevel 1 (
  echo.
  echo Dependency installation failed. Check internet access and the error above.
  pause
  exit /b 1
)
echo.
echo Starting frontend at http://localhost:5173 and API at http://localhost:5000
echo Keep this window open while using CustomBits.
call npm run dev
pause
