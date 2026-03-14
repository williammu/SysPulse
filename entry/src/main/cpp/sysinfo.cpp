#include <napi/native_api.h>
#include <string>
#include "hidebug_module.h"
#include "sensor_module.h"
#include "gpu_module.h"
#include "cpu_module.h"
#include "process_module.h"

namespace SysInfo {

// GPU 信息获取接口
static napi_value GetGpuInfo(napi_env env, napi_callback_info info) {
    napi_value result;
    napi_create_object(env, &result);

    GpuInfo gpuInfo = ::GetGpuInfo();

    // success
    napi_value successValue;
    napi_get_boolean(env, gpuInfo.success, &successValue);
    napi_set_named_property(env, result, "success", successValue);

    // 基本信息
    napi_value vendorValue;
    napi_create_string_utf8(env, gpuInfo.vendor.c_str(), gpuInfo.vendor.length(), &vendorValue);
    napi_set_named_property(env, result, "vendor", vendorValue);

    napi_value rendererValue;
    napi_create_string_utf8(env, gpuInfo.renderer.c_str(), gpuInfo.renderer.length(), &rendererValue);
    napi_set_named_property(env, result, "renderer", rendererValue);

    napi_value versionValue;
    napi_create_string_utf8(env, gpuInfo.version.c_str(), gpuInfo.version.length(), &versionValue);
    napi_set_named_property(env, result, "version", versionValue);

    napi_value shadingVersionValue;
    napi_create_string_utf8(env, gpuInfo.shadingLanguageVersion.c_str(), 
                           gpuInfo.shadingLanguageVersion.length(), &shadingVersionValue);
    napi_set_named_property(env, result, "shadingLanguageVersion", shadingVersionValue);

    napi_value extensionsValue;
    napi_create_string_utf8(env, gpuInfo.extensions.c_str(), gpuInfo.extensions.length(), &extensionsValue);
    napi_set_named_property(env, result, "extensions", extensionsValue);

    // 纹理限制
    napi_value maxTextureSizeValue;
    napi_create_int32(env, gpuInfo.maxTextureSize, &maxTextureSizeValue);
    napi_set_named_property(env, result, "maxTextureSize", maxTextureSizeValue);

    napi_value maxCubeMapTextureSizeValue;
    napi_create_int32(env, gpuInfo.maxCubeMapTextureSize, &maxCubeMapTextureSizeValue);
    napi_set_named_property(env, result, "maxCubeMapTextureSize", maxCubeMapTextureSizeValue);

    napi_value maxRenderbufferSizeValue;
    napi_create_int32(env, gpuInfo.maxRenderbufferSize, &maxRenderbufferSizeValue);
    napi_set_named_property(env, result, "maxRenderbufferSize", maxRenderbufferSizeValue);

    napi_value maxTextureImageUnitsValue;
    napi_create_int32(env, gpuInfo.maxTextureImageUnits, &maxTextureImageUnitsValue);
    napi_set_named_property(env, result, "maxTextureImageUnits", maxTextureImageUnitsValue);

    napi_value maxVertexTextureImageUnitsValue;
    napi_create_int32(env, gpuInfo.maxVertexTextureImageUnits, &maxVertexTextureImageUnitsValue);
    napi_set_named_property(env, result, "maxVertexTextureImageUnits", maxVertexTextureImageUnitsValue);

    napi_value maxCombinedTextureImageUnitsValue;
    napi_create_int32(env, gpuInfo.maxCombinedTextureImageUnits, &maxCombinedTextureImageUnitsValue);
    napi_set_named_property(env, result, "maxCombinedTextureImageUnits", maxCombinedTextureImageUnitsValue);

    // 视口限制
    napi_value maxViewportWidthValue;
    napi_create_int32(env, gpuInfo.maxViewportWidth, &maxViewportWidthValue);
    napi_set_named_property(env, result, "maxViewportWidth", maxViewportWidthValue);

    napi_value maxViewportHeightValue;
    napi_create_int32(env, gpuInfo.maxViewportHeight, &maxViewportHeightValue);
    napi_set_named_property(env, result, "maxViewportHeight", maxViewportHeightValue);

    napi_value aliasedLineWidthRangeValue;
    napi_create_array(env, &aliasedLineWidthRangeValue);
    napi_value lineWidthMin, lineWidthMax;
    napi_create_double(env, gpuInfo.aliasedLineWidthRange[0], &lineWidthMin);
    napi_create_double(env, gpuInfo.aliasedLineWidthRange[1], &lineWidthMax);
    napi_set_element(env, aliasedLineWidthRangeValue, 0, lineWidthMin);
    napi_set_element(env, aliasedLineWidthRangeValue, 1, lineWidthMax);
    napi_set_named_property(env, result, "aliasedLineWidthRange", aliasedLineWidthRangeValue);

    napi_value aliasedPointSizeRangeValue;
    napi_create_array(env, &aliasedPointSizeRangeValue);
    napi_value pointSizeMin, pointSizeMax;
    napi_create_double(env, gpuInfo.aliasedPointSizeRange[0], &pointSizeMin);
    napi_create_double(env, gpuInfo.aliasedPointSizeRange[1], &pointSizeMax);
    napi_set_element(env, aliasedPointSizeRangeValue, 0, pointSizeMin);
    napi_set_element(env, aliasedPointSizeRangeValue, 1, pointSizeMax);
    napi_set_named_property(env, result, "aliasedPointSizeRange", aliasedPointSizeRangeValue);

    // 着色器限制
    napi_value maxVertexAttribsValue;
    napi_create_int32(env, gpuInfo.maxVertexAttribs, &maxVertexAttribsValue);
    napi_set_named_property(env, result, "maxVertexAttribs", maxVertexAttribsValue);

    napi_value maxVertexUniformVectorsValue;
    napi_create_int32(env, gpuInfo.maxVertexUniformVectors, &maxVertexUniformVectorsValue);
    napi_set_named_property(env, result, "maxVertexUniformVectors", maxVertexUniformVectorsValue);

    napi_value maxFragmentUniformVectorsValue;
    napi_create_int32(env, gpuInfo.maxFragmentUniformVectors, &maxFragmentUniformVectorsValue);
    napi_set_named_property(env, result, "maxFragmentUniformVectors", maxFragmentUniformVectorsValue);

    napi_value maxVaryingVectorsValue;
    napi_create_int32(env, gpuInfo.maxVaryingVectors, &maxVaryingVectorsValue);
    napi_set_named_property(env, result, "maxVaryingVectors", maxVaryingVectorsValue);

    napi_value maxUniformBufferBindingsValue;
    napi_create_int32(env, gpuInfo.maxUniformBufferBindings, &maxUniformBufferBindingsValue);
    napi_set_named_property(env, result, "maxUniformBufferBindings", maxUniformBufferBindingsValue);

    napi_value maxUniformBlockSizeValue;
    napi_create_int32(env, gpuInfo.maxUniformBlockSize, &maxUniformBlockSizeValue);
    napi_set_named_property(env, result, "maxUniformBlockSize", maxUniformBlockSizeValue);

    // 其他限制
    napi_value maxDrawBuffersValue;
    napi_create_int32(env, gpuInfo.maxDrawBuffers, &maxDrawBuffersValue);
    napi_set_named_property(env, result, "maxDrawBuffers", maxDrawBuffersValue);

    napi_value maxColorAttachmentsValue;
    napi_create_int32(env, gpuInfo.maxColorAttachments, &maxColorAttachmentsValue);
    napi_set_named_property(env, result, "maxColorAttachments", maxColorAttachmentsValue);

    napi_value maxSamplesValue;
    napi_create_int32(env, gpuInfo.maxSamples, &maxSamplesValue);
    napi_set_named_property(env, result, "maxSamples", maxSamplesValue);

    napi_value maxElementIndexValue;
    napi_create_int32(env, gpuInfo.maxElementIndex, &maxElementIndexValue);
    napi_set_named_property(env, result, "maxElementIndex", maxElementIndexValue);

    napi_value numProgramBinaryFormatsValue;
    napi_create_int32(env, gpuInfo.numProgramBinaryFormats, &numProgramBinaryFormatsValue);
    napi_set_named_property(env, result, "numProgramBinaryFormats", numProgramBinaryFormatsValue);

    napi_value numShaderBinaryFormatsValue;
    napi_create_int32(env, gpuInfo.numShaderBinaryFormats, &numShaderBinaryFormatsValue);
    napi_set_named_property(env, result, "numShaderBinaryFormats", numShaderBinaryFormatsValue);

    napi_value numExtensionsValue;
    napi_create_int32(env, gpuInfo.numExtensions, &numExtensionsValue);
    napi_set_named_property(env, result, "numExtensions", numExtensionsValue);

    // 压缩纹理格式
    napi_value compressedFormatsValue;
    napi_create_array(env, &compressedFormatsValue);
    for (size_t i = 0; i < gpuInfo.compressedTextureFormats.size(); i++) {
        napi_value formatValue;
        napi_create_int32(env, gpuInfo.compressedTextureFormats[i], &formatValue);
        napi_set_element(env, compressedFormatsValue, i, formatValue);
    }
    napi_set_named_property(env, result, "compressedTextureFormats", compressedFormatsValue);

    // error
    napi_value errorValue;
    napi_create_string_utf8(env, gpuInfo.error.c_str(), gpuInfo.error.length(), &errorValue);
    napi_set_named_property(env, result, "error", errorValue);

    return result;
}

static napi_value SysInfoInit(napi_env env, napi_value exports) {
    // 初始化 HiDebug 模块
    InitHiDebugModule(env, exports);
    
    // 初始化 Sensor 模块
    InitSensorModule(env, exports);

    // 初始化 CPU 模块
    InitCpuModule(env, exports);

    // 初始化 Process 模块
    InitProcessModule(env, exports);

    // 注册 GPU 信息获取接口
    napi_property_descriptor gpuInfoDesc = {
        .utf8name = "getGpuInfo",
        .method = GetGpuInfo,
        .getter = nullptr,
        .setter = nullptr,
        .value = nullptr,
        .attributes = napi_default,
        .data = nullptr
    };
    napi_define_properties(env, exports, 1, &gpuInfoDesc);
    
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
