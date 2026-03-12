# 纯血鸿蒙硬件配置查看 App - 规格说明书

## 1. 项目概述

### 1.1 项目名称
SysInfo - 鸿蒙硬件配置查看器

### 1.2 项目目标
开发一款基于纯血鸿蒙 (HarmonyOS NEXT) 系统的原生应用，用于全面、清晰地展示设备的所有硬件配置信息。

### 1.3 目标用户
- 技术爱好者
- 硬件评测人员
- 需要了解设备配置的普通用户
- 开发者调试设备

---

## 2. 功能需求

### 2.1 核心功能模块

#### 2.1.1 设备概览
- **设备型号**：显示完整设备型号名称
- **系统版本**：HarmonyOS 版本号、API 版本
- **设备名称**：用户自定义设备名称
- **SN/IMEI**：设备序列号 (需权限)
- **运行时间**：设备累计运行时长

#### 2.1.2 CPU 信息
- **处理器型号**：完整的 SoC 型号名称
- **核心架构**：CPU 架构 (ARM64 等)
- **核心数**：总核心数、大核/小核配置
- **主频信息**：各核心的最大/当前频率
- **工艺制程**：芯片制造工艺 (如 7nm)
- **缓存信息**：L1/L2/L3 缓存大小

#### 2.1.3 GPU 信息
- **GPU 型号**：图形处理器型号
- **GPU 厂商**：芯片厂商 (如 Mali、Adreno)
- **GPU 频率**：运行频率
- **API 支持**：Vulkan、OpenGL ES 版本

#### 2.1.4 内存信息
- **总 RAM**：设备总运行内存
- **可用 RAM**：当前可用内存
- **已用 RAM**：已占用内存
- **内存类型**：LPDDR 版本
- **内存带宽**：理论带宽

#### 2.1.5 存储信息
- **总存储**：内置存储总容量
- **可用存储**：当前可用空间
- **存储类型**：UFS/EMMC 版本
- **分区信息**：系统分区、数据分区详情

#### 2.1.6 屏幕信息
- **分辨率**：屏幕像素分辨率
- **屏幕尺寸**：对角线尺寸
- **像素密度**：PPI 值
- **刷新率**：屏幕刷新率 (60/90/120/144Hz)
- **触控采样率**：触摸采样率
- **屏幕类型**：OLED/LCD/AMOLED
- **HDR 支持**：HDR10/Dolby Vision 等
- **亮度**：典型/峰值亮度

#### 2.1.7 电池信息
- **电池容量**：设计容量
- **当前电量**：实时百分比
- **充电状态**：充电中/未充电
- **充电功率**：当前充电功率
- **电池健康度**：电池健康状态
- **温度**：电池温度

#### 2.1.8 网络信息
- **蜂窝网络**：基带型号、网络制式 (5G/4G/3G)
- **Wi-Fi**：Wi-Fi 标准 (Wi-Fi 6/7)、MAC 地址
- **蓝牙**：蓝牙版本、MAC 地址
- **NFC**：是否支持 NFC

#### 2.1.9 摄像头信息
- **后置摄像头**：主摄像素、超广角、长焦等配置
- **前置摄像头**：像素、光圈
- **视频录制**：最高支持的分辨率和帧率

#### 2.1.10 传感器信息
- **加速度计**：支持状态
- **陀螺仪**：支持状态
- **磁力计**：支持状态
- **光线传感器**：支持状态
- **距离传感器**：支持状态
- **气压计**：支持状态
- **指纹传感器**：支持状态
- **面部识别**：支持状态

#### 2.1.11 接口信息
- **USB 接口**：USB 版本、Type-C/Type-A
- **耳机接口**：3.5mm 接口支持
- **扩展存储**：MicroSD 支持

---

## 3. 技术架构

### 3.1 技术栈
- **开发语言**：ArkTS
- **UI 框架**：ArkUI
- **最低系统版本**：HarmonyOS NEXT (API 12+)
- **包管理**：OHPM

### 3.2 系统 API 依赖
- `@ohos.deviceInfo` - 设备基础信息
- `@ohos.batteryInfo` - 电池信息
- `@ohos.network` - 网络信息
- `@ohos.display` - 屏幕信息
- `@ohos.thermal` - 温度信息
- `@ohos.multimedia.camera` - 摄像头信息

