@Component
export struct SysInfoMenuItem {
  @Prop title: string = '';
  @Prop subtitle: string = '';
  @Prop icon: string = '';
  onTap: () => void = () => {};
  @State isPressed: boolean = false;
  @State isHovered: boolean = false;

  build() {
    Row() {
      Row() {
        // 左侧图标区域
        if (this.icon) {
          Text(this.icon)
            .fontSize(20)
            .fontColor($r('app.color.primary_color'))
            .margin({ right: 12 })
        }

        Column() {
          Text(this.title)
            .fontSize(15)
            .fontWeight(FontWeight.Medium)
            .fontColor($r('app.color.text_primary'))

          if (this.subtitle) {
            Text(this.subtitle)
              .fontSize(12)
              .fontColor($r('app.color.text_secondary'))
              .margin({ top: 2 })
              .maxLines(2)
              .textOverflow({ overflow: TextOverflow.Ellipsis })
          }
        }
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)
      }
      .layoutWeight(1)

      // 右侧箭头
      Text('›')
        .fontSize(24)
        .fontColor($r('app.color.text_tertiary'))
        .margin({ left: 8 })
    }
    .width('100%')
    .padding(16)
    .backgroundColor($r('app.color.background_card'))
    .borderRadius(12)
    .border({
      width: 1,
      color: this.isPressed ? $r('app.color.primary_color') : $r('app.color.border_color')
    })
    .shadow({
      radius: this.isPressed ? 12 : 4,
      color: this.isPressed ? 'rgba(0, 212, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
      offsetX: 0,
      offsetY: this.isPressed ? 4 : 2
    })
    .scale({ x: this.isPressed ? 0.98 : 1, y: this.isPressed ? 0.98 : 1 })
    .animation({
      duration: 150,
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
      this.onTap();
    })
  }
}
