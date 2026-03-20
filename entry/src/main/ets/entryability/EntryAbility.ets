import UIAbility from '@ohos.app.ability.UIAbility';
import hilog from '@ohos.hilog';
import window from '@ohos.window';
import router from '@ohos.router';
import type Want from '@ohos.app.ability.Want';
import type AbilityConstant from '@ohos.app.ability.AbilityConstant';
import { PerformanceMonitor } from '../utils/PerformanceMonitor';
import { nativeApi } from '../utils/NativeApi';
import { dataRefreshService } from '../utils/DataRefreshService';

const LOG_DOMAIN = 0x1234;
const TAG = 'SysInfo';

export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
    hilog.info(LOG_DOMAIN, TAG, 'Ability onCreate');

    // 初始化 Native API
    hilog.info(LOG_DOMAIN, TAG, 'Initializing Native API...');
    const isNativeAvailable = nativeApi.isNativeAvailable();
    hilog.info(LOG_DOMAIN, TAG, 'Native API available: %{public}s', String(isNativeAvailable));

    // 启动数据刷新服务
    hilog.info(LOG_DOMAIN, TAG, 'Starting data refresh service...');
    dataRefreshService.start();

    // 启动性能监控和测试
    this.runPerformanceMonitor();
  }

  async runPerformanceMonitor() {
    // 在应用启动时自动运行性能监控和测试
    await PerformanceMonitor.runPerformanceCheck();
  }

  onDestroy() {
    hilog.info(LOG_DOMAIN, TAG, 'Ability onDestroy');
    // 停止数据刷新服务
    dataRefreshService.stop();
  }

  onWindowStageCreate(windowStage: window.WindowStage) {
    hilog.info(LOG_DOMAIN, TAG, 'Ability onWindowStageCreate');

    // 设置沉浸式模式，适配全面屏
    this.setupImmersiveMode(windowStage);

    // 加载主页面
    hilog.info(LOG_DOMAIN, TAG, 'Loading Index page');
    windowStage.loadContent('pages/Index', (err, data) => {
      if (err.code) {
        hilog.error(LOG_DOMAIN, TAG, 'Failed to load Index page. Cause: %{public}s', JSON.stringify(err) ?? '');
        return;
      }
      hilog.info(LOG_DOMAIN, TAG, 'Succeeded in loading Index page');
    });
  }

  async setupImmersiveMode(windowStage: window.WindowStage) {
    try {
      const win = await windowStage.getMainWindow();
      // 设置窗口布局为全屏，延伸到安全区域
      win.setWindowLayoutFullScreen(true);
      // 设置导航栏隐藏（底部手势条）
      win.setSystemBarEnable([]);
      hilog.info(LOG_DOMAIN, TAG, 'Immersive mode enabled');
    } catch (err) {
      hilog.error(LOG_DOMAIN, TAG, 'Failed to setup immersive mode: %{public}s', String(err));
    }
  }

  onWindowStageDestroy() {
    hilog.info(LOG_DOMAIN, TAG, 'Ability onWindowStageDestroy');
  }

  onForeground() {
    hilog.info(LOG_DOMAIN, TAG, 'Ability onForeground');
  }

  onBackground() {
    hilog.info(LOG_DOMAIN, TAG, 'Ability onBackground');
  }
}
