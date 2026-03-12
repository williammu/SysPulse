if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ThreadCpuPage_Params {
    systemCpuUsage?: CpuUsage | null;
    appCpuUsage?: CpuUsage | null;
    cpuUsageAll?: CpuUsageAll | null;
    isNativeAvailable?: boolean;
    isLoading?: boolean;
    refreshTimer?: number | null;
}
import router from "@ohos:router";
import { InfoCard } from "@bundle:com.huawei.sysinfo/entry/ets/components/InfoCard";
import { SectionHeader } from "@bundle:com.huawei.sysinfo/entry/ets/components/SectionHeader";
import { nativeApi } from "@bundle:com.huawei.sysinfo/entry/ets/utils/NativeApi";
import type { CpuUsage, CpuUsageAll, ThreadCpuInfo } from "@bundle:com.huawei.sysinfo/entry/ets/utils/NativeApi";
import hilog from "@ohos:hilog";
const TAG = 'ThreadCpuPage';
const REFRESH_INTERVAL = 200;
class ThreadCpuPage extends ViewPU {
    constructor(c15, d15, e15, f15 = -1, g15 = undefined, h15) {
        super(c15, e15, f15, h15);
        if (typeof g15 === "function") {
            this.paramsGenerator_ = g15;
        }
        this.__systemCpuUsage = new ObservedPropertyObjectPU(null, this, "systemCpuUsage");
        this.__appCpuUsage = new ObservedPropertyObjectPU(null, this, "appCpuUsage");
        this.__cpuUsageAll = new ObservedPropertyObjectPU(null, this, "cpuUsageAll");
        this.__isNativeAvailable = new ObservedPropertySimplePU(false, this, "isNativeAvailable");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.refreshTimer = null;
        this.setInitiallyProvidedValue(d15);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(b15: ThreadCpuPage_Params) {
        if (b15.systemCpuUsage !== undefined) {
            this.systemCpuUsage = b15.systemCpuUsage;
        }
        if (b15.appCpuUsage !== undefined) {
            this.appCpuUsage = b15.appCpuUsage;
        }
        if (b15.cpuUsageAll !== undefined) {
            this.cpuUsageAll = b15.cpuUsageAll;
        }
        if (b15.isNativeAvailable !== undefined) {
            this.isNativeAvailable = b15.isNativeAvailable;
        }
        if (b15.isLoading !== undefined) {
            this.isLoading = b15.isLoading;
        }
        if (b15.refreshTimer !== undefined) {
            this.refreshTimer = b15.refreshTimer;
        }
    }
    updateStateVars(a15: ThreadCpuPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(z14) {
        this.__systemCpuUsage.purgeDependencyOnElmtId(z14);
        this.__appCpuUsage.purgeDependencyOnElmtId(z14);
        this.__cpuUsageAll.purgeDependencyOnElmtId(z14);
        this.__isNativeAvailable.purgeDependencyOnElmtId(z14);
        this.__isLoading.purgeDependencyOnElmtId(z14);
    }
    aboutToBeDeleted() {
        this.__systemCpuUsage.aboutToBeDeleted();
        this.__appCpuUsage.aboutToBeDeleted();
        this.__cpuUsageAll.aboutToBeDeleted();
        this.__isNativeAvailable.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __systemCpuUsage: ObservedPropertyObjectPU<CpuUsage | null>;
    get systemCpuUsage() {
        return this.__systemCpuUsage.get();
    }
    set systemCpuUsage(y14: CpuUsage | null) {
        this.__systemCpuUsage.set(y14);
    }
    private __appCpuUsage: ObservedPropertyObjectPU<CpuUsage | null>;
    get appCpuUsage() {
        return this.__appCpuUsage.get();
    }
    set appCpuUsage(x14: CpuUsage | null) {
        this.__appCpuUsage.set(x14);
    }
    private __cpuUsageAll: ObservedPropertyObjectPU<CpuUsageAll | null>;
    get cpuUsageAll() {
        return this.__cpuUsageAll.get();
    }
    set cpuUsageAll(w14: CpuUsageAll | null) {
        this.__cpuUsageAll.set(w14);
    }
    private __isNativeAvailable: ObservedPropertySimplePU<boolean>;
    get isNativeAvailable() {
        return this.__isNativeAvailable.get();
    }
    set isNativeAvailable(v14: boolean) {
        this.__isNativeAvailable.set(v14);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(u14: boolean) {
        this.__isLoading.set(u14);
    }
    private refreshTimer: number | null;
    aboutToAppear() {
        hilog.info(0x0000, TAG, 'ThreadCpuPage aboutToAppear - START');
        this.isNativeAvailable = nativeApi.isNativeAvailable();
        hilog.info(0x0000, TAG, 'Native API available: %{public}s', String(this.isNativeAvailable));
        if (this.isNativeAvailable) {
            this.loadThreadCpuInfo();
            this.refreshTimer = setInterval(() => {
                this.loadThreadCpuInfo();
            }, REFRESH_INTERVAL);
        }
        setTimeout(() => {
            this.isLoading = false;
        }, 100);
        hilog.info(0x0000, TAG, 'ThreadCpuPage aboutToAppear - END');
    }
    aboutToDisappear() {
        if (this.refreshTimer !== null) {
            clearInterval(this.refreshTimer);
            this.refreshTimer = null;
        }
    }
    loadThreadCpuInfo() {
        this.systemCpuUsage = nativeApi.getSystemCpuUsage();
        this.appCpuUsage = nativeApi.getAppCpuUsage();
        this.cpuUsageAll = nativeApi.getCpuUsageAll();
    }
    getSystemCpuUsageText(): string {
        if (this.systemCpuUsage?.success) {
            return `${this.systemCpuUsage.percentage.toFixed(2)}%`;
        }
        return '未获取';
    }
    getAppCpuUsageText(): string {
        if (this.appCpuUsage?.success) {
            return `${this.appCpuUsage.percentage.toFixed(2)}%`;
        }
        return '未获取';
    }
    getThreadCountText(): string {
        if (this.cpuUsageAll?.success) {
            return `${this.cpuUsageAll.threadCount} 个`;
        }
        return '未获取';
    }
    initialRender() {
        this.observeComponentCreation2((s14, t14) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F7F8FA');
        }, Column);
        this.observeComponentCreation2((q14, r14) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((o14, p14) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((m14, n14) => {
            Text.create('线程 CPU');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((k14, l14) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((i14, j14) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((a12, b12) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((g14, h14) => {
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
                        this.observeComponentCreation2((c14, d14) => {
                            if (d14) {
                                let e14 = new SectionHeader(this, { title: '状态' }, undefined, c14, () => { }, { page: "entry/src/main/ets/pages/ThreadCpuPage.ets", line: 99, col: 13 });
                                ViewPU.create(e14);
                                let f14 = () => {
                                    return {
                                        title: '状态'
                                    };
                                };
                                e14.paramsGenerator_ = f14;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(c14, {
                                    title: '状态'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.observeComponentCreation2((a14, b14) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(24);
                        Column.borderRadius(12);
                        Column.backgroundColor({ "id": 16777224, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((y13, z13) => {
                        Text.create('Native API 不可用');
                        Text.fontSize(18);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin(24);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((w13, x13) => {
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
                        this.observeComponentCreation2((s13, t13) => {
                            if (t13) {
                                let u13 = new SectionHeader(this, { title: 'CPU 使用率' }, undefined, s13, () => { }, { page: "entry/src/main/ets/pages/ThreadCpuPage.ets", line: 117, col: 13 });
                                ViewPU.create(u13);
                                let v13 = () => {
                                    return {
                                        title: 'CPU 使用率'
                                    };
                                };
                                u13.paramsGenerator_ = v13;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(s13, {
                                    title: 'CPU 使用率'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.observeComponentCreation2((k13, l13) => {
                        If.create();
                        if (this.systemCpuUsage?.success) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((q13, r13) => {
                                    Column.create();
                                    Column.width('100%');
                                    Column.padding(24);
                                    Column.borderRadius(12);
                                    Column.backgroundColor({ "id": 16777224, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                    Column.alignItems(HorizontalAlign.Center);
                                }, Column);
                                this.observeComponentCreation2((o13, p13) => {
                                    Text.create(this.getSystemCpuUsageText());
                                    Text.fontSize(48);
                                    Text.fontWeight(FontWeight.Bold);
                                    Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((m13, n13) => {
                                    Text.create('系统 CPU 使用率');
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
                        this.observeComponentCreation2((g13, h13) => {
                            if (h13) {
                                let i13 = new InfoCard(this, {
                                    title: '系统 CPU',
                                    value: this.getSystemCpuUsageText()
                                }, undefined, g13, () => { }, { page: "entry/src/main/ets/pages/ThreadCpuPage.ets", line: 138, col: 13 });
                                ViewPU.create(i13);
                                let j13 = () => {
                                    return {
                                        title: '系统 CPU',
                                        value: this.getSystemCpuUsageText()
                                    };
                                };
                                i13.paramsGenerator_ = j13;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(g13, {
                                    title: '系统 CPU',
                                    value: this.getSystemCpuUsageText()
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    this.observeComponentCreation2((a13, b13) => {
                        If.create();
                        if (this.appCpuUsage?.success) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((c13, d13) => {
                                        if (d13) {
                                            let e13 = new InfoCard(this, {
                                                title: '应用 CPU',
                                                value: this.getAppCpuUsageText()
                                            }, undefined, c13, () => { }, { page: "entry/src/main/ets/pages/ThreadCpuPage.ets", line: 144, col: 15 });
                                            ViewPU.create(e13);
                                            let f13 = () => {
                                                return {
                                                    title: '应用 CPU',
                                                    value: this.getAppCpuUsageText()
                                                };
                                            };
                                            e13.paramsGenerator_ = f13;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(c13, {
                                                title: '应用 CPU',
                                                value: this.getAppCpuUsageText()
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
                        this.observeComponentCreation2((w12, x12) => {
                            if (x12) {
                                let y12 = new SectionHeader(this, { title: '线程信息' }, undefined, w12, () => { }, { page: "entry/src/main/ets/pages/ThreadCpuPage.ets", line: 150, col: 13 });
                                ViewPU.create(y12);
                                let z12 = () => {
                                    return {
                                        title: '线程信息'
                                    };
                                };
                                y12.paramsGenerator_ = z12;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(w12, {
                                    title: '线程信息'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    {
                        this.observeComponentCreation2((s12, t12) => {
                            if (t12) {
                                let u12 = new InfoCard(this, {
                                    title: '线程数量',
                                    value: this.getThreadCountText()
                                }, undefined, s12, () => { }, { page: "entry/src/main/ets/pages/ThreadCpuPage.ets", line: 152, col: 13 });
                                ViewPU.create(u12);
                                let v12 = () => {
                                    return {
                                        title: '线程数量',
                                        value: this.getThreadCountText()
                                    };
                                };
                                u12.paramsGenerator_ = v12;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(s12, {
                                    title: '线程数量',
                                    value: this.getThreadCountText()
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    this.observeComponentCreation2((c12, d12) => {
                        If.create();
                        if (this.cpuUsageAll?.success && this.cpuUsageAll.threads.length > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((o12, p12) => {
                                        if (p12) {
                                            let q12 = new SectionHeader(this, { title: '线程 CPU 使用率' }, undefined, o12, () => { }, { page: "entry/src/main/ets/pages/ThreadCpuPage.ets", line: 158, col: 15 });
                                            ViewPU.create(q12);
                                            let r12 = () => {
                                                return {
                                                    title: '线程 CPU 使用率'
                                                };
                                            };
                                            q12.paramsGenerator_ = r12;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(o12, {
                                                title: '线程 CPU 使用率'
                                            });
                                        }
                                    }, { name: "SectionHeader" });
                                }
                                this.observeComponentCreation2((e12, f12) => {
                                    ForEach.create();
                                    const g12 = i12 => {
                                        const j12 = i12;
                                        {
                                            this.observeComponentCreation2((k12, l12) => {
                                                if (l12) {
                                                    let m12 = new InfoCard(this, {
                                                        title: `线程 ${j12.threadId}`,
                                                        value: `${j12.percentage.toFixed(2)}%`
                                                    }, undefined, k12, () => { }, { page: "entry/src/main/ets/pages/ThreadCpuPage.ets", line: 161, col: 17 });
                                                    ViewPU.create(m12);
                                                    let n12 = () => {
                                                        return {
                                                            title: `线程 ${j12.threadId}`,
                                                            value: `${j12.percentage.toFixed(2)}%`
                                                        };
                                                    };
                                                    m12.paramsGenerator_ = n12;
                                                }
                                                else {
                                                    this.updateStateVarsOfChildByElmtId(k12, {
                                                        title: `线程 ${j12.threadId}`,
                                                        value: `${j12.percentage.toFixed(2)}%`
                                                    });
                                                }
                                            }, { name: "InfoCard" });
                                        }
                                    };
                                    this.forEachUpdateFunction(e12, this.cpuUsageAll.threads.slice(0, 20), g12, (h12: ThreadCpuInfo) => h12.threadId.toString(), false, false);
                                }, ForEach);
                                ForEach.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
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
        return "ThreadCpuPage";
    }
}
registerNamedRoute(() => new ThreadCpuPage(undefined, {}), "", { bundleName: "com.huawei.sysinfo", moduleName: "entry", pagePath: "pages/ThreadCpuPage", pageFullPath: "entry/src/main/ets/pages/ThreadCpuPage", integratedHsp: "false", moduleType: "followWithHap" });
