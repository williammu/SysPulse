#include "gpu_module.h"
#include <EGL/egl.h>
#include <GLES3/gl3.h>
#include <hilog/log.h>
#include <sstream>

#undef LOG_TAG
#define LOG_TAG "GpuModule"
#define LOG_PRINT_DOMAIN 0x0000

GpuInfo GetGpuInfo() {
    GpuInfo info;
    info.success = false;
    
    // 初始化所有数值为 -1（表示未获取）
    info.maxTextureSize = -1;
    info.maxCubeMapTextureSize = -1;
    info.maxRenderbufferSize = -1;
    info.maxTextureImageUnits = -1;
    info.maxVertexTextureImageUnits = -1;
    info.maxCombinedTextureImageUnits = -1;
    info.maxViewportWidth = -1;
    info.maxViewportHeight = -1;
    info.aliasedLineWidthRange[0] = -1.0f;
    info.aliasedLineWidthRange[1] = -1.0f;
    info.aliasedPointSizeRange[0] = -1.0f;
    info.aliasedPointSizeRange[1] = -1.0f;
    info.maxVertexAttribs = -1;
    info.maxVertexUniformVectors = -1;
    info.maxFragmentUniformVectors = -1;
    info.maxVaryingVectors = -1;
    info.maxUniformBufferBindings = -1;
    info.maxUniformBlockSize = -1;
    info.maxDrawBuffers = -1;
    info.maxColorAttachments = -1;
    info.maxSamples = -1;
    info.maxElementIndex = -1;
    info.numProgramBinaryFormats = -1;
    info.numShaderBinaryFormats = -1;
    info.numExtensions = -1;

    // 1. 获取默认 EGL 显示连接
    EGLDisplay display = eglGetDisplay(EGL_DEFAULT_DISPLAY);
    if (display == EGL_NO_DISPLAY) {
        info.error = "Failed to get EGL display";
        OH_LOG_Print(LOG_APP, LOG_ERROR, LOG_PRINT_DOMAIN, LOG_TAG, 
                     "Failed to get EGL display");
        return info;
    }

    // 2. 初始化 EGL
    EGLint major, minor;
    if (!eglInitialize(display, &major, &minor)) {
        info.error = "Failed to initialize EGL";
        OH_LOG_Print(LOG_APP, LOG_ERROR, LOG_PRINT_DOMAIN, LOG_TAG, 
                     "Failed to initialize EGL");
        return info;
    }

    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, 
                 "EGL initialized: %d.%d", major, minor);

    // 3. 选择 EGL 配置
    EGLint configAttribs[] = {
        EGL_SURFACE_TYPE, EGL_PBUFFER_BIT,
        EGL_RENDERABLE_TYPE, EGL_OPENGL_ES3_BIT,
        EGL_RED_SIZE, 8,
        EGL_GREEN_SIZE, 8,
        EGL_BLUE_SIZE, 8,
        EGL_ALPHA_SIZE, 8,
        EGL_NONE
    };

    EGLConfig config;
    EGLint numConfigs;
    if (!eglChooseConfig(display, configAttribs, &config, 1, &numConfigs) || numConfigs < 1) {
        info.error = "Failed to choose EGL config";
        OH_LOG_Print(LOG_APP, LOG_ERROR, LOG_PRINT_DOMAIN, LOG_TAG, 
                     "Failed to choose EGL config");
        eglTerminate(display);
        return info;
    }

    // 4. 创建 Pbuffer 表面
    EGLint pbufferAttribs[] = {
        EGL_WIDTH, 1,
        EGL_HEIGHT, 1,
        EGL_NONE
    };

    EGLSurface surface = eglCreatePbufferSurface(display, config, pbufferAttribs);
    if (surface == EGL_NO_SURFACE) {
        info.error = "Failed to create EGL surface";
        OH_LOG_Print(LOG_APP, LOG_ERROR, LOG_PRINT_DOMAIN, LOG_TAG, 
                     "Failed to create EGL surface");
        eglTerminate(display);
        return info;
    }

    // 5. 创建 EGL 上下文（尝试 ES 3.0）
    EGLint contextAttribs[] = {
        EGL_CONTEXT_CLIENT_VERSION, 3,
        EGL_NONE
    };

    EGLContext context = eglCreateContext(display, config, EGL_NO_CONTEXT, contextAttribs);
    if (context == EGL_NO_CONTEXT) {
        // 回退到 ES 2.0
        contextAttribs[1] = 2;
        context = eglCreateContext(display, config, EGL_NO_CONTEXT, contextAttribs);
        if (context == EGL_NO_CONTEXT) {
            info.error = "Failed to create EGL context";
            OH_LOG_Print(LOG_APP, LOG_ERROR, LOG_PRINT_DOMAIN, LOG_TAG, 
                         "Failed to create EGL context");
            eglDestroySurface(display, surface);
            eglTerminate(display);
            return info;
        }
        OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, 
                     "Using OpenGL ES 2.0");
    } else {
        OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, 
                     "Using OpenGL ES 3.0");
    }

    // 6. 绑定上下文
    if (!eglMakeCurrent(display, surface, surface, context)) {
        info.error = "Failed to make EGL context current";
        OH_LOG_Print(LOG_APP, LOG_ERROR, LOG_PRINT_DOMAIN, LOG_TAG, 
                     "Failed to make EGL context current");
        eglDestroyContext(display, context);
        eglDestroySurface(display, surface);
        eglTerminate(display);
        return info;
    }

    // 7. 获取基本信息
    const char* vendor = reinterpret_cast<const char*>(glGetString(GL_VENDOR));
    const char* renderer = reinterpret_cast<const char*>(glGetString(GL_RENDERER));
    const char* version = reinterpret_cast<const char*>(glGetString(GL_VERSION));
    const char* shadingVersion = reinterpret_cast<const char*>(glGetString(GL_SHADING_LANGUAGE_VERSION));
    const char* extensions = reinterpret_cast<const char*>(glGetString(GL_EXTENSIONS));

    info.vendor = vendor ? vendor : "Unknown";
    info.renderer = renderer ? renderer : "Unknown";
    info.version = version ? version : "Unknown";
    info.shadingLanguageVersion = shadingVersion ? shadingVersion : "Unknown";
    info.extensions = extensions ? std::string(extensions).substr(0, 512) : "Unknown";

    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, 
                 "GPU: %s %s", info.vendor.c_str(), info.renderer.c_str());

    // 8. 获取纹理限制
    glGetIntegerv(GL_MAX_TEXTURE_SIZE, &info.maxTextureSize);
    glGetIntegerv(GL_MAX_CUBE_MAP_TEXTURE_SIZE, &info.maxCubeMapTextureSize);
    glGetIntegerv(GL_MAX_RENDERBUFFER_SIZE, &info.maxRenderbufferSize);
    glGetIntegerv(GL_MAX_TEXTURE_IMAGE_UNITS, &info.maxTextureImageUnits);
    glGetIntegerv(GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS, &info.maxVertexTextureImageUnits);
    glGetIntegerv(GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS, &info.maxCombinedTextureImageUnits);

    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, 
                 "Max Texture Size: %d", info.maxTextureSize);

    // 9. 获取视口限制
    GLint viewportDims[2];
    glGetIntegerv(GL_MAX_VIEWPORT_DIMS, viewportDims);
    info.maxViewportWidth = viewportDims[0];
    info.maxViewportHeight = viewportDims[1];

    glGetFloatv(GL_ALIASED_LINE_WIDTH_RANGE, info.aliasedLineWidthRange);
    glGetFloatv(GL_ALIASED_POINT_SIZE_RANGE, info.aliasedPointSizeRange);

    // 10. 获取着色器限制
    glGetIntegerv(GL_MAX_VERTEX_ATTRIBS, &info.maxVertexAttribs);
    glGetIntegerv(GL_MAX_VERTEX_UNIFORM_VECTORS, &info.maxVertexUniformVectors);
    glGetIntegerv(GL_MAX_FRAGMENT_UNIFORM_VECTORS, &info.maxFragmentUniformVectors);
    glGetIntegerv(GL_MAX_VARYING_VECTORS, &info.maxVaryingVectors);

    // OpenGL ES 3.0+ 才有的限制
    GLint majorVersion = 0;
    glGetIntegerv(GL_MAJOR_VERSION, &majorVersion);
    
    if (majorVersion >= 3) {
        glGetIntegerv(GL_MAX_UNIFORM_BUFFER_BINDINGS, &info.maxUniformBufferBindings);
        glGetIntegerv(GL_MAX_UNIFORM_BLOCK_SIZE, &info.maxUniformBlockSize);
        glGetIntegerv(GL_MAX_DRAW_BUFFERS, &info.maxDrawBuffers);
        glGetIntegerv(GL_MAX_COLOR_ATTACHMENTS, &info.maxColorAttachments);
        glGetIntegerv(GL_MAX_SAMPLES, &info.maxSamples);
        glGetIntegerv(GL_MAX_ELEMENT_INDEX, &info.maxElementIndex);
        glGetIntegerv(GL_NUM_PROGRAM_BINARY_FORMATS, &info.numProgramBinaryFormats);
        glGetIntegerv(GL_NUM_SHADER_BINARY_FORMATS, &info.numShaderBinaryFormats);
    }

    // 11. 获取扩展数量
    glGetIntegerv(GL_NUM_EXTENSIONS, &info.numExtensions);

    // 12. 获取压缩纹理格式
    GLint numCompressedFormats = 0;
    glGetIntegerv(GL_NUM_COMPRESSED_TEXTURE_FORMATS, &numCompressedFormats);
    if (numCompressedFormats > 0) {
        std::vector<GLint> formats(numCompressedFormats);
        glGetIntegerv(GL_COMPRESSED_TEXTURE_FORMATS, formats.data());
        for (int i = 0; i < numCompressedFormats && i < 20; i++) {  // 最多保存 20 个
            info.compressedTextureFormats.push_back(formats[i]);
        }
    }

    info.success = true;
    OH_LOG_Print(LOG_APP, LOG_INFO, LOG_PRINT_DOMAIN, LOG_TAG, 
                 "GPU info retrieved successfully");

    // 13. 清理资源
    eglMakeCurrent(display, EGL_NO_SURFACE, EGL_NO_SURFACE, EGL_NO_CONTEXT);
    eglDestroyContext(display, context);
    eglDestroySurface(display, surface);
    eglTerminate(display);

    return info;
}
