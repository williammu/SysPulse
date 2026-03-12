import router from '@ohos.router';
import { DeviceUtil } from '../utils/DeviceUtil';
import { InfoCard } from '../components/InfoCard';
import { SectionHeader } from '../components/SectionHeader';
import { SimpleChart } from '../components/SimpleChart';
import { nativeApi, CpuUsage, CpuUsageAll, ThreadCpuInfo } from '../utils/NativeApi';
import { hilog } from '@kit.PerformanceAnalysisKit';

const TAG = 'CpuPage';
const REFRESH_INTERVAL = 200;
const CHART_MAX_POINTS = 50;

interface CpuBaseInfo {
  model: string;
  cores: number;
  architecture: string;
  process: string;
}

@Entry
@Component
struct CpuPage {
  @State cpuInfo: CpuBaseInfo | null = null;
  @State systemCpuUsage: CpuUsage | null = null;
  @State appCpuUsage: CpuUsage | null = null;
  @State cpuUsageAll: CpuUsageAll | null = null;
  @State isNativeAvailable: boolean = false;
  @State isLoading: boolean = true;
  @State systemCpuHistory: number[] = [];
  @State appCpuHistory: number[] = [];
  private refreshTimer: number | null = null;

  aboutToAppear() {
    const baseInfo = DeviceUtil.getCpuInfo();
    this.cpuInfo = {
      model: baseInfo.model || '未获取',
      cores: baseInfo.cores || 0,
      architecture: baseInfo.architecture || '未获取',
      process: baseInfo.process || '未获取'
    };

    this.isNativeAvailable = nativeApi.isNativeAvailable();

    if (this.isNativeAvailable) {
      this.loadCpuInfo();
      this.refreshTimer = setInterval(() => {
        this.loadCpuInfo();
      }, REFRESH_INTERVAL);
    }

    setTimeout(() => {
      this.isLoading = false;
    }, 100);
  }

  aboutToDisappear() {
    if (this.refreshTimer !== null) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  loadCpuInfo() {
    this.systemCpuUsage = nativeApi.getSystemCpuUsage();
    this.appCpuUsage = nativeApi.getAppCpuUsage();
    this.cpuUsageAll = nativeApi.getCpuUsageAll();

    if (this.systemCpuUsage?.success) {
      this.systemCpuHistory.push(this.systemCpuUsage.percentage);
      if (this.systemCpuHistory.length > CHART_MAX_POINTS) {
        this.systemCpuHistory.shift();
      }
    }
    if (this.appCpuUsage?.success) {
      this.appCpuHistory.push(this.appCpuUsage.percentage);
      if (this.appCpuHistory.length > CHART_MAX_POINTS) {
        this.appCpuHistory.shift();
      }
    }
  }

  getSystemCpuUsagePercent(): number {
    if (this.systemCpuUsage?.success) {
      return Math.round(this.systemCpuUsage.percentage);
    }
    return 0;
  }

  getAppCpuUsagePercent(): number {
    if (this.appCpuUsage?.success) {
      return Math.round(this.appCpuUsage.percentage);
    }
    return 0;
  }

  getCoreCount(): string {
    if (this.cpuInfo && this.cpuInfo.cores > 0) {
      return `${this.cpuInfo.cores} 核`;
    }
    return '未获取';
  }

  @Builder
  DataDescription(text: string) {
    Text(text)
      .fontSize(12)
      .fontColor($r('app.color.text_secondary'))
      .margin({ top: 4, bottom: 8 })
      .width('100%')
  }

  build() {
    Column() {
      Row() {
        Text('← 返回')
          .fontSize(16)
          .fontColor($r('app.color.primary_color'))
          .onClick(() => {
            router.back();
          })

        Text('处理器')
          .fontSize(20)
          .fontWeight(FontWeight.Medium)
          .fontColor($r('app.color.text_primary'))
          .margin({ left: 12 })
      }
      .width('100%')
      .padding({ left: 16, right: 16, top: 12, bottom: 12 })

      Scroll() {
        Column() {
          if (this.isLoading) {
            Text('加载中...')
              .fontSize(16)
              .fontColor($r('app.color.text_secondary'))
              .margin(24)
          } else {
            // CPU 使用率概览
            SectionHeader({ title: 'CPU 使用率' });
            this.DataDescription('显示系统和应用的 CPU 使用率。CPU 使用率表示处理器在一段时间内处于忙碌状态的时间比例。');

            if (this.isNativeAvailable && this.systemCpuUsage?.success) {
              Column() {
                Text(`${this.getSystemCpuUsagePercent()}%`)
                  .fontSize(48)
                  .fontWeight(FontWeight.Bold)
                  .fontColor($r('app.color.primary_color'))

                Text('系统 CPU 使用率')
                  .fontSize(14)
                  .fontColor($r('app.color.text_secondary'))
                  .margin({ top: 8 })
              }
              .width('100%')
              .padding(24)
              .borderRadius(12)
              .backgroundColor($r('app.color.background_card'))
              .alignItems(HorizontalAlign.Center)

              // CPU 使用率趋势图
              if (this.systemCpuHistory.length > 1) {
                SimpleChart({
                  data: this.systemCpuHistory,
                  maxValue: 100,
                  color: '#007DFF',
                  title: '系统 CPU 使用率趋势'
                })
                .margin({ top: 16 })
              }

              // 应用 CPU 使用率
              if (this.appCpuUsage?.success) {
                InfoCard({
                  title: '应用 CPU 使用率',
                  value: `${this.getAppCpuUsagePercent()}%`
                })
              }
            } else {
              Column() {
                Text(this.isNativeAvailable ? '无法获取 CPU 使用率' : 'Native API 不可用')
                  .fontSize(18)
                  .fontColor($r('app.color.text_secondary'))
                  .margin(24)
              }
              .width('100%')
              .padding(24)
              .borderRadius(12)
              .backgroundColor($r('app.color.background_card'))
              .alignItems(HorizontalAlign.Center)
            }

            // CPU 基本信息
            SectionHeader({ title: 'CPU 信息' });
            this.DataDescription('显示 CPU 的硬件规格信息，包括架构、核心数、型号等。');

            InfoCard({
              title: '架构',
              value: this.cpuInfo?.architecture || '未获取'
            })

            InfoCard({
              title: '核心数',
              value: this.getCoreCount()
            })

            InfoCard({
              title: '型号',
              value: this.cpuInfo?.model || '未获取'
            })

            InfoCard({
              title: '制程工艺',
              value: this.cpuInfo?.process || '未获取'
            })

            // 线程 CPU 使用率
            if (this.cpuUsageAll?.success && this.cpuUsageAll.threads.length > 0) {
              SectionHeader({ title: `线程 CPU 使用率 (${this.cpuUsageAll.threadCount})` });
              this.DataDescription('显示应用各线程的 CPU 使用率。线程是程序执行的最小单位，多线程可以提高程序的并发性能。');

              ForEach(this.cpuUsageAll.threads.slice(0, 15), (thread: ThreadCpuInfo) => {
                InfoCard({
                  title: `线程 ${thread.threadId}`,
                  value: `${Math.round(thread.percentage)}%`
                })
              }, (thread: ThreadCpuInfo) => thread.threadId.toString())
            }
          }
        }
        .width('100%')
        .padding(16)
      }
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.background_dark'))
  }
}
