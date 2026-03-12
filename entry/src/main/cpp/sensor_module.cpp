#include "sensor_module.h"

namespace SysInfo {

// 辅助函数
static napi_value CreateObject(napi_env env) {
    napi_value obj;
    napi_create_object(env, &obj);
    return obj;
}

static void SetProperty(napi_env env, napi_value obj, const char* key, napi_value value) {
    napi_set_named_property(env, obj, key, value);
}

static napi_value CreateString(napi_env env, const char* str) {
    napi_value result;
    napi_create_string_utf8(env, str, NAPI_AUTO_LENGTH, &result);
    return result;
}

static napi_value CreateBool(napi_env env, bool value) {
    napi_value result;
    napi_get_boolean(env, value, &result);
    return result;
}

// Sensor 模块暂不支持 - 返回空实现
napi_value GetAllSensorInfos(napi_env env, napi_callback_info info) {
    napi_value result = CreateObject(env);
    SetProperty(env, result, "success", CreateBool(env, false));
    SetProperty(env, result, "error", CreateString(env, "Sensor API not available in this build"));
    return result;
}

napi_value GetAccelerometerData(napi_env env, napi_callback_info info) {
    napi_value result = CreateObject(env);
    SetProperty(env, result, "success", CreateBool(env, false));
    SetProperty(env, result, "error", CreateString(env, "Sensor API not available"));
    return result;
}

napi_value GetGyroscopeData(napi_env env, napi_callback_info info) {
    napi_value result = CreateObject(env);
    SetProperty(env, result, "success", CreateBool(env, false));
    SetProperty(env, result, "error", CreateString(env, "Sensor API not available"));
    return result;
}

napi_value GetMagnetometerData(napi_env env, napi_callback_info info) {
    napi_value result = CreateObject(env);
    SetProperty(env, result, "success", CreateBool(env, false));
    SetProperty(env, result, "error", CreateString(env, "Sensor API not available"));
    return result;
}

napi_value GetLightData(napi_env env, napi_callback_info info) {
    napi_value result = CreateObject(env);
    SetProperty(env, result, "success", CreateBool(env, false));
    SetProperty(env, result, "error", CreateString(env, "Sensor API not available"));
    return result;
}

napi_value GetProximityData(napi_env env, napi_callback_info info) {
    napi_value result = CreateObject(env);
    SetProperty(env, result, "success", CreateBool(env, false));
    SetProperty(env, result, "error", CreateString(env, "Sensor API not available"));
    return result;
}

napi_value GetBarometerData(napi_env env, napi_callback_info info) {
    napi_value result = CreateObject(env);
    SetProperty(env, result, "success", CreateBool(env, false));
    SetProperty(env, result, "error", CreateString(env, "Sensor API not available"));
    return result;
}

napi_value GetTemperatureData(napi_env env, napi_callback_info info) {
    napi_value result = CreateObject(env);
    SetProperty(env, result, "success", CreateBool(env, false));
    SetProperty(env, result, "error", CreateString(env, "Sensor API not available"));
    return result;
}

napi_value GetHumidityData(napi_env env, napi_callback_info info) {
    napi_value result = CreateObject(env);
    SetProperty(env, result, "success", CreateBool(env, false));
    SetProperty(env, result, "error", CreateString(env, "Sensor API not available"));
    return result;
}

napi_value InitSensorModule(napi_env env, napi_value exports) {
    napi_property_descriptor desc[] = {
        { "getAllSensorInfos", nullptr, GetAllSensorInfos, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "getAccelerometerData", nullptr, GetAccelerometerData, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "getGyroscopeData", nullptr, GetGyroscopeData, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "getMagnetometerData", nullptr, GetMagnetometerData, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "getLightData", nullptr, GetLightData, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "getProximityData", nullptr, GetProximityData, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "getBarometerData", nullptr, GetBarometerData, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "getTemperatureData", nullptr, GetTemperatureData, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "getHumidityData", nullptr, GetHumidityData, nullptr, nullptr, nullptr, napi_default, nullptr },
    };
    
    napi_define_properties(env, exports, sizeof(desc) / sizeof(desc[0]), desc);
    
    return exports;
}

} // namespace SysInfo
