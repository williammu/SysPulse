# 纯血鸿蒙硬件配置查看 App - 规格说明书

## 1. 项目概述

### 1.1 项目名称
SysInfo - 鸿蒙系统信息工具

### 1.2 项目目标
开发一款基于纯血鸿蒙 (HarmonyOS NEXT) 系统的原生应用，用于全面、真实地展示设备的硬件配置和系统信息。

### 1.3 目标用户
- 技术爱好者
- 硬件评测人员
- 需要了解设备配置的普通用户
- 开发者调试设备

### 1.4 项目原则
1. **真实性原则** - 所有显示的信息必须来自真实系统 API，禁止硬编码 MOCK 数据
2. **透明性原则** - 无法获取的信息明确标记为"未获取"，并说明原因
3. **教育性原则** - 为每个技术概念提供小白友好的解释说明

---

## 2. 功能需求

### 2.1 已实现功能模块

#### 2.1.1 设备概览 ✅
| 功能项 | 实现状态 | 数据来源 |
|--------|---------|----------|
| 设备型号 | ✅ 已实现 | `@ohos.deviceInfo.marketName` |
| 系统版本 | ✅ 已实现 | `@ohos.deviceInfo.osFullName` |
| API 版本 | ✅ 已实现 | `@ohos.deviceInfo.sdkApiVersion` |
| 设备名称 | 🚫 无法实现 | 无公开 API |
| SN/IMEI | 🚫 无法实现 | 需要系统权限 |
| 运行时间 | 🚫 无法实现 | 无公开 API |

#### 2.1.2 CPU 信息 ✅
| 功能项 | 实现状态 | 数据来源 |
|--------|---------|----------|
| 处理器型号 | ⚠️ 部分实现 | Native API / `deviceInfo.hardwareModel` |
| 核心架构 | ✅ 已实现 | `@ohos.deviceInfo.abiList` |
| 核心数 | ✅ 已实现 | Native API |
| 系统 CPU 使用率 | ✅ 已实现 | Native HiDebug API |
| 线程 CPU 使用率 | ✅ 已实现 | Native HiDebug API |
| 主频信息 | 🚫 无法实现 | 无公开 API |
| 工艺制程 | 🚫 无法实现 | 无公开 API |
| 缓存信息 | 🚫 无法实现 | 无公开 API |

#### 2.1.3 GPU 信息 ✅
| 功能项 | 实现状态 | 数据来源 |
|--------|---------|----------|
| GPU 厂商 | ✅ 已实现 | Native OpenGL ES API |
| GPU 型号 | ✅ 已实现 | Native OpenGL ES API |
| OpenGL ES 版本 | ✅ 已实现 | Native OpenGL ES API |
| GLSL 版本 | ✅ 已实现 | Native OpenGL ES API |
| 纹理限制 | ✅ 已实现 | Native OpenGL ES API |
| 视口限制 | ✅ 已实现 | Native OpenGL ES API |
| 着色器限制 | ✅ 已实现 | Native OpenGL ES API |
| GPU 显存 | ✅ 已实现 | Native HiDebug API |
| GPU 频率 | 🚫 无法实现 | 无公开 API |

#### 2.1.4 内存信息 ✅
| 功能项 | 实现状态 | 数据来源 |
|--------|---------|----------|
| 系统总内存 | ✅ 已实现 | Native HiDebug API |
| 系统可用内存 | ✅ 已实现 | Native HiDebug API |
| 系统已用内存 | ✅ 已实现 | Native HiDebug API |
| 应用 PSS 内存 | ✅ 已实现 | Native HiDebug API |
| 应用 RSS 内存 | ✅ 已实现 | Native HiDebug API |
| 应用 VSS 内存 | ✅ 已实现 | Native HiDebug API |
| 应用内存限制 | ✅ 已实现 | Native HiDebug API |
| VM 堆内存 | ✅ 已实现 | Native HiDebug API |
| 内存类型 | 🚫 无法实现 | 无公开 API |
| 内存带宽 | 🚫 无法实现 | 无公开 API |

#### 2.1.5 存储信息 ✅
| 功能项 | 实现状态 | 数据来源 |
|--------|---------|----------|
| 总存储 | ⚠️ 部分实现 | `@ohos.file.statvfs` (部分设备返回 0) |
| 可用存储 | ⚠️ 部分实现 | `@ohos.file.statvfs` (部分设备返回 0) |
| 已用存储 | ⚠️ 部分实现 | 计算得出 |
| 存储类型 | 🚫 无法实现 | 无公开 API |
| 分区信息 | 🚫 无法实现 | 需要系统权限 |

