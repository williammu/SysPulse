import router from '@ohos.router';
import { DeviceUtil } from '../utils/DeviceUtil';
import { FormatUtil } from '../utils/FormatUtil';
import { TechCard, StatusCard } from '../components/InfoCard';
import { SysInfoMenuItem } from '../components/MenuItem';
import { TechHeader } from '../components/SectionHeader';
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
  @State currentTime: string = '';
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

    // 更新时间
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
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

  // 更新时间
  private updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  }

  // 获取CPU使用率显示
  getCpuUsageDisplay(): string {
    if (this.systemCpuUsage?.success) {
      return `${this.systemCpuUsage.percentage.toFixed(1)}`;
    }
    return '--';
  }

  // 获取内存使用率显示
  getMemoryUsageDisplay(): string {
    if (this.systemMemInfo?.success && this.systemMemInfo.total > 0 && this.systemMemInfo.available > 0) {
      const used = this.systemMemInfo.total - this.systemMemInfo.available;
      const percent = ((used / this.systemMemInfo.total) * 100).toFixed(1);
      return `${percent}`;
    }
    return '--';
  }

  // 获取总内存显示
  getTotalMemoryDisplay(): string {
    if (this.systemMemInfo?.success && this.systemMemInfo.total > 0) {
      return FormatUtil.formatBytes(this.systemMemInfo.total);
    }
    return '--';
  }

  // 获取应用内存显示
  getAppMemoryDisplay(): string {
    if (this.appMemInfo?.success && this.appMemInfo.pss > 0) {
      return FormatUtil.formatBytes(this.appMemInfo.pss);
    }
    return '--';
  }

  // 获取电池显示
  getBatteryDisplay(): string {
    if (this.batteryInfo) {
      return `${this.batteryInfo.batterySOC}`;
    }
    return '--';
  }

  // 获取存储显示
  getStorageDisplay(): string {
    if (this.storageInfo && this.storageInfo.totalSize > 0) {
      return FormatUtil.formatBytes(this.storageInfo.totalSize);
    }
    return '--';
  }

  build() {
    Scroll() {
      Column() {
        // 顶部状态栏
        Row() {
          Row() {
            Row()
              .width(8)
              .height(8)
              .backgroundColor($r('app.color.success_color'))
              .borderRadius(4)
              .shadow({
                radius: 6,
                color: $r('app.color.success_color'),
                offsetX: 0,
                offsetY: 0
              })

            Text('SYSTEM ONLINE')
              .fontSize(11)
              .fontColor($r('app.color.success_color'))
              .margin({ left: 6 })
              .letterSpacing(1)
          }

          Text(this.currentTime)
            .fontSize(14)
            .fontColor($r('app.color.text_secondary'))
            .letterSpacing(2)
        }
        .width('100%')
        .justifyContent(FlexAlign.SpaceBetween)
        .padding({ top: 12, bottom: 12 })

        // 设备标题区域
        Column() {
          // 品牌标识
          Row() {
            Text('SYS')
              .fontSize(32)
              .fontWeight(FontWeight.Bold)
              .fontColor($r('app.color.text_primary'))

            Text('PULSE')
              .fontSize(32)
              .fontWeight(FontWeight.Bold)
              .fontColor($r('app.color.primary_color'))
              .shadow({
                radius: 10,
                color: $r('app.color.primary_color'),
                offsetX: 0,
                offsetY: 0
              })
          }

          Text(this.deviceInfo?.marketName || '设备型号')
            .fontSize(16)
            .fontColor($r('app.color.text_secondary'))
            .margin({ top: 8 })

          Text(`${this.deviceInfo?.brand || '品牌'} · ${this.deviceInfo?.osFullName || '系统版本'}`)
            .fontSize(12)
            .fontColor($r('app.color.text_tertiary'))
            .margin({ top: 4 })
        }
        .width('100%')
        .padding({ top: 16, bottom: 24 })

        // 实时状态卡片 - 核心信息
        TechHeader({
          title: '实时监控',
          subtitle: 'REAL-TIME MONITORING'
        })

        Grid() {
          GridItem() {
            TechCard({
              title: 'CPU 使用率',
              value: this.getCpuUsageDisplay(),
              unit: '%'
            })
          }
          .onClick(() => {
            router.pushUrl({ url: 'pages/CpuPage' });
          })

          GridItem() {
            TechCard({
              title: '内存使用率',
              value: this.getMemoryUsageDisplay(),
              unit: '%'
            })
          }
          .onClick(() => {
            router.pushUrl({ url: 'pages/MemoryPage' });
          })

          GridItem() {
            TechCard({
              title: '应用内存',
              value: this.getAppMemoryDisplay(),
              unit: ''
            })
          }
          .onClick(() => {
            router.pushUrl({ url: 'pages/MemoryPage' });
          })

          GridItem() {
            TechCard({
              title: '电池电量',
              value: this.getBatteryDisplay(),
              unit: '%'
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
        TechHeader({
          title: '硬件信息',
          subtitle: 'HARDWARE INFO'
        })

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
          subtitle: `${this.getBatteryDisplay()}% · 点击查看详情`,
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
        TechHeader({
          title: '连接与传感器',
          subtitle: 'CONNECTIVITY & SENSORS'
        })

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
        TechHeader({
          title: '其他',
          subtitle: 'OTHERS'
        })

        SysInfoMenuItem({
          title: '系统信息测试',
          subtitle: '运行完整 API 测试',
          onTap: () => {
            router.pushUrl({ url: 'pages/TestPage' });
          }
        })

        SysInfoMenuItem({
          title: '关于',
          subtitle: 'SysPulse v1.0.0',
          onTap: () => {
            router.pushUrl({ url: 'pages/AboutPage' });
          }
        })

        // 底部装饰
        Row() {
          Row()
            .width(60)
            .height(1)
            .backgroundColor($r('app.color.border_color'))

          Text('●')
            .fontSize(8)
            .fontColor($r('app.color.primary_color'))
            .margin({ left: 8, right: 8 })

          Row()
            .width(60)
            .height(1)
            .backgroundColor($r('app.color.border_color'))
        }
        .justifyContent(FlexAlign.Center)
        .margin({ top: 32, bottom: 16 })
      }
      .width('100%')
      .padding(16)
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.background_dark'))
  }
}
