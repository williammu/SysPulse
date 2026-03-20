// 概念详情项
export interface ConceptDetailItem {
  title: string;
  content: string;
}

// 概念说明配置
export interface ConceptInfo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: ConceptDetailItem[];
}

export const ConceptConfig: Record<string, ConceptInfo> = {
  // CPU 相关
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

  // 内存相关
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

  // 电池相关
  'battery_status': {
    id: 'battery_status',
    title: '电池状态',
    subtitle: 'Battery Status',
    description: '显示当前电池的电量、充电状态等实时信息。',
    details: [
      {
        title: '电池电量 (SOC)',
        content: 'State of Charge (SOC) 表示电池当前剩余电量百分比。100% 表示充满，0% 表示耗尽。建议保持电量在 20%-80% 之间以延长电池寿命。'
      },
      {
        title: '充电状态',
        content: '未充电：设备未连接充电器；充电中：正在充电；已充满：电量达到 100%。部分设备在充满后会显示"未充电"以保护电池。'
      },
      {
        title: '电池健康度',
        content: '反映电池当前容量相对于新电池的比例。随着充放电循环次数增加，电池会逐渐老化，容量下降。健康度低于 80% 时建议考虑更换电池。'
      }
    ]
  },

  'charging_info': {
    id: 'charging_info',
    title: '充电信息',
    subtitle: 'Charging Information',
    description: '显示充电功率、电流、充电器类型等充电相关信息。',
    details: [
      {
        title: '充电功率',
        content: '充电功率 = 电压 × 电流，单位为瓦特(W)。功率越高充电越快。普通充电约 10W，快充 18-22.5W，超级快充 40-66W，超级快充Turbo 可达 100W 以上。'
      },
      {
        title: '充电类型判断',
        content: '普通充电 < 15W：5V/2A (10W)；快充 15-30W：9V/2A (18W)、5V/4.5A (22.5W)；超级快充 30-66W：10V/4A (40W)、11V/6A (66W)；超级快充Turbo ≥ 66W：20V/5A (100W)'
      },
      {
        title: '充电器类型',
        content: '交流充电器：标准充电器，功率较高；USB（电脑）：通过电脑 USB 充电，功率较低；无线充电：通过无线充电板充电，效率略低于有线。'
      },
      {
        title: '充电电流',
        content: '充电电流单位为毫安(mA)。电流越大充电越快，但也会产生更多热量。快充时电流可达 4000-6000mA，普通充电约 2000mA。'
      }
    ]
  },

  'battery_info': {
    id: 'battery_info',
    subtitle: 'Battery Information',
    title: '电池信息',
    description: '显示电池的技术参数和健康状态。',
    details: [
      {
        title: '电池温度',
        content: '正常工作温度范围为 0°C 到 45°C。温度过高会加速电池老化，甚至触发保护机制停止充电。充电时温度升高是正常现象，但超过 45°C 应暂停使用。'
      },
      {
        title: '电池电压',
        content: '锂电池正常工作电压范围为 3.0V 到 4.4V。电压过低可能导致设备自动关机，电压过高可能损坏电池。充电时电压逐渐上升，充满后稳定在 4.2V 左右。'
      },
      {
        title: '电池技术',
        content: '现代移动设备通常使用锂离子(Li-ion)或锂聚合物(Li-Po)电池。这些电池能量密度高、无记忆效应，但需要避免过度充放电以延长寿命。'
      },
      {
        title: '延长电池寿命',
        content: '1. 避免电量完全耗尽；2. 避免长时间充满 100%；3. 避免高温环境使用和充电；4. 使用原装或认证充电器；5. 减少快充频率。'
      }
    ]
  },

  // 操作系统相关
  'os_version': {
    id: 'os_version',
    title: '系统版本信息',
    subtitle: 'OS Version Information',
    description: '显示 HarmonyOS 系统的版本号、API 级别等关键版本信息。',
    details: [
      {
        title: '系统名称',
        content: 'HarmonyOS 是华为开发的分布式操作系统，支持手机、平板、智能穿戴、智慧屏等多种设备类型。'
      },
      {
        title: '版本号说明',
        content: '版本号通常由主版本号、次版本号、修订号组成（如 4.0.0）。主版本号表示重大更新，次版本号表示功能更新，修订号表示问题修复。'
      },
      {
        title: 'SDK API 版本',
        content: 'SDK API 版本表示应用程序接口的级别。开发者需要根据目标设备的 API 版本来编写兼容的代码，确保应用能在该设备上正常运行。'
      },
      {
        title: '首次 API 版本',
        content: '首次 API 版本表示设备出厂时搭载的 HarmonyOS API 级别。这个信息有助于了解设备的硬件代数和系统兼容性。'
      }
    ]
  },

  'os_build': {
    id: 'os_build',
    title: '系统构建信息',
    subtitle: 'OS Build Information',
    description: '显示系统固件的构建版本、构建时间等技术信息。',
    details: [
      {
        title: '软件版本',
        content: '软件版本是系统固件的完整标识符，包含版本号、构建类型、分支信息等。这个信息在问题反馈和系统诊断时非常重要。'
      },
      {
        title: '内部版本号',
        content: '内部版本号是开发团队使用的版本标识，通常包含构建日期、分支名称、提交哈希等信息，用于精确定位代码版本。'
      },
      {
        title: '构建时间',
        content: '构建时间表示该系统固件的编译打包时间。通过这个信息可以了解系统的更新频率和版本新旧程度。'
      }
    ]
  },

  'os_security': {
    id: 'os_security',
    title: '系统安全信息',
    subtitle: 'OS Security Information',
    description: '显示系统安全补丁级别等安全相关信息。',
    details: [
      {
        title: '安全补丁级别',
        content: '安全补丁级别表示系统包含的安全更新日期。Google 和华为每月发布安全补丁，修复已知漏洞。建议保持系统更新以获得最新安全保护。'
      },
      {
        title: '为什么重要',
        content: '安全补丁修复了系统中发现的安全漏洞，防止恶意软件利用这些漏洞攻击设备。过期的安全补丁可能使设备面临安全风险。'
      },
      {
        title: '如何更新',
        content: '进入 设置 > 系统和更新 > 软件更新 检查并安装最新系统更新。建议开启自动更新以获得及时的安全保护。'
      }
    ]
  },

  // CPU 相关
  'cpu_cores': {
    id: 'cpu_cores',
    title: 'CPU 核心配置',
    subtitle: 'CPU Core Configuration',
    description: '显示 CPU 的大核和小核配置信息。',
    details: [
      {
        title: '什么是大核小核',
        content: '现代移动处理器采用 big.LITTLE 架构，将高性能核心（大核）和节能核心（小核）组合在一起。大核处理复杂任务，小核处理简单任务，兼顾性能和续航。'
      },
      {
        title: '大核（Performance Core）',
        content: '大核频率高、性能强，适合运行游戏、视频编辑等计算密集型任务。但功耗较高，发热量大。常见的大核命名：Cortex-X系列、Cortex-A7x系列。'
      },
      {
        title: '小核（Efficiency Core）',
        content: '小核频率低、功耗低，适合处理后台任务、消息推送等轻量级工作。可以显著延长电池续航。常见的小核命名：Cortex-A5x系列。'
      },
      {
        title: '常见配置',
        content: '8核：通常是2大核+6小核或4大核+4小核；6核：通常是2大核+4小核；4核：通常是2大核+2小核。高端旗舰机多采用4+4配置，中端机多采用2+6配置。'
      },
      {
        title: '调度策略',
        content: '操作系统会根据任务负载动态分配核心。轻量任务使用小核，中等任务使用大核，重度任务可能同时使用所有核心。这种智能调度实现了性能与功耗的平衡。'
      }
    ]
  },

  // GPU 相关
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

  // 传感器相关
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

  'sensor_orientation': {
    id: 'sensor_orientation',
    title: '方向传感器',
    subtitle: 'Orientation Sensor',
    description: '测量设备相对于地球坐标系的方位角度。',
    details: [
      {
        title: '三个角度含义',
        content: 'Alpha（方位角）：设备绕 Z 轴旋转的角度，0-360°，0° 表示正北；Beta（俯仰角）：设备绕 X 轴旋转的角度，-180° 到 180°；Gamma（翻滚角）：设备绕 Y 轴旋转的角度，-90° 到 90°。'
      },
      {
        title: '如何计算方向',
        content: '方向传感器通过融合加速度计（检测重力方向）和磁力计（检测北方）的数据计算得出。它提供了设备在三维空间中的完整姿态信息。'
      },
      {
        title: '应用场景',
        content: '指南针应用、地图导航（确定用户朝向）、VR/AR 头显追踪、游戏控制（如体感游戏）、屏幕自动旋转等。'
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

  // 网络相关
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

  // 电池相关
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

  // 存储相关
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

  // 相机相关
  'camera_zoom_range': {
    id: 'camera_zoom_range',
    title: '变焦范围',
    subtitle: 'Camera Zoom Range',
    description: '相机支持的变焦倍数范围，包含光学变焦、数字变焦和混合变焦能力。',
    details: [
      {
        title: '什么是变焦范围？',
        content: '变焦范围表示相机可以实现的放大倍数区间，通常以最小倍数和最大倍数表示（如 0.5x - 100.0x）。小于 1x 表示广角（缩小），大于 1x 表示长焦（放大）。'
      },
      {
        title: '光学变焦 vs 数字变焦',
        content: '光学变焦：通过调整镜头焦距实现，画质无损，是真正的物理变焦。数字变焦：通过裁剪和放大图像实现，画质会下降。混合变焦：结合光学和数字变焦，在光学变焦范围内保持画质，超出后使用数字变焦。'
      },
      {
        title: '多摄像头系统',
        content: '现代手机通常配备多个摄像头（超广角、主摄、长焦），每个摄像头有不同的固定焦距。系统会根据变焦倍数自动切换摄像头，实现无缝变焦体验。例如：0.5x 使用超广角，1x 使用主摄，3x/5x 使用长焦镜头。'
      },
      {
        title: '如何获取？',
        content: '点击"获取变焦"按钮后，应用会启动相机预览，通过 HarmonyOS Camera API 查询当前相机支持的变焦范围。获取完成后会自动释放相机资源。'
      }
    ]
  },

  'camera_preview_resolution': {
    id: 'camera_preview_resolution',
    title: '预览分辨率',
    subtitle: 'Preview Resolution',
    description: '相机预览时支持的最大图像分辨率。',
    details: [
      {
        title: '什么是预览分辨率？',
        content: '预览分辨率是相机实时取景时显示的图像尺寸，以宽×高像素表示（如 2560×1440）。分辨率越高，预览画面越清晰，但功耗也越高。'
      },
      {
        title: '与拍照分辨率的区别',
        content: '预览分辨率通常低于拍照分辨率。预览用于实时取景，需要高帧率（30-60fps）；拍照用于保存最终图像，追求最高画质。例如：预览可能是 2K，但拍照可达 4K 或更高。'
      }
    ]
  },

  'camera_photo_resolution': {
    id: 'camera_photo_resolution',
    title: '拍照分辨率',
    subtitle: 'Photo Resolution',
    description: '相机拍照时支持的最大图像分辨率。',
    details: [
      {
        title: '什么是拍照分辨率？',
        content: '拍照分辨率是相机拍摄静态照片时的最大图像尺寸，以宽×高像素表示（如 6800×5104）。分辨率越高，照片细节越丰富，文件也越大。'
      },
      {
        title: '像素与画质',
        content: '高像素意味着可以打印更大尺寸的照片或进行更多后期裁剪。但像素高不等于画质好，传感器尺寸、镜头质量、图像处理算法同样重要。'
      }
    ]
  },

  'camera_video_resolution': {
    id: 'camera_video_resolution',
    title: '视频分辨率',
    subtitle: 'Video Resolution',
    description: '相机录制视频时支持的最大分辨率。',
    details: [
      {
        title: '什么是视频分辨率？',
        content: '视频分辨率是录制视频时的图像尺寸，常见有 720p、1080p、4K 等。与照片不同，视频还需要考虑帧率（fps）和编码格式。'
      },
      {
        title: '常见视频规格',
        content: '720p (1280×720)：高清，文件小；1080p (1920×1080)：全高清，主流选择；4K (3840×2160)：超高清，细节丰富但文件大；8K：极致清晰，目前较少使用。'
      }
    ]
  },

  // 屏幕相关
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

  // GPU 相关概念
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
  },

  // 网络相关
  'network_ip_address': {
    id: 'network_ip_address',
    title: 'IP 地址',
    subtitle: 'IP Address',
    description: '设备在网络中的唯一标识，用于网络通信。',
    details: [
      {
        title: '什么是 IP 地址？',
        content: 'IP 地址是互联网协议地址（Internet Protocol Address）的缩写，是分配给网络设备的数字标签，用于识别和定位设备，实现网络通信。'
      },
      {
        title: 'IPv4 vs IPv6',
        content: 'IPv4 使用 32 位地址，格式如 192.168.1.1，约 43 亿个地址。IPv6 使用 128 位地址，格式如 2001:0db8:85a3::8a2e:0370:7334，地址数量几乎无限，是 IPv4 的继任者。'
      },
      {
        title: '内网 vs 公网 IP',
        content: '内网 IP（如 192.168.x.x、10.x.x.x）只在局域网内有效，不同局域网可以重复使用。公网 IP 是全球唯一的，可以直接访问互联网。'
      }
    ]
  },

  'network_subnet_mask': {
    id: 'network_subnet_mask',
    title: '子网掩码',
    subtitle: 'Subnet Mask',
    description: '用于划分 IP 地址的网络部分和主机部分。',
    details: [
      {
        title: '什么是子网掩码？',
        content: '子网掩码是一个 32 位的数字，用于将 IP 地址分为网络地址和主机地址两部分。它决定了哪些 IP 地址在同一个局域网内。'
      },
      {
        title: '常见子网掩码',
        content: '255.255.255.0（/24）：最常见，支持 254 台设备；255.255.0.0（/16）：大型网络，支持 6.5 万台设备；255.0.0.0（/8）：超大型网络。'
      },
      {
        title: '如何计算？',
        content: '子网掩码中的 255 表示网络部分，0 表示主机部分。例如 255.255.255.0 表示前 24 位是网络地址，后 8 位是主机地址，可以容纳 2^8-2=254 台设备。'
      }
    ]
  },

  'network_gateway': {
    id: 'network_gateway',
    title: '默认网关',
    subtitle: 'Default Gateway',
    description: '连接本地网络和外部网络的桥梁。',
    details: [
      {
        title: '什么是网关？',
        content: '网关（Gateway）是连接不同网络的设备，通常是路由器。当设备要访问外部网络（如互联网）时，数据包会先发送到网关，由网关转发。'
      },
      {
        title: '默认网关的作用',
        content: '当目标 IP 不在本地网络时，设备会将数据包发送给默认网关。网关根据路由表决定如何转发数据，是设备访问互联网的必经之路。'
      },
      {
        title: '常见网关地址',
        content: '家用路由器通常使用 192.168.1.1 或 192.168.0.1 作为网关地址。这个地址通常是路由器的管理界面地址。'
      }
    ]
  },

  'network_dns': {
    id: 'network_dns',
    title: 'DNS 服务器',
    subtitle: 'DNS Server',
    description: '将域名转换为 IP 地址的服务。',
    details: [
      {
        title: '什么是 DNS？',
        content: 'DNS（Domain Name System，域名系统）是互联网的"电话簿"，将人类易记的域名（如 www.baidu.com）转换为机器识别的 IP 地址（如 14.215.177.38）。'
      },
      {
        title: '为什么需要 DNS？',
        content: '人们更容易记住域名而不是数字 IP 地址。DNS 让我们可以用浏览器访问网站时输入域名，而不需要记住复杂的 IP 地址。'
      },
      {
        title: '常见 DNS 服务器',
        content: '运营商 DNS：自动分配，速度较快；公共 DNS：114.114.114.114（国内）、8.8.8.8（Google）、1.1.1.1（Cloudflare），可能更稳定。'
      }
    ]
  },

  'network_mtu': {
    id: 'network_mtu',
    title: 'MTU',
    subtitle: 'Maximum Transmission Unit',
    description: '网络传输的最大数据包大小。',
    details: [
      {
        title: '什么是 MTU？',
        content: 'MTU（最大传输单元）是指网络接口一次能传输的最大数据包大小，单位是字节。超过 MTU 的数据包需要分片传输。'
      },
      {
        title: '常见 MTU 值',
        content: '以太网默认 MTU 是 1500 字节；PPPoE 拨号通常是 1492 字节；某些网络可能使用 9000 字节（巨型帧）提高传输效率。'
      },
      {
        title: 'MTU 的影响',
        content: 'MTU 太大可能导致丢包，太小会降低传输效率。合适的 MTU 可以优化网络性能。移动端通常使用 1500 字节。'
      }
    ]
  },

  'network_mac': {
    id: 'network_mac',
    title: 'MAC 地址',
    subtitle: 'MAC Address',
    description: '网络设备的物理地址，全球唯一。',
    details: [
      {
        title: '什么是 MAC 地址？',
        content: 'MAC（Media Access Control）地址是网络设备的物理地址，由 6 组十六进制数组成（如 AA:BB:CC:DD:EE:FF），出厂时固化在网卡中，全球唯一。'
      },
      {
        title: 'MAC vs IP',
        content: 'MAC 地址是物理地址，不变，用于局域网内设备识别；IP 地址是逻辑地址，会变化，用于网络间路由。数据在局域网内靠 MAC 地址传输，跨网络靠 IP 地址路由。'
      },
      {
        title: '隐私保护',
        content: '由于 MAC 地址唯一，可能被用于追踪设备。现代移动设备支持 MAC 地址随机化，在连接不同 WiFi 时使用随机 MAC 地址，保护用户隐私。'
      }
    ]
  },

  // 存储相关
  'storage_total': {
    id: 'storage_total',
    title: '存储空间',
    subtitle: 'Storage Space',
    description: '设备的总存储容量和可用空间。',
    details: [
      {
        title: '存储类型',
        content: '手机存储通常是闪存（Flash Memory），包括 eMMC 和 UFS 两种类型。UFS 速度更快，是高端手机的标配。'
      },
      {
        title: '为什么可用空间小于标称容量？',
        content: '标称 128GB 实际可用约 119GB，原因：1）厂商按 1000 进制计算，系统按 1024 进制；2）系统分区占用；3）预装应用占用。'
      },
      {
        title: '如何管理存储？',
        content: '定期清理缓存、删除不用的应用、备份照片到云端、使用存储分析工具找出大文件。保持至少 10% 的可用空间以保证系统流畅运行。'
      }
    ]
  },

  // 屏幕相关
  'screen_resolution': {
    id: 'screen_resolution',
    title: '屏幕分辨率',
    subtitle: 'Screen Resolution',
    description: '屏幕显示的像素数量，决定画面清晰度。',
    details: [
      {
        title: '什么是分辨率？',
        content: '屏幕分辨率表示屏幕水平和垂直方向的像素数量，如 2560×1440 表示水平 2560 像素，垂直 1440 像素。像素越多，画面越细腻。'
      },
      {
        title: '常见分辨率',
        content: '720p (1280×720)：高清；1080p (1920×1080)：全高清；2K (2560×1440)：四倍高清；4K (3840×2160)：超高清。手机主流是 1080p 到 2K。'
      },
      {
        title: '分辨率与耗电',
        content: '分辨率越高，GPU 渲染负担越重，耗电越快。高端手机使用高分辨率屏幕配合大电池，中端手机可能选择 1080p 平衡性能和续航。'
      }
    ]
  },

  'screen_density': {
    id: 'screen_density',
    title: '屏幕密度',
    subtitle: 'Screen Density',
    description: '每英寸屏幕上的像素数量，单位 PPI。',
    details: [
      {
        title: '什么是 PPI？',
        content: 'PPI（Pixels Per Inch）表示每英寸屏幕上的像素数量。PPI 越高，屏幕显示越精细，文字和图像边缘越平滑。'
      },
      {
        title: '视网膜屏幕',
        content: '苹果提出"视网膜屏幕"概念，指 PPI 高到人眼在正常观看距离无法分辨单个像素。手机通常需要 300+ PPI，平板 200+ PPI。'
      },
      {
        title: '密度无关像素 (dp)',
        content: '为在不同 PPI 屏幕上保持一致的视觉大小，使用 dp（density-independent pixels）。1dp 在 160 PPI 屏幕上等于 1 像素，在高 PPI 屏幕上等于更多像素。'
      }
    ]
  },

  // 传感器相关
  'sensor_proximity': {
    id: 'sensor_proximity',
    title: '距离传感器',
    subtitle: 'Proximity Sensor',
    description: '检测物体距离屏幕的远近。',
    details: [
      {
        title: '什么是距离传感器？',
        content: '距离传感器通常位于手机顶部听筒附近，使用红外线检测物体（如人脸）与屏幕的距离。一般在 0-10cm 范围内有效。'
      },
      {
        title: '主要用途',
        content: '通话时自动熄屏：当手机靠近耳朵时自动关闭屏幕，防止误触和节省电量；离开耳朵时自动点亮屏幕。'
      },
      {
        title: '距离值说明',
        content: '通常显示为 0（近距离，有物体遮挡）或 5（远距离，无遮挡）。不同设备的数值范围可能不同。'
      }
    ]
  },

  'sensor_humidity': {
    id: 'sensor_humidity',
    title: '湿度传感器',
    subtitle: 'Humidity Sensor',
    description: '测量环境相对湿度。',
    details: [
      {
        title: '什么是相对湿度？',
        content: '相对湿度表示空气中实际水蒸气含量与饱和水蒸气含量的百分比。0% 表示完全干燥，100% 表示饱和（可能结露）。'
      },
      {
        title: '适宜湿度范围',
        content: '人体舒适的相对湿度是 40%-60%。低于 30% 会感到干燥，高于 70% 会感到闷热，且容易滋生霉菌。'
      },
      {
        title: '手机上的应用',
        content: '大多数手机没有独立的湿度传感器，部分高端机型可能配备。应用可以通过湿度数据提供环境舒适度建议。'
      }
    ]
  },

  'sensor_temperature': {
    id: 'sensor_temperature',
    title: '温度传感器',
    subtitle: 'Temperature Sensor',
    description: '测量环境温度或设备温度。',
    details: [
      {
        title: '温度传感器类型',
        content: '环境温度传感器测量周围空气温度；设备温度传感器监测 CPU、电池等组件的温度，用于过热保护。'
      },
      {
        title: '为什么温度读数偏高？',
        content: '手机使用时会产生热量，温度传感器可能受到设备发热影响，读数高于实际环境温度。静置一段时间后读数会更准确。'
      },
      {
        title: '温度对设备的影响',
        content: '高温会加速电池老化，触发降频保护，甚至自动关机。低温会降低电池容量，导致设备自动关机。最佳使用温度是 0°C-35°C。'
      }
    ]
  },

  'sensor_barometer': {
    id: 'sensor_barometer',
    title: '气压传感器',
    subtitle: 'Barometer',
    description: '测量大气压力，可辅助计算海拔高度。',
    details: [
      {
        title: '什么是气压传感器？',
        content: '气压传感器测量大气压力，单位通常是 hPa（百帕）或 mbar（毫巴）。标准大气压约为 1013.25 hPa。'
      },
      {
        title: '如何计算海拔？',
        content: '气压随海拔升高而降低。通过气压变化可以估算海拔高度变化，精度比 GPS 更高，常用于登山、楼层检测等场景。'
      },
      {
        title: '天气预测',
        content: '气压变化可以预测天气变化：气压快速下降可能预示降雨；气压上升通常表示天气转好。专业户外设备常用此功能。'
      }
    ]
  },

  // 操作系统相关
  'os_name': {
    id: 'os_name',
    title: '操作系统',
    subtitle: 'Operating System',
    description: '设备运行的系统软件。',
    details: [
      {
        title: 'HarmonyOS 是什么？',
        content: 'HarmonyOS（鸿蒙）是华为开发的分布式操作系统，支持手机、平板、智能穿戴、智慧屏、车机等多种设备，实现跨设备协同。'
      },
      {
        title: 'OpenHarmony vs HarmonyOS',
        content: 'OpenHarmony 是开源项目，提供基础能力；HarmonyOS 是华为基于 OpenHarmony 开发的商业版本，包含华为服务和生态。'
      },
      {
        title: '版本号含义',
        content: '版本号如 4.0.0 表示：4 是主版本（重大更新），0 是次版本（功能更新），0 是修订号（问题修复）。'
      }
    ]
  },

  // 电池相关 - 具体概念
  'battery_soc': {
    id: 'battery_soc',
    title: '电池电量 (SOC)',
    subtitle: 'State of Charge',
    description: '电池当前剩余电量百分比，是衡量电池剩余能量的直接指标。',
    details: [
      {
        title: '什么是 SOC？',
        content: 'SOC（State of Charge，荷电状态）表示电池当前剩余电量占总容量的百分比。100% 表示充满，0% 表示耗尽。这是最直接反映电池剩余能量的指标。'
      },
      {
        title: '为什么电量会跳变？',
        content: '电量显示基于电压估算，受温度、电池老化、使用状态影响。低温时电量可能突然下降，温度回升后可能恢复。这是正常现象，不代表电池故障。'
      },
      {
        title: '最佳使用范围',
        content: '为延长锂电池寿命，建议保持电量在 20%-80% 之间。长期满电或完全耗尽都会加速电池老化。偶尔充满或耗尽影响不大，但应避免长期保持极端状态。'
      }
    ]
  },

  'battery_temperature': {
    id: 'battery_temperature',
    title: '电池温度',
    subtitle: 'Battery Temperature',
    description: '电池当前的温度，过高或过低都会影响电池性能和寿命。',
    details: [
      {
        title: '正常工作温度',
        content: '电池正常工作温度范围是 0°C 到 45°C。20°C 到 30°C 是最佳工作温度，此时电池性能最好、寿命最长。'
      },
      {
        title: '高温的影响',
        content: '温度超过 45°C 会加速电池化学反应，导致容量永久损失。超过 60°C 可能触发保护机制停止充电。高温是电池老化的主要原因之一。'
      },
      {
        title: '低温的影响',
        content: '温度低于 0°C 时，电池内阻增大，可用容量下降，可能导致设备自动关机。低温下充电可能造成锂金属析出，损坏电池，因此低温时通常禁止充电。'
      },
      {
        title: '充电时发热',
        content: '充电时电池发热是正常现象，特别是快充时。如果感觉烫手（>45°C），建议暂停充电或移除手机壳散热。避免边充边玩大型游戏。'
      }
    ]
  },

  'battery_voltage': {
    id: 'battery_voltage',
    title: '电池电压',
    subtitle: 'Battery Voltage',
    description: '电池当前的电压值，反映电池的充电状态和健康程度。',
    details: [
      {
        title: '锂电池电压范围',
        content: '锂离子电池正常工作电压范围是 3.0V 到 4.4V。3.0V 以下为过放，可能损坏电池；4.4V 以上为过充，有安全风险。满电时约 4.2V-4.4V，空电时约 3.2V-3.5V。'
      },
      {
        title: '电压与电量关系',
        content: '电压与电量并非线性关系。3.5V 对应约 0-10% 电量，3.7V 对应约 20-30%，4.0V 对应约 60-70%，4.2V 对应约 90-100%。系统通过电压结合其他参数估算电量。'
      },
      {
        title: '电压异常意味着什么？',
        content: '电压异常高（>4.5V）可能是充电器故障；电压异常低（<3.0V）可能是电池老化或损坏；电压波动大可能是接触不良。遇到异常情况应停止使用并检查。'
      }
    ]
  },

  'battery_technology': {
    id: 'battery_technology',
    title: '电池技术',
    subtitle: 'Battery Technology',
    description: '电池采用的化学技术类型，决定了电池的性能特性。',
    details: [
      {
        title: '锂离子电池 (Li-ion)',
        content: '目前最常见的手机电池技术。能量密度高（200-250 Wh/kg）、无记忆效应、自放电率低。但会随时间自然老化，充放电 500 次后容量通常降至 80%。'
      },
      {
        title: '锂聚合物电池 (Li-Po)',
        content: '锂离子电池的改进版，使用固态/胶态电解质而非液态。可以做成更薄的形状，安全性略高，能量密度与 Li-ion 相近。现代手机大多使用 Li-Po。'
      },
      {
        title: '为什么不用其他电池？',
        content: '镍氢电池有记忆效应且能量密度低；镍镉电池有毒且容量小；固态电池更安全但成本太高。锂电池在能量密度、成本、安全性之间取得了最佳平衡。'
      }
    ]
  },

  'charging_power': {
    id: 'charging_power',
    title: '充电功率',
    subtitle: 'Charging Power',
    description: '当前充电的功率大小，功率越大充电越快。',
    details: [
      {
        title: '功率计算公式',
        content: '充电功率（W）= 充电电压（V）× 充电电流（A）。例如 9V/2A 的充电器功率为 18W。功率越大，单位时间内充入的电量越多。'
      },
      {
        title: '充电功率的变化',
        content: '充电过程分为三个阶段：1）恒流快充（功率最大，电量快速上升）；2）恒压充电（功率逐渐下降，保护电池）；3）涓流充电（功率很小，充满最后 10%）。'
      },
      {
        title: '为什么功率会波动？',
        content: '温度高时系统会降低功率保护电池；电量超过 80% 后功率会自动降低；使用非原装充电器可能无法达到最大功率；边充边用会分散功率。'
      }
    ]
  },

  'charging_current': {
    id: 'charging_current',
    title: '充电电流',
    subtitle: 'Charging Current',
    description: '当前流入电池的电流大小，单位为毫安(mA)。',
    details: [
      {
        title: '电流与充电速度',
        content: '电流越大，充电速度越快。普通充电约 2000mA (2A)，快充可达 4000-6000mA (4-6A)。但大电流会产生更多热量，需要更好的散热设计。'
      },
      {
        title: '电流的限制因素',
        content: '充电器最大输出电流、数据线承载能力、电池承受能力、设备温度都会限制实际电流。使用劣质数据线可能导致电流无法提升，充电变慢。'
      },
      {
        title: '负电流是什么意思？',
        content: '负电流表示电池在放电而非充电。这发生在：未连接充电器、边充边用且用电量大于充电量、系统显示误差。正常情况下充电时应为正数。'
      }
    ]
  },

  'charger_type': {
    id: 'charger_type',
    title: '充电器类型',
    subtitle: 'Charger Type',
    description: '当前使用的充电设备类型，影响充电速度和功率。',
    details: [
      {
        title: '交流充电器',
        content: '标准墙壁充电器，功率最高，通常支持快充协议。显示为"交流充电器"或具体功率（如"40W充电器"）。这是最快的充电方式。'
      },
      {
        title: 'USB（电脑）',
        content: '通过 USB 线连接电脑充电。USB 2.0 最大 2.5W (5V/0.5A)，USB 3.0 最大 4.5W (5V/0.9A)。速度很慢，适合紧急情况或传输数据时顺便充电。'
      },
      {
        title: '无线充电',
        content: '通过无线充电板充电，通常功率 5-15W，高端设备支持 50W+。效率略低于有线充电（约 70-80%），发热更大，但 convenience 高。'
      }
    ]
  },

  // 内存相关 - 具体概念
  'memory_usage_percent': {
    id: 'memory_usage_percent',
    title: '内存使用率',
    subtitle: 'Memory Usage Percentage',
    description: '系统内存已被使用的百分比，反映系统当前的内存压力。',
    details: [
      {
        title: '什么是内存使用率？',
        content: '内存使用率 = 已用内存 / 总内存 × 100%。它反映了系统当前的内存压力。使用率越高，系统越可能变慢，因为需要频繁交换数据。'
      },
      {
        title: '多少使用率算正常？',
        content: '60% 以下：充足，系统运行流畅；60-80%：正常，大部分设备的日常状态；80-90%：紧张，可能开始杀后台应用；90% 以上：严重不足，系统明显卡顿。'
      },
      {
        title: '为什么内存总是满的？',
        content: '现代操作系统会尽量利用空闲内存做缓存（文件缓存、应用缓存），所以内存使用率通常较高。这是正常优化，不代表内存不足。关键是看是否有足够的可用内存应对突发需求。'
      }
    ]
  },

  'available_memory': {
    id: 'available_memory',
    title: '可用内存',
    subtitle: 'Available Memory',
    description: '系统当前可以立即分配给应用使用的内存大小。',
    details: [
      {
        title: '什么是可用内存？',
        content: '可用内存 = 空闲内存 + 可回收缓存。它表示系统当前可以立即分配给新应用或任务的内存。与"空闲内存"不同，可用内存包含了可以被清空的缓存。'
      },
      {
        title: '可用内存 vs 空闲内存',
        content: '空闲内存是完全未被使用的内存；可用内存还包括文件缓存、应用缓存等，这些在需要时可以被清空。所以可用内存通常大于空闲内存，更能反映系统实际可用资源。'
      },
      {
        title: '多少可用内存算安全？',
        content: '建议保持至少 10% 总内存的可用内存。例如 8GB 内存的设备，保持 800MB 以上可用内存可以确保系统流畅运行，避免频繁杀后台。'
      }
    ]
  },

  'used_memory': {
    id: 'used_memory',
    title: '已用内存',
    subtitle: 'Used Memory',
    description: '系统当前已被占用的内存总量，包括应用和系统使用。',
    details: [
      {
        title: '已用内存包含什么？',
        content: '已用内存包括：系统内核和进程、正在运行的应用、后台服务、文件缓存、图形缓冲区等。它是总内存减去空闲内存的部分。'
      },
      {
        title: '为什么刚开机就用了很多内存？',
        content: '系统启动后会加载内核、系统服务、预加载常用应用，这些都会占用内存。现代手机开机后通常占用 3-5GB 内存是正常的，不代表有问题。'
      },
      {
        title: '如何减少内存使用？',
        content: '关闭不用的应用、限制后台进程数量、清理缓存、卸载不用的应用、使用轻量级替代应用。但不必过度追求低内存使用，系统会自主管理。'
      }
    ]
  },

  // 操作系统 - 具体概念
  'os_display_version': {
    id: 'os_display_version',
    title: '显示版本',
    subtitle: 'Display Version',
    description: '系统对外显示的版本号，是用户最常见的版本标识。',
    details: [
      {
        title: '显示版本的作用',
        content: '显示版本是面向用户的友好版本号，如"HarmonyOS 4.0"。它简化了复杂的内部版本号，方便用户识别和讨论。'
      },
      {
        title: '与内部版本的区别',
        content: '显示版本是简化的、稳定的标识；内部版本号包含更多技术细节（构建号、分支信息），用于开发和故障排查。同一显示版本可能有多个内部版本。'
      }
    ]
  },

  'os_incremental_version': {
    id: 'os_incremental_version',
    title: '内部版本',
    subtitle: 'Incremental Version',
    description: '系统的内部构建版本号，包含详细的构建信息。',
    details: [
      {
        title: '内部版本包含什么？',
        content: '内部版本通常包含：主版本号、构建日期、代码分支、提交哈希等。例如"4.0.0.108(C00E100R1P1)"包含了版本、构建号和区域信息。'
      },
      {
        title: '什么时候需要内部版本？',
        content: '反馈系统 bug、查询更新日志、确认是否安装了特定补丁时，需要提供内部版本号。它精确标识了系统的代码状态。'
      }
    ]
  },

  'os_version_id': {
    id: 'os_version_id',
    title: '版本号',
    subtitle: 'Version ID',
    description: '系统的唯一版本标识符，用于精确识别系统版本。',
    details: [
      {
        title: '版本号的构成',
        content: '版本号通常是数字或字母数字组合，唯一标识一个系统版本。它与显示版本对应，但更精确。例如显示版本"4.0"可能对应版本号"40"或"4.0.0"。'
      },
      {
        title: '版本号的用途',
        content: '应用开发时检查系统兼容性、系统更新时确认当前版本、故障排查时确认系统状态。开发者常用版本号判断 API 可用性。'
      }
    ]
  },

  'os_sdk_api': {
    id: 'os_sdk_api',
    title: 'SDK API 版本',
    subtitle: 'SDK API Version',
    description: '系统支持的软件开发接口级别，决定应用可用的功能。',
    details: [
      {
        title: '什么是 SDK API 版本？',
        content: 'SDK API 版本表示系统提供的应用开发接口级别。版本号越高，支持的功能越多。例如 API 12 支持的功能比 API 11 多。'
      },
      {
        title: '对用户的意义',
        content: '高 API 版本意味着系统更现代、功能更丰富。新应用通常需要较高 API 版本，旧设备可能无法运行最新应用。'
      },
      {
        title: '与 Android API 的区别',
        content: 'HarmonyOS API 版本独立于 Android。API 12 不代表对应 Android 12，而是 HarmonyOS 自身的接口级别。'
      }
    ]
  },

  'os_first_api': {
    id: 'os_first_api',
    title: '首次 API 版本',
    subtitle: 'First API Version',
    description: '设备出厂时搭载的 API 版本，反映设备的硬件代数。',
    details: [
      {
        title: '首次 API 版本的意义',
        content: '首次 API 版本表示设备出厂时的系统版本。它反映了设备的硬件代数和初始系统版本，不会因后续升级而改变。'
      },
      {
        title: '为什么重要？',
        content: '首次 API 版本可以帮助判断设备的硬件支持能力。例如，首次 API 9 的设备可能不支持 API 12 引入的某些硬件特性，即使系统已升级到 API 12。'
      }
    ]
  },

  'os_software_version': {
    id: 'os_software_version',
    title: '软件版本',
    subtitle: 'Software Version',
    description: '系统软件的完整版本标识，包含详细的技术信息。',
    details: [
      {
        title: '软件版本包含什么？',
        content: '软件版本是系统固件的完整标识，通常包含：系统版本、设备型号、区域代码、运营商信息等。它是系统最详细的版本描述。'
      },
      {
        title: '与显示版本的区别',
        content: '显示版本是简化的用户友好版本；软件版本是完整的技术版本，包含更多细节，用于精确识别系统状态。'
      }
    ]
  },

  'os_build_time': {
    id: 'os_build_time',
    title: '构建时间',
    subtitle: 'Build Time',
    description: '系统固件的编译打包时间，反映系统版本的新旧程度。',
    details: [
      {
        title: '构建时间的意义',
        content: '构建时间表示该系统固件的编译日期和时间。通过构建时间可以了解系统的更新频率和版本新旧。较新的构建通常包含更多 bug 修复。'
      },
      {
        title: '为什么构建时间比显示版本重要？',
        content: '同一显示版本可能有多个构建（修复补丁）。构建时间新的版本通常更稳定、更安全。检查更新时应关注构建时间而非仅仅是显示版本。'
      }
    ]
  },

  'os_security_patch': {
    id: 'os_security_patch',
    title: '安全补丁级别',
    subtitle: 'Security Patch Level',
    description: '系统安全补丁的日期，反映系统的安全更新状态。',
    details: [
      {
        title: '什么是安全补丁？',
        content: '安全补丁是修复系统安全漏洞的更新。Google 和华为每月发布安全公告，修复已知漏洞。安全补丁日期表示系统包含的补丁截止到哪个月份。'
      },
      {
        title: '为什么安全补丁重要？',
        content: '过期的安全补丁意味着设备可能存在已知漏洞，面临被攻击的风险。建议保持安全补丁在 3 个月内，最好是最新的。'
      },
      {
        title: '如何更新安全补丁？',
        content: '安全补丁通常随系统更新一起推送。进入 设置 > 系统和更新 > 软件更新 检查更新。建议开启自动更新以获得及时保护。'
      }
    ]
  },

  // CPU 相关 - 具体概念
  'cpu_architecture': {
    id: 'cpu_architecture',
    title: 'CPU 架构',
    subtitle: 'CPU Architecture',
    description: 'CPU 的指令集架构，决定 CPU 能执行什么类型的指令。',
    details: [
      {
        title: 'ARM 架构',
        content: '目前移动设备的主流架构。ARM64（或 AArch64）是 64 位架构，支持更大内存和更高性能。现代手机都使用 ARM64 架构。'
      },
      {
        title: 'ARM vs x86',
        content: 'ARM 是精简指令集（RISC），功耗低、发热小，适合移动设备；x86 是复杂指令集（CISC），性能强但功耗高，主要用于电脑。'
      },
      {
        title: 'abiList 是什么？',
        content: 'abiList（Application Binary Interface List）列出了设备支持的架构类型。例如"arm64-v8a,armeabi-v7a"表示支持 64 位和 32 位 ARM 应用。'
      }
    ]
  },

  'cpu_model': {
    id: 'cpu_model',
    title: 'CPU 型号',
    subtitle: 'CPU Model',
    description: '处理器的具体型号名称，反映 CPU 的性能等级。',
    details: [
      {
        title: '为什么型号显示"未知"？',
        content: 'HarmonyOS 出于安全和隐私考虑，限制了对详细 CPU 信息的访问。应用通常只能获取架构信息，无法获取具体型号（如骁龙 8 Gen 2、麒麟 9000 等）。'
      },
      {
        title: '如何推测 CPU 型号？',
        content: '可以通过核心数、架构、GPU 信息、设备型号等推测 CPU 型号。例如高端华为手机通常使用麒麟芯片，高端小米手机通常使用骁龙芯片。'
      }
    ]
  },

  // GPU 相关 - 具体概念
  'gpu_vendor': {
    id: 'gpu_vendor',
    title: 'GPU 厂商',
    subtitle: 'GPU Vendor',
    description: '图形处理器的制造商，不同厂商的 GPU 有不同的特性。',
    details: [
      {
        title: '常见 GPU 厂商',
        content: 'ARM（Mali 系列）：最常见的移动 GPU，广泛用于联发科、三星、华为芯片；Qualcomm（Adreno 系列）：骁龙芯片专用，游戏性能优秀；Imagination（PowerVR 系列）：苹果曾长期使用。'
      },
      {
        title: '厂商对性能的影响',
        content: '不同厂商的 GPU 架构不同，性能特点各异。Mali 注重能效比，Adreno 注重游戏性能，PowerVR 注重图像质量。同一厂商不同代产品性能也有差异。'
      }
    ]
  },

  'gpu_renderer': {
    id: 'gpu_renderer',
    title: 'GPU 型号',
    subtitle: 'GPU Renderer',
    description: '图形处理器的具体型号，决定图形处理能力。',
    details: [
      {
        title: 'GPU 型号命名',
        content: 'Mali 系列：G57、G68、G710 等，数字越大越新；Adreno 系列：610、650、740 等，数字越大性能越强。新型号支持更多特性和更高性能。'
      },
      {
        title: '型号与性能',
        content: 'GPU 型号直接决定图形处理能力。高端型号（如 Mali-G710、Adreno 740）可以流畅运行大型 3D 游戏；低端型号（如 Mali-G57）只能运行简单游戏。'
      }
    ]
  },

  'gpu_opengl_version': {
    id: 'gpu_opengl_version',
    title: 'OpenGL ES 版本',
    subtitle: 'OpenGL ES Version',
    description: '支持的移动图形 API 版本，决定可用的图形特性。',
    details: [
      {
        title: 'OpenGL ES 是什么？',
        content: 'OpenGL ES（Embedded Systems）是移动设备的标准图形 API。应用通过它调用 GPU 渲染 2D/3D 图形。版本越高支持的功能越多。'
      },
      {
        title: '版本演进',
        content: '2.0：基础 3D 功能；3.0：增加计算着色器、多目标渲染；3.1：增加几何着色器、曲面细分；3.2：增加 ASTC 纹理压缩、高级混合。现代设备通常支持 3.2。'
      },
      {
        title: '版本对应用的影响',
        content: '新游戏通常需要较高 OpenGL ES 版本。如果设备版本过低，可能无法运行某些游戏或无法开启高级特效。'
      }
    ]
  },

  'gpu_glsl_version': {
    id: 'gpu_glsl_version',
    title: 'GLSL 版本',
    subtitle: 'GLSL Version',
    description: '着色器编程语言版本，用于编写 GPU 渲染程序。',
    details: [
      {
        title: '什么是 GLSL？',
        content: 'GLSL（OpenGL Shading Language）是编写 GPU 着色器的编程语言。着色器是运行在 GPU 上的小程序，负责顶点处理、光照计算、像素着色等。'
      },
      {
        title: 'GLSL 版本对应关系',
        content: 'GLSL ES 3.0 对应 OpenGL ES 3.0，GLSL ES 3.1 对应 OpenGL ES 3.1，以此类推。着色器版本必须与 OpenGL ES 版本匹配。'
      },
      {
        title: '为什么重要？',
        content: '高级图形效果（如物理渲染、全局光照）需要高版本 GLSL 支持。游戏开发者需要根据目标设备的 GLSL 版本选择合适的渲染技术。'
      }
    ]
  }
};

// 获取概念信息
export function getConceptInfo(id: string): ConceptInfo | undefined {
  return ConceptConfig[id];
}

// 获取所有概念 ID
export function getAllConceptIds(): string[] {
  return Object.keys(ConceptConfig);
}
