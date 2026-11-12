@echo off
title Push Noufal Portfolio to GitHub
cd /d "%~dp0"

set "GIT_EXE=C:\Users\Noufa\AppData\Local\Programs\Git\cmd\git.exe"
if not exist "%GIT_EXE%" set "GIT_EXE=git"

echo ====================================================
echo Pushing Noufal Portfolio (with Real Photo and Videos) to GitHub...
echo Repository: https://github.com/noufalpattuppara-arch/noufal-portfolio11.git
echo ====================================================
echo.

"%GIT_EXE%" remote set-url origin https://github.com/noufalpattuppara-arch/noufal-portfolio11.git
"%GIT_EXE%" branch -M main
"%GIT_EXE%" add .
"%GIT_EXE%" commit -m "Add real photo and clean visual portfolio"

echo.
echo Connecting to GitHub...
echo (A browser window or sign-in popup may appear. Please click 'Sign in with your browser' to authorize.)
echo.

"%GIT_EXE%" push -u origin main

echo.
echo ====================================================
echo If you see "Branch main set up to track remote branch",
echo your portfolio and photo are LIVE on GitHub!
echo ====================================================
pause
