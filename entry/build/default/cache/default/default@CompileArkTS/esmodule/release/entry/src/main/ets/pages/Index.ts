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
    refreshTimer?: number | null;
}
import router from "@ohos:router";
import { DeviceUtil } from "@bundle:com.huawei.sysinfo/entry/ets/utils/DeviceUtil";
import { FormatUtil } from "@bundle:com.huawei.sysinfo/entry/ets/utils/FormatUtil";
import { InfoCard } from "@bundle:com.huawei.sysinfo/entry/ets/components/InfoCard";
import { SysInfoMenuItem } from "@bundle:com.huawei.sysinfo/entry/ets/components/MenuItem";
import { SectionHeader } from "@bundle:com.huawei.sysinfo/entry/ets/components/SectionHeader";
import { nativeApi } from "@bundle:com.huawei.sysinfo/entry/ets/utils/NativeApi";
import type { SystemMemInfo, CpuUsage, AppMemInfo } from "@bundle:com.huawei.sysinfo/entry/ets/utils/NativeApi";
import type { DeviceInfoModel, BatteryInfoModel, DisplayInfoModel, StorageInfoModel } from '../model/DeviceInfo';
class Index extends ViewPU {
    constructor(m8, n8, o8, p8 = -1, q8 = undefined, r8) {
        super(m8, o8, p8, r8);
        if (typeof q8 === "function") {
            this.paramsGenerator_ = q8;
        }
        this.__deviceInfo = new ObservedPropertyObjectPU(null, this, "deviceInfo");
        this.__batteryInfo = new ObservedPropertyObjectPU(null, this, "batteryInfo");
        this.__systemMemInfo = new ObservedPropertyObjectPU(null, this, "systemMemInfo");
        this.__appMemInfo = new ObservedPropertyObjectPU(null, this, "appMemInfo");
        this.__systemCpuUsage = new ObservedPropertyObjectPU(null, this, "systemCpuUsage");
        this.__displayInfo = new ObservedPropertyObjectPU(null, this, "displayInfo");
        this.__storageInfo = new ObservedPropertyObjectPU(null, this, "storageInfo");
        this.refreshTimer = null;
        this.setInitiallyProvidedValue(n8);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(l8: Index_Params) {
        if (l8.deviceInfo !== undefined) {
            this.deviceInfo = l8.deviceInfo;
        }
        if (l8.batteryInfo !== undefined) {
            this.batteryInfo = l8.batteryInfo;
        }
        if (l8.systemMemInfo !== undefined) {
            this.systemMemInfo = l8.systemMemInfo;
        }
        if (l8.appMemInfo !== undefined) {
            this.appMemInfo = l8.appMemInfo;
        }
        if (l8.systemCpuUsage !== undefined) {
            this.systemCpuUsage = l8.systemCpuUsage;
        }
        if (l8.displayInfo !== undefined) {
            this.displayInfo = l8.displayInfo;
        }
        if (l8.storageInfo !== undefined) {
            this.storageInfo = l8.storageInfo;
        }
        if (l8.refreshTimer !== undefined) {
            this.refreshTimer = l8.refreshTimer;
        }
    }
    updateStateVars(k8: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(j8) {
        this.__deviceInfo.purgeDependencyOnElmtId(j8);
        this.__batteryInfo.purgeDependencyOnElmtId(j8);
        this.__systemMemInfo.purgeDependencyOnElmtId(j8);
        this.__appMemInfo.purgeDependencyOnElmtId(j8);
        this.__systemCpuUsage.purgeDependencyOnElmtId(j8);
        this.__displayInfo.purgeDependencyOnElmtId(j8);
        this.__storageInfo.purgeDependencyOnElmtId(j8);
    }
    aboutToBeDeleted() {
        this.__deviceInfo.aboutToBeDeleted();
        this.__batteryInfo.aboutToBeDeleted();
        this.__systemMemInfo.aboutToBeDeleted();
        this.__appMemInfo.aboutToBeDeleted();
        this.__systemCpuUsage.aboutToBeDeleted();
        this.__displayInfo.aboutToBeDeleted();
        this.__storageInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __deviceInfo: ObservedPropertyObjectPU<DeviceInfoModel | null>;
    get deviceInfo() {
        return this.__deviceInfo.get();
    }
    set deviceInfo(i8: DeviceInfoModel | null) {
        this.__deviceInfo.set(i8);
    }
    private __batteryInfo: ObservedPropertyObjectPU<BatteryInfoModel | null>;
    get batteryInfo() {
        return this.__batteryInfo.get();
    }
    set batteryInfo(h8: BatteryInfoModel | null) {
        this.__batteryInfo.set(h8);
    }
    private __systemMemInfo: ObservedPropertyObjectPU<SystemMemInfo | null>;
    get systemMemInfo() {
        return this.__systemMemInfo.get();
    }
    set systemMemInfo(g8: SystemMemInfo | null) {
        this.__systemMemInfo.set(g8);
    }
    private __appMemInfo: ObservedPropertyObjectPU<AppMemInfo | null>;
    get appMemInfo() {
        return this.__appMemInfo.get();
    }
    set appMemInfo(f8: AppMemInfo | null) {
        this.__appMemInfo.set(f8);
    }
    private __systemCpuUsage: ObservedPropertyObjectPU<CpuUsage | null>;
    get systemCpuUsage() {
        return this.__systemCpuUsage.get();
    }
    set systemCpuUsage(e8: CpuUsage | null) {
        this.__systemCpuUsage.set(e8);
    }
    private __displayInfo: ObservedPropertyObjectPU<DisplayInfoModel | null>;
    get displayInfo() {
        return this.__displayInfo.get();
    }
    set displayInfo(d8: DisplayInfoModel | null) {
        this.__displayInfo.set(d8);
    }
    private __storageInfo: ObservedPropertyObjectPU<StorageInfoModel | null>;
    get storageInfo() {
        return this.__storageInfo.get();
    }
    set storageInfo(c8: StorageInfoModel | null) {
        this.__storageInfo.set(c8);
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
    getCpuUsageDisplay(): string {
        if (this.systemCpuUsage?.success) {
            return `${this.systemCpuUsage.percentage.toFixed(1)}%`;
        }
        return '未获取';
    }
    getMemoryUsageDisplay(): string {
        if (this.systemMemInfo?.success && this.systemMemInfo.total > 0 && this.systemMemInfo.available > 0) {
            const a8 = this.systemMemInfo.total - this.systemMemInfo.available;
            const b8 = ((a8 / this.systemMemInfo.total) * 100).toFixed(1);
            return `${b8}%`;
        }
        return '未获取';
    }
    getTotalMemoryDisplay(): string {
        if (this.systemMemInfo?.success && this.systemMemInfo.total > 0) {
            return FormatUtil.formatBytes(this.systemMemInfo.total);
        }
        return '未获取';
    }
    getAppMemoryDisplay(): string {
        if (this.appMemInfo?.success && this.appMemInfo.pss > 0) {
            return FormatUtil.formatBytes(this.appMemInfo.pss);
        }
        return '未获取';
    }
    getBatteryDisplay(): string {
        if (this.batteryInfo) {
            return `${this.batteryInfo.batterySOC}%`;
        }
        return '--';
    }
    getStorageDisplay(): string {
        if (this.storageInfo && this.storageInfo.totalSize > 0) {
            return FormatUtil.formatBytes(this.storageInfo.totalSize);
        }
        return '未获取';
    }
    initialRender() {
        this.observeComponentCreation2((y7, z7) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.height('100%');
            Scroll.backgroundColor('#F7F8FA');
        }, Scroll);
        this.observeComponentCreation2((w7, x7) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((u7, v7) => {
            Column.create();
            Column.width('100%');
            Column.padding({ top: 20, bottom: 24 });
        }, Column);
        this.observeComponentCreation2((s7, t7) => {
            Text.create(this.deviceInfo?.marketName || '设备型号');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((q7, r7) => {
            Text.create(`${this.deviceInfo?.brand || '品牌'} · ${this.deviceInfo?.osFullName || '系统版本'}`);
            Text.fontSize(14);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        {
            this.observeComponentCreation2((m7, n7) => {
                if (n7) {
                    let o7 = new SectionHeader(this, { title: '实时状态' }, undefined, m7, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 124, col: 9 });
                    ViewPU.create(o7);
                    let p7 = () => {
                        return {
                            title: '实时状态'
                        };
                    };
                    o7.paramsGenerator_ = p7;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(m7, {
                        title: '实时状态'
                    });
                }
            }, { name: "SectionHeader" });
        }
        this.observeComponentCreation2((k7, l7) => {
            Grid.create();
            Grid.columnsTemplate('1fr 1fr');
            Grid.columnsGap(12);
            Grid.rowsGap(12);
            Grid.width('100%');
        }, Grid);
        {
            const c7 = (i7, j7) => {
                GridItem.create(() => { }, false);
                GridItem.onClick(() => {
                    router.pushUrl({ url: 'pages/CpuPage' });
                });
            };
            const d7 = () => {
                this.observeComponentCreation2(c7, GridItem);
                {
                    this.observeComponentCreation2((e7, f7) => {
                        if (f7) {
                            let g7 = new InfoCard(this, {
                                title: 'CPU 使用率',
                                value: this.getCpuUsageDisplay()
                            }, undefined, e7, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 128, col: 13 });
                            ViewPU.create(g7);
                            let h7 = () => {
                                return {
                                    title: 'CPU 使用率',
                                    value: this.getCpuUsageDisplay()
                                };
                            };
                            g7.paramsGenerator_ = h7;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(e7, {
                                title: 'CPU 使用率',
                                value: this.getCpuUsageDisplay()
                            });
                        }
                    }, { name: "InfoCard" });
                }
                GridItem.pop();
            };
            d7();
        }
        {
            const u6 = (a7, b7) => {
                GridItem.create(() => { }, false);
                GridItem.onClick(() => {
                    router.pushUrl({ url: 'pages/MemoryPage' });
                });
            };
            const v6 = () => {
                this.observeComponentCreation2(u6, GridItem);
                {
                    this.observeComponentCreation2((w6, x6) => {
                        if (x6) {
                            let y6 = new InfoCard(this, {
                                title: '内存使用率',
                                value: this.getMemoryUsageDisplay()
                            }, undefined, w6, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 138, col: 13 });
                            ViewPU.create(y6);
                            let z6 = () => {
                                return {
                                    title: '内存使用率',
                                    value: this.getMemoryUsageDisplay()
                                };
                            };
                            y6.paramsGenerator_ = z6;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(w6, {
                                title: '内存使用率',
                                value: this.getMemoryUsageDisplay()
                            });
                        }
                    }, { name: "InfoCard" });
                }
                GridItem.pop();
            };
            v6();
        }
        {
            const m6 = (s6, t6) => {
                GridItem.create(() => { }, false);
                GridItem.onClick(() => {
                    router.pushUrl({ url: 'pages/MemoryPage' });
                });
            };
            const n6 = () => {
                this.observeComponentCreation2(m6, GridItem);
                {
                    this.observeComponentCreation2((o6, p6) => {
                        if (p6) {
                            let q6 = new InfoCard(this, {
                                title: '应用内存',
                                value: this.getAppMemoryDisplay()
                            }, undefined, o6, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 148, col: 13 });
                            ViewPU.create(q6);
                            let r6 = () => {
                                return {
                                    title: '应用内存',
                                    value: this.getAppMemoryDisplay()
                                };
                            };
                            q6.paramsGenerator_ = r6;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(o6, {
                                title: '应用内存',
                                value: this.getAppMemoryDisplay()
                            });
                        }
                    }, { name: "InfoCard" });
                }
                GridItem.pop();
            };
            n6();
        }
        {
            const e6 = (k6, l6) => {
                GridItem.create(() => { }, false);
                GridItem.onClick(() => {
                    router.pushUrl({ url: 'pages/BatteryPage' });
                });
            };
            const f6 = () => {
                this.observeComponentCreation2(e6, GridItem);
                {
                    this.observeComponentCreation2((g6, h6) => {
                        if (h6) {
                            let i6 = new InfoCard(this, {
                                title: '电池电量',
                                value: this.getBatteryDisplay()
                            }, undefined, g6, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 158, col: 13 });
                            ViewPU.create(i6);
                            let j6 = () => {
                                return {
                                    title: '电池电量',
                                    value: this.getBatteryDisplay()
                                };
                            };
                            i6.paramsGenerator_ = j6;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(g6, {
                                title: '电池电量',
                                value: this.getBatteryDisplay()
                            });
                        }
                    }, { name: "InfoCard" });
                }
                GridItem.pop();
            };
            f6();
        }
        Grid.pop();
        {
            this.observeComponentCreation2((a6, b6) => {
                if (b6) {
                    let c6 = new SectionHeader(this, { title: '硬件信息' }, undefined, a6, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 173, col: 9 });
                    ViewPU.create(c6);
                    let d6 = () => {
                        return {
                            title: '硬件信息'
                        };
                    };
                    c6.paramsGenerator_ = d6;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(a6, {
                        title: '硬件信息'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((w5, x5) => {
                if (x5) {
                    let y5 = new SysInfoMenuItem(this, {
                        title: '处理器',
                        subtitle: `${DeviceUtil.getCpuInfo().architecture || '未知'} · 点击查看详情`,
                        onTap: () => {
                            router.pushUrl({ url: 'pages/CpuPage' });
                        }
                    }, undefined, w5, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 175, col: 9 });
                    ViewPU.create(y5);
                    let z5 = () => {
                        return {
                            title: '处理器',
                            subtitle: `${DeviceUtil.getCpuInfo().architecture || '未知'} · 点击查看详情`,
                            onTap: () => {
                                router.pushUrl({ url: 'pages/CpuPage' });
                            }
                        };
                    };
                    y5.paramsGenerator_ = z5;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(w5, {
                        title: '处理器',
                        subtitle: `${DeviceUtil.getCpuInfo().architecture || '未知'} · 点击查看详情`
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((s5, t5) => {
                if (t5) {
                    let u5 = new SysInfoMenuItem(this, {
                        title: '内存',
                        subtitle: `总计 ${this.getTotalMemoryDisplay()} · 点击查看详情`,
                        onTap: () => {
                            router.pushUrl({ url: 'pages/MemoryPage' });
                        }
                    }, undefined, s5, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 183, col: 9 });
                    ViewPU.create(u5);
                    let v5 = () => {
                        return {
                            title: '内存',
                            subtitle: `总计 ${this.getTotalMemoryDisplay()} · 点击查看详情`,
                            onTap: () => {
                                router.pushUrl({ url: 'pages/MemoryPage' });
                            }
                        };
                    };
                    u5.paramsGenerator_ = v5;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(s5, {
                        title: '内存',
                        subtitle: `总计 ${this.getTotalMemoryDisplay()} · 点击查看详情`
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((o5, p5) => {
                if (p5) {
                    let q5 = new SysInfoMenuItem(this, {
                        title: '存储',
                        subtitle: `总计 ${this.getStorageDisplay()} · 点击查看详情`,
                        onTap: () => {
                            router.pushUrl({ url: 'pages/StoragePage' });
                        }
                    }, undefined, o5, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 191, col: 9 });
                    ViewPU.create(q5);
                    let r5 = () => {
                        return {
                            title: '存储',
                            subtitle: `总计 ${this.getStorageDisplay()} · 点击查看详情`,
                            onTap: () => {
                                router.pushUrl({ url: 'pages/StoragePage' });
                            }
                        };
                    };
                    q5.paramsGenerator_ = r5;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(o5, {
                        title: '存储',
                        subtitle: `总计 ${this.getStorageDisplay()} · 点击查看详情`
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((k5, l5) => {
                if (l5) {
                    let m5 = new SysInfoMenuItem(this, {
                        title: '屏幕',
                        subtitle: this.displayInfo ? `${this.displayInfo.width} × ${this.displayInfo.height} · ${this.displayInfo.refreshRate}Hz` : '--',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/DisplayPage' });
                        }
                    }, undefined, k5, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 199, col: 9 });
                    ViewPU.create(m5);
                    let n5 = () => {
                        return {
                            title: '屏幕',
                            subtitle: this.displayInfo ? `${this.displayInfo.width} × ${this.displayInfo.height} · ${this.displayInfo.refreshRate}Hz` : '--',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/DisplayPage' });
                            }
                        };
                    };
                    m5.paramsGenerator_ = n5;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(k5, {
                        title: '屏幕',
                        subtitle: this.displayInfo ? `${this.displayInfo.width} × ${this.displayInfo.height} · ${this.displayInfo.refreshRate}Hz` : '--'
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((g5, h5) => {
                if (h5) {
                    let i5 = new SysInfoMenuItem(this, {
                        title: '电池',
                        subtitle: `${this.getBatteryDisplay()} · 点击查看详情`,
                        onTap: () => {
                            router.pushUrl({ url: 'pages/BatteryPage' });
                        }
                    }, undefined, g5, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 207, col: 9 });
                    ViewPU.create(i5);
                    let j5 = () => {
                        return {
                            title: '电池',
                            subtitle: `${this.getBatteryDisplay()} · 点击查看详情`,
                            onTap: () => {
                                router.pushUrl({ url: 'pages/BatteryPage' });
                            }
                        };
                    };
                    i5.paramsGenerator_ = j5;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(g5, {
                        title: '电池',
                        subtitle: `${this.getBatteryDisplay()} · 点击查看详情`
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((c5, d5) => {
                if (d5) {
                    let e5 = new SysInfoMenuItem(this, {
                        title: 'GPU',
                        subtitle: '点击查看详情',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/GpuPage' });
                        }
                    }, undefined, c5, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 215, col: 9 });
                    ViewPU.create(e5);
                    let f5 = () => {
                        return {
                            title: 'GPU',
                            subtitle: '点击查看详情',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/GpuPage' });
                            }
                        };
                    };
                    e5.paramsGenerator_ = f5;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(c5, {
                        title: 'GPU',
                        subtitle: '点击查看详情'
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((y4, z4) => {
                if (z4) {
                    let a5 = new SectionHeader(this, { title: '连接与传感器' }, undefined, y4, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 224, col: 9 });
                    ViewPU.create(a5);
                    let b5 = () => {
                        return {
                            title: '连接与传感器'
                        };
                    };
                    a5.paramsGenerator_ = b5;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(y4, {
                        title: '连接与传感器'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((u4, v4) => {
                if (v4) {
                    let w4 = new SysInfoMenuItem(this, {
                        title: '网络',
                        subtitle: '点击查看详情',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/NetworkPage' });
                        }
                    }, undefined, u4, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 226, col: 9 });
                    ViewPU.create(w4);
                    let x4 = () => {
                        return {
                            title: '网络',
                            subtitle: '点击查看详情',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/NetworkPage' });
                            }
                        };
                    };
                    w4.paramsGenerator_ = x4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(u4, {
                        title: '网络',
                        subtitle: '点击查看详情'
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((q4, r4) => {
                if (r4) {
                    let s4 = new SysInfoMenuItem(this, {
                        title: '摄像头',
                        subtitle: '点击查看详情',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/CameraPage' });
                        }
                    }, undefined, q4, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 234, col: 9 });
                    ViewPU.create(s4);
                    let t4 = () => {
                        return {
                            title: '摄像头',
                            subtitle: '点击查看详情',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/CameraPage' });
                            }
                        };
                    };
                    s4.paramsGenerator_ = t4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(q4, {
                        title: '摄像头',
                        subtitle: '点击查看详情'
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((m4, n4) => {
                if (n4) {
                    let o4 = new SysInfoMenuItem(this, {
                        title: '传感器',
                        subtitle: '点击查看详情',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/SensorPage' });
                        }
                    }, undefined, m4, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 242, col: 9 });
                    ViewPU.create(o4);
                    let p4 = () => {
                        return {
                            title: '传感器',
                            subtitle: '点击查看详情',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/SensorPage' });
                            }
                        };
                    };
                    o4.paramsGenerator_ = p4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(m4, {
                        title: '传感器',
                        subtitle: '点击查看详情'
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((i4, j4) => {
                if (j4) {
                    let k4 = new SectionHeader(this, { title: '其他' }, undefined, i4, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 251, col: 9 });
                    ViewPU.create(k4);
                    let l4 = () => {
                        return {
                            title: '其他'
                        };
                    };
                    k4.paramsGenerator_ = l4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(i4, {
                        title: '其他'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((e4, f4) => {
                if (f4) {
                    let g4 = new SysInfoMenuItem(this, {
                        title: '系统信息测试',
                        subtitle: '运行完整 API 测试',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/TestPage' });
                        }
                    }, undefined, e4, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 253, col: 9 });
                    ViewPU.create(g4);
                    let h4 = () => {
                        return {
                            title: '系统信息测试',
                            subtitle: '运行完整 API 测试',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/TestPage' });
                            }
                        };
                    };
                    g4.paramsGenerator_ = h4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(e4, {
                        title: '系统信息测试',
                        subtitle: '运行完整 API 测试'
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
        {
            this.observeComponentCreation2((a4, b4) => {
                if (b4) {
                    let c4 = new SysInfoMenuItem(this, {
                        title: '关于',
                        subtitle: 'SysInfo v1.0.0',
                        onTap: () => {
                            router.pushUrl({ url: 'pages/AboutPage' });
                        }
                    }, undefined, a4, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 261, col: 9 });
                    ViewPU.create(c4);
                    let d4 = () => {
                        return {
                            title: '关于',
                            subtitle: 'SysInfo v1.0.0',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/AboutPage' });
                            }
                        };
                    };
                    c4.paramsGenerator_ = d4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(a4, {
                        title: '关于',
                        subtitle: 'SysInfo v1.0.0'
                    });
                }
            }, { name: "SysInfoMenuItem" });
        }
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
