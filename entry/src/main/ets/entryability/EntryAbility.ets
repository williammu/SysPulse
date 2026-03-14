import UIAbility from '@ohos.app.ability.UIAbility';
import hilog from '@ohos.hilog';
import window from '@ohos.window';
import type Want from '@ohos.app.ability.Want';
import type AbilityConstant from '@ohos.app.ability.AbilityConstant';
import { PerformanceMonitor } from '../utils/PerformanceMonitor';
import { nativeApi } from '../utils/NativeApi';
import { dataRefreshService } from '../utils/DataRefreshService';

export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
    hilog.info(0x0000, 'SysInfo', '%{public}s', 'Ability onCreate');

    // 初始化 Native API
    hilog.info(0x0000, 'SysInfo', 'Initializing Native API...');
    const isNativeAvailable = nativeApi.isNativeAvailable();
    hilog.info(0x0000, 'SysInfo', 'Native API available: %{public}s', String(isNativeAvailable));

    // 启动数据刷新服务
    hilog.info(0x0000, 'SysInfo', 'Starting data refresh service...');
    dataRefreshService.start();

    // 启动性能监控和测试
    this.runPerformanceMonitor();
  }

  async runPerformanceMonitor() {
    // 在应用启动时自动运行性能监控和测试
    await PerformanceMonitor.runPerformanceCheck();
  }

  onDestroy() {
    hilog.info(0x0000, 'SysInfo', '%{public}s', 'Ability onDestroy');
    // 停止数据刷新服务
    dataRefreshService.stop();
  }

  onWindowStageCreate(windowStage: window.WindowStage) {
    hilog.info(0x0000, 'SysInfo', '%{public}s', 'Ability onWindowStageCreate');

    // 设置沉浸式模式，适配全面屏
    this.setupImmersiveMode(windowStage);

    windowStage.loadContent('pages/Index', (err, data) => {
      if (err.code) {
        hilog.error(0x0000, 'SysInfo', 'Failed to load content. Cause: %{public}s', JSON.stringify(err) ?? '');
        return;
      }
      hilog.info(0x0000, 'SysInfo', 'Succeeded in loading content. Data: %{public}s', JSON.stringify(data) ?? '');
    });
  }

  async setupImmersiveMode(windowStage: window.WindowStage) {
    try {
      const win = await windowStage.getMainWindow();
      // 设置窗口布局为全屏，延伸到安全区域
      win.setWindowLayoutFullScreen(true);
      // 设置导航栏隐藏（底部手势条）
      win.setSystemBarEnable([]);
      hilog.info(0x0000, 'SysInfo', 'Immersive mode enabled');
    } catch (err) {
      hilog.error(0x0000, 'SysInfo', 'Failed to setup immersive mode: %{public}s', String(err));
    }
  }

  onWindowStageDestroy() {
    hilog.info(0x0000, 'SysInfo', '%{public}s', 'Ability onWindowStageDestroy');
  }

  onForeground() {
    hilog.info(0x0000, 'SysInfo', '%{public}s', 'Ability onForeground');
  }

  onBackground() {
    hilog.info(0x0000, 'SysInfo', '%{public}s', 'Ability onBackground');
  }
}
