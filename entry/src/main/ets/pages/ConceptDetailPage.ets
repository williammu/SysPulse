import router from '@ohos.router';
import { ConceptInfo, ConceptDetailItem, getConceptInfo } from '../config/ConceptConfig';
import { hilog } from '@kit.PerformanceAnalysisKit';

const TAG = 'ConceptDetailPage';

@Entry
@Component
struct ConceptDetailPage {
  @State conceptInfo: ConceptInfo | null = null;
  @State isLoading: boolean = true;

  aboutToAppear() {
    // 获取路由参数
    const params = router.getParams() as Record<string, string>;
    const conceptId = params?.['conceptId'];

    hilog.info(0x0000, TAG, 'Loading concept: %{public}s', conceptId);

    if (conceptId) {
      const info = getConceptInfo(conceptId);
      if (info) {
        this.conceptInfo = info;
      }
    }
    this.isLoading = false;
  }

  build() {
    Column() {
      // 顶部导航栏
      Row() {
        Text('← 返回')
          .fontSize(16)
          .fontColor($r('app.color.primary_color'))
          .onClick(() => {
            router.back();
          });

        Text('概念说明')
          .fontSize(20)
          .fontWeight(FontWeight.Medium)
          .fontColor($r('app.color.text_primary'))
          .margin({ left: 12 });
      }
      .width('100%')
      .padding({ left: 16, right: 16, top: 12, bottom: 12 });

      Scroll() {
        Column() {
          if (this.isLoading) {
            Text('加载中...')
              .fontSize(16)
              .fontColor($r('app.color.text_secondary'))
              .margin(24);
          } else if (!this.conceptInfo) {
            Column() {
              Text('未找到概念信息')
                .fontSize(18)
                .fontColor($r('app.color.text_secondary'))
                .margin(24);
            }
            .width('100%')
            .padding(24)
            .alignItems(HorizontalAlign.Center);
          } else {
            // 概念标题
            Column() {
              Text(this.conceptInfo.title)
                .fontSize(28)
                .fontWeight(FontWeight.Bold)
                .fontColor($r('app.color.primary_color'))
                .width('100%');

              Text(this.conceptInfo.subtitle)
                .fontSize(14)
                .fontColor($r('app.color.text_secondary'))
                .margin({ top: 4 })
                .width('100%');

              // 简介
              Text(this.conceptInfo.description)
                .fontSize(14)
                .fontColor($r('app.color.text_secondary'))
                .margin({ top: 16 })
                .width('100%')
                .lineHeight(20);
            }
            .width('100%')
            .padding(16)
            .backgroundColor($r('app.color.background_card'))
            .borderRadius(12)
            .margin({ bottom: 16 });

            // 详细说明
            ForEach(this.conceptInfo.details, (detail: ConceptDetailItem, index: number) => {
              Column() {
                // 标题带序号
                Row() {
                  Text(`${index + 1}`)
                    .fontSize(12)
                    .fontWeight(FontWeight.Bold)
                    .fontColor($r('app.color.background_dark'))
                    .width(20)
                    .height(20)
                    .backgroundColor($r('app.color.primary_color'))
                    .borderRadius(10)
                    .textAlign(TextAlign.Center);

                  Text(detail.title)
                    .fontSize(16)
                    .fontWeight(FontWeight.Medium)
                    .fontColor($r('app.color.text_primary'))
                    .margin({ left: 8 })
                    .layoutWeight(1);
                }
                .width('100%')
                .alignItems(VerticalAlign.Center);

                // 内容
                Text(detail.content)
                  .fontSize(14)
                  .fontColor($r('app.color.text_secondary'))
                  .margin({ top: 12 })
                  .width('100%')
                  .lineHeight(22);
              }
              .width('100%')
              .padding(16)
              .backgroundColor($r('app.color.background_card'))
              .borderRadius(12)
              .margin({ bottom: 12 });
            }, (detail: ConceptDetailItem, index: number) => index.toString());
          }
        }
        .width('100%')
        .padding(16);
      }
      .layoutWeight(1);
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.background_dark'));
  }
}
