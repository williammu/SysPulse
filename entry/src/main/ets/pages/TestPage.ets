import router from '@ohos.router';
import { SystemInfoCore } from '../utils/SystemInfoCore';
import { nativeApi, SystemMemInfo, AppMemInfo, MemoryLimit, CpuUsage, CpuUsageAll, ThreadCpuInfo } from '../utils/NativeApi';
import { FormatUtil } from '../utils/FormatUtil';
import { hilog } from '@kit.PerformanceAnalysisKit';
import type {
  DeviceInfoModel,
  BatteryInfoModel,
  DisplayInfoModel,
  StorageInfoModel,
  NetworkInfoModel
} from '../model/DeviceInfo';

@Entry
@Component
struct TestPage {
  @State testResults: string = '点击下方按钮运行测试';
  @State deviceInfo: DeviceInfoModel | null = null;
  @State batteryInfo: BatteryInfoModel | null = null;
  @State displayInfo: DisplayInfoModel | null = null;
  @State storageInfo: StorageInfoModel | null = null;
  @State networkInfo: NetworkInfoModel | null = null;

  // Native API 数据
  @State systemMemInfo: SystemMemInfo | null = null;
  @State appMemInfo: AppMemInfo | null = null;
  @State memoryLimit: MemoryLimit | null = null;
  @State systemCpuUsage: CpuUsage | null = null;
  @State appCpuUsage: CpuUsage | null = null;
  @State cpuUsageAll: CpuUsageAll | null = null;
  @State isNativeAvailable: boolean = false;

  @State isTesting: boolean = false;

  aboutToAppear() {
    // 页面初始化时检查 Native API 可用性
    this.isNativeAvailable = nativeApi.isNativeAvailable();
    hilog.info(0x0000, 'TestPage', 'Native API available in aboutToAppear: %{public}s', String(this.isNativeAvailable));
    
    // 自动运行测试
    this.runTests();
  }

  async runTests() {
    this.isTesting = true;
    this.testResults = '正在运行测试...';

    try {
      console.log('========== 开始运行系统信息测试 ==========');
      await SystemInfoCore.runAllTests();

      this.deviceInfo = SystemInfoCore.getDeviceInfo();
      this.batteryInfo = SystemInfoCore.getBatteryInfo();
      this.displayInfo = await SystemInfoCore.getDisplayInfo();
      this.storageInfo = SystemInfoCore.getStorageInfo();
      this.networkInfo = await SystemInfoCore.getNetworkInfo();

      // 获取 Native API 数据
      this.isNativeAvailable = nativeApi.isNativeAvailable();
      if (this.isNativeAvailable) {
        this.systemMemInfo = nativeApi.getSystemMemInfo();
        this.appMemInfo = nativeApi.getAppMemInfo();
        this.memoryLimit = nativeApi.getMemoryLimit();
        this.systemCpuUsage = nativeApi.getSystemCpuUsage();
        this.appCpuUsage = nativeApi.getAppCpuUsage();
        this.cpuUsageAll = nativeApi.getCpuUsageAll();
      }

      this.testResults = '测试完成！请查看下方详细信息';
    } catch (error) {
      this.testResults = `测试失败: ${JSON.stringify(error)}`;
      console.error('Test error:', error);
    }

    this.isTesting = false;
  }

  formatBytes(bytes: number | undefined): string {
    if (bytes === undefined || bytes === 0) {
      return '未获取';
    }
    return FormatUtil.formatBytes(bytes);
  }

  formatPercent(value: number | undefined): string {
    if (value === undefined) {
      return '未获取';
    }
    return `${value.toFixed(2)}%`;
  }

