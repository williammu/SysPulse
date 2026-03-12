#!/bin/bash
# SysInfo - 构建并安装到模拟器脚本

set -e

echo "=========================================="
echo "  SysInfo - 构建并安装到模拟器"
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
DEVICE_COUNT=$($HDC list targets 2>/dev/null | wc -l | tr -d ' ')
if [ "$DEVICE_COUNT" -eq 0 ]; then
    echo "❌ 未检测到设备或模拟器"
    exit 1
fi
echo "✅ 发现 $DEVICE_COUNT 个设备:"
$HDC list targets
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

# 安装到设备
echo "📦 安装到模拟器..."
$HDC install "$HAP_FILE"

echo ""
echo "✅ 安装完成!"
echo ""
echo "🚀 应用已安装到模拟器"
echo ""
echo "=========================================="
