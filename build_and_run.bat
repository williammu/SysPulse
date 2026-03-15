@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ==========================================
echo   SysInfo - 构建并安装
echo ==========================================
echo.

set PROJECT_ROOT=%~dp0
cd /d "%PROJECT_ROOT%"

set DEVECO_STUDIO=E:\dev\DevEco Studio
set HDC=%DEVECO_STUDIO%\sdk\default\openharmony\toolchains\hdc.exe
set HVIGORW=%DEVECO_STUDIO%\tools\hvigor\bin\hvigorw.bat

echo 📁 项目目录: %PROJECT_ROOT%
echo.

echo 🔍 检查环境...

if not exist "%DEVECO_STUDIO%" (
    echo ❌ 错误: 未找到 DevEco Studio
    exit /b 1
)
echo ✅ DevEco Studio 已安装

if not exist "%HDC%" (
    echo ❌ 错误: 未找到 hdc 工具
    exit /b 1
)
echo ✅ HDC 工具可用

if not exist "%HVIGORW%" (
    echo ❌ 错误: 未找到 hvigorw 工具
    exit /b 1
)
echo ✅ hvigorw 工具可用
echo.

echo 📱 检查连接的设备...

set DEVICES=
for /f "tokens=*" %%i in ('"%HDC%" list targets 2^>nul') do (
    if "!DEVICES!"=="" (
        set DEVICES=%%i
    ) else (
        set DEVICES=!DEVICES!;%%i
    )
)

if "%DEVICES%"=="" (
    echo ❌ 未检测到设备或模拟器
    echo    请连接真机或启动模拟器
    exit /b 1
)

echo ✅ 发现设备:
for %%d in (%DEVICES%) do echo    %%d
echo.

set TARGET_DEVICE=
set DEVICE_TYPE=

for %%d in (%DEVICES%) do (
    set DEVICE_ID=%%d
    set IS_EMULATOR=0
    
    echo %%d | findstr /R "^[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*:[0-9][0-9]*" >nul
    if !errorlevel! equ 0 set IS_EMULATOR=1
    
    if !IS_EMULATOR! equ 1 (
        if "!TARGET_DEVICE!"=="" (
            set TARGET_DEVICE=%%d
            set DEVICE_TYPE=模拟器
            echo ✅ 发现模拟器: %%d
        )
    ) else (
        set TARGET_DEVICE=%%d
        set DEVICE_TYPE=真机
        echo ✅ 发现真机: %%d
        goto :device_found
    )
)

:device_found
if "%TARGET_DEVICE%"=="" (
    for /f "tokens=1" %%d in ("%DEVICES%") do (
        set TARGET_DEVICE=%%d
        set DEVICE_TYPE=未知设备
        echo ✅ 使用第一个设备: %%d
    )
)

echo.
echo 🎯 目标设备: %TARGET_DEVICE% (%DEVICE_TYPE%)
echo.

echo 🧹 清理构建缓存...
if exist "%PROJECT_ROOT%.hvigor\cache" rd /s /q "%PROJECT_ROOT%.hvigor\cache"
if exist "%PROJECT_ROOT%\entry\build" rd /s /q "%PROJECT_ROOT%\entry\build"
if not exist "%PROJECT_ROOT%.hvigor\cache" mkdir "%PROJECT_ROOT%.hvigor\cache"
echo ✅ 缓存已清理
echo.

echo 🔨 开始构建项目...
echo    使用 hvigorw 构建...
echo.

set DEVECO_SDK_HOME=%DEVECO_STUDIO%\sdk
set NODE_HOME=%DEVECO_STUDIO%\tools\node
set JAVA_HOME=%DEVECO_STUDIO%\jbr
set PATH=%NODE_HOME%;%JAVA_HOME%\bin;%PATH%

call "%HVIGORW%" assembleHap --no-daemon --stacktrace
if errorlevel 1 (
    echo.
    echo ⚠️  命令行构建失败
    echo.
    echo 💡 请使用 DevEco Studio 构建:
    echo    1. 在 DevEco Studio 中点击 Build ^> Build Project
    echo    2. 或点击运行按钮 ▶️
    echo.
    exit /b 1
)

echo.
echo ✅ 构建成功!
echo.

echo 🔍 查找 HAP 文件...
set HAP_FILE=%PROJECT_ROOT%entry\build\default\outputs\default\entry-default-signed.hap

if not exist "%HAP_FILE%" (
    echo ❌ 未找到 HAP 文件
    exit /b 1
)

echo ✅ 找到 HAP: %HAP_FILE%
echo.

echo 📦 安装到 %DEVICE_TYPE%...
echo    设备: %TARGET_DEVICE%
echo.

"%HDC%" -t %TARGET_DEVICE% install -r "%HAP_FILE%"
if errorlevel 1 (
    echo ❌ 安装失败
    exit /b 1
)

echo.
echo ✅ 安装完成!
echo.
echo 🚀 应用已安装到 %DEVICE_TYPE%
echo    设备 ID: %TARGET_DEVICE%
echo.

echo ▶️  启动应用...
"%HDC%" -t %TARGET_DEVICE% shell aa start -a EntryAbility -b com.huawei.sysinfo

echo.
echo ✅ 应用已启动!
echo.
echo ==========================================