### 3.3 项目结构
```
huawei_sysinfo/
├── entry/
│   ├── src/main/ets/
│   │   ├── pages/
│   │   │   ├── Index.ets           # 首页/概览
│   │   │   ├── CpuPage.ets         # CPU 详情页
│   │   │   ├── MemoryPage.ets      # 内存详情页
│   │   │   ├── StoragePage.ets     # 存储详情页
│   │   │   ├── DisplayPage.ets     # 屏幕详情页
│   │   │   ├── BatteryPage.ets     # 电池详情页
│   │   │   ├── NetworkPage.ets     # 网络详情页
│   │   │   ├── CameraPage.ets      # 摄像头详情页
│   │   │   ├── SensorPage.ets      # 传感器详情页
│   │   │   └── AboutPage.ets       # 关于页
│   │   ├── components/
│   │   │   ├── InfoCard.ets         # 信息卡片组件
│   │   │   ├── ProgressBar.ets      # 进度条组件
│   │   │   └── SectionHeader.ets    # 分区标题组件
│   │   ├── utils/
│   │   │   ├── DeviceUtil.ets       # 设备信息工具类
│   │   │   └── FormatUtil.ets       # 格式化工具
│   │   └── model/
│   │       └── DeviceInfo.ets       # 数据模型
└── AppScope/
    └── app.json5
```

---

## 4. UI 设计规范

### 4.1 设计风格
- 遵循 HarmonyOS Design 设计规范
- 简洁、现代的卡片式布局
- 深色/浅色主题自动切换
- 流畅的动画效果

### 4.2 页面布局
#### 首页 (Index.ets)
- 顶部：设备型号 + 设备图片
- 中部：快捷信息卡片网格 (CPU、内存、存储、电池)
- 底部：功能菜单列表 (进入各详情页)

#### 详情页
- 顶部：返回按钮 + 页面标题
- 中部：信息卡片列表
- 每个卡片包含：图标 + 标题 + 详细信息

### 4.3 颜色规范
- 主色调：#007DFF (HarmonyOS 蓝)
- 成功色：#00B578
- 警告色：#FF7D00
- 错误色：#F53F3F
- 中性色：#182431、#4E5969、#86909C

---

## 5. 权限需求

| 权限名称 | 权限类型 | 用途 |
|---------|---------|------|
| ohos.permission.GET_NETWORK_INFO | normal | 获取网络信息 |
| ohos.permission.ACCESS_BLUETOOTH | normal | 获取蓝牙信息 |
| ohos.permission.GET_BUNDLE_INFO | normal | 获取应用信息 |
| ohos.permission.READ_MEDIA | normal | 读取存储信息 |

---

## 6. 非功能性需求

### 6.1 性能要求
- 冷启动时间 < 1.5s
- 页面切换动画流畅 (60fps)
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

## 7. 开发里程碑

| 阶段 | 任务 | 交付物 |
|-----|------|-------|
| 阶段一 | 项目初始化 + 首页框架 | 可运行的基础项目 |
| 阶段二 | 设备概览、CPU、内存模块 | 核心信息展示 |
| 阶段三 | 屏幕、电池、网络模块 | 主要功能完成 |
| 阶段四 | 摄像头、传感器、接口模块 | 全部功能完成 |
| 阶段五 | UI 优化 + 测试 + 打包 | 发布版本 |

---

## 8. Native API 扩展规划

### 8.1 概述
通过 HarmonyOS NEXT NDK (Native Development Kit)，可以使用 C/C++ 访问 TypeScript/ArkTS 无法直接获取的系统级信息。

### 8.2 HiDebug 模块（高优先级）

#### 8.2.1 系统级 CPU 信息
**TypeScript 限制**: 只能获取进程级 CPU 使用率  
**Native API 补充**:

| API | 功能 | 返回值 |
|-----|------|--------|
| `OH_HiDebug_GetSystemCpuUsage()` | 获取系统整体 CPU 使用率 | double (0.0-1.0) |
| `OH_HiDebug_GetAppCpuUsage()` | 获取应用进程 CPU 使用率 | double (0.0-1.0) |
| `OH_HiDebug_GetAppThreadCpuUsage()` | 获取应用各线程 CPU 使用情况 | ThreadCpuUsage[] |

**可补充功能**:
- ✅ 系统整体 CPU 使用率
- ✅ 应用各线程的 CPU 使用率详情
- ✅ 线程级别的性能分析数据

