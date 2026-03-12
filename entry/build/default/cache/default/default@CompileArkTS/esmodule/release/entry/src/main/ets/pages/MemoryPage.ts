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
import { InfoHeader, InfoCardWithDesc } from "@bundle:com.huawei.sysinfo/entry/ets/components/InfoButton";
import { nativeApi } from "@bundle:com.huawei.sysinfo/entry/ets/utils/NativeApi";
import type { SystemMemInfo, AppMemInfo, MemoryLimit } from "@bundle:com.huawei.sysinfo/entry/ets/utils/NativeApi";
import hilog from "@ohos:hilog";
import { NavigationBarWithArrow } from "@bundle:com.huawei.sysinfo/entry/ets/components/NavigationBar";
const TAG = 'MemoryPage';
const REFRESH_INTERVAL = 200;
class MemoryPage extends ViewPU {
    constructor(d27, e27, f27, g27 = -1, h27 = undefined, i27) {
        super(d27, f27, g27, i27);
        if (typeof h27 === "function") {
            this.paramsGenerator_ = h27;
        }
        this.__systemMemInfo = new ObservedPropertyObjectPU(null, this, "systemMemInfo");
        this.__appMemInfo = new ObservedPropertyObjectPU(null, this, "appMemInfo");
        this.__memoryLimit = new ObservedPropertyObjectPU(null, this, "memoryLimit");
        this.__isNativeAvailable = new ObservedPropertySimplePU(false, this, "isNativeAvailable");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.refreshTimer = null;
        this.setInitiallyProvidedValue(e27);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(c27: MemoryPage_Params) {
        if (c27.systemMemInfo !== undefined) {
            this.systemMemInfo = c27.systemMemInfo;
        }
        if (c27.appMemInfo !== undefined) {
            this.appMemInfo = c27.appMemInfo;
        }
        if (c27.memoryLimit !== undefined) {
            this.memoryLimit = c27.memoryLimit;
        }
        if (c27.isNativeAvailable !== undefined) {
            this.isNativeAvailable = c27.isNativeAvailable;
        }
        if (c27.isLoading !== undefined) {
            this.isLoading = c27.isLoading;
        }
        if (c27.refreshTimer !== undefined) {
            this.refreshTimer = c27.refreshTimer;
        }
    }
    updateStateVars(b27: MemoryPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(a27) {
        this.__systemMemInfo.purgeDependencyOnElmtId(a27);
        this.__appMemInfo.purgeDependencyOnElmtId(a27);
        this.__memoryLimit.purgeDependencyOnElmtId(a27);
        this.__isNativeAvailable.purgeDependencyOnElmtId(a27);
        this.__isLoading.purgeDependencyOnElmtId(a27);
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
    set systemMemInfo(z26: SystemMemInfo | null) {
        this.__systemMemInfo.set(z26);
    }
    private __appMemInfo: ObservedPropertyObjectPU<AppMemInfo | null>;
    get appMemInfo() {
        return this.__appMemInfo.get();
    }
    set appMemInfo(y26: AppMemInfo | null) {
        this.__appMemInfo.set(y26);
    }
    private __memoryLimit: ObservedPropertyObjectPU<MemoryLimit | null>;
    get memoryLimit() {
        return this.__memoryLimit.get();
    }
    set memoryLimit(x26: MemoryLimit | null) {
        this.__memoryLimit.set(x26);
    }
    private __isNativeAvailable: ObservedPropertySimplePU<boolean>;
    get isNativeAvailable() {
        return this.__isNativeAvailable.get();
    }
    set isNativeAvailable(w26: boolean) {
        this.__isNativeAvailable.set(w26);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(v26: boolean) {
        this.__isLoading.set(v26);
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
            const u26 = this.systemMemInfo.total - this.systemMemInfo.available;
            return FormatUtil.formatBytes(u26);
        }
        return '未获取';
    }
    getMemoryUsagePercent(): number {
        if (this.systemMemInfo?.success && this.systemMemInfo.total > 0 && this.systemMemInfo.available > 0) {
            const t26 = this.systemMemInfo.total - this.systemMemInfo.available;
            return Math.round((t26 / this.systemMemInfo.total) * 100);
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
        if (this.memoryLimit?.success) {
            if (this.memoryLimit.rssLimit === -1) {
                return '无限制';
            }
            if (this.memoryLimit.rssLimit > 0) {
                return FormatUtil.formatBytes(this.memoryLimit.rssLimit);
            }
        }
        return '未获取';
    }
    navigateToConcept(s26: string): void {
        router.pushUrl({
            url: 'pages/ConceptDetailPage',
            params: { conceptId: s26 }
        });
    }
    initialRender() {
        this.observeComponentCreation2((q26, r26) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((m26, n26) => {
                if (n26) {
                    let o26 = new NavigationBarWithArrow(this, {
                        title: '内存',
                        onBack: () => {
                            router.back();
                        }
                    }, undefined, m26, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 126, col: 7 });
                    ViewPU.create(o26);
                    let p26 = () => {
                        return {
                            title: '内存',
                            onBack: () => {
                                router.back();
                            }
                        };
                    };
                    o26.paramsGenerator_ = p26;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(m26, {
                        title: '内存'
                    });
                }
            }, { name: "NavigationBarWithArrow" });
        }
        this.observeComponentCreation2((k26, l26) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((i26, j26) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((w22, x22) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((g26, h26) => {
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
                        this.observeComponentCreation2((c26, d26) => {
                            if (d26) {
                                let e26 = new InfoHeader(this, { title: '内存状态' }, undefined, c26, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 141, col: 13 });
                                ViewPU.create(e26);
                                let f26 = () => {
                                    return {
                                        title: '内存状态'
                                    };
                                };
                                e26.paramsGenerator_ = f26;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(c26, {
                                    title: '内存状态'
                                });
                            }
                        }, { name: "InfoHeader" });
                    }
                    this.observeComponentCreation2((a26, b26) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(24);
                        Column.borderRadius(12);
                        Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((y25, z25) => {
                        Text.create('Native API 不可用');
                        Text.fontSize(18);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin(24);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((w25, x25) => {
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
                        this.observeComponentCreation2((s25, t25) => {
                            if (t25) {
                                let u25 = new InfoHeader(this, {
                                    title: '系统内存',
                                    subtitle: '显示设备总内存和使用情况'
                                }, undefined, s25, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 160, col: 13 });
                                ViewPU.create(u25);
                                let v25 = () => {
                                    return {
                                        title: '系统内存',
                                        subtitle: '显示设备总内存和使用情况'
                                    };
                                };
                                u25.paramsGenerator_ = v25;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(s25, {
                                    title: '系统内存',
                                    subtitle: '显示设备总内存和使用情况'
                                });
                            }
                        }, { name: "InfoHeader" });
                    }
                    this.observeComponentCreation2((q25, r25) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(24);
                        Column.borderRadius(12);
                        Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((o25, p25) => {
                        Text.create(this.getTotalMemory());
                        Text.fontSize(48);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((m25, n25) => {
                        Text.create('总内存');
                        Text.fontSize(14);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin({ top: 8 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    this.observeComponentCreation2((e25, f25) => {
                        If.create();
                        if (this.getMemoryUsagePercent() > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((k25, l25) => {
                                    __Common__.create();
                                    __Common__.margin({ top: 16 });
                                }, __Common__);
                                {
                                    this.observeComponentCreation2((g25, h25) => {
                                        if (h25) {
                                            let i25 = new InfoCard(this, {
                                                title: '内存使用率',
                                                value: `${this.getMemoryUsagePercent()}%`
                                            }, undefined, g25, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 183, col: 15 });
                                            ViewPU.create(i25);
                                            let j25 = () => {
                                                return {
                                                    title: '内存使用率',
                                                    value: `${this.getMemoryUsagePercent()}%`
                                                };
                                            };
                                            i25.paramsGenerator_ = j25;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(g25, {
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
                        this.observeComponentCreation2((a25, b25) => {
                            if (b25) {
                                let c25 = new InfoCard(this, {
                                    title: '可用内存',
                                    value: this.getAvailableMemory()
                                }, undefined, a25, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 190, col: 13 });
                                ViewPU.create(c25);
                                let d25 = () => {
                                    return {
                                        title: '可用内存',
                                        value: this.getAvailableMemory()
                                    };
                                };
                                c25.paramsGenerator_ = d25;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(a25, {
                                    title: '可用内存',
                                    value: this.getAvailableMemory()
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((w24, x24) => {
                            if (x24) {
                                let y24 = new InfoCard(this, {
                                    title: '已用内存',
                                    value: this.getUsedMemory()
                                }, undefined, w24, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 195, col: 13 });
                                ViewPU.create(y24);
                                let z24 = () => {
                                    return {
                                        title: '已用内存',
                                        value: this.getUsedMemory()
                                    };
                                };
                                y24.paramsGenerator_ = z24;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(w24, {
                                    title: '已用内存',
                                    value: this.getUsedMemory()
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((s24, t24) => {
                            if (t24) {
                                let u24 = new InfoHeader(this, {
                                    title: '应用内存',
                                    subtitle: 'PSS、RSS、VSS 内存指标',
                                    conceptId: 'memory_pss',
                                    onInfoClick: () => this.navigateToConcept('memory_pss')
                                }, undefined, s24, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 201, col: 13 });
                                ViewPU.create(u24);
                                let v24 = () => {
                                    return {
                                        title: '应用内存',
                                        subtitle: 'PSS、RSS、VSS 内存指标',
                                        conceptId: 'memory_pss',
                                        onInfoClick: () => this.navigateToConcept('memory_pss')
                                    };
                                };
                                u24.paramsGenerator_ = v24;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(s24, {
                                    title: '应用内存',
                                    subtitle: 'PSS、RSS、VSS 内存指标',
                                    conceptId: 'memory_pss'
                                });
                            }
                        }, { name: "InfoHeader" });
                    }
                    this.observeComponentCreation2((k24, l24) => {
                        If.create();
                        if (this.appMemInfo?.success) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((q24, r24) => {
                                    Column.create();
                                    Column.width('100%');
                                    Column.padding(20);
                                    Column.borderRadius(12);
                                    Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                    Column.alignItems(HorizontalAlign.Center);
                                    Column.margin({ bottom: 12 });
                                }, Column);
                                this.observeComponentCreation2((o24, p24) => {
                                    Text.create(this.getAppPss());
                                    Text.fontSize(36);
                                    Text.fontWeight(FontWeight.Bold);
                                    Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((m24, n24) => {
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
                        this.observeComponentCreation2((g24, h24) => {
                            if (h24) {
                                let i24 = new InfoCardWithDesc(this, {
                                    title: 'RSS (驻留内存)',
                                    value: this.getAppRss(),
                                    conceptId: 'memory_rss',
                                    onInfoClick: () => this.navigateToConcept('memory_rss')
                                }, undefined, g24, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 228, col: 13 });
                                ViewPU.create(i24);
                                let j24 = () => {
                                    return {
                                        title: 'RSS (驻留内存)',
                                        value: this.getAppRss(),
                                        conceptId: 'memory_rss',
                                        onInfoClick: () => this.navigateToConcept('memory_rss')
                                    };
                                };
                                i24.paramsGenerator_ = j24;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(g24, {
                                    title: 'RSS (驻留内存)',
                                    value: this.getAppRss(),
                                    conceptId: 'memory_rss'
                                });
                            }
                        }, { name: "InfoCardWithDesc" });
                    }
                    {
                        this.observeComponentCreation2((c24, d24) => {
                            if (d24) {
                                let e24 = new InfoCardWithDesc(this, {
                                    title: 'VSS (虚拟内存)',
                                    value: this.getAppVss(),
                                    conceptId: 'memory_vss',
                                    onInfoClick: () => this.navigateToConcept('memory_vss')
                                }, undefined, c24, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 235, col: 13 });
                                ViewPU.create(e24);
                                let f24 = () => {
                                    return {
                                        title: 'VSS (虚拟内存)',
                                        value: this.getAppVss(),
                                        conceptId: 'memory_vss',
                                        onInfoClick: () => this.navigateToConcept('memory_vss')
                                    };
                                };
                                e24.paramsGenerator_ = f24;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(c24, {
                                    title: 'VSS (虚拟内存)',
                                    value: this.getAppVss(),
                                    conceptId: 'memory_vss'
                                });
                            }
                        }, { name: "InfoCardWithDesc" });
                    }
                    this.observeComponentCreation2((g23, h23) => {
                        If.create();
                        if (this.appMemInfo?.success) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((y23, z23) => {
                                        if (z23) {
                                            let a24 = new InfoHeader(this, {
                                                title: '内存分类',
                                                subtitle: 'Shared/Private Clean/Dirty',
                                                conceptId: 'memory_shared',
                                                onInfoClick: () => this.navigateToConcept('memory_shared')
                                            }, undefined, y23, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 244, col: 15 });
                                            ViewPU.create(a24);
                                            let b24 = () => {
                                                return {
                                                    title: '内存分类',
                                                    subtitle: 'Shared/Private Clean/Dirty',
                                                    conceptId: 'memory_shared',
                                                    onInfoClick: () => this.navigateToConcept('memory_shared')
                                                };
                                            };
                                            a24.paramsGenerator_ = b24;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(y23, {
                                                title: '内存分类',
                                                subtitle: 'Shared/Private Clean/Dirty',
                                                conceptId: 'memory_shared'
                                            });
                                        }
                                    }, { name: "InfoHeader" });
                                }
                                {
                                    this.observeComponentCreation2((u23, v23) => {
                                        if (v23) {
                                            let w23 = new InfoCardWithDesc(this, {
                                                title: 'Shared Clean',
                                                value: FormatUtil.formatBytes(this.appMemInfo.sharedClean),
                                                conceptId: 'memory_shared',
                                                onInfoClick: () => this.navigateToConcept('memory_shared')
                                            }, undefined, u23, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 251, col: 15 });
                                            ViewPU.create(w23);
                                            let x23 = () => {
                                                return {
                                                    title: 'Shared Clean',
                                                    value: FormatUtil.formatBytes(this.appMemInfo.sharedClean),
                                                    conceptId: 'memory_shared',
                                                    onInfoClick: () => this.navigateToConcept('memory_shared')
                                                };
                                            };
                                            w23.paramsGenerator_ = x23;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(u23, {
                                                title: 'Shared Clean',
                                                value: FormatUtil.formatBytes(this.appMemInfo.sharedClean),
                                                conceptId: 'memory_shared'
                                            });
                                        }
                                    }, { name: "InfoCardWithDesc" });
                                }
                                {
                                    this.observeComponentCreation2((q23, r23) => {
                                        if (r23) {
                                            let s23 = new InfoCardWithDesc(this, {
                                                title: 'Shared Dirty',
                                                value: FormatUtil.formatBytes(this.appMemInfo.sharedDirty),
                                                conceptId: 'memory_shared',
                                                onInfoClick: () => this.navigateToConcept('memory_shared')
                                            }, undefined, q23, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 258, col: 15 });
                                            ViewPU.create(s23);
                                            let t23 = () => {
                                                return {
                                                    title: 'Shared Dirty',
                                                    value: FormatUtil.formatBytes(this.appMemInfo.sharedDirty),
                                                    conceptId: 'memory_shared',
                                                    onInfoClick: () => this.navigateToConcept('memory_shared')
                                                };
                                            };
                                            s23.paramsGenerator_ = t23;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(q23, {
                                                title: 'Shared Dirty',
                                                value: FormatUtil.formatBytes(this.appMemInfo.sharedDirty),
                                                conceptId: 'memory_shared'
                                            });
                                        }
                                    }, { name: "InfoCardWithDesc" });
                                }
                                {
                                    this.observeComponentCreation2((m23, n23) => {
                                        if (n23) {
                                            let o23 = new InfoCardWithDesc(this, {
                                                title: 'Private Clean',
                                                value: FormatUtil.formatBytes(this.appMemInfo.privateClean),
                                                conceptId: 'memory_shared',
                                                onInfoClick: () => this.navigateToConcept('memory_shared')
                                            }, undefined, m23, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 265, col: 15 });
                                            ViewPU.create(o23);
                                            let p23 = () => {
                                                return {
                                                    title: 'Private Clean',
                                                    value: FormatUtil.formatBytes(this.appMemInfo.privateClean),
                                                    conceptId: 'memory_shared',
                                                    onInfoClick: () => this.navigateToConcept('memory_shared')
                                                };
                                            };
                                            o23.paramsGenerator_ = p23;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(m23, {
                                                title: 'Private Clean',
                                                value: FormatUtil.formatBytes(this.appMemInfo.privateClean),
                                                conceptId: 'memory_shared'
                                            });
                                        }
                                    }, { name: "InfoCardWithDesc" });
                                }
                                {
                                    this.observeComponentCreation2((i23, j23) => {
                                        if (j23) {
                                            let k23 = new InfoCardWithDesc(this, {
                                                title: 'Private Dirty',
                                                value: FormatUtil.formatBytes(this.appMemInfo.privateDirty),
                                                conceptId: 'memory_shared',
                                                onInfoClick: () => this.navigateToConcept('memory_shared')
                                            }, undefined, i23, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 272, col: 15 });
                                            ViewPU.create(k23);
                                            let l23 = () => {
                                                return {
                                                    title: 'Private Dirty',
                                                    value: FormatUtil.formatBytes(this.appMemInfo.privateDirty),
                                                    conceptId: 'memory_shared',
                                                    onInfoClick: () => this.navigateToConcept('memory_shared')
                                                };
                                            };
                                            k23.paramsGenerator_ = l23;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(i23, {
                                                title: 'Private Dirty',
                                                value: FormatUtil.formatBytes(this.appMemInfo.privateDirty),
                                                conceptId: 'memory_shared'
                                            });
                                        }
                                    }, { name: "InfoCardWithDesc" });
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
                        this.observeComponentCreation2((c23, d23) => {
                            if (d23) {
                                let e23 = new InfoHeader(this, {
                                    title: '内存限制',
                                    subtitle: '系统为应用设置的内存上限',
                                    conceptId: 'memory_limit',
                                    onInfoClick: () => this.navigateToConcept('memory_limit')
                                }, undefined, c23, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 281, col: 13 });
                                ViewPU.create(e23);
                                let f23 = () => {
                                    return {
                                        title: '内存限制',
                                        subtitle: '系统为应用设置的内存上限',
                                        conceptId: 'memory_limit',
                                        onInfoClick: () => this.navigateToConcept('memory_limit')
                                    };
                                };
                                e23.paramsGenerator_ = f23;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(c23, {
                                    title: '内存限制',
                                    subtitle: '系统为应用设置的内存上限',
                                    conceptId: 'memory_limit'
                                });
                            }
                        }, { name: "InfoHeader" });
                    }
                    {
                        this.observeComponentCreation2((y22, z22) => {
                            if (z22) {
                                let a23 = new InfoCardWithDesc(this, {
                                    title: 'RSS 限制',
                                    value: this.getMemoryLimit(),
                                    conceptId: 'memory_limit',
                                    onInfoClick: () => this.navigateToConcept('memory_limit')
                                }, undefined, y22, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 288, col: 13 });
                                ViewPU.create(a23);
                                let b23 = () => {
                                    return {
                                        title: 'RSS 限制',
                                        value: this.getMemoryLimit(),
                                        conceptId: 'memory_limit',
                                        onInfoClick: () => this.navigateToConcept('memory_limit')
                                    };
                                };
                                a23.paramsGenerator_ = b23;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(y22, {
                                    title: 'RSS 限制',
                                    value: this.getMemoryLimit(),
                                    conceptId: 'memory_limit'
                                });
                            }
                        }, { name: "InfoCardWithDesc" });
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
