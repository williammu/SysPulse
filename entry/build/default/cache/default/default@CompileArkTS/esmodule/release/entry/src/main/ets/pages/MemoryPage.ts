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
    constructor(f20, g20, h20, i20 = -1, j20 = undefined, k20) {
        super(f20, h20, i20, k20);
        if (typeof j20 === "function") {
            this.paramsGenerator_ = j20;
        }
        this.__systemMemInfo = new ObservedPropertyObjectPU(null, this, "systemMemInfo");
        this.__appMemInfo = new ObservedPropertyObjectPU(null, this, "appMemInfo");
        this.__memoryLimit = new ObservedPropertyObjectPU(null, this, "memoryLimit");
        this.__isNativeAvailable = new ObservedPropertySimplePU(false, this, "isNativeAvailable");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.refreshTimer = null;
        this.setInitiallyProvidedValue(g20);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(e20: MemoryPage_Params) {
        if (e20.systemMemInfo !== undefined) {
            this.systemMemInfo = e20.systemMemInfo;
        }
        if (e20.appMemInfo !== undefined) {
            this.appMemInfo = e20.appMemInfo;
        }
        if (e20.memoryLimit !== undefined) {
            this.memoryLimit = e20.memoryLimit;
        }
        if (e20.isNativeAvailable !== undefined) {
            this.isNativeAvailable = e20.isNativeAvailable;
        }
        if (e20.isLoading !== undefined) {
            this.isLoading = e20.isLoading;
        }
        if (e20.refreshTimer !== undefined) {
            this.refreshTimer = e20.refreshTimer;
        }
    }
    updateStateVars(d20: MemoryPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(c20) {
        this.__systemMemInfo.purgeDependencyOnElmtId(c20);
        this.__appMemInfo.purgeDependencyOnElmtId(c20);
        this.__memoryLimit.purgeDependencyOnElmtId(c20);
        this.__isNativeAvailable.purgeDependencyOnElmtId(c20);
        this.__isLoading.purgeDependencyOnElmtId(c20);
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
    set systemMemInfo(b20: SystemMemInfo | null) {
        this.__systemMemInfo.set(b20);
    }
    private __appMemInfo: ObservedPropertyObjectPU<AppMemInfo | null>;
    get appMemInfo() {
        return this.__appMemInfo.get();
    }
    set appMemInfo(a20: AppMemInfo | null) {
        this.__appMemInfo.set(a20);
    }
    private __memoryLimit: ObservedPropertyObjectPU<MemoryLimit | null>;
    get memoryLimit() {
        return this.__memoryLimit.get();
    }
    set memoryLimit(z19: MemoryLimit | null) {
        this.__memoryLimit.set(z19);
    }
    private __isNativeAvailable: ObservedPropertySimplePU<boolean>;
    get isNativeAvailable() {
        return this.__isNativeAvailable.get();
    }
    set isNativeAvailable(y19: boolean) {
        this.__isNativeAvailable.set(y19);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(x19: boolean) {
        this.__isLoading.set(x19);
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
            const w19 = this.systemMemInfo.total - this.systemMemInfo.available;
            return FormatUtil.formatBytes(w19);
        }
        return '未获取';
    }
    getMemoryUsagePercent(): number {
        if (this.systemMemInfo?.success && this.systemMemInfo.total > 0 && this.systemMemInfo.available > 0) {
            const v19 = this.systemMemInfo.total - this.systemMemInfo.available;
            return Math.round((v19 / this.systemMemInfo.total) * 100);
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
    DataDescription(r19: string, s19 = null) {
        this.observeComponentCreation2((t19, u19) => {
            Text.create(r19);
            Text.fontSize(12);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 4, bottom: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
    }
    initialRender() {
        this.observeComponentCreation2((p19, q19) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((n19, o19) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((l19, m19) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((j19, k19) => {
            Text.create('内存');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((h19, i19) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((f19, g19) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((t15, u15) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((d19, e19) => {
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
                        this.observeComponentCreation2((z18, a19) => {
                            if (a19) {
                                let b19 = new SectionHeader(this, { title: '内存状态' }, undefined, z18, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 146, col: 13 });
                                ViewPU.create(b19);
                                let c19 = () => {
                                    return {
                                        title: '内存状态'
                                    };
                                };
                                b19.paramsGenerator_ = c19;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(z18, {
                                    title: '内存状态'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.observeComponentCreation2((x18, y18) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(24);
                        Column.borderRadius(12);
                        Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((v18, w18) => {
                        Text.create('Native API 不可用');
                        Text.fontSize(18);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin(24);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((t18, u18) => {
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
                        this.observeComponentCreation2((p18, q18) => {
                            if (q18) {
                                let r18 = new SectionHeader(this, { title: '系统内存' }, undefined, p18, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 165, col: 13 });
                                ViewPU.create(r18);
                                let s18 = () => {
                                    return {
                                        title: '系统内存'
                                    };
                                };
                                r18.paramsGenerator_ = s18;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(p18, {
                                    title: '系统内存'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('显示设备总内存和使用情况。总内存是设备物理内存的总量，可用内存是当前可分配给应用程序的内存。');
                    this.observeComponentCreation2((n18, o18) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(24);
                        Column.borderRadius(12);
                        Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((l18, m18) => {
                        Text.create(this.getTotalMemory());
                        Text.fontSize(48);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((j18, k18) => {
                        Text.create('总内存');
                        Text.fontSize(14);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin({ top: 8 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    this.observeComponentCreation2((b18, c18) => {
                        If.create();
                        if (this.getMemoryUsagePercent() > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((h18, i18) => {
                                    __Common__.create();
                                    __Common__.margin({ top: 16 });
                                }, __Common__);
                                {
                                    this.observeComponentCreation2((d18, e18) => {
                                        if (e18) {
                                            let f18 = new InfoCard(this, {
                                                title: '内存使用率',
                                                value: `${this.getMemoryUsagePercent()}%`
                                            }, undefined, d18, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 186, col: 15 });
                                            ViewPU.create(f18);
                                            let g18 = () => {
                                                return {
                                                    title: '内存使用率',
                                                    value: `${this.getMemoryUsagePercent()}%`
                                                };
                                            };
                                            f18.paramsGenerator_ = g18;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(d18, {
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
                        this.observeComponentCreation2((x17, y17) => {
                            if (y17) {
                                let z17 = new InfoCard(this, {
                                    title: '可用内存',
                                    value: this.getAvailableMemory()
                                }, undefined, x17, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 193, col: 13 });
                                ViewPU.create(z17);
                                let a18 = () => {
                                    return {
                                        title: '可用内存',
                                        value: this.getAvailableMemory()
                                    };
                                };
                                z17.paramsGenerator_ = a18;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(x17, {
                                    title: '可用内存',
                                    value: this.getAvailableMemory()
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((t17, u17) => {
                            if (u17) {
                                let v17 = new InfoCard(this, {
                                    title: '已用内存',
                                    value: this.getUsedMemory()
                                }, undefined, t17, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 198, col: 13 });
                                ViewPU.create(v17);
                                let w17 = () => {
                                    return {
                                        title: '已用内存',
                                        value: this.getUsedMemory()
                                    };
                                };
                                v17.paramsGenerator_ = w17;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(t17, {
                                    title: '已用内存',
                                    value: this.getUsedMemory()
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((p17, q17) => {
                            if (q17) {
                                let r17 = new SectionHeader(this, { title: '应用内存' }, undefined, p17, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 204, col: 13 });
                                ViewPU.create(r17);
                                let s17 = () => {
                                    return {
                                        title: '应用内存'
                                    };
                                };
                                r17.paramsGenerator_ = s17;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(p17, {
                                    title: '应用内存'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('PSS：实际使用的物理内存。RSS：驻留内存大小。VSS：虚拟内存大小。');
                    this.observeComponentCreation2((h17, i17) => {
                        If.create();
                        if (this.appMemInfo?.success) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((n17, o17) => {
                                    Column.create();
                                    Column.width('100%');
                                    Column.padding(20);
                                    Column.borderRadius(12);
                                    Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                    Column.alignItems(HorizontalAlign.Center);
                                    Column.margin({ bottom: 12 });
                                }, Column);
                                this.observeComponentCreation2((l17, m17) => {
                                    Text.create(this.getAppPss());
                                    Text.fontSize(36);
                                    Text.fontWeight(FontWeight.Bold);
                                    Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((j17, k17) => {
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
                        this.observeComponentCreation2((d17, e17) => {
                            if (e17) {
                                let f17 = new InfoCard(this, {
                                    title: 'RSS (驻留内存)',
                                    value: this.getAppRss()
                                }, undefined, d17, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 227, col: 13 });
                                ViewPU.create(f17);
                                let g17 = () => {
                                    return {
                                        title: 'RSS (驻留内存)',
                                        value: this.getAppRss()
                                    };
                                };
                                f17.paramsGenerator_ = g17;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(d17, {
                                    title: 'RSS (驻留内存)',
                                    value: this.getAppRss()
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((z16, a17) => {
                            if (a17) {
                                let b17 = new InfoCard(this, {
                                    title: 'VSS (虚拟内存)',
                                    value: this.getAppVss()
                                }, undefined, z16, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 232, col: 13 });
                                ViewPU.create(b17);
                                let c17 = () => {
                                    return {
                                        title: 'VSS (虚拟内存)',
                                        value: this.getAppVss()
                                    };
                                };
                                b17.paramsGenerator_ = c17;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(z16, {
                                    title: 'VSS (虚拟内存)',
                                    value: this.getAppVss()
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    this.observeComponentCreation2((d16, e16) => {
                        If.create();
                        if (this.appMemInfo?.success) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((v16, w16) => {
                                        if (w16) {
                                            let x16 = new SectionHeader(this, { title: '内存分类' }, undefined, v16, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 239, col: 15 });
                                            ViewPU.create(x16);
                                            let y16 = () => {
                                                return {
                                                    title: '内存分类'
                                                };
                                            };
                                            x16.paramsGenerator_ = y16;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(v16, {
                                                title: '内存分类'
                                            });
                                        }
                                    }, { name: "SectionHeader" });
                                }
                                this.DataDescription.bind(this)('Shared：与其他进程共享的内存。Private：进程独占的内存。Clean：未修改的内存页。Dirty：已修改的内存页。');
                                {
                                    this.observeComponentCreation2((r16, s16) => {
                                        if (s16) {
                                            let t16 = new InfoCard(this, {
                                                title: 'Shared Clean',
                                                value: FormatUtil.formatBytes(this.appMemInfo.sharedClean)
                                            }, undefined, r16, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 242, col: 15 });
                                            ViewPU.create(t16);
                                            let u16 = () => {
                                                return {
                                                    title: 'Shared Clean',
                                                    value: FormatUtil.formatBytes(this.appMemInfo.sharedClean)
                                                };
                                            };
                                            t16.paramsGenerator_ = u16;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(r16, {
                                                title: 'Shared Clean',
                                                value: FormatUtil.formatBytes(this.appMemInfo.sharedClean)
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((n16, o16) => {
                                        if (o16) {
                                            let p16 = new InfoCard(this, {
                                                title: 'Shared Dirty',
                                                value: FormatUtil.formatBytes(this.appMemInfo.sharedDirty)
                                            }, undefined, n16, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 247, col: 15 });
                                            ViewPU.create(p16);
                                            let q16 = () => {
                                                return {
                                                    title: 'Shared Dirty',
                                                    value: FormatUtil.formatBytes(this.appMemInfo.sharedDirty)
                                                };
                                            };
                                            p16.paramsGenerator_ = q16;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(n16, {
                                                title: 'Shared Dirty',
                                                value: FormatUtil.formatBytes(this.appMemInfo.sharedDirty)
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((j16, k16) => {
                                        if (k16) {
                                            let l16 = new InfoCard(this, {
                                                title: 'Private Clean',
                                                value: FormatUtil.formatBytes(this.appMemInfo.privateClean)
                                            }, undefined, j16, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 252, col: 15 });
                                            ViewPU.create(l16);
                                            let m16 = () => {
                                                return {
                                                    title: 'Private Clean',
                                                    value: FormatUtil.formatBytes(this.appMemInfo.privateClean)
                                                };
                                            };
                                            l16.paramsGenerator_ = m16;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(j16, {
                                                title: 'Private Clean',
                                                value: FormatUtil.formatBytes(this.appMemInfo.privateClean)
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((f16, g16) => {
                                        if (g16) {
                                            let h16 = new InfoCard(this, {
                                                title: 'Private Dirty',
                                                value: FormatUtil.formatBytes(this.appMemInfo.privateDirty)
                                            }, undefined, f16, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 257, col: 15 });
                                            ViewPU.create(h16);
                                            let i16 = () => {
                                                return {
                                                    title: 'Private Dirty',
                                                    value: FormatUtil.formatBytes(this.appMemInfo.privateDirty)
                                                };
                                            };
                                            h16.paramsGenerator_ = i16;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(f16, {
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
                        this.observeComponentCreation2((z15, a16) => {
                            if (a16) {
                                let b16 = new SectionHeader(this, { title: '内存限制' }, undefined, z15, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 264, col: 13 });
                                ViewPU.create(b16);
                                let c16 = () => {
                                    return {
                                        title: '内存限制'
                                    };
                                };
                                b16.paramsGenerator_ = c16;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(z15, {
                                    title: '内存限制'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('系统为每个进程设置的内存使用上限。当应用内存超过限制时，系统可能会触发内存警告或终止应用。');
                    {
                        this.observeComponentCreation2((v15, w15) => {
                            if (w15) {
                                let x15 = new InfoCard(this, {
                                    title: 'RSS 限制',
                                    value: this.getMemoryLimit()
                                }, undefined, v15, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 267, col: 13 });
                                ViewPU.create(x15);
                                let y15 = () => {
                                    return {
                                        title: 'RSS 限制',
                                        value: this.getMemoryLimit()
                                    };
                                };
                                x15.paramsGenerator_ = y15;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(v15, {
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
