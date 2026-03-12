import router from '@ohos.router';
import { FormatUtil } from '../utils/FormatUtil';
import { InfoCard } from '../components/InfoCard';
import { SectionHeader } from '../components/SectionHeader';
import { nativeApi, SystemMemInfo, AppMemInfo, MemoryLimit } from '../utils/NativeApi';
import { hilog } from '@kit.PerformanceAnalysisKit';

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
    if (this.memoryLimit?.success && this.memoryLimit.rssLimit > 0) {
      return FormatUtil.formatBytes(this.memoryLimit.rssLimit);
    }
    return '未获取';
  }

  @Builder
  DataDescription(text: string) {
    Text(text)
      .fontSize(12)
      .fontColor($r('app.color.text_secondary'))
      .margin({ top: 4, bottom: 8 })
      .width('100%');
  }

  build() {
    Column() {
      Row() {
        Text('← 返回')
          .fontSize(16)
          .fontColor($r('app.color.primary_color'))
          .onClick(() => {
            router.back();
          });

        Text('内存')
          .fontSize(20)
          .fontWeight(FontWeight.Medium)
          .margin({ left: 12 });
      }
      .width('100%')
      .padding({ left: 16, right: 16, top: 12, bottom: 12 });

      Scroll() {
        Column() {
          if (this.isLoading) {
            Text('加载中...')
              .fontSize(16)
              .fontColor($r('app.color.text_secondary'))
              .margin(24);
          } else if (!this.isNativeAvailable) {
            SectionHeader({ title: '内存状态' });

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
            .backgroundColor($r('app.color.card_bg'))
            .alignItems(HorizontalAlign.Center);
          } else {
            // 系统内存概览
            SectionHeader({ title: '系统内存' });
            this.DataDescription('显示设备总内存和使用情况。总内存是设备物理内存的总量，可用内存是当前可分配给应用程序的内存。');

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
            .backgroundColor($r('app.color.card_bg'))
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
            SectionHeader({ title: '应用内存' });
            this.DataDescription('PSS：实际使用的物理内存。RSS：驻留内存大小。VSS：虚拟内存大小。');

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
              .backgroundColor($r('app.color.card_bg'))
              .alignItems(HorizontalAlign.Center)
              .margin({ bottom: 12 });
            }

            InfoCard({
              title: 'RSS (驻留内存)',
              value: this.getAppRss()
            });

            InfoCard({
              title: 'VSS (虚拟内存)',
              value: this.getAppVss()
            });

            // 内存分类
            if (this.appMemInfo?.success) {
              SectionHeader({ title: '内存分类' });
              this.DataDescription('Shared：与其他进程共享的内存。Private：进程独占的内存。Clean：未修改的内存页。Dirty：已修改的内存页。');

              InfoCard({
                title: 'Shared Clean',
                value: FormatUtil.formatBytes(this.appMemInfo.sharedClean)
              });

              InfoCard({
                title: 'Shared Dirty',
                value: FormatUtil.formatBytes(this.appMemInfo.sharedDirty)
              });

              InfoCard({
                title: 'Private Clean',
                value: FormatUtil.formatBytes(this.appMemInfo.privateClean)
              });

              InfoCard({
                title: 'Private Dirty',
                value: FormatUtil.formatBytes(this.appMemInfo.privateDirty)
              });
            }

            // 内存限制
            SectionHeader({ title: '内存限制' });
            this.DataDescription('系统为每个进程设置的内存使用上限。当应用内存超过限制时，系统可能会触发内存警告或终止应用。');

            InfoCard({
              title: 'RSS 限制',
              value: this.getMemoryLimit()
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
    .backgroundColor('#F7F8FA');
  }
}
