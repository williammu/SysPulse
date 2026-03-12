@Component
export struct SysInfoMenuItem {
  @Prop title: string = '';
  @Prop subtitle: string = '';
  onTap?: () => void;

  build() {
    Row() {
      Column() {
        Text(this.title)
          .fontSize(16)
          .fontColor($r('app.color.text_primary'))
          .width('100%')

        if (this.subtitle) {
          Text(this.subtitle)
            .fontSize(12)
            .fontColor($r('app.color.text_secondary'))
            .width('100%')
            .margin({ top: 2 })
        }
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)
    }
    .width('100%')
    .padding(16)
    .borderRadius(12)
    .backgroundColor($r('app.color.card_bg'))
    .onClick(() => {
      if (this.onTap) {
        this.onTap();
      }
    })
  }
}