#### 2.1.6 屏幕信息 ✅
| 功能项 | 实现状态 | 数据来源 |
|--------|---------|----------|
| 分辨率 | ✅ 已实现 | `@ohos.display` |
| 像素密度 | ✅ 已实现 | `@ohos.display.densityDPI` |
| 刷新率 | ✅ 已实现 | `@ohos.display.refreshRate` |
| X/Y 轴 DPI | ✅ 已实现 | `@ohos.display` |
| 屏幕尺寸 | 🚫 无法实现 | 无公开 API |
| 屏幕类型 | 🚫 无法实现 | 无公开 API |
| HDR 支持 | 🚫 无法实现 | 无公开 API |
| 亮度 | 🚫 无法实现 | 无公开 API |

#### 2.1.7 电池信息 ✅
| 功能项 | 实现状态 | 数据来源 |
|--------|---------|----------|
| 当前电量 | ✅ 已实现 | `@ohos.batteryInfo.batterySOC` |
| 充电状态 | ✅ 已实现 | `@ohos.batteryInfo.chargingStatus` |
| 充电器类型 | ✅ 已实现 | `@ohos.batteryInfo.pluggedType` |
| 充电功率 | ✅ 已实现 | 计算得出 (电压 × 电流) |
| 电池温度 | ✅ 已实现 | `@ohos.batteryInfo.batteryTemperature` |
| 电池电压 | ✅ 已实现 | `@ohos.batteryInfo.voltage` |
| 电池技术 | ✅ 已实现 | `@ohos.batteryInfo.technology` |
| 电池健康度 | ⚠️ 部分实现 | `@ohos.batteryInfo.healthStatus` |
| 电池容量 | 🚫 无法实现 | 无公开 API |

#### 2.1.8 网络信息 ✅
| 功能项 | 实现状态 | 数据来源 |
|--------|---------|----------|
| 网络类型 | ✅ 已实现 | `@ohos.net.connection` |
| 连接状态 | ✅ 已实现 | `@ohos.net.connection` |
| IP 地址 | ✅ 已实现 | `@ohos.net.connection` |
| 子网掩码 | ✅ 已实现 | `@ohos.net.connection` |
| 默认网关 | ✅ 已实现 | `@ohos.net.connection` |
| DNS 服务器 | ✅ 已实现 | `@ohos.net.connection` |
| MAC 地址 | ✅ 已实现 | `@ohos.net.connection` |
| MTU | ✅ 已实现 | `@ohos.net.connection` |
| WiFi SSID | ✅ 已实现 | `@ohos.wifiManager` |
| WiFi 信号强度 | ✅ 已实现 | `@ohos.wifiManager` |
| WiFi 频段 | ✅ 已实现 | `@ohos.wifiManager` |
| WiFi 连接速度 | ✅ 已实现 | `@ohos.wifiManager` |
| 上行/下行带宽 | ✅ 已实现 | `@ohos.net.connection` / WiFi |
| 蜂窝网络详情 | 🚫 无法实现 | 需要系统权限 |
| 蓝牙信息 | 🚫 无法实现 | 无公开 API |
| NFC 支持 | 🚫 无法实现 | 无公开 API |

#### 2.1.9 摄像头信息 ✅
| 功能项 | 实现状态 | 数据来源 |
|--------|---------|----------|
| 变焦范围 | ✅ 已实现 | Camera Kit API (需预览) |
| 预览分辨率 | ✅ 已实现 | Camera Kit API |
| 拍照分辨率 | ✅ 已实现 | Camera Kit API |
| 视频分辨率 | ✅ 已实现 | Camera Kit API |
| 后置摄像头详情 | 🚫 无法实现 | 需要 CameraKit 权限 |
| 前置摄像头详情 | 🚫 无法实现 | 需要 CameraKit 权限 |

#### 2.1.10 传感器信息 ✅
| 功能项 | 实现状态 | 数据来源 |
|--------|---------|----------|
| 加速度计 | ✅ 已实现 | `@ohos.sensor` |
| 陀螺仪 | ✅ 已实现 | `@ohos.sensor` |
| 光线传感器 | ✅ 已实现 | `@ohos.sensor` |
| 距离传感器 | ✅ 已实现 | `@ohos.sensor` |
| 磁场传感器 | ✅ 已实现 | `@ohos.sensor` |
| 方向传感器 | ✅ 已实现 | `@ohos.sensor` |
| 气压计 | ⚠️ 部分实现 | 设备依赖 |
| 湿度传感器 | ⚠️ 部分实现 | 设备依赖 |
| 温度传感器 | ⚠️ 部分实现 | 设备依赖 |
| 传感器列表 | ✅ 已实现 | Native Sensor NDK |
| 传感器详细信息 | ✅ 已实现 | Native Sensor NDK |

