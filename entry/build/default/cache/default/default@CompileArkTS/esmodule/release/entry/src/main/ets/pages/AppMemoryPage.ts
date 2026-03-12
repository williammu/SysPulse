if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AppMemoryPage_Params {
    appMemInfo?: AppMemInfo | null;
    memoryLimit?: MemoryLimit | null;
    isNativeAvailable?: boolean;
    isLoading?: boolean;
    refreshTimer?: number | null;
}
import router from "@ohos:router";
import { InfoCard } from "@bundle:com.huawei.sysinfo/entry/ets/components/InfoCard";
import { SectionHeader } from "@bundle:com.huawei.sysinfo/entry/ets/components/SectionHeader";
import { nativeApi } from "@bundle:com.huawei.sysinfo/entry/ets/utils/NativeApi";
import type { AppMemInfo, MemoryLimit } from "@bundle:com.huawei.sysinfo/entry/ets/utils/NativeApi";
import { FormatUtil } from "@bundle:com.huawei.sysinfo/entry/ets/utils/FormatUtil";
import hilog from "@ohos:hilog";
const TAG = 'AppMemoryPage';
const REFRESH_INTERVAL = 200;
class AppMemoryPage extends ViewPU {
    constructor(z3, a4, b4, c4 = -1, d4 = undefined, e4) {
        super(z3, b4, c4, e4);
        if (typeof d4 === "function") {
            this.paramsGenerator_ = d4;
        }
        this.__appMemInfo = new ObservedPropertyObjectPU(null, this, "appMemInfo");
        this.__memoryLimit = new ObservedPropertyObjectPU(null, this, "memoryLimit");
        this.__isNativeAvailable = new ObservedPropertySimplePU(false, this, "isNativeAvailable");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.refreshTimer = null;
        this.setInitiallyProvidedValue(a4);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(y3: AppMemoryPage_Params) {
        if (y3.appMemInfo !== undefined) {
            this.appMemInfo = y3.appMemInfo;
        }
        if (y3.memoryLimit !== undefined) {
            this.memoryLimit = y3.memoryLimit;
        }
        if (y3.isNativeAvailable !== undefined) {
            this.isNativeAvailable = y3.isNativeAvailable;
        }
        if (y3.isLoading !== undefined) {
            this.isLoading = y3.isLoading;
        }
        if (y3.refreshTimer !== undefined) {
            this.refreshTimer = y3.refreshTimer;
        }
    }
    updateStateVars(x3: AppMemoryPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(w3) {
        this.__appMemInfo.purgeDependencyOnElmtId(w3);
        this.__memoryLimit.purgeDependencyOnElmtId(w3);
        this.__isNativeAvailable.purgeDependencyOnElmtId(w3);
        this.__isLoading.purgeDependencyOnElmtId(w3);
    }
    aboutToBeDeleted() {
        this.__appMemInfo.aboutToBeDeleted();
        this.__memoryLimit.aboutToBeDeleted();
        this.__isNativeAvailable.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __appMemInfo: ObservedPropertyObjectPU<AppMemInfo | null>;
    get appMemInfo() {
        return this.__appMemInfo.get();
    }
    set appMemInfo(v3: AppMemInfo | null) {
        this.__appMemInfo.set(v3);
    }
    private __memoryLimit: ObservedPropertyObjectPU<MemoryLimit | null>;
    get memoryLimit() {
        return this.__memoryLimit.get();
    }
    set memoryLimit(u3: MemoryLimit | null) {
        this.__memoryLimit.set(u3);
    }
    private __isNativeAvailable: ObservedPropertySimplePU<boolean>;
    get isNativeAvailable() {
        return this.__isNativeAvailable.get();
    }
    set isNativeAvailable(t3: boolean) {
        this.__isNativeAvailable.set(t3);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(s3: boolean) {
        this.__isLoading.set(s3);
    }
    private refreshTimer: number | null;
    aboutToAppear() {
        hilog.info(0x0000, TAG, 'AppMemoryPage aboutToAppear - START');
        this.isNativeAvailable = nativeApi.isNativeAvailable();
        hilog.info(0x0000, TAG, 'Native API available: %{public}s', String(this.isNativeAvailable));
        if (this.isNativeAvailable) {
            this.loadAppMemoryInfo();
            this.refreshTimer = setInterval(() => {
                this.loadAppMemoryInfo();
            }, REFRESH_INTERVAL);
        }
        setTimeout(() => {
            this.isLoading = false;
        }, 100);
        hilog.info(0x0000, TAG, 'AppMemoryPage aboutToAppear - END');
    }
    aboutToDisappear() {
        if (this.refreshTimer !== null) {
            clearInterval(this.refreshTimer);
            this.refreshTimer = null;
        }
    }
    loadAppMemoryInfo() {
        this.appMemInfo = nativeApi.getAppMemInfo();
        this.memoryLimit = nativeApi.getMemoryLimit();
    }
    getPssText(): string {
        if (this.appMemInfo?.success && this.appMemInfo.pss > 0) {
            return FormatUtil.formatBytes(this.appMemInfo.pss);
        }
        return '未获取';
    }
    getRssText(): string {
        if (this.appMemInfo?.success && this.appMemInfo.rss > 0) {
            return FormatUtil.formatBytes(this.appMemInfo.rss);
        }
        return '未获取';
    }
    getVssText(): string {
        if (this.appMemInfo?.success && this.appMemInfo.vss > 0) {
            return FormatUtil.formatBytes(this.appMemInfo.vss);
        }
        return '未获取';
    }
    getRssLimitText(): string {
        if (this.memoryLimit?.success && this.memoryLimit.rssLimit > 0) {
            return FormatUtil.formatBytes(this.memoryLimit.rssLimit);
        }
        return '未获取';
    }
    getVssLimitText(): string {
        if (this.memoryLimit?.success && this.memoryLimit.vssLimit > 0) {
            return FormatUtil.formatBytes(this.memoryLimit.vssLimit);
        }
        return '未获取';
    }
    getRssUsagePercent(): number {
        if (this.appMemInfo?.success && this.memoryLimit?.success &&
            this.appMemInfo.rss > 0 && this.memoryLimit.rssLimit > 0) {
            return Math.min(100, Math.round((this.appMemInfo.rss / this.memoryLimit.rssLimit) * 100));
        }
        return 0;
    }
    initialRender() {
        this.observeComponentCreation2((q3, r3) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F7F8FA');
        }, Column);
        this.observeComponentCreation2((o3, p3) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((m3, n3) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((k3, l3) => {
            Text.create('应用内存');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((i3, j3) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((g3, h3) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((a, b) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((e3, f3) => {
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
                        this.observeComponentCreation2((a3, b3) => {
                            if (b3) {
                                let c3 = new SectionHeader(this, { title: '状态' }, undefined, a3, () => { }, { page: "entry/src/main/ets/pages/AppMemoryPage.ets", line: 120, col: 13 });
                                ViewPU.create(c3);
                                let d3 = () => {
                                    return {
                                        title: '状态'
                                    };
                                };
                                c3.paramsGenerator_ = d3;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(a3, {
                                    title: '状态'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.observeComponentCreation2((y2, z2) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(24);
                        Column.borderRadius(12);
                        Column.backgroundColor({ "id": 16777224, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((w2, x2) => {
                        Text.create('Native API 不可用');
                        Text.fontSize(18);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin(24);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((u2, v2) => {
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
                        this.observeComponentCreation2((q2, r2) => {
                            if (r2) {
                                let s2 = new SectionHeader(this, { title: '内存概览' }, undefined, q2, () => { }, { page: "entry/src/main/ets/pages/AppMemoryPage.ets", line: 138, col: 13 });
                                ViewPU.create(s2);
                                let t2 = () => {
                                    return {
                                        title: '内存概览'
                                    };
                                };
                                s2.paramsGenerator_ = t2;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(q2, {
                                    title: '内存概览'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.observeComponentCreation2((i2, j2) => {
                        If.create();
                        if (this.appMemInfo?.success) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((o2, p2) => {
                                    Column.create();
                                    Column.width('100%');
                                    Column.padding(24);
                                    Column.borderRadius(12);
                                    Column.backgroundColor({ "id": 16777224, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                    Column.alignItems(HorizontalAlign.Center);
                                }, Column);
                                this.observeComponentCreation2((m2, n2) => {
                                    Text.create(this.getPssText());
                                    Text.fontSize(48);
                                    Text.fontWeight(FontWeight.Bold);
                                    Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((k2, l2) => {
                                    Text.create('PSS (Proportional Set Size)');
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
                    this.observeComponentCreation2((a2, b2) => {
                        If.create();
                        if (this.getRssUsagePercent() > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((g2, h2) => {
                                    __Common__.create();
                                    __Common__.margin({ top: 16 });
                                }, __Common__);
                                {
                                    this.observeComponentCreation2((c2, d2) => {
                                        if (d2) {
                                            let e2 = new InfoCard(this, {
                                                title: 'RSS 使用率',
                                                value: `${this.getRssUsagePercent()}%`
                                            }, undefined, c2, () => { }, { page: "entry/src/main/ets/pages/AppMemoryPage.ets", line: 160, col: 15 });
                                            ViewPU.create(e2);
                                            let f2 = () => {
                                                return {
                                                    title: 'RSS 使用率',
                                                    value: `${this.getRssUsagePercent()}%`
                                                };
                                            };
                                            e2.paramsGenerator_ = f2;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(c2, {
                                                title: 'RSS 使用率',
                                                value: `${this.getRssUsagePercent()}%`
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
                        this.observeComponentCreation2((w1, x1) => {
                            if (x1) {
                                let y1 = new SectionHeader(this, { title: '内存详情' }, undefined, w1, () => { }, { page: "entry/src/main/ets/pages/AppMemoryPage.ets", line: 167, col: 13 });
                                ViewPU.create(y1);
                                let z1 = () => {
                                    return {
                                        title: '内存详情'
                                    };
                                };
                                y1.paramsGenerator_ = z1;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(w1, {
                                    title: '内存详情'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    {
                        this.observeComponentCreation2((s1, t1) => {
                            if (t1) {
                                let u1 = new InfoCard(this, {
                                    title: 'PSS (实际使用内存)',
                                    value: this.getPssText()
                                }, undefined, s1, () => { }, { page: "entry/src/main/ets/pages/AppMemoryPage.ets", line: 169, col: 13 });
                                ViewPU.create(u1);
                                let v1 = () => {
                                    return {
                                        title: 'PSS (实际使用内存)',
                                        value: this.getPssText()
                                    };
                                };
                                u1.paramsGenerator_ = v1;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(s1, {
                                    title: 'PSS (实际使用内存)',
                                    value: this.getPssText()
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((o1, p1) => {
                            if (p1) {
                                let q1 = new InfoCard(this, {
                                    title: 'RSS (驻留内存)',
                                    value: this.getRssText()
                                }, undefined, o1, () => { }, { page: "entry/src/main/ets/pages/AppMemoryPage.ets", line: 174, col: 13 });
                                ViewPU.create(q1);
                                let r1 = () => {
                                    return {
                                        title: 'RSS (驻留内存)',
                                        value: this.getRssText()
                                    };
                                };
                                q1.paramsGenerator_ = r1;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(o1, {
                                    title: 'RSS (驻留内存)',
                                    value: this.getRssText()
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((k1, l1) => {
                            if (l1) {
                                let m1 = new InfoCard(this, {
                                    title: 'VSS (虚拟内存)',
                                    value: this.getVssText()
                                }, undefined, k1, () => { }, { page: "entry/src/main/ets/pages/AppMemoryPage.ets", line: 179, col: 13 });
                                ViewPU.create(m1);
                                let n1 = () => {
                                    return {
                                        title: 'VSS (虚拟内存)',
                                        value: this.getVssText()
                                    };
                                };
                                m1.paramsGenerator_ = n1;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(k1, {
                                    title: 'VSS (虚拟内存)',
                                    value: this.getVssText()
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((g1, h1) => {
                            if (h1) {
                                let i1 = new SectionHeader(this, { title: '内存分类' }, undefined, g1, () => { }, { page: "entry/src/main/ets/pages/AppMemoryPage.ets", line: 184, col: 13 });
                                ViewPU.create(i1);
                                let j1 = () => {
                                    return {
                                        title: '内存分类'
                                    };
                                };
                                i1.paramsGenerator_ = j1;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(g1, {
                                    title: '内存分类'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.observeComponentCreation2((o, p) => {
                        If.create();
                        if (this.appMemInfo?.success) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((c1, d1) => {
                                        if (d1) {
                                            let e1 = new InfoCard(this, {
                                                title: 'Shared Clean',
                                                value: FormatUtil.formatBytes(this.appMemInfo.sharedClean)
                                            }, undefined, c1, () => { }, { page: "entry/src/main/ets/pages/AppMemoryPage.ets", line: 187, col: 15 });
                                            ViewPU.create(e1);
                                            let f1 = () => {
                                                return {
                                                    title: 'Shared Clean',
                                                    value: FormatUtil.formatBytes(this.appMemInfo.sharedClean)
                                                };
                                            };
                                            e1.paramsGenerator_ = f1;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(c1, {
                                                title: 'Shared Clean',
                                                value: FormatUtil.formatBytes(this.appMemInfo.sharedClean)
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((y, z) => {
                                        if (z) {
                                            let a1 = new InfoCard(this, {
                                                title: 'Shared Dirty',
                                                value: FormatUtil.formatBytes(this.appMemInfo.sharedDirty)
                                            }, undefined, y, () => { }, { page: "entry/src/main/ets/pages/AppMemoryPage.ets", line: 192, col: 15 });
                                            ViewPU.create(a1);
                                            let b1 = () => {
                                                return {
                                                    title: 'Shared Dirty',
                                                    value: FormatUtil.formatBytes(this.appMemInfo.sharedDirty)
                                                };
                                            };
                                            a1.paramsGenerator_ = b1;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(y, {
                                                title: 'Shared Dirty',
                                                value: FormatUtil.formatBytes(this.appMemInfo.sharedDirty)
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((u, v) => {
                                        if (v) {
                                            let w = new InfoCard(this, {
                                                title: 'Private Clean',
                                                value: FormatUtil.formatBytes(this.appMemInfo.privateClean)
                                            }, undefined, u, () => { }, { page: "entry/src/main/ets/pages/AppMemoryPage.ets", line: 197, col: 15 });
                                            ViewPU.create(w);
                                            let x = () => {
                                                return {
                                                    title: 'Private Clean',
                                                    value: FormatUtil.formatBytes(this.appMemInfo.privateClean)
                                                };
                                            };
                                            w.paramsGenerator_ = x;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(u, {
                                                title: 'Private Clean',
                                                value: FormatUtil.formatBytes(this.appMemInfo.privateClean)
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((q, r) => {
                                        if (r) {
                                            let s = new InfoCard(this, {
                                                title: 'Private Dirty',
                                                value: FormatUtil.formatBytes(this.appMemInfo.privateDirty)
                                            }, undefined, q, () => { }, { page: "entry/src/main/ets/pages/AppMemoryPage.ets", line: 202, col: 15 });
                                            ViewPU.create(s);
                                            let t = () => {
                                                return {
                                                    title: 'Private Dirty',
                                                    value: FormatUtil.formatBytes(this.appMemInfo.privateDirty)
                                                };
                                            };
                                            s.paramsGenerator_ = t;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(q, {
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
                        this.observeComponentCreation2((k, l) => {
                            if (l) {
                                let m = new SectionHeader(this, { title: '内存限制' }, undefined, k, () => { }, { page: "entry/src/main/ets/pages/AppMemoryPage.ets", line: 208, col: 13 });
                                ViewPU.create(m);
                                let n = () => {
                                    return {
                                        title: '内存限制'
                                    };
                                };
                                m.paramsGenerator_ = n;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(k, {
                                    title: '内存限制'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    {
                        this.observeComponentCreation2((g, h) => {
                            if (h) {
                                let i = new InfoCard(this, {
                                    title: 'RSS 限制 (进程上限)',
                                    value: this.getRssLimitText()
                                }, undefined, g, () => { }, { page: "entry/src/main/ets/pages/AppMemoryPage.ets", line: 210, col: 13 });
                                ViewPU.create(i);
                                let j = () => {
                                    return {
                                        title: 'RSS 限制 (进程上限)',
                                        value: this.getRssLimitText()
                                    };
                                };
                                i.paramsGenerator_ = j;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(g, {
                                    title: 'RSS 限制 (进程上限)',
                                    value: this.getRssLimitText()
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((c, d) => {
                            if (d) {
                                let e = new InfoCard(this, {
                                    title: 'VSS 限制 (进程上限)',
                                    value: this.getVssLimitText()
                                }, undefined, c, () => { }, { page: "entry/src/main/ets/pages/AppMemoryPage.ets", line: 215, col: 13 });
                                ViewPU.create(e);
                                let f = () => {
                                    return {
                                        title: 'VSS 限制 (进程上限)',
                                        value: this.getVssLimitText()
                                    };
                                };
                                e.paramsGenerator_ = f;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(c, {
                                    title: 'VSS 限制 (进程上限)',
                                    value: this.getVssLimitText()
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
        return "AppMemoryPage";
    }
}
registerNamedRoute(() => new AppMemoryPage(undefined, {}), "", { bundleName: "com.huawei.sysinfo", moduleName: "entry", pagePath: "pages/AppMemoryPage", pageFullPath: "entry/src/main/ets/pages/AppMemoryPage", integratedHsp: "false", moduleType: "followWithHap" });
