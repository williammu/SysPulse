# HarmonyOS NEXT Native API 调研报告

## 概述

本文档调研 HarmonyOS NEXT 中可以通过 Native API (C/C++) 获取，但 TypeScript/ArkTS 无法直接获取的系统信息。

---

## 一、HiDebug 模块（NDK）

### 1.1 系统级 CPU 信息

**TypeScript 限制**: 只能获取进程级 CPU 使用率  
**Native API 补充**:

| API | 功能 | 返回值 |
|-----|------|--------|
| `OH_HiDebug_GetSystemCpuUsage()` | 获取系统整体 CPU 使用率 | double (0.0-1.0) |
| `OH_HiDebug_GetAppCpuUsage()` | 获取应用进程 CPU 使用率 | double (0.0-1.0) |
| `OH_HiDebug_GetAppThreadCpuUsage()` | 获取应用各线程 CPU 使用情况 | ThreadCpuUsage[] |

**可补充信息**:
- ✅ 系统整体 CPU 使用率（TypeScript 无法获取）
- ✅ 应用各线程的 CPU 使用率详情
- ✅ 线程级别的性能分析数据

### 1.2 系统级内存信息

**TypeScript 限制**: 无法获取系统内存信息  
**Native API 补充**:

| API | 功能 | 返回值 |
|-----|------|--------|
| `OH_HiDebug_GetSystemMemInfo()` | 获取系统内存信息 | SystemMemInfo |
| `OH_HiDebug_GetAppNativeMemInfo()` | 获取应用 Native 内存信息 | NativeMemInfo |
| `OH_HiDebug_GetAppMemoryLimit()` | 获取应用内存限制 | MemoryLimit |
| `OH_HiDebug_GetGraphicsMemory()` | 获取应用显存大小 | uint64_t |

**SystemMemInfo 结构**:
```c
typedef struct {
    uint64_t totalMem;      // 系统总内存 (KB)
    uint64_t freeMem;       // 系统空闲内存 (KB)
    uint64_t availableMem;  // 系统可用内存 (KB)
} SystemMemInfo;
```

**NativeMemInfo 结构**:
```c
typedef struct {
    uint64_t pss;           // 实际物理内存 (KB)
    uint64_t vss;           // 虚拟内存 (KB)
    uint64_t rss;           // 物理内存含共享库 (KB)
    uint64_t sharedDirty;   // 共享脏内存 (KB)
    uint64_t privateDirty;  // 私有脏内存 (KB)
    uint64_t sharedClean;   // 共享干净内存 (KB)
    uint64_t privateClean;  // 私有干净内存 (KB)
} NativeMemInfo;
```

**MemoryLimit 结构**:
```c
typedef struct {
    uint64_t rssLimit;       // RSS 限制 (KB)
    uint64_t vssLimit;       // VSS 限制 (KB)
    uint64_t vmHeapLimit;    // JS VM 堆限制 (KB)
    uint64_t vmTotalHeapSize; // JS 堆总限制 (KB)
} MemoryLimit;
```

**可补充信息**:
- ✅ 系统总内存、空闲内存、可用内存
- ✅ 应用进程的详细内存分布（PSS/VSS/RSS）
- ✅ 应用内存限制（防止 OOM）
- ✅ GPU 显存使用情况

### 1.3 虚拟机内存信息

**TypeScript 限制**: 无法获取 ArkTS 虚拟机内部内存信息  
**Native API 补充**:

| API | 功能 | 返回值 |
|-----|------|--------|
| `OH_HiDebug_GetAppVMMemoryInfo()` | 获取 VM 内存信息 | VMMemoryInfo |
| `OH_HiDebug_GetVMRuntimeStats()` | 获取 GC 统计信息 | GcStats |
| `OH_HiDebug_GetVMRuntimeStat()` | 获取指定 GC 统计项 | number |

**VMMemoryInfo 结构**:
```c
typedef struct {
    uint64_t totalHeap;   // VM 堆总大小 (KB)
    uint64_t heapUsed;    // VM 堆已使用 (KB)
    uint64_t allArraySize; // 所有数组对象大小 (KB)
} VMMemoryInfo;
```

**可补充信息**:
- ✅ ArkTS 虚拟机堆内存使用情况
- ✅ GC 次数、GC 耗时
- ✅ 内存分配和回收统计

### 1.4 Trace 和调试信息

**TypeScript 限制**: 无法获取系统 Trace 信息  
**Native API 补充**:

| API | 功能 | 说明 |
|-----|------|------|
| `OH_HiDebug_StartAppTraceCapture()` | 启动应用 Trace 采集 | 自动化性能分析 |
| `OH_HiDebug_StopAppTraceCapture()` | 停止 Trace 采集 | - |
| `OH_HiDebug_CreateBacktraceObject()` | 创建栈回溯对象 | API 20+ |
| `OH_HiDebug_BacktraceFromFp()` | 栈回溯（异步信号安全） | API 20+ |
| `OH_HiDebug_SymbolicAddress()` | 解析符号信息 | API 20+ |

**可补充信息**:
- ✅ 应用性能 Trace 数据
- ✅ 调用栈回溯信息
- ✅ Native 层符号解析

