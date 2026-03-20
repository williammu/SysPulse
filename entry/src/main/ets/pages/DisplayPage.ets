import router from '@ohos.router';
import { DeviceUtil } from '../utils/DeviceUtil';
import { InfoCard } from '../components/InfoCard';
import { InfoCardWithDesc } from '../components/InfoButton';
import { SectionHeader } from '../components/SectionHeader';
import type { DisplayInfoModel } from '../model/DeviceInfo';
import { NavigationBarWithArrow } from '../components/NavigationBar';

@Entry
@Component
struct DisplayPage {
  @State displayInfo: DisplayInfoModel | null = null;

  async aboutToAppear() {
    this.displayInfo = await DeviceUtil.getDisplayInfo();
  }

  build() {
    Column() {
      NavigationBarWithArrow({
        title: '屏幕',
        onBack: () => {
          router.back();
        }
      })

      Scroll() {
        Column() {
          SectionHeader({ title: '屏幕信息' })

          InfoCardWithDesc({
            title: '分辨率',
            value: this.displayInfo ? `${this.displayInfo.width} × ${this.displayInfo.height}` : '--',
            conceptId: 'screen_resolution',
            onInfoClick: () => {
              router.pushUrl({
                url: 'pages/ConceptDetailPage',
                params: { conceptId: 'screen_resolution' }
              });
            }
          })

          InfoCardWithDesc({
            title: '像素密度',
            value: this.displayInfo ? `${this.displayInfo.densityDPI} DPI` : '--',
            conceptId: 'screen_density',
            onInfoClick: () => {
              router.pushUrl({
                url: 'pages/ConceptDetailPage',
                params: { conceptId: 'screen_density' }
              });
            }
          })

          InfoCardWithDesc({
            title: '刷新率',
            value: this.displayInfo ? `${this.displayInfo.refreshRate} Hz` : '--',
            conceptId: 'screen_refresh_rate',
            onInfoClick: () => {
              router.pushUrl({
                url: 'pages/ConceptDetailPage',
                params: { conceptId: 'screen_refresh_rate' }
              });
            }
          })

          InfoCardWithDesc({
            title: 'X轴DPI',
            value: this.displayInfo ? `${this.displayInfo.xDPI}` : '--',
            conceptId: 'screen_dpi',
            onInfoClick: () => {
              router.pushUrl({
                url: 'pages/ConceptDetailPage',
                params: { conceptId: 'screen_dpi' }
              });
            }
          })

          InfoCardWithDesc({
            title: 'Y轴DPI',
            value: this.displayInfo ? `${this.displayInfo.yDPI}` : '--',
            conceptId: 'screen_dpi',
            onInfoClick: () => {
              router.pushUrl({
                url: 'pages/ConceptDetailPage',
                params: { conceptId: 'screen_dpi' }
              });
            }
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
