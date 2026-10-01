@echo off
echo Starting Asla Farveen Portfolio Local Server...
start "" "http://localhost:8080/"
powershell -ExecutionPolicy Bypass -File .\server.ps1
pause
