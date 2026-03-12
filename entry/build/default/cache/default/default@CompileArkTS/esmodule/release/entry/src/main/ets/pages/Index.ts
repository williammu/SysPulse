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
    constructor(w28, x28, y28, z28 = -1, a29 = undefined, b29) {
        super(w28, y28, z28, b29);
        if (typeof a29 === "function") {
            this.paramsGenerator_ = a29;
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
        this.setInitiallyProvidedValue(x28);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(v28: Index_Params) {
        if (v28.deviceInfo !== undefined) {
            this.deviceInfo = v28.deviceInfo;
        }
        if (v28.batteryInfo !== undefined) {
            this.batteryInfo = v28.batteryInfo;
        }
        if (v28.systemMemInfo !== undefined) {
            this.systemMemInfo = v28.systemMemInfo;
        }
        if (v28.appMemInfo !== undefined) {
            this.appMemInfo = v28.appMemInfo;
        }
        if (v28.systemCpuUsage !== undefined) {
            this.systemCpuUsage = v28.systemCpuUsage;
        }
        if (v28.displayInfo !== undefined) {
            this.displayInfo = v28.displayInfo;
        }
        if (v28.storageInfo !== undefined) {
            this.storageInfo = v28.storageInfo;
        }
        if (v28.currentTime !== undefined) {
            this.currentTime = v28.currentTime;
        }
        if (v28.refreshTimer !== undefined) {
            this.refreshTimer = v28.refreshTimer;
        }
    }
    updateStateVars(u28: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(t28) {
        this.__deviceInfo.purgeDependencyOnElmtId(t28);
        this.__batteryInfo.purgeDependencyOnElmtId(t28);
        this.__systemMemInfo.purgeDependencyOnElmtId(t28);
        this.__appMemInfo.purgeDependencyOnElmtId(t28);
        this.__systemCpuUsage.purgeDependencyOnElmtId(t28);
        this.__displayInfo.purgeDependencyOnElmtId(t28);
        this.__storageInfo.purgeDependencyOnElmtId(t28);
        this.__currentTime.purgeDependencyOnElmtId(t28);
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
    set deviceInfo(s28: DeviceInfoModel | null) {
        this.__deviceInfo.set(s28);
    }
    private __batteryInfo: ObservedPropertyObjectPU<BatteryInfoModel | null>;
    get batteryInfo() {
        return this.__batteryInfo.get();
    }
    set batteryInfo(r28: BatteryInfoModel | null) {
        this.__batteryInfo.set(r28);
    }
    private __systemMemInfo: ObservedPropertyObjectPU<SystemMemInfo | null>;
    get systemMemInfo() {
        return this.__systemMemInfo.get();
    }
    set systemMemInfo(q28: SystemMemInfo | null) {
        this.__systemMemInfo.set(q28);
    }
    private __appMemInfo: ObservedPropertyObjectPU<AppMemInfo | null>;
    get appMemInfo() {
        return this.__appMemInfo.get();
    }
    set appMemInfo(p28: AppMemInfo | null) {
        this.__appMemInfo.set(p28);
    }
    private __systemCpuUsage: ObservedPropertyObjectPU<CpuUsage | null>;
    get systemCpuUsage() {
        return this.__systemCpuUsage.get();
    }
    set systemCpuUsage(o28: CpuUsage | null) {
        this.__systemCpuUsage.set(o28);
    }
    private __displayInfo: ObservedPropertyObjectPU<DisplayInfoModel | null>;
    get displayInfo() {
        return this.__displayInfo.get();
    }
    set displayInfo(n28: DisplayInfoModel | null) {
        this.__displayInfo.set(n28);
    }
    private __storageInfo: ObservedPropertyObjectPU<StorageInfoModel | null>;
    get storageInfo() {
        return this.__storageInfo.get();
    }
    set storageInfo(m28: StorageInfoModel | null) {
        this.__storageInfo.set(m28);
    }
    private __currentTime: ObservedPropertySimplePU<string>;
    get currentTime() {
        return this.__currentTime.get();
    }
    set currentTime(l28: string) {
        this.__currentTime.set(l28);
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
        const k28 = new Date();
        this.currentTime = k28.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    }
    getCpuUsageDisplay(): string {
        if (this.systemCpuUsage?.success) {
            return `${this.systemCpuUsage.percentage.toFixed(1)}`;
        }
        return '--';
    }
    getMemoryUsageDisplay(): string {
        if (this.systemMemInfo?.success && this.systemMemInfo.total > 0 && this.systemMemInfo.available > 0) {
            const i28 = this.systemMemInfo.total - this.systemMemInfo.available;
            const j28 = ((i28 / this.systemMemInfo.total) * 100).toFixed(1);
            return `${j28}`;
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
        this.observeComponentCreation2((g28, h28) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.height('100%');
            Scroll.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Scroll);
        this.observeComponentCreation2((e28, f28) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((c28, d28) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.padding({ top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((a28, b28) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((y27, z27) => {
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
        this.observeComponentCreation2((w27, x27) => {
            Text.create('SYSTEM ONLINE');
            Text.fontSize(11);
            Text.fontColor({ "id": 16777242, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 6 });
            Text.letterSpacing(1);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((u27, v27) => {
            Text.create(this.currentTime);
            Text.fontSize(14);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.letterSpacing(2);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((s27, t27) => {
            Column.create();
            Column.width('100%');
            Column.padding({ top: 16, bottom: 24 });
        }, Column);
        this.observeComponentCreation2((q27, r27) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((o27, p27) => {
            Text.create('SYS');
            Text.fontSize(32);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((m27, n27) => {
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
        this.observeComponentCreation2((k27, l27) => {
            Text.create(this.deviceInfo?.marketName || '设备型号');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((i27, j27) => {
            Text.create(`${this.deviceInfo?.brand || '品牌'} · ${this.deviceInfo?.osFullName || '系统版本'}`);
            Text.fontSize(12);
            Text.fontColor({ "id": 16777243, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        {
            this.observeComponentCreation2((e27, f27) => {
                if (f27) {
                    let g27 = new TechHeader(this, {
                        title: '实时监控',
                        subtitle: 'REAL-TIME MONITORING'
                    }, undefined, e27, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 187, col: 9 });
                    ViewPU.create(g27);
                    let h27 = () => {
                        return {
                            title: '实时监控',
                            subtitle: 'REAL-TIME MONITORING'
                        };
                    };
                    g27.paramsGenerator_ = h27;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(e27, {
                        title: '实时监控',
                        subtitle: 'REAL-TIME MONITORING'
                    });
                }
            }, { name: "TechHeader" });
        }
        this.observeComponentCreation2((c27, d27) => {
            Grid.create();
            Grid.columnsTemplate('1fr 1fr');
            Grid.columnsGap(12);
            Grid.rowsGap(12);
            Grid.width('100%');
        }, Grid);
        {
            const u26 = (a27, b27) => {
                GridItem.create(() => { }, false);
                GridItem.onClick(() => {
                    router.pushUrl({ url: 'pages/CpuPage' });
                });
            };
            const v26 = () => {
                this.observeComponentCreation2(u26, GridItem);
                {
                    this.observeComponentCreation2((w26, x26) => {
                        if (x26) {
                            let y26 = new TechCard(this, {
                                title: 'CPU 使用率',
                                value: this.getCpuUsageDisplay(),
                                unit: '%'
                            }, undefined, w26, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 194, col: 13 });
                            ViewPU.create(y26);
                            let z26 = () => {
                                return {
                                    title: 'CPU 使用率',
                                    value: this.getCpuUsageDisplay(),
                                    unit: '%'
                                };
                            };
                            y26.paramsGenerator_ = z26;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(w26, {
                                title: 'CPU 使用率',
                                value: this.getCpuUsageDisplay(),
                                unit: '%'
                            });
                        }
                    }, { name: "TechCard" });
                }
                GridItem.pop();
            };
            v26();
        }
        {
            const m26 = (s26, t26) => {
                GridItem.create(() => { }, false);
                GridItem.onClick(() => {
                    router.pushUrl({ url: 'pages/MemoryPage' });
                });
            };
            const n26 = () => {
                this.observeComponentCreation2(m26, GridItem);
                {
                    this.observeComponentCreation2((o26, p26) => {
                        if (p26) {
                            let q26 = new TechCard(this, {
                                title: '内存使用率',
                                value: this.getMemoryUsageDisplay(),
                                unit: '%'
                            }, undefined, o26, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 205, col: 13 });
                            ViewPU.create(q26);
                            let r26 = () => {
                                return {
                                    title: '内存使用率',
                                    value: this.getMemoryUsageDisplay(),
                                    unit: '%'
                                };
                            };
                            q26.paramsGenerator_ = r26;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(o26, {
                                title: '内存使用率',
                                value: this.getMemoryUsageDisplay(),
                                unit: '%'
                            });
                        }
                    }, { name: "TechCard" });
                }
                GridItem.pop();
            };
            n26();
        }
        {
            const e26 = (k26, l26) => {
                GridItem.create(() => { }, false);
                GridItem.onClick(() => {
                    router.pushUrl({ url: 'pages/MemoryPage' });
                });
            };
            const f26 = () => {
                this.observeComponentCreation2(e26, GridItem);
                {
                    this.observeComponentCreation2((g26, h26) => {
                        if (h26) {
                            let i26 = new TechCard(this, {
                                title: '应用内存',
                                value: this.getAppMemoryDisplay(),
                                unit: ''
                            }, undefined, g26, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 216, col: 13 });
                            ViewPU.create(i26);
                            let j26 = () => {
                                return {
                                    title: '应用内存',
                                    value: this.getAppMemoryDisplay(),
                                    unit: ''
                                };
                            };
                            i26.paramsGenerator_ = j26;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(g26, {
                                title: '应用内存',
                                value: this.getAppMemoryDisplay(),
                                unit: ''
                            });
                        }
                    }, { name: "TechCard" });
                }
                GridItem.pop();
            };
            f26();
        }
        {
            const w25 = (c26, d26) => {
                GridItem.create(() => { }, false);
                GridItem.onClick(() => {
                    router.pushUrl({ url: 'pages/BatteryPage' });
                });
            };
            const x25 = () => {
                this.observeComponentCreation2(w25, GridItem);
                {
                    this.observeComponentCreation2((y25, z25) => {
                        if (z25) {
                            let a26 = new TechCard(this, {
                                title: '电池电量',
                                value: this.getBatteryDisplay(),
                                unit: '%'
                            }, undefined, y25, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 227, col: 13 });
                            ViewPU.create(a26);
                            let b26 = () => {
                                return {
                                    title: '电池电量',
                                    value: this.getBatteryDisplay(),
                                    unit: '%'
                                };
                            };
                            a26.paramsGenerator_ = b26;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(y25, {
                                title: '电池电量',
                                value: this.getBatteryDisplay(),
                                unit: '%'
                            });
                        }
                    }, { name: "TechCard" });
                }
                GridItem.pop();
            };
            x25();
        }
        Grid.pop();
        {
            this.observeComponentCreation2((s25, t25) => {
                if (t25) {
                    let u25 = new TechHeader(this, {
                        title: '硬件信息',
                        subtitle: 'HARDWARE INFO'
                    }, undefined, s25, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 243, col: 9 });
                    ViewPU.create(u25);
                    let v25 = () => {
                        return {
                            title: '硬件信息',
                            subtitle: 'HARDWARE INFO'
                        };
                    };
                    u25.paramsGenerator_ = v25;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(s25, {
                        title: '硬件信息',
                        subtitle: 'HARDWARE INFO'
                    });
                }
            }, { name: "TechHeader" });
        }
        {
            this.observeComponentCreation2((o25, p25) => {
                if (p25) {
                    let q25 = new SysInfoMenuItem(this, {
                        title: '处理器',
                        subtitle: `${DeviceUtil.getCpuInfo().architecture || '未知'}`,
                        onTap: () => {
                            router.pushUrl({ url: 'pages/CpuPage' });
                        }
                    }, undefined, o25, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 248, col: 9 });
                    ViewPU.create(q25);
                    let r25 = () => {
                        return {
                            title: '处理器',
                            subtitle: `${DeviceUtil.getCpuInfo().architecture || '未知'}`,
                            onTap: () => {
                                router.pushUrl({ url: 'pages/CpuPage' });
                            }
                        };
                    };
                    q25.paramsGenerator_ = r25;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(o25, {
                        title: '处理器',
                        subtitle: `${DeviceUtil.getCpuInfo().architecture || '未知'}`
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((k25, l25) => {
                if (l25) {
                    let m25 = new SysInfoMenuItem(this, {
                        title: '内存',
                        subtitle: `总计 ${this.getTotalMemoryDisplay()}`,
                        onTap: () => {
                            router.pushUrl({ url: 'pages/MemoryPage' });
                        }
                    }, undefined, k25, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 256, col: 9 });
                    ViewPU.create(m25);
                    let n25 = () => {
                        return {
                            title: '内存',
                            subtitle: `总计 ${this.getTotalMemoryDisplay()}`,
                            onTap: () => {
                                router.pushUrl({ url: 'pages/MemoryPage' });
                            }
                        };
                    };
                    m25.paramsGenerator_ = n25;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(k25, {
                        title: '内存',
                        subtitle: `总计 ${this.getTotalMemoryDisplay()}`
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((g25, h25) => {
                if (h25) {
                    let i25 = new SysInfoMenuItem(this, {
                        title: '存储',
                        subtitle: `总计 ${this.getStorageDisplay()}`,
                        onTap: () => {
                            router.pushUrl({ url: 'pages/StoragePage' });
                        }
                    }, undefined, g25, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 264, col: 9 });
                    ViewPU.create(i25);
                    let j25 = () => {
                        return {
                            title: '存储',
                            subtitle: `总计 ${this.getStorageDisplay()}`,
                            onTap: () => {
                                router.pushUrl({ url: 'pages/StoragePage' });
                            }
                        };
                    };
                    i25.paramsGenerator_ = j25;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(g25, {
                        title: '存储',
                        subtitle: `总计 ${this.getStorageDisplay()}`
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((c25, d25) => {
                if (d25) {
                    let e25 = new SysInfoMenuItem(this, {
                        title: '屏幕',
                        subtitle: this.displayInfo ? `${this.displayInfo.width} × ${this.displayInfo.height} · ${this.displayInfo.refreshRate}Hz` : '--',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/DisplayPage' });
                        }
                    }, undefined, c25, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 272, col: 9 });
                    ViewPU.create(e25);
                    let f25 = () => {
                        return {
                            title: '屏幕',
                            subtitle: this.displayInfo ? `${this.displayInfo.width} × ${this.displayInfo.height} · ${this.displayInfo.refreshRate}Hz` : '--',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/DisplayPage' });
                            }
                        };
                    };
                    e25.paramsGenerator_ = f25;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(c25, {
                        title: '屏幕',
                        subtitle: this.displayInfo ? `${this.displayInfo.width} × ${this.displayInfo.height} · ${this.displayInfo.refreshRate}Hz` : '--'
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((y24, z24) => {
                if (z24) {
                    let a25 = new SysInfoMenuItem(this, {
                        title: '电池',
                        subtitle: `${this.getBatteryDisplay()}%`,
                        onTap: () => {
                            router.pushUrl({ url: 'pages/BatteryPage' });
                        }
                    }, undefined, y24, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 280, col: 9 });
                    ViewPU.create(a25);
                    let b25 = () => {
                        return {
                            title: '电池',
                            subtitle: `${this.getBatteryDisplay()}%`,
                            onTap: () => {
                                router.pushUrl({ url: 'pages/BatteryPage' });
                            }
                        };
                    };
                    a25.paramsGenerator_ = b25;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(y24, {
                        title: '电池',
                        subtitle: `${this.getBatteryDisplay()}%`
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((u24, v24) => {
                if (v24) {
                    let w24 = new SysInfoMenuItem(this, {
                        title: 'GPU',
                        subtitle: '',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/GpuPage' });
                        }
                    }, undefined, u24, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 288, col: 9 });
                    ViewPU.create(w24);
                    let x24 = () => {
                        return {
                            title: 'GPU',
                            subtitle: '',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/GpuPage' });
                            }
                        };
                    };
                    w24.paramsGenerator_ = x24;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(u24, {
                        title: 'GPU',
                        subtitle: ''
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((q24, r24) => {
                if (r24) {
                    let s24 = new TechHeader(this, {
                        title: '连接与传感器',
                        subtitle: 'CONNECTIVITY & SENSORS'
                    }, undefined, q24, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 297, col: 9 });
                    ViewPU.create(s24);
                    let t24 = () => {
                        return {
                            title: '连接与传感器',
                            subtitle: 'CONNECTIVITY & SENSORS'
                        };
                    };
                    s24.paramsGenerator_ = t24;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(q24, {
                        title: '连接与传感器',
                        subtitle: 'CONNECTIVITY & SENSORS'
                    });
                }
            }, { name: "TechHeader" });
        }
        {
            this.observeComponentCreation2((m24, n24) => {
                if (n24) {
                    let o24 = new SysInfoMenuItem(this, {
                        title: '网络',
                        subtitle: '',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/NetworkPage' });
                        }
                    }, undefined, m24, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 302, col: 9 });
                    ViewPU.create(o24);
                    let p24 = () => {
                        return {
                            title: '网络',
                            subtitle: '',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/NetworkPage' });
                            }
                        };
                    };
                    o24.paramsGenerator_ = p24;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(m24, {
                        title: '网络',
                        subtitle: ''
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((i24, j24) => {
                if (j24) {
                    let k24 = new SysInfoMenuItem(this, {
                        title: '摄像头',
                        subtitle: '',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/CameraPage' });
                        }
                    }, undefined, i24, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 310, col: 9 });
                    ViewPU.create(k24);
                    let l24 = () => {
                        return {
                            title: '摄像头',
                            subtitle: '',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/CameraPage' });
                            }
                        };
                    };
                    k24.paramsGenerator_ = l24;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(i24, {
                        title: '摄像头',
                        subtitle: ''
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((e24, f24) => {
                if (f24) {
                    let g24 = new SysInfoMenuItem(this, {
                        title: '传感器',
                        subtitle: '',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/SensorPage' });
                        }
                    }, undefined, e24, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 318, col: 9 });
                    ViewPU.create(g24);
                    let h24 = () => {
                        return {
                            title: '传感器',
                            subtitle: '',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/SensorPage' });
                            }
                        };
                    };
                    g24.paramsGenerator_ = h24;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(e24, {
                        title: '传感器',
                        subtitle: ''
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((a24, b24) => {
                if (b24) {
                    let c24 = new TechHeader(this, {
                        title: '其他',
                        subtitle: 'OTHERS'
                    }, undefined, a24, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 327, col: 9 });
                    ViewPU.create(c24);
                    let d24 = () => {
                        return {
                            title: '其他',
                            subtitle: 'OTHERS'
                        };
                    };
                    c24.paramsGenerator_ = d24;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(a24, {
                        title: '其他',
                        subtitle: 'OTHERS'
                    });
                }
            }, { name: "TechHeader" });
        }
        {
            this.observeComponentCreation2((w23, x23) => {
                if (x23) {
                    let y23 = new SysInfoMenuItem(this, {
                        title: '系统信息测试',
                        subtitle: '运行完整 API 测试',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/TestPage' });
                        }
                    }, undefined, w23, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 332, col: 9 });
                    ViewPU.create(y23);
                    let z23 = () => {
                        return {
                            title: '系统信息测试',
                            subtitle: '运行完整 API 测试',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/TestPage' });
                            }
                        };
                    };
                    y23.paramsGenerator_ = z23;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(w23, {
                        title: '系统信息测试',
                        subtitle: '运行完整 API 测试'
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((s23, t23) => {
                if (t23) {
                    let u23 = new SysInfoMenuItem(this, {
                        title: '关于',
                        subtitle: 'SysPulse v1.0.0',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/AboutPage' });
                        }
                    }, undefined, s23, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 340, col: 9 });
                    ViewPU.create(u23);
                    let v23 = () => {
                        return {
                            title: '关于',
                            subtitle: 'SysPulse v1.0.0',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/AboutPage' });
                            }
                        };
                    };
                    u23.paramsGenerator_ = v23;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(s23, {
                        title: '关于',
                        subtitle: 'SysPulse v1.0.0'
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        this.observeComponentCreation2((q23, r23) => {
            Row.create();
            Row.justifyContent(FlexAlign.Center);
            Row.margin({ top: 32, bottom: 16 });
        }, Row);
        this.observeComponentCreation2((o23, p23) => {
            Row.create();
            Row.width(60);
            Row.height(1);
            Row.backgroundColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Row);
        Row.pop();
        this.observeComponentCreation2((m23, n23) => {
            Text.create('●');
            Text.fontSize(8);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 8, right: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((k23, l23) => {
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
