@Component
export struct NavigationBar {
  @Prop title: string = '';
  onBack?: () => void;

  build() {
    Column() {
      // 顶部安全区域占位（适配刘海屏/摄像头区域）
      Row()
        .width('100%')
        .height(this.getStatusBarHeight())

      // 导航栏内容
      Row() {
        // 返回按钮区域（固定宽度，左对齐）
        Row() {
          Text('←')
            .fontSize(28)
            .fontColor($r('app.color.primary_color'))
        }
        .width(48)
        .height(48)
        .justifyContent(FlexAlign.Center)
        .onClick(() => {
          if (this.onBack) {
            this.onBack();
          }
        })

        // 标题区域（居中，占据剩余空间）
        Text(this.title)
          .fontSize(18)
          .fontWeight(FontWeight.Medium)
          .fontColor($r('app.color.text_primary'))
          .textAlign(TextAlign.Center)
          .layoutWeight(1)
          .maxLines(1)
          .textOverflow({ overflow: TextOverflow.Ellipsis })

        // 右侧占位区域（与返回按钮同宽，保持标题居中）
        Row()
          .width(48)
          .height(48)
      }
      .width('100%')
      .height(56)
      .padding({ left: 4, right: 4 })
    }
    .width('100%')
    .backgroundColor($r('app.color.background_dark'))
  }

  // 获取状态栏高度
  private getStatusBarHeight(): number {
    // 刘海屏设备通常需要额外的顶部间距
    // 根据设备类型返回合适的高度
    return 44; // 默认 44px 适配刘海屏
  }
}

// 使用系统返回箭头的导航栏
@Component
export struct NavigationBarWithArrow {
  @Prop title: string = '';
  onBack?: () => void;

  build() {
    Column() {
      // 顶部安全区域占位（适配刘海屏/摄像头区域）
      Row()
        .width('100%')
        .height(this.getStatusBarHeight())

      // 导航栏内容
      Row() {
        // 返回按钮区域
        Row() {
          Text('←')
            .fontSize(28)
            .fontColor($r('app.color.primary_color'))
        }
        .width(48)
        .height(48)
        .justifyContent(FlexAlign.Center)
        .onClick(() => {
          if (this.onBack) {
            this.onBack();
          }
        })

        // 标题区域（居中）
        Text(this.title)
          .fontSize(18)
          .fontWeight(FontWeight.Medium)
          .fontColor($r('app.color.text_primary'))
          .textAlign(TextAlign.Center)
          .layoutWeight(1)
          .maxLines(1)
          .textOverflow({ overflow: TextOverflow.Ellipsis })

        // 右侧占位
        Row()
          .width(48)
          .height(48)
      }
      .width('100%')
      .height(56)
      .padding({ left: 4, right: 4 })
    }
    .width('100%')
    .backgroundColor($r('app.color.background_dark'))
  }

  // 获取状态栏高度
  private getStatusBarHeight(): number {
    // 刘海屏设备通常需要额外的顶部间距
    // 根据设备类型返回合适的高度
    return 44; // 默认 44px 适配刘海屏
  }
}
