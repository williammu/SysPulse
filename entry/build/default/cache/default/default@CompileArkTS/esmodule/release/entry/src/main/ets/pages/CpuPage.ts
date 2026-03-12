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
import { InfoHeader, InfoCardWithDesc } from "@bundle:com.huawei.sysinfo/entry/ets/components/InfoButton";
import { SimpleChart } from "@bundle:com.huawei.sysinfo/entry/ets/components/SimpleChart";
import { NavigationBarWithArrow } from "@bundle:com.huawei.sysinfo/entry/ets/components/NavigationBar";
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
    constructor(a14, b14, c14, d14 = -1, e14 = undefined, f14) {
        super(a14, c14, d14, f14);
        if (typeof e14 === "function") {
            this.paramsGenerator_ = e14;
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
        this.setInitiallyProvidedValue(b14);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(z13: CpuPage_Params) {
        if (z13.cpuInfo !== undefined) {
            this.cpuInfo = z13.cpuInfo;
        }
        if (z13.systemCpuUsage !== undefined) {
            this.systemCpuUsage = z13.systemCpuUsage;
        }
        if (z13.appCpuUsage !== undefined) {
            this.appCpuUsage = z13.appCpuUsage;
        }
        if (z13.cpuUsageAll !== undefined) {
            this.cpuUsageAll = z13.cpuUsageAll;
        }
        if (z13.isNativeAvailable !== undefined) {
            this.isNativeAvailable = z13.isNativeAvailable;
        }
        if (z13.isLoading !== undefined) {
            this.isLoading = z13.isLoading;
        }
        if (z13.systemCpuHistory !== undefined) {
            this.systemCpuHistory = z13.systemCpuHistory;
        }
        if (z13.appCpuHistory !== undefined) {
            this.appCpuHistory = z13.appCpuHistory;
        }
        if (z13.refreshTimer !== undefined) {
            this.refreshTimer = z13.refreshTimer;
        }
    }
    updateStateVars(y13: CpuPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(x13) {
        this.__cpuInfo.purgeDependencyOnElmtId(x13);
        this.__systemCpuUsage.purgeDependencyOnElmtId(x13);
        this.__appCpuUsage.purgeDependencyOnElmtId(x13);
        this.__cpuUsageAll.purgeDependencyOnElmtId(x13);
        this.__isNativeAvailable.purgeDependencyOnElmtId(x13);
        this.__isLoading.purgeDependencyOnElmtId(x13);
        this.__systemCpuHistory.purgeDependencyOnElmtId(x13);
        this.__appCpuHistory.purgeDependencyOnElmtId(x13);
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
    set cpuInfo(w13: CpuBaseInfo | null) {
        this.__cpuInfo.set(w13);
    }
    private __systemCpuUsage: ObservedPropertyObjectPU<CpuUsage | null>;
    get systemCpuUsage() {
        return this.__systemCpuUsage.get();
    }
    set systemCpuUsage(v13: CpuUsage | null) {
        this.__systemCpuUsage.set(v13);
    }
    private __appCpuUsage: ObservedPropertyObjectPU<CpuUsage | null>;
    get appCpuUsage() {
        return this.__appCpuUsage.get();
    }
    set appCpuUsage(u13: CpuUsage | null) {
        this.__appCpuUsage.set(u13);
    }
    private __cpuUsageAll: ObservedPropertyObjectPU<CpuUsageAll | null>;
    get cpuUsageAll() {
        return this.__cpuUsageAll.get();
    }
    set cpuUsageAll(t13: CpuUsageAll | null) {
        this.__cpuUsageAll.set(t13);
    }
    private __isNativeAvailable: ObservedPropertySimplePU<boolean>;
    get isNativeAvailable() {
        return this.__isNativeAvailable.get();
    }
    set isNativeAvailable(s13: boolean) {
        this.__isNativeAvailable.set(s13);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(r13: boolean) {
        this.__isLoading.set(r13);
    }
    private __systemCpuHistory: ObservedPropertyObjectPU<number[]>;
    get systemCpuHistory() {
        return this.__systemCpuHistory.get();
    }
    set systemCpuHistory(q13: number[]) {
        this.__systemCpuHistory.set(q13);
    }
    private __appCpuHistory: ObservedPropertyObjectPU<number[]>;
    get appCpuHistory() {
        return this.__appCpuHistory.get();
    }
    set appCpuHistory(p13: number[]) {
        this.__appCpuHistory.set(p13);
    }
    private refreshTimer: number | null;
    aboutToAppear() {
        const o13 = DeviceUtil.getCpuInfo();
        this.cpuInfo = {
            model: o13.model || '未获取',
            cores: o13.cores || 0,
            architecture: o13.architecture || '未获取',
            process: o13.process || '未获取'
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
    navigateToConcept(n13: string): void {
        router.pushUrl({
            url: 'pages/ConceptDetailPage',
            params: { conceptId: n13 }
        });
    }
    initialRender() {
        this.observeComponentCreation2((l13, m13) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((h13, i13) => {
                if (i13) {
                    let j13 = new NavigationBarWithArrow(this, {
                        title: '处理器',
                        onBack: () => {
                            router.back();
                        }
                    }, undefined, h13, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 114, col: 7 });
                    ViewPU.create(j13);
                    let k13 = () => {
                        return {
                            title: '处理器',
                            onBack: () => {
                                router.back();
                            }
                        };
                    };
                    j13.paramsGenerator_ = k13;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(h13, {
                        title: '处理器'
                    });
                }
            }, { name: "NavigationBarWithArrow" });
        }
        this.observeComponentCreation2((f13, g13) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((d13, e13) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((l10, m10) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((b13, c13) => {
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
                        this.observeComponentCreation2((x12, y12) => {
                            if (y12) {
                                let z12 = new InfoHeader(this, {
                                    title: 'CPU 使用率',
                                    subtitle: '显示系统和应用的 CPU 使用率',
                                    conceptId: 'cpu_usage',
                                    onInfoClick: () => this.navigateToConcept('cpu_usage')
                                }, undefined, x12, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 130, col: 13 });
                                ViewPU.create(z12);
                                let a13 = () => {
                                    return {
                                        title: 'CPU 使用率',
                                        subtitle: '显示系统和应用的 CPU 使用率',
                                        conceptId: 'cpu_usage',
                                        onInfoClick: () => this.navigateToConcept('cpu_usage')
                                    };
                                };
                                z12.paramsGenerator_ = a13;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(x12, {
                                    title: 'CPU 使用率',
                                    subtitle: '显示系统和应用的 CPU 使用率',
                                    conceptId: 'cpu_usage'
                                });
                            }
                        }, { name: "InfoHeader" });
                    }
                    this.observeComponentCreation2((x11, y11) => {
                        If.create();
                        if (this.isNativeAvailable && this.systemCpuUsage?.success) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((v12, w12) => {
                                    Column.create();
                                    Column.width('100%');
                                    Column.padding(24);
                                    Column.borderRadius(12);
                                    Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                    Column.alignItems(HorizontalAlign.Center);
                                }, Column);
                                this.observeComponentCreation2((t12, u12) => {
                                    Text.create(`${this.getSystemCpuUsagePercent()}%`);
                                    Text.fontSize(48);
                                    Text.fontWeight(FontWeight.Bold);
                                    Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((r12, s12) => {
                                    Text.create('系统 CPU 使用率');
                                    Text.fontSize(14);
                                    Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                    Text.margin({ top: 8 });
                                }, Text);
                                Text.pop();
                                Column.pop();
                                this.observeComponentCreation2((j12, k12) => {
                                    If.create();
                                    if (this.systemCpuHistory.length > 1) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            this.observeComponentCreation2((p12, q12) => {
                                                __Common__.create();
                                                __Common__.margin({ top: 16 });
                                            }, __Common__);
                                            {
                                                this.observeComponentCreation2((l12, m12) => {
                                                    if (m12) {
                                                        let n12 = new SimpleChart(this, {
                                                            data: this.systemCpuHistory,
                                                            maxValue: 100,
                                                            color: '#007DFF',
                                                            title: '系统 CPU 使用率趋势'
                                                        }, undefined, l12, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 157, col: 17 });
                                                        ViewPU.create(n12);
                                                        let o12 = () => {
                                                            return {
                                                                data: this.systemCpuHistory,
                                                                maxValue: 100,
                                                                color: '#007DFF',
                                                                title: '系统 CPU 使用率趋势'
                                                            };
                                                        };
                                                        n12.paramsGenerator_ = o12;
                                                    }
                                                    else {
                                                        this.updateStateVarsOfChildByElmtId(l12, {
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
                                this.observeComponentCreation2((d12, e12) => {
                                    If.create();
                                    if (this.appCpuUsage?.success) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            {
                                                this.observeComponentCreation2((f12, g12) => {
                                                    if (g12) {
                                                        let h12 = new InfoCardWithDesc(this, {
                                                            title: '应用 CPU 使用率',
                                                            value: `${this.getAppCpuUsagePercent()}%`,
                                                            conceptId: 'cpu_usage',
                                                            onInfoClick: () => this.navigateToConcept('cpu_usage')
                                                        }, undefined, f12, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 168, col: 17 });
                                                        ViewPU.create(h12);
                                                        let i12 = () => {
                                                            return {
                                                                title: '应用 CPU 使用率',
                                                                value: `${this.getAppCpuUsagePercent()}%`,
                                                                conceptId: 'cpu_usage',
                                                                onInfoClick: () => this.navigateToConcept('cpu_usage')
                                                            };
                                                        };
                                                        h12.paramsGenerator_ = i12;
                                                    }
                                                    else {
                                                        this.updateStateVarsOfChildByElmtId(f12, {
                                                            title: '应用 CPU 使用率',
                                                            value: `${this.getAppCpuUsagePercent()}%`,
                                                            conceptId: 'cpu_usage'
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
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.observeComponentCreation2((b12, c12) => {
                                    Column.create();
                                    Column.width('100%');
                                    Column.padding(24);
                                    Column.borderRadius(12);
                                    Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                    Column.alignItems(HorizontalAlign.Center);
                                }, Column);
                                this.observeComponentCreation2((z11, a12) => {
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
                        this.observeComponentCreation2((t11, u11) => {
                            if (u11) {
                                let v11 = new InfoHeader(this, {
                                    title: 'CPU 信息',
                                    subtitle: '显示 CPU 的硬件规格信息'
                                }, undefined, t11, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 190, col: 13 });
                                ViewPU.create(v11);
                                let w11 = () => {
                                    return {
                                        title: 'CPU 信息',
                                        subtitle: '显示 CPU 的硬件规格信息'
                                    };
                                };
                                v11.paramsGenerator_ = w11;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(t11, {
                                    title: 'CPU 信息',
                                    subtitle: '显示 CPU 的硬件规格信息'
                                });
                            }
                        }, { name: "InfoHeader" });
                    }
                    {
                        this.observeComponentCreation2((p11, q11) => {
                            if (q11) {
                                let r11 = new InfoCard(this, {
                                    title: '架构',
                                    value: this.cpuInfo?.architecture || '未获取'
                                }, undefined, p11, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 195, col: 13 });
                                ViewPU.create(r11);
                                let s11 = () => {
                                    return {
                                        title: '架构',
                                        value: this.cpuInfo?.architecture || '未获取'
                                    };
                                };
                                r11.paramsGenerator_ = s11;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(p11, {
                                    title: '架构',
                                    value: this.cpuInfo?.architecture || '未获取'
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((l11, m11) => {
                            if (m11) {
                                let n11 = new InfoCard(this, {
                                    title: '核心数',
                                    value: this.getCoreCount()
                                }, undefined, l11, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 200, col: 13 });
                                ViewPU.create(n11);
                                let o11 = () => {
                                    return {
                                        title: '核心数',
                                        value: this.getCoreCount()
                                    };
                                };
                                n11.paramsGenerator_ = o11;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(l11, {
                                    title: '核心数',
                                    value: this.getCoreCount()
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((h11, i11) => {
                            if (i11) {
                                let j11 = new InfoCard(this, {
                                    title: '型号',
                                    value: this.cpuInfo?.model || '未获取'
                                }, undefined, h11, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 205, col: 13 });
                                ViewPU.create(j11);
                                let k11 = () => {
                                    return {
                                        title: '型号',
                                        value: this.cpuInfo?.model || '未获取'
                                    };
                                };
                                j11.paramsGenerator_ = k11;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(h11, {
                                    title: '型号',
                                    value: this.cpuInfo?.model || '未获取'
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((d11, e11) => {
                            if (e11) {
                                let f11 = new InfoCard(this, {
                                    title: '制程工艺',
                                    value: this.cpuInfo?.process || '未获取'
                                }, undefined, d11, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 210, col: 13 });
                                ViewPU.create(f11);
                                let g11 = () => {
                                    return {
                                        title: '制程工艺',
                                        value: this.cpuInfo?.process || '未获取'
                                    };
                                };
                                f11.paramsGenerator_ = g11;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(d11, {
                                    title: '制程工艺',
                                    value: this.cpuInfo?.process || '未获取'
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    this.observeComponentCreation2((n10, o10) => {
                        If.create();
                        if (this.cpuUsageAll?.success && this.cpuUsageAll.threads.length > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((z10, a11) => {
                                        if (a11) {
                                            let b11 = new InfoHeader(this, {
                                                title: `线程 CPU 使用率 (${this.cpuUsageAll.threadCount})`,
                                                subtitle: '显示应用各线程的 CPU 使用率',
                                                conceptId: 'thread_cpu',
                                                onInfoClick: () => this.navigateToConcept('thread_cpu')
                                            }, undefined, z10, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 217, col: 15 });
                                            ViewPU.create(b11);
                                            let c11 = () => {
                                                return {
                                                    title: `线程 CPU 使用率 (${this.cpuUsageAll.threadCount})`,
                                                    subtitle: '显示应用各线程的 CPU 使用率',
                                                    conceptId: 'thread_cpu',
                                                    onInfoClick: () => this.navigateToConcept('thread_cpu')
                                                };
                                            };
                                            b11.paramsGenerator_ = c11;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(z10, {
                                                title: `线程 CPU 使用率 (${this.cpuUsageAll.threadCount})`,
                                                subtitle: '显示应用各线程的 CPU 使用率',
                                                conceptId: 'thread_cpu'
                                            });
                                        }
                                    }, { name: "InfoHeader" });
                                }
                                this.observeComponentCreation2((p10, q10) => {
                                    ForEach.create();
                                    const r10 = t10 => {
                                        const u10 = t10;
                                        {
                                            this.observeComponentCreation2((v10, w10) => {
                                                if (w10) {
                                                    let x10 = new InfoCard(this, {
                                                        title: `线程 ${u10.threadId}`,
                                                        value: `${Math.round(u10.percentage)}%`
                                                    }, undefined, v10, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 225, col: 17 });
                                                    ViewPU.create(x10);
                                                    let y10 = () => {
                                                        return {
                                                            title: `线程 ${u10.threadId}`,
                                                            value: `${Math.round(u10.percentage)}%`
                                                        };
                                                    };
                                                    x10.paramsGenerator_ = y10;
                                                }
                                                else {
                                                    this.updateStateVarsOfChildByElmtId(v10, {
                                                        title: `线程 ${u10.threadId}`,
                                                        value: `${Math.round(u10.percentage)}%`
                                                    });
                                                }
                                            }, { name: "InfoCard" });
                                        }
                                    };
                                    this.forEachUpdateFunction(p10, this.cpuUsageAll.threads.slice(0, 15), r10, (s10: ThreadCpuInfo) => s10.threadId.toString(), false, false);
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
