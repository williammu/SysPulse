# 构建指引

本文档详细说明如何构建和运行 SysPulse 纯血鸿蒙应用。

---

## 📋 目录

1. [环境要求](#环境要求)
2. [快速开始](#快速开始)
3. [详细步骤](#详细步骤)
4. [脚本使用](#脚本使用)
5. [常见问题](#常见问题)
6. [Windows 构建指引](#windows-构建指引)
7. [Windows 命令行构建环境配置](#windows-命令行构建环境配置)

---

## 🔧 环境要求

### 必需软件
- **DevEco Studio NEXT** (最新版本)
- **HarmonyOS NEXT SDK** (API 22+)
- **macOS** (推荐) 或 Windows

### 硬件要求
- **HarmonyOS NEXT 真机** 或 **模拟器**
- 至少 8GB RAM
- 至少 10GB 可用磁盘空间

---

## 🚀 快速开始

### 方式一：使用 DevEco Studio (推荐) ⭐

这是最简单和最可靠的方式：

```bash
# 1. 用 DevEco Studio 打开项目
open -a /Applications/DevEco-Studio.app /Users/bytedance/dev/huawei_sysinfo

# 2. 等待项目同步完成
# 3. 选择设备（模拟器或真机）
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

## 📝 详细步骤

### 第一步：打开项目

1. 启动 **DevEco Studio NEXT**
2. 选择 **File** → **Open**
3. 选择项目目录：`/Users/bytedance/dev/huawei_sysinfo`
4. 点击 **OK**

### 第二步：等待项目同步

DevEco Studio 会自动：
- 索引项目文件
- 同步依赖
- 配置构建环境
- 迁移项目结构（如需要）

**等待提示**：
- 底部状态栏显示进度
- 可能需要 1-5 分钟
- 首次打开可能需要更长时间

### 第三步：配置签名（如需要）

如果构建提示需要签名：

1. 打开 **File** → **Project Structure**
2. 选择 **Signing Configs**
3. 配置签名证书（或使用自动签名）

**注意**：模拟器通常不需要签名。

### 第四步：选择设备

在 DevEco Studio 顶部工具栏：

1. 点击设备下拉菜单
2. 选择你的设备：
   - **模拟器**: 如 `127.0.0.1:5555`
   - **真机**: 连接的 HarmonyOS 设备

### 第五步：运行项目

点击以下任一方式运行：

1. **工具栏按钮**: 点击绿色 ▶️ 按钮
2. **快捷键**: 按 `Shift + F10`
3. **菜单**: **Run** → **Run 'entry'**

### 第六步：查看运行结果

- 应用会自动安装到设备
- 应用会自动启动
- 可以在 **Logcat** 中查看日志

---

## 🛠️ 脚本使用

项目提供了三个辅助脚本：

### 1. sync.sh - 环境检查脚本

```bash
./scripts/sync.sh
```

功能：
- 检查 DevEco Studio 是否安装
- 检查 HDC 工具
- 检查连接的设备
- 检查项目结构

### 2. build.sh - 构建指引脚本

```bash
./scripts/build.sh
```

功能：
- 显示构建步骤说明
- 提供快速操作命令

### 3. install.sh - HAP 安装脚本

```bash
./scripts/install.sh
```

功能：
- 查找生成的 HAP 文件
- 安装到已连接的设备

**注意**：需要先用 DevEco Studio 构建生成 HAP 文件。

---

## ❓ 常见问题

### Q1: 项目打开后提示需要迁移？

**A**: 这是正常的。点击 **Migrate** 按钮，DevEco Studio 会自动完成迁移。

### Q2: 构建失败，提示 SDK 版本不匹配？

**A**: 
1. 打开 **File** → **Project Structure**
2. 选择 **Project** → **SDK**
3. 选择正确的 HarmonyOS NEXT SDK
4. 点击 **Apply** 和 **OK**

### Q3: 找不到设备？

**A**: 
1. 检查模拟器是否启动
2. 检查 USB 连接（真机）
3. 运行 `./scripts/sync.sh` 检查
4. 重启 HDC 服务：`hdc kill && hdc start`

### Q4: 签名错误？

**A**:
1. 打开 **File** → **Project Structure**
2. 选择 **Signing Configs**
3. 勾选 **Automatically generate signature**
4. 点击 **Apply**

### Q5: 应用安装失败？

**A**:
1. 确保设备有足够空间
2. 卸载旧版本应用
3. 检查设备是否允许安装未知来源应用

---

## 📚 更多资源

- [HarmonyOS 官方文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/)
- [DevEco Studio 使用指南](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-instruction-0000001053541141)
- [ArkTS 语言参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-language-basic-0000001774280802)

---

## 💡 提示

- 首次构建可能需要较长时间，请耐心等待
- 推荐使用模拟器进行快速开发调试
- 真机测试需要配置签名
- 定期更新 DevEco Studio 和 SDK 到最新版本

---

## 🪟 Windows 构建指引

### 方式一：使用 DevEco Studio (推荐) ⭐

Windows 上推荐使用 DevEco Studio 进行构建：

1. **打开项目**
   - 启动 DevEco Studio
   - 选择 **File** → **Open**
   - 选择项目目录：`E:\dev\source\SysPulse`
   - 点击 **OK**

2. **等待项目同步**
   - DevEco Studio 会自动索引项目、同步依赖
   - 首次可能需要 1-5 分钟

3. **配置签名**
   - 打开 **File** → **Project Structure**
   - 选择 **Project** → **Signing Configs**
   - 勾选 **Automatically generate signature**
   - 点击 **Apply**

4. **选择设备**
   - 连接 HarmonyOS 真机或启动模拟器
   - 在工具栏选择设备

5. **运行项目**
   - 点击绿色 ▶️ 按钮
   - 或按 `Shift + F10`

### 方式二：使用构建脚本

项目提供了 Windows 构建脚本 `build_and_run.bat`：

```powershell
# 进入项目目录
cd E:\dev\source\SysPulse

# 运行构建脚本
.\build_and_run.bat
```

**脚本功能：**
- ✅ 自动检测 DevEco Studio 环境
- ✅ 自动检测连接的设备
- ✅ 如果 HAP 文件存在，跳过构建直接安装
- ✅ 构建失败时提供 DevEco Studio 操作指引
- ✅ 自动安装并启动应用

**注意事项：**
- 命令行构建需要完整的 HarmonyOS SDK 环境
- 如果命令行构建失败，请使用 DevEco Studio 构建
- 脚本会自动检测已构建的 HAP 文件

### 手动命令行操作

```powershell
# 检查设备连接
hdc list targets

# 安装 HAP（如果已有构建文件）
hdc install -r entry\build\default\outputs\default\entry-default-signed.hap

# 启动应用
hdc shell aa start -a EntryAbility -b com.huawei.sysinfo

# 查看日志
hdc shell hilog -T SysInfo
```

### Windows 常见问题

**Q: 命令行构建提示 "SDK component missing"？**

A: 命令行环境缺少 HarmonyOS SDK 组件。请使用 DevEco Studio 构建，或在 DevEco Studio 中下载完整的 HarmonyOS SDK。

**Q: hdc 命令找不到？**

A: 将 DevEco Studio 的 toolchains 目录添加到 PATH：
```
E:\dev\DevEco Studio\sdk\default\openharmony\toolchains
```

**Q: 签名错误？**

A: 在 DevEco Studio 中配置自动签名：
1. File → Project Structure → Signing Configs
2. 勾选 "Automatically generate signature"
3. Apply 后重新构建

---

## 🔧 Windows 命令行构建环境配置

如果需要在 Windows 命令行中直接运行 `hvigorw` 构建，需要正确配置以下环境变量：

### 必需环境变量

```powershell
# SDK 根目录（注意：指向 sdk 目录，不是 sdk\default）
set DEVECO_SDK_HOME=E:\dev\DevEco Studio\sdk

# Node.js 路径
set NODE_HOME=E:\dev\DevEco Studio\tools\node

# Java 路径（DevEco Studio 自带的 JBR）
set JAVA_HOME=E:\dev\DevEco Studio\jbr

# 添加到 PATH
set PATH=%NODE_HOME%;%JAVA_HOME%\bin;%PATH%
```

### 常见问题与解决方案

| 错误信息 | 原因 | 解决方案 |
|---------|------|---------|
| `SDK component missing` | `DEVECO_SDK_HOME` 指向错误 | 应指向 `sdk` 目录，不是 `sdk\default` 或 `sdk\default\openharmony` |
| `spawn java ENOENT` | 找不到 Java | 添加 `JAVA_HOME` 指向 `jbr` 目录 |
| `hvigorw 不是内部命令` | 未找到 hvigorw | 使用完整路径或添加到 PATH |

### 完整构建示例

```powershell
# 设置环境变量
set DEVECO_STUDIO=E:\dev\DevEco Studio
set DEVECO_SDK_HOME=%DEVECO_STUDIO%\sdk
set NODE_HOME=%DEVECO_STUDIO%\tools\node
set JAVA_HOME=%DEVECO_STUDIO%\jbr
set PATH=%NODE_HOME%;%JAVA_HOME%\bin;%PATH%

# 进入项目目录
cd E:\dev\source\SysPulse

# 构建项目
%DEVECO_STUDIO%\tools\hvigor\bin\hvigorw.bat assembleHap --no-daemon

# 安装到设备
%DEVECO_STUDIO%\sdk\default\openharmony\toolchains\hdc.exe install -r entry\build\default\outputs\default\entry-default-signed.hap

# 启动应用
%DEVECO_STUDIO%\sdk\default\openharmony\toolchains\hdc.exe shell aa start -a EntryAbility -b com.huawei.sysinfo
```

### 使用一键脚本

项目已提供配置好的脚本 `build_and_run.bat`，直接运行即可：

```powershell
cd E:\dev\source\SysPulse
.\build_and_run.bat
```

脚本会自动：
1. 检测 DevEco Studio 环境
2. 设置正确的环境变量
3. 检测设备（优先真机）
4. 清理缓存并构建
5. 安装并启动应用

---

*文档版本: v1.2*  
*最后更新: 2026-03-14*