---

## 二、Sensor 模块（NDK）

### 2.1 传感器列表和信息

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

**可补充信息**:
- ✅ 设备上所有传感器的列表
- ✅ 传感器厂商、型号、分辨率等详细信息
- ✅ 传感器数据实时采集

### 2.2 传感器实时数据

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

**可补充信息**:
- ✅ 实时传感器数据流
- ✅ 设备运动状态检测
- ✅ 环境参数监测

---

## 三、其他 Native API

### 3.1 文件系统和存储

**TypeScript 限制**: statvfs 在部分设备上返回 0  
**Native API 补充**:

| API | 功能 | 说明 |
|-----|------|------|
| `statfs()` | 获取文件系统统计信息 | POSIX 标准 |
| `getmntent()` | 获取挂载点信息 | 需要 root |

**可补充信息**:
- ✅ 更详细的存储信息（可能需要系统权限）

### 3.2 进程和线程信息

**TypeScript 限制**: 无法获取系统进程信息  
**Native API 补充**:

| API | 功能 | 说明 |
|-----|------|------|
| `/proc/[pid]/stat` | 读取进程状态 | Linux 标准 |
| `/proc/[pid]/status` | 读取进程详细信息 | Linux 标准 |
| `/proc/[pid]/task/` | 读取线程信息 | Linux 标准 |

**可补充信息**:
- ✅ 进程状态、优先级、父进程 ID
- ✅ 线程数量和状态
- ✅ 进程启动时间、CPU 时间统计

### 3.3 网络信息

**TypeScript 限制**: 只能获取基础网络类型  
**Native API 补充**:

| API | 功能 | 说明 |
|-----|------|------|
| `getifaddrs()` | 获取网络接口地址 | POSIX 标准 |
| `ioctl(SIOCGIFHWADDR)` | 获取 MAC 地址 | 需要权限 |
| `/proc/net/dev` | 读取网络流量统计 | Linux 标准 |

**可补充信息**:
- ✅ MAC 地址（需要权限）
- ✅ 网络接口详细配置
- ✅ 网络流量统计（收发字节数、包数）

---

## 四、权限要求

### 4.1 普通权限（应用可申请）

```json
{
  "requestPermissions": [
    { "name": "ohos.permission.ACCELEROMETER" },
    { "name": "ohos.permission.GYROSCOPE" },
    { "name": "ohos.permission.ACTIVITY_MOTION" }
  ]
}
```

### 4.2 系统权限（仅系统应用可申请）

```json
{
  "requestPermissions": [
    { "name": "ohos.permission.DUMP" },
    { "name": "ohos.permission.READ_HEALTH_DATA" }
  ]
}
```

---

## 五、可补充的信息总结

### 5.1 高价值信息（建议优先实现）

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

### 5.2 中等价值信息（可选实现）

| 信息类型 | 当前状态 | Native API 补充 | 实现难度 |
|---------|---------|----------------|---------|
| **线程 CPU 使用** | ❌ 无法获取 | ✅ HiDebug ThreadCpuUsage | ⭐⭐ 中等 |
| **网络流量统计** | ❌ 无法获取 | ⚠️ /proc/net/dev | ⭐⭐⭐ 复杂 |
| **进程详细信息** | ❌ 无法获取 | ⚠️ /proc/[pid]/ | ⭐⭐⭐ 复杂 |

### 5.3 低价值/高难度信息（暂不建议）

| 信息类型 | 当前状态 | Native API 补充 | 实现难度 |
|---------|---------|----------------|---------|
| **MAC 地址** | ❌ 无法获取 | ⚠️ 需要系统权限 | ⭐⭐⭐⭐ 困难 |
| **摄像头详细信息** | ❌ 无法获取 | ⚠️ 需要 CameraKit | ⭐⭐⭐⭐ 困难 |
| **系统级 Trace** | ❌ 无法获取 | ⚠️ 需要系统权限 | ⭐⭐⭐⭐ 困难 |

---

## 六、实现建议

### 6.1 第一阶段：HiDebug 模块（高价值、低难度）

建议优先实现 HiDebug 相关功能，因为：
1. ✅ 不需要额外权限
2. ✅ API 简单易用
3. ✅ 信息价值高（内存、CPU、GC）
4. ✅ 官方文档完善

**实现步骤**:
1. 创建 Native C++ 模块
2. 链接 `libohhidebug.so`
3. 封装 HiDebug API 为 ArkTS 接口
4. 在应用中调用

### 6.2 第二阶段：Sensor 模块（高价值、中等难度）

建议第二阶段实现 Sensor 功能，因为：
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

### 6.3 第三阶段：其他模块（可选）

根据需求决定是否实现：
- 网络流量统计
- 进程详细信息
- 其他系统级信息

---

## 七、参考文档

- [HiDebug NDK API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/js-apis-hidebug-V5)
- [Sensor NDK API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/_sensor-V5)
- [HarmonyOS NDK 开发指南](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/ndk-guidelines-V5)

---

*调研时间: 2026-03-12*  
*API 版本: HarmonyOS NEXT API 12+*  
*NDK 版本: 5.0.0*
