# 华为手机适配指南

本文档总结在华为手机上开发和适配 HarmonyOS 应用的经验，特别是针对 Pura 70 Pro 等高端机型的适配方案。

---

## 1. 屏幕适配

### 1.1 问题描述

华为手机（如 Pura 70 Pro）采用全面屏设计，具有以下特点：
- 屏幕顶部有灵动岛/刘海（Dynamic Island/Notch）
- 屏幕底部有系统手势导航条（白色横条）
- 屏幕分辨率较高（如 2844×1260）

如果不进行适配，会出现：
- 顶部内容被灵动岛/状态栏遮挡
- 底部出现白色横条，影响视觉效果
- 内容无法全屏显示

### 1.2 解决方案

#### 方案一：沉浸式全屏模式（推荐）

在 `EntryAbility.ets` 中设置窗口为沉浸式模式：

```typescript
import window from '@ohos.window';

onWindowStageCreate(windowStage: window.WindowStage) {
  // 设置沉浸式模式
  this.setupImmersiveMode(windowStage);
  
  windowStage.loadContent('pages/Index', (err, data) => {
    // ...
  });
}

async setupImmersiveMode(windowStage: window.WindowStage) {
  try {
    const win = await windowStage.getMainWindow();
    // 设置窗口布局为全屏，延伸到安全区域
    win.setWindowLayoutFullScreen(true);
    // 隐藏系统导航栏（底部手势条）
    win.setSystemBarEnable([]);
  } catch (err) {
    console.error('Failed to setup immersive mode:', err);
  }
}
```

**效果：**
- 应用内容延伸到屏幕边缘
- 底部白色手势条消失
- 实现真正的全屏效果

#### 方案二：安全区域适配

如果不需要隐藏底部手势条，可以使用 `expandSafeArea` 属性：

```typescript
build() {
  Column() {
    // 页面内容
  }
  .width('100%')
  .height('100%')
  .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM])
}
```

**注意：** 这种方式底部手势条仍然会显示，只是应用内容可以延伸到安全区域。

---

## 2. 安全区域计算

### 2.1 问题描述

开启沉浸式模式后，系统状态栏（时间、电池等）会覆盖在应用内容上方，需要预留足够的安全区域。

### 2.2 解决方案

根据屏幕高度动态计算安全区域：

```typescript
// 获取顶部安全区域高度（适配刘海屏/灵动岛）
getSafeAreaTop(): number {
  const screenHeight = this.displayInfo?.height || 0;
  
  // 沉浸式模式下需要更多空间避开系统状态栏
  if (screenHeight >= 2700) {
    return 80; // Pura 70 Pro 等高端机型
  } else if (screenHeight >= 2400) {
    return 60; // 普通刘海屏
  }
  return 40; // 普通屏幕
}

// 获取底部安全区域高度
getSafeAreaBottom(): number {
  const screenHeight = this.displayInfo?.height || 0;
  if (screenHeight >= 2700) {
    return 32;
  } else if (screenHeight >= 2400) {
    return 24;
  }
  return 16;
}
```

### 2.3 使用示例

```typescript
build() {
  Scroll() {
    Column() {
      // 顶部安全区域占位
      Row()
        .width('100%')
        .height(this.getSafeAreaTop())
        .backgroundColor($r('app.color.background_dark'))
      
      // 页面内容...
      
      // 底部安全区域占位
      Row()
        .width('100%')
        .height(this.getSafeAreaBottom())
        .backgroundColor($r('app.color.background_dark'))
    }
  }
}
```

---

## 3. 常见屏幕尺寸参考

| 设备 | 分辨率 | 屏幕比例 | 顶部安全区域 | 底部安全区域 |
|------|--------|----------|-------------|-------------|
| Pura 70 Pro | 2844×1260 | 20:9 | 80px | 32px |
| Pura 70 Ultra | 2844×1260 | 20:9 | 80px | 32px |
| Mate 60 Pro | 2720×1260 | 19.5:9 | 70px | 28px |
| 普通全面屏 | 2400×1080 | 20:9 | 60px | 24px |
| 标准屏幕 | 1920×1080 | 16:9 | 40px | 16px |

---

## 4. 截图验证方法

使用 hdc 命令在华为手机上截图：

```bash
# 截图并保存到设备
hdc shell snapshot_display -f /data/local/tmp/screen.jpeg

# 将截图传输到电脑
hdc file recv /data/local/tmp/screen.jpeg ./screen.jpeg
```

**注意：**
- 截图格式必须是 `.jpeg`，不支持 `.png`
- 截图包含整个屏幕，包括系统状态栏和手势条

---

## 5. 调试技巧

### 5.1 查看屏幕信息

```typescript
import display from '@ohos.display';

async getDisplayInfo() {
  const displayInfo = await display.getDefaultDisplaySync();
  console.log('屏幕宽度:', displayInfo.width);
  console.log('屏幕高度:', displayInfo.height);
  console.log('像素密度:', displayInfo.densityDPI);
  console.log('刷新率:', displayInfo.refreshRate);
}
```

### 5.2 日志输出

```typescript
import { hilog } from '@kit.PerformanceAnalysisKit';

// 输出日志到 HiLog
hilog.info(0x0000, 'Tag', '屏幕高度: %{public}d', screenHeight);
```

使用 `hdc hilog` 查看日志：
```bash
hdc shell hilog -x | grep "Tag"
```

---

## 6. 注意事项

### 6.1 沉浸式模式的副作用

开启沉浸式模式后：
- ✅ 底部手势条消失
- ✅ 内容全屏显示
- ⚠️ 需要手动处理顶部安全区域，避免内容被状态栏遮挡
- ⚠️ 需要手动处理底部安全区域，避免内容被手势区域误触

### 6.2 不同机型的差异

- **Pura 70 系列**：灵动岛设计，顶部需要更多空间
- **Mate 60 系列**：刘海屏设计，顶部需要预留刘海高度
- **nova 系列**：普通全面屏，标准安全区域即可

### 6.3 横屏适配

横屏模式下安全区域计算方式不同，建议单独处理：

```typescript
getSafeAreaTop(isLandscape: boolean): number {
  if (isLandscape) {
    // 横屏时刘海在左侧或右侧
    return 0; // 或者根据方向计算
  }
  // 竖屏逻辑...
}
```

---

## 7. 最佳实践总结

1. **始终使用沉浸式模式**：提供更好的全屏体验
2. **动态计算安全区域**：根据屏幕高度和设备类型调整
3. **截图验证**：使用 `snapshot_display` 命令验证效果
4. **多机型测试**：在不同分辨率的华为手机上测试
5. **避免硬编码**：不要写死安全区域高度，使用动态计算

---

## 8. 参考文档

- [HarmonyOS 窗口管理](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/js-apis-window-V5)
- [HarmonyOS 安全区域](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/ts-universal-attributes-expand-safe-area-V5)
- [HarmonyOS 屏幕信息](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/js-apis-display-V5)

---

*最后更新: 2026-03-13*
