@echo off
cd /d "%~dp0"
echo Subiendo cambios a GitHub...
git add .
git commit -m "Actualizacion desde VS Code"
git pull origin main --rebase
git push origin main
echo.
echo Listo! Tus cambios se han subido.
pause
