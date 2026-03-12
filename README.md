# SysInfo - 纯血鸿蒙硬件配置查看器

基于 HarmonyOS NEXT 开发的原生硬件信息查看应用。

---

## 📋 目录

1. [功能特性](#功能特性)
2. [项目结构](#项目结构)
3. [快速开始](#快速开始)
4. [构建指引](#构建指引)
5. [技术栈](#技术栈)

---

## ✨ 功能特性

- 设备概览信息
- CPU 详细信息
- 内存和存储信息
- 屏幕和电池信息
- 网络和连接信息
- 摄像头和传感器信息

---

## 📁 项目结构

```
huawei_sysinfo/
├── AppScope/              # 应用全局配置
├── entry/                 # 主模块
│   └── src/main/
│       ├── ets/
│       │   ├── pages/    # 页面文件 (10个功能页面)
│       │   ├── components/ # 可复用组件
│       │   └── utils/    # 工具类
│       └── resources/    # 资源文件
├── scripts/               # 辅助脚本
│   ├── sync.sh          # 环境检查脚本
│   ├── build.sh         # 构建指引脚本
│   └── install.sh       # HAP 安装脚本
├── build-profile.json5    # 构建配置
├── hvigorw               # macOS/Linux 构建脚本
├── hvigorw.bat           # Windows 构建脚本
├── spec.md               # 规格说明书
├── BUILD_GUIDE.md        # 详细构建指引 ⭐
└── README.md             # 本文件
```

---

## 🚀 快速开始

### 前置要求
- **DevEco Studio NEXT** (最新版本)
- **HarmonyOS NEXT SDK** (API 22+)
- **HarmonyOS NEXT 真机** 或 **模拟器**

### ⭐ 方式一：使用 DevEco Studio (推荐)

这是最简单和最可靠的方式：

```bash
# 1. 用 DevEco Studio 打开项目
open -a /Applications/DevEco-Studio.app /Users/bytedance/dev/huawei_sysinfo

# 2. 等待项目同步完成
# 3. 选择设备（模拟器已连接: 127.0.0.1:5555）
# 4. 点击运行按钮 ▶️
```

### 方式二：使用脚本辅助

```bash
# 进入项目目录
cd /Users/bytedance/dev/huawei_sysinfo

# 检查环境和设备
./scripts/sync.sh

# 查看构建指引
./scripts/build.sh
```

---

## 📖 构建指引

详细的构建说明请查看 **[BUILD_GUIDE.md](./BUILD_GUIDE.md)**，包含：

- 详细的分步操作指南
- 环境检查和配置
- 脚本使用说明
- 常见问题解答
- 故障排除方法

---

## 🛠️ 脚本说明

项目提供三个辅助脚本：

| 脚本 | 功能 | 命令 |
|-----|------|------|
| sync.sh | 检查环境和连接设备 | `./scripts/sync.sh` |
| build.sh | 显示构建指引 | `./scripts/build.sh` |
| install.sh | 安装 HAP 到设备 | `./scripts/install.sh` |

---

## 💻 技术栈

- **语言**: ArkTS
- **UI框架**: ArkUI
- **最低版本**: HarmonyOS NEXT API 12
- **构建工具**: Hvigor
- **目标设备**: 手机、平板

---

## 📚 更多资源

- [HarmonyOS 官方文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/)
- [DevEco Studio 使用指南](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-instruction-0000001053541141)
- [构建指引](./BUILD_GUIDE.md)
- [规格说明书](./spec.md)

---

*项目版本: v1.0*  
*最后更新: 2026-03-11*


