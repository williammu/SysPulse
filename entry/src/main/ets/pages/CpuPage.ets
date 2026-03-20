import router from '@ohos.router';
import { DeviceUtil } from '../utils/DeviceUtil';
import { InfoCard } from '../components/InfoCard';
import { InfoHeader, InfoCardWithDesc } from '../components/InfoButton';
import { SimpleChart } from '../components/SimpleChart';
import { NavigationBarWithArrow } from '../components/NavigationBar';
import { nativeApi, CpuUsage } from '../utils/NativeApi';
import type { CpuBaseInfo } from '../utils/NativeApi';
import { hilog } from '@kit.PerformanceAnalysisKit';

const TAG = 'CpuPage';
const REFRESH_INTERVAL = 200;
const CHART_MAX_POINTS = 50;

interface CpuPageInfo {
  model: string;
  cores: number;
  architecture: string;
}



@Entry
@Component
struct CpuPage {
  @State cpuInfo: CpuPageInfo | null = null;
  @State systemCpuUsage: CpuUsage | null = null;
  @State isNativeAvailable: boolean = false;
  @State isLoading: boolean = true;
  @State systemCpuHistory: number[] = [];
  private refreshTimer: number | null = null;

  aboutToAppear() {
    this.isNativeAvailable = nativeApi.isNativeAvailable();
    hilog.info(0x0000, TAG, 'Native API available: %{public}s', String(this.isNativeAvailable));

    if (this.isNativeAvailable) {
      // 从 Native API 获取 CPU 基础信息
      const nativeCpuInfo = nativeApi.getCpuInfo();
      hilog.info(0x0000, TAG, 'Native CPU info: %{public}s', JSON.stringify(nativeCpuInfo));
      if (nativeCpuInfo && nativeCpuInfo.success) {
        this.cpuInfo = {
          model: nativeCpuInfo.model || '未获取',
          cores: nativeCpuInfo.cores || 0,
          architecture: nativeCpuInfo.architecture || '未获取'
        };
        hilog.info(0x0000, TAG, 'Using native CPU info: model=%{public}s, cores=%{public}d', this.cpuInfo.model, this.cpuInfo.cores);
      } else {
        // 如果 Native API 获取失败，使用 DeviceUtil 作为备用
        hilog.info(0x0000, TAG, 'Native CPU info failed, fallback to DeviceUtil');
        const baseInfo = DeviceUtil.getCpuInfo();
        this.cpuInfo = {
          model: baseInfo.model || '未获取',
          cores: baseInfo.cores || 0,
          architecture: baseInfo.architecture || '未获取'
        };
      }

      this.loadCpuInfo();
      this.refreshTimer = setInterval(() => {
        this.loadCpuInfo();
      }, REFRESH_INTERVAL);
    } else {
      // Native API 不可用，使用 DeviceUtil
      const baseInfo = DeviceUtil.getCpuInfo();
      this.cpuInfo = {
        model: baseInfo.model || '未获取',
        cores: baseInfo.cores || 0,
        architecture: baseInfo.architecture || '未获取'
      };
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

    if (this.systemCpuUsage?.success) {
      this.systemCpuHistory.push(this.systemCpuUsage.percentage);
      if (this.systemCpuHistory.length > CHART_MAX_POINTS) {
        this.systemCpuHistory.shift();
      }
    }
  }

  getSystemCpuUsagePercent(): number {
    if (this.systemCpuUsage?.success) {
      return Math.round(this.systemCpuUsage.percentage);
    }
    return 0;
  }

  getCoreCount(): string {
    if (this.cpuInfo && this.cpuInfo.cores > 0) {
      return `${this.cpuInfo.cores} 核`;
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
        title: '处理器',
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
              .margin(24)
          } else {
            // 处理器型号 prominently displayed
            Column() {
              // 优先使用 deviceInfo 的 hardwareModel，其次是 Native API 的 model
              Text(DeviceUtil.getCpuInfo().model || this.cpuInfo?.model || '未知型号')
                .fontSize(28)
                .fontWeight(FontWeight.Bold)
                .fontColor($r('app.color.primary_color'))
                .textAlign(TextAlign.Center)
                .width('100%')

              // 优先使用 deviceInfo 的 abiList，其次是 Native API 的 architecture
              Text(`${this.getCoreCount()} · ${DeviceUtil.getCpuInfo().architecture || this.cpuInfo?.architecture || '未知架构'}`)
                .fontSize(14)
                .fontColor($r('app.color.text_secondary'))
                .margin({ top: 8 })
                .textAlign(TextAlign.Center)
                .width('100%')
            }
            .width('100%')
            .padding({ top: 24, bottom: 24 })
            .backgroundColor($r('app.color.background_card'))
            .borderRadius(12)
            .margin({ bottom: 16 })

            // CPU 使用率概览
            InfoHeader({
              title: 'CPU 使用率',
              subtitle: '显示系统整体 CPU 使用率',
              conceptId: 'cpu_usage',
              onInfoClick: () => this.navigateToConcept('cpu_usage')
            });

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
            InfoHeader({
              title: 'CPU 信息',
              subtitle: '显示 CPU 的硬件规格信息',
              conceptId: 'cpu_cores',
              onInfoClick: () => this.navigateToConcept('cpu_cores')
            });

            InfoCardWithDesc({
              title: '架构',
              value: DeviceUtil.getCpuInfo().architecture || this.cpuInfo?.architecture || '未获取',
              conceptId: 'cpu_architecture',
              onInfoClick: () => this.navigateToConcept('cpu_architecture')
            })

            InfoCardWithDesc({
              title: '核心数',
              value: this.getCoreCount(),
              conceptId: 'cpu_cores',
              onInfoClick: () => this.navigateToConcept('cpu_cores')
            })

            InfoCardWithDesc({
              title: '型号',
              value: DeviceUtil.getCpuInfo().model || this.cpuInfo?.model || '未获取',
              conceptId: 'cpu_model',
              onInfoClick: () => this.navigateToConcept('cpu_model')
            })
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