#### 8.2.2 系统级内存信息
**TypeScript 限制**: 无法获取系统内存信息  
**Native API 补充**:

| API | 功能 | 返回值 |
|-----|------|--------|
| `OH_HiDebug_GetSystemMemInfo()` | 获取系统内存信息 | SystemMemInfo |
| `OH_HiDebug_GetAppNativeMemInfo()` | 获取应用 Native 内存信息 | NativeMemInfo |
| `OH_HiDebug_GetAppMemoryLimit()` | 获取应用内存限制 | MemoryLimit |
| `OH_HiDebug_GetGraphicsMemory()` | 获取应用显存大小 | uint64_t |

**数据结构**:
```c
// 系统内存信息
typedef struct {
    uint64_t totalMem;      // 系统总内存 (KB)
    uint64_t freeMem;       // 系统空闲内存 (KB)
    uint64_t availableMem;  // 系统可用内存 (KB)
} SystemMemInfo;

// 应用 Native 内存信息
typedef struct {
    uint64_t pss;           // 实际物理内存 (KB)
    uint64_t vss;           // 虚拟内存 (KB)
    uint64_t rss;           // 物理内存含共享库 (KB)
    uint64_t sharedDirty;   // 共享脏内存 (KB)
    uint64_t privateDirty;  // 私有脏内存 (KB)
    uint64_t sharedClean;   // 共享干净内存 (KB)
    uint64_t privateClean;  // 私有干净内存 (KB)
} NativeMemInfo;

// 应用内存限制
typedef struct {
    uint64_t rssLimit;        // RSS 限制 (KB)
    uint64_t vssLimit;        // VSS 限制 (KB)
    uint64_t vmHeapLimit;     // JS VM 堆限制 (KB)
    uint64_t vmTotalHeapSize; // JS 堆总限制 (KB)
} MemoryLimit;
```

**可补充功能**:
- ✅ 系统总内存、空闲内存、可用内存
- ✅ 应用进程的详细内存分布（PSS/VSS/RSS）
- ✅ 应用内存限制（防止 OOM）
- ✅ GPU 显存使用情况

#### 8.2.3 虚拟机内存信息
**TypeScript 限制**: 无法获取 ArkTS 虚拟机内部内存信息  
**Native API 补充**:

| API | 功能 | 返回值 |
|-----|------|--------|
| `OH_HiDebug_GetAppVMMemoryInfo()` | 获取 VM 内存信息 | VMMemoryInfo |
| `OH_HiDebug_GetVMRuntimeStats()` | 获取 GC 统计信息 | GcStats |
| `OH_HiDebug_GetVMRuntimeStat()` | 获取指定 GC 统计项 | number |

**数据结构**:
```c
typedef struct {
    uint64_t totalHeap;    // VM 堆总大小 (KB)
    uint64_t heapUsed;     // VM 堆已使用 (KB)
    uint64_t allArraySize; // 所有数组对象大小 (KB)
} VMMemoryInfo;
```

**可补充功能**:
- ✅ ArkTS 虚拟机堆内存使用情况
- ✅ GC 次数、GC 耗时
- ✅ 内存分配和回收统计

#### 8.2.4 Trace 和调试信息
**TypeScript 限制**: 无法获取系统 Trace 信息  
**Native API 补充**:

| API | 功能 | 说明 |
|-----|------|------|
| `OH_HiDebug_StartAppTraceCapture()` | 启动应用 Trace 采集 | 自动化性能分析 |
| `OH_HiDebug_StopAppTraceCapture()` | 停止 Trace 采集 | - |
| `OH_HiDebug_CreateBacktraceObject()` | 创建栈回溯对象 | API 20+ |
| `OH_HiDebug_BacktraceFromFp()` | 栈回溯（异步信号安全） | API 20+ |
| `OH_HiDebug_SymbolicAddress()` | 解析符号信息 | API 20+ |

**可补充功能**:
- ✅ 应用性能 Trace 数据
- ✅ 调用栈回溯信息
- ✅ Native 层符号解析

### 8.3 Sensor 模块（中优先级）

#### 8.3.1 传感器列表和信息
**TypeScript 限制**: 无法获取传感器列表和详细信息  
**Native API 补充**:

