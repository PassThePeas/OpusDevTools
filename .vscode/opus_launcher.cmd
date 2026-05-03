@echo off
setlocal

:: Load environment configuration (DEFAULT_DOPUSRT and manual overrides)
if exist "%~dp0dopus_env.cmd" call "%~dp0dopus_env.cmd"

:: Priority Logic for dopusrt path
set "FINAL_PATH=%OPUS_DEV_TOOLS_DOPUSRT%"
if "%FINAL_PATH%"=="" set "FINAL_PATH=%DEFAULT_DOPUSRT%"

:: Validation
if not exist "%FINAL_PATH%" (
    echo [ERROR] dopusrt.exe not found at: "%FINAL_PATH%"
    pause
    exit /b 1
)

:: Dispatcher: Executes the specific Opus command requested
if "%~1"=="FIX_TYPES" (
    :: %~2 is the file to process (${file})
    :: %~3 is the destination folder
    "%FINAL_PATH%" /acmd OpusDT_FixTypes FILE="%~2" DEST_FOLDER="%~3"
) else if "%~1"=="GENERATE_MINIFIED" (
    :: No extra parameters needed as paths are hardcoded in JScript
    "%FINAL_PATH%" /acmd OpusDT_GenerateMinifiedTypings
) else if "%~1"=="BUILD_INDEX" (
    "%FINAL_PATH%" /acmd OpusDT_GenerateIndex   
) else (
    echo [ERROR] Unknown action: "%~1"
    echo Available actions: FIX_TYPES, GENERATE_LIGHT
    pause
    exit /b 1
)