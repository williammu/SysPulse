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
    constructor(g8, h8, i8, j8 = -1, k8 = undefined, l8) {
        super(g8, i8, j8, l8);
        if (typeof k8 === "function") {
            this.paramsGenerator_ = k8;
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
        this.setInitiallyProvidedValue(h8);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(f8: Index_Params) {
        if (f8.deviceInfo !== undefined) {
            this.deviceInfo = f8.deviceInfo;
        }
        if (f8.batteryInfo !== undefined) {
            this.batteryInfo = f8.batteryInfo;
        }
        if (f8.systemMemInfo !== undefined) {
            this.systemMemInfo = f8.systemMemInfo;
        }
        if (f8.appMemInfo !== undefined) {
            this.appMemInfo = f8.appMemInfo;
        }
        if (f8.systemCpuUsage !== undefined) {
            this.systemCpuUsage = f8.systemCpuUsage;
        }
        if (f8.displayInfo !== undefined) {
            this.displayInfo = f8.displayInfo;
        }
        if (f8.storageInfo !== undefined) {
            this.storageInfo = f8.storageInfo;
        }
        if (f8.currentTime !== undefined) {
            this.currentTime = f8.currentTime;
        }
        if (f8.refreshTimer !== undefined) {
            this.refreshTimer = f8.refreshTimer;
        }
    }
    updateStateVars(e8: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(d8) {
        this.__deviceInfo.purgeDependencyOnElmtId(d8);
        this.__batteryInfo.purgeDependencyOnElmtId(d8);
        this.__systemMemInfo.purgeDependencyOnElmtId(d8);
        this.__appMemInfo.purgeDependencyOnElmtId(d8);
        this.__systemCpuUsage.purgeDependencyOnElmtId(d8);
        this.__displayInfo.purgeDependencyOnElmtId(d8);
        this.__storageInfo.purgeDependencyOnElmtId(d8);
        this.__currentTime.purgeDependencyOnElmtId(d8);
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
    set deviceInfo(c8: DeviceInfoModel | null) {
        this.__deviceInfo.set(c8);
    }
    private __batteryInfo: ObservedPropertyObjectPU<BatteryInfoModel | null>;
    get batteryInfo() {
        return this.__batteryInfo.get();
    }
    set batteryInfo(b8: BatteryInfoModel | null) {
        this.__batteryInfo.set(b8);
    }
    private __systemMemInfo: ObservedPropertyObjectPU<SystemMemInfo | null>;
    get systemMemInfo() {
        return this.__systemMemInfo.get();
    }
    set systemMemInfo(a8: SystemMemInfo | null) {
        this.__systemMemInfo.set(a8);
    }
    private __appMemInfo: ObservedPropertyObjectPU<AppMemInfo | null>;
    get appMemInfo() {
        return this.__appMemInfo.get();
    }
    set appMemInfo(z7: AppMemInfo | null) {
        this.__appMemInfo.set(z7);
    }
    private __systemCpuUsage: ObservedPropertyObjectPU<CpuUsage | null>;
    get systemCpuUsage() {
        return this.__systemCpuUsage.get();
    }
    set systemCpuUsage(y7: CpuUsage | null) {
        this.__systemCpuUsage.set(y7);
    }
    private __displayInfo: ObservedPropertyObjectPU<DisplayInfoModel | null>;
    get displayInfo() {
        return this.__displayInfo.get();
    }
    set displayInfo(x7: DisplayInfoModel | null) {
        this.__displayInfo.set(x7);
    }
    private __storageInfo: ObservedPropertyObjectPU<StorageInfoModel | null>;
    get storageInfo() {
        return this.__storageInfo.get();
    }
    set storageInfo(w7: StorageInfoModel | null) {
        this.__storageInfo.set(w7);
    }
    private __currentTime: ObservedPropertySimplePU<string>;
    get currentTime() {
        return this.__currentTime.get();
    }
    set currentTime(v7: string) {
        this.__currentTime.set(v7);
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
        const u7 = new Date();
        this.currentTime = u7.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    }
    getCpuUsageDisplay(): string {
        if (this.systemCpuUsage?.success) {
            return `${this.systemCpuUsage.percentage.toFixed(1)}`;
        }
        return '--';
    }
    getMemoryUsageDisplay(): string {
        if (this.systemMemInfo?.success && this.systemMemInfo.total > 0 && this.systemMemInfo.available > 0) {
            const s7 = this.systemMemInfo.total - this.systemMemInfo.available;
            const t7 = ((s7 / this.systemMemInfo.total) * 100).toFixed(1);
            return `${t7}`;
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
        this.observeComponentCreation2((q7, r7) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.height('100%');
            Scroll.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Scroll);
        this.observeComponentCreation2((o7, p7) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((m7, n7) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.padding({ top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((k7, l7) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((i7, j7) => {
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
        this.observeComponentCreation2((g7, h7) => {
            Text.create('SYSTEM ONLINE');
            Text.fontSize(11);
            Text.fontColor({ "id": 16777242, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 6 });
            Text.letterSpacing(1);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((e7, f7) => {
            Text.create(this.currentTime);
            Text.fontSize(14);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.letterSpacing(2);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((c7, d7) => {
            Column.create();
            Column.width('100%');
            Column.padding({ top: 16, bottom: 24 });
        }, Column);
        this.observeComponentCreation2((a7, b7) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((y6, z6) => {
            Text.create('SYS');
            Text.fontSize(32);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((w6, x6) => {
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
        this.observeComponentCreation2((u6, v6) => {
            Text.create(this.deviceInfo?.marketName || '设备型号');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((s6, t6) => {
            Text.create(`${this.deviceInfo?.brand || '品牌'} · ${this.deviceInfo?.osFullName || '系统版本'}`);
            Text.fontSize(12);
            Text.fontColor({ "id": 16777243, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        {
            this.observeComponentCreation2((o6, p6) => {
                if (p6) {
                    let q6 = new TechHeader(this, {
                        title: '实时监控',
                        subtitle: 'REAL-TIME MONITORING'
                    }, undefined, o6, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 187, col: 9 });
                    ViewPU.create(q6);
                    let r6 = () => {
                        return {
                            title: '实时监控',
                            subtitle: 'REAL-TIME MONITORING'
                        };
                    };
                    q6.paramsGenerator_ = r6;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(o6, {
                        title: '实时监控',
                        subtitle: 'REAL-TIME MONITORING'
                    });
                }
            }, { name: "TechHeader" });
        }
        this.observeComponentCreation2((m6, n6) => {
            Grid.create();
            Grid.columnsTemplate('1fr 1fr');
            Grid.columnsGap(12);
            Grid.rowsGap(12);
            Grid.width('100%');
        }, Grid);
        {
            const e6 = (k6, l6) => {
                GridItem.create(() => { }, false);
                GridItem.onClick(() => {
                    router.pushUrl({ url: 'pages/CpuPage' });
                });
            };
            const f6 = () => {
                this.observeComponentCreation2(e6, GridItem);
                {
                    this.observeComponentCreation2((g6, h6) => {
                        if (h6) {
                            let i6 = new TechCard(this, {
                                title: 'CPU 使用率',
                                value: this.getCpuUsageDisplay(),
                                unit: '%'
                            }, undefined, g6, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 194, col: 13 });
                            ViewPU.create(i6);
                            let j6 = () => {
                                return {
                                    title: 'CPU 使用率',
                                    value: this.getCpuUsageDisplay(),
                                    unit: '%'
                                };
                            };
                            i6.paramsGenerator_ = j6;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(g6, {
                                title: 'CPU 使用率',
                                value: this.getCpuUsageDisplay(),
                                unit: '%'
                            });
                        }
                    }, { name: "TechCard" });
                }
                GridItem.pop();
            };
            f6();
        }
        {
            const w5 = (c6, d6) => {
                GridItem.create(() => { }, false);
                GridItem.onClick(() => {
                    router.pushUrl({ url: 'pages/MemoryPage' });
                });
            };
            const x5 = () => {
                this.observeComponentCreation2(w5, GridItem);
                {
                    this.observeComponentCreation2((y5, z5) => {
                        if (z5) {
                            let a6 = new TechCard(this, {
                                title: '内存使用率',
                                value: this.getMemoryUsageDisplay(),
                                unit: '%'
                            }, undefined, y5, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 205, col: 13 });
                            ViewPU.create(a6);
                            let b6 = () => {
                                return {
                                    title: '内存使用率',
                                    value: this.getMemoryUsageDisplay(),
                                    unit: '%'
                                };
                            };
                            a6.paramsGenerator_ = b6;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(y5, {
                                title: '内存使用率',
                                value: this.getMemoryUsageDisplay(),
                                unit: '%'
                            });
                        }
                    }, { name: "TechCard" });
                }
                GridItem.pop();
            };
            x5();
        }
        {
            const o5 = (u5, v5) => {
                GridItem.create(() => { }, false);
                GridItem.onClick(() => {
                    router.pushUrl({ url: 'pages/MemoryPage' });
                });
            };
            const p5 = () => {
                this.observeComponentCreation2(o5, GridItem);
                {
                    this.observeComponentCreation2((q5, r5) => {
                        if (r5) {
                            let s5 = new TechCard(this, {
                                title: '应用内存',
                                value: this.getAppMemoryDisplay(),
                                unit: ''
                            }, undefined, q5, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 216, col: 13 });
                            ViewPU.create(s5);
                            let t5 = () => {
                                return {
                                    title: '应用内存',
                                    value: this.getAppMemoryDisplay(),
                                    unit: ''
                                };
                            };
                            s5.paramsGenerator_ = t5;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(q5, {
                                title: '应用内存',
                                value: this.getAppMemoryDisplay(),
                                unit: ''
                            });
                        }
                    }, { name: "TechCard" });
                }
                GridItem.pop();
            };
            p5();
        }
        {
            const g5 = (m5, n5) => {
                GridItem.create(() => { }, false);
                GridItem.onClick(() => {
                    router.pushUrl({ url: 'pages/BatteryPage' });
                });
            };
            const h5 = () => {
                this.observeComponentCreation2(g5, GridItem);
                {
                    this.observeComponentCreation2((i5, j5) => {
                        if (j5) {
                            let k5 = new TechCard(this, {
                                title: '电池电量',
                                value: this.getBatteryDisplay(),
                                unit: '%'
                            }, undefined, i5, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 227, col: 13 });
                            ViewPU.create(k5);
                            let l5 = () => {
                                return {
                                    title: '电池电量',
                                    value: this.getBatteryDisplay(),
                                    unit: '%'
                                };
                            };
                            k5.paramsGenerator_ = l5;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(i5, {
                                title: '电池电量',
                                value: this.getBatteryDisplay(),
                                unit: '%'
                            });
                        }
                    }, { name: "TechCard" });
                }
                GridItem.pop();
            };
            h5();
        }
        Grid.pop();
        {
            this.observeComponentCreation2((c5, d5) => {
                if (d5) {
                    let e5 = new TechHeader(this, {
                        title: '硬件信息',
                        subtitle: 'HARDWARE INFO'
                    }, undefined, c5, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 243, col: 9 });
                    ViewPU.create(e5);
                    let f5 = () => {
                        return {
                            title: '硬件信息',
                            subtitle: 'HARDWARE INFO'
                        };
                    };
                    e5.paramsGenerator_ = f5;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(c5, {
                        title: '硬件信息',
                        subtitle: 'HARDWARE INFO'
                    });
                }
            }, { name: "TechHeader" });
        }
        {
            this.observeComponentCreation2((y4, z4) => {
                if (z4) {
                    let a5 = new SysInfoMenuItem(this, {
                        title: '处理器',
                        subtitle: `${DeviceUtil.getCpuInfo().architecture || '未知'} · 点击查看详情`,
                        onTap: () => {
                            router.pushUrl({ url: 'pages/CpuPage' });
                        }
                    }, undefined, y4, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 248, col: 9 });
                    ViewPU.create(a5);
                    let b5 = () => {
                        return {
                            title: '处理器',
                            subtitle: `${DeviceUtil.getCpuInfo().architecture || '未知'} · 点击查看详情`,
                            onTap: () => {
                                router.pushUrl({ url: 'pages/CpuPage' });
                            }
                        };
                    };
                    a5.paramsGenerator_ = b5;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(y4, {
                        title: '处理器',
                        subtitle: `${DeviceUtil.getCpuInfo().architecture || '未知'} · 点击查看详情`
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((u4, v4) => {
                if (v4) {
                    let w4 = new SysInfoMenuItem(this, {
                        title: '内存',
                        subtitle: `总计 ${this.getTotalMemoryDisplay()} · 点击查看详情`,
                        onTap: () => {
                            router.pushUrl({ url: 'pages/MemoryPage' });
                        }
                    }, undefined, u4, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 256, col: 9 });
                    ViewPU.create(w4);
                    let x4 = () => {
                        return {
                            title: '内存',
                            subtitle: `总计 ${this.getTotalMemoryDisplay()} · 点击查看详情`,
                            onTap: () => {
                                router.pushUrl({ url: 'pages/MemoryPage' });
                            }
                        };
                    };
                    w4.paramsGenerator_ = x4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(u4, {
                        title: '内存',
                        subtitle: `总计 ${this.getTotalMemoryDisplay()} · 点击查看详情`
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((q4, r4) => {
                if (r4) {
                    let s4 = new SysInfoMenuItem(this, {
                        title: '存储',
                        subtitle: `总计 ${this.getStorageDisplay()} · 点击查看详情`,
                        onTap: () => {
                            router.pushUrl({ url: 'pages/StoragePage' });
                        }
                    }, undefined, q4, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 264, col: 9 });
                    ViewPU.create(s4);
                    let t4 = () => {
                        return {
                            title: '存储',
                            subtitle: `总计 ${this.getStorageDisplay()} · 点击查看详情`,
                            onTap: () => {
                                router.pushUrl({ url: 'pages/StoragePage' });
                            }
                        };
                    };
                    s4.paramsGenerator_ = t4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(q4, {
                        title: '存储',
                        subtitle: `总计 ${this.getStorageDisplay()} · 点击查看详情`
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((m4, n4) => {
                if (n4) {
                    let o4 = new SysInfoMenuItem(this, {
                        title: '屏幕',
                        subtitle: this.displayInfo ? `${this.displayInfo.width} × ${this.displayInfo.height} · ${this.displayInfo.refreshRate}Hz` : '--',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/DisplayPage' });
                        }
                    }, undefined, m4, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 272, col: 9 });
                    ViewPU.create(o4);
                    let p4 = () => {
                        return {
                            title: '屏幕',
                            subtitle: this.displayInfo ? `${this.displayInfo.width} × ${this.displayInfo.height} · ${this.displayInfo.refreshRate}Hz` : '--',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/DisplayPage' });
                            }
                        };
                    };
                    o4.paramsGenerator_ = p4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(m4, {
                        title: '屏幕',
                        subtitle: this.displayInfo ? `${this.displayInfo.width} × ${this.displayInfo.height} · ${this.displayInfo.refreshRate}Hz` : '--'
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((i4, j4) => {
                if (j4) {
                    let k4 = new SysInfoMenuItem(this, {
                        title: '电池',
                        subtitle: `${this.getBatteryDisplay()}% · 点击查看详情`,
                        onTap: () => {
                            router.pushUrl({ url: 'pages/BatteryPage' });
                        }
                    }, undefined, i4, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 280, col: 9 });
                    ViewPU.create(k4);
                    let l4 = () => {
                        return {
                            title: '电池',
                            subtitle: `${this.getBatteryDisplay()}% · 点击查看详情`,
                            onTap: () => {
                                router.pushUrl({ url: 'pages/BatteryPage' });
                            }
                        };
                    };
                    k4.paramsGenerator_ = l4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(i4, {
                        title: '电池',
                        subtitle: `${this.getBatteryDisplay()}% · 点击查看详情`
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((e4, f4) => {
                if (f4) {
                    let g4 = new SysInfoMenuItem(this, {
                        title: 'GPU',
                        subtitle: '点击查看详情',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/GpuPage' });
                        }
                    }, undefined, e4, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 288, col: 9 });
                    ViewPU.create(g4);
                    let h4 = () => {
                        return {
                            title: 'GPU',
                            subtitle: '点击查看详情',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/GpuPage' });
                            }
                        };
                    };
                    g4.paramsGenerator_ = h4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(e4, {
                        title: 'GPU',
                        subtitle: '点击查看详情'
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((a4, b4) => {
                if (b4) {
                    let c4 = new TechHeader(this, {
                        title: '连接与传感器',
                        subtitle: 'CONNECTIVITY & SENSORS'
                    }, undefined, a4, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 297, col: 9 });
                    ViewPU.create(c4);
                    let d4 = () => {
                        return {
                            title: '连接与传感器',
                            subtitle: 'CONNECTIVITY & SENSORS'
                        };
                    };
                    c4.paramsGenerator_ = d4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(a4, {
                        title: '连接与传感器',
                        subtitle: 'CONNECTIVITY & SENSORS'
                    });
                }
            }, { name: "TechHeader" });
        }
        {
            this.observeComponentCreation2((w3, x3) => {
                if (x3) {
                    let y3 = new SysInfoMenuItem(this, {
                        title: '网络',
                        subtitle: '点击查看详情',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/NetworkPage' });
                        }
                    }, undefined, w3, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 302, col: 9 });
                    ViewPU.create(y3);
                    let z3 = () => {
                        return {
                            title: '网络',
                            subtitle: '点击查看详情',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/NetworkPage' });
                            }
                        };
                    };
                    y3.paramsGenerator_ = z3;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(w3, {
                        title: '网络',
                        subtitle: '点击查看详情'
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((s3, t3) => {
                if (t3) {
                    let u3 = new SysInfoMenuItem(this, {
                        title: '摄像头',
                        subtitle: '点击查看详情',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/CameraPage' });
                        }
                    }, undefined, s3, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 310, col: 9 });
                    ViewPU.create(u3);
                    let v3 = () => {
                        return {
                            title: '摄像头',
                            subtitle: '点击查看详情',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/CameraPage' });
                            }
                        };
                    };
                    u3.paramsGenerator_ = v3;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(s3, {
                        title: '摄像头',
                        subtitle: '点击查看详情'
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((o3, p3) => {
                if (p3) {
                    let q3 = new SysInfoMenuItem(this, {
                        title: '传感器',
                        subtitle: '点击查看详情',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/SensorPage' });
                        }
                    }, undefined, o3, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 318, col: 9 });
                    ViewPU.create(q3);
                    let r3 = () => {
                        return {
                            title: '传感器',
                            subtitle: '点击查看详情',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/SensorPage' });
                            }
                        };
                    };
                    q3.paramsGenerator_ = r3;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(o3, {
                        title: '传感器',
                        subtitle: '点击查看详情'
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((k3, l3) => {
                if (l3) {
                    let m3 = new TechHeader(this, {
                        title: '其他',
                        subtitle: 'OTHERS'
                    }, undefined, k3, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 327, col: 9 });
                    ViewPU.create(m3);
                    let n3 = () => {
                        return {
                            title: '其他',
                            subtitle: 'OTHERS'
                        };
                    };
                    m3.paramsGenerator_ = n3;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(k3, {
                        title: '其他',
                        subtitle: 'OTHERS'
                    });
                }
            }, { name: "TechHeader" });
        }
        {
            this.observeComponentCreation2((g3, h3) => {
                if (h3) {
                    let i3 = new SysInfoMenuItem(this, {
                        title: '系统信息测试',
                        subtitle: '运行完整 API 测试',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/TestPage' });
                        }
                    }, undefined, g3, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 332, col: 9 });
                    ViewPU.create(i3);
                    let j3 = () => {
                        return {
                            title: '系统信息测试',
                            subtitle: '运行完整 API 测试',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/TestPage' });
                            }
                        };
                    };
                    i3.paramsGenerator_ = j3;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(g3, {
                        title: '系统信息测试',
                        subtitle: '运行完整 API 测试'
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((c3, d3) => {
                if (d3) {
                    let e3 = new SysInfoMenuItem(this, {
                        title: '关于',
                        subtitle: 'SysPulse v1.0.0',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/AboutPage' });
                        }
                    }, undefined, c3, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 340, col: 9 });
                    ViewPU.create(e3);
                    let f3 = () => {
                        return {
                            title: '关于',
                            subtitle: 'SysPulse v1.0.0',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/AboutPage' });
                            }
                        };
                    };
                    e3.paramsGenerator_ = f3;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(c3, {
                        title: '关于',
                        subtitle: 'SysPulse v1.0.0'
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        this.observeComponentCreation2((a3, b3) => {
            Row.create();
            Row.justifyContent(FlexAlign.Center);
            Row.margin({ top: 32, bottom: 16 });
        }, Row);
        this.observeComponentCreation2((y2, z2) => {
            Row.create();
            Row.width(60);
            Row.height(1);
            Row.backgroundColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Row);
        Row.pop();
        this.observeComponentCreation2((w2, x2) => {
            Text.create('●');
            Text.fontSize(8);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 8, right: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((u2, v2) => {
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
