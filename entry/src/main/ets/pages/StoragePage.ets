import router from '@ohos.router';
import { DeviceUtil } from '../utils/DeviceUtil';
import { FormatUtil } from '../utils/FormatUtil';
import { InfoCard } from '../components/InfoCard';
import { ProgressBar } from '../components/ProgressBar';
import { SectionHeader } from '../components/SectionHeader';
import type { StorageInfoModel } from '../model/DeviceInfo';
import { NavigationBarWithArrow } from '../components/NavigationBar';

@Entry
@Component
struct StoragePage {
  @State storageInfo: StorageInfoModel | null = null;

  aboutToAppear() {
    this.storageInfo = DeviceUtil.getStorageInfo();
  }

  build() {
    Column() {
      NavigationBarWithArrow({
        title: '存储',
        onBack: () => {
          router.back();
        }
      })

      Scroll() {
        Column() {
          SectionHeader({ title: '存储使用' })

          Column() {
            Row() {
              Text('已用')
                .fontSize(14)
                .fontColor($r('app.color.text_secondary'))
              Blank()
              Text(this.storageInfo ? FormatUtil.formatBytes(this.storageInfo.usedSize) : '未获取')
                .fontSize(16)
                .fontWeight(FontWeight.Medium)
          .fontColor($r('app.color.text_primary'))
            }
            .width('100%')

            ProgressBar({
              progress: this.storageInfo?.usedSize || 0,
              total: this.storageInfo?.totalSize || 1,
              color: '#007DFF'
            })
            .margin({ top: 12, bottom: 12 })

            Row() {
              Text('可用')
                .fontSize(14)
                .fontColor($r('app.color.text_secondary'))
              Blank()
              Text(this.storageInfo ? FormatUtil.formatBytes(this.storageInfo.freeSize) : '未获取')
                .fontSize(16)
                .fontWeight(FontWeight.Medium)
          .fontColor($r('app.color.text_primary'))
            }
            .width('100%')

            Row() {
              Text('总计')
                .fontSize(14)
                .fontColor($r('app.color.text_secondary'))
              Blank()
              Text(this.storageInfo ? FormatUtil.formatBytes(this.storageInfo.totalSize) : '未获取')
                .fontSize(16)
                .fontWeight(FontWeight.Medium)
          .fontColor($r('app.color.text_primary'))
            }
            .width('100%')
            .margin({ top: 8 })
          }
          .width('100%')
          .padding(16)
          .borderRadius(12)
          .backgroundColor($r('app.color.background_card'))

          SectionHeader({ title: '存储信息' })

          InfoCard({
            title: '状态',
            value: this.storageInfo ? '已获取' : '未获取'
          })

          InfoCard({
            title: '说明',
            value: this.storageInfo ? '存储信息来自系统 API' : '部分设备可能无法获取存储信息'
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
