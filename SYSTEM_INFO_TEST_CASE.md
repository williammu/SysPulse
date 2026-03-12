# HarmonyOS NEXT 系统信息 API 测试清单

> 最后更新: 2026-03-11
> 文档版本: v2.0

---

## 📋 目录

1. [设备信息 API (@ohos.deviceInfo)](#1-设备信息-api-ohosdeviceinfo)
2. [电池信息 API (@ohos.batteryInfo)](#2-电池信息-api-ohosbatteryinfo)
3. [屏幕显示 API (@ohos.display)](#3-屏幕显示-api-ohosdisplay)
4. [存储文件系统 API (@ohos.file.statvfs)](#4-存储文件系统-api-ohosfilestatvfs)
5. [网络连接 API (@ohos.net.connection)](#5-网络连接-api-ohosnetconnection)
6. [C/C++ NDK 接口](#6-cc-ndk-接口)

---

## 1. 设备信息 API (@ohos.deviceInfo)

### 1.1 模块导入

**方式 1: 传统导入方式 (兼容旧版本)**
```typescript
import deviceInfo from '@ohos.deviceInfo';
```

**方式 2: 最新 @kit 导入方式 (推荐 HarmonyOS NEXT)**
```typescript
import { deviceInfo } from '@kit.BasicServicesKit';
```

### 1.2 可获取的信息清单

| 字段 | 类型 | 只读 | API 版本 | 说明 | 测试状态 |
|-----|------|------|---------|------|---------|
| `deviceType` | string | ✅ | 6+ | 设备类型 (phone/tablet/wearable) | ✅ 可获取 |
| `manufacture` | string | ✅ | 6+ | 设备厂家名称 | ✅ 可获取 |
| `brand` | string | ✅ | 6+ | 设备品牌名称 | ✅ 可获取 |
| `marketName` | string | ✅ | 11+ | 外部产品系列 (如: HUAWEI Mate 60 Pro) | ✅ 可获取 |
| `productSeries` | string | ✅ | 6+ | 产品系列 (如: ALN) | ✅ 可获取 |
| `productModel` | string | ✅ | 11+ | 认证型号 (如: ALN-AL00) | ✅ 可获取 |
| `productModelAlias` | string | ✅ | 14+ | 认证型号别名 | ✅ 可获取 |
| `softwareModel` | string | ✅ | 6+ | 内部软件子型号 | ✅ 可获取 |
| `hardwareModel` | string | ✅ | 6+ | 硬件版本号 | ✅ 可获取 |
| `bootloaderVersion` | string | ✅ | 6+ | Bootloader 版本号 | ✅ 可获取 |
| `abiList` | string | ✅ | 6+ | 应用二进制接口 (如: arm64-v8a) | ✅ 可获取 |
| `securityPatchTag` | string | ✅ | 6+ | 安全补丁级别 | ✅ 可获取 |
| `displayVersion` | string | ✅ | 6+ | 产品版本 | ✅ 可获取 |
| `incrementalVersion` | string | ✅ | 6+ | 差异版本号 | ✅ 可获取 |
| `osReleaseType` | string | ✅ | 6+ | 系统发布类型 (Canary/Beta/Release) | ✅ 可获取 |
| `osFullName` | string | ✅ | 11+ | 系统完整版本 (如: HarmonyOS-5.0.0.1) | ✅ 可获取 |
| `majorVersion` | number | ✅ | 6+ | Major 版本号 | ✅ 可获取 |
| `seniorVersion` | number | ✅ | 6+ | Senior 版本号 | ✅ 可获取 |
| `featureVersion` | number | ✅ | 6+ | Feature 版本号 | ✅ 可获取 |
| `buildVersion` | number | ✅ | 6+ | Build 版本号 | ✅ 可获取 |
| `sdkApiVersion` | number | ✅ | 14+ | 系统软件 API 版本 | ✅ 可获取 |
| `firstApiVersion` | number | ✅ | 6+ | 首个版本系统软件 API 版本 | ✅ 可获取 |
| `versionId` | string | ✅ | 6+ | 版本 ID | ✅ 可获取 |
| `buildType` | string | ✅ | 6+ | 构建类型 | ✅ 可获取 |
| `buildUser` | string | ✅ | 6+ | 构建用户 | ✅ 可获取 |
| `buildHost` | string | ✅ | 6+ | 构建主机 | ✅ 可获取 |
| `buildTime` | string | ✅ | 6+ | 构建时间 | ✅ 可获取 |
| `buildRootHash` | string | ✅ | 6+ | 构建版本 Hash | ✅ 可获取 |
| `udid` | string | ✅ | 7+ | 设备 UDID (65字节) | ⚠️ 需权限 |
| `distributionOSName` | string | ✅ | 10+ | 发行版系统名称 | ✅ 可获取 |
| `distributionOSVersion` | string | ✅ | 10+ | 发行版系统版本号 | ✅ 可获取 |
| `distributionOSApiVersion` | number | ✅ | 10+ | 发行版系统 API 版本 | ✅ 可获取 |
| `distributionOSApiName` | string | ✅ | 13+ | 发行版系统 API 版本名称 | ✅ 可获取 |
| `distributionOSReleaseType` | string | ✅ | 10+ | 发行版系统类型 | ✅ 可获取 |
| `odid` | string | ✅ | 12+ | 开发者匿名设备标识符 (37字节) | ✅ 可获取 |
| `diskSN` | string | ✅ | 15+ | 硬盘序列号 | ⚠️ 需权限/2in1 |
| `performanceClass` | enum | ✅ | 19+ | 设备能力等级 | ✅ 可获取 |
| `chipType` | string | ✅ | 21+ | 当前设备 CPU 芯片型号 | ✅ 可获取 |
| `bootCount` | number | ✅ | 21+ | 当前设备重启次数 | ✅ 可获取 |

### 1.3 权限说明
- `ohos.permission.sec.ACCESS_UDID`: 获取 udid (仅系统应用/企业定制应用)
- `ohos.permission.ACCESS_DISK_PHY_INFO`: 获取 diskSN (仅 2in1 设备)

### 1.4 Test Case 示例
```typescript
// Test 1: 获取基本设备信息 (传统方式)
import deviceInfo from '@ohos.deviceInfo';

console.log('设备品牌:', deviceInfo.brand);
console.log('设备型号:', deviceInfo.marketName);
console.log('系统版本:', deviceInfo.osFullName);
console.log('API 版本:', deviceInfo.sdkApiVersion);
console.log('CPU 芯片:', deviceInfo.chipType);
console.log('设备类型:', deviceInfo.deviceType);
```

```typescript
// Test 1.1: 获取基本设备信息 (最新 @kit 方式 - 推荐)
import { deviceInfo } from '@kit.BasicServicesKit';

let displayVersionInfo: string = deviceInfo.displayVersion;
let osFullNameInfo: string = deviceInfo.osFullName;
let versionIdInfo: string = deviceInfo.versionId;
let deviceTypeInfo: string = deviceInfo.deviceType;
let manufactureInfo: string = deviceInfo.manufacture;
let brandInfo: string = deviceInfo.brand;
let marketNameInfo: string = deviceInfo.marketName;
let productModelInfo: string = deviceInfo.productModel;
let hardwareModelInfo: string = deviceInfo.hardwareModel;
let sdkApiVersionInfo: number = deviceInfo.sdkApiVersion;
let buildVersion: number = deviceInfo.buildVersion;
let buildType: string = deviceInfo.buildType;
let osReleaseType: string = deviceInfo.osReleaseType;
let seniorVersion: number = deviceInfo.seniorVersion;
let featureVersion: number = deviceInfo.featureVersion;
let productSeries: string = deviceInfo.productSeries;
let buildTime: string = deviceInfo.buildTime;
let distributionOSApiVersion: number = deviceInfo.distributionOSApiVersion;
let distributionOSReleaseType: string = deviceInfo.distributionOSReleaseType;
let ODID: string = deviceInfo.ODID;

console.log('产品版本:', displayVersionInfo);
console.log('系统版本:', osFullNameInfo);
console.log('版本ID:', versionIdInfo);
console.log('设备类型:', deviceTypeInfo);
console.log('设备厂家:', manufactureInfo);
console.log('设备品牌:', brandInfo);
console.log('市场名称:', marketNameInfo);
console.log('产品型号:', productModelInfo);
console.log('硬件型号:', hardwareModelInfo);
console.log('SDK API版本:', sdkApiVersionInfo);
console.log('构建版本:', buildVersion);
console.log('构建类型:', buildType);
console.log('发布类型:', osReleaseType);
console.log('主版本:', seniorVersion);
console.log('特性版本:', featureVersion);
console.log('产品系列:', productSeries);
console.log('构建时间:', buildTime);
console.log('发行版API版本:', distributionOSApiVersion);
console.log('发行版发布类型:', distributionOSReleaseType);
console.log('开发者匿名设备ID:', ODID);
```

---

## 2. 电池信息 API (@ohos.batteryInfo)

### 2.1 模块导入

**方式 1: 传统导入方式 (兼容旧版本)**
```typescript
import batteryInfo from '@ohos.batteryInfo';
```

**方式 2: 最新 @kit 导入方式 (推荐 HarmonyOS NEXT)**
```typescript
import { batteryInfo } from '@kit.BasicServicesKit';
```

### 2.2 可获取的信息清单

| 字段 | 类型 | 只读 | API 版本 | 说明 | 测试状态 |
|-----|------|------|---------|------|---------|
| `batterySOC` | number | ✅ | 6+ | 当前设备剩余电池电量百分比 (0-100) | ✅ 可获取 |
| `chargingStatus` | enum | ✅ | 6+ | 当前设备电池的充电状态 | ✅ 可获取 |
| `healthStatus` | enum | ✅ | 6+ | 当前设备电池的健康状态 | ✅ 可获取 |
| `pluggedType` | enum | ✅ | 6+ | 当前设备连接的充电器类型 | ✅ 可获取 |
| `voltage` | number | ✅ | 6+ | 当前设备电池的电压 (单位: 微伏) | ✅ 可获取 |
| `technology` | string | ✅ | 6+ | 当前设备电池的技术型号 | ✅ 可获取 |
| `batteryTemperature` | number | ✅ | 6+ | 当前设备电池的温度 (单位: 0.1摄氏度) | ✅ 可获取 |
| `isBatteryPresent` | boolean | ✅ | 7+ | 当前设备是否支持电池/电池是否在位 | ✅ 可获取 |
| `batteryCapacityLevel` | enum | ✅ | 9+ | 当前设备电池电量的等级 | ✅ 可获取 |
| `nowCurrent` | number | ✅ | 12+ | 当前设备电池的电流 (单位: 毫安) | ✅ 可获取 |

### 2.3 枚举值

#### 充电状态 (BatteryChargeState)
| 值 | 说明 |
|----|------|
| 0 | 未充电 |
| 1 | 充电使能 |
| 2 | 停止充电 |
| 3 | 已充满 |

#### 健康状态 (BatteryHealthState)
| 值 | 说明 |
|----|------|
| 0 | 未知 |
| 1 | 正常 |
| 2 | 过热 |
| 3 | 过压 |
| 4 | 低温 |
| 5 | 僵死 |

#### 充电器类型 (BatteryPluggedType)
| 值 | 说明 |
|----|------|
| 0 | 未获取到 |
| 1 | 交流充电器 |
| 2 | USB 充电器 |
| 3 | 无线充电器 |

#### 电量等级 (BatteryCapacityLevel)
| 值 | 说明 |
|----|------|
| 1 | 满电量 |
| 2 | 高电量 |
| 3 | 正常电量 |
| 4 | 低电量 |
| 5 | 告警电量 |
| 6 | 极低电量 |
| 7 | 关机电量 |

### 2.4 Test Case 示例
```typescript
// Test 2: 获取电池信息 (传统方式)
import batteryInfo from '@ohos.batteryInfo';

console.log('电池电量:', batteryInfo.batterySOC + '%');
console.log('充电状态:', batteryInfo.chargingStatus);
console.log('健康状态:', batteryInfo.healthStatus);
console.log('充电器类型:', batteryInfo.pluggedType);
console.log('电池电压:', batteryInfo.voltage + ' μV');
console.log('电池温度:', (batteryInfo.batteryTemperature / 10).toFixed(1) + '°C');
console.log('电池技术:', batteryInfo.technology);
```

```typescript
// Test 2.1: 获取电池信息 (最新 @kit 方式 - 推荐)
import { batteryInfo } from '@kit.BasicServicesKit';

console.log('电池电量:', batteryInfo.batterySOC + '%');
console.log('充电状态:', batteryInfo.chargingStatus);
console.log('健康状态:', batteryInfo.healthStatus);
console.log('充电器类型:', batteryInfo.pluggedType);
console.log('电池电压:', batteryInfo.voltage + ' μV');
console.log('电池温度:', (batteryInfo.batteryTemperature / 10).toFixed(1) + '°C');
console.log('电池技术:', batteryInfo.technology);
console.log('电池是否在位:', batteryInfo.isBatteryPresent);
console.log('电量等级:', batteryInfo.batteryCapacityLevel);
console.log('电池电流:', batteryInfo.nowCurrent + ' mA');
```

---

## 3. 屏幕显示 API (@ohos.display)

### 3.1 模块导入

**方式 1: 传统导入方式 (兼容旧版本)**
```typescript
import display from '@ohos.display';
```

**方式 2: 最新 @kit 导入方式 (推荐 HarmonyOS NEXT)**
```typescript
import { display } from '@kit.ArkUI';
```

### 3.2 可获取的信息清单

| 字段 | 类型 | 只读 | API 版本 | 说明 | 测试状态 |
|-----|------|------|---------|------|---------|
| `id` | number | ✅ | 6+ | 显示设备 ID | ✅ 可获取 |
| `name` | string | ✅ | 6+ | 显示设备名称 | ✅ 可获取 |
| `alive` | boolean | ✅ | 6+ | 显示设备是否可用 | ✅ 可获取 |
| `state` | enum | ✅ | 6+ | 显示设备状态 (UNKNOWN/OFF/ON/DOZE/SUSPEND/VRE) | ✅ 可获取 |
| `refreshRate` | number | ✅ | 6+ | 显示设备刷新率 (单位: Hz) | ✅ 可获取 |
| `rotation` | number | ✅ | 6+ | 显示设备旋转角度 (0/90/180/270) | ✅ 可获取 |
| `width` | number | ✅ | 6+ | 显示设备宽度 (单位: px) | ✅ 可获取 |
| `height` | number | ✅ | 6+ | 显示设备高度 (单位: px) | ✅ 可获取 |
| `densityDPI` | number | ✅ | 6+ | 显示设备像素密度 (单位: DPI) | ✅ 可获取 |
| `densityPixels` | number | ✅ | 6+ | 显示设备像素密度 (像素密度比例) | ✅ 可获取 |
| `scaledDensity` | number | ✅ | 6+ | 显示设备缩放后的像素密度 | ✅ 可获取 |
| `xDPI` | number | ✅ | 6+ | 显示设备 X 方向的 DPI | ✅ 可获取 |
| `yDPI` | number | ✅ | 6+ | 显示设备 Y 方向的 DPI | ✅ 可获取 |

### 3.3 Test Case 示例
```typescript
// Test 3: 获取屏幕显示信息 (传统方式)
import display from '@ohos.display';

const displays = await display.getDefaultDisplay();
console.log('屏幕宽度:', displays.width + 'px');
console.log('屏幕高度:', displays.height + 'px');
console.log('屏幕分辨率:', displays.width + ' × ' + displays.height);
console.log('像素密度:', displays.densityDPI + ' DPI');
console.log('刷新率:', displays.refreshRate + ' Hz');
console.log('旋转角度:', displays.rotation + '°');
```

```typescript
// Test 3.1: 获取屏幕显示信息 (最新 @kit 方式 - 推荐)
import { display } from '@kit.ArkUI';

const displays = await display.getDefaultDisplay();
console.log('显示设备ID:', displays.id);
console.log('显示设备名称:', displays.name);
console.log('是否可用:', displays.alive);
console.log('显示状态:', displays.state);
console.log('屏幕宽度:', displays.width + 'px');
console.log('屏幕高度:', displays.height + 'px');
console.log('屏幕分辨率:', displays.width + ' × ' + displays.height);
console.log('像素密度(DPI):', displays.densityDPI + ' DPI');
console.log('像素密度比例:', displays.densityPixels);
console.log('缩放后像素密度:', displays.scaledDensity);
console.log('X方向DPI:', displays.xDPI);
console.log('Y方向DPI:', displays.yDPI);
console.log('刷新率:', displays.refreshRate + ' Hz');
console.log('旋转角度:', displays.rotation + '°');
```

---

## 4. 存储文件系统 API (@ohos.file.statvfs)

### 4.1 模块导入
```typescript
import statvfs from '@ohos.file.statvfs';
```

### 4.2 可获取的信息清单

| 方法 | 返回类型 | API 版本 | 说明 | 测试状态 |
|-----|---------|---------|------|---------|
| `getFreeSizeSync(path: string)` | number | 6+ | 获取指定文件系统空闲字节数 (同步) | ✅ 可获取 |
| `getTotalSizeSync(path: string)` | number | 6+ | 获取指定文件系统总字节数 (同步) | ✅ 可获取 |
| `getFreeSize(path: string)` | Promise&lt;number&gt; | 6+ | 获取指定文件系统空闲字节数 (异步) | ✅ 可获取 |
| `getTotalSize(path: string)` | Promise&lt;number&gt; | 6+ | 获取指定文件系统总字节数 (异步) | ✅ 可获取 |

### 4.3 Test Case 示例
```typescript
// Test 4: 获取存储信息
import statvfs from '@ohos.file.statvfs';
import fs from '@ohos.file.fs';

const dataPath = fs.getDataPath();
const totalSize = statvfs.getTotalSizeSync(dataPath);
const freeSize = statvfs.getFreeSizeSync(dataPath);

console.log('总存储空间:', (totalSize / 1024 / 1024 / 1024).toFixed(2) + ' GB');
console.log('可用存储空间:', (freeSize / 1024 / 1024 / 1024).toFixed(2) + ' GB');
console.log('已用存储空间:', ((totalSize - freeSize) / 1024 / 1024 / 1024).toFixed(2) + ' GB');
```

---

## 5. 网络连接 API (@ohos.net.connection)

### 5.1 模块导入
```typescript
import connection from '@ohos.net.connection';
```

### 5.2 可获取的信息清单

| 方法 | 返回类型 | API 版本 | 说明 | 测试状态 |
|-----|---------|---------|------|---------|
| `getDefaultNet()` | Promise&lt;NetHandle&gt; | 6+ | 获取默认激活的网络 | ✅ 可获取 |
| `getNetCapabilities(netHandle: NetHandle)` | Promise&lt;NetCapabilities&gt; | 6+ | 获取网络能力 | ✅ 可获取 |
| `getConnectionProperties(netHandle: NetHandle)` | Promise&lt;ConnectionProperties&gt; | 6+ | 获取连接属性 | ✅ 可获取 |

### 5.3 Test Case 示例
```typescript
// Test 5: 获取网络信息
import connection from '@ohos.net.connection';

const netHandle = await connection.getDefaultNet();
const netCapabilities = await connection.getNetCapabilities(netHandle);

console.log('网络类型:', netCapabilities.bearerTypes);
console.log('网络能力:', netCapabilities.networkCap);
```

---

## 6. C/C++ NDK 接口

### 6.1 底层系统信息获取

通过 C/C++ NDK 可以访问以下底层接口：

| 接口 | 说明 | 测试状态 |
|-----|------|---------|
| `/proc/cpuinfo` | CPU 信息 (需权限) | ⚠️ 权限受限 |
| `/proc/meminfo` | 内存信息 (需权限) | ⚠️ 权限受限 |
| `statvfs()` | 文件系统统计 | ✅ 可通过 C API |
| `sysconf()` | 系统配置 | ✅ 可通过 C API |

### 6.2 C API 示例
```c
// Test 6: C/C++ NDK 接口示例
#include <sys/statvfs.h>
#include <unistd.h>

void getStorageInfo() {
    struct statvfs stat;
    if (statvfs("/data", &stat) == 0) {
        unsigned long long total = stat.f_blocks * stat.f_frsize;
        unsigned long long free = stat.f_bfree * stat.f_frsize;
        printf("Total: %llu bytes\n", total);
        printf("Free: %llu bytes\n", free);
    }
}

void getSystemInfo() {
    long pageSize = sysconf(_SC_PAGESIZE);
    long numPages = sysconf(_SC_PHYS_PAGES);
    long totalMem = pageSize * numPages;
    printf("Total memory: %ld bytes\n", totalMem);
}
```

---

## 📊 汇总统计

### 可获取的系统信息总计

| 模块 | 字段数 | Test Case 数 |
|-----|--------|------------|
| @ohos.deviceInfo / @kit.BasicServicesKit | 35+ | 2 |
| @ohos.batteryInfo / @kit.BasicServicesKit | 11 | 2 |
| @ohos.display / @kit.ArkUI | 13 | 2 |
| @ohos.file.statvfs | 4 | 1 |
| @ohos.net.connection | 3 | 1 |
| C/C++ NDK | 4+ | 1 |
| **总计** | **70+** | **9** |

---

## 🔑 权限说明

### 需要权限的 API

| API | 权限 | 说明 |
|-----|------|------|
| `deviceInfo.udid` | `ohos.permission.sec.ACCESS_UDID` | 仅限系统应用/企业定制应用 |
| `deviceInfo.diskSN` | `ohos.permission.ACCESS_DISK_PHY_INFO` | 仅限 2in1 设备 |

---

## 📝 使用建议

### API 导入方式选择

1. **HarmonyOS NEXT 新项目**: 推荐使用 `@kit.*` 导入方式
   - `@kit.BasicServicesKit` - 基础服务（设备信息、电池信息等）
   - `@kit.ArkUI` - UI 相关（屏幕显示等）

2. **兼容旧版本项目**: 可以继续使用 `@ohos.*` 导入方式
   - 两种方式在功能上是等价的
   - 新 API 导入方式更加模块化和规范

3. **普通应用优先使用公开 API** (@ohos.* 或 @kit.*)
4. **C/C++ NDK 主要用于性能关键场景**
5. **获取不到的信息标记为"模拟器不支持"或"未知"**
6. **权限申请遵循最小权限原则**

---

*文档生成时间: 2026-03-11*