#### 2.1.11 知识科普 ✅
| 功能项 | 实现状态 | 说明 |
|--------|---------|------|
| 信息按钮 | ✅ 已实现 | 每个技术参数旁显示 ⓘ 按钮 |
| 概念解释 | ✅ 已实现 | 点击按钮查看详细解释 |
| 概念配置 | ✅ 已实现 | ConceptConfig.ets 配置所有概念 |
| 概念详情页 | ✅ 已实现 | ConceptDetailPage.ets |

---

## 3. 技术架构

### 3.1 技术栈
- **开发语言**：ArkTS / C++
- **UI 框架**：ArkUI
- **最低系统版本**：HarmonyOS NEXT API 12+
- **包管理**：OHPM

### 3.2 系统 API 依赖
| 模块 | API | 用途 |
|------|-----|------|
| 设备信息 | `@ohos.deviceInfo` | 设备型号、系统版本 |
| 电池 | `@ohos.batteryInfo` | 电量、充电状态、温度 |
| 屏幕 | `@ohos.display` | 分辨率、DPI、刷新率 |
| 网络 | `@ohos.net.connection` | 网络类型、IP 配置 |
| WiFi | `@ohos.wifiManager` | WiFi SSID、信号强度 |
| 传感器 | `@ohos.sensor` | 加速度、陀螺仪等 |
| 存储 | `@ohos.file.statvfs` | 存储容量 |
| 相机 | `@ohos.multimedia.camera` | 相机信息 |

### 3.3 Native API 依赖
| 模块 | API | 用途 |
|------|-----|------|
| HiDebug | `libohhidebug.so` | CPU、内存、GPU 信息 |
| Sensor NDK | `libohsensor.so` | 传感器列表和实时数据 |
| OpenGL ES | `libGLESv2.so` | GPU 详细信息 |

### 3.4 项目结构
```
huawei_sysinfo/
├── entry/
│   └── src/main/
│       ├── ets/
│       │   ├── pages/              # 14 个功能页面
│       │   │   ├── Index.ets       # 首页
│       │   │   ├── CpuPage.ets     # CPU 信息
│       │   │   ├── MemoryPage.ets  # 内存信息
│       │   │   ├── StoragePage.ets # 存储信息
│       │   │   ├── DisplayPage.ets # 屏幕信息
│       │   │   ├── BatteryPage.ets # 电池信息
│       │   │   ├── NetworkPage.ets # 网络信息
│       │   │   ├── GpuPage.ets     # GPU 信息
│       │   │   ├── SensorPage.ets  # 传感器信息
│       │   │   ├── CameraPage.ets  # 相机信息
│       │   │   ├── OSPage.ets      # 操作系统信息
│       │   │   ├── ConceptDetailPage.ets # 概念详情
│       │   │   └── ...
│       │   ├── components/         # 可复用组件
│       │   │   ├── InfoCard.ets    # 信息卡片
│       │   │   ├── InfoButton.ets  # 信息按钮
│       │   │   ├── SectionHeader.ets
│       │   │   └── NavigationBar.ets
│       │   ├── utils/              # 工具类
│       │   │   ├── DeviceUtil.ets
│       │   │   ├── SensorUtil.ets
│       │   │   ├── NativeApi.ets
│       │   │   └── FormatUtil.ets
│       │   └── config/
│       │       └── ConceptConfig.ets
│       ├── cpp/                    # Native C++ 模块
│       │   ├── hidebug_module.cpp  # HiDebug API 封装
│       │   ├── sensor_module.cpp   # Sensor NDK 封装
│       │   └── camera_module.cpp   # 相机 Native 封装
│       └── resources/
├── build_and_run.sh
├── build.md
├── issues.md
├── FUNCTION_CHECKLIST.md
└── README.md
```

---

## 4. UI 设计规范