| API | 功能 | 说明 |
|-----|------|------|
| `OH_Sensor_GetInfos()` | 获取设备上所有传感器信息 | Sensor_Info[] |
| `OH_SensorInfo_GetName()` | 获取传感器名称 | - |
| `OH_SensorInfo_GetVendorName()` | 获取传感器厂商 | - |
| `OH_SensorInfo_GetType()` | 获取传感器类型 | - |
| `OH_SensorInfo_GetResolution()` | 获取传感器分辨率 | - |
| `OH_SensorInfo_GetMinSamplingInterval()` | 获取最小采样间隔 | - |
| `OH_SensorInfo_GetMaxSamplingInterval()` | 获取最大采样间隔 | - |

**支持的传感器类型**:
- SENSOR_TYPE_ACCELEROMETER (加速度计)
- SENSOR_TYPE_GYROSCOPE (陀螺仪)
- SENSOR_TYPE_AMBIENT_LIGHT (环境光)
- SENSOR_TYPE_MAGNETIC_FIELD (地磁)
- SENSOR_TYPE_BAROMETER (气压计)
- SENSOR_TYPE_HALL (霍尔传感器)
- SENSOR_TYPE_PROXIMITY (接近传感器)
- SENSOR_TYPE_ORIENTATION (方向传感器)
- SENSOR_TYPE_GRAVITY (重力传感器)
- SENSOR_TYPE_ROTATION_VECTOR (旋转矢量)
- SENSOR_TYPE_PEDOMETER_DETECTION (计步检测)
- SENSOR_TYPE_PEDOMETER (计步器)
- SENSOR_TYPE_HEART_RATE (心率传感器)

**可补充功能**:
- ✅ 设备上所有传感器的列表
- ✅ 传感器厂商、型号、分辨率等详细信息
- ✅ 传感器数据实时采集

#### 8.3.2 传感器实时数据
**TypeScript 限制**: 无法直接订阅传感器数据  
**Native API 补充**:

| API | 功能 | 说明 |
|-----|------|------|
| `OH_Sensor_Subscribe()` | 订阅传感器数据 | 实时数据流 |
| `OH_Sensor_Unsubscribe()` | 取消订阅 | - |
| `OH_SensorEvent_GetData()` | 获取传感器数据 | float[] |

**数据格式示例**:
- 加速度计: data[0]=x轴, data[1]=y轴, data[2]=z轴 (m/s²)
- 陀螺仪: data[0]=x轴, data[1]=y轴, data[2]=z轴 (rad/s)
- 环境光: data[0]=光照强度 (lux), data[1]=色温 (kelvin), data[2]=红外亮度

**可补充功能**:
- ✅ 实时传感器数据流
- ✅ 设备运动状态检测
- ✅ 环境参数监测

### 8.4 其他 Native API（低优先级）

#### 8.4.1 文件系统和存储
**TypeScript 限制**: statvfs 在部分设备上返回 0  
**Native API 补充**:

| API | 功能 | 说明 |
|-----|------|------|
| `statfs()` | 获取文件系统统计信息 | POSIX 标准 |
| `getmntent()` | 获取挂载点信息 | 需要 root |

#### 8.4.2 进程和线程信息
**TypeScript 限制**: 无法获取系统进程信息  
**Native API 补充**:

| API | 功能 | 说明 |
|-----|------|------|
| `/proc/[pid]/stat` | 读取进程状态 | Linux 标准 |
| `/proc/[pid]/status` | 读取进程详细信息 | Linux 标准 |
| `/proc/[pid]/task/` | 读取线程信息 | Linux 标准 |

#### 8.4.3 网络信息
**TypeScript 限制**: 只能获取基础网络类型  
**Native API 补充**:

| API | 功能 | 说明 |
|-----|------|------|
| `getifaddrs()` | 获取网络接口地址 | POSIX 标准 |
| `ioctl(SIOCGIFHWADDR)` | 获取 MAC 地址 | 需要权限 |
| `/proc/net/dev` | 读取网络流量统计 | Linux 标准 |

### 8.5 Native API 权限要求

#### 8.5.1 普通权限（应用可申请）
```json
{
  "requestPermissions": [
    { "name": "ohos.permission.ACCELEROMETER" },
    { "name": "ohos.permission.GYROSCOPE" },
    { "name": "ohos.permission.ACTIVITY_MOTION" }
  ]
}
```

#### 8.5.2 系统权限（仅系统应用可申请）
```json
{
  "requestPermissions": [
    { "name": "ohos.permission.DUMP" },
    { "name": "ohos.permission.READ_HEALTH_DATA" }
  ]
}
```

