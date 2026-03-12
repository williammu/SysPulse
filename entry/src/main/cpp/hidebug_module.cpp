#include "hidebug_module.h"
#include <hidebug/hidebug.h>
#include <hilog/log.h>
#include <string>
#include <vector>

// 使用标准的 OH_LOG_Print 接口
#define LOG_TAG "SysInfoHiDebug"
#define LOG_PRINT_DOMAIN 0x0000

namespace SysInfo {

// 辅助函数：创建 NAPI 对象
static napi_value CreateObject(napi_env env) {
    napi_value obj;
    napi_create_object(env, &obj);
    return obj;
}

// 辅助函数：设置对象属性
static void SetProperty(napi_env env, napi_value obj, const char* key, napi_value value) {
    napi_set_named_property(env, obj, key, value);
}

// 辅助函数：创建字符串
static napi_value CreateString(napi_env env, const char* str) {
    napi_value result;
    napi_create_string_utf8(env, str, NAPI_AUTO_LENGTH, &result);
    return result;
}

// 辅助函数：创建 double
static napi_value CreateDouble(napi_env env, double value) {
    napi_value result;
    napi_create_double(env, value, &result);
    return result;
}

// 辅助函数：创建 int64
static napi_value CreateInt64(napi_env env, int64_t value) {
    napi_value result;
    napi_create_int64(env, value, &result);
    return result;
}

// 辅助函数：创建 bool
static napi_value CreateBool(napi_env env, bool value) {
    napi_value result;
    napi_get_boolean(env, value, &result);
    return result;
}

napi_value GetSystemMemInfo(napi_env env, napi_callback_info info) {
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "GetSystemMemInfo called");
    
    napi_value result = CreateObject(env);
    
    HiDebug_SystemMemInfo memInfo;
    OH_HiDebug_GetSystemMemInfo(&memInfo);
    
    // 根据实际头文件：totalMem, freeMem, availableMem (单位 KB)
    SetProperty(env, result, "total", CreateInt64(env, static_cast<int64_t>(memInfo.totalMem) * 1024));
    SetProperty(env, result, "available", CreateInt64(env, static_cast<int64_t>(memInfo.availableMem) * 1024));
    SetProperty(env, result, "free", CreateInt64(env, static_cast<int64_t>(memInfo.freeMem) * 1024));
    SetProperty(env, result, "success", CreateBool(env, true));
    
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "SystemMemInfo: total=%{public}lu KB, available=%{public}lu KB", 
                 memInfo.totalMem, memInfo.availableMem);
    
    return result;
}

napi_value GetAppMemInfo(napi_env env, napi_callback_info info) {
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "GetAppMemInfo called");
    
    napi_value result = CreateObject(env);
    
    HiDebug_NativeMemInfo nativeMemInfo;
    OH_HiDebug_GetAppNativeMemInfo(&nativeMemInfo);
    
    // 单位 KB，转换为字节
    SetProperty(env, result, "pss", CreateInt64(env, static_cast<int64_t>(nativeMemInfo.pss) * 1024));
    SetProperty(env, result, "vss", CreateInt64(env, static_cast<int64_t>(nativeMemInfo.vss) * 1024));
    SetProperty(env, result, "rss", CreateInt64(env, static_cast<int64_t>(nativeMemInfo.rss) * 1024));
    SetProperty(env, result, "sharedClean", CreateInt64(env, static_cast<int64_t>(nativeMemInfo.sharedClean) * 1024));
    SetProperty(env, result, "sharedDirty", CreateInt64(env, static_cast<int64_t>(nativeMemInfo.sharedDirty) * 1024));
    SetProperty(env, result, "privateClean", CreateInt64(env, static_cast<int64_t>(nativeMemInfo.privateClean) * 1024));
    SetProperty(env, result, "privateDirty", CreateInt64(env, static_cast<int64_t>(nativeMemInfo.privateDirty) * 1024));
    SetProperty(env, result, "success", CreateBool(env, true));
    
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "AppMemInfo: pss=%{public}lu KB, vss=%{public}lu KB, rss=%{public}lu KB", 
                 nativeMemInfo.pss, nativeMemInfo.vss, nativeMemInfo.rss);
    
    return result;
}

napi_value GetMemoryLimit(napi_env env, napi_callback_info info) {
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "GetMemoryLimit called");
    
    napi_value result = CreateObject(env);
    
    HiDebug_MemoryLimit memLimit;
    OH_HiDebug_GetAppMemoryLimit(&memLimit);
    
    // 单位 KB
    SetProperty(env, result, "rssLimit", CreateInt64(env, static_cast<int64_t>(memLimit.rssLimit) * 1024));
    SetProperty(env, result, "vssLimit", CreateInt64(env, static_cast<int64_t>(memLimit.vssLimit) * 1024));
    SetProperty(env, result, "success", CreateBool(env, true));
    
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "MemoryLimit: rssLimit=%{public}lu KB, vssLimit=%{public}lu KB", 
                 memLimit.rssLimit, memLimit.vssLimit);
    
    return result;
}

