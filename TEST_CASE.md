# SysInfo 测试用例与问题解决记录

## 2024-03-12 问题解决记录

### 1. Native API 模块加载问题

**问题描述：**
- Native API 模块在应用启动时没有正确初始化
- TestPage 显示 "Native API 可用: 否"
- 日志中看不到 Native 模块的初始化日志

**根本原因：**
- Native 模块的日志使用方式不正确
- 使用了宏包装 `OH_LOG_Info` 而不是直接使用 `OH_LOG_Print`
- CMakeLists.txt 没有正确链接 hilog 库

**解决方案：**
1. 在 `hidebug_module.cpp` 中使用正确的日志 API：
   ```cpp
   #include <hilog/log.h>
   #define LOG_TAG "SysInfoHiDebug"
   #define LOG_PRINT_DOMAIN 0x0000
   
   // 使用 OH_LOG_Print 而不是宏包装
   OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "message");
   ```

2. 在 `CMakeLists.txt` 中正确链接 hilog 库：
   ```cmake
   find_library(hilog-lib hilog_ndk.z)
   target_link_libraries(sysinfo PUBLIC ${hilog-lib} ...)
   ```

3. 在 `EntryAbility.ets` 中主动初始化 Native API：
   ```typescript
   const isNativeAvailable = nativeApi.isNativeAvailable();
   ```

**验证结果：**
- ✅ Native 模块初始化成功
- ✅ `SysInfoHiDebug: InitHiDebugModule called` 日志正常输出
- ✅ TestPage 显示 "Native API 可用: 是"

---

### 2. 主页面信息展示不完整

**问题描述：**
- 主页面只显示设备基本信息
- 缺少实时 CPU、内存使用率等信息
- 信息层级不清晰，用户理解成本高

**解决方案：**
1. 重新设计主页面布局：
   - 顶部：设备型号和系统版本
   - 实时状态区域：CPU 使用率、内存使用率、应用内存、电池电量
   - 硬件信息区域：处理器、线程 CPU、系统内存、应用内存、存储、屏幕、电池
   - 连接与传感器区域：网络、摄像头、传感器

2. 使用 Grid 布局展示实时状态卡片（2x2 网格）

3. 每个信息项都可以点击查看详情

**验证结果：**
- ✅ 主页面实时显示 CPU 使用率
- ✅ 主页面实时显示内存使用率
- ✅ 主页面显示应用 PSS 内存
- ✅ 信息层级清晰，易于理解

---

### 3. 缺少二级详情页面

**问题描述：**
- Native API 提供了大量数据但只在 TestPage 展示
- 没有专门的页面展示应用内存详情
- 没有专门的页面展示线程 CPU 详情

**解决方案：**
1. 创建 `AppMemoryPage.ets`：
   - PSS (Proportional Set Size)
   - RSS (Resident Set Size)
   - VSS (Virtual Set Size)
   - 内存分类：Shared Clean/Dirty, Private Clean/Dirty
   - 内存限制：RSS/VSS Limit

2. 创建 `ThreadCpuPage.ets`：
   - 系统 CPU 使用率
   - 应用 CPU 使用率
   - 线程数量
   - 各线程 CPU 使用率列表

3. 更新 `main_pages.json` 注册新页面

4. 在主页面添加导航入口

**验证结果：**
- ✅ 可以点击"应用内存"查看详细内存信息
- ✅ 可以点击"线程 CPU"查看各线程 CPU 使用率
- ✅ 所有 Native API 数据都有对应的展示页面

---

### 4. 数据刷新机制缺失

**问题描述：**
- 页面数据只在加载时获取一次
- 无法实时监控系统状态变化
- 用户需要手动刷新才能看到最新数据

**解决方案：**
1. 主页面 (`Index.ets`)：
   - 使用 `setInterval` 每 200ms 刷新动态数据
   - 在 `aboutToDisappear` 中清理定时器

