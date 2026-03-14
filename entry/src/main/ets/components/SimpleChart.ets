@Component
export struct SimpleChart {
  @Prop data: number[] = []
  @Prop maxValue: number = 100
  @Prop color: string = '#007DFF'
  @Prop title: string = ''

  build() {
    Column() {
      if (this.title) {
        Text(this.title)
          .fontSize(14)
          .fontColor($r('app.color.text_secondary'))
          .margin({ bottom: 8 })
          .width('100%')
      }

      // 图表区域
      Row() {
        ForEach(this.data, (value: number, index: number) => {
          Column()
            .width(4)
            .height(`${Math.min(100, (value / this.maxValue) * 100)}%`)
            .backgroundColor(this.color)
            .margin({ right: 2 })
        }, (value: number, index: number) => `${index}_${value}`)
      }
      .width('100%')
      .height(100)
      .alignItems(VerticalAlign.Bottom)
      .justifyContent(FlexAlign.Start)

      // 当前值显示
      if (this.data.length > 0) {
        Text(`当前: ${this.data[this.data.length - 1].toFixed(1)}%`)
          .fontSize(12)
          .fontColor($r('app.color.text_secondary'))
          .margin({ top: 8 })
          .width('100%')
      }
    }
    .width('100%')
    .padding(12)
    .backgroundColor($r('app.color.background_card'))
    .borderRadius(8)
  }
}