napi_value GetSystemCpuUsage(napi_env env, napi_callback_info info) {
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "GetSystemCpuUsage called");
    
    napi_value result = CreateObject(env);
    
    double cpuUsage = OH_HiDebug_GetSystemCpuUsage();
    
    SetProperty(env, result, "usage", CreateDouble(env, cpuUsage));
    SetProperty(env, result, "percentage", CreateDouble(env, cpuUsage * 100));
    SetProperty(env, result, "success", CreateBool(env, true));
    
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "SystemCpuUsage: %{public}.2f%%", cpuUsage * 100);
    
    return result;
}

napi_value GetAppCpuUsage(napi_env env, napi_callback_info info) {
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "GetAppCpuUsage called");
    
    napi_value result = CreateObject(env);
    
    double cpuUsage = OH_HiDebug_GetAppCpuUsage();
    
    SetProperty(env, result, "usage", CreateDouble(env, cpuUsage));
    SetProperty(env, result, "percentage", CreateDouble(env, cpuUsage * 100));
    SetProperty(env, result, "success", CreateBool(env, true));
    
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "AppCpuUsage: %{public}.2f%%", cpuUsage * 100);
    
    return result;
}

napi_value GetCpuUsageAll(napi_env env, napi_callback_info info) {
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "GetCpuUsageAll called");
    
    napi_value result = CreateObject(env);
    
    // 获取应用所有线程的 CPU 使用率
    HiDebug_ThreadCpuUsagePtr threadCpuUsage = OH_HiDebug_GetAppThreadCpuUsage();
    
    if (threadCpuUsage == nullptr) {
        OH_LOG_Print(LOG_APP, LOG_ERROR, LOG_PRINT_DOMAIN, LOG_TAG, "GetCpuUsageAll: threadCpuUsage is null");
        SetProperty(env, result, "success", CreateBool(env, false));
        SetProperty(env, result, "error", CreateString(env, "Failed to get thread CPU usage"));
        return result;
    }
    
    // 统计线程数量
    int32_t threadCount = 0;
    HiDebug_ThreadCpuUsagePtr current = threadCpuUsage;
    while (current != nullptr) {
        threadCount++;
        current = current->next;
    }
    
    SetProperty(env, result, "threadCount", CreateInt64(env, threadCount));
    
    // 构建线程数组
    napi_value threadsArray;
    napi_create_array(env, &threadsArray);
    
    current = threadCpuUsage;
    int32_t index = 0;
    while (current != nullptr && index < 100) {
        napi_value threadObj = CreateObject(env);
        SetProperty(env, threadObj, "threadId", CreateInt64(env, current->threadId));
        SetProperty(env, threadObj, "usage", CreateDouble(env, current->cpuUsage));
        SetProperty(env, threadObj, "percentage", CreateDouble(env, current->cpuUsage * 100));
        napi_set_element(env, threadsArray, index, threadObj);
        
        current = current->next;
        index++;
    }
    
    SetProperty(env, result, "threads", threadsArray);
    SetProperty(env, result, "success", CreateBool(env, true));
    
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "CpuUsageAll: threadCount=%{public}d", threadCount);
    
    // 释放内存
    OH_HiDebug_FreeThreadCpuUsage(&threadCpuUsage);
    
    return result;
}

napi_value GetGpuMemoryInfo(napi_env env, napi_callback_info info) {
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "GetGpuMemoryInfo called");
    
    napi_value result = CreateObject(env);
    
    // GPU 内存信息在 API 12 中可能不可用，返回不支持
    SetProperty(env, result, "success", CreateBool(env, false));
    SetProperty(env, result, "error", CreateString(env, "GPU memory info not available in this API version"));
    
    OH_LOG_Print(LOG_APP, LOG_WARN, LOG_PRINT_DOMAIN, LOG_TAG, "GpuMemoryInfo not available");
    
    return result;
}

napi_value InitHiDebugModule(napi_env env, napi_value exports) {
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "InitHiDebugModule called");
    
    napi_property_descriptor desc[] = {
        { "getSystemMemInfo", nullptr, GetSystemMemInfo, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "getAppMemInfo", nullptr, GetAppMemInfo, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "getMemoryLimit", nullptr, GetMemoryLimit, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "getSystemCpuUsage", nullptr, GetSystemCpuUsage, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "getAppCpuUsage", nullptr, GetAppCpuUsage, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "getCpuUsageAll", nullptr, GetCpuUsageAll, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "getGpuMemoryInfo", nullptr, GetGpuMemoryInfo, nullptr, nullptr, nullptr, napi_default, nullptr },
    };
    
    napi_define_properties(env, exports, sizeof(desc) / sizeof(desc[0]), desc);
    
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "HiDebug module initialized successfully");
    
    return exports;
}

} // namespace SysInfo
