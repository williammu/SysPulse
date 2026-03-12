@Component
export struct ProgressBar {
  @Prop progress: number = 0;
  @Prop total: number = 100;
  @Prop barHeight: number = 8;
  @Prop color: ResourceColor = '#007DFF';

  build() {
    Stack({ alignContent: Alignment.Start }) {
      Row()
        .width('100%')
        .height(this.barHeight)
        .borderRadius(this.barHeight / 2)
        .backgroundColor('#E5E6EB')

      Row()
        .width(`${(this.progress / this.total) * 100}%`)
        .height(this.barHeight)
        .borderRadius(this.barHeight / 2)
        .backgroundColor(this.color)
    }
    .width('100%')
  }
}
