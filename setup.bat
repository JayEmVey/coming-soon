@echo off
REM Gate 7 Coffee Roastery - Setup Script
REM Initializes Vite build environment

echo.
echo Cleaning up old installations...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist dist rmdir /s /q dist

echo.
echo Clearing npm cache...
call npm cache clean --force

echo.
echo Installing dependencies...
call npm install

echo.
echo Setup complete!
echo.
echo Available commands:
echo   npm run dev      - Start development server
echo   npm run build    - Build for production
echo   npm run deploy   - Build and deploy to GitHub Pages
echo.
pause
