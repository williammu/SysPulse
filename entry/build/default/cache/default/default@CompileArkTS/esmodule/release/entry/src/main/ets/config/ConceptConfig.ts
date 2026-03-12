export interface ConceptDetailItem {
    title: string;
    content: string;
}
export interface ConceptInfo {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    details: ConceptDetailItem[];
}
export const ConceptConfig: Record<string, ConceptInfo> = {
    'cpu_usage': {
        id: 'cpu_usage',
        title: 'CPU 使用率',
        subtitle: 'CPU Usage',
        description: 'CPU 使用率表示处理器在一段时间内处于忙碌状态的时间比例，反映了系统的负载情况。',
        details: [
            {
                title: '什么是 CPU 使用率？',
                content: 'CPU 使用率是指在一段时间内，CPU 处于非空闲状态的时间占比。例如，50% 的 CPU 使用率意味着 CPU 有一半的时间在处理任务，另一半时间处于空闲状态。'
            },
            {
                title: '为什么使用率会超过 100%？',
                content: '在多核 CPU 设备上，每个核心都可以独立工作。如果有 8 个核心，理论最大使用率可达 800%。系统显示的是所有核心的总使用率。'
            },
            {
                title: '高 CPU 使用率意味着什么？',
                content: '持续高 CPU 使用率（>80%）可能导致设备发热、耗电加快、响应变慢。但短时间内的高使用率是正常的，特别是在运行大型应用或游戏时。'
            }
        ]
    },
    'thread_cpu': {
        id: 'thread_cpu',
        title: '线程 CPU 使用率',
        subtitle: 'Thread CPU Usage',
        description: '线程是程序执行的最小单位，一个应用通常包含多个线程来执行不同任务。',
        details: [
            {
                title: '什么是线程？',
                content: '线程是操作系统能够进行运算调度的最小单位。一个进程可以包含多个线程，它们共享进程的资源，但独立执行。多线程可以提高程序的并发性能。'
            },
            {
                title: '为什么应用有多个线程？',
                content: '现代应用通常使用多线程：主线程负责 UI 渲染，后台线程处理网络请求、文件读写、数据计算等。这样可以避免界面卡顿，提升用户体验。'
            },
            {
                title: '如何优化线程性能？',
                content: '避免创建过多线程（会增加上下文切换开销），合理分配任务到不同线程，使用线程池管理线程生命周期，避免主线程执行耗时操作。'
            }
        ]
    },
    'memory_pss': {
        id: 'memory_pss',
        title: 'PSS (实际使用内存)',
        subtitle: 'Proportional Set Size',
        description: 'PSS 是衡量应用实际内存占用的最佳指标，包含按比例分配的共享内存。',
        details: [
            {
                title: '什么是 PSS？',
                content: 'PSS (Proportional Set Size) 表示应用实际使用的物理内存。它包含应用独占的内存，以及按比例分配的共享内存（如系统库、共享资源等）。'
            },
            {
                title: 'PSS vs RSS 的区别',
                content: 'RSS (Resident Set Size) 包含所有共享内存的完整大小，会导致重复计算。PSS 更准确地反映了应用对系统内存的真实占用，是评估内存使用的最佳指标。'
            },
            {
                title: '如何降低 PSS？',
                content: '减少内存泄漏、及时释放不再使用的对象、使用更高效的数据结构、避免加载不必要的资源、使用图片压缩和缓存策略。'
            }
        ]
    },
    'memory_rss': {
        id: 'memory_rss',
        title: 'RSS (驻留内存)',
        subtitle: 'Resident Set Size',
        description: 'RSS 表示进程在物理内存中实际占用的空间，包含所有共享内存。',
        details: [
            {
                title: '什么是 RSS？',
                content: 'RSS (Resident Set Size) 表示进程当前驻留在物理内存中的页面总数，包括代码段、数据段、堆栈和共享库等。它反映了进程实际占用的物理内存大小。'
            },
            {
                title: 'RSS 的局限性',
                content: 'RSS 包含了完整的共享内存大小（如系统库），如果多个应用使用相同的库，RSS 会将这些内存重复计算，导致总和超过系统实际内存。'
            }
        ]
    },
    'memory_vss': {
        id: 'memory_vss',
        title: 'VSS (虚拟内存)',
        subtitle: 'Virtual Set Size',
        description: 'VSS 表示进程可访问的所有内存地址空间，包括未实际分配的内存。',
        details: [
            {
                title: '什么是 VSS？',
                content: 'VSS (Virtual Set Size) 表示进程的虚拟地址空间大小，包括所有已分配和未分配的内存映射。它通常远大于实际物理内存使用。'
            },
            {
                title: '为什么 VSS 很大？',
                content: 'VSS 包含了进程可能访问的所有内存区域，包括内存映射文件、共享库、堆、栈等。即使这些内存并未实际加载到物理内存中，也会计入 VSS。'
            }
        ]
    },
    'memory_shared': {
        id: 'memory_shared',
        title: '内存分类',
        subtitle: 'Memory Classification',
        description: '内存按共享属性和修改状态分为 Shared/Private 和 Clean/Dirty 四类。',
        details: [
            {
                title: 'Shared Clean',
                content: '与其他进程共享的未修改内存页。通常是系统库、框架代码等只读资源。多个应用共享同一份物理内存，节省系统资源。'
            },
            {
                title: 'Shared Dirty',
                content: '与其他进程共享但已被修改的内存页。由于被修改，需要为当前进程单独保存一份副本，但仍标记为共享。'
            },
            {
                title: 'Private Clean',
                content: '进程独占的未修改内存页。通常是应用自身的代码段、只读数据等，不需要与其他进程共享。'
            },
            {
                title: 'Private Dirty',
                content: '进程独占且已被修改的内存页。这是应用运行时产生的数据，如动态分配的内存、运行时数据等，是应用内存占用的主要部分。'
            }
        ]
    },
    'memory_limit': {
        id: 'memory_limit',
        title: '内存限制',
        subtitle: 'Memory Limit',
        description: '系统为每个应用设置的内存使用上限，防止单个应用占用过多资源。',
        details: [
            {
                title: '什么是内存限制？',
                content: '系统为每个应用进程设置的内存使用上限（RSS 限制）。当应用内存接近或超过限制时，系统会触发内存警告，甚至终止应用以防止影响系统稳定性。'
            },
            {
                title: '超过限制会怎样？',
                content: '当内存使用接近限制时，系统会发送内存警告，应用应该释放不必要的资源。如果继续增长超过限制，系统可能会强制终止应用（OOM - Out of Memory）。'
            },
            {
                title: '如何避免 OOM？',
                content: '及时响应内存警告、使用懒加载策略、实现图片缓存和压缩、避免内存泄漏、使用更高效的数据结构、定期检查和优化内存使用。'
            }
        ]
    },
    'gpu_info': {
        id: 'gpu_info',
        title: 'GPU 信息',
        subtitle: 'GPU Information',
        description: 'GPU（图形处理器）是专为图形渲染设计的处理器，负责游戏画面、UI 动画、视频解码等任务。',
        details: [
            {
                title: 'GPU 厂商',
                content: '常见的移动 GPU 厂商包括 ARM（Mali 系列）、Qualcomm（Adreno 系列）、Imagination（PowerVR 系列）、Apple 等。不同厂商的 GPU 在性能和特性上有所差异。'
            },
            {
                title: 'OpenGL ES',
                content: 'OpenGL ES（OpenGL for Embedded Systems）是移动设备上的图形 API 标准。版本号（如 3.2）表示支持的特性和功能级别，版本越高支持越多的高级图形特性。'
            },
            {
                title: 'GLSL',
                content: 'GLSL（OpenGL Shading Language）是用于编写着色器（Shader）的编程语言。着色器运行在 GPU 上，负责顶点处理、片段着色等图形渲染任务。'
            },
            {
                title: 'GPU 扩展',
                content: 'GPU 扩展是厂商提供的额外功能，超出标准 OpenGL ES 规范。这些扩展可以提供更好的性能或额外的图形特性，但需要针对特定 GPU 进行适配。'
            }
        ]
    },
    'sensor_accelerometer': {
        id: 'sensor_accelerometer',
        title: '加速度传感器',
        subtitle: 'Accelerometer',
        description: '测量设备在 X/Y/Z 三个轴上的加速度，单位 m/s²。',
        details: [
            {
                title: '工作原理',
                content: '加速度传感器通过检测质量块在加速度作用下的位移来测量加速度。它可以检测重力（静止时 Z 轴约 9.8 m/s²）和运动加速度。'
            },
            {
                title: '应用场景',
                content: '屏幕旋转、步数检测、游戏控制、晃动检测、倾斜角度计算等。当设备静止时，可以测量重力方向来确定设备姿态。'
            },
            {
                title: '三轴含义',
                content: 'X 轴：左右方向，右为正；Y 轴：前后方向，前为正；Z 轴：上下方向，上为正。当设备平放时，X 和 Y 接近 0，Z 约 9.8 m/s²（重力加速度）。'
            }
        ]
    },
    'sensor_gyroscope': {
        id: 'sensor_gyroscope',
        title: '陀螺仪',
        subtitle: 'Gyroscope',
        description: '测量设备在 X/Y/Z 三个轴上的角速度，单位 rad/s。',
        details: [
            {
                title: '工作原理',
                content: '陀螺仪基于科里奥利力原理，通过检测旋转时产生的力来测量角速度。它可以检测设备的旋转、转向等动作，与加速度传感器互补。'
            },
            {
                title: '与加速度的区别',
                content: '加速度传感器测量线性加速度（包括重力），陀螺仪测量旋转角速度。两者结合可以精确追踪设备的 3D 运动和姿态。'
            },
            {
                title: '应用场景',
                content: '游戏控制（如赛车转向）、图像防抖、航向参考、VR/AR 追踪、相机旋转检测等。'
            }
        ]
    },
    'sensor_light': {
        id: 'sensor_light',
        title: '光线传感器',
        subtitle: 'Ambient Light Sensor',
        description: '测量环境光强度，单位 lux（勒克斯）。',
        details: [
            {
                title: 'lux 单位',
                content: 'lux（勒克斯）是光照强度的单位，表示每平方米接收到的光通量。常见参考：室内照明 100-500 lux，阴天室外 1000-10000 lux，晴天室外 10000-100000 lux。'
            },
            {
                title: '应用场景',
                content: '自动调节屏幕亮度（环境暗时降低亮度保护眼睛，环境亮时提高亮度保证可见性）、自动切换暗黑模式、相机曝光调节等。'
            }
        ]
    },
    'sensor_magnetic': {
        id: 'sensor_magnetic',
        title: '磁场传感器',
        subtitle: 'Magnetometer',
        description: '测量设备周围的磁场强度，单位 μT（微特斯拉）。',
        details: [
            {
                title: '工作原理',
                content: '磁场传感器基于霍尔效应或磁阻效应，可以检测地球磁场和周围磁场的强度和方向。地球磁场强度约为 25-65 μT。'
            },
            {
                title: '电子罗盘',
                content: '结合加速度传感器（确定水平面）和磁场传感器（确定北方），可以实现电子罗盘功能，用于导航和方向检测。'
            },
            {
                title: '干扰因素',
                content: '附近的金属物体、磁铁、电子设备都会产生磁场干扰，影响传感器精度。使用时需要远离这些干扰源或进行校准。'
            }
        ]
    },
    'network_bandwidth': {
        id: 'network_bandwidth',
        title: '网络带宽',
        subtitle: 'Network Bandwidth',
        description: '表示网络连接的数据传输能力，分为上行和下行。',
        details: [
            {
                title: '上行 vs 下行',
                content: '上行带宽（Upload）是设备向网络发送数据的速度，影响上传文件、发送消息、视频通话等。下行带宽（Download）是设备从网络接收数据的速度，影响下载、视频播放、网页浏览等。'
            },
            {
                title: '理论 vs 实际',
                content: '显示的带宽是理论最大值，由网络类型（5G、Wi-Fi 6 等）决定。实际速度受信号强度、网络拥塞、服务器速度等因素影响，通常低于理论值。'
            },
            {
                title: '计费网络',
                content: '移动数据网络通常按流量计费的，Wi-Fi 通常不计费。应用可以根据此信息决定是否下载大文件或播放高清视频。'
            }
        ]
    },
    'battery_health': {
        id: 'battery_health',
        title: '电池健康度',
        subtitle: 'Battery Health',
        description: '反映电池当前容量相对于新电池的比例，是电池老化程度的指标。',
        details: [
            {
                title: '什么是电池健康度？',
                content: '电池健康度表示当前电池的最大容量相对于新电池设计容量的百分比。随着充放电循环次数增加，电池会逐渐老化，容量下降。'
            },
            {
                title: '健康度标准',
                content: '100-90%：健康状态良好；89-80%：轻度老化，续航略有下降；79-70%：中度老化，建议考虑更换；<70%：严重老化，续航明显缩短，可能影响性能。'
            },
            {
                title: '如何延长电池寿命？',
                content: '避免过度充电（保持 20%-80% 电量）、避免高温环境、使用原装充电器、减少快充频率、避免边充边玩大型游戏。'
            }
        ]
    },
    'storage_types': {
        id: 'storage_types',
        title: '存储类型',
        subtitle: 'Storage Types',
        description: '设备存储分为内部存储和外部存储，应用数据也有不同分类。',
        details: [
            {
                title: '内部存储',
                content: '设备内置的闪存芯片，速度快、稳定可靠。包含系统分区、应用分区、用户数据分区等。应用默认安装和运行在此存储上。'
            },
            {
                title: '应用数据分类',
                content: '应用数据包括：代码（App 本身）、数据（用户数据、数据库）、缓存（临时文件、图片缓存）。缓存可以安全清理，数据清理会导致应用重置。'
            }
        ]
    },
    'screen_refresh_rate': {
        id: 'screen_refresh_rate',
        title: '屏幕刷新率',
        subtitle: 'Refresh Rate',
        description: '屏幕每秒刷新画面的次数，单位 Hz（赫兹）。',
        details: [
            {
                title: '刷新率的意义',
                content: '60Hz 表示每秒刷新 60 次，120Hz 表示每秒刷新 120 次。更高的刷新率意味着更流畅的视觉体验，特别是在滑动、动画、游戏中。'
            },
            {
                title: '常见刷新率',
                content: '60Hz：标准刷新率，大部分应用的基础体验；90Hz：流畅体验，平衡性能和功耗；120Hz：高刷体验，极致流畅但耗电增加；144Hz+：电竞级别，主要用于游戏手机。'
            },
            {
                title: '自适应刷新率',
                content: '现代设备支持自适应刷新率，根据内容动态调整（如静态页面 60Hz，滑动时 120Hz），在保证流畅的同时节省电量。'
            }
        ]
    },
    'screen_dpi': {
        id: 'screen_dpi',
        title: '屏幕密度 (DPI)',
        subtitle: 'Dots Per Inch',
        description: '每英寸屏幕上的像素点数，反映屏幕的精细程度。',
        details: [
            {
                title: 'DPI 与 PPI',
                content: 'DPI（Dots Per Inch）和 PPI（Pixels Per Inch）通常混用，都表示屏幕像素密度。数值越高，屏幕显示越精细，文字和图像越清晰。'
            },
            {
                title: '常见 DPI 等级',
                content: 'LDPI (~120dpi)、MDPI (~160dpi)、HDPI (~240dpi)、XHDPI (~320dpi)、XXHDPI (~480dpi)、XXXHDPI (~640dpi)。Android/HarmonyOS 根据 DPI 自动选择合适的资源。'
            },
            {
                title: '密度无关像素 (dp)',
                content: '为了在不同 DPI 屏幕上保持一致的视觉大小，使用 dp（density-independent pixels）作为单位。1dp 在 160dpi 屏幕上等于 1 像素，在高 DPI 屏幕上等于更多像素。'
            }
        ]
    },
    'gpu_max_texture_size': {
        id: 'gpu_max_texture_size',
        title: '最大纹理尺寸',
        subtitle: 'Max Texture Size',
        description: 'GPU 支持的最大 2D 纹理图片尺寸，通常以像素为单位。',
        details: [
            {
                title: '什么是 2D 纹理？',
                content: '2D 纹理是最常用的纹理类型，用于平面贴图，如游戏角色的皮肤、场景的地表、UI 元素等。最大纹理尺寸限制了单张 2D 纹理图片的最大宽高。'
            },
            {
                title: '为什么重要？',
                content: '如果纹理超过 GPU 支持的最大尺寸，会导致加载失败或需要分割处理。高端 GPU 通常支持 8192 或 16384，而低端 GPU 可能只支持 2048 或 4096。'
            },
            {
                title: '优化建议',
                content: '根据目标设备的 GPU 能力选择合适的纹理尺寸。过大的纹理会占用大量显存，影响性能。可以使用纹理压缩格式（如 ETC2、ASTC）减少内存占用。'
            }
        ]
    },
    'gpu_cube_map_size': {
        id: 'gpu_cube_map_size',
        title: '最大立方体贴图尺寸',
        subtitle: 'Max Cube Map Texture Size',
        description: 'GPU 支持的最大立方体贴图（Cube Map）尺寸。',
        details: [
            {
                title: '什么是立方体贴图？',
                content: '立方体贴图由 6 张正方形纹理组成，分别对应立方体的 6 个面（上、下、左、右、前、后）。常用于天空盒、环境反射、环境光照等效果。'
            },
            {
                title: '与 2D 纹理的区别',
                content: '2D 纹理是平面的，而立方体贴图是立体的。立方体贴图使用 3D 方向向量来采样，适合模拟无限远的环境。6 个面的尺寸必须相同，且必须是正方形。'
            },
            {
                title: '应用场景',
                content: '天空盒（模拟远景天空）、环境映射（金属反射效果）、动态反射、全局光照等。立方体贴图尺寸通常与 2D 纹理尺寸限制相同，但有些 GPU 会有不同的限制。'
            }
        ]
    },
    'gpu_texture_units': {
        id: 'gpu_texture_units',
        title: '纹理单元',
        subtitle: 'Texture Units',
        description: 'GPU 可以同时使用的纹理数量限制。',
        details: [
            {
                title: '什么是纹理单元？',
                content: '纹理单元是 GPU 中用于采样纹理的硬件资源。每个纹理单元可以在着色器中绑定一张纹理。maxTextureImageUnits 表示片段着色器可用的纹理单元数。'
            },
            {
                title: '顶点纹理 vs 片段纹理',
                content: '顶点纹理单元（Vertex Texture Units）用于顶点着色器采样纹理，片段纹理单元（Fragment Texture Units）用于片段着色器。现代 GPU 通常支持 16-32 个纹理单元。'
            },
            {
                title: '实际应用',
                content: '多纹理用于复杂渲染效果，如光照贴图、法线贴图、反射贴图等。超过限制的纹理需要分批渲染，会影响性能。'
            }
        ]
    },
    'gpu_viewport': {
        id: 'gpu_viewport',
        title: '视口尺寸',
        subtitle: 'Viewport Dimensions',
        description: 'GPU 支持的最大视口渲染区域尺寸。',
        details: [
            {
                title: '什么是视口？',
                content: '视口（Viewport）是 OpenGL ES 渲染输出的目标区域，通常对应屏幕或帧缓冲区的某个矩形区域。maxViewportDims 定义了视口的最大宽度和高度。'
            },
            {
                title: '为什么重要？',
                content: '视口尺寸限制了渲染目标的最大分辨率。例如 16384×16384 表示 GPU 可以渲染最大 16K×16K 的图像，这对于高分辨率截图、离线渲染等场景很重要。'
            },
            {
                title: '与屏幕分辨率的区别',
                content: '屏幕分辨率是物理显示器的像素数，而视口尺寸是 GPU 渲染能力的上限。视口可以大于屏幕（用于缩放），也可以小于屏幕（用于局部渲染）。'
            }
        ]
    },
    'gpu_line_width': {
        id: 'gpu_line_width',
        title: '线宽范围',
        subtitle: 'Line Width Range',
        description: 'GPU 支持的线条渲染宽度范围。',
        details: [
            {
                title: '什么是线宽？',
                content: '线宽是 OpenGL ES 绘制线条时的粗细程度。aliasedLineWidthRange 表示 GPU 支持的抗锯齿线条的最小和最大宽度。'
            },
            {
                title: '为什么显示 1-1？',
                content: '许多移动 GPU（特别是 Mali 系列）只支持线宽为 1。这是硬件限制，意味着无法通过 OpenGL ES 直接绘制更粗的线条。需要绘制矩形或多边形来模拟粗线条。'
            },
            {
                title: '实际应用',
                content: '在数据可视化、CAD 应用、游戏调试线框等场景中，线宽控制很重要。如果 GPU 不支持可变线宽，需要在应用层通过几何体扩展来实现。'
            }
        ]
    },
    'gpu_point_size': {
        id: 'gpu_point_size',
        title: '点大小范围',
        subtitle: 'Point Size Range',
        description: 'GPU 支持的点精灵（Point Sprite）渲染大小范围。',
        details: [
            {
                title: '什么是点大小？',
                content: '点大小是 OpenGL ES 绘制点精灵（Point Sprite）时的尺寸。与线宽类似，aliasedPointSizeRange 表示 GPU 支持的点的最小和最大尺寸。'
            },
            {
                title: '为什么显示 1-1？',
                content: '许多移动 GPU 只支持点大小为 1。这意味着无法直接绘制更大的点。需要绘制小三角形或四边形来模拟大点，这在粒子系统、点云渲染中很常见。'
            },
            {
                title: '实际应用',
                content: '点精灵常用于粒子效果、星空、点云可视化等。如果 GPU 不支持可变点大小，可以使用公告板技术（Billboarding）用始终朝向相机的四边形替代点。'
            }
        ]
    },
    'gpu_vertex_attribs': {
        id: 'gpu_vertex_attribs',
        title: '顶点属性',
        subtitle: 'Vertex Attributes',
        description: '每个顶点可以携带的数据属性数量限制。',
        details: [
            {
                title: '什么是顶点属性？',
                content: '顶点属性是每个顶点携带的数据，如位置（3D坐标）、颜色、法线、纹理坐标、切线等。maxVertexAttribs 表示每个顶点最多可以有多少个属性。'
            },
            {
                title: '常见属性',
                content: '位置（3个浮点数）、颜色（4个浮点数 RGBA）、纹理坐标（2个浮点数 UV）、法线（3个浮点数）。复杂的着色器可能需要更多属性。'
            },
            {
                title: '限制影响',
                content: 'OpenGL ES 3.0 要求至少支持 16 个顶点属性。如果着色器使用的属性超过 GPU 限制，会导致编译失败。需要优化着色器或拆分渲染。'
            }
        ]
    },
    'gpu_uniform_vectors': {
        id: 'gpu_uniform_vectors',
        title: 'Uniform 变量',
        subtitle: 'Uniform Variables',
        description: '着色器中可以使用的 uniform 变量数量限制。',
        details: [
            {
                title: '什么是 Uniform？',
                content: 'Uniform 是着色器中的全局常量，在整个绘制调用中保持不变。用于传递变换矩阵、光照参数、材质属性等数据给着色器。'
            },
            {
                title: '顶点 vs 片段 Uniform',
                content: '顶点着色器和片段着色器有各自的 uniform 限制。maxVertexUniformVectors 通常是 128-256，maxFragmentUniformVectors 通常是 16-224，具体取决于 GPU。'
            },
            {
                title: '优化技巧',
                content: '使用 UBO（Uniform Buffer Object）可以突破单个着色器的 uniform 限制，在多个着色器间共享数据。合并多个 uniform 到一个 vec4 也可以节省空间。'
            }
        ]
    },
    'gpu_varying_vectors': {
        id: 'gpu_varying_vectors',
        title: 'Varying 变量',
        subtitle: 'Varying Variables',
        description: '顶点着色器传递给片段着色器的插值数据限制。',
        details: [
            {
                title: '什么是 Varying？',
                content: 'Varying 变量用于将数据从顶点着色器传递到片段着色器。GPU 会在三角形内部进行插值，使片段着色器获得平滑变化的数据。'
            },
            {
                title: '常见用途',
                content: '纹理坐标、颜色、法线、光照强度等需要从顶点插值到像素的数据都使用 varying。maxVaryingVectors 限制了可以传递的数据量。'
            },
            {
                title: '限制说明',
                content: 'OpenGL ES 3.0 要求至少支持 15 个 varying 变量（vec4）。如果超过限制，着色器编译会失败。需要减少传递的数据量或使用纹理查找替代。'
            }
        ]
    },
    'gpu_multisample': {
        id: 'gpu_multisample',
        title: '多重采样',
        subtitle: 'Multisampling',
        description: 'GPU 支持的多重采样抗锯齿（MSAA）的最大样本数。',
        details: [
            {
                title: '什么是多重采样？',
                content: '多重采样抗锯齿（MSAA）是一种抗锯齿技术，通过对每个像素进行多次采样来减少锯齿边缘。maxSamples 表示支持的最大采样数。'
            },
            {
                title: '常见采样数',
                content: '1：无抗锯齿；2：2x MSAA；4：4x MSAA；8：8x MSAA；16：16x MSAA。采样数越高，边缘越平滑，但性能开销越大。'
            },
            {
                title: '性能影响',
                content: 'MSAA 会显著增加显存占用和渲染开销。移动端通常使用 2x 或 4x，高端设备可以使用 8x。需要在画质和性能间权衡。'
            }
        ]
    },
    'gpu_draw_buffers': {
        id: 'gpu_draw_buffers',
        title: '绘制缓冲区',
        subtitle: 'Draw Buffers',
        description: 'GPU 单次绘制可以同时输出到的颜色缓冲区数量。',
        details: [
            {
                title: '什么是 MRT？',
                content: 'MRT（Multiple Render Targets）允许单次绘制将结果输出到多个纹理。maxDrawBuffers 表示支持的同时渲染目标数量。'
            },
            {
                title: '应用场景',
                content: '延迟渲染、G-Buffer 生成、后处理效果等需要同时输出多个数据（颜色、法线、深度等）到不同纹理。OpenGL ES 3.0 要求至少支持 4 个。'
            },
            {
                title: '性能考虑',
                content: '更多的绘制缓冲区会增加带宽和显存占用。移动端通常限制在 4-8 个，桌面级 GPU 可以支持更多。'
            }
        ]
    },
    'gpu_compressed_texture': {
        id: 'gpu_compressed_texture',
        title: '压缩纹理格式',
        subtitle: 'Compressed Texture Formats',
        description: 'GPU 支持的硬件压缩纹理格式列表。',
        details: [
            {
                title: '为什么需要压缩纹理？',
                content: '压缩纹理可以显著减少显存占用和带宽消耗。与 PNG/JPEG 不同，压缩纹理可以直接被 GPU 使用，无需解压，提高渲染效率。'
            },
            {
                title: '常见压缩格式',
                content: 'ETC2：Android 标准，所有 GPU 支持；ASTC：高质量压缩，Android 5.0+ 可选支持；PVRTC：PowerVR GPU 专用；S3TC：桌面 GPU 常用。'
            },
            {
                title: '使用建议',
                content: '优先使用 ETC2（保证兼容性）或 ASTC（高质量）。根据纹理内容选择压缩方式：RGB 用 ETC2_RGB，RGBA 用 ETC2_RGBA 或 ASTC_4x4。'
            }
        ]
    },
    'gpu_extensions': {
        id: 'gpu_extensions',
        title: 'OpenGL ES 扩展',
        subtitle: 'OpenGL ES Extensions',
        description: 'GPU 支持的 OpenGL ES 扩展功能列表，这些扩展提供了超出标准规范的高级特性。',
        details: [
            {
                title: '什么是扩展？',
                content: 'OpenGL ES 扩展是 GPU 厂商提供的额外功能，超出标准 OpenGL ES 规范。扩展名称以 GL_ 开头，后跟厂商前缀（如 OES、KHR、EXT、ARM 等）和功能描述。'
            },
            {
                title: '常见扩展 - 图像与同步',
                content: 'GL_OES_EGL_image：支持 EGL 图像作为纹理；GL_OES_EGL_image_external：支持外部图像（如相机预览）；GL_OES_EGL_sync：支持 GPU 同步原语，用于多线程渲染协调。'
            },
            {
                title: '常见扩展 - 深度与浮点',
                content: 'GL_OES_depth24/depth32：支持 24/32 位深度缓冲；GL_OES_texture_float/half_float：支持浮点纹理（HDR 渲染）；GL_EXT_color_buffer_float：支持浮点颜色缓冲区。'
            },
            {
                title: '常见扩展 - 压缩与顶点',
                content: 'GL_KHR_texture_compression_astc_ldr/hdr：ASTC 纹理压缩（高质量）；GL_OES_vertex_array_object：VAO 支持（减少状态切换开销）；GL_OES_depth_texture：深度纹理支持（阴影贴图）。'
            },
            {
                title: '如何使用扩展？',
                content: '使用 glGetString(GL_EXTENSIONS) 查询支持的扩展。在着色器中使用 #extension 指令启用。注意：扩展是可选的，不同 GPU 支持不同，使用前必须检查。'
            }
        ]
    }
};
export function getConceptInfo(a: string): ConceptInfo | undefined {
    return ConceptConfig[a];
}
export function getAllConceptIds(): string[] {
    return Object.keys(ConceptConfig);
}
