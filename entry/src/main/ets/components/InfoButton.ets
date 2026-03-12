@Component
export struct InfoButton {
  @Prop conceptId: string = '';
  @State isPressed: boolean = false;
  onInfoClick?: () => void;

  build() {
    Button() {
      Text('ⓘ')
        .fontSize(14)
        .fontColor($r('app.color.text_secondary'))
    }
    .width(24)
    .height(24)
    .backgroundColor('transparent')
    .opacity(this.isPressed ? 0.6 : 1)
    .scale({ x: this.isPressed ? 0.9 : 1, y: this.isPressed ? 0.9 : 1 })
    .animation({
      duration: 100,
      curve: Curve.EaseInOut
    })
    .onTouch((event) => {
      if (event.type === TouchType.Down) {
        this.isPressed = true;
      } else if (event.type === TouchType.Up || event.type === TouchType.Cancel) {
        this.isPressed = false;
      }
    })
    .onClick(() => {
      if (this.onInfoClick) {
        this.onInfoClick();
      }
    })
  }
}

// 带信息按钮的标题组件
@Component
export struct InfoHeader {
  @Prop title: string = '';
  @Prop subtitle: string = '';
  @Prop conceptId: string = '';
  onInfoClick?: () => void;

  build() {
    Row() {
      Column() {
        Row() {
          // 左侧装饰线
          Row()
            .width(4)
            .height(20)
            .backgroundColor($r('app.color.primary_color'))
            .borderRadius(2)
            .margin({ right: 12 })

          Text(this.title)
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .fontColor($r('app.color.text_primary'))
            .letterSpacing(1)

          // 信息按钮
          if (this.conceptId && this.onInfoClick) {
            InfoButton({
              conceptId: this.conceptId,
              onInfoClick: this.onInfoClick
            })
            .margin({ left: 8 })
          }
        }
        .alignItems(VerticalAlign.Center)

        if (this.subtitle) {
          Text(this.subtitle)
            .fontSize(12)
            .fontColor($r('app.color.text_secondary'))
            .margin({ top: 4, left: 16 })
        }
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)
    }
    .width('100%')
    .margin({ top: 24, bottom: 12 })
  }
}

// 带说明的卡片组件
@Component
export struct InfoCardWithDesc {
  @Prop title: string = '';
  @Prop value: string = '';
  @Prop conceptId: string = '';
  onInfoClick?: () => void;

  build() {
    Row() {
      Column() {
        Row() {
          Text(this.title)
            .fontSize(14)
            .fontColor($r('app.color.text_secondary'))

          if (this.conceptId && this.onInfoClick) {
            InfoButton({
              conceptId: this.conceptId,
              onInfoClick: this.onInfoClick
            })
            .margin({ left: 4 })
          }
        }
        .alignItems(VerticalAlign.Center)

        Text(this.value)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor($r('app.color.primary_color'))
          .margin({ top: 4 })
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)
    }
    .width('100%')
    .padding(16)
    .backgroundColor($r('app.color.background_card'))
    .borderRadius(12)
    .border({
      width: 1,
      color: $r('app.color.border_color')
    })
  }
}
