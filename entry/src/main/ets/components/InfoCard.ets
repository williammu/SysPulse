@Component
export struct InfoCard {
  @Prop title: string = '';
  @Prop value: string = '';
  @Prop subtitle: string = '';
  @Prop icon: string = '';
  @Prop highlight: boolean = false;
  @State isPressed: boolean = false;

  // 根据文本长度计算自适应字体大小
  getAdaptiveFontSize(text: string): number {
    const length = text.length;
    if (length <= 4) return 24;
    if (length <= 6) return 20;
    if (length <= 8) return 18;
    if (length <= 10) return 16;
    return 14;
  }

  build() {
    Column() {
      Row() {
        Column() {
          Text(this.title)
            .fontSize(14)
            .fontColor($r('app.color.text_secondary'))
            .margin({ bottom: 4 })

          Text(this.value)
            .fontSize(this.getAdaptiveFontSize(this.value))
            .fontWeight(FontWeight.Bold)
            .fontColor(this.highlight ? '#FFD700' : $r('app.color.primary_color'))
            .maxLines(3)
            .textOverflow({ overflow: TextOverflow.Ellipsis })
            .width('100%')
            .wordBreak(WordBreak.BREAK_ALL)
        }
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)

        if (this.icon) {
          Text(this.icon)
            .fontSize(24)
            .fontColor($r('app.color.primary_color'))
            .opacity(0.8)
        }
      }
      .width('100%')

      if (this.subtitle) {
        Text(this.subtitle)
          .fontSize(12)
          .fontColor($r('app.color.text_tertiary'))
          .margin({ top: 8 })
          .width('100%')
      }
    }
    .width('100%')
    .padding(16)
    .backgroundColor($r('app.color.background_card'))
    .borderRadius(16)
    .border({
      width: 1,
      color: $r('app.color.border_color')
    })
    .shadow({
      radius: 8,
      color: 'rgba(0, 212, 255, 0.1)',
      offsetX: 0,
      offsetY: 4
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
  }
}

// 科技感动态卡片
@Component
export struct TechCard {
  @Prop title: string = '';
  @Prop value: string = '';
  @Prop unit: string = '';
  @Prop trend: number = 0; // 0: 持平, 1: 上升, -1: 下降
  @State glowIntensity: number = 0.5;

  aboutToAppear() {
    // 启动呼吸灯效果
    setInterval(() => {
      this.glowIntensity = this.glowIntensity === 0.5 ? 0.8 : 0.5;
    }, 2000);
  }

  // 根据文本长度计算自适应字体大小
  getAdaptiveFontSize(text: string): number {
    const length = text.length;
    if (length <= 4) return 24;
    if (length <= 6) return 20;
    if (length <= 8) return 18;
    if (length <= 10) return 16;
    return 14;
  }

  build() {
    Column() {
      // 顶部装饰线 - 使用内边距避免刺破圆角
      Row()
        .width('90%')
        .height(2)
        .backgroundColor($r('app.color.primary_color'))
        .opacity(this.glowIntensity)
        .borderRadius(1)
        .animation({
          duration: 2000,
          curve: Curve.EaseInOut,
          iterations: -1,
          playMode: PlayMode.Alternate
        })
        .margin({ top: 8 })

      Column() {
        Text(this.title)
          .fontSize(13)
          .fontColor($r('app.color.text_secondary'))
          .letterSpacing(1)
          .margin({ bottom: 8 })

        // 数值和单位的组合，自适应字体大小
        Row() {
          Text(this.value)
            .fontSize(this.getAdaptiveFontSize(this.value))
            .fontWeight(FontWeight.Bold)
            .fontColor($r('app.color.text_primary'))
            .maxLines(1)
            .textOverflow({ overflow: TextOverflow.Ellipsis })
            .flexShrink(1)

          if (this.unit) {
            Text(this.unit)
              .fontSize(12)
              .fontColor($r('app.color.text_secondary'))
              .margin({ left: 4 })
              .flexShrink(0)
          }
        }
        .width('100%')
        .alignItems(VerticalAlign.Bottom)

        // 趋势指示器（放在下方）
        if (this.trend !== 0) {
          Row() {
            Text(this.trend > 0 ? '▲' : '▼')
              .fontSize(10)
              .fontColor(this.trend > 0 ? $r('app.color.success_color') : $r('app.color.error_color'))
              .margin({ right: 4 })
            
            Text(this.trend > 0 ? '上升' : '下降')
              .fontSize(10)
              .fontColor(this.trend > 0 ? $r('app.color.success_color') : $r('app.color.error_color'))
          }
          .margin({ top: 4 })
        }
      }
      .width('100%')
      .padding(16)
      .alignItems(HorizontalAlign.Start)
    }
    .width('100%')
    .backgroundColor($r('app.color.background_card'))
    .borderRadius(16)
    .border({
      width: 1,
      color: $r('app.color.border_color')
    })
    .shadow({
      radius: 12,
      color: `rgba(0, 212, 255, ${0.1 * this.glowIntensity})`,
      offsetX: 0,
      offsetY: 0
    })
  }
}

// 状态指示器卡片
@Component
export struct StatusCard {
  @Prop title: string = '';
  @Prop value: string = '';
  @Prop status: 'normal' | 'warning' | 'critical' = 'normal';
  @State pulseScale: number = 1;

  aboutToAppear() {
    if (this.status !== 'normal') {
      setInterval(() => {
        this.pulseScale = this.pulseScale === 1 ? 1.2 : 1;
      }, 1000);
    }
  }

  // 根据文本长度计算自适应字体大小
  getAdaptiveFontSize(text: string): number {
    const length = text.length;
    if (length <= 4) return 18;
    if (length <= 6) return 16;
    if (length <= 8) return 14;
    return 12;
  }

  getStatusColor(): ResourceColor {
    switch (this.status) {
      case 'warning':
        return $r('app.color.warning_color');
      case 'critical':
        return $r('app.color.error_color');
      default:
        return $r('app.color.success_color');
    }
  }

  build() {
    Row() {
      // 状态指示点
      Column()
        .width(12)
        .height(12)
        .backgroundColor(this.getStatusColor())
        .borderRadius(6)
        .scale({ x: this.pulseScale, y: this.pulseScale })
        .animation({
          duration: 1000,
          curve: Curve.EaseInOut,
          iterations: -1,
          playMode: PlayMode.Alternate
        })
        .shadow({
          radius: 8,
          color: this.getStatusColor() as string,
          offsetX: 0,
          offsetY: 0
        })

      Column() {
        Text(this.title)
          .fontSize(13)
          .fontColor($r('app.color.text_secondary'))

        Text(this.value)
          .fontSize(this.getAdaptiveFontSize(this.value))
          .fontWeight(FontWeight.Medium)
          .fontColor($r('app.color.text_primary'))
          .margin({ top: 4 })
      }
      .alignItems(HorizontalAlign.Start)
      .margin({ left: 12 })
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
