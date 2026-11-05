@echo off
title Push Noufal Portfolio to GitHub
echo ====================================================
echo Pushing Noufal Portfolio to GitHub...
echo Repository: https://github.com/noufalpattuppara-arch/noufal-portfolio1.git
echo ====================================================
echo.
git remote set-url origin https://github.com/noufalpattuppara-arch/noufal-portfolio1.git
git branch -M main
git add .
git commit -m "Update portfolio for Muhammed Noufal"
echo.
echo Connecting to GitHub... (if prompted, please sign in via your browser)
git push -u origin main
echo.
echo ====================================================
echo If you see "Branch main set up to track remote branch",
echo your portfolio is successfully pushed to GitHub!
echo ====================================================
pause