### 4.1 设计风格
- 科技感深色主题
- 霓虹蓝 (#00D4FF) + 深蓝紫渐变背景
- 卡片式布局
- 流畅的动画效果

### 4.2 特色组件
- **InfoCard** - 信息展示卡片
- **InfoCardWithDesc** - 带信息按钮的卡片
- **InfoButton** - 概念解释按钮 (ⓘ)
- **TechCard** - 科技感动态卡片（呼吸灯效果）
- **SimpleChart** - 实时趋势图表

### 4.3 颜色规范
- 主色调：#007DFF (霓虹蓝)
- 成功色：#00B578
- 警告色：#FF7D00
- 错误色：#F53F3F
- 背景色：深色渐变

---

## 5. 权限需求

### 5.1 已申请权限
```json
{
  "requestPermissions": [
    { "name": "ohos.permission.GET_WIFI_INFO" },
    { "name": "ohos.permission.GET_NETWORK_INFO" },
    { "name": "ohos.permission.INTERNET" },
    { "name": "ohos.permission.CAMERA" },
    { "name": "ohos.permission.ACCELEROMETER" },
    { "name": "ohos.permission.GYROSCOPE" },
    { "name": "ohos.permission.READ_MEDIA" }
  ]
}
```

### 5.2 无法申请的权限（系统权限）
- `ohos.permission.DUMP` - 系统调试信息
- 设备序列号/IMEI 读取权限
- 详细网络信息权限

---

## 6. 非功能性需求

### 6.1 性能要求
- 冷启动时间 < 2s
- 页面切换动画流畅 (60fps)
- 实时监控刷新率 200ms
- 内存占用 < 100MB

### 6.2 兼容性要求
- 支持 HarmonyOS NEXT API 12 及以上版本
- 适配手机、平板设备
- 适配不同屏幕尺寸和分辨率

### 6.3 可维护性
- 代码注释完整
- 模块化设计
- 遵循 HarmonyOS 开发规范

---

## 7. 实现统计

### 7.1 功能实现汇总

| 功能模块 | 已实现 | 部分实现 | 无法实现 | 总计 | 实现率 |
|---------|-------|---------|---------|------|-------|
| 设备概览 | 3 | 0 | 3 | 6 | 50% |
| CPU 信息 | 5 | 0 | 3 | 8 | 62.5% |
| GPU 信息 | 8 | 0 | 1 | 9 | 88.9% |
| 内存信息 | 8 | 0 | 2 | 10 | 80% |
| 存储信息 | 1 | 2 | 2 | 5 | 20% |
| 屏幕信息 | 4 | 0 | 4 | 8 | 50% |
| 电池信息 | 8 | 1 | 1 | 10 | 80% |
| 网络信息 | 12 | 0 | 3 | 15 | 80% |
| 摄像头信息 | 4 | 0 | 2 | 6 | 66.7% |
| 传感器信息 | 9 | 3 | 0 | 12 | 75% |
| 知识科普 | 4 | 0 | 0 | 4 | 100% |
| **总计** | **66** | **6** | **21** | **93** | **71%** |

### 7.2 Native API 实现状态

| API 模块 | 功能 | 状态 |
|---------|------|------|
| HiDebug | 系统 CPU 使用率 | ✅ 已实现 |
| HiDebug | 系统内存信息 | ✅ 已实现 |
| HiDebug | 应用内存详情 (PSS/RSS/VSS) | ✅ 已实现 |
| HiDebug | 应用内存限制 | ✅ 已实现 |
| HiDebug | GPU 显存 | ✅ 已实现 |
| HiDebug | VM 堆内存 | ✅ 已实现 |
| HiDebug | 线程 CPU 使用率 | ✅ 已实现 |
| Sensor NDK | 传感器列表 | ✅ 已实现 |
| Sensor NDK | 传感器实时数据 | ✅ 已实现 |
| OpenGL ES | GPU 详细信息 | ✅ 已实现 |

---

## 8. 已知限制

### 8.1 API 限制（无法获取）
- 设备序列号 / IMEI
- 详细 CPU 信息（型号、频率、缓存）
- 详细 GPU 信息（频率、带宽）
- WiFi / 蓝牙版本
- NFC 支持状态
- 电池设计容量
- 屏幕尺寸、类型、HDR 支持

### 8.2 设备差异
- 部分设备存储 API 返回 0
- 部分传感器（气压计、湿度计）并非所有设备都有

---

## 9. 后续扩展方向

### 9.1 短期计划
- [ ] 优化存储信息获取（寻找替代方案）
- [ ] 添加更多概念解释
- [ ] 优化 UI 动画效果

### 9.2 长期计划
- [ ] 性能跑分功能
- [ ] 设备对比功能
- [ ] 导出硬件报告
- [ ] 支持更多传感器类型

---

## 10. 版本历史

### v1.2.0 (2026-03-20)
- ✅ 为所有详情页添加信息按钮
- ✅ 实现概念解释功能
- ✅ 添加 ConceptConfig 配置
- ✅ 实现 ConceptDetailPage
- ✅ 优化相机变焦范围获取

### v1.1.0 (2026-03-18)
- ✅ 集成 Native HiDebug API
- ✅ 实现 CPU 使用率监控
- ✅ 实现内存信息获取
- ✅ 实现 GPU 信息获取
- ✅ 添加传感器实时数据
- ✅ 修复所有硬编码数据问题

### v1.0.0 (2026-03-12)
- ✅ 基础设备信息展示
- ✅ 电池信息监控
- ✅ 屏幕信息显示
- ✅ 网络状态显示
- ✅ 存储信息获取

---

*文档版本：v2.0*  
*最后更新：2026-03-20*  
*更新内容：更新为实际已实现功能，添加实现统计和版本历史*