  build() {
    Column() {
      Row() {
        Text('← 返回')
          .fontSize(18)
          .onClick(() => {
            router.back();
          })
        Blank()
          .layoutWeight(1)
        Text('系统信息测试')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
        Blank()
          .layoutWeight(1)
        Blank()
      }
      .width('100%')
      .height(50)
      .padding({ left: 16, right: 16 })

      Scroll() {
        Column({ space: 16 }) {
          Text('测试控制')
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .width('100%')

          Button(this.isTesting ? '测试中...' : '运行所有测试')
            .width('100%')
            .height(50)
            .enabled(!this.isTesting)
            .onClick(() => {
              this.runTests();
            })

          Text(this.testResults)
            .fontSize(14)
            .width('100%')
            .padding(12)
            .backgroundColor('#f5f5f5')
            .borderRadius(8)

          // Native API 状态
          this.buildNativeApiStatusSection()

          if (this.systemMemInfo?.success) {
            this.buildSystemMemSection()
          }

          if (this.appMemInfo?.success) {
            this.buildAppMemSection()
          }

          if (this.systemCpuUsage?.success) {
            this.buildCpuSection()
          }

          if (this.deviceInfo) {
            this.buildDeviceInfoSection()
          }

          if (this.batteryInfo) {
            this.buildBatteryInfoSection()
          }

          if (this.displayInfo) {
            this.buildDisplayInfoSection()
          }

          if (this.storageInfo) {
            this.buildStorageInfoSection()
          }

          if (this.networkInfo) {
            this.buildNetworkInfoSection()
          }
        }
        .padding(16)
        .width('100%')
      }
      .layoutWeight(1)
      .width('100%')
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#ffffff')
  }

  @Builder
  buildNativeApiStatusSection() {
    Column({ space: 8 }) {
      Text('Native API 状态')
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .width('100%')

      this.buildInfoItem('Native API 可用', this.isNativeAvailable ? '是' : '否')
      this.buildInfoItem('HiDebug 模块', this.isNativeAvailable ? '已加载' : '未加载')
      this.buildInfoItem('状态值', String(this.isNativeAvailable))
    }
    .width('100%')
    .padding(12)
    .backgroundColor('#e6f7ff')
    .borderRadius(8)
  }

  getUsedMemoryText(): string {
    if (this.systemMemInfo && this.systemMemInfo.total > 0 && this.systemMemInfo.available > 0) {
      const used: number = this.systemMemInfo.total - this.systemMemInfo.available;
      const percent: string = ((used / this.systemMemInfo.total) * 100).toFixed(1);
      return `${this.formatBytes(used)} (${percent}%)`;
    }
    return '未获取';
  }

  @Builder
  buildSystemMemSection() {
    Column({ space: 8 }) {
      Text('系统内存 (Native API)')
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .width('100%')

      this.buildInfoItem('总内存', this.formatBytes(this.systemMemInfo?.total))
      this.buildInfoItem('可用内存', this.formatBytes(this.systemMemInfo?.available))
      this.buildInfoItem('空闲内存', this.formatBytes(this.systemMemInfo?.free))
      this.buildInfoItem('已用内存', this.getUsedMemoryText())
    }
    .width('100%')
    .padding(12)
    .backgroundColor('#f6ffed')
    .borderRadius(8)
  }

  @Builder
  buildAppMemSection() {
    Column({ space: 8 }) {
      Text('应用内存 (Native API)')
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .width('100%')

      this.buildInfoItem('PSS', this.formatBytes(this.appMemInfo?.pss))
      this.buildInfoItem('RSS', this.formatBytes(this.appMemInfo?.rss))
      this.buildInfoItem('VSS', this.formatBytes(this.appMemInfo?.vss))
      this.buildInfoItem('Shared Clean', this.formatBytes(this.appMemInfo?.sharedClean))
      this.buildInfoItem('Shared Dirty', this.formatBytes(this.appMemInfo?.sharedDirty))
      this.buildInfoItem('Private Clean', this.formatBytes(this.appMemInfo?.privateClean))
      this.buildInfoItem('Private Dirty', this.formatBytes(this.appMemInfo?.privateDirty))

      if (this.memoryLimit?.success) {
        this.buildInfoItem('RSS 限制', this.formatBytes(this.memoryLimit?.rssLimit))
        this.buildInfoItem('VSS 限制', this.formatBytes(this.memoryLimit?.vssLimit))
      }
    }
    .width('100%')
    .padding(12)
    .backgroundColor('#fff7e6')
    .borderRadius(8)
  }

  @Builder
  buildCpuSection() {
    Column({ space: 8 }) {
      Text('CPU 信息 (Native API)')
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .width('100%')

      this.buildInfoItem('系统 CPU 使用率', this.formatPercent(this.systemCpuUsage?.percentage))

      if (this.appCpuUsage?.success) {
        this.buildInfoItem('应用 CPU 使用率', this.formatPercent(this.appCpuUsage?.percentage))
      }

      if (this.cpuUsageAll?.success && this.cpuUsageAll.threads.length > 0) {
        this.buildInfoItem('线程数量', this.cpuUsageAll.threadCount.toString())

        // 显示前 5 个线程
        ForEach(this.cpuUsageAll.threads.slice(0, 5), (thread: ThreadCpuInfo) => {
          this.buildInfoItem(`线程 ${thread.threadId}`, `${thread.percentage.toFixed(2)}%`)
        }, (thread: ThreadCpuInfo) => thread.threadId.toString())
      }
    }
    .width('100%')
    .padding(12)
    .backgroundColor('#f9f0ff')
    .borderRadius(8)
  }

  @Builder
  buildDeviceInfoSection() {
    Column({ space: 8 }) {
      Text('设备信息')
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .width('100%')

      this.buildInfoItem('设备类型', this.deviceInfo?.deviceType || '未知')
      this.buildInfoItem('设备厂家', this.deviceInfo?.manufacture || '未知')
      this.buildInfoItem('设备品牌', this.deviceInfo?.brand || '未知')
      this.buildInfoItem('市场名称', this.deviceInfo?.marketName || '未知')
      this.buildInfoItem('产品系列', this.deviceInfo?.productSeries || '未知')
      this.buildInfoItem('产品型号', this.deviceInfo?.productModel || '未知')
      this.buildInfoItem('系统版本', this.deviceInfo?.osFullName || '未知')
      this.buildInfoItem('API 版本', (this.deviceInfo?.sdkApiVersion || 0).toString())
      this.buildInfoItem('CPU 架构', this.deviceInfo?.abiList || '未获取')
    }
    .width('100%')
    .padding(12)
    .backgroundColor('#f0f8ff')
    .borderRadius(8)
  }

  @Builder
  buildBatteryInfoSection() {
    Column({ space: 8 }) {
      Text('电池信息')
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .width('100%')

      this.buildInfoItem('电量', `${this.batteryInfo?.batterySOC || 0}%`)
      this.buildInfoItem('充电状态', this.batteryInfo?.chargingStatus.toString() || '0')
      this.buildInfoItem('健康状态', this.batteryInfo?.healthStatus.toString() || '0')
      this.buildInfoItem('温度', `${((this.batteryInfo?.batteryTemperature || 0) / 10).toFixed(1)}°C`)
      this.buildInfoItem('电压', `${this.batteryInfo?.voltage || 0} μV`)
      this.buildInfoItem('技术', this.batteryInfo?.technology || '未知')
    }
    .width('100%')
    .padding(12)
    .backgroundColor('#fff8f0')
    .borderRadius(8)
  }

  @Builder
  buildDisplayInfoSection() {
    Column({ space: 8 }) {
      Text('屏幕信息')
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .width('100%')

      this.buildInfoItem('分辨率', `${this.displayInfo?.width || 0} × ${this.displayInfo?.height || 0}`)
      this.buildInfoItem('像素密度', `${this.displayInfo?.densityDPI || 0} DPI`)
      this.buildInfoItem('刷新率', `${this.displayInfo?.refreshRate || 0} Hz`)
      this.buildInfoItem('旋转角度', `${this.displayInfo?.rotation || 0}°`)
      this.buildInfoItem('X DPI', `${this.displayInfo?.xDPI || 0}`)
      this.buildInfoItem('Y DPI', `${this.displayInfo?.yDPI || 0}`)
    }
    .width('100%')
    .padding(12)
    .backgroundColor('#f0fff0')
    .borderRadius(8)
  }

  @Builder
  buildStorageInfoSection() {
    Column({ space: 8 }) {
      Text('存储信息')
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .width('100%')

      this.buildInfoItem('总存储', this.getStorageDisplayValue(this.storageInfo?.totalSize))
      this.buildInfoItem('可用存储', this.getStorageDisplayValue(this.storageInfo?.freeSize))
      this.buildInfoItem('已用存储', this.getStorageDisplayValue(this.storageInfo?.usedSize))
    }
    .width('100%')
    .padding(12)
    .backgroundColor('#fff0f0')
    .borderRadius(8)
  }

  @Builder
  buildNetworkInfoSection() {
    Column({ space: 8 }) {
      Text('网络信息')
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .width('100%')

      this.buildInfoItem('网络类型', this.networkInfo?.netType || '未知')
    }
    .width('100%')
    .padding(12)
    .backgroundColor('#f0f0ff')
    .borderRadius(8)
  }

  @Builder
  buildInfoItem(label: string, value: string) {
    Row() {
      Text(label)
        .fontSize(14)
        .width(140)
      Text(value)
        .fontSize(14)
        .layoutWeight(1)
    }
    .width('100%')
  }

  formatStorageSize(bytes: number): string {
    const gb = (bytes / 1024 / 1024 / 1024).toFixed(2);
    return `${gb} GB`;
  }

  getStorageDisplayValue(bytes: number | undefined): string {
    if (bytes === undefined || bytes === 0) {
      return '未获取';
    }
    return this.formatStorageSize(bytes);
  }
}
