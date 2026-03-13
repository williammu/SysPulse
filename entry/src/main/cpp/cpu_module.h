#ifndef CPU_MODULE_H
#define CPU_MODULE_H

#include <napi/native_api.h>
#include <unistd.h>

namespace SysInfo {

napi_value GetCpuInfo(napi_env env, napi_callback_info info);
napi_value InitCpuModule(napi_env env, napi_value exports);

} // namespace SysInfo

#endif // CPU_MODULE_H
