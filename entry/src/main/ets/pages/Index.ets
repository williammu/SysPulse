import router from '@ohos.router';
import { DeviceUtil } from '../utils/DeviceUtil';
import { FormatUtil } from '../utils/FormatUtil';
import { InfoCard } from '../components/InfoCard';
import { SysInfoMenuItem } from '../components/MenuItem';
import { SectionHeader } from '../components/SectionHeader';
import { nativeApi, SystemMemInfo, CpuUsage, AppMemInfo } from '../utils/NativeApi';
import type { DeviceInfoModel, BatteryInfoModel, DisplayInfoModel, StorageInfoModel } from '../model/DeviceInfo';

@Entry
@Component
struct Index {
  @State deviceInfo: DeviceInfoModel | null = null;
  @State batteryInfo: BatteryInfoModel | null = null;
  @State systemMemInfo: SystemMemInfo | null = null;
  @State appMemInfo: AppMemInfo | null = null;
  @State systemCpuUsage: CpuUsage | null = null;
  @State displayInfo: DisplayInfoModel | null = null;
  @State storageInfo: StorageInfoModel | null = null;
  private refreshTimer: number | null = null;

  aboutToAppear() {
    // 初始化静态数据
    this.deviceInfo = DeviceUtil.getDeviceInfo();
    this.displayInfo = DeviceUtil.getDisplayInfoSync();
    this.storageInfo = DeviceUtil.getStorageInfo();

    // 立即刷新一次动态数据
    this.refreshDynamicData();

    // 启动定时刷新 (200ms)
    this.refreshTimer = setInterval(() => {
      this.refreshDynamicData();
    }, 200);
  }

