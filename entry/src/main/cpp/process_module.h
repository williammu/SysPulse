#ifndef PROCESS_MODULE_H
#define PROCESS_MODULE_H

#include <napi/native_api.h>

namespace SysInfo {

napi_value GetAllProcessesInfo(napi_env env, napi_callback_info info);
napi_value InitProcessModule(napi_env env, napi_value exports);

} // namespace SysInfo

#endif // PROCESS_MODULE_H
