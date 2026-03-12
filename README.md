# SysPulse - 纯血鸿蒙系统监控工具

基于 HarmonyOS NEXT 开发的原生系统监控和硬件信息查看应用。

---

## 📋 目录

1. [功能特性](#功能特性)
2. [项目结构](#项目结构)
3. [快速开始](#快速开始)
4. [构建指引](#构建指引)
5. [技术栈](#技术栈)

---

## ✨ 功能特性

### 实时监控
- CPU 使用率实时监控（200ms刷新）
- 内存使用率实时监控
- 应用内存占用监控
- 电池电量监控

### 硬件信息
- CPU 详细信息（架构、核心数、型号、制程）
- 内存详情（总内存、可用内存、PSS/RSS/VSS）
- 存储信息
- 屏幕参数（分辨率、刷新率）
- GPU 信息
- 电池详情

### 连接与传感器
- 网络状态（类型、带宽）
- 摄像头信息
- 传感器数据（加速度、陀螺仪、光线、距离、磁场、方向）

### 高级功能
- Native HiDebug API 集成
- 线程 CPU 使用率
- 内存限制查询
- 数据趋势图表
- 科技感深色 UI

---

## 📁 项目结构

```
huawei_sysinfo/
├── AppScope/              # 应用全局配置
├── entry/                 # 主模块
│   └── src/main/
│       ├── ets/
│       │   ├── pages/     # 页面文件 (12个功能页面)
│       │   ├── components/ # 可复用组件
│       │   └── utils/     # 工具类
│       ├── cpp/           # Native C++ 模块
│       │   ├── hidebug_module.cpp  # HiDebug API 封装
│       │   └── sensor_module.cpp   # 传感器 API 封装
│       └── resources/     # 资源文件
├── scripts/               # 辅助脚本
│   ├── sync.sh           # 环境检查脚本
│   ├── build.sh          # 构建指引脚本
│   └── install.sh        # HAP 安装脚本
├── build-profile.json5    # 构建配置
├── hvigorw               # macOS/Linux 构建脚本
├── hvigorw.bat           # Windows 构建脚本
├── BUILD_GUIDE.md        # 详细构建指引 ⭐
├── TEST_CASE.md          # 测试用例与问题解决记录
├── NATIVE_BEST_PRACTICES.md  # Native 开发最佳实践
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

### 方式二：使用命令行构建

```bash
# 进入项目目录
cd /Users/bytedance/dev/huawei_sysinfo

# 构建应用
hvigorw assembleApp --parallel --daemon

# 安装到设备
hdc install -r entry/build/default/outputs/default/entry-default-signed.hap

# 启动应用
hdc shell aa start -a EntryAbility -b com.huawei.sysinfo
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

- **语言**: ArkTS / C++
- **UI框架**: ArkUI
- **Native API**: HiDebug, Sensor
- **最低版本**: HarmonyOS NEXT API 12
- **构建工具**: Hvigor
- **目标设备**: 手机、平板

---

## 🎨 UI 设计

- **设计风格**: 科技感深色主题
- **配色方案**: 霓虹蓝 (#00D4FF) + 深蓝紫渐变背景
- **特色效果**: 
  - 呼吸灯动画
  - 发光边框
  - 实时趋势图表
  - 按压反馈动效

---

## 📚 更多资源

- [HarmonyOS 官方文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/)
- [DevEco Studio 使用指南](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-instruction-0000001053541141)
- [构建指引](./BUILD_GUIDE.md)
- [测试用例](./TEST_CASE.md)
- [Native 开发最佳实践](./NATIVE_BEST_PRACTICES.md)

---

*应用名称: SysPulse*  
*版本: v1.0.0*  
*最后更新: 2026-03-12*