  aboutToDisappear() {
    // 停止定时刷新
    if (this.refreshTimer !== null) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  // 刷新动态数据
  private refreshDynamicData(): void {
    if (nativeApi.isNativeAvailable()) {
      this.systemMemInfo = nativeApi.getSystemMemInfo();
      this.appMemInfo = nativeApi.getAppMemInfo();
      this.systemCpuUsage = nativeApi.getSystemCpuUsage();
    }
    this.batteryInfo = DeviceUtil.getBatteryInfo();
  }

  // 获取CPU使用率显示
  getCpuUsageDisplay(): string {
    if (this.systemCpuUsage?.success) {
      return `${this.systemCpuUsage.percentage.toFixed(1)}%`;
    }
    return '未获取';
  }

  // 获取内存使用率显示
  getMemoryUsageDisplay(): string {
    if (this.systemMemInfo?.success && this.systemMemInfo.total > 0 && this.systemMemInfo.available > 0) {
      const used = this.systemMemInfo.total - this.systemMemInfo.available;
      const percent = ((used / this.systemMemInfo.total) * 100).toFixed(1);
      return `${percent}%`;
    }
    return '未获取';
  }

  // 获取总内存显示
  getTotalMemoryDisplay(): string {
    if (this.systemMemInfo?.success && this.systemMemInfo.total > 0) {
      return FormatUtil.formatBytes(this.systemMemInfo.total);
    }
    return '未获取';
  }

  // 获取应用内存显示
  getAppMemoryDisplay(): string {
    if (this.appMemInfo?.success && this.appMemInfo.pss > 0) {
      return FormatUtil.formatBytes(this.appMemInfo.pss);
    }
    return '未获取';
  }

  // 获取电池显示
  getBatteryDisplay(): string {
    if (this.batteryInfo) {
      return `${this.batteryInfo.batterySOC}%`;
    }
    return '--';
  }

  // 获取存储显示
  getStorageDisplay(): string {
    if (this.storageInfo && this.storageInfo.totalSize > 0) {
      return FormatUtil.formatBytes(this.storageInfo.totalSize);
    }
    return '未获取';
  }

  build() {
    Scroll() {
      Column() {
        // 设备标题
        Column() {
          Text(this.deviceInfo?.marketName || '设备型号')
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .fontColor($r('app.color.text_primary'))

          Text(`${this.deviceInfo?.brand || '品牌'} · ${this.deviceInfo?.osFullName || '系统版本'}`)
            .fontSize(14)
            .fontColor($r('app.color.text_secondary'))
            .margin({ top: 4 })
        }
        .width('100%')
        .padding({ top: 20, bottom: 24 })

        // 实时状态卡片 - 核心信息
        SectionHeader({ title: '实时状态' })

        Grid() {
          GridItem() {
            InfoCard({
              title: 'CPU 使用率',
              value: this.getCpuUsageDisplay()
            })
          }
          .onClick(() => {
            router.pushUrl({ url: 'pages/CpuPage' });
          })

          GridItem() {
            InfoCard({
              title: '内存使用率',
              value: this.getMemoryUsageDisplay()
            })
          }
          .onClick(() => {
            router.pushUrl({ url: 'pages/MemoryPage' });
          })

          GridItem() {
            InfoCard({
              title: '应用内存',
              value: this.getAppMemoryDisplay()
            })
          }
          .onClick(() => {
            router.pushUrl({ url: 'pages/MemoryPage' });
          })

          GridItem() {
            InfoCard({
              title: '电池电量',
              value: this.getBatteryDisplay()
            })
          }
          .onClick(() => {
            router.pushUrl({ url: 'pages/BatteryPage' });
          })
        }
        .columnsTemplate('1fr 1fr')
        .columnsGap(12)
        .rowsGap(12)
        .width('100%')

        // 硬件信息
        SectionHeader({ title: '硬件信息' })

        SysInfoMenuItem({
          title: '处理器',
          subtitle: `${DeviceUtil.getCpuInfo().architecture || '未知'} · 点击查看详情`,
          onTap: () => {
            router.pushUrl({ url: 'pages/CpuPage' });
          }
        })

        SysInfoMenuItem({
          title: '内存',
          subtitle: `总计 ${this.getTotalMemoryDisplay()} · 点击查看详情`,
          onTap: () => {
            router.pushUrl({ url: 'pages/MemoryPage' });
          }
        })

        SysInfoMenuItem({
          title: '存储',
          subtitle: `总计 ${this.getStorageDisplay()} · 点击查看详情`,
          onTap: () => {
            router.pushUrl({ url: 'pages/StoragePage' });
          }
        })

        SysInfoMenuItem({
          title: '屏幕',
          subtitle: this.displayInfo ? `${this.displayInfo.width} × ${this.displayInfo.height} · ${this.displayInfo.refreshRate}Hz` : '--',
          onTap: () => {
            router.pushUrl({ url: 'pages/DisplayPage' });
          }
        })

        SysInfoMenuItem({
          title: '电池',
          subtitle: `${this.getBatteryDisplay()} · 点击查看详情`,
          onTap: () => {
            router.pushUrl({ url: 'pages/BatteryPage' });
          }
        })

        SysInfoMenuItem({
          title: 'GPU',
          subtitle: '点击查看详情',
          onTap: () => {
            router.pushUrl({ url: 'pages/GpuPage' });
          }
        })

        // 连接与传感器
        SectionHeader({ title: '连接与传感器' })

        SysInfoMenuItem({
          title: '网络',
          subtitle: '点击查看详情',
          onTap: () => {
            router.pushUrl({ url: 'pages/NetworkPage' });
          }
        })

        SysInfoMenuItem({
          title: '摄像头',
          subtitle: '点击查看详情',
          onTap: () => {
            router.pushUrl({ url: 'pages/CameraPage' });
          }
        })

        SysInfoMenuItem({
          title: '传感器',
          subtitle: '点击查看详情',
          onTap: () => {
            router.pushUrl({ url: 'pages/SensorPage' });
          }
        })

        // 其他
        SectionHeader({ title: '其他' })

        SysInfoMenuItem({
          title: '系统信息测试',
          subtitle: '运行完整 API 测试',
          onTap: () => {
            router.pushUrl({ url: 'pages/TestPage' });
          }
        })

        SysInfoMenuItem({
          title: '关于',
          subtitle: 'SysInfo v1.0.0',
          onTap: () => {
            router.pushUrl({ url: 'pages/AboutPage' });
          }
        })
      }
      .width('100%')
      .padding(16)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F7F8FA')
  }
}
