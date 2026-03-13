#include "cpu_module.h"
#include <hilog/log.h>
#include <string>
#include <fstream>
#include <sstream>
#include <vector>
#include <regex>
#include <sys/utsname.h>

#define LOG_TAG "SysInfoCpu"
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

// 辅助函数：创建 bool
static napi_value CreateBool(napi_env env, bool value) {
    napi_value result;
    napi_get_boolean(env, value, &result);
    return result;
}

// 读取文件内容
static std::string ReadFile(const char* path) {
    std::ifstream file(path);
    if (!file.is_open()) {
        OH_LOG_Print(LOG_APP, LOG_ERROR, LOG_PRINT_DOMAIN, LOG_TAG, "Failed to open file: %{public}s", path);
        return "";
    }
    std::stringstream buffer;
    buffer << file.rdbuf();
    return buffer.str();
}

// 从 /proc/cpuinfo 解析 CPU 信息
static bool ParseCpuInfo(std::string& model, int& cores, std::string& architecture) {
    std::string content = ReadFile("/proc/cpuinfo");
    if (content.empty()) {
        return false;
    }

    // 解析 CPU 型号 (model name)
    std::regex modelRegex("model name\\s*:\\s*(.+)", std::regex::icase);
    std::smatch modelMatch;
    if (std::regex_search(content, modelMatch, modelRegex)) {
        model = modelMatch[1].str();
        // 去除首尾空格
        model.erase(0, model.find_first_not_of(" \t\n\r"));
        model.erase(model.find_last_not_of(" \t\n\r") + 1);
    }

    // 解析 CPU 核心数 (processor 出现的次数)
    std::regex processorRegex("^processor", std::regex::icase | std::regex::multiline);
    auto processorsBegin = std::sregex_iterator(content.begin(), content.end(), processorRegex);
    auto processorsEnd = std::sregex_iterator();
    cores = std::distance(processorsBegin, processorsEnd);

    // 如果 processor 计数为 0，尝试解析 cpu cores
    if (cores == 0) {
        std::regex coresRegex("cpu cores\\s*:\\s*(\\d+)", std::regex::icase);
        std::smatch coresMatch;
        if (std::regex_search(content, coresMatch, coresRegex)) {
            cores = std::stoi(coresMatch[1].str());
        }
    }

    // 解析架构 (CPU architecture)
    std::regex archRegex("CPU architecture\\s*:\\s*(.+)", std::regex::icase);
    std::smatch archMatch;
    if (std::regex_search(content, archMatch, archRegex)) {
        architecture = archMatch[1].str();
        architecture.erase(0, architecture.find_first_not_of(" \t\n\r"));
        architecture.erase(architecture.find_last_not_of(" \t\n\r") + 1);
    }

    return !model.empty() || cores > 0;
}

// 获取 CPU 核心数（通过 sysconf）
static int GetCpuCores() {
    long nprocs = sysconf(_SC_NPROCESSORS_ONLN);
    if (nprocs < 1) {
        nprocs = sysconf(_SC_NPROCESSORS_CONF);
    }
    return static_cast<int>(nprocs > 0 ? nprocs : 0);
}

// 使用 uname 获取系统信息
static std::string GetUnameMachine() {
    struct utsname buf;
    if (uname(&buf) == 0) {
        OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG,
                     "uname: sysname=%{public}s, machine=%{public}s",
                     buf.sysname, buf.machine);
        return std::string(buf.machine);
    }
    return "";
}

napi_value GetCpuInfo(napi_env env, napi_callback_info info) {
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "GetCpuInfo called");

    napi_value result = CreateObject(env);

    std::string model;
    int cores = 0;
    std::string architecture;

    // 尝试从 /proc/cpuinfo 解析
    bool parsed = ParseCpuInfo(model, cores, architecture);

    // 如果解析失败或核心数为 0，使用 sysconf 获取核心数
    if (cores == 0) {
        cores = GetCpuCores();
    }

    // 如果型号为空，使用默认值
    if (model.empty()) {
        model = "未知";
    }

    // 如果架构为空，尝试使用 uname 获取
    if (architecture.empty()) {
        std::string unameMachine = GetUnameMachine();
        if (!unameMachine.empty()) {
            architecture = unameMachine;
        } else {
            architecture = "未知";
        }
    }

    SetProperty(env, result, "model", CreateString(env, model.c_str()));
    SetProperty(env, result, "cores", CreateInt32(env, cores));
    SetProperty(env, result, "architecture", CreateString(env, architecture.c_str()));
    SetProperty(env, result, "success", CreateBool(env, parsed || cores > 0));

    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG,
                 "CpuInfo: model=%{public}s, cores=%{public}d, arch=%{public}s",
                 model.c_str(), cores, architecture.c_str());

    return result;
}

napi_value InitCpuModule(napi_env env, napi_value exports) {
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "InitCpuModule called");

    napi_property_descriptor desc[] = {
        { "getCpuInfo", nullptr, GetCpuInfo, nullptr, nullptr, nullptr, napi_default, nullptr },
    };

    napi_define_properties(env, exports, sizeof(desc) / sizeof(desc[0]), desc);

    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, "Cpu module initialized successfully");

    return exports;
}

} // namespace SysInfo
