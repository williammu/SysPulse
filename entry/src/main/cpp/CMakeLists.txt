cmake_minimum_required(VERSION 3.5.0)
project(sysinfo)

set(NATIVERENDER_ROOT_PATH ${CMAKE_CURRENT_SOURCE_DIR})

include_directories(${NATIVERENDER_ROOT_PATH}
                    ${NATIVERENDER_ROOT_PATH}/include)

# 添加 hilog 库
find_library(
    hilog-lib
    hilog_ndk.z
)

add_library(sysinfo SHARED sysinfo.cpp hidebug_module.cpp sensor_module.cpp)

target_link_libraries(sysinfo PUBLIC ${hilog-lib} libace_napi.z.so libohhidebug.so libc++.a)
