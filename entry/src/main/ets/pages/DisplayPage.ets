import router from '@ohos.router';
import { DeviceUtil } from '../utils/DeviceUtil';
import { InfoCard } from '../components/InfoCard';
import { SectionHeader } from '../components/SectionHeader';
import type { DisplayInfoModel } from '../model/DeviceInfo';

@Entry
@Component
struct DisplayPage {
  @State displayInfo: DisplayInfoModel | null = null;

  async aboutToAppear() {
    this.displayInfo = await DeviceUtil.getDisplayInfo();
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

        Text('屏幕')
          .fontSize(20)
          .fontWeight(FontWeight.Medium)
          .fontColor($r('app.color.text_primary'))
          .margin({ left: 12 })
      }
      .width('100%')
      .padding({ left: 16, right: 16, top: 12, bottom: 12 })

      Scroll() {
        Column() {
          SectionHeader({ title: '屏幕信息' })

          InfoCard({
            title: '分辨率',
            value: this.displayInfo ? `${this.displayInfo.width} × ${this.displayInfo.height}` : '--'
          })

          InfoCard({
            title: '像素密度',
            value: this.displayInfo ? `${this.displayInfo.densityDPI} DPI` : '--'
          })

          InfoCard({
            title: '刷新率',
            value: this.displayInfo ? `${this.displayInfo.refreshRate} Hz` : '--'
          })

          InfoCard({
            title: 'X轴DPI',
            value: this.displayInfo ? `${this.displayInfo.xDPI}` : '--'
          })

          InfoCard({
            title: 'Y轴DPI',
            value: this.displayInfo ? `${this.displayInfo.yDPI}` : '--'
          })

          InfoCard({
            title: '显示状态',
            value: this.displayInfo ? (this.displayInfo.alive ? '正常' : '异常') : '--'
          })

          InfoCard({
            title: '旋转角度',
            value: this.displayInfo ? `${this.displayInfo.rotation}°` : '--'
          })

          SectionHeader({ title: '说明' })

          InfoCard({
            title: '数据来源',
            value: '所有屏幕信息均来自 @ohos.display API'
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
