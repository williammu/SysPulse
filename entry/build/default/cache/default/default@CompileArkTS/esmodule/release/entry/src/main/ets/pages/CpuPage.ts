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
    constructor(e14, f14, g14, h14 = -1, i14 = undefined, j14) {
        super(e14, g14, h14, j14);
        if (typeof i14 === "function") {
            this.paramsGenerator_ = i14;
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
        this.setInitiallyProvidedValue(f14);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(d14: CpuPage_Params) {
        if (d14.cpuInfo !== undefined) {
            this.cpuInfo = d14.cpuInfo;
        }
        if (d14.systemCpuUsage !== undefined) {
            this.systemCpuUsage = d14.systemCpuUsage;
        }
        if (d14.appCpuUsage !== undefined) {
            this.appCpuUsage = d14.appCpuUsage;
        }
        if (d14.cpuUsageAll !== undefined) {
            this.cpuUsageAll = d14.cpuUsageAll;
        }
        if (d14.isNativeAvailable !== undefined) {
            this.isNativeAvailable = d14.isNativeAvailable;
        }
        if (d14.isLoading !== undefined) {
            this.isLoading = d14.isLoading;
        }
        if (d14.systemCpuHistory !== undefined) {
            this.systemCpuHistory = d14.systemCpuHistory;
        }
        if (d14.appCpuHistory !== undefined) {
            this.appCpuHistory = d14.appCpuHistory;
        }
        if (d14.refreshTimer !== undefined) {
            this.refreshTimer = d14.refreshTimer;
        }
    }
    updateStateVars(c14: CpuPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(b14) {
        this.__cpuInfo.purgeDependencyOnElmtId(b14);
        this.__systemCpuUsage.purgeDependencyOnElmtId(b14);
        this.__appCpuUsage.purgeDependencyOnElmtId(b14);
        this.__cpuUsageAll.purgeDependencyOnElmtId(b14);
        this.__isNativeAvailable.purgeDependencyOnElmtId(b14);
        this.__isLoading.purgeDependencyOnElmtId(b14);
        this.__systemCpuHistory.purgeDependencyOnElmtId(b14);
        this.__appCpuHistory.purgeDependencyOnElmtId(b14);
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
    set cpuInfo(a14: CpuBaseInfo | null) {
        this.__cpuInfo.set(a14);
    }
    private __systemCpuUsage: ObservedPropertyObjectPU<CpuUsage | null>;
    get systemCpuUsage() {
        return this.__systemCpuUsage.get();
    }
    set systemCpuUsage(z13: CpuUsage | null) {
        this.__systemCpuUsage.set(z13);
    }
    private __appCpuUsage: ObservedPropertyObjectPU<CpuUsage | null>;
    get appCpuUsage() {
        return this.__appCpuUsage.get();
    }
    set appCpuUsage(y13: CpuUsage | null) {
        this.__appCpuUsage.set(y13);
    }
    private __cpuUsageAll: ObservedPropertyObjectPU<CpuUsageAll | null>;
    get cpuUsageAll() {
        return this.__cpuUsageAll.get();
    }
    set cpuUsageAll(x13: CpuUsageAll | null) {
        this.__cpuUsageAll.set(x13);
    }
    private __isNativeAvailable: ObservedPropertySimplePU<boolean>;
    get isNativeAvailable() {
        return this.__isNativeAvailable.get();
    }
    set isNativeAvailable(w13: boolean) {
        this.__isNativeAvailable.set(w13);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(v13: boolean) {
        this.__isLoading.set(v13);
    }
    private __systemCpuHistory: ObservedPropertyObjectPU<number[]>;
    get systemCpuHistory() {
        return this.__systemCpuHistory.get();
    }
    set systemCpuHistory(u13: number[]) {
        this.__systemCpuHistory.set(u13);
    }
    private __appCpuHistory: ObservedPropertyObjectPU<number[]>;
    get appCpuHistory() {
        return this.__appCpuHistory.get();
    }
    set appCpuHistory(t13: number[]) {
        this.__appCpuHistory.set(t13);
    }
    private refreshTimer: number | null;
    aboutToAppear() {
        const s13 = DeviceUtil.getCpuInfo();
        this.cpuInfo = {
            model: s13.model || '未获取',
            cores: s13.cores || 0,
            architecture: s13.architecture || '未获取',
            process: s13.process || '未获取'
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
    navigateToConcept(r13: string): void {
        router.pushUrl({
            url: 'pages/ConceptDetailPage',
            params: { conceptId: r13 }
        });
    }
    initialRender() {
        this.observeComponentCreation2((p13, q13) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((n13, o13) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((l13, m13) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((j13, k13) => {
            Text.create('处理器');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((h13, i13) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((f13, g13) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((n10, o10) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((d13, e13) => {
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
                        this.observeComponentCreation2((z12, a13) => {
                            if (a13) {
                                let b13 = new InfoHeader(this, {
                                    title: 'CPU 使用率',
                                    subtitle: '显示系统和应用的 CPU 使用率',
                                    conceptId: 'cpu_usage',
                                    onInfoClick: () => this.navigateToConcept('cpu_usage')
                                }, undefined, z12, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 139, col: 13 });
                                ViewPU.create(b13);
                                let c13 = () => {
                                    return {
                                        title: 'CPU 使用率',
                                        subtitle: '显示系统和应用的 CPU 使用率',
                                        conceptId: 'cpu_usage',
                                        onInfoClick: () => this.navigateToConcept('cpu_usage')
                                    };
                                };
                                b13.paramsGenerator_ = c13;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(z12, {
                                    title: 'CPU 使用率',
                                    subtitle: '显示系统和应用的 CPU 使用率',
                                    conceptId: 'cpu_usage'
                                });
                            }
                        }, { name: "InfoHeader" });
                    }
                    this.observeComponentCreation2((z11, a12) => {
                        If.create();
                        if (this.isNativeAvailable && this.systemCpuUsage?.success) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((x12, y12) => {
                                    Column.create();
                                    Column.width('100%');
                                    Column.padding(24);
                                    Column.borderRadius(12);
                                    Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                    Column.alignItems(HorizontalAlign.Center);
                                }, Column);
                                this.observeComponentCreation2((v12, w12) => {
                                    Text.create(`${this.getSystemCpuUsagePercent()}%`);
                                    Text.fontSize(48);
                                    Text.fontWeight(FontWeight.Bold);
                                    Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((t12, u12) => {
                                    Text.create('系统 CPU 使用率');
                                    Text.fontSize(14);
                                    Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                    Text.margin({ top: 8 });
                                }, Text);
                                Text.pop();
                                Column.pop();
                                this.observeComponentCreation2((l12, m12) => {
                                    If.create();
                                    if (this.systemCpuHistory.length > 1) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            this.observeComponentCreation2((r12, s12) => {
                                                __Common__.create();
                                                __Common__.margin({ top: 16 });
                                            }, __Common__);
                                            {
                                                this.observeComponentCreation2((n12, o12) => {
                                                    if (o12) {
                                                        let p12 = new SimpleChart(this, {
                                                            data: this.systemCpuHistory,
                                                            maxValue: 100,
                                                            color: '#007DFF',
                                                            title: '系统 CPU 使用率趋势'
                                                        }, undefined, n12, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 166, col: 17 });
                                                        ViewPU.create(p12);
                                                        let q12 = () => {
                                                            return {
                                                                data: this.systemCpuHistory,
                                                                maxValue: 100,
                                                                color: '#007DFF',
                                                                title: '系统 CPU 使用率趋势'
                                                            };
                                                        };
                                                        p12.paramsGenerator_ = q12;
                                                    }
                                                    else {
                                                        this.updateStateVarsOfChildByElmtId(n12, {
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
                                this.observeComponentCreation2((f12, g12) => {
                                    If.create();
                                    if (this.appCpuUsage?.success) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            {
                                                this.observeComponentCreation2((h12, i12) => {
                                                    if (i12) {
                                                        let j12 = new InfoCardWithDesc(this, {
                                                            title: '应用 CPU 使用率',
                                                            value: `${this.getAppCpuUsagePercent()}%`,
                                                            conceptId: 'cpu_usage',
                                                            onInfoClick: () => this.navigateToConcept('cpu_usage')
                                                        }, undefined, h12, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 177, col: 17 });
                                                        ViewPU.create(j12);
                                                        let k12 = () => {
                                                            return {
                                                                title: '应用 CPU 使用率',
                                                                value: `${this.getAppCpuUsagePercent()}%`,
                                                                conceptId: 'cpu_usage',
                                                                onInfoClick: () => this.navigateToConcept('cpu_usage')
                                                            };
                                                        };
                                                        j12.paramsGenerator_ = k12;
                                                    }
                                                    else {
                                                        this.updateStateVarsOfChildByElmtId(h12, {
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
                                this.observeComponentCreation2((d12, e12) => {
                                    Column.create();
                                    Column.width('100%');
                                    Column.padding(24);
                                    Column.borderRadius(12);
                                    Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                    Column.alignItems(HorizontalAlign.Center);
                                }, Column);
                                this.observeComponentCreation2((b12, c12) => {
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
                        this.observeComponentCreation2((v11, w11) => {
                            if (w11) {
                                let x11 = new InfoHeader(this, {
                                    title: 'CPU 信息',
                                    subtitle: '显示 CPU 的硬件规格信息'
                                }, undefined, v11, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 199, col: 13 });
                                ViewPU.create(x11);
                                let y11 = () => {
                                    return {
                                        title: 'CPU 信息',
                                        subtitle: '显示 CPU 的硬件规格信息'
                                    };
                                };
                                x11.paramsGenerator_ = y11;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(v11, {
                                    title: 'CPU 信息',
                                    subtitle: '显示 CPU 的硬件规格信息'
                                });
                            }
                        }, { name: "InfoHeader" });
                    }
                    {
                        this.observeComponentCreation2((r11, s11) => {
                            if (s11) {
                                let t11 = new InfoCard(this, {
                                    title: '架构',
                                    value: this.cpuInfo?.architecture || '未获取'
                                }, undefined, r11, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 204, col: 13 });
                                ViewPU.create(t11);
                                let u11 = () => {
                                    return {
                                        title: '架构',
                                        value: this.cpuInfo?.architecture || '未获取'
                                    };
                                };
                                t11.paramsGenerator_ = u11;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(r11, {
                                    title: '架构',
                                    value: this.cpuInfo?.architecture || '未获取'
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((n11, o11) => {
                            if (o11) {
                                let p11 = new InfoCard(this, {
                                    title: '核心数',
                                    value: this.getCoreCount()
                                }, undefined, n11, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 209, col: 13 });
                                ViewPU.create(p11);
                                let q11 = () => {
                                    return {
                                        title: '核心数',
                                        value: this.getCoreCount()
                                    };
                                };
                                p11.paramsGenerator_ = q11;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(n11, {
                                    title: '核心数',
                                    value: this.getCoreCount()
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((j11, k11) => {
                            if (k11) {
                                let l11 = new InfoCard(this, {
                                    title: '型号',
                                    value: this.cpuInfo?.model || '未获取'
                                }, undefined, j11, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 214, col: 13 });
                                ViewPU.create(l11);
                                let m11 = () => {
                                    return {
                                        title: '型号',
                                        value: this.cpuInfo?.model || '未获取'
                                    };
                                };
                                l11.paramsGenerator_ = m11;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(j11, {
                                    title: '型号',
                                    value: this.cpuInfo?.model || '未获取'
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((f11, g11) => {
                            if (g11) {
                                let h11 = new InfoCard(this, {
                                    title: '制程工艺',
                                    value: this.cpuInfo?.process || '未获取'
                                }, undefined, f11, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 219, col: 13 });
                                ViewPU.create(h11);
                                let i11 = () => {
                                    return {
                                        title: '制程工艺',
                                        value: this.cpuInfo?.process || '未获取'
                                    };
                                };
                                h11.paramsGenerator_ = i11;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(f11, {
                                    title: '制程工艺',
                                    value: this.cpuInfo?.process || '未获取'
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    this.observeComponentCreation2((p10, q10) => {
                        If.create();
                        if (this.cpuUsageAll?.success && this.cpuUsageAll.threads.length > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((b11, c11) => {
                                        if (c11) {
                                            let d11 = new InfoHeader(this, {
                                                title: `线程 CPU 使用率 (${this.cpuUsageAll.threadCount})`,
                                                subtitle: '显示应用各线程的 CPU 使用率',
                                                conceptId: 'thread_cpu',
                                                onInfoClick: () => this.navigateToConcept('thread_cpu')
                                            }, undefined, b11, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 226, col: 15 });
                                            ViewPU.create(d11);
                                            let e11 = () => {
                                                return {
                                                    title: `线程 CPU 使用率 (${this.cpuUsageAll.threadCount})`,
                                                    subtitle: '显示应用各线程的 CPU 使用率',
                                                    conceptId: 'thread_cpu',
                                                    onInfoClick: () => this.navigateToConcept('thread_cpu')
                                                };
                                            };
                                            d11.paramsGenerator_ = e11;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(b11, {
                                                title: `线程 CPU 使用率 (${this.cpuUsageAll.threadCount})`,
                                                subtitle: '显示应用各线程的 CPU 使用率',
                                                conceptId: 'thread_cpu'
                                            });
                                        }
                                    }, { name: "InfoHeader" });
                                }
                                this.observeComponentCreation2((r10, s10) => {
                                    ForEach.create();
                                    const t10 = v10 => {
                                        const w10 = v10;
                                        {
                                            this.observeComponentCreation2((x10, y10) => {
                                                if (y10) {
                                                    let z10 = new InfoCard(this, {
                                                        title: `线程 ${w10.threadId}`,
                                                        value: `${Math.round(w10.percentage)}%`
                                                    }, undefined, x10, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 234, col: 17 });
                                                    ViewPU.create(z10);
                                                    let a11 = () => {
                                                        return {
                                                            title: `线程 ${w10.threadId}`,
                                                            value: `${Math.round(w10.percentage)}%`
                                                        };
                                                    };
                                                    z10.paramsGenerator_ = a11;
                                                }
                                                else {
                                                    this.updateStateVarsOfChildByElmtId(x10, {
                                                        title: `线程 ${w10.threadId}`,
                                                        value: `${Math.round(w10.percentage)}%`
                                                    });
                                                }
                                            }, { name: "InfoCard" });
                                        }
                                    };
                                    this.forEachUpdateFunction(r10, this.cpuUsageAll.threads.slice(0, 15), t10, (u10: ThreadCpuInfo) => u10.threadId.toString(), false, false);
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
