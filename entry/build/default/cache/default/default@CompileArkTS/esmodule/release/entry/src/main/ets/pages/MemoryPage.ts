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
const TAG = 'MemoryPage';
const REFRESH_INTERVAL = 200;
class MemoryPage extends ViewPU {
    constructor(j4, k4, l4, m4 = -1, n4 = undefined, o4) {
        super(j4, l4, m4, o4);
        if (typeof n4 === "function") {
            this.paramsGenerator_ = n4;
        }
        this.__systemMemInfo = new ObservedPropertyObjectPU(null, this, "systemMemInfo");
        this.__appMemInfo = new ObservedPropertyObjectPU(null, this, "appMemInfo");
        this.__memoryLimit = new ObservedPropertyObjectPU(null, this, "memoryLimit");
        this.__isNativeAvailable = new ObservedPropertySimplePU(false, this, "isNativeAvailable");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.refreshTimer = null;
        this.setInitiallyProvidedValue(k4);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(i4: MemoryPage_Params) {
        if (i4.systemMemInfo !== undefined) {
            this.systemMemInfo = i4.systemMemInfo;
        }
        if (i4.appMemInfo !== undefined) {
            this.appMemInfo = i4.appMemInfo;
        }
        if (i4.memoryLimit !== undefined) {
            this.memoryLimit = i4.memoryLimit;
        }
        if (i4.isNativeAvailable !== undefined) {
            this.isNativeAvailable = i4.isNativeAvailable;
        }
        if (i4.isLoading !== undefined) {
            this.isLoading = i4.isLoading;
        }
        if (i4.refreshTimer !== undefined) {
            this.refreshTimer = i4.refreshTimer;
        }
    }
    updateStateVars(h4: MemoryPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(g4) {
        this.__systemMemInfo.purgeDependencyOnElmtId(g4);
        this.__appMemInfo.purgeDependencyOnElmtId(g4);
        this.__memoryLimit.purgeDependencyOnElmtId(g4);
        this.__isNativeAvailable.purgeDependencyOnElmtId(g4);
        this.__isLoading.purgeDependencyOnElmtId(g4);
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
    set systemMemInfo(f4: SystemMemInfo | null) {
        this.__systemMemInfo.set(f4);
    }
    private __appMemInfo: ObservedPropertyObjectPU<AppMemInfo | null>;
    get appMemInfo() {
        return this.__appMemInfo.get();
    }
    set appMemInfo(e4: AppMemInfo | null) {
        this.__appMemInfo.set(e4);
    }
    private __memoryLimit: ObservedPropertyObjectPU<MemoryLimit | null>;
    get memoryLimit() {
        return this.__memoryLimit.get();
    }
    set memoryLimit(d4: MemoryLimit | null) {
        this.__memoryLimit.set(d4);
    }
    private __isNativeAvailable: ObservedPropertySimplePU<boolean>;
    get isNativeAvailable() {
        return this.__isNativeAvailable.get();
    }
    set isNativeAvailable(c4: boolean) {
        this.__isNativeAvailable.set(c4);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(b4: boolean) {
        this.__isLoading.set(b4);
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
            const a4 = this.systemMemInfo.total - this.systemMemInfo.available;
            return FormatUtil.formatBytes(a4);
        }
        return '未获取';
    }
    getMemoryUsagePercent(): number {
        if (this.systemMemInfo?.success && this.systemMemInfo.total > 0 && this.systemMemInfo.available > 0) {
            const z3 = this.systemMemInfo.total - this.systemMemInfo.available;
            return Math.round((z3 / this.systemMemInfo.total) * 100);
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
    navigateToConcept(y3: string): void {
        router.pushUrl({
            url: 'pages/ConceptDetailPage',
            params: { conceptId: y3 }
        });
    }
    initialRender() {
        this.observeComponentCreation2((w3, x3) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((u3, v3) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((s3, t3) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((q3, r3) => {
            Text.create('内存');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((o3, p3) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((m3, n3) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((a, b) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((k3, l3) => {
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
                        this.observeComponentCreation2((g3, h3) => {
                            if (h3) {
                                let i3 = new InfoHeader(this, { title: '内存状态' }, undefined, g3, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 145, col: 13 });
                                ViewPU.create(i3);
                                let j3 = () => {
                                    return {
                                        title: '内存状态'
                                    };
                                };
                                i3.paramsGenerator_ = j3;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(g3, {
                                    title: '内存状态'
                                });
                            }
                        }, { name: "InfoHeader" });
                    }
                    this.observeComponentCreation2((e3, f3) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(24);
                        Column.borderRadius(12);
                        Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((c3, d3) => {
                        Text.create('Native API 不可用');
                        Text.fontSize(18);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin(24);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((a3, b3) => {
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
                        this.observeComponentCreation2((w2, x2) => {
                            if (x2) {
                                let y2 = new InfoHeader(this, {
                                    title: '系统内存',
                                    subtitle: '显示设备总内存和使用情况'
                                }, undefined, w2, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 164, col: 13 });
                                ViewPU.create(y2);
                                let z2 = () => {
                                    return {
                                        title: '系统内存',
                                        subtitle: '显示设备总内存和使用情况'
                                    };
                                };
                                y2.paramsGenerator_ = z2;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(w2, {
                                    title: '系统内存',
                                    subtitle: '显示设备总内存和使用情况'
                                });
                            }
                        }, { name: "InfoHeader" });
                    }
                    this.observeComponentCreation2((u2, v2) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(24);
                        Column.borderRadius(12);
                        Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((s2, t2) => {
                        Text.create(this.getTotalMemory());
                        Text.fontSize(48);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((q2, r2) => {
                        Text.create('总内存');
                        Text.fontSize(14);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin({ top: 8 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    this.observeComponentCreation2((i2, j2) => {
                        If.create();
                        if (this.getMemoryUsagePercent() > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((o2, p2) => {
                                    __Common__.create();
                                    __Common__.margin({ top: 16 });
                                }, __Common__);
                                {
                                    this.observeComponentCreation2((k2, l2) => {
                                        if (l2) {
                                            let m2 = new InfoCard(this, {
                                                title: '内存使用率',
                                                value: `${this.getMemoryUsagePercent()}%`
                                            }, undefined, k2, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 187, col: 15 });
                                            ViewPU.create(m2);
                                            let n2 = () => {
                                                return {
                                                    title: '内存使用率',
                                                    value: `${this.getMemoryUsagePercent()}%`
                                                };
                                            };
                                            m2.paramsGenerator_ = n2;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(k2, {
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
                        this.observeComponentCreation2((e2, f2) => {
                            if (f2) {
                                let g2 = new InfoCard(this, {
                                    title: '可用内存',
                                    value: this.getAvailableMemory()
                                }, undefined, e2, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 194, col: 13 });
                                ViewPU.create(g2);
                                let h2 = () => {
                                    return {
                                        title: '可用内存',
                                        value: this.getAvailableMemory()
                                    };
                                };
                                g2.paramsGenerator_ = h2;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(e2, {
                                    title: '可用内存',
                                    value: this.getAvailableMemory()
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((a2, b2) => {
                            if (b2) {
                                let c2 = new InfoCard(this, {
                                    title: '已用内存',
                                    value: this.getUsedMemory()
                                }, undefined, a2, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 199, col: 13 });
                                ViewPU.create(c2);
                                let d2 = () => {
                                    return {
                                        title: '已用内存',
                                        value: this.getUsedMemory()
                                    };
                                };
                                c2.paramsGenerator_ = d2;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(a2, {
                                    title: '已用内存',
                                    value: this.getUsedMemory()
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((w1, x1) => {
                            if (x1) {
                                let y1 = new InfoHeader(this, {
                                    title: '应用内存',
                                    subtitle: 'PSS、RSS、VSS 内存指标',
                                    conceptId: 'memory_pss',
                                    onInfoClick: () => this.navigateToConcept('memory_pss')
                                }, undefined, w1, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 205, col: 13 });
                                ViewPU.create(y1);
                                let z1 = () => {
                                    return {
                                        title: '应用内存',
                                        subtitle: 'PSS、RSS、VSS 内存指标',
                                        conceptId: 'memory_pss',
                                        onInfoClick: () => this.navigateToConcept('memory_pss')
                                    };
                                };
                                y1.paramsGenerator_ = z1;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(w1, {
                                    title: '应用内存',
                                    subtitle: 'PSS、RSS、VSS 内存指标',
                                    conceptId: 'memory_pss'
                                });
                            }
                        }, { name: "InfoHeader" });
                    }
                    this.observeComponentCreation2((o1, p1) => {
                        If.create();
                        if (this.appMemInfo?.success) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((u1, v1) => {
                                    Column.create();
                                    Column.width('100%');
                                    Column.padding(20);
                                    Column.borderRadius(12);
                                    Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                    Column.alignItems(HorizontalAlign.Center);
                                    Column.margin({ bottom: 12 });
                                }, Column);
                                this.observeComponentCreation2((s1, t1) => {
                                    Text.create(this.getAppPss());
                                    Text.fontSize(36);
                                    Text.fontWeight(FontWeight.Bold);
                                    Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((q1, r1) => {
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
                        this.observeComponentCreation2((k1, l1) => {
                            if (l1) {
                                let m1 = new InfoCardWithDesc(this, {
                                    title: 'RSS (驻留内存)',
                                    value: this.getAppRss(),
                                    conceptId: 'memory_rss',
                                    onInfoClick: () => this.navigateToConcept('memory_rss')
                                }, undefined, k1, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 232, col: 13 });
                                ViewPU.create(m1);
                                let n1 = () => {
                                    return {
                                        title: 'RSS (驻留内存)',
                                        value: this.getAppRss(),
                                        conceptId: 'memory_rss',
                                        onInfoClick: () => this.navigateToConcept('memory_rss')
                                    };
                                };
                                m1.paramsGenerator_ = n1;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(k1, {
                                    title: 'RSS (驻留内存)',
                                    value: this.getAppRss(),
                                    conceptId: 'memory_rss'
                                });
                            }
                        }, { name: "InfoCardWithDesc" });
                    }
                    {
                        this.observeComponentCreation2((g1, h1) => {
                            if (h1) {
                                let i1 = new InfoCardWithDesc(this, {
                                    title: 'VSS (虚拟内存)',
                                    value: this.getAppVss(),
                                    conceptId: 'memory_vss',
                                    onInfoClick: () => this.navigateToConcept('memory_vss')
                                }, undefined, g1, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 239, col: 13 });
                                ViewPU.create(i1);
                                let j1 = () => {
                                    return {
                                        title: 'VSS (虚拟内存)',
                                        value: this.getAppVss(),
                                        conceptId: 'memory_vss',
                                        onInfoClick: () => this.navigateToConcept('memory_vss')
                                    };
                                };
                                i1.paramsGenerator_ = j1;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(g1, {
                                    title: 'VSS (虚拟内存)',
                                    value: this.getAppVss(),
                                    conceptId: 'memory_vss'
                                });
                            }
                        }, { name: "InfoCardWithDesc" });
                    }
                    this.observeComponentCreation2((k, l) => {
                        If.create();
                        if (this.appMemInfo?.success) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((c1, d1) => {
                                        if (d1) {
                                            let e1 = new InfoHeader(this, {
                                                title: '内存分类',
                                                subtitle: 'Shared/Private Clean/Dirty',
                                                conceptId: 'memory_shared',
                                                onInfoClick: () => this.navigateToConcept('memory_shared')
                                            }, undefined, c1, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 248, col: 15 });
                                            ViewPU.create(e1);
                                            let f1 = () => {
                                                return {
                                                    title: '内存分类',
                                                    subtitle: 'Shared/Private Clean/Dirty',
                                                    conceptId: 'memory_shared',
                                                    onInfoClick: () => this.navigateToConcept('memory_shared')
                                                };
                                            };
                                            e1.paramsGenerator_ = f1;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(c1, {
                                                title: '内存分类',
                                                subtitle: 'Shared/Private Clean/Dirty',
                                                conceptId: 'memory_shared'
                                            });
                                        }
                                    }, { name: "InfoHeader" });
                                }
                                {
                                    this.observeComponentCreation2((y, z) => {
                                        if (z) {
                                            let a1 = new InfoCardWithDesc(this, {
                                                title: 'Shared Clean',
                                                value: FormatUtil.formatBytes(this.appMemInfo.sharedClean),
                                                conceptId: 'memory_shared',
                                                onInfoClick: () => this.navigateToConcept('memory_shared')
                                            }, undefined, y, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 255, col: 15 });
                                            ViewPU.create(a1);
                                            let b1 = () => {
                                                return {
                                                    title: 'Shared Clean',
                                                    value: FormatUtil.formatBytes(this.appMemInfo.sharedClean),
                                                    conceptId: 'memory_shared',
                                                    onInfoClick: () => this.navigateToConcept('memory_shared')
                                                };
                                            };
                                            a1.paramsGenerator_ = b1;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(y, {
                                                title: 'Shared Clean',
                                                value: FormatUtil.formatBytes(this.appMemInfo.sharedClean),
                                                conceptId: 'memory_shared'
                                            });
                                        }
                                    }, { name: "InfoCardWithDesc" });
                                }
                                {
                                    this.observeComponentCreation2((u, v) => {
                                        if (v) {
                                            let w = new InfoCardWithDesc(this, {
                                                title: 'Shared Dirty',
                                                value: FormatUtil.formatBytes(this.appMemInfo.sharedDirty),
                                                conceptId: 'memory_shared',
                                                onInfoClick: () => this.navigateToConcept('memory_shared')
                                            }, undefined, u, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 262, col: 15 });
                                            ViewPU.create(w);
                                            let x = () => {
                                                return {
                                                    title: 'Shared Dirty',
                                                    value: FormatUtil.formatBytes(this.appMemInfo.sharedDirty),
                                                    conceptId: 'memory_shared',
                                                    onInfoClick: () => this.navigateToConcept('memory_shared')
                                                };
                                            };
                                            w.paramsGenerator_ = x;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(u, {
                                                title: 'Shared Dirty',
                                                value: FormatUtil.formatBytes(this.appMemInfo.sharedDirty),
                                                conceptId: 'memory_shared'
                                            });
                                        }
                                    }, { name: "InfoCardWithDesc" });
                                }
                                {
                                    this.observeComponentCreation2((q, r) => {
                                        if (r) {
                                            let s = new InfoCardWithDesc(this, {
                                                title: 'Private Clean',
                                                value: FormatUtil.formatBytes(this.appMemInfo.privateClean),
                                                conceptId: 'memory_shared',
                                                onInfoClick: () => this.navigateToConcept('memory_shared')
                                            }, undefined, q, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 269, col: 15 });
                                            ViewPU.create(s);
                                            let t = () => {
                                                return {
                                                    title: 'Private Clean',
                                                    value: FormatUtil.formatBytes(this.appMemInfo.privateClean),
                                                    conceptId: 'memory_shared',
                                                    onInfoClick: () => this.navigateToConcept('memory_shared')
                                                };
                                            };
                                            s.paramsGenerator_ = t;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(q, {
                                                title: 'Private Clean',
                                                value: FormatUtil.formatBytes(this.appMemInfo.privateClean),
                                                conceptId: 'memory_shared'
                                            });
                                        }
                                    }, { name: "InfoCardWithDesc" });
                                }
                                {
                                    this.observeComponentCreation2((m, n) => {
                                        if (n) {
                                            let o = new InfoCardWithDesc(this, {
                                                title: 'Private Dirty',
                                                value: FormatUtil.formatBytes(this.appMemInfo.privateDirty),
                                                conceptId: 'memory_shared',
                                                onInfoClick: () => this.navigateToConcept('memory_shared')
                                            }, undefined, m, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 276, col: 15 });
                                            ViewPU.create(o);
                                            let p = () => {
                                                return {
                                                    title: 'Private Dirty',
                                                    value: FormatUtil.formatBytes(this.appMemInfo.privateDirty),
                                                    conceptId: 'memory_shared',
                                                    onInfoClick: () => this.navigateToConcept('memory_shared')
                                                };
                                            };
                                            o.paramsGenerator_ = p;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(m, {
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
                        this.observeComponentCreation2((g, h) => {
                            if (h) {
                                let i = new InfoHeader(this, {
                                    title: '内存限制',
                                    subtitle: '系统为应用设置的内存上限',
                                    conceptId: 'memory_limit',
                                    onInfoClick: () => this.navigateToConcept('memory_limit')
                                }, undefined, g, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 285, col: 13 });
                                ViewPU.create(i);
                                let j = () => {
                                    return {
                                        title: '内存限制',
                                        subtitle: '系统为应用设置的内存上限',
                                        conceptId: 'memory_limit',
                                        onInfoClick: () => this.navigateToConcept('memory_limit')
                                    };
                                };
                                i.paramsGenerator_ = j;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(g, {
                                    title: '内存限制',
                                    subtitle: '系统为应用设置的内存上限',
                                    conceptId: 'memory_limit'
                                });
                            }
                        }, { name: "InfoHeader" });
                    }
                    {
                        this.observeComponentCreation2((c, d) => {
                            if (d) {
                                let e = new InfoCardWithDesc(this, {
                                    title: 'RSS 限制',
                                    value: this.getMemoryLimit(),
                                    conceptId: 'memory_limit',
                                    onInfoClick: () => this.navigateToConcept('memory_limit')
                                }, undefined, c, () => { }, { page: "entry/src/main/ets/pages/MemoryPage.ets", line: 292, col: 13 });
                                ViewPU.create(e);
                                let f = () => {
                                    return {
                                        title: 'RSS 限制',
                                        value: this.getMemoryLimit(),
                                        conceptId: 'memory_limit',
                                        onInfoClick: () => this.navigateToConcept('memory_limit')
                                    };
                                };
                                e.paramsGenerator_ = f;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(c, {
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
