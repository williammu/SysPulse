if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    deviceInfo?: DeviceInfoModel | null;
    batteryInfo?: BatteryInfoModel | null;
    systemMemInfo?: SystemMemInfo | null;
    appMemInfo?: AppMemInfo | null;
    systemCpuUsage?: CpuUsage | null;
    displayInfo?: DisplayInfoModel | null;
    storageInfo?: StorageInfoModel | null;
    currentTime?: string;
    refreshTimer?: number | null;
}
import router from "@ohos:router";
import { DeviceUtil } from "@bundle:com.huawei.sysinfo/entry/ets/utils/DeviceUtil";
import { FormatUtil } from "@bundle:com.huawei.sysinfo/entry/ets/utils/FormatUtil";
import { TechCard } from "@bundle:com.huawei.sysinfo/entry/ets/components/InfoCard";
import { SysInfoMenuItem } from "@bundle:com.huawei.sysinfo/entry/ets/components/MenuItem";
import { TechHeader } from "@bundle:com.huawei.sysinfo/entry/ets/components/SectionHeader";
import { nativeApi } from "@bundle:com.huawei.sysinfo/entry/ets/utils/NativeApi";
import type { SystemMemInfo, CpuUsage, AppMemInfo } from "@bundle:com.huawei.sysinfo/entry/ets/utils/NativeApi";
import type { DeviceInfoModel, BatteryInfoModel, DisplayInfoModel, StorageInfoModel } from '../model/DeviceInfo';
class Index extends ViewPU {
    constructor(q28, r28, s28, t28 = -1, u28 = undefined, v28) {
        super(q28, s28, t28, v28);
        if (typeof u28 === "function") {
            this.paramsGenerator_ = u28;
        }
        this.__deviceInfo = new ObservedPropertyObjectPU(null, this, "deviceInfo");
        this.__batteryInfo = new ObservedPropertyObjectPU(null, this, "batteryInfo");
        this.__systemMemInfo = new ObservedPropertyObjectPU(null, this, "systemMemInfo");
        this.__appMemInfo = new ObservedPropertyObjectPU(null, this, "appMemInfo");
        this.__systemCpuUsage = new ObservedPropertyObjectPU(null, this, "systemCpuUsage");
        this.__displayInfo = new ObservedPropertyObjectPU(null, this, "displayInfo");
        this.__storageInfo = new ObservedPropertyObjectPU(null, this, "storageInfo");
        this.__currentTime = new ObservedPropertySimplePU('', this, "currentTime");
        this.refreshTimer = null;
        this.setInitiallyProvidedValue(r28);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(p28: Index_Params) {
        if (p28.deviceInfo !== undefined) {
            this.deviceInfo = p28.deviceInfo;
        }
        if (p28.batteryInfo !== undefined) {
            this.batteryInfo = p28.batteryInfo;
        }
        if (p28.systemMemInfo !== undefined) {
            this.systemMemInfo = p28.systemMemInfo;
        }
        if (p28.appMemInfo !== undefined) {
            this.appMemInfo = p28.appMemInfo;
        }
        if (p28.systemCpuUsage !== undefined) {
            this.systemCpuUsage = p28.systemCpuUsage;
        }
        if (p28.displayInfo !== undefined) {
            this.displayInfo = p28.displayInfo;
        }
        if (p28.storageInfo !== undefined) {
            this.storageInfo = p28.storageInfo;
        }
        if (p28.currentTime !== undefined) {
            this.currentTime = p28.currentTime;
        }
        if (p28.refreshTimer !== undefined) {
            this.refreshTimer = p28.refreshTimer;
        }
    }
    updateStateVars(o28: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(n28) {
        this.__deviceInfo.purgeDependencyOnElmtId(n28);
        this.__batteryInfo.purgeDependencyOnElmtId(n28);
        this.__systemMemInfo.purgeDependencyOnElmtId(n28);
        this.__appMemInfo.purgeDependencyOnElmtId(n28);
        this.__systemCpuUsage.purgeDependencyOnElmtId(n28);
        this.__displayInfo.purgeDependencyOnElmtId(n28);
        this.__storageInfo.purgeDependencyOnElmtId(n28);
        this.__currentTime.purgeDependencyOnElmtId(n28);
    }
    aboutToBeDeleted() {
        this.__deviceInfo.aboutToBeDeleted();
        this.__batteryInfo.aboutToBeDeleted();
        this.__systemMemInfo.aboutToBeDeleted();
        this.__appMemInfo.aboutToBeDeleted();
        this.__systemCpuUsage.aboutToBeDeleted();
        this.__displayInfo.aboutToBeDeleted();
        this.__storageInfo.aboutToBeDeleted();
        this.__currentTime.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __deviceInfo: ObservedPropertyObjectPU<DeviceInfoModel | null>;
    get deviceInfo() {
        return this.__deviceInfo.get();
    }
    set deviceInfo(m28: DeviceInfoModel | null) {
        this.__deviceInfo.set(m28);
    }
    private __batteryInfo: ObservedPropertyObjectPU<BatteryInfoModel | null>;
    get batteryInfo() {
        return this.__batteryInfo.get();
    }
    set batteryInfo(l28: BatteryInfoModel | null) {
        this.__batteryInfo.set(l28);
    }
    private __systemMemInfo: ObservedPropertyObjectPU<SystemMemInfo | null>;
    get systemMemInfo() {
        return this.__systemMemInfo.get();
    }
    set systemMemInfo(k28: SystemMemInfo | null) {
        this.__systemMemInfo.set(k28);
    }
    private __appMemInfo: ObservedPropertyObjectPU<AppMemInfo | null>;
    get appMemInfo() {
        return this.__appMemInfo.get();
    }
    set appMemInfo(j28: AppMemInfo | null) {
        this.__appMemInfo.set(j28);
    }
    private __systemCpuUsage: ObservedPropertyObjectPU<CpuUsage | null>;
    get systemCpuUsage() {
        return this.__systemCpuUsage.get();
    }
    set systemCpuUsage(i28: CpuUsage | null) {
        this.__systemCpuUsage.set(i28);
    }
    private __displayInfo: ObservedPropertyObjectPU<DisplayInfoModel | null>;
    get displayInfo() {
        return this.__displayInfo.get();
    }
    set displayInfo(h28: DisplayInfoModel | null) {
        this.__displayInfo.set(h28);
    }
    private __storageInfo: ObservedPropertyObjectPU<StorageInfoModel | null>;
    get storageInfo() {
        return this.__storageInfo.get();
    }
    set storageInfo(g28: StorageInfoModel | null) {
        this.__storageInfo.set(g28);
    }
    private __currentTime: ObservedPropertySimplePU<string>;
    get currentTime() {
        return this.__currentTime.get();
    }
    set currentTime(f28: string) {
        this.__currentTime.set(f28);
    }
    private refreshTimer: number | null;
    aboutToAppear() {
        this.deviceInfo = DeviceUtil.getDeviceInfo();
        this.displayInfo = DeviceUtil.getDisplayInfoSync();
        this.storageInfo = DeviceUtil.getStorageInfo();
        this.refreshDynamicData();
        this.refreshTimer = setInterval(() => {
            this.refreshDynamicData();
        }, 200);
        this.updateTime();
        setInterval(() => {
            this.updateTime();
        }, 1000);
    }
    aboutToDisappear() {
        if (this.refreshTimer !== null) {
            clearInterval(this.refreshTimer);
            this.refreshTimer = null;
        }
    }
    private refreshDynamicData(): void {
        if (nativeApi.isNativeAvailable()) {
            this.systemMemInfo = nativeApi.getSystemMemInfo();
            this.appMemInfo = nativeApi.getAppMemInfo();
            this.systemCpuUsage = nativeApi.getSystemCpuUsage();
        }
        this.batteryInfo = DeviceUtil.getBatteryInfo();
    }
    private updateTime(): void {
        const e28 = new Date();
        this.currentTime = e28.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    }
    getCpuUsageDisplay(): string {
        if (this.systemCpuUsage?.success) {
            return `${this.systemCpuUsage.percentage.toFixed(1)}`;
        }
        return '--';
    }
    getMemoryUsageDisplay(): string {
        if (this.systemMemInfo?.success && this.systemMemInfo.total > 0 && this.systemMemInfo.available > 0) {
            const c28 = this.systemMemInfo.total - this.systemMemInfo.available;
            const d28 = ((c28 / this.systemMemInfo.total) * 100).toFixed(1);
            return `${d28}`;
        }
        return '--';
    }
    getTotalMemoryDisplay(): string {
        if (this.systemMemInfo?.success && this.systemMemInfo.total > 0) {
            return FormatUtil.formatBytes(this.systemMemInfo.total);
        }
        return '--';
    }
    getAppMemoryDisplay(): string {
        if (this.appMemInfo?.success && this.appMemInfo.pss > 0) {
            return FormatUtil.formatBytes(this.appMemInfo.pss);
        }
        return '--';
    }
    getBatteryDisplay(): string {
        if (this.batteryInfo) {
            return `${this.batteryInfo.batterySOC}`;
        }
        return '--';
    }
    getStorageDisplay(): string {
        if (this.storageInfo && this.storageInfo.totalSize > 0) {
            return FormatUtil.formatBytes(this.storageInfo.totalSize);
        }
        return '--';
    }
    initialRender() {
        this.observeComponentCreation2((a28, b28) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.height('100%');
            Scroll.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Scroll);
        this.observeComponentCreation2((y27, z27) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((w27, x27) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.padding({ top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((u27, v27) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((s27, t27) => {
            Row.create();
            Row.width(8);
            Row.height(8);
            Row.backgroundColor({ "id": 16777242, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Row.borderRadius(4);
            Row.shadow({
                radius: 6,
                color: { "id": 16777242, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" },
                offsetX: 0,
                offsetY: 0
            });
        }, Row);
        Row.pop();
        this.observeComponentCreation2((q27, r27) => {
            Text.create('SYSTEM ONLINE');
            Text.fontSize(11);
            Text.fontColor({ "id": 16777242, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 6 });
            Text.letterSpacing(1);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((o27, p27) => {
            Text.create(this.currentTime);
            Text.fontSize(14);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.letterSpacing(2);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((m27, n27) => {
            Column.create();
            Column.width('100%');
            Column.padding({ top: 16, bottom: 24 });
        }, Column);
        this.observeComponentCreation2((k27, l27) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((i27, j27) => {
            Text.create('SYS');
            Text.fontSize(32);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((g27, h27) => {
            Text.create('PULSE');
            Text.fontSize(32);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.shadow({
                radius: 10,
                color: { "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" },
                offsetX: 0,
                offsetY: 0
            });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((e27, f27) => {
            Text.create(this.deviceInfo?.marketName || '设备型号');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((c27, d27) => {
            Text.create(`${this.deviceInfo?.brand || '品牌'} · ${this.deviceInfo?.osFullName || '系统版本'}`);
            Text.fontSize(12);
            Text.fontColor({ "id": 16777243, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        {
            this.observeComponentCreation2((y26, z26) => {
                if (z26) {
                    let a27 = new TechHeader(this, {
                        title: '实时监控',
                        subtitle: 'REAL-TIME MONITORING'
                    }, undefined, y26, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 187, col: 9 });
                    ViewPU.create(a27);
                    let b27 = () => {
                        return {
                            title: '实时监控',
                            subtitle: 'REAL-TIME MONITORING'
                        };
                    };
                    a27.paramsGenerator_ = b27;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(y26, {
                        title: '实时监控',
                        subtitle: 'REAL-TIME MONITORING'
                    });
                }
            }, { name: "TechHeader" });
        }
        this.observeComponentCreation2((w26, x26) => {
            Grid.create();
            Grid.columnsTemplate('1fr 1fr');
            Grid.columnsGap(12);
            Grid.rowsGap(12);
            Grid.width('100%');
        }, Grid);
        {
            const o26 = (u26, v26) => {
                GridItem.create(() => { }, false);
                GridItem.onClick(() => {
                    router.pushUrl({ url: 'pages/CpuPage' });
                });
            };
            const p26 = () => {
                this.observeComponentCreation2(o26, GridItem);
                {
                    this.observeComponentCreation2((q26, r26) => {
                        if (r26) {
                            let s26 = new TechCard(this, {
                                title: 'CPU 使用率',
                                value: this.getCpuUsageDisplay(),
                                unit: '%'
                            }, undefined, q26, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 194, col: 13 });
                            ViewPU.create(s26);
                            let t26 = () => {
                                return {
                                    title: 'CPU 使用率',
                                    value: this.getCpuUsageDisplay(),
                                    unit: '%'
                                };
                            };
                            s26.paramsGenerator_ = t26;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(q26, {
                                title: 'CPU 使用率',
                                value: this.getCpuUsageDisplay(),
                                unit: '%'
                            });
                        }
                    }, { name: "TechCard" });
                }
                GridItem.pop();
            };
            p26();
        }
        {
            const g26 = (m26, n26) => {
                GridItem.create(() => { }, false);
                GridItem.onClick(() => {
                    router.pushUrl({ url: 'pages/MemoryPage' });
                });
            };
            const h26 = () => {
                this.observeComponentCreation2(g26, GridItem);
                {
                    this.observeComponentCreation2((i26, j26) => {
                        if (j26) {
                            let k26 = new TechCard(this, {
                                title: '内存使用率',
                                value: this.getMemoryUsageDisplay(),
                                unit: '%'
                            }, undefined, i26, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 205, col: 13 });
                            ViewPU.create(k26);
                            let l26 = () => {
                                return {
                                    title: '内存使用率',
                                    value: this.getMemoryUsageDisplay(),
                                    unit: '%'
                                };
                            };
                            k26.paramsGenerator_ = l26;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(i26, {
                                title: '内存使用率',
                                value: this.getMemoryUsageDisplay(),
                                unit: '%'
                            });
                        }
                    }, { name: "TechCard" });
                }
                GridItem.pop();
            };
            h26();
        }
        {
            const y25 = (e26, f26) => {
                GridItem.create(() => { }, false);
                GridItem.onClick(() => {
                    router.pushUrl({ url: 'pages/MemoryPage' });
                });
            };
            const z25 = () => {
                this.observeComponentCreation2(y25, GridItem);
                {
                    this.observeComponentCreation2((a26, b26) => {
                        if (b26) {
                            let c26 = new TechCard(this, {
                                title: '应用内存',
                                value: this.getAppMemoryDisplay(),
                                unit: ''
                            }, undefined, a26, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 216, col: 13 });
                            ViewPU.create(c26);
                            let d26 = () => {
                                return {
                                    title: '应用内存',
                                    value: this.getAppMemoryDisplay(),
                                    unit: ''
                                };
                            };
                            c26.paramsGenerator_ = d26;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(a26, {
                                title: '应用内存',
                                value: this.getAppMemoryDisplay(),
                                unit: ''
                            });
                        }
                    }, { name: "TechCard" });
                }
                GridItem.pop();
            };
            z25();
        }
        {
            const q25 = (w25, x25) => {
                GridItem.create(() => { }, false);
                GridItem.onClick(() => {
                    router.pushUrl({ url: 'pages/BatteryPage' });
                });
            };
            const r25 = () => {
                this.observeComponentCreation2(q25, GridItem);
                {
                    this.observeComponentCreation2((s25, t25) => {
                        if (t25) {
                            let u25 = new TechCard(this, {
                                title: '电池电量',
                                value: this.getBatteryDisplay(),
                                unit: '%'
                            }, undefined, s25, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 227, col: 13 });
                            ViewPU.create(u25);
                            let v25 = () => {
                                return {
                                    title: '电池电量',
                                    value: this.getBatteryDisplay(),
                                    unit: '%'
                                };
                            };
                            u25.paramsGenerator_ = v25;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(s25, {
                                title: '电池电量',
                                value: this.getBatteryDisplay(),
                                unit: '%'
                            });
                        }
                    }, { name: "TechCard" });
                }
                GridItem.pop();
            };
            r25();
        }
        Grid.pop();
        {
            this.observeComponentCreation2((m25, n25) => {
                if (n25) {
                    let o25 = new TechHeader(this, {
                        title: '硬件信息',
                        subtitle: 'HARDWARE INFO'
                    }, undefined, m25, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 243, col: 9 });
                    ViewPU.create(o25);
                    let p25 = () => {
                        return {
                            title: '硬件信息',
                            subtitle: 'HARDWARE INFO'
                        };
                    };
                    o25.paramsGenerator_ = p25;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(m25, {
                        title: '硬件信息',
                        subtitle: 'HARDWARE INFO'
                    });
                }
            }, { name: "TechHeader" });
        }
        {
            this.observeComponentCreation2((i25, j25) => {
                if (j25) {
                    let k25 = new SysInfoMenuItem(this, {
                        title: '处理器',
                        subtitle: `${DeviceUtil.getCpuInfo().architecture || '未知'}`,
                        onTap: () => {
                            router.pushUrl({ url: 'pages/CpuPage' });
                        }
                    }, undefined, i25, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 248, col: 9 });
                    ViewPU.create(k25);
                    let l25 = () => {
                        return {
                            title: '处理器',
                            subtitle: `${DeviceUtil.getCpuInfo().architecture || '未知'}`,
                            onTap: () => {
                                router.pushUrl({ url: 'pages/CpuPage' });
                            }
                        };
                    };
                    k25.paramsGenerator_ = l25;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(i25, {
                        title: '处理器',
                        subtitle: `${DeviceUtil.getCpuInfo().architecture || '未知'}`
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((e25, f25) => {
                if (f25) {
                    let g25 = new SysInfoMenuItem(this, {
                        title: '内存',
                        subtitle: `总计 ${this.getTotalMemoryDisplay()}`,
                        onTap: () => {
                            router.pushUrl({ url: 'pages/MemoryPage' });
                        }
                    }, undefined, e25, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 256, col: 9 });
                    ViewPU.create(g25);
                    let h25 = () => {
                        return {
                            title: '内存',
                            subtitle: `总计 ${this.getTotalMemoryDisplay()}`,
                            onTap: () => {
                                router.pushUrl({ url: 'pages/MemoryPage' });
                            }
                        };
                    };
                    g25.paramsGenerator_ = h25;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(e25, {
                        title: '内存',
                        subtitle: `总计 ${this.getTotalMemoryDisplay()}`
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((a25, b25) => {
                if (b25) {
                    let c25 = new SysInfoMenuItem(this, {
                        title: '存储',
                        subtitle: `总计 ${this.getStorageDisplay()}`,
                        onTap: () => {
                            router.pushUrl({ url: 'pages/StoragePage' });
                        }
                    }, undefined, a25, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 264, col: 9 });
                    ViewPU.create(c25);
                    let d25 = () => {
                        return {
                            title: '存储',
                            subtitle: `总计 ${this.getStorageDisplay()}`,
                            onTap: () => {
                                router.pushUrl({ url: 'pages/StoragePage' });
                            }
                        };
                    };
                    c25.paramsGenerator_ = d25;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(a25, {
                        title: '存储',
                        subtitle: `总计 ${this.getStorageDisplay()}`
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((w24, x24) => {
                if (x24) {
                    let y24 = new SysInfoMenuItem(this, {
                        title: '屏幕',
                        subtitle: this.displayInfo ? `${this.displayInfo.width} × ${this.displayInfo.height} · ${this.displayInfo.refreshRate}Hz` : '--',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/DisplayPage' });
                        }
                    }, undefined, w24, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 272, col: 9 });
                    ViewPU.create(y24);
                    let z24 = () => {
                        return {
                            title: '屏幕',
                            subtitle: this.displayInfo ? `${this.displayInfo.width} × ${this.displayInfo.height} · ${this.displayInfo.refreshRate}Hz` : '--',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/DisplayPage' });
                            }
                        };
                    };
                    y24.paramsGenerator_ = z24;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(w24, {
                        title: '屏幕',
                        subtitle: this.displayInfo ? `${this.displayInfo.width} × ${this.displayInfo.height} · ${this.displayInfo.refreshRate}Hz` : '--'
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((s24, t24) => {
                if (t24) {
                    let u24 = new SysInfoMenuItem(this, {
                        title: '电池',
                        subtitle: `${this.getBatteryDisplay()}%`,
                        onTap: () => {
                            router.pushUrl({ url: 'pages/BatteryPage' });
                        }
                    }, undefined, s24, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 280, col: 9 });
                    ViewPU.create(u24);
                    let v24 = () => {
                        return {
                            title: '电池',
                            subtitle: `${this.getBatteryDisplay()}%`,
                            onTap: () => {
                                router.pushUrl({ url: 'pages/BatteryPage' });
                            }
                        };
                    };
                    u24.paramsGenerator_ = v24;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(s24, {
                        title: '电池',
                        subtitle: `${this.getBatteryDisplay()}%`
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((o24, p24) => {
                if (p24) {
                    let q24 = new SysInfoMenuItem(this, {
                        title: 'GPU',
                        subtitle: '',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/GpuPage' });
                        }
                    }, undefined, o24, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 288, col: 9 });
                    ViewPU.create(q24);
                    let r24 = () => {
                        return {
                            title: 'GPU',
                            subtitle: '',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/GpuPage' });
                            }
                        };
                    };
                    q24.paramsGenerator_ = r24;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(o24, {
                        title: 'GPU',
                        subtitle: ''
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((k24, l24) => {
                if (l24) {
                    let m24 = new TechHeader(this, {
                        title: '连接与传感器',
                        subtitle: 'CONNECTIVITY & SENSORS'
                    }, undefined, k24, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 297, col: 9 });
                    ViewPU.create(m24);
                    let n24 = () => {
                        return {
                            title: '连接与传感器',
                            subtitle: 'CONNECTIVITY & SENSORS'
                        };
                    };
                    m24.paramsGenerator_ = n24;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(k24, {
                        title: '连接与传感器',
                        subtitle: 'CONNECTIVITY & SENSORS'
                    });
                }
            }, { name: "TechHeader" });
        }
        {
            this.observeComponentCreation2((g24, h24) => {
                if (h24) {
                    let i24 = new SysInfoMenuItem(this, {
                        title: '网络',
                        subtitle: '',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/NetworkPage' });
                        }
                    }, undefined, g24, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 302, col: 9 });
                    ViewPU.create(i24);
                    let j24 = () => {
                        return {
                            title: '网络',
                            subtitle: '',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/NetworkPage' });
                            }
                        };
                    };
                    i24.paramsGenerator_ = j24;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(g24, {
                        title: '网络',
                        subtitle: ''
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((c24, d24) => {
                if (d24) {
                    let e24 = new SysInfoMenuItem(this, {
                        title: '摄像头',
                        subtitle: '',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/CameraPage' });
                        }
                    }, undefined, c24, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 310, col: 9 });
                    ViewPU.create(e24);
                    let f24 = () => {
                        return {
                            title: '摄像头',
                            subtitle: '',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/CameraPage' });
                            }
                        };
                    };
                    e24.paramsGenerator_ = f24;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(c24, {
                        title: '摄像头',
                        subtitle: ''
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((y23, z23) => {
                if (z23) {
                    let a24 = new SysInfoMenuItem(this, {
                        title: '传感器',
                        subtitle: '',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/SensorPage' });
                        }
                    }, undefined, y23, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 318, col: 9 });
                    ViewPU.create(a24);
                    let b24 = () => {
                        return {
                            title: '传感器',
                            subtitle: '',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/SensorPage' });
                            }
                        };
                    };
                    a24.paramsGenerator_ = b24;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(y23, {
                        title: '传感器',
                        subtitle: ''
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((u23, v23) => {
                if (v23) {
                    let w23 = new TechHeader(this, {
                        title: '其他',
                        subtitle: 'OTHERS'
                    }, undefined, u23, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 327, col: 9 });
                    ViewPU.create(w23);
                    let x23 = () => {
                        return {
                            title: '其他',
                            subtitle: 'OTHERS'
                        };
                    };
                    w23.paramsGenerator_ = x23;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(u23, {
                        title: '其他',
                        subtitle: 'OTHERS'
                    });
                }
            }, { name: "TechHeader" });
        }
        {
            this.observeComponentCreation2((q23, r23) => {
                if (r23) {
                    let s23 = new SysInfoMenuItem(this, {
                        title: '系统信息测试',
                        subtitle: '运行完整 API 测试',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/TestPage' });
                        }
                    }, undefined, q23, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 332, col: 9 });
                    ViewPU.create(s23);
                    let t23 = () => {
                        return {
                            title: '系统信息测试',
                            subtitle: '运行完整 API 测试',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/TestPage' });
                            }
                        };
                    };
                    s23.paramsGenerator_ = t23;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(q23, {
                        title: '系统信息测试',
                        subtitle: '运行完整 API 测试'
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((m23, n23) => {
                if (n23) {
                    let o23 = new SysInfoMenuItem(this, {
                        title: '关于',
                        subtitle: 'SysPulse v1.0.0',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/AboutPage' });
                        }
                    }, undefined, m23, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 340, col: 9 });
                    ViewPU.create(o23);
                    let p23 = () => {
                        return {
                            title: '关于',
                            subtitle: 'SysPulse v1.0.0',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/AboutPage' });
                            }
                        };
                    };
                    o23.paramsGenerator_ = p23;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(m23, {
                        title: '关于',
                        subtitle: 'SysPulse v1.0.0'
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        this.observeComponentCreation2((k23, l23) => {
            Row.create();
            Row.justifyContent(FlexAlign.Center);
            Row.margin({ top: 32, bottom: 16 });
        }, Row);
        this.observeComponentCreation2((i23, j23) => {
            Row.create();
            Row.width(60);
            Row.height(1);
            Row.backgroundColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Row);
        Row.pop();
        this.observeComponentCreation2((g23, h23) => {
            Text.create('●');
            Text.fontSize(8);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 8, right: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((e23, f23) => {
            Row.create();
            Row.width(60);
            Row.height(1);
            Row.backgroundColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Row);
        Row.pop();
        Row.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.huawei.sysinfo", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
