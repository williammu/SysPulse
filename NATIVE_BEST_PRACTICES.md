# HarmonyOS Native API 开发最佳实践

## 1. 项目结构

```
entry/src/main/cpp/
├── CMakeLists.txt          # CMake 构建配置
├── sysinfo.cpp             # 主入口文件
├── hidebug_module.cpp      # HiDebug 模块实现
├── hidebug_module.h        # HiDebug 模块头文件
├── sensor_module.cpp       # Sensor 模块实现
├── sensor_module.h         # Sensor 模块头文件
└── types/libsysinfo/       # ArkTS 类型定义
    ├── index.d.ts          # 类型声明文件
    └── oh-package.json5    # 类型包配置
```

## 2. CMakeLists.txt 配置

### 2.1 基础配置
```cmake
cmake_minimum_required(VERSION 3.5.0)
project(sysinfo)

set(NATIVERENDER_ROOT_PATH ${CMAKE_CURRENT_SOURCE_DIR})

include_directories(${NATIVERENDER_ROOT_PATH}
                    ${NATIVERENDER_ROOT_PATH}/include)

# 查找 hilog 库
find_library(
    hilog-lib
    hilog_ndk.z
)

add_library(sysinfo SHARED 
    sysinfo.cpp 
    hidebug_module.cpp 
    sensor_module.cpp
)

target_link_libraries(sysinfo PUBLIC 
    ${hilog-lib} 
    libace_napi.z.so 
    libohhidebug.so 
    libc++.a
)
```

### 2.2 关键要点
- 使用 `find_library` 查找系统库
- 使用 `${hilog-lib}` 变量引用 hilog 库
- 必须链接 `libace_napi.z.so` 用于 NAPI 接口
- 必须链接 `libc++.a` 用于 C++ 标准库

## 3. Native 模块注册

### 3.1 主入口文件 (sysinfo.cpp)
```cpp
#include <napi/native_api.h>
#include "hidebug_module.h"
#include "sensor_module.h"

namespace SysInfo {

static napi_value SysInfoInit(napi_env env, napi_value exports) {
    // 初始化各子模块
    InitHiDebugModule(env, exports);
    InitSensorModule(env, exports);
    return exports;
}

} // namespace SysInfo

EXTERN_C_START
static napi_value Init(napi_env env, napi_value exports) {
    return SysInfo::SysInfoInit(env, exports);
}
EXTERN_C_END

static napi_module sysinfoModule = {
    .nm_version = 1,
    .nm_flags = 0,
    .nm_filename = nullptr,
    .nm_register_func = Init,
    .nm_modname = "sysinfo",  // 模块名，对应 so 文件名 libsysinfo.so
    .nm_priv = nullptr,
    .reserved = { 0 },
};

// 构造函数属性，自动注册模块
extern "C" __attribute__((constructor)) void RegisterSysInfoModule() {
    napi_module_register(&sysinfoModule);
}
```

### 3.2 关键要点
- 使用 `EXTERN_C_START/EXTERN_C_END` 包裹 C 接口
- `nm_modname` 必须与 so 文件名匹配（不含 lib 前缀和 .so 后缀）
- 使用 `__attribute__((constructor))` 实现自动注册

## 4. 日志输出

### 4.1 正确的日志宏定义
```cpp
#include <hilog/log.h>

#define LOG_TAG "YourTag"
#define LOG_PRINT_DOMAIN 0x0000

// 使用 OH_LOG_Print 输出日志
OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "Your message");

// 带参数的日志
OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, 
             "Value: %{public}d", value);
```

### 4.2 日志级别
- `LOG_DEBUG` - 调试信息
- `LOG_INFO` - 普通信息
- `LOG_WARN` - 警告信息
- `LOG_ERROR` - 错误信息
- `LOG_FATAL` - 致命错误

### 4.3 常见错误
❌ 错误：使用宏包装导致格式问题
```cpp
#define LOGI(...) OH_LOG_Info(LOG_APP, LOG_TAG, __VA_ARGS__)  // 错误！
```

✅ 正确：直接使用 OH_LOG_Print
```cpp
OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "message");
```

## 5. NAPI 函数实现

### 5.1 函数签名
```cpp
napi_value FunctionName(napi_env env, napi_callback_info info)
```

### 5.2 返回值处理
```cpp
napi_value result;
napi_create_object(env, &result);

// 设置属性
napi_value value;
napi_create_int64(env, 12345, &value);
napi_set_named_property(env, result, "key", value);

return result;
```

### 5.3 错误处理
```cpp
napi_value result;
napi_create_object(env, &result);

// 标记成功/失败
napi_value success;
napi_get_boolean(env, true, &success);
napi_set_named_property(env, result, "success", success);

// 错误信息
napi_value error;
napi_create_string_utf8(env, "error message", NAPI_AUTO_LENGTH, &error);
napi_set_named_property(env, result, "error", error);

return result;
```

