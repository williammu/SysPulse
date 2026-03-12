@Component
export struct SectionHeader {
  @Prop title: string = '';
  @Prop subtitle: string = '';

  build() {
    Column() {
      Row() {
        // 左侧装饰线
        Row()
          .width(4)
          .height(20)
          .backgroundColor($r('app.color.primary_color'))
          .borderRadius(2)
          .margin({ right: 12 })
          .shadow({
            radius: 4,
            color: $r('app.color.primary_color'),
            offsetX: 0,
            offsetY: 0
          })

        Text(this.title)
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor($r('app.color.text_primary'))
          .letterSpacing(1)

        // 右侧装饰点
        Row()
          .width(6)
          .height(6)
          .backgroundColor($r('app.color.primary_color'))
          .borderRadius(3)
          .margin({ left: 8 })
          .opacity(0.6)
      }
      .width('100%')
      .alignItems(VerticalAlign.Center)

      if (this.subtitle) {
        Text(this.subtitle)
          .fontSize(12)
          .fontColor($r('app.color.text_secondary'))
          .margin({ top: 4, left: 16 })
          .width('100%')
      }
    }
    .width('100%')
    .margin({ top: 24, bottom: 12 })
  }
}

// 科技感标题组件
@Component
export struct TechHeader {
  @Prop title: string = '';
  @Prop subtitle: string = '';
  @State glowOpacity: number = 0.5;

  aboutToAppear() {
    // 呼吸灯效果
    setInterval(() => {
      this.glowOpacity = this.glowOpacity === 0.5 ? 1 : 0.5;
    }, 2000);
  }

  build() {
    Column() {
      Row() {
        // 科技装饰元素
        Column() {
          Row()
            .width(8)
            .height(8)
            .backgroundColor($r('app.color.primary_color'))
            .borderRadius(4)
            .opacity(this.glowOpacity)
            .animation({
              duration: 2000,
              curve: Curve.EaseInOut,
              iterations: -1,
              playMode: PlayMode.Alternate
            })

          Row()
            .width(2)
            .height(20)
            .backgroundColor($r('app.color.primary_color'))
            .margin({ top: 4 })
            .opacity(0.6)
        }
        .margin({ right: 12 })

        Column() {
          Text(this.title)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor($r('app.color.text_primary'))
            .letterSpacing(2)

          if (this.subtitle) {
            Text(this.subtitle)
              .fontSize(12)
              .fontColor($r('app.color.text_secondary'))
              .margin({ top: 4 })
          }
        }
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)

        // 右侧科技装饰
        Row() {
          Row()
            .width(40)
            .height(1)
            .backgroundColor($r('app.color.primary_color'))
            .opacity(0.4)

          Row()
            .width(6)
            .height(6)
            .backgroundColor($r('app.color.primary_color'))
            .borderRadius(3)
            .margin({ left: 4 })
        }
        .alignItems(VerticalAlign.Center)
      }
      .width('100%')
      .alignItems(VerticalAlign.Center)
    }
    .width('100%')
    .margin({ top: 24, bottom: 16 })
  }
}
