import router from '@ohos.router';
import { DeviceUtil } from '../utils/DeviceUtil';
import { InfoCard } from '../components/InfoCard';
import { ProgressBar } from '../components/ProgressBar';
import { SectionHeader } from '../components/SectionHeader';
import type { BatteryInfoModel } from '../model/DeviceInfo';

@Entry
@Component
struct BatteryPage {
  @State batteryInfo: BatteryInfoModel | null = null;

  aboutToAppear() {
    this.batteryInfo = DeviceUtil.getBatteryInfo();
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

        Text('电池')
          .fontSize(20)
          .fontWeight(FontWeight.Medium)
          .fontColor($r('app.color.text_primary'))
          .margin({ left: 12 })
      }
      .width('100%')
      .padding({ left: 16, right: 16, top: 12, bottom: 12 })

      Scroll() {
        Column() {
          SectionHeader({ title: '电池状态' })

          Column() {
            Text(this.batteryInfo ? `${this.batteryInfo.batterySOC}%` : '--')
              .fontSize(48)
              .fontWeight(FontWeight.Bold)
              .fontColor($r('app.color.primary_color'))

            ProgressBar({
              progress: this.batteryInfo?.batterySOC || 0,
              total: 100,
              barHeight: 12,
              color: (this.batteryInfo?.batterySOC ?? 0) > 20 ? '#00B578' : '#F53F3F'
            })
            .margin({ top: 16 })

            Text(this.batteryInfo?.chargingStatus ? '充电中' : '未充电')
              .fontSize(16)
              .fontColor($r('app.color.text_secondary'))
              .margin({ top: 12 })
          }
          .width('100%')
          .padding(24)
          .borderRadius(12)
          .backgroundColor($r('app.color.background_card'))
          .alignItems(HorizontalAlign.Center)

          SectionHeader({ title: '电池信息' })

          InfoCard({
            title: '电量',
            value: this.batteryInfo ? `${this.batteryInfo.batterySOC}%` : '--'
          })

          InfoCard({
            title: '温度',
            value: this.batteryInfo?.batteryTemperature ? `${(this.batteryInfo.batteryTemperature / 10).toFixed(1)}°C` : '--'
          })

          InfoCard({
            title: '电压',
            value: this.batteryInfo?.voltage ? `${this.batteryInfo.voltage} μV` : '--'
          })

          InfoCard({
            title: '电池技术',
            value: this.batteryInfo?.technology || '--'
          })

          InfoCard({
            title: '健康状态',
            value: this.batteryInfo?.healthStatus !== undefined ? `${this.batteryInfo.healthStatus}` : '--'
          })

          InfoCard({
            title: '充电器类型',
            value: this.batteryInfo?.pluggedType !== undefined ? `${this.batteryInfo.pluggedType}` : '--'
          })
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
