#!/bin/bash
# SysInfo - 构建并安装脚本（支持真机和模拟器，优先真机）

set -e

echo "=========================================="
echo "  SysInfo - 构建并安装"
echo "=========================================="
echo ""

# 项目根目录
PROJECT_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$PROJECT_ROOT"

# 工具路径
DEVECO_STUDIO="/Applications/DevEco-Studio.app"
HDC="$DEVECO_STUDIO/Contents/sdk/default/openharmony/toolchains/hdc"
HVIGORW="$DEVECO_STUDIO/Contents/tools/hvigor/bin/hvigorw"

echo "📁 项目目录: $PROJECT_ROOT"
echo ""

# 检查环境
echo "🔍 检查环境..."

if [ ! -d "$DEVECO_STUDIO" ]; then
    echo "❌ 错误: 未找到 DevEco Studio"
    exit 1
fi
echo "✅ DevEco Studio 已安装"

if [ ! -f "$HDC" ]; then
    echo "❌ 错误: 未找到 hdc 工具"
    exit 1
fi
echo "✅ HDC 工具可用"

if [ ! -f "$HVIGORW" ]; then
    echo "❌ 错误: 未找到 hvigorw 工具"
    exit 1
fi
echo "✅ hvigorw 工具可用"

echo ""

# 检查设备
echo "📱 检查连接的设备..."

# 获取设备列表
DEVICES=$($HDC list targets 2>/dev/null)
DEVICE_COUNT=$(echo "$DEVICES" | wc -l | tr -d ' ')

if [ "$DEVICE_COUNT" -eq 0 ]; then
    echo "❌ 未检测到设备或模拟器"
    echo "   请连接真机或启动模拟器"
    exit 1
fi

echo "✅ 发现 $DEVICE_COUNT 个设备:"
echo "$DEVICES"
echo ""

# 检测设备类型并选择目标设备
TARGET_DEVICE=""
DEVICE_TYPE=""

# 遍历设备，优先选择真机
while IFS= read -r line; do
    # 提取设备 ID（去除空格）
    DEVICE_ID=$(echo "$line" | tr -d '[:space:]')
    
    # 跳过空行
    [ -z "$DEVICE_ID" ] && continue
    
    # 检查是否为模拟器（IP 地址格式，如 127.0.0.1:5555）
    if echo "$DEVICE_ID" | grep -qE "^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+:[0-9]+"; then
        # 如果还没有找到真机，先记录模拟器
        if [ -z "$TARGET_DEVICE" ]; then
            TARGET_DEVICE="$DEVICE_ID"
            DEVICE_TYPE="模拟器"
            echo "✅ 发现模拟器: $DEVICE_ID"
        fi
    else
        # 非 IP 格式视为真机（如 2SX0224417010945）
        TARGET_DEVICE="$DEVICE_ID"
        DEVICE_TYPE="真机"
        echo "✅ 发现真机: $DEVICE_ID"
        break
    fi
done <<< "$DEVICES"

# 如果没有找到设备，使用第一个设备
if [ -z "$TARGET_DEVICE" ]; then
    TARGET_DEVICE=$(echo "$DEVICES" | head -1 | tr -d '[:space:]')
    DEVICE_TYPE="未知设备"
    echo "✅ 使用第一个设备: $TARGET_DEVICE"
fi

echo ""
echo "🎯 目标设备: $TARGET_DEVICE ($DEVICE_TYPE)"
echo ""

# 清理旧的构建缓存
echo "🧹 清理构建缓存..."
rm -rf "$PROJECT_ROOT/.hvigor/cache"
rm -rf "$PROJECT_ROOT/entry/build"
mkdir -p "$PROJECT_ROOT/.hvigor/cache"
echo "✅ 缓存已清理"
echo ""

# 尝试构建
echo "🔨 开始构建项目..."
echo "   使用 hvigorw 构建..."
echo ""

# 设置环境变量
export NODE_HOME="$DEVECO_STUDIO/Contents/tools/node"
export PATH="$NODE_HOME/bin:$PATH"

# 执行构建
if "$HVIGORW" assembleHap --no-daemon --stacktrace 2>&1; then
    echo ""
    echo "✅ 构建成功!"
else
    echo ""
    echo "⚠️  命令行构建失败"
    echo "   纯血鸿蒙项目需要 DevEco Studio 进行项目迁移"
    echo ""
    echo "💡 请使用 DevEco Studio 构建:"
    echo "   1. 在 DevEco Studio 中点击 Build → Build Project"
    echo "   2. 或点击运行按钮 ▶️"
    echo ""
    exit 1
fi

# 查找 HAP 文件
echo ""
echo "🔍 查找 HAP 文件..."
HAP_FILE=$(find "$PROJECT_ROOT" -name "*.hap" -type f 2>/dev/null | head -1)

if [ -z "$HAP_FILE" ]; then
    echo "❌ 未找到 HAP 文件"
    exit 1
fi

echo "✅ 找到 HAP: $HAP_FILE"
echo ""

# 安装到目标设备
echo "📦 安装到 $DEVICE_TYPE..."
echo "   设备: $TARGET_DEVICE"
echo ""

$HDC -t "$TARGET_DEVICE" install -r "$HAP_FILE"

echo ""
echo "✅ 安装完成!"
echo ""
echo "🚀 应用已安装到 $DEVICE_TYPE"
echo "   设备 ID: $TARGET_DEVICE"
echo ""

# 启动应用
echo "▶️  启动应用..."
$HDC -t "$TARGET_DEVICE" shell aa start -a EntryAbility -b com.huawei.sysinfo

echo ""
echo "✅ 应用已启动!"
echo ""
echo "=========================================="
