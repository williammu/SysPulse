#ifndef HIDEBUG_MODULE_H
#define HIDEBUG_MODULE_H

#include <napi/native_api.h>

namespace SysInfo {

// HiDebug 模块初始化
napi_value InitHiDebugModule(napi_env env, napi_value exports);

// 获取系统内存信息
napi_value GetSystemMemInfo(napi_env env, napi_callback_info info);

// 获取应用内存信息
napi_value GetAppMemInfo(napi_env env, napi_callback_info info);

// 获取内存限制
napi_value GetMemoryLimit(napi_env env, napi_callback_info info);

// 获取系统 CPU 使用率
napi_value GetSystemCpuUsage(napi_env env, napi_callback_info info);

// 获取进程 CPU 使用率
napi_value GetAppCpuUsage(napi_env env, napi_callback_info info);

// 获取所有 CPU 核心使用率
napi_value GetCpuUsageAll(napi_env env, napi_callback_info info);

// 获取 GPU 内存信息
napi_value GetGpuMemoryInfo(napi_env env, napi_callback_info info);

} // namespace SysInfo

#endif // HIDEBUG_MODULE_H
