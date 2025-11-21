@echo off
REM Gate 7 Coffee Roastery - Complete Deploy Script (Windows)
REM Handles: Responsive images, SEO validation, build, and Git deployment

echo.
echo ========================================
echo Gate 7 Coffee - Complete Deployment
echo ========================================
echo.

call node deploy-complete.js
if errorlevel 1 (
    echo.
    echo Deployment failed! Check errors above.
    pause
    exit /b 1
)

pause
