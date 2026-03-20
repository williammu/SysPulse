import router from '@ohos.router';
import { DeviceUtil } from '../utils/DeviceUtil';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { InfoHeader } from '../components/InfoButton';
import { InfoCard } from '../components/InfoCard';
import { InfoCardWithDesc } from '../components/InfoButton';
import { NavigationBarWithArrow } from '../components/NavigationBar';
import type { DeviceInfoModel } from '../model/DeviceInfo';

const TAG = 'OSPage';

// 操作系统关键信息页面
@Entry
@Component
struct OSPage {
  @State deviceInfo: DeviceInfoModel | null = null;
  @State isLoading: boolean = true;

  aboutToAppear() {
    hilog.info(0x0000, TAG, 'OSPage appeared');
    
    // 获取设备信息
    this.deviceInfo = DeviceUtil.getDeviceInfo();
    this.isLoading = false;
    
    hilog.info(0x0000, TAG, 'Device info loaded: %{public}s', 
      this.deviceInfo ? 'success' : 'failed');
  }

  // 构建版本号显示
  private getVersionDisplay(): string {
    if (!this.deviceInfo) return '未知';
    return `${this.deviceInfo.majorVersion}.${this.deviceInfo.seniorVersion}.${this.deviceInfo.featureVersion}`;
  }

  // 构建完整版本显示
  private getFullVersionDisplay(): string {
    if (!this.deviceInfo) return '未知';
    return `${this.deviceInfo.osFullName} (${this.deviceInfo.displayVersion})`;
  }

  // 将时间戳转换为可读日期
  private formatBuildTime(): string {
    if (!this.deviceInfo || !this.deviceInfo.buildTime || this.deviceInfo.buildTime === '未知') {
      return '未知';
    }
    try {
      const timestamp = parseInt(this.deviceInfo.buildTime);
      if (isNaN(timestamp)) return this.deviceInfo.buildTime;
      const date = new Date(timestamp);
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch (e) {
      return this.deviceInfo.buildTime;
    }
  }

  // 跳转到概念详情页
  private navigateToConcept(conceptId: string): void {
    router.pushUrl({
      url: 'pages/ConceptDetailPage',
      params: { conceptId: conceptId }
    });
  }

  build() {
    Column() {
      NavigationBarWithArrow({
        title: '操作系统',
        onBack: () => {
          router.back();
        }
      })

      // 内容区域
      Scroll() {
        Column() {
          if (this.isLoading) {
            Text('加载中...')
              .fontSize(16)
              .fontColor($r('app.color.text_secondary'))
              .margin(24)
          } else {
            // 系统版本 prominently displayed
            Column() {
              Text(this.deviceInfo?.osFullName || 'HarmonyOS')
                .fontSize(28)
                .fontWeight(FontWeight.Bold)
                .fontColor($r('app.color.primary_color'))
                .textAlign(TextAlign.Center)
                .width('100%')

              Text(this.getVersionDisplay())
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

            // 版本信息
            InfoHeader({
              title: '版本信息',
              subtitle: 'SYSTEM VERSION',
              conceptId: 'os_version',
              onInfoClick: () => this.navigateToConcept('os_version')
            });

            InfoCardWithDesc({
              title: '系统名称',
              value: this.deviceInfo?.osFullName || '未知',
              conceptId: 'os_name',
              onInfoClick: () => this.navigateToConcept('os_name')
            })

            InfoCardWithDesc({
              title: '显示版本',
              value: this.deviceInfo?.displayVersion || '未知',
              conceptId: 'os_display_version',
              onInfoClick: () => this.navigateToConcept('os_display_version')
            })

            InfoCardWithDesc({
              title: '内部版本',
              value: this.deviceInfo?.incrementalVersion || '未知',
              conceptId: 'os_incremental_version',
              onInfoClick: () => this.navigateToConcept('os_incremental_version')
            })

            InfoCardWithDesc({
              title: '版本号',
              value: this.deviceInfo?.versionId || '未知',
              conceptId: 'os_version_id',
              onInfoClick: () => this.navigateToConcept('os_version_id')
            })

            InfoCardWithDesc({
              title: 'SDK API 版本',
              value: `${this.deviceInfo?.sdkApiVersion || 0}`,
              conceptId: 'os_sdk_api',
              onInfoClick: () => this.navigateToConcept('os_sdk_api')
            })

            InfoCardWithDesc({
              title: '首次 API 版本',
              value: `${this.deviceInfo?.firstApiVersion || 0}`,
              conceptId: 'os_first_api',
              onInfoClick: () => this.navigateToConcept('os_first_api')
            })

            // 构建信息
            InfoHeader({
              title: '构建信息',
              subtitle: 'BUILD INFO',
              conceptId: 'os_build',
              onInfoClick: () => this.navigateToConcept('os_build')
            });

            InfoCardWithDesc({
              title: '软件版本',
              value: this.deviceInfo?.softwareVersion || '未知',
              conceptId: 'os_software_version',
              onInfoClick: () => this.navigateToConcept('os_software_version')
            })

            InfoCardWithDesc({
              title: '构建时间',
              value: this.formatBuildTime(),
              conceptId: 'os_build_time',
              onInfoClick: () => this.navigateToConcept('os_build_time')
            })

            // 安全信息
            InfoHeader({
              title: '安全信息',
              subtitle: 'SECURITY INFO',
              conceptId: 'os_security',
              onInfoClick: () => this.navigateToConcept('os_security')
            });

            InfoCardWithDesc({
              title: '安全补丁级别',
              value: this.deviceInfo?.securityPatchTag || '未知',
              conceptId: 'os_security_patch',
              onInfoClick: () => this.navigateToConcept('os_security_patch')
            })

            // 底部留白
            Row().height(32)
          }
        }
        .width('100%')
        .padding(16)
      }
      .layoutWeight(1)
      .scrollBar(BarState.Auto)
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.background_dark'))
  }
}
