@Component
export struct InfoCard {
  @Prop title: string = '';
  @Prop value: string = '';

  build() {
    Column() {
      Text(this.title)
        .fontSize(14)
        .fontColor($r('app.color.text_secondary'))
        .width('100%')

      Text(this.value)
        .fontSize(18)
        .fontWeight(FontWeight.Medium)
        .fontColor($r('app.color.text_primary'))
        .margin({ top: 8 })
        .width('100%')
    }
    .width('100%')
    .padding(16)
    .borderRadius(12)
    .backgroundColor($r('app.color.card_bg'))
  }
}
