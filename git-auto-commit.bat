@echo off
:loop
git add .
git commit -m "Auto-commit: %date% %time%"
git push
timeout /t 300 /nobreak
goto loop
