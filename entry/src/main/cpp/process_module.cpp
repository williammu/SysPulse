#include "process_module.h"
#include <hilog/log.h>
#include <string>
#include <fstream>
#include <sstream>
#include <dirent.h>
#include <vector>
#include <algorithm>

#define LOG_TAG "SysInfoProcess"
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

// 辅助函数：创建 int32
static napi_value CreateInt32(napi_env env, int32_t value) {
    napi_value result;
    napi_create_int32(env, value, &result);
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

// 辅助函数：创建数组
static napi_value CreateArray(napi_env env) {
    napi_value arr;
    napi_create_array(env, &arr);
    return arr;
}

// 读取文件内容
static std::string ReadFile(const char* path) {
    std::ifstream file(path);
    if (!file.is_open()) {
        return "";
    }
    std::stringstream buffer;
    buffer << file.rdbuf();
    return buffer.str();
}

// 解析 /proc/[pid]/stat 获取进程信息
struct ProcessInfo {
    int pid;
    std::string name;
    char state;
    long utime;
    long stime;
    long cutime;
    long cstime;
};

static bool ParseProcessStat(int pid, ProcessInfo& info) {
    char path[256];
    snprintf(path, sizeof(path), "/proc/%d/stat", pid);
    
    std::string content = ReadFile(path);
    if (content.empty()) {
        return false;
    }
    
    // 解析 stat 文件格式: pid (name) state ppid pgrp session tty_nr tpgid flags minflt cminflt majflt cmajflt utime stime cutime cstime ...
    info.pid = pid;
    
    // 找到括号中的进程名
    size_t nameStart = content.find('(');
    size_t nameEnd = content.find(')', nameStart);
    if (nameStart != std::string::npos && nameEnd != std::string::npos) {
        info.name = content.substr(nameStart + 1, nameEnd - nameStart - 1);
    }
    
    // 解析后面的字段
    std::string afterName = content.substr(nameEnd + 2); // 跳过 ") "
    std::istringstream iss(afterName);
    std::string field;
    int fieldIndex = 0;
    
    while (iss >> field) {
        switch (fieldIndex) {
            case 0: // state
                if (!field.empty()) info.state = field[0];
                break;
            case 11: // utime
                info.utime = atol(field.c_str());
                break;
            case 12: // stime
                info.stime = atol(field.c_str());
                break;
            case 13: // cutime
                info.cutime = atol(field.c_str());
                break;
            case 14: // cstime
                info.cstime = atol(field.c_str());
                break;
        }
        fieldIndex++;
    }
    
    return true;
}

// 读取 /proc/stat 获取系统 CPU 时间
static bool ReadSystemCpuTime(long& user, long& nice, long& system, long& idle) {
    std::string content = ReadFile("/proc/stat");
    if (content.empty()) {
        return false;
    }
    
    std::istringstream iss(content);
    std::string line;
    while (std::getline(iss, line)) {
        if (line.find("cpu ") == 0) { // 注意有空格，表示总体 CPU
            std::istringstream cpuIss(line);
            std::string cpu;
            cpuIss >> cpu >> user >> nice >> system >> idle;
            return true;
        }
    }
    return false;
}

// 获取进程列表
static std::vector<int> GetProcessList() {
    std::vector<int> processes;
    DIR* dir = opendir("/proc");
    if (!dir) {
        return processes;
    }
    
    struct dirent* entry;
    while ((entry = readdir(dir)) != nullptr) {
        // 检查是否是数字（PID）
        if (entry->d_type == DT_DIR) {
            char* endptr;
            long pid = strtol(entry->d_name, &endptr, 10);
            if (*endptr == '\0' && pid > 0) {
                processes.push_back(static_cast<int>(pid));
            }
        }
    }
    
    closedir(dir);
    return processes;
}

// 获取所有进程信息
napi_value GetAllProcessesInfo(napi_env env, napi_callback_info info) {
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "GetAllProcessesInfo called");
    
    napi_value result = CreateObject(env);
    
    // 获取进程列表
    std::vector<int> processes = GetProcessList();
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "Found %{public}zu processes", processes.size());
    
    // 创建进程数组
    napi_value processesArray = CreateArray(env);
    int index = 0;
    int successCount = 0;
    
    // 只获取前 50 个进程，避免性能问题
    int maxProcesses = std::min(static_cast<int>(processes.size()), 50);
    
    for (int i = 0; i < maxProcesses; i++) {
        ProcessInfo procInfo;
        if (ParseProcessStat(processes[i], procInfo)) {
            napi_value procObj = CreateObject(env);
            SetProperty(env, procObj, "pid", CreateInt32(env, procInfo.pid));
            SetProperty(env, procObj, "name", CreateString(env, procInfo.name.c_str()));
            SetProperty(env, procObj, "state", CreateString(env, std::string(1, procInfo.state).c_str()));
            SetProperty(env, procObj, "utime", CreateInt64(env, procInfo.utime));
            SetProperty(env, procObj, "stime", CreateInt64(env, procInfo.stime));
            
            napi_set_element(env, processesArray, index++, procObj);
            successCount++;
        }
    }
    
    SetProperty(env, result, "processes", processesArray);
    SetProperty(env, result, "count", CreateInt32(env, successCount));
    SetProperty(env, result, "total", CreateInt32(env, static_cast<int>(processes.size())));
    SetProperty(env, result, "success", CreateBool(env, successCount > 0));
    
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, 
                 "GetAllProcessesInfo: success=%{public}d, count=%{public}d", 
                 successCount, static_cast<int>(processes.size()));
    
    return result;
}

napi_value InitProcessModule(napi_env env, napi_value exports) {
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "InitProcessModule called");
    
    napi_property_descriptor desc[] = {
        { "getAllProcessesInfo", nullptr, GetAllProcessesInfo, nullptr, nullptr, nullptr, napi_default, nullptr },
    };
    
    napi_define_properties(env, exports, sizeof(desc) / sizeof(desc[0]), desc);
    
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "Process module initialized successfully");
    
    return exports;
}

} // namespace SysInfo
