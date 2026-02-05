@echo off
echo Subiendo cambios a GitHub...
git add .
git commit -m "Actualizacion desde VS Code"
git push origin main
echo.
echo Listo! Tus cambios se han subido.
pause
