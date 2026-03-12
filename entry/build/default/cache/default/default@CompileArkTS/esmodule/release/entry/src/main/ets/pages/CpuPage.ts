if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CpuPage_Params {
    cpuInfo?: CpuBaseInfo | null;
    systemCpuUsage?: CpuUsage | null;
    appCpuUsage?: CpuUsage | null;
    cpuUsageAll?: CpuUsageAll | null;
    isNativeAvailable?: boolean;
    isLoading?: boolean;
    systemCpuHistory?: number[];
    appCpuHistory?: number[];
    refreshTimer?: number | null;
}
import router from "@ohos:router";
import { DeviceUtil } from "@bundle:com.huawei.sysinfo/entry/ets/utils/DeviceUtil";
import { InfoCard } from "@bundle:com.huawei.sysinfo/entry/ets/components/InfoCard";
import { SectionHeader } from "@bundle:com.huawei.sysinfo/entry/ets/components/SectionHeader";
import { SimpleChart } from "@bundle:com.huawei.sysinfo/entry/ets/components/SimpleChart";
import { nativeApi } from "@bundle:com.huawei.sysinfo/entry/ets/utils/NativeApi";
import type { CpuUsage, CpuUsageAll, ThreadCpuInfo } from "@bundle:com.huawei.sysinfo/entry/ets/utils/NativeApi";
const TAG = 'CpuPage';
const REFRESH_INTERVAL = 200;
const CHART_MAX_POINTS = 50;
interface CpuBaseInfo {
    model: string;
    cores: number;
    architecture: string;
    process: string;
}
class CpuPage extends ViewPU {
    constructor(r10, s10, t10, u10 = -1, v10 = undefined, w10) {
        super(r10, t10, u10, w10);
        if (typeof v10 === "function") {
            this.paramsGenerator_ = v10;
        }
        this.__cpuInfo = new ObservedPropertyObjectPU(null, this, "cpuInfo");
        this.__systemCpuUsage = new ObservedPropertyObjectPU(null, this, "systemCpuUsage");
        this.__appCpuUsage = new ObservedPropertyObjectPU(null, this, "appCpuUsage");
        this.__cpuUsageAll = new ObservedPropertyObjectPU(null, this, "cpuUsageAll");
        this.__isNativeAvailable = new ObservedPropertySimplePU(false, this, "isNativeAvailable");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.__systemCpuHistory = new ObservedPropertyObjectPU([], this, "systemCpuHistory");
        this.__appCpuHistory = new ObservedPropertyObjectPU([], this, "appCpuHistory");
        this.refreshTimer = null;
        this.setInitiallyProvidedValue(s10);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(q10: CpuPage_Params) {
        if (q10.cpuInfo !== undefined) {
            this.cpuInfo = q10.cpuInfo;
        }
        if (q10.systemCpuUsage !== undefined) {
            this.systemCpuUsage = q10.systemCpuUsage;
        }
        if (q10.appCpuUsage !== undefined) {
            this.appCpuUsage = q10.appCpuUsage;
        }
        if (q10.cpuUsageAll !== undefined) {
            this.cpuUsageAll = q10.cpuUsageAll;
        }
        if (q10.isNativeAvailable !== undefined) {
            this.isNativeAvailable = q10.isNativeAvailable;
        }
        if (q10.isLoading !== undefined) {
            this.isLoading = q10.isLoading;
        }
        if (q10.systemCpuHistory !== undefined) {
            this.systemCpuHistory = q10.systemCpuHistory;
        }
        if (q10.appCpuHistory !== undefined) {
            this.appCpuHistory = q10.appCpuHistory;
        }
        if (q10.refreshTimer !== undefined) {
            this.refreshTimer = q10.refreshTimer;
        }
    }
    updateStateVars(p10: CpuPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(o10) {
        this.__cpuInfo.purgeDependencyOnElmtId(o10);
        this.__systemCpuUsage.purgeDependencyOnElmtId(o10);
        this.__appCpuUsage.purgeDependencyOnElmtId(o10);
        this.__cpuUsageAll.purgeDependencyOnElmtId(o10);
        this.__isNativeAvailable.purgeDependencyOnElmtId(o10);
        this.__isLoading.purgeDependencyOnElmtId(o10);
        this.__systemCpuHistory.purgeDependencyOnElmtId(o10);
        this.__appCpuHistory.purgeDependencyOnElmtId(o10);
    }
    aboutToBeDeleted() {
        this.__cpuInfo.aboutToBeDeleted();
        this.__systemCpuUsage.aboutToBeDeleted();
        this.__appCpuUsage.aboutToBeDeleted();
        this.__cpuUsageAll.aboutToBeDeleted();
        this.__isNativeAvailable.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__systemCpuHistory.aboutToBeDeleted();
        this.__appCpuHistory.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __cpuInfo: ObservedPropertyObjectPU<CpuBaseInfo | null>;
    get cpuInfo() {
        return this.__cpuInfo.get();
    }
    set cpuInfo(n10: CpuBaseInfo | null) {
        this.__cpuInfo.set(n10);
    }
    private __systemCpuUsage: ObservedPropertyObjectPU<CpuUsage | null>;
    get systemCpuUsage() {
        return this.__systemCpuUsage.get();
    }
    set systemCpuUsage(m10: CpuUsage | null) {
        this.__systemCpuUsage.set(m10);
    }
    private __appCpuUsage: ObservedPropertyObjectPU<CpuUsage | null>;
    get appCpuUsage() {
        return this.__appCpuUsage.get();
    }
    set appCpuUsage(l10: CpuUsage | null) {
        this.__appCpuUsage.set(l10);
    }
    private __cpuUsageAll: ObservedPropertyObjectPU<CpuUsageAll | null>;
    get cpuUsageAll() {
        return this.__cpuUsageAll.get();
    }
    set cpuUsageAll(k10: CpuUsageAll | null) {
        this.__cpuUsageAll.set(k10);
    }
    private __isNativeAvailable: ObservedPropertySimplePU<boolean>;
    get isNativeAvailable() {
        return this.__isNativeAvailable.get();
    }
    set isNativeAvailable(j10: boolean) {
        this.__isNativeAvailable.set(j10);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(i10: boolean) {
        this.__isLoading.set(i10);
    }
    private __systemCpuHistory: ObservedPropertyObjectPU<number[]>;
    get systemCpuHistory() {
        return this.__systemCpuHistory.get();
    }
    set systemCpuHistory(h10: number[]) {
        this.__systemCpuHistory.set(h10);
    }
    private __appCpuHistory: ObservedPropertyObjectPU<number[]>;
    get appCpuHistory() {
        return this.__appCpuHistory.get();
    }
    set appCpuHistory(g10: number[]) {
        this.__appCpuHistory.set(g10);
    }
    private refreshTimer: number | null;
    aboutToAppear() {
        const f10 = DeviceUtil.getCpuInfo();
        this.cpuInfo = {
            model: f10.model || '未获取',
            cores: f10.cores || 0,
            architecture: f10.architecture || '未获取',
            process: f10.process || '未获取'
        };
        this.isNativeAvailable = nativeApi.isNativeAvailable();
        if (this.isNativeAvailable) {
            this.loadCpuInfo();
            this.refreshTimer = setInterval(() => {
                this.loadCpuInfo();
            }, REFRESH_INTERVAL);
        }
        setTimeout(() => {
            this.isLoading = false;
        }, 100);
    }
    aboutToDisappear() {
        if (this.refreshTimer !== null) {
            clearInterval(this.refreshTimer);
            this.refreshTimer = null;
        }
    }
    loadCpuInfo() {
        this.systemCpuUsage = nativeApi.getSystemCpuUsage();
        this.appCpuUsage = nativeApi.getAppCpuUsage();
        this.cpuUsageAll = nativeApi.getCpuUsageAll();
        if (this.systemCpuUsage?.success) {
            this.systemCpuHistory.push(this.systemCpuUsage.percentage);
            if (this.systemCpuHistory.length > CHART_MAX_POINTS) {
                this.systemCpuHistory.shift();
            }
        }
        if (this.appCpuUsage?.success) {
            this.appCpuHistory.push(this.appCpuUsage.percentage);
            if (this.appCpuHistory.length > CHART_MAX_POINTS) {
                this.appCpuHistory.shift();
            }
        }
    }
    getSystemCpuUsagePercent(): number {
        if (this.systemCpuUsage?.success) {
            return Math.round(this.systemCpuUsage.percentage);
        }
        return 0;
    }
    getAppCpuUsagePercent(): number {
        if (this.appCpuUsage?.success) {
            return Math.round(this.appCpuUsage.percentage);
        }
        return 0;
    }
    getCoreCount(): string {
        if (this.cpuInfo && this.cpuInfo.cores > 0) {
            return `${this.cpuInfo.cores} 核`;
        }
        return '未获取';
    }
    DataDescription(b10: string, c10 = null) {
        this.observeComponentCreation2((d10, e10) => {
            Text.create(b10);
            Text.fontSize(12);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 4, bottom: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
    }
    initialRender() {
        this.observeComponentCreation2((z9, a10) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((x9, y9) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((v9, w9) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((t9, u9) => {
            Text.create('处理器');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((r9, s9) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((p9, q9) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((x6, y6) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((n9, o9) => {
                        Text.create('加载中...');
                        Text.fontSize(16);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin(24);
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    {
                        this.observeComponentCreation2((j9, k9) => {
                            if (k9) {
                                let l9 = new SectionHeader(this, { title: 'CPU 使用率' }, undefined, j9, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 140, col: 13 });
                                ViewPU.create(l9);
                                let m9 = () => {
                                    return {
                                        title: 'CPU 使用率'
                                    };
                                };
                                l9.paramsGenerator_ = m9;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(j9, {
                                    title: 'CPU 使用率'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('显示系统和应用的 CPU 使用率。CPU 使用率表示处理器在一段时间内处于忙碌状态的时间比例。');
                    this.observeComponentCreation2((j8, k8) => {
                        If.create();
                        if (this.isNativeAvailable && this.systemCpuUsage?.success) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((h9, i9) => {
                                    Column.create();
                                    Column.width('100%');
                                    Column.padding(24);
                                    Column.borderRadius(12);
                                    Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                    Column.alignItems(HorizontalAlign.Center);
                                }, Column);
                                this.observeComponentCreation2((f9, g9) => {
                                    Text.create(`${this.getSystemCpuUsagePercent()}%`);
                                    Text.fontSize(48);
                                    Text.fontWeight(FontWeight.Bold);
                                    Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((d9, e9) => {
                                    Text.create('系统 CPU 使用率');
                                    Text.fontSize(14);
                                    Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                    Text.margin({ top: 8 });
                                }, Text);
                                Text.pop();
                                Column.pop();
                                this.observeComponentCreation2((v8, w8) => {
                                    If.create();
                                    if (this.systemCpuHistory.length > 1) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            this.observeComponentCreation2((b9, c9) => {
                                                __Common__.create();
                                                __Common__.margin({ top: 16 });
                                            }, __Common__);
                                            {
                                                this.observeComponentCreation2((x8, y8) => {
                                                    if (y8) {
                                                        let z8 = new SimpleChart(this, {
                                                            data: this.systemCpuHistory,
                                                            maxValue: 100,
                                                            color: '#007DFF',
                                                            title: '系统 CPU 使用率趋势'
                                                        }, undefined, x8, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 163, col: 17 });
                                                        ViewPU.create(z8);
                                                        let a9 = () => {
                                                            return {
                                                                data: this.systemCpuHistory,
                                                                maxValue: 100,
                                                                color: '#007DFF',
                                                                title: '系统 CPU 使用率趋势'
                                                            };
                                                        };
                                                        z8.paramsGenerator_ = a9;
                                                    }
                                                    else {
                                                        this.updateStateVarsOfChildByElmtId(x8, {
                                                            data: this.systemCpuHistory,
                                                            maxValue: 100,
                                                            color: '#007DFF',
                                                            title: '系统 CPU 使用率趋势'
                                                        });
                                                    }
                                                }, { name: "SimpleChart" });
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
                                this.observeComponentCreation2((p8, q8) => {
                                    If.create();
                                    if (this.appCpuUsage?.success) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            {
                                                this.observeComponentCreation2((r8, s8) => {
                                                    if (s8) {
                                                        let t8 = new InfoCard(this, {
                                                            title: '应用 CPU 使用率',
                                                            value: `${this.getAppCpuUsagePercent()}%`
                                                        }, undefined, r8, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 174, col: 17 });
                                                        ViewPU.create(t8);
                                                        let u8 = () => {
                                                            return {
                                                                title: '应用 CPU 使用率',
                                                                value: `${this.getAppCpuUsagePercent()}%`
                                                            };
                                                        };
                                                        t8.paramsGenerator_ = u8;
                                                    }
                                                    else {
                                                        this.updateStateVarsOfChildByElmtId(r8, {
                                                            title: '应用 CPU 使用率',
                                                            value: `${this.getAppCpuUsagePercent()}%`
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
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.observeComponentCreation2((n8, o8) => {
                                    Column.create();
                                    Column.width('100%');
                                    Column.padding(24);
                                    Column.borderRadius(12);
                                    Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                    Column.alignItems(HorizontalAlign.Center);
                                }, Column);
                                this.observeComponentCreation2((l8, m8) => {
                                    Text.create(this.isNativeAvailable ? '无法获取 CPU 使用率' : 'Native API 不可用');
                                    Text.fontSize(18);
                                    Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                    Text.margin(24);
                                }, Text);
                                Text.pop();
                                Column.pop();
                            });
                        }
                    }, If);
                    If.pop();
                    {
                        this.observeComponentCreation2((f8, g8) => {
                            if (g8) {
                                let h8 = new SectionHeader(this, { title: 'CPU 信息' }, undefined, f8, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 194, col: 13 });
                                ViewPU.create(h8);
                                let i8 = () => {
                                    return {
                                        title: 'CPU 信息'
                                    };
                                };
                                h8.paramsGenerator_ = i8;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(f8, {
                                    title: 'CPU 信息'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('显示 CPU 的硬件规格信息，包括架构、核心数、型号等。');
                    {
                        this.observeComponentCreation2((b8, c8) => {
                            if (c8) {
                                let d8 = new InfoCard(this, {
                                    title: '架构',
                                    value: this.cpuInfo?.architecture || '未获取'
                                }, undefined, b8, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 197, col: 13 });
                                ViewPU.create(d8);
                                let e8 = () => {
                                    return {
                                        title: '架构',
                                        value: this.cpuInfo?.architecture || '未获取'
                                    };
                                };
                                d8.paramsGenerator_ = e8;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(b8, {
                                    title: '架构',
                                    value: this.cpuInfo?.architecture || '未获取'
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((x7, y7) => {
                            if (y7) {
                                let z7 = new InfoCard(this, {
                                    title: '核心数',
                                    value: this.getCoreCount()
                                }, undefined, x7, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 202, col: 13 });
                                ViewPU.create(z7);
                                let a8 = () => {
                                    return {
                                        title: '核心数',
                                        value: this.getCoreCount()
                                    };
                                };
                                z7.paramsGenerator_ = a8;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(x7, {
                                    title: '核心数',
                                    value: this.getCoreCount()
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((t7, u7) => {
                            if (u7) {
                                let v7 = new InfoCard(this, {
                                    title: '型号',
                                    value: this.cpuInfo?.model || '未获取'
                                }, undefined, t7, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 207, col: 13 });
                                ViewPU.create(v7);
                                let w7 = () => {
                                    return {
                                        title: '型号',
                                        value: this.cpuInfo?.model || '未获取'
                                    };
                                };
                                v7.paramsGenerator_ = w7;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(t7, {
                                    title: '型号',
                                    value: this.cpuInfo?.model || '未获取'
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((p7, q7) => {
                            if (q7) {
                                let r7 = new InfoCard(this, {
                                    title: '制程工艺',
                                    value: this.cpuInfo?.process || '未获取'
                                }, undefined, p7, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 212, col: 13 });
                                ViewPU.create(r7);
                                let s7 = () => {
                                    return {
                                        title: '制程工艺',
                                        value: this.cpuInfo?.process || '未获取'
                                    };
                                };
                                r7.paramsGenerator_ = s7;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(p7, {
                                    title: '制程工艺',
                                    value: this.cpuInfo?.process || '未获取'
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    this.observeComponentCreation2((z6, a7) => {
                        If.create();
                        if (this.cpuUsageAll?.success && this.cpuUsageAll.threads.length > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((l7, m7) => {
                                        if (m7) {
                                            let n7 = new SectionHeader(this, { title: `线程 CPU 使用率 (${this.cpuUsageAll.threadCount})` }, undefined, l7, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 219, col: 15 });
                                            ViewPU.create(n7);
                                            let o7 = () => {
                                                return {
                                                    title: `线程 CPU 使用率 (${this.cpuUsageAll.threadCount})`
                                                };
                                            };
                                            n7.paramsGenerator_ = o7;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(l7, {
                                                title: `线程 CPU 使用率 (${this.cpuUsageAll.threadCount})`
                                            });
                                        }
                                    }, { name: "SectionHeader" });
                                }
                                this.DataDescription.bind(this)('显示应用各线程的 CPU 使用率。线程是程序执行的最小单位，多线程可以提高程序的并发性能。');
                                this.observeComponentCreation2((b7, c7) => {
                                    ForEach.create();
                                    const d7 = f7 => {
                                        const g7 = f7;
                                        {
                                            this.observeComponentCreation2((h7, i7) => {
                                                if (i7) {
                                                    let j7 = new InfoCard(this, {
                                                        title: `线程 ${g7.threadId}`,
                                                        value: `${Math.round(g7.percentage)}%`
                                                    }, undefined, h7, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 223, col: 17 });
                                                    ViewPU.create(j7);
                                                    let k7 = () => {
                                                        return {
                                                            title: `线程 ${g7.threadId}`,
                                                            value: `${Math.round(g7.percentage)}%`
                                                        };
                                                    };
                                                    j7.paramsGenerator_ = k7;
                                                }
                                                else {
                                                    this.updateStateVarsOfChildByElmtId(h7, {
                                                        title: `线程 ${g7.threadId}`,
                                                        value: `${Math.round(g7.percentage)}%`
                                                    });
                                                }
                                            }, { name: "InfoCard" });
                                        }
                                    };
                                    this.forEachUpdateFunction(b7, this.cpuUsageAll.threads.slice(0, 15), d7, (e7: ThreadCpuInfo) => e7.threadId.toString(), false, false);
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
        return "CpuPage";
    }
}
registerNamedRoute(() => new CpuPage(undefined, {}), "", { bundleName: "com.huawei.sysinfo", moduleName: "entry", pagePath: "pages/CpuPage", pageFullPath: "entry/src/main/ets/pages/CpuPage", integratedHsp: "false", moduleType: "followWithHap" });
