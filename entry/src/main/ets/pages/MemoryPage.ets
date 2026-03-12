import router from '@ohos.router';
import { FormatUtil } from '../utils/FormatUtil';
import { InfoCard } from '../components/InfoCard';
import { InfoHeader, InfoCardWithDesc } from '../components/InfoButton';
import { nativeApi, SystemMemInfo, AppMemInfo, MemoryLimit } from '../utils/NativeApi';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { NavigationBarWithArrow } from '../components/NavigationBar';

const TAG = 'MemoryPage';
const REFRESH_INTERVAL = 200;

@Entry
@Component
struct MemoryPage {
  @State systemMemInfo: SystemMemInfo | null = null;
  @State appMemInfo: AppMemInfo | null = null;
  @State memoryLimit: MemoryLimit | null = null;
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
    this.appMemInfo = nativeApi.getAppMemInfo();
    this.memoryLimit = nativeApi.getMemoryLimit();
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

  getAppPss(): string {
    if (this.appMemInfo?.success && this.appMemInfo.pss > 0) {
      return FormatUtil.formatBytes(this.appMemInfo.pss);
    }
    return '未获取';
  }

  getAppRss(): string {
    if (this.appMemInfo?.success && this.appMemInfo.rss > 0) {
      return FormatUtil.formatBytes(this.appMemInfo.rss);
    }
    return '未获取';
  }

  getAppVss(): string {
    if (this.appMemInfo?.success && this.appMemInfo.vss > 0) {
      return FormatUtil.formatBytes(this.appMemInfo.vss);
    }
    return '未获取';
  }

  getMemoryLimit(): string {
    if (this.memoryLimit?.success) {
      if (this.memoryLimit.rssLimit === -1) {
        return '无限制';
      }
      if (this.memoryLimit.rssLimit > 0) {
        return FormatUtil.formatBytes(this.memoryLimit.rssLimit);
      }
    }
    return '未获取';
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
              InfoCard({
                title: '内存使用率',
                value: `${this.getMemoryUsagePercent()}%`
              })
              .margin({ top: 16 });
            }

            InfoCard({
              title: '可用内存',
              value: this.getAvailableMemory()
            });

            InfoCard({
              title: '已用内存',
              value: this.getUsedMemory()
            });

            // 应用内存
            InfoHeader({
              title: '应用内存',
              subtitle: 'PSS、RSS、VSS 内存指标',
              conceptId: 'memory_pss',
              onInfoClick: () => this.navigateToConcept('memory_pss')
            });

            if (this.appMemInfo?.success) {
              Column() {
                Text(this.getAppPss())
                  .fontSize(36)
                  .fontWeight(FontWeight.Bold)
                  .fontColor($r('app.color.primary_color'));

                Text('PSS (实际使用内存)')
                  .fontSize(14)
                  .fontColor($r('app.color.text_secondary'))
                  .margin({ top: 8 });
              }
              .width('100%')
              .padding(20)
              .borderRadius(12)
              .backgroundColor($r('app.color.background_card'))
              .alignItems(HorizontalAlign.Center)
              .margin({ bottom: 12 });
            }

            InfoCardWithDesc({
              title: 'RSS (驻留内存)',
              value: this.getAppRss(),
              conceptId: 'memory_rss',
              onInfoClick: () => this.navigateToConcept('memory_rss')
            });

            InfoCardWithDesc({
              title: 'VSS (虚拟内存)',
              value: this.getAppVss(),
              conceptId: 'memory_vss',
              onInfoClick: () => this.navigateToConcept('memory_vss')
            });

            // 内存分类
            if (this.appMemInfo?.success) {
              InfoHeader({
                title: '内存分类',
                subtitle: 'Shared/Private Clean/Dirty',
                conceptId: 'memory_shared',
                onInfoClick: () => this.navigateToConcept('memory_shared')
              });

              InfoCardWithDesc({
                title: 'Shared Clean',
                value: FormatUtil.formatBytes(this.appMemInfo.sharedClean),
                conceptId: 'memory_shared',
                onInfoClick: () => this.navigateToConcept('memory_shared')
              });

              InfoCardWithDesc({
                title: 'Shared Dirty',
                value: FormatUtil.formatBytes(this.appMemInfo.sharedDirty),
                conceptId: 'memory_shared',
                onInfoClick: () => this.navigateToConcept('memory_shared')
              });

              InfoCardWithDesc({
                title: 'Private Clean',
                value: FormatUtil.formatBytes(this.appMemInfo.privateClean),
                conceptId: 'memory_shared',
                onInfoClick: () => this.navigateToConcept('memory_shared')
              });

              InfoCardWithDesc({
                title: 'Private Dirty',
                value: FormatUtil.formatBytes(this.appMemInfo.privateDirty),
                conceptId: 'memory_shared',
                onInfoClick: () => this.navigateToConcept('memory_shared')
              });
            }

            // 内存限制
            InfoHeader({
              title: '内存限制',
              subtitle: '系统为应用设置的内存上限',
              conceptId: 'memory_limit',
              onInfoClick: () => this.navigateToConcept('memory_limit')
            });

            InfoCardWithDesc({
              title: 'RSS 限制',
              value: this.getMemoryLimit(),
              conceptId: 'memory_limit',
              onInfoClick: () => this.navigateToConcept('memory_limit')
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
