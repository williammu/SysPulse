import router from '@ohos.router';
import { DeviceUtil } from '../utils/DeviceUtil';
import { InfoCard } from '../components/InfoCard';
import { SectionHeader } from '../components/SectionHeader';
import type { DeviceInfoModel } from '../model/DeviceInfo';
import { NavigationBarWithArrow } from '../components/NavigationBar';

@Entry
@Component
struct AboutPage {
  @State deviceInfo: DeviceInfoModel | null = null;

  aboutToAppear() {
    this.deviceInfo = DeviceUtil.getDeviceInfo();
  }

  build() {
    Column() {
      NavigationBarWithArrow({
        title: '关于',
        onBack: () => {
          router.back();
        }
      })

      Scroll() {
        Column() {
          Column() {
            Text('SysPulse')
              .fontSize(24)
              .fontWeight(FontWeight.Bold)
              .margin({ top: 12 })

            Text('v1.0.0')
              .fontSize(16)
              .fontColor($r('app.color.text_secondary'))
              .margin({ top: 4 })
          }
          .width('100%')
          .padding(24)
          .alignItems(HorizontalAlign.Center)

          SectionHeader({ title: '设备信息' })

          InfoCard({
            title: '设备型号',
            value: this.deviceInfo?.marketName || '--'
          })

          InfoCard({
            title: '品牌',
            value: this.deviceInfo?.brand || '--'
          })

          InfoCard({
            title: '制造商',
            value: this.deviceInfo?.manufacture || '--'
          })

          SectionHeader({ title: '系统信息' })

          InfoCard({
            title: '系统版本',
            value: this.deviceInfo?.osFullName || '--'
          })

          InfoCard({
            title: '系统类型',
            value: 'HarmonyOS'
          })

          InfoCard({
            title: 'API 版本',
            value: this.deviceInfo?.sdkApiVersion ? `API ${this.deviceInfo.sdkApiVersion}` : '--'
          })

          InfoCard({
            title: '设备类型',
            value: this.deviceInfo?.deviceType || '--'
          })

          InfoCard({
            title: '编译类型',
            value: this.deviceInfo?.buildType || '--'
          })

          Column() {
            Text('© 2026 SysPulse. All rights reserved.')
              .fontSize(12)
              .fontColor($r('app.color.text_secondary'))
          }
          .width('100%')
          .padding({ top: 24, bottom: 24 })
          .alignItems(HorizontalAlign.Center)
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