2. 二级页面统一添加刷新机制：
   - `MemoryPage`: 200ms 刷新系统内存、应用内存、内存限制
   - `CpuPage`: 200ms 刷新 CPU 使用率、线程 CPU
   - `AppMemoryPage`: 200ms 刷新应用内存详情
   - `ThreadCpuPage`: 200ms 刷新线程 CPU 详情

3. 数据分级：
   - 实时数据 (200ms): CPU、内存、电池
   - 静态数据: 设备型号、品牌、系统版本

**代码示例：**
```typescript
private refreshTimer: number | null = null;

aboutToAppear() {
  this.loadData();
  this.refreshTimer = setInterval(() => {
    this.loadData();
  }, 200);
}

aboutToDisappear() {
  if (this.refreshTimer !== null) {
    clearInterval(this.refreshTimer);
    this.refreshTimer = null;
  }
}
```

**验证结果：**
- ✅ 主页面数据每 200ms 自动刷新
- ✅ 所有二级页面数据每 200ms 自动刷新
- ✅ 页面切换时正确清理定时器，无内存泄漏

---

### 5. 日志查看问题

**问题描述：**
- 无法查看应用日志
- `hilog` 命令输出为空
- 不知道如何正确过滤日志

**解决方案：**
1. 使用正确的日志级别：
   ```bash
   hdc shell hilog -b I  # 设置日志级别为 Info
   ```

2. 清空日志缓冲区：
   ```bash
   hdc shell hilog -r
   ```

3. 查看应用日志（非阻塞）：
   ```bash
   hdc shell hilog -x | grep "com.huawei.sysinfo"
   ```

4. 查看特定进程日志：
   ```bash
   hdc shell ps -ef | grep sysinfo  # 获取 PID
   hdc shell hilog -x | grep "<PID>"
   ```

**验证结果：**
- ✅ 可以正常查看 Native 模块日志
- ✅ 可以正常查看 ArkTS 日志
- ✅ 日志中包含完整的调试信息

---

## 测试用例

### TC-001: Native API 初始化测试
**步骤：**
1. 启动应用
2. 查看日志 `hilog -x | grep SysInfoHiDebug`
3. 打开"系统信息测试"页面

**预期结果：**
- 日志显示 `InitHiDebugModule called`
- 日志显示 `HiDebug module initialized successfully`
- 页面显示 "Native API 可用: 是"

---

### TC-002: 实时数据刷新测试
**步骤：**
1. 打开主页面
2. 观察"实时状态"区域的数值变化
3. 打开"内存"页面，观察内存使用率变化

**预期结果：**
- 数值每 200ms 更新一次
- 内存使用率随系统状态变化
- CPU 使用率实时更新

---

### TC-003: 二级页面导航测试
**步骤：**
1. 在主页面点击"系统内存"
2. 返回主页面，点击"应用内存"
3. 返回主页面，点击"线程 CPU"

**预期结果：**
- 正确跳转到对应页面
- 页面数据每 200ms 刷新
- 返回按钮正常工作

---

### TC-004: 内存详情展示测试
**步骤：**
1. 打开"应用内存"页面
2. 查看 PSS、RSS、VSS 数值
3. 查看内存分类信息

**预期结果：**
- 显示正确的内存数值
- 显示 Shared/Private Clean/Dirty
- 显示内存限制

---

### TC-005: 线程 CPU 展示测试
**步骤：**
1. 打开"线程 CPU"页面
2. 查看系统 CPU 使用率
3. 查看各线程 CPU 使用率

**预期结果：**
- 显示系统 CPU 使用率
- 显示应用 CPU 使用率
- 显示各线程 CPU 使用率列表

---

## 性能指标

- **刷新频率**: 200ms
- **Native API 调用延迟**: < 10ms
- **页面加载时间**: < 100ms
- **内存占用**: 应用 PSS < 100MB

---

## 待优化项

1. **传感器页面**: 当前为占位实现，需要接入真实传感器 API
2. **GPU 内存**: HiDebug API 暂不支持，需要等待系统更新
3. **网络详情**: 可以添加更详细的网络状态信息
4. **图表展示**: 可以添加 CPU/内存使用趋势图
