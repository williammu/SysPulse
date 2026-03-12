if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MemoryPage_Params {
    systemMemInfo?: SystemMemInfo | null;
    appMemInfo?: AppMemInfo | null;
    memoryLimit?: MemoryLimit | null;
    isNativeAvailable?: boolean;
    isLoading?: boolean;
    refreshTimer?: number | null;
}
import router from "@ohos:router";
import { FormatUtil } from "@bundle:com.huawei.sysinfo/entry/ets/utils/FormatUtil";
import { InfoCard } from "@bundle:com.huawei.sysinfo/entry/ets/components/InfoCard";
import { SectionHeader } from "@bundle:com.huawei.sysinfo/entry/ets/components/SectionHeader";
import { nativeApi } from "@bundle:com.huawei.sysinfo/entry/ets/utils/NativeApi";
import type { SystemMemInfo, AppMemInfo, MemoryLimit } from "@bundle:com.huawei.sysinfo/entry/ets/utils/NativeApi";
import hilog from "@ohos:hilog";
const TAG = 'MemoryPage';
const REFRESH_INTERVAL = 200;
class MemoryPage extends ViewPU {
    constructor(e13, f13, g13, h13 = -1, i13 = undefined, j13) {
        super(e13, g13, h13, j13);
        if (typeof i13 === "function") {
            this.paramsGenerator_ = i13;
        }
        this.__systemMemInfo = new ObservedPropertyObjectPU(null, this, "systemMemInfo");
        this.__appMemInfo = new ObservedPropertyObjectPU(null, this, "appMemInfo");
        this.__memoryLimit = new ObservedPropertyObjectPU(null, this, "memoryLimit");
        this.__isNativeAvailable = new ObservedPropertySimplePU(false, this, "isNativeAvailable");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.refreshTimer = null;
        this.setInitiallyProvidedValue(f13);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(d13: MemoryPage_Params) {
        if (d13.systemMemInfo !== undefined) {
            this.systemMemInfo = d13.systemMemInfo;
        }
        if (d13.appMemInfo !== undefined) {
            this.appMemInfo = d13.appMemInfo;
        }
        if (d13.memoryLimit !== undefined) {
            this.memoryLimit = d13.memoryLimit;
        }
        if (d13.isNativeAvailable !== undefined) {
            this.isNativeAvailable = d13.isNativeAvailable;
        }
        if (d13.isLoading !== undefined) {
            this.isLoading = d13.isLoading;
        }
        if (d13.refreshTimer !== undefined) {
            this.refreshTimer = d13.refreshTimer;
        }
    }
    updateStateVars(c13: MemoryPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(b13) {
        this.__systemMemInfo.purgeDependencyOnElmtId(b13);
        this.__appMemInfo.purgeDependencyOnElmtId(b13);
        this.__memoryLimit.purgeDependencyOnElmtId(b13);
        this.__isNativeAvailable.purgeDependencyOnElmtId(b13);
        this.__isLoading.purgeDependencyOnElmtId(b13);
    }
    aboutToBeDeleted() {
        this.__systemMemInfo.aboutToBeDeleted();
        this.__appMemInfo.aboutToBeDeleted();
        this.__memoryLimit.aboutToBeDeleted();
        this.__isNativeAvailable.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __systemMemInfo: ObservedPropertyObjectPU<SystemMemInfo | null>;
    get systemMemInfo() {
        return this.__systemMemInfo.get();
    }
    set systemMemInfo(a13: SystemMemInfo | null) {
        this.__systemMemInfo.set(a13);
    }
    private __appMemInfo: ObservedPropertyObjectPU<AppMemInfo | null>;
    get appMemInfo() {
        return this.__appMemInfo.get();
    }
    set appMemInfo(z12: AppMemInfo | null) {
        this.__appMemInfo.set(z12);
    }
    private __memoryLimit: ObservedPropertyObjectPU<MemoryLimit | null>;
    get memoryLimit() {
        return this.__memoryLimit.get();
    }
    set memoryLimit(y12: MemoryLimit | null) {
        this.__memoryLimit.set(y12);
    }
    private __isNativeAvailable: ObservedPropertySimplePU<boolean>;
    get isNativeAvailable() {
        return this.__isNativeAvailable.get();
    }
    set isNativeAvailable(x12: boolean) {
        this.__isNativeAvailable.set(x12);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(w12: boolean) {
        this.__isLoading.set(w12);
    }
    private refreshTimer: number | null;
    aboutToAppear() {
        hilog.info(0x0000, TAG, 'MemoryPage aboutToAppear - START');
        this.isNativeAvailable = nativeApi.isNativeAvailable();
        hilog.info(0x0000, TAG, 'Native API available: %{public}s', String(this.isNativeAvailable));
        if (this.isNativeAvailable) {
            this.loadMemoryInfo();
            this.refreshTimer = setInterval(() => {
                this.loadMemoryInfo();
            }, REFRESH_INTERVAL);
        }
        setTimeout(() => {
            this.isLoading = false;
        }, 100);
        hilog.info(0x0000, TAG, 'MemoryPage aboutToAppear - END');
    }
    aboutToDisappear() {
        if (this.refreshTimer !== null) {
            clearInterval(this.refreshTimer);
            this.refreshTimer = null;
        }
    }
    loadMemoryInfo() {
        this.systemMemInfo = nativeApi.getSystemMemInfo();
        this.appMemInfo = nativeApi.getAppMemInfo();
        this.memoryLimit = nativeApi.getMemoryLimit();
    }
    getTotalMemory(): string {
        if (this.systemMemInfo?.success && this.systemMemInfo.total > 0) {
            return FormatUtil.formatBytes(this.systemMemInfo.total);
        }
        return '未获取';
    }
    getAvailableMemory(): string {
        if (this.systemMemInfo?.success && this.systemMemInfo.available > 0) {
            return FormatUtil.formatBytes(this.systemMemInfo.available);
        }
        return '未获取';
    }
    getUsedMemory(): string {
        if (this.systemMemInfo?.success && this.systemMemInfo.total > 0 && this.systemMemInfo.available > 0) {
            const v12 = this.systemMemInfo.total - this.systemMemInfo.available;
            return FormatUtil.formatBytes(v12);
        }
        return '未获取';
    }
    getMemoryUsagePercent(): number {
        if (this.systemMemInfo?.success && this.systemMemInfo.total > 0 && this.systemMemInfo.available > 0) {
            const u12 = this.systemMemInfo.total - this.systemMemInfo.available;
            return Math.round((u12 / this.systemMemInfo.total) * 100);
        }
        return 0;
    }
    getAppPss(): string {
        if (this.appMemInfo?.success && this.appMemInfo.pss > 0) {
            return FormatUtil.formatBytes(this.appMemInfo.pss);
        }
        return '未获取';
    }
    getAppRss(): string {
        if (this.appMemInfo?.success && this.appMemInfo.rss > 0) {
            return FormatUtil.formatBytes(this.appMemInfo.rss);
        }
        return '未获取';
    }
    getAppVss(): string {
        if (this.appMemInfo?.success && this.appMemInfo.vss > 0) {
            return FormatUtil.formatBytes(this.appMemInfo.vss);
        }
        return '未获取';
    }
    getMemoryLimit(): string {
        if (this.memoryLimit?.success && this.memoryLimit.rssLimit > 0) {
            return FormatUtil.formatBytes(this.memoryLimit.rssLimit);
        }
        return '未获取';
    }
    DataDescription(q12: string, r12 = null) {
        this.observeComponentCreation2((s12, t12) => {
            Text.create(q12);
            Text.fontSize(12);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 4, bottom: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
    }
    initialRender() {
        this.observeComponentCreation2((o12, p12) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F7F8FA');
        }, Column);
        this.observeComponentCreation2((m12, n12) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((k12, l12) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((i12, j12) => {
            Text.create('内存');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((g12, h12) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((e12, f12) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((s8, t8) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((c12, d12) => {
                        Text.create('加载中...');
                        Text.fontSize(16);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin(24);
                    }, Text);
                    Text.pop();
                });
            }
            else if (!this.isNativeAvailable) {
                this.ifElseBranchUpdateFunction(1, () => {
                    {
                        this.observeComponentCreation2((y11, z11) => {
                            if (z11) {
                                let a12 = new SectionHeader(this, { title: '内存状态' }, undefined, y11, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 145, col: 13 });
                                ViewPU.create(a12);
                                let b12 = () => {
                                    return {
                                        title: '内存状态'
                                    };
                                };
                                a12.paramsGenerator_ = b12;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(y11, {
                                    title: '内存状态'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.observeComponentCreation2((w11, x11) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(24);
                        Column.borderRadius(12);
                        Column.backgroundColor({ "id": 16777224, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((u11, v11) => {
                        Text.create('Native API 不可用');
                        Text.fontSize(18);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin(24);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((s11, t11) => {
                        Text.create('请确保 Native 模块已正确编译并打包');
                        Text.fontSize(14);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    {
                        this.observeComponentCreation2((o11, p11) => {
                            if (p11) {
                                let q11 = new SectionHeader(this, { title: '系统内存' }, undefined, o11, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 164, col: 13 });
                                ViewPU.create(q11);
                                let r11 = () => {
                                    return {
                                        title: '系统内存'
                                    };
                                };
                                q11.paramsGenerator_ = r11;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(o11, {
                                    title: '系统内存'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('显示设备总内存和使用情况。总内存是设备物理内存的总量，可用内存是当前可分配给应用程序的内存。');
                    this.observeComponentCreation2((m11, n11) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(24);
                        Column.borderRadius(12);
                        Column.backgroundColor({ "id": 16777224, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((k11, l11) => {
                        Text.create(this.getTotalMemory());
                        Text.fontSize(48);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((i11, j11) => {
                        Text.create('总内存');
                        Text.fontSize(14);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin({ top: 8 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    this.observeComponentCreation2((a11, b11) => {
                        If.create();
                        if (this.getMemoryUsagePercent() > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((g11, h11) => {
                                    __Common__.create();
                                    __Common__.margin({ top: 16 });
                                }, __Common__);
                                {
                                    this.observeComponentCreation2((c11, d11) => {
                                        if (d11) {
                                            let e11 = new InfoCard(this, {
                                                title: '内存使用率',
                                                value: `${this.getMemoryUsagePercent()}%`
                                            }, undefined, c11, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 185, col: 15 });
                                            ViewPU.create(e11);
                                            let f11 = () => {
                                                return {
                                                    title: '内存使用率',
                                                    value: `${this.getMemoryUsagePercent()}%`
                                                };
                                            };
                                            e11.paramsGenerator_ = f11;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(c11, {
                                                title: '内存使用率',
                                                value: `${this.getMemoryUsagePercent()}%`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                __Common__.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    {
                        this.observeComponentCreation2((w10, x10) => {
                            if (x10) {
                                let y10 = new InfoCard(this, {
                                    title: '可用内存',
                                    value: this.getAvailableMemory()
                                }, undefined, w10, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 192, col: 13 });
                                ViewPU.create(y10);
                                let z10 = () => {
                                    return {
                                        title: '可用内存',
                                        value: this.getAvailableMemory()
                                    };
                                };
                                y10.paramsGenerator_ = z10;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(w10, {
                                    title: '可用内存',
                                    value: this.getAvailableMemory()
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((s10, t10) => {
                            if (t10) {
                                let u10 = new InfoCard(this, {
                                    title: '已用内存',
                                    value: this.getUsedMemory()
                                }, undefined, s10, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 197, col: 13 });
                                ViewPU.create(u10);
                                let v10 = () => {
                                    return {
                                        title: '已用内存',
                                        value: this.getUsedMemory()
                                    };
                                };
                                u10.paramsGenerator_ = v10;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(s10, {
                                    title: '已用内存',
                                    value: this.getUsedMemory()
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((o10, p10) => {
                            if (p10) {
                                let q10 = new SectionHeader(this, { title: '应用内存' }, undefined, o10, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 203, col: 13 });
                                ViewPU.create(q10);
                                let r10 = () => {
                                    return {
                                        title: '应用内存'
                                    };
                                };
                                q10.paramsGenerator_ = r10;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(o10, {
                                    title: '应用内存'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('PSS：实际使用的物理内存。RSS：驻留内存大小。VSS：虚拟内存大小。');
                    this.observeComponentCreation2((g10, h10) => {
                        If.create();
                        if (this.appMemInfo?.success) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((m10, n10) => {
                                    Column.create();
                                    Column.width('100%');
                                    Column.padding(20);
                                    Column.borderRadius(12);
                                    Column.backgroundColor({ "id": 16777224, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                    Column.alignItems(HorizontalAlign.Center);
                                    Column.margin({ bottom: 12 });
                                }, Column);
                                this.observeComponentCreation2((k10, l10) => {
                                    Text.create(this.getAppPss());
                                    Text.fontSize(36);
                                    Text.fontWeight(FontWeight.Bold);
                                    Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((i10, j10) => {
                                    Text.create('PSS (实际使用内存)');
                                    Text.fontSize(14);
                                    Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                    Text.margin({ top: 8 });
                                }, Text);
                                Text.pop();
                                Column.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    {
                        this.observeComponentCreation2((c10, d10) => {
                            if (d10) {
                                let e10 = new InfoCard(this, {
                                    title: 'RSS (驻留内存)',
                                    value: this.getAppRss()
                                }, undefined, c10, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 226, col: 13 });
                                ViewPU.create(e10);
                                let f10 = () => {
                                    return {
                                        title: 'RSS (驻留内存)',
                                        value: this.getAppRss()
                                    };
                                };
                                e10.paramsGenerator_ = f10;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(c10, {
                                    title: 'RSS (驻留内存)',
                                    value: this.getAppRss()
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((y9, z9) => {
                            if (z9) {
                                let a10 = new InfoCard(this, {
                                    title: 'VSS (虚拟内存)',
                                    value: this.getAppVss()
                                }, undefined, y9, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 231, col: 13 });
                                ViewPU.create(a10);
                                let b10 = () => {
                                    return {
                                        title: 'VSS (虚拟内存)',
                                        value: this.getAppVss()
                                    };
                                };
                                a10.paramsGenerator_ = b10;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(y9, {
                                    title: 'VSS (虚拟内存)',
                                    value: this.getAppVss()
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    this.observeComponentCreation2((c9, d9) => {
                        If.create();
                        if (this.appMemInfo?.success) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((u9, v9) => {
                                        if (v9) {
                                            let w9 = new SectionHeader(this, { title: '内存分类' }, undefined, u9, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 238, col: 15 });
                                            ViewPU.create(w9);
                                            let x9 = () => {
                                                return {
                                                    title: '内存分类'
                                                };
                                            };
                                            w9.paramsGenerator_ = x9;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(u9, {
                                                title: '内存分类'
                                            });
                                        }
                                    }, { name: "SectionHeader" });
                                }
                                this.DataDescription.bind(this)('Shared：与其他进程共享的内存。Private：进程独占的内存。Clean：未修改的内存页。Dirty：已修改的内存页。');
                                {
                                    this.observeComponentCreation2((q9, r9) => {
                                        if (r9) {
                                            let s9 = new InfoCard(this, {
                                                title: 'Shared Clean',
                                                value: FormatUtil.formatBytes(this.appMemInfo.sharedClean)
                                            }, undefined, q9, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 241, col: 15 });
                                            ViewPU.create(s9);
                                            let t9 = () => {
                                                return {
                                                    title: 'Shared Clean',
                                                    value: FormatUtil.formatBytes(this.appMemInfo.sharedClean)
                                                };
                                            };
                                            s9.paramsGenerator_ = t9;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(q9, {
                                                title: 'Shared Clean',
                                                value: FormatUtil.formatBytes(this.appMemInfo.sharedClean)
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((m9, n9) => {
                                        if (n9) {
                                            let o9 = new InfoCard(this, {
                                                title: 'Shared Dirty',
                                                value: FormatUtil.formatBytes(this.appMemInfo.sharedDirty)
                                            }, undefined, m9, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 246, col: 15 });
                                            ViewPU.create(o9);
                                            let p9 = () => {
                                                return {
                                                    title: 'Shared Dirty',
                                                    value: FormatUtil.formatBytes(this.appMemInfo.sharedDirty)
                                                };
                                            };
                                            o9.paramsGenerator_ = p9;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(m9, {
                                                title: 'Shared Dirty',
                                                value: FormatUtil.formatBytes(this.appMemInfo.sharedDirty)
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((i9, j9) => {
                                        if (j9) {
                                            let k9 = new InfoCard(this, {
                                                title: 'Private Clean',
                                                value: FormatUtil.formatBytes(this.appMemInfo.privateClean)
                                            }, undefined, i9, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 251, col: 15 });
                                            ViewPU.create(k9);
                                            let l9 = () => {
                                                return {
                                                    title: 'Private Clean',
                                                    value: FormatUtil.formatBytes(this.appMemInfo.privateClean)
                                                };
                                            };
                                            k9.paramsGenerator_ = l9;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(i9, {
                                                title: 'Private Clean',
                                                value: FormatUtil.formatBytes(this.appMemInfo.privateClean)
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((e9, f9) => {
                                        if (f9) {
                                            let g9 = new InfoCard(this, {
                                                title: 'Private Dirty',
                                                value: FormatUtil.formatBytes(this.appMemInfo.privateDirty)
                                            }, undefined, e9, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 256, col: 15 });
                                            ViewPU.create(g9);
                                            let h9 = () => {
                                                return {
                                                    title: 'Private Dirty',
                                                    value: FormatUtil.formatBytes(this.appMemInfo.privateDirty)
                                                };
                                            };
                                            g9.paramsGenerator_ = h9;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(e9, {
                                                title: 'Private Dirty',
                                                value: FormatUtil.formatBytes(this.appMemInfo.privateDirty)
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    {
                        this.observeComponentCreation2((y8, z8) => {
                            if (z8) {
                                let a9 = new SectionHeader(this, { title: '内存限制' }, undefined, y8, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 263, col: 13 });
                                ViewPU.create(a9);
                                let b9 = () => {
                                    return {
                                        title: '内存限制'
                                    };
                                };
                                a9.paramsGenerator_ = b9;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(y8, {
                                    title: '内存限制'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('系统为每个进程设置的内存使用上限。当应用内存超过限制时，系统可能会触发内存警告或终止应用。');
                    {
                        this.observeComponentCreation2((u8, v8) => {
                            if (v8) {
                                let w8 = new InfoCard(this, {
                                    title: 'RSS 限制',
                                    value: this.getMemoryLimit()
                                }, undefined, u8, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 266, col: 13 });
                                ViewPU.create(w8);
                                let x8 = () => {
                                    return {
                                        title: 'RSS 限制',
                                        value: this.getMemoryLimit()
                                    };
                                };
                                w8.paramsGenerator_ = x8;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(u8, {
                                    title: 'RSS 限制',
                                    value: this.getMemoryLimit()
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "MemoryPage";
    }
}
registerNamedRoute(() => new MemoryPage(undefined, {}), "", { bundleName: "com.huawei.sysinfo", moduleName: "entry", pagePath: "pages/MemoryPage", pageFullPath: "entry/src/main/ets/pages/MemoryPage", integratedHsp: "false", moduleType: "followWithHap" });
