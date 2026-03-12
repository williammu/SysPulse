import router from '@ohos.router';
import { InfoCard } from '../components/InfoCard';
import { SectionHeader } from '../components/SectionHeader';
import { NavigationBarWithArrow } from '../components/NavigationBar';

@Entry
@Component
struct CameraPage {
  build() {
    Column() {
      NavigationBarWithArrow({
        title: '摄像头',
        onBack: () => {
          router.back();
        }
      })

      Scroll() {
        Column() {
          SectionHeader({ title: '状态' })

          InfoCard({
            title: '摄像头信息',
            value: '暂未获取'
          })

          SectionHeader({ title: '说明' })

          InfoCard({
            title: 'API 限制',
            value: 'HarmonyOS NEXT 暂未提供获取摄像头详细信息的公开 API'
          })

          InfoCard({
            title: '备注',
            value: '如需获取摄像头信息，需要申请系统权限或使用私有 API'
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