## 6. 模块初始化

### 6.1 注册函数
```cpp
napi_value InitHiDebugModule(napi_env env, napi_value exports) {
    napi_property_descriptor desc[] = {
        { "getSystemMemInfo", nullptr, GetSystemMemInfo, 
          nullptr, nullptr, nullptr, napi_default, nullptr },
        { "getAppMemInfo", nullptr, GetAppMemInfo, 
          nullptr, nullptr, nullptr, napi_default, nullptr },
        // ... 更多函数
    };
    
    napi_define_properties(env, exports, 
                          sizeof(desc) / sizeof(desc[0]), desc);
    return exports;
}
```

### 6.2 描述符结构
```cpp
struct napi_property_descriptor {
    const char* utf8name;       // 函数名
    napi_value name;            // 或名称值
    napi_callback method;       // 回调函数
    napi_callback getter;       // getter
    napi_callback setter;       // setter
    napi_value value;           // 值
    napi_property_attributes attributes;  // 属性
    void* data;                 // 用户数据
};
```

## 7. ArkTS 类型定义

### 7.1 index.d.ts
```typescript
// 数据接口
export interface SystemMemInfo {
  total: number;
  available: number;
  free: number;
  success: boolean;
  error?: string;
}

// 函数声明
export function getSystemMemInfo(): SystemMemInfo;
export function getAppMemInfo(): AppMemInfo;
```

### 7.2 oh-package.json5
```json
{
  "name": "libsysinfo.so",
  "types": "./index.d.ts",
  "version": "1.0.0",
  "description": "Native API for SysInfo"
}
```

## 8. ArkTS 集成

### 8.1 导入 Native 模块
```typescript
import sysinfo from 'libsysinfo.so';
```

### 8.2 封装调用
```typescript
class NativeApi {
  getSystemMemInfo(): SystemMemInfo | null {
    try {
      return sysinfo.getSystemMemInfo() as SystemMemInfo;
    } catch (e) {
      hilog.error(0x0000, TAG, 'Error: %{public}s', String(e));
      return null;
    }
  }
}
```

## 9. 构建配置

### 9.1 entry/build-profile.json5
```json
{
  "apiType": "stageMode",
  "buildOption": {
    "externalNativeOptions": {
      "path": "./src/main/cpp/CMakeLists.txt",
      "arguments": "",
      "cppFlags": "-std=c++17"
    }
  },
  "targets": [
    {
      "name": "default",
      "runtimeOS": "HarmonyOS"
    }
  ]
}
```

### 9.2 entry/oh-package.json5
```json
{
  "name": "entry",
  "version": "1.0.0",
  "dependencies": {
    "libsysinfo.so": "file:./src/main/cpp/types/libsysinfo"
  }
}
```

## 10. 调试技巧

### 10.1 日志查看
```bash
# 清空日志
hdc shell hilog -r

# 实时查看日志（阻塞）
hdc shell hilog

# 一次性查看（非阻塞）
hdc shell hilog -x

# 过滤日志
hdc shell hilog -x | grep "YourTag"
```

### 10.2 常见问题

**问题1：Native 模块加载失败**
- 检查 `nm_modname` 是否与 so 文件名匹配
- 检查 CMakeLists.txt 中的库链接
- 查看日志中的加载错误

**问题2：日志不输出**
- 确保使用 `OH_LOG_Print` 而不是宏包装
- 检查日志级别设置
- 确保链接了 hilog 库

**问题3：类型不匹配**
- 检查 index.d.ts 中的类型定义
- 确保 Native 返回的数据结构与 ArkTS 期望的一致

## 11. 性能优化

### 11.1 避免频繁调用
```typescript
// 缓存结果
private cachedMemInfo: SystemMemInfo | null = null;

getSystemMemInfo(): SystemMemInfo | null {
  if (!this.cachedMemInfo) {
    this.cachedMemInfo = sysinfo.getSystemMemInfo();
  }
  return this.cachedMemInfo;
}
```

### 11.2 异步处理
```typescript
async loadNativeData(): Promise<void> {
  return new Promise((resolve) => {
    // 在后台线程执行 Native 调用
    const result = sysinfo.getSystemMemInfo();
    resolve();
  });
}
```

## 12. 安全注意事项

- 不要从 Native 层返回敏感信息
- 验证所有输入参数
- 使用 try-catch 处理异常
- 及时释放 Native 分配的内存

## 13. 参考资源

- [HarmonyOS Native API 文档](https://developer.harmonyos.com/)
- [HiDebug API 参考](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/hidebug-guidelines-0000000000000000)
- [NAPI 接口文档](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/napi-guidelines-0000000000000000)
