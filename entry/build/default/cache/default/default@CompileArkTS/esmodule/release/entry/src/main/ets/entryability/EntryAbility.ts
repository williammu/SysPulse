import UIAbility from "@ohos:app.ability.UIAbility";
import hilog from "@ohos:hilog";
import type window from "@ohos:window";
import type Want from "@ohos:app.ability.Want";
import type AbilityConstant from "@ohos:app.ability.AbilityConstant";
import { PerformanceMonitor } from "@bundle:com.huawei.sysinfo/entry/ets/utils/PerformanceMonitor";
import { nativeApi } from "@bundle:com.huawei.sysinfo/entry/ets/utils/NativeApi";
import { dataRefreshService } from "@bundle:com.huawei.sysinfo/entry/ets/utils/DataRefreshService";
export default class EntryAbility extends UIAbility {
    onCreate(d: Want, e: AbilityConstant.LaunchParam) {
        hilog.info(0x0000, 'SysInfo', '%{public}s', 'Ability onCreate');
        hilog.info(0x0000, 'SysInfo', 'Initializing Native API...');
        const f = nativeApi.isNativeAvailable();
        hilog.info(0x0000, 'SysInfo', 'Native API available: %{public}s', String(f));
        hilog.info(0x0000, 'SysInfo', 'Starting data refresh service...');
        dataRefreshService.start();
        this.runPerformanceMonitor();
    }
    async runPerformanceMonitor() {
        await PerformanceMonitor.runPerformanceCheck();
    }
    onDestroy() {
        hilog.info(0x0000, 'SysInfo', '%{public}s', 'Ability onDestroy');
        dataRefreshService.stop();
    }
    onWindowStageCreate(a: window.WindowStage) {
        hilog.info(0x0000, 'SysInfo', '%{public}s', 'Ability onWindowStageCreate');
        a.loadContent('pages/Index', (b, c) => {
            if (b.code) {
                hilog.error(0x0000, 'SysInfo', 'Failed to load content. Cause: %{public}s', JSON.stringify(b) ?? '');
                return;
            }
            hilog.info(0x0000, 'SysInfo', 'Succeeded in loading content. Data: %{public}s', JSON.stringify(c) ?? '');
        });
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
