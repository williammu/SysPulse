# SysPulse 测试用例与问题解决记录

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

## 2024-03-18 问题解决记录

### 6. 相机变焦范围获取问题

**问题描述：**
- 相机页面显示变焦范围为"未获取"
- 点击"获取"按钮后变焦范围不更新
- UI 状态不刷新（按钮仍显示"获取"）

**根本原因：**
1. **ArkTS hilog domain 0x0000 被过滤**：导致无法通过日志调试
2. **@State 数组更新方式不正确**：直接修改数组元素属性不会触发 UI 刷新
3. **Session 启动后立即获取变焦失败**：需要延迟等待 Session 就绪

**解决方案：**

1. **使用非零 domain（0x1234）输出日志**：
   ```typescript
   const LOG_DOMAIN = 0x1234;
   hilog.info(LOG_DOMAIN, TAG, 'message');  // ✅ 可用
   ```

2. **正确更新 @State 数组触发 UI 刷新**：
   ```typescript
   // ❌ 错误：直接修改不会触发刷新
   this.backCameras[index].isPreviewing = true;
   
   // ✅ 正确：修改后创建新数组引用
   this.backCameras[index].isPreviewing = true;
   this.backCameras = [...this.backCameras];
   ```

3. **Session 启动后延迟获取变焦**：
   ```typescript
   photoSession.start();
   
   // 延迟 1 秒后获取变焦范围
   setTimeout(() => {
     const zoomRange = photoSession.getZoomRatioRange();
     // 更新 UI...
   }, 1000);
   ```

4. **UI 设计优化**：
   - 预览按钮放在变焦范围旁边，逻辑更清晰
   - 点击"获取"启动预览，获取变焦后自动更新显示
   - 按钮状态随预览状态变化（获取/停止）

**验证结果：**
- ✅ 日志正常输出，可调试 CameraPage
- ✅ 点击"获取"按钮后按钮变为"停止"
- ✅ 1 秒后变焦范围自动更新显示
- ✅ UI 状态正确刷新

---

### 7. ArkTS hilog Domain 使用规范

**问题描述：**
- ArkTS 代码中使用 `hilog.info(0x0000, TAG, message)` 无日志输出
- C++ 代码中使用 `OH_LOG_Print(LOG_APP, LOG_INFO, 0x0000, TAG, message)` 有日志输出

**根本原因：**
- **domain 0x0000 在 ArkTS hilog 中被系统过滤**
- C++ 的 OH_LOG_Print 和 ArkTS 的 hilog 有不同的过滤机制

**解决方案：**
- ArkTS 中使用非零 domain（推荐 0x1234）
- 项目统一使用 `const LOG_DOMAIN = 0x1234;`

**对比：**

| 场景 | domain 0x0000 | 非零 domain |
|------|--------------|-------------|
| C++ (OH_LOG_Print) | ✅ 可用 | ✅ 可用 |
| ArkTS (hilog) | ❌ 被过滤 | ✅ 可用 |

**验证结果：**
- ✅ 使用 domain 0x1234 后 ArkTS 日志正常输出
- ✅ 已更新到 debug.md 文档

---

## 测试用例

### TC-006: 相机变焦范围获取测试
**步骤：**
1. 打开"相机"页面
2. 查看后置/前置相机列表
3. 点击变焦范围旁边的"获取"按钮
4. 等待 1 秒

**预期结果：**
- 按钮变为"停止"
- 显示"预览中"状态
- 变焦范围从"未获取"更新为具体数值（如 1.0x - 10.0x）

---

### TC-007: 相机会话生命周期测试
**步骤：**
1. 点击"获取"启动预览
2. 点击"停止"停止预览
3. 切换到其他相机，重复步骤 1-2

**预期结果：**
- 预览启动成功，画面正常显示
- 预览停止成功，资源正确释放
- 切换相机后变焦范围正确更新

---

## 性能指标

- **刷新频率**: 200ms
- **Native API 调用延迟**: < 10ms
- **页面加载时间**: < 100ms
- **内存占用**: 应用 PSS < 100MB
- **相机预览启动时间**: < 500ms
- **变焦范围获取时间**: ~1000ms（Session 启动后）

---

## 待优化项

1. **传感器页面**: 当前为占位实现，需要接入真实传感器 API
2. **GPU 内存**: HiDebug API 暂不支持，需要等待系统更新
3. **网络详情**: 可以添加更详细的网络状态信息
4. **图表展示**: 可以添加 CPU/内存使用趋势图
5. **相机预览**: 当前仅用于获取变焦范围，可以扩展为完整预览功能
