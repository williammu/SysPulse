# HiLog 调试指南

## 概述

HiLog 是 HarmonyOS 的日志系统，用于打印日志、记录用户操作和系统运行状态。开发者可以通过 hilog 命令行查询相关日志信息。

## 环境准备

1. 安装 DevEco Studio
2. 配置 hdc 工具环境变量
3. 连接设备（真机或模拟器）

## 常用命令

### 1. 基础命令

#### 查看帮助
```bash
hilog -h
```

#### 非阻塞读取日志（读完即退出，推荐用于脚本）
```bash
hilog -x
```

#### 阻塞读取日志（持续监听）
```bash
hilog
```

### 2. 日志缓冲区管理

#### 查看缓冲区大小
```bash
hilog -g
```

#### 设置缓冲区大小
```bash
hilog -G 16M
```

#### 清除缓冲区日志
```bash
hilog -r
```

### 3. 日志过滤

#### 按日志级别过滤
```bash
# 只显示 ERROR 级别日志
hilog -L E

# 可选级别: D(DEBUG) / I(INFO) / W(WARN) / E(ERROR) / F(FATAL)
```

#### 按日志类型过滤
```bash
# 只显示应用日志
hilog -t app

# 可选类型: app / core / init / only_prerelease
```

#### 按 TAG 过滤
```bash
hilog -T SysInfo
```

#### 按 Domain 过滤
```bash
hilog -D 01B06
```

#### 按 PID 过滤
```bash
hilog -P 618
```

#### 正则匹配
```bash
hilog -e "start|error"
```

### 4. 日志显示控制

#### 显示前 N 行
```bash
hilog -a 20
```

#### 显示后 N 行
```bash
hilog -z 20
```

#### 显示时间戳
```bash
hilog -v time
```

#### 显示纳秒级时间
```bash
hilog -v nsec
```

#### 显示颜色（不同级别不同颜色）
```bash
hilog -v color
```

### 5. 组合使用示例

#### 查看指定 TAG 的最近 50 行日志（非阻塞）
```bash
hilog -x -T SysInfo -z 50
```

#### 查看指定应用的 ERROR 级别日志
```bash
hilog -x -t app -L E
```

#### 查看包含特定关键字的日志
```bash
hilog -x -e "error|fail" -z 100
```

## 通过 HDC 使用 HiLog

### 基本用法

```bash
# 直接执行 hilog 命令
hdc shell hilog -x

# 指定设备执行
hdc -t <device-id> shell hilog -x
```

### 常用场景

#### 1. 查看应用启动日志
```bash
hdc shell hilog -x -T SysInfo
```

#### 2. 实时监控应用日志
```bash
hdc shell hilog -T SysInfo
```

#### 3. 导出日志到文件
```bash
hdc shell hilog -x -T SysInfo > app_log.txt
```

#### 4. 清除日志后重新抓取
```bash
hdc shell hilog -r
hdc shell hilog -x -T SysInfo
```

#### 5. 查看错误日志
```bash
hdc shell hilog -x -L E -z 100
```

## 避免阻塞的方法

### 方法 1：使用 -x 参数（推荐）
```bash
# 非阻塞模式，读取完缓冲区内容后立即退出
hdc shell hilog -x -T SysInfo
```

### 方法 2：使用 -a 或 -z 限制行数
```bash
# 只显示前 100 行
hdc shell hilog -x -a 100

# 只显示后 100 行
hdc shell hilog -x -z 100
```

### 方法 3：后台运行 + 延迟停止
```bash
# 后台运行，5秒后停止
hdc shell hilog -T SysInfo &
sleep 5
kill %1
```

### 方法 4：使用 timeout 命令
```bash
# 最多运行 5 秒
timeout 5 hdc shell hilog -T SysInfo
```

## 项目中的日志采集

### 应用启动时自动记录日志

代码位于 `entry/src/main/ets/entryability/EntryAbility.ets`：

```typescript
import hilog from '@ohos.hilog';

onCreate() {
  hilog.info(0x0000, 'SysInfo', '应用启动');
  // 自动采集系统信息...
}
```

### 采集系统信息日志

应用启动时会自动采集以下信息并记录到 HiLog：

1. **设备信息**：设备类型、品牌、型号、系统版本、API 版本
2. **电池信息**：电量、充电状态、温度、电压
3. **屏幕信息**：分辨率、像素密度、刷新率
4. **存储信息**：总存储、可用存储、已用存储
5. **网络信息**：网络类型

### 查看采集的日志

```bash
# 查看所有 SysInfo 标签的日志
hdc shell hilog -x -T SysInfo

# 查看最近的 100 条 SysInfo 日志
hdc shell hilog -x -T SysInfo -z 100
```

## 日志级别说明

| 级别 | 说明 | 使用场景 |
|------|------|----------|
| D (DEBUG) | 调试信息 | 开发调试时使用 |
| I (INFO) | 普通信息 | 记录正常流程 |
| W (WARN) | 警告信息 | 可能出现的问题 |
| E (ERROR) | 错误信息 | 错误和异常 |
| F (FATAL) | 致命错误 | 严重错误导致崩溃 |

## 注意事项

1. **日志缓冲区有限**：默认 512KB-16MB，超出后会滚动覆盖
2. **生产环境**：避免打印敏感信息
3. **性能影响**：大量日志会影响性能，正式发布时建议关闭 DEBUG 级别
4. **真机调试**：需要开启 USB 调试模式
5. **权限**：某些日志需要系统权限才能查看

## 参考链接

- [华为官方 HiLog 文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/hilog-V5)
