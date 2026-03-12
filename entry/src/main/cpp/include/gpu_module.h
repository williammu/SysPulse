#ifndef GPU_MODULE_H
#define GPU_MODULE_H

#include <string>
#include <vector>

// GPU 信息结构体
struct GpuInfo {
    // 基本信息
    std::string vendor;
    std::string renderer;
    std::string version;
    std::string shadingLanguageVersion;
    std::string extensions;
    
    // 纹理限制
    int maxTextureSize;
    int maxCubeMapTextureSize;
    int maxRenderbufferSize;
    int maxTextureImageUnits;
    int maxVertexTextureImageUnits;
    int maxCombinedTextureImageUnits;
    
    // 视口和渲染限制
    int maxViewportWidth;
    int maxViewportHeight;
    float aliasedLineWidthRange[2];
    float aliasedPointSizeRange[2];
    
    // 着色器限制
    int maxVertexAttribs;
    int maxVertexUniformVectors;
    int maxFragmentUniformVectors;
    int maxVaryingVectors;
    int maxUniformBufferBindings;
    int maxUniformBlockSize;
    
    // 其他限制
    int maxDrawBuffers;
    int maxColorAttachments;
    int maxSamples;
    int maxElementIndex;
    int numProgramBinaryFormats;
    int numShaderBinaryFormats;
    int numExtensions;
    
    // 压缩纹理格式
    std::vector<int> compressedTextureFormats;
    
    bool success;
    std::string error;
};

// 获取 GPU 信息
GpuInfo GetGpuInfo();

#endif // GPU_MODULE_H
