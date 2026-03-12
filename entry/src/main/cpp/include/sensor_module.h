#ifndef SENSOR_MODULE_H
#define SENSOR_MODULE_H

#include <napi/native_api.h>

namespace SysInfo {

// Sensor 模块初始化
napi_value InitSensorModule(napi_env env, napi_value exports);

// 获取所有传感器信息
napi_value GetAllSensorInfos(napi_env env, napi_callback_info info);

// 获取加速度计数据
napi_value GetAccelerometerData(napi_env env, napi_callback_info info);

// 获取陀螺仪数据
napi_value GetGyroscopeData(napi_env env, napi_callback_info info);

// 获取磁力计数据
napi_value GetMagnetometerData(napi_env env, napi_callback_info info);

// 获取光线传感器数据
napi_value GetLightData(napi_env env, napi_callback_info info);

// 获取距离传感器数据
napi_value GetProximityData(napi_env env, napi_callback_info info);

// 获取气压传感器数据
napi_value GetBarometerData(napi_env env, napi_callback_info info);

// 获取温度传感器数据
napi_value GetTemperatureData(napi_env env, napi_callback_info info);

// 获取湿度传感器数据
napi_value GetHumidityData(napi_env env, napi_callback_info info);

} // namespace SysInfo

#endif // SENSOR_MODULE_H
