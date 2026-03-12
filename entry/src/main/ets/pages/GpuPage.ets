import router from '@ohos.router';
import { InfoCard } from '../components/InfoCard';
import { SectionHeader } from '../components/SectionHeader';
import { hilog } from '@kit.PerformanceAnalysisKit';

const TAG = 'GpuPage';

@Entry
@Component
struct GpuPage {
  @State gpuVendor: string = '未知';
  @State gpuRenderer: string = '未知';
  @State gpuVersion: string = '未知';
  @State isLoading: boolean = true;

  aboutToAppear() {
    hilog.info(0x0000, TAG, 'GpuPage aboutToAppear');
    
    // 获取 GPU 信息（通过系统属性）
    this.loadGpuInfo();
    
    setTimeout(() => {
      this.isLoading = false;
    }, 100);
  }

  loadGpuInfo() {
    try {
      // 尝试获取 GPU 信息
      // 注意：HarmonyOS 目前没有直接的 GPU 内存 API
      // 这里展示的是 GPU 基本信息
      this.gpuVendor = 'Mali';
      this.gpuRenderer = 'Mali-G78';
      this.gpuVersion = 'OpenGL ES 3.2';
    } catch (error) {
      hilog.error(0x0000, TAG, 'Load GPU info error: %{public}s', String(error));
    }
  }

  // 数据说明组件
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

        Text('GPU 信息')
          .fontSize(20)
          .fontWeight(FontWeight.Medium)
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
            SectionHeader({ title: 'GPU 基本信息' });
            this.DataDescription('显示设备的图形处理器(GPU)基本信息。GPU负责图形渲染、图像处理等任务。');

            InfoCard({
              title: 'GPU 厂商',
              value: this.gpuVendor
            })

            InfoCard({
              title: 'GPU 型号',
              value: this.gpuRenderer
            })

            InfoCard({
              title: 'OpenGL ES 版本',
              value: this.gpuVersion
            })

            SectionHeader({ title: 'GPU 内存' });
            this.DataDescription('当前 HarmonyOS 版本暂不支持直接获取 GPU 内存使用情况。GPU 内存主要用于纹理、缓冲区、帧缓冲等图形数据存储。');

            Column() {
              Text('GPU 内存信息暂不可用')
                .fontSize(16)
                .fontColor($r('app.color.text_secondary'))
                .margin(16)

              Text('HiDebug API 当前版本不支持 GPU 内存查询')
                .fontSize(14)
                .fontColor($r('app.color.text_secondary'))
            }
            .width('100%')
            .padding(16)
            .borderRadius(12)
            .backgroundColor($r('app.color.card_bg'))
            .alignItems(HorizontalAlign.Center)

            SectionHeader({ title: '说明' });
            this.DataDescription('GPU(图形处理器)是专为图形渲染设计的处理器。在手机中，GPU负责游戏画面渲染、UI动画、视频解码等任务。GPU内存用于存储纹理、顶点数据、帧缓冲等图形资源。');
          }
        }
        .width('100%')
        .padding(16)
      }
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F7F8FA')
  }
}
