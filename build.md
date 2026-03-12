# SysInfo 构建和部署指南

## 环境要求

- **DevEco Studio**: 5.0.0 或更高版本
- **HarmonyOS SDK**: API 12 或更高版本
- **HDC 工具**: 随 DevEco Studio 一起安装
- **设备**: HarmonyOS NEXT 真机或模拟器

## 项目结构

```
huawei_sysinfo/
├── entry/                    # 主模块
│   ├── src/main/ets/         # ArkTS 源代码
│   │   ├── entryability/     # 应用入口
│   │   ├── pages/            # 页面文件
│   │   ├── components/       # 可复用组件
│   │   ├── utils/            # 工具类
│   │   └── model/            # 数据模型
│   └── build/                # 构建输出目录
├── build-profile.json5       # 构建配置
├── build_and_run.sh          # 一键构建脚本
└── debug.md                  # 调试指南
```

## 快速开始

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

### 方式二：手动构建

#### 1. 命令行构建

```bash
# 使用 hvigorw 构建
/Applications/DevEco-Studio.app/Contents/tools/hvigor/bin/hvigorw assembleHap --no-daemon
```

构建成功后，HAP 文件位于：
```
entry/build/default/outputs/default/entry-default-signed.hap
```

#### 2. DevEco Studio 构建

1. 打开 DevEco Studio
2. 导入项目
3. 点击菜单 `Build` → `Build Project`
4. 或使用快捷键 `Cmd+F9`

## 设备连接

### 查看已连接设备

```bash
# 列出所有设备
/Applications/DevEco-Studio.app/Contents/sdk/default/openharmony/toolchains/hdc list targets
```

输出示例：
```
127.0.0.1:5555          # 模拟器
2SX0224417010945        # 真机
```

### 指定设备操作

```bash
# 使用 -t 参数指定设备 ID
hdc -t <device-id> <command>
```

## 部署到设备

### 安装应用

```bash
# 安装到默认设备
hdc install entry/build/default/outputs/default/entry-default-signed.hap

# 安装到指定设备
hdc -t 2SX0224417010945 install entry/build/default/outputs/default/entry-default-signed.hap
```

### 卸载应用

```bash
# 卸载应用
hdc uninstall com.huawei.sysinfo

# 指定设备卸载
hdc -t 2SX0224417010945 uninstall com.huawei.sysinfo
```

### 启动应用

```bash
# 启动应用
hdc shell aa start -b com.huawei.sysinfo -a EntryAbility

# 指定设备启动
hdc -t 2SX0224417010945 shell aa start -b com.huawei.sysinfo -a EntryAbility
```

### 停止应用

```bash
# 停止应用
hdc shell aa stop -b com.huawei.sysinfo
```

## 完整部署流程示例

### 部署到真机

```bash
# 1. 检查设备连接
hdc list targets

# 2. 构建项目
/Applications/DevEco-Studio.app/Contents/tools/hvigor/bin/hvigorw assembleHap --no-daemon

# 3. 卸载旧版本（可选）
hdc -t 2SX0224417010945 uninstall com.huawei.sysinfo

# 4. 安装新版本
hdc -t 2SX0224417010945 install entry/build/default/outputs/default/entry-default-signed.hap

# 5. 启动应用
hdc -t 2SX0224417010945 shell aa start -b com.huawei.sysinfo -a EntryAbility

# 6. 查看日志
hdc -t 2SX0224417010945 shell "hilog -x | grep SysInfo"
```

### 部署到模拟器

```bash
# 1. 确保模拟器已启动
hdc list targets

# 2. 构建并安装
bash build_and_run.sh

# 或手动执行：
hdc -t 127.0.0.1:5555 install entry/build/default/outputs/default/entry-default-signed.hap
hdc -t 127.0.0.1:5555 shell aa start -b com.huawei.sysinfo -a EntryAbility
```

## 签名配置

### 自动签名（推荐）

1. 打开 DevEco Studio
2. 进入 `File` → `Project Structure` → `Project` → `Signing Configs`
3. 勾选 `Automatically generate signing materials`
4. 点击 `Apply` 保存

### 手动签名

编辑 `build-profile.json5`：

```json
{
  "app": {
    "signingConfigs": [
      {
        "name": "default",
        "type": "HarmonyOS",
        "material": {
          "certpath": "/path/to/your.cer",
          "keyAlias": "debugKey",
          "keyPassword": "your_key_password",
          "profile": "/path/to/your.p7b",
          "signAlg": "SHA256withECDSA",
          "storeFile": "/path/to/your.p12",
          "storePassword": "your_store_password"
        }
      }
    ]
  }
}
```

## 常见问题

### 1. 构建失败：签名错误

**错误信息**：`Failed :entry:default@SignHap`

**解决方法**：
- 在 DevEco Studio 中配置自动签名
- 或检查 `build-profile.json5` 中的签名配置

### 2. 安装失败：无签名

**错误信息**：`error: failed to install bundle. code:9568320 error: no signature file`

**解决方法**：
- 真机需要签名才能安装
- 在 DevEco Studio 中配置自动签名后重新构建

### 3. 安装失败：已存在相同包名

**错误信息**：`install bundle already exists`

**解决方法**：
```bash
# 先卸载旧版本
hdc uninstall com.huawei.sysinfo
# 再安装新版本
hdc install entry/build/default/outputs/default/entry-default-signed.hap
```

### 4. 设备未连接

**错误信息**：`ExecuteCommand need connect-key`

**解决方法**：
```bash
# 检查设备连接
hdc list targets

# 使用 -t 指定设备
hdc -t <device-id> install <hap-file>
```

### 5. 构建缓存问题

**解决方法**：
```bash
# 清理构建缓存
rm -rf entry/build
rm -rf .hvigor/cache

# 重新构建
hvigorw assembleHap --no-daemon
```

## 调试技巧

### 1. 实时查看日志

```bash
# 实时查看应用日志
hdc shell hilog -T SysInfo

# 非阻塞查看最近 100 条
hdc shell "hilog -x | grep SysInfo"
```

### 2. 清除日志缓冲区

```bash
hdc shell hilog -r
```

### 3. 导出日志到文件

```bash
hdc shell hilog -x -T SysInfo > app_log.txt
```

## 参考文档

- [HiLog 调试指南](./debug.md)
- [华为官方开发文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/)
