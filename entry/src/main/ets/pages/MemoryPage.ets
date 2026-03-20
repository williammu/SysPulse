import router from '@ohos.router';
import { FormatUtil } from '../utils/FormatUtil';
import { InfoCard } from '../components/InfoCard';
import { InfoCardWithDesc } from '../components/InfoButton';
import { InfoHeader } from '../components/InfoButton';
import { nativeApi, SystemMemInfo } from '../utils/NativeApi';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { NavigationBarWithArrow } from '../components/NavigationBar';

const TAG = 'MemoryPage';
const REFRESH_INTERVAL = 200;

@Entry
@Component
struct MemoryPage {
  @State systemMemInfo: SystemMemInfo | null = null;
  @State isNativeAvailable: boolean = false;
  @State isLoading: boolean = true;
  private refreshTimer: number | null = null;

  aboutToAppear() {
    hilog.info(0x0000, TAG, 'MemoryPage aboutToAppear - START');
    this.isNativeAvailable = nativeApi.isNativeAvailable();
    hilog.info(0x0000, TAG, 'Native API available: %{public}s', String(this.isNativeAvailable));

    if (this.isNativeAvailable) {
      this.loadMemoryInfo();
      this.refreshTimer = setInterval(() => {
        this.loadMemoryInfo();
      }, REFRESH_INTERVAL);
    }

    setTimeout(() => {
      this.isLoading = false;
    }, 100);
    hilog.info(0x0000, TAG, 'MemoryPage aboutToAppear - END');
  }

  aboutToDisappear() {
    if (this.refreshTimer !== null) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  loadMemoryInfo() {
    this.systemMemInfo = nativeApi.getSystemMemInfo();
  }

  getTotalMemory(): string {
    if (this.systemMemInfo?.success && this.systemMemInfo.total > 0) {
      return FormatUtil.formatBytes(this.systemMemInfo.total);
    }
    return '未获取';
  }

  getAvailableMemory(): string {
    if (this.systemMemInfo?.success && this.systemMemInfo.available > 0) {
      return FormatUtil.formatBytes(this.systemMemInfo.available);
    }
    return '未获取';
  }

  getUsedMemory(): string {
    if (this.systemMemInfo?.success && this.systemMemInfo.total > 0 && this.systemMemInfo.available > 0) {
      const used = this.systemMemInfo.total - this.systemMemInfo.available;
      return FormatUtil.formatBytes(used);
    }
    return '未获取';
  }

  getMemoryUsagePercent(): number {
    if (this.systemMemInfo?.success && this.systemMemInfo.total > 0 && this.systemMemInfo.available > 0) {
      const used = this.systemMemInfo.total - this.systemMemInfo.available;
      return Math.round((used / this.systemMemInfo.total) * 100);
    }
    return 0;
  }

  // 跳转到概念详情页
  navigateToConcept(conceptId: string): void {
    router.pushUrl({
      url: 'pages/ConceptDetailPage',
      params: { conceptId: conceptId }
    });
  }

  build() {
    Column() {
      NavigationBarWithArrow({
        title: '内存',
        onBack: () => {
          router.back();
        }
      })

      Scroll() {
        Column() {
          if (this.isLoading) {
            Text('加载中...')
              .fontSize(16)
              .fontColor($r('app.color.text_secondary'))
              .margin(24);
          } else if (!this.isNativeAvailable) {
            InfoHeader({ title: '内存状态' });

            Column() {
              Text('Native API 不可用')
                .fontSize(18)
                .fontColor($r('app.color.text_secondary'))
                .margin(24);

              Text('请确保 Native 模块已正确编译并打包')
                .fontSize(14)
                .fontColor($r('app.color.text_secondary'));
            }
            .width('100%')
            .padding(24)
            .borderRadius(12)
            .backgroundColor($r('app.color.background_card'))
            .alignItems(HorizontalAlign.Center);
          } else {
            // 系统内存概览
            InfoHeader({
              title: '系统内存',
              subtitle: '显示设备总内存和使用情况'
            });

            Column() {
              Text(this.getTotalMemory())
                .fontSize(48)
                .fontWeight(FontWeight.Bold)
                .fontColor($r('app.color.primary_color'));

              Text('总内存')
                .fontSize(14)
                .fontColor($r('app.color.text_secondary'))
                .margin({ top: 8 });
            }
            .width('100%')
            .padding(24)
            .borderRadius(12)
            .backgroundColor($r('app.color.background_card'))
            .alignItems(HorizontalAlign.Center);

            if (this.getMemoryUsagePercent() > 0) {
              InfoCardWithDesc({
                title: '内存使用率',
                value: `${this.getMemoryUsagePercent()}%`,
                conceptId: 'memory_usage_percent',
                onInfoClick: () => this.navigateToConcept('memory_usage_percent')
              })
              .margin({ top: 16 });
            }

            InfoCardWithDesc({
              title: '可用内存',
              value: this.getAvailableMemory(),
              conceptId: 'available_memory',
              onInfoClick: () => this.navigateToConcept('available_memory')
            });

            InfoCardWithDesc({
              title: '已用内存',
              value: this.getUsedMemory(),
              conceptId: 'used_memory',
              onInfoClick: () => this.navigateToConcept('used_memory')
            });
          }
        }
        .width('100%')
        .padding(16);
      }
      .layoutWeight(1);
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.background_dark'));
  }
}
