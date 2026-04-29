@echo off
:: --- DIRECTORY OPUS CONFIGURATION ---

:: 1. Default Path (Targeted by the installer via /home)
:: The installer will look for the line starting with "DEFAULT_DOPUSRT="
:: and replace the value with the actual path found on the system.
set "DEFAULT_DOPUSRT=C:\Program Files\GPSoftware\Directory Opus\dopusrt.exe"

:: 2. Manual Override (Leave empty to use the default path)
:: We respect the environment variable if it's already set (e.g., via USB Autorun).
if "%OPUS_DEV_TOOLS_DOPUSRT%"=="" (
    set "OPUS_DEV_TOOLS_DOPUSRT="
)

:: User Note:
:: To force a specific path without changing system variables,
:: you can manually set it here:
:: set "OPUS_DEV_TOOLS_DOPUSRT=Z:\Custom\Path\To\dopusrt.exe"