### 8.6 Native API 实现建议

#### 阶段一：HiDebug 模块（高价值、低难度）
建议优先实现 HiDebug 相关功能：
1. ✅ 不需要额外权限
2. ✅ API 简单易用
3. ✅ 信息价值高（内存、CPU、GC）
4. ✅ 官方文档完善

**实现步骤**:
1. 创建 Native C++ 模块
2. 链接 `libohhidebug.so`
3. 封装 HiDebug API 为 ArkTS 接口
4. 在应用中调用

#### 阶段二：Sensor 模块（高价值、中等难度）
建议第二阶段实现 Sensor 功能：
1. ✅ 信息价值高（设备传感器列表）
2. ⚠️ 需要申请权限
3. ⚠️ 需要处理异步数据流
4. ⚠️ 需要管理订阅生命周期

**实现步骤**:
1. 申请传感器权限
2. 创建 Native C++ 模块
3. 链接 `libohsensor.so`
4. 封装 Sensor API
5. 实现数据回调机制

#### 阶段三：其他模块（可选）
根据需求决定是否实现：
- 网络流量统计
- 进程详细信息
- 其他系统级信息

### 8.7 可补充的信息总结

#### 高价值信息（建议优先实现）

| 信息类型 | 当前状态 | Native API 补充 | 实现难度 |
|---------|---------|----------------|---------|
| **系统总内存** | ❌ 无法获取 | ✅ HiDebug SystemMemInfo | ⭐ 简单 |
| **系统 CPU 使用率** | ❌ 无法获取 | ✅ HiDebug SystemCpuUsage | ⭐ 简单 |
| **应用详细内存** | ❌ 无法获取 | ✅ HiDebug NativeMemInfo | ⭐ 简单 |
| **传感器列表** | ❌ 无法获取 | ✅ Sensor GetInfos | ⭐⭐ 中等 |
| **传感器实时数据** | ❌ 无法获取 | ✅ Sensor Subscribe | ⭐⭐ 中等 |
| **虚拟机内存** | ❌ 无法获取 | ✅ HiDebug VMMemoryInfo | ⭐ 简单 |
| **GC 统计信息** | ❌ 无法获取 | ✅ HiDebug GcStats | ⭐ 简单 |
| **应用内存限制** | ❌ 无法获取 | ✅ HiDebug MemoryLimit | ⭐ 简单 |
| **GPU 显存** | ❌ 无法获取 | ✅ HiDebug GraphicsMemory | ⭐ 简单 |

#### 中等价值信息（可选实现）

| 信息类型 | 当前状态 | Native API 补充 | 实现难度 |
|---------|---------|----------------|---------|
| **线程 CPU 使用** | ❌ 无法获取 | ✅ HiDebug ThreadCpuUsage | ⭐⭐ 中等 |
| **网络流量统计** | ❌ 无法获取 | ⚠️ /proc/net/dev | ⭐⭐⭐ 复杂 |
| **进程详细信息** | ❌ 无法获取 | ⚠️ /proc/[pid]/ | ⭐⭐⭐ 复杂 |

#### 低价值/高难度信息（暂不建议）

| 信息类型 | 当前状态 | Native API 补充 | 实现难度 |
|---------|---------|----------------|---------|
| **MAC 地址** | ❌ 无法获取 | ⚠️ 需要系统权限 | ⭐⭐⭐⭐ 困难 |
| **摄像头详细信息** | ❌ 无法获取 | ⚠️ 需要 CameraKit | ⭐⭐⭐⭐ 困难 |
| **系统级 Trace** | ❌ 无法获取 | ⚠️ 需要系统权限 | ⭐⭐⭐⭐ 困难 |

### 8.8 参考文档

- [HiDebug NDK API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/js-apis-hidebug-V5)
- [Sensor NDK API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/_sensor-V5)
- [HarmonyOS NDK 开发指南](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/ndk-guidelines-V5)

---

## 9. 后续扩展方向

1. **性能监控**：实时 CPU、内存使用率曲线
2. **跑分功能**：集成基础性能测试
3. **设备对比**：多设备配置对比
4. **导出报告**：导出硬件信息报告 (PDF/文本)
5. **硬件健康**：电池健康度深度检测
6. **Native 模块**：实现 HiDebug 和 Sensor 功能

---

*文档版本：v1.1*  
*最后更新：2026-03-12*  
*更新内容：添加 Native API 扩展规划章节*
