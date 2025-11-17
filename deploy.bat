@echo off
REM Gate 7 Coffee Roastery - Deploy Script (Windows)
REM Builds and deploys to GitHub Pages

echo.
echo Building production bundle...
call npm run build
if errorlevel 1 exit /b 1

echo.
echo Copying static files...
copy CNAME dist\CNAME >nul 2>&1
copy robots.txt dist\robots.txt >nul 2>&1
copy sitemap.xml dist\sitemap.xml >nul 2>&1
copy .htaccess dist\.htaccess >nul 2>&1

echo.
echo Creating git commit...
git add dist -f
git commit -m "chore: production build %date% %time%" || echo No changes to commit

echo.
echo Pushing to GitHub...
git push origin main

echo.
echo ✓ Deployment complete!
echo. 
echo Site is live at: https://gate7.vn
pause
