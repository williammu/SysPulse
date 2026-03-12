@Component
export struct SectionHeader {
  @Prop title: string = '';

  build() {
    Text(this.title)
      .fontSize(16)
      .fontWeight(FontWeight.Medium)
      .fontColor($r('app.color.text_primary'))
      .width('100%')
      .margin({ top: 24, bottom: 12 })
  }
}
