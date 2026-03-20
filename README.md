# SysInfo - 纯血鸿蒙系统信息工具

基于 HarmonyOS NEXT 开发的原生系统信息查看应用，提供真实、准确的设备硬件和系统信息。

---

## 📋 目录

1. [功能特性](#功能特性)
2. [项目结构](#项目结构)
3. [快速开始](#快速开始)
4. [构建指引](#构建指引)
5. [技术栈](#技术栈)
6. [最近更新](#最近更新)

---

## ✨ 功能特性

### 实时监控
- **CPU 使用率** - 系统整体 CPU 使用率实时监控（200ms刷新）
- **内存监控** - 系统内存使用情况和应用内存占用
- **电池监控** - 电量、充电状态、温度、电压实时监控

### 硬件信息
- **处理器** - CPU 架构、核心数、型号（通过 Native API 获取）
- **内存** - 总内存、可用内存、已用内存
- **存储** - 总容量、已用空间、可用空间
- **屏幕** - 分辨率、像素密度(DPI)、刷新率
- **GPU** - 厂商、型号、OpenGL ES 版本、详细硬件限制参数

### 网络与连接
- **网络状态** - 网络类型、连接状态
- **IP 配置** - IP 地址、子网掩码、默认网关
- **DNS 服务器** - 主/备 DNS 地址
- **网卡信息** - MAC 地址、MTU
- **WiFi 信息** - SSID、信号强度、频段、连接速度（WiFi 网络）
- **带宽信息** - 上行/下行带宽

### 传感器
- **加速度传感器** - X/Y/Z 三轴加速度实时数据
- **陀螺仪** - 三轴角速度实时数据
- **光线传感器** - 环境光强度（lux）
- **距离传感器** - 接近检测距离
- **磁场传感器** - 三轴磁场强度
- **方向传感器** - 方位角、俯仰角、翻滚角

### 相机信息
- **变焦范围** - 支持的最小/最大变焦倍数（通过相机预览获取）
- **预览分辨率** - 相机支持的最大预览分辨率
- **拍照分辨率** - 相机支持的最大拍照分辨率
- **视频分辨率** - 相机支持的最大视频录制分辨率

### 操作系统
- **系统版本** - HarmonyOS 版本号、SDK API 版本
- **构建信息** - 软件版本、构建时间
- **安全信息** - 安全补丁级别

### 知识科普
- **信息按钮** - 每个技术参数旁都有 ⓘ 按钮，点击可查看详细的概念解释
- **小白友好** - 用通俗易懂的语言解释专业术语（如 IP 地址、子网掩码、MTU 等）

---

## 📁 项目结构

```
huawei_sysinfo/
├── AppScope/              # 应用全局配置
├── entry/                 # 主模块
│   └── src/main/
│       ├── ets/
│       │   ├── pages/     # 页面文件 (14个功能页面)
│       │   │   ├── Index.ets           # 首页
│       │   │   ├── CpuPage.ets         # CPU 信息
│       │   │   ├── MemoryPage.ets      # 内存信息
│       │   │   ├── StoragePage.ets     # 存储信息
│       │   │   ├── DisplayPage.ets     # 屏幕信息
│       │   │   ├── BatteryPage.ets     # 电池信息
│       │   │   ├── NetworkPage.ets     # 网络信息
│       │   │   ├── GpuPage.ets         # GPU 信息
│       │   │   ├── SensorPage.ets      # 传感器信息
│       │   │   ├── CameraPage.ets      # 相机信息
│       │   │   ├── OSPage.ets          # 操作系统信息
│       │   │   └── ConceptDetailPage.ets # 概念详情页
│       │   ├── components/ # 可复用组件
│       │   │   ├── InfoCard.ets        # 信息卡片
│       │   │   ├── InfoButton.ets      # 信息按钮和带说明的卡片
│       │   │   ├── SectionHeader.ets   # 章节标题
│       │   │   └── NavigationBar.ets   # 导航栏
│       │   ├── utils/     # 工具类
│       │   │   ├── DeviceUtil.ets      # 设备信息工具
│       │   │   ├── SensorUtil.ets      # 传感器工具
│       │   │   ├── NativeApi.ets       # Native API 封装
│       │   │   └── FormatUtil.ets      # 格式化工具
│       │   └── config/    # 配置文件
│       │       └── ConceptConfig.ets   # 概念解释配置
│       ├── cpp/           # Native C++ 模块
│       │   ├── hidebug_module.cpp      # HiDebug API 封装
│       │   ├── sensor_module.cpp       # 传感器 NDK 封装
│       │   └── camera_module.cpp       # 相机 Native 封装
│       └── resources/     # 资源文件
├── build_and_run.sh       # 一键构建安装脚本
├── build.md               # 详细构建指南
├── issues.md              # 问题记录与修复
├── FUNCTION_CHECKLIST.md  # 功能实现检查清单
└── README.md              # 本文件
```

---

## 🚀 快速开始

### 前置要求
- **DevEco Studio** 5.0.0 或更高版本
- **HarmonyOS NEXT SDK** API 12 或更高版本
- **HarmonyOS NEXT 真机** 或 **模拟器**

### 方式一：使用一键脚本（推荐）

```bash
# 构建并安装到默认设备
bash build_and_run.sh
```

脚本会自动：
1. 检查环境（DevEco Studio、HDC、hvigorw）
2. 检查连接的设备
3. 清理构建缓存
4. 构建项目
5. 安装 HAP 到设备
6. 启动应用

### 方式二：使用 DevEco Studio

```bash
# 用 DevEco Studio 打开项目
open -a /Applications/DevEco-Studio.app /Users/bytedance/dev/huawei_sysinfo
```

然后：
1. 等待项目同步完成
2. 选择设备
3. 点击运行按钮 ▶️

### 方式三：命令行构建

```bash
# 构建应用
/Applications/DevEco-Studio.app/Contents/tools/hvigor/bin/hvigorw assembleHap --no-daemon

# 安装到设备
hdc install entry/build/default/outputs/default/entry-default-signed.hap

# 启动应用
hdc shell aa start -b com.huawei.sysinfo -a EntryAbility
```

---

## 📖 构建指引

详细的构建说明请查看 **[build.md](./build.md)**，包含：

- 环境检查和配置
- 设备连接和选择
- 签名配置（真机需要）
- 常见问题解答
- 故障排除方法

---

## 🛠️ 技术栈

- **语言**: ArkTS / C++
- **UI框架**: ArkUI
- **Native API**: 
  - HiDebug API（CPU、内存、GPU 信息）
  - Sensor NDK（传感器数据）
  - Camera Kit（相机信息）
- **系统 API**: 
  - `@ohos.deviceInfo`（设备信息）
  - `@ohos.batteryInfo`（电池信息）
  - `@ohos.display`（屏幕信息）
  - `@ohos.net.connection`（网络信息）
  - `@ohos.wifiManager`（WiFi 信息）
  - `@ohos.sensor`（传感器）
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
  - 信息按钮（ⓘ）概念解释

---

## 📝 最近更新

### v1.2.0 (2026-03-20)
- ✅ 为所有详情页添加信息按钮（ⓘ）
- ✅ 添加概念解释配置（ConceptConfig.ets）
- ✅ 实现概念详情页（ConceptDetailPage.ets）
- ✅ 网络页面支持 WiFi SSID 显示
- ✅ 电池页面支持充电类型识别（普通/快充/超级快充）
- ✅ 相机页面支持变焦范围获取

### v1.1.0 (2026-03-18)
- ✅ 集成 Native HiDebug API
- ✅ 实现 CPU 使用率实时监控
- ✅ 实现内存信息获取
- ✅ 实现 GPU 信息获取
- ✅ 添加传感器数据实时显示
- ✅ 修复所有硬编码数据问题

### v1.0.0 (2026-03-12)
- ✅ 基础设备信息展示
- ✅ 电池信息监控
- ✅ 屏幕信息显示
- ✅ 网络状态显示
- ✅ 存储信息获取

---

## 📚 更多资源

- [构建指南](./build.md) - 详细构建和部署说明
- [问题记录](./issues.md) - 开发过程中的问题与修复
- [功能检查清单](./FUNCTION_CHECKLIST.md) - 功能实现状态
- [HarmonyOS 官方文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/)

---

## ⚠️ 已知限制

由于 HarmonyOS NEXT 的 API 限制，以下信息暂时无法获取：

- **设备序列号/IMEI** - 需要系统权限
- **详细 CPU 信息** - 型号、核心频率、缓存等
- **详细 GPU 信息** - GPU 频率、显存带宽等
- **详细网络信息** - WiFi 版本、蓝牙版本、NFC 支持等
- **详细摄像头信息** - 需要 CameraKit 权限

---

## 📄 项目原则

1. **真实性原则** - 所有显示的信息必须来自真实系统 API，禁止硬编码 MOCK 数据
2. **透明性原则** - 无法获取的信息明确标记为"未获取"，并说明原因
3. **教育性原则** - 为每个技术概念提供小白友好的解释说明

---

*应用名称: SysInfo*  
*版本: v1.2.0*  
*最后更新: 2026-03-20*
