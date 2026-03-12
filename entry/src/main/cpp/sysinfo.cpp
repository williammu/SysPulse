#include <napi/native_api.h>
#include "hidebug_module.h"
#include "sensor_module.h"

namespace SysInfo {

static napi_value SysInfoInit(napi_env env, napi_value exports) {
    // 初始化 HiDebug 模块
    InitHiDebugModule(env, exports);
    
    // 初始化 Sensor 模块
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
    .nm_modname = "sysinfo",
    .nm_priv = nullptr,
    .reserved = { 0 },
};

extern "C" __attribute__((constructor)) void RegisterSysInfoModule() {
    napi_module_register(&sysinfoModule);
}
