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
    constructor(u3, v3, w3, x3 = -1, y3 = undefined, z3) {
        super(u3, w3, x3, z3);
        if (typeof y3 === "function") {
            this.paramsGenerator_ = y3;
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
        this.setInitiallyProvidedValue(v3);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(t3: CpuPage_Params) {
        if (t3.cpuInfo !== undefined) {
            this.cpuInfo = t3.cpuInfo;
        }
        if (t3.systemCpuUsage !== undefined) {
            this.systemCpuUsage = t3.systemCpuUsage;
        }
        if (t3.appCpuUsage !== undefined) {
            this.appCpuUsage = t3.appCpuUsage;
        }
        if (t3.cpuUsageAll !== undefined) {
            this.cpuUsageAll = t3.cpuUsageAll;
        }
        if (t3.isNativeAvailable !== undefined) {
            this.isNativeAvailable = t3.isNativeAvailable;
        }
        if (t3.isLoading !== undefined) {
            this.isLoading = t3.isLoading;
        }
        if (t3.systemCpuHistory !== undefined) {
            this.systemCpuHistory = t3.systemCpuHistory;
        }
        if (t3.appCpuHistory !== undefined) {
            this.appCpuHistory = t3.appCpuHistory;
        }
        if (t3.refreshTimer !== undefined) {
            this.refreshTimer = t3.refreshTimer;
        }
    }
    updateStateVars(s3: CpuPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(r3) {
        this.__cpuInfo.purgeDependencyOnElmtId(r3);
        this.__systemCpuUsage.purgeDependencyOnElmtId(r3);
        this.__appCpuUsage.purgeDependencyOnElmtId(r3);
        this.__cpuUsageAll.purgeDependencyOnElmtId(r3);
        this.__isNativeAvailable.purgeDependencyOnElmtId(r3);
        this.__isLoading.purgeDependencyOnElmtId(r3);
        this.__systemCpuHistory.purgeDependencyOnElmtId(r3);
        this.__appCpuHistory.purgeDependencyOnElmtId(r3);
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
    set cpuInfo(q3: CpuBaseInfo | null) {
        this.__cpuInfo.set(q3);
    }
    private __systemCpuUsage: ObservedPropertyObjectPU<CpuUsage | null>;
    get systemCpuUsage() {
        return this.__systemCpuUsage.get();
    }
    set systemCpuUsage(p3: CpuUsage | null) {
        this.__systemCpuUsage.set(p3);
    }
    private __appCpuUsage: ObservedPropertyObjectPU<CpuUsage | null>;
    get appCpuUsage() {
        return this.__appCpuUsage.get();
    }
    set appCpuUsage(o3: CpuUsage | null) {
        this.__appCpuUsage.set(o3);
    }
    private __cpuUsageAll: ObservedPropertyObjectPU<CpuUsageAll | null>;
    get cpuUsageAll() {
        return this.__cpuUsageAll.get();
    }
    set cpuUsageAll(n3: CpuUsageAll | null) {
        this.__cpuUsageAll.set(n3);
    }
    private __isNativeAvailable: ObservedPropertySimplePU<boolean>;
    get isNativeAvailable() {
        return this.__isNativeAvailable.get();
    }
    set isNativeAvailable(m3: boolean) {
        this.__isNativeAvailable.set(m3);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(l3: boolean) {
        this.__isLoading.set(l3);
    }
    private __systemCpuHistory: ObservedPropertyObjectPU<number[]>;
    get systemCpuHistory() {
        return this.__systemCpuHistory.get();
    }
    set systemCpuHistory(k3: number[]) {
        this.__systemCpuHistory.set(k3);
    }
    private __appCpuHistory: ObservedPropertyObjectPU<number[]>;
    get appCpuHistory() {
        return this.__appCpuHistory.get();
    }
    set appCpuHistory(j3: number[]) {
        this.__appCpuHistory.set(j3);
    }
    private refreshTimer: number | null;
    aboutToAppear() {
        const i3 = DeviceUtil.getCpuInfo();
        this.cpuInfo = {
            model: i3.model || '未获取',
            cores: i3.cores || 0,
            architecture: i3.architecture || '未获取',
            process: i3.process || '未获取'
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
    DataDescription(e3: string, f3 = null) {
        this.observeComponentCreation2((g3, h3) => {
            Text.create(e3);
            Text.fontSize(12);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 4, bottom: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
    }
    initialRender() {
        this.observeComponentCreation2((c3, d3) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F7F8FA');
        }, Column);
        this.observeComponentCreation2((a3, b3) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((y2, z2) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((w2, x2) => {
            Text.create('处理器');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((u2, v2) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((s2, t2) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((a, b) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((q2, r2) => {
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
                        this.observeComponentCreation2((m2, n2) => {
                            if (n2) {
                                let o2 = new SectionHeader(this, { title: 'CPU 使用率' }, undefined, m2, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 139, col: 13 });
                                ViewPU.create(o2);
                                let p2 = () => {
                                    return {
                                        title: 'CPU 使用率'
                                    };
                                };
                                o2.paramsGenerator_ = p2;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(m2, {
                                    title: 'CPU 使用率'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('显示系统和应用的 CPU 使用率。CPU 使用率表示处理器在一段时间内处于忙碌状态的时间比例。');
                    this.observeComponentCreation2((m1, n1) => {
                        If.create();
                        if (this.isNativeAvailable && this.systemCpuUsage?.success) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((k2, l2) => {
                                    Column.create();
                                    Column.width('100%');
                                    Column.padding(24);
                                    Column.borderRadius(12);
                                    Column.backgroundColor({ "id": 16777224, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                    Column.alignItems(HorizontalAlign.Center);
                                }, Column);
                                this.observeComponentCreation2((i2, j2) => {
                                    Text.create(`${this.getSystemCpuUsagePercent()}%`);
                                    Text.fontSize(48);
                                    Text.fontWeight(FontWeight.Bold);
                                    Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((g2, h2) => {
                                    Text.create('系统 CPU 使用率');
                                    Text.fontSize(14);
                                    Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                    Text.margin({ top: 8 });
                                }, Text);
                                Text.pop();
                                Column.pop();
                                this.observeComponentCreation2((y1, z1) => {
                                    If.create();
                                    if (this.systemCpuHistory.length > 1) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            this.observeComponentCreation2((e2, f2) => {
                                                __Common__.create();
                                                __Common__.margin({ top: 16 });
                                            }, __Common__);
                                            {
                                                this.observeComponentCreation2((a2, b2) => {
                                                    if (b2) {
                                                        let c2 = new SimpleChart(this, {
                                                            data: this.systemCpuHistory,
                                                            maxValue: 100,
                                                            color: '#007DFF',
                                                            title: '系统 CPU 使用率趋势'
                                                        }, undefined, a2, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 162, col: 17 });
                                                        ViewPU.create(c2);
                                                        let d2 = () => {
                                                            return {
                                                                data: this.systemCpuHistory,
                                                                maxValue: 100,
                                                                color: '#007DFF',
                                                                title: '系统 CPU 使用率趋势'
                                                            };
                                                        };
                                                        c2.paramsGenerator_ = d2;
                                                    }
                                                    else {
                                                        this.updateStateVarsOfChildByElmtId(a2, {
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
                                this.observeComponentCreation2((s1, t1) => {
                                    If.create();
                                    if (this.appCpuUsage?.success) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            {
                                                this.observeComponentCreation2((u1, v1) => {
                                                    if (v1) {
                                                        let w1 = new InfoCard(this, {
                                                            title: '应用 CPU 使用率',
                                                            value: `${this.getAppCpuUsagePercent()}%`
                                                        }, undefined, u1, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 173, col: 17 });
                                                        ViewPU.create(w1);
                                                        let x1 = () => {
                                                            return {
                                                                title: '应用 CPU 使用率',
                                                                value: `${this.getAppCpuUsagePercent()}%`
                                                            };
                                                        };
                                                        w1.paramsGenerator_ = x1;
                                                    }
                                                    else {
                                                        this.updateStateVarsOfChildByElmtId(u1, {
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
                                this.observeComponentCreation2((q1, r1) => {
                                    Column.create();
                                    Column.width('100%');
                                    Column.padding(24);
                                    Column.borderRadius(12);
                                    Column.backgroundColor({ "id": 16777224, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                    Column.alignItems(HorizontalAlign.Center);
                                }, Column);
                                this.observeComponentCreation2((o1, p1) => {
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
                        this.observeComponentCreation2((i1, j1) => {
                            if (j1) {
                                let k1 = new SectionHeader(this, { title: 'CPU 信息' }, undefined, i1, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 193, col: 13 });
                                ViewPU.create(k1);
                                let l1 = () => {
                                    return {
                                        title: 'CPU 信息'
                                    };
                                };
                                k1.paramsGenerator_ = l1;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(i1, {
                                    title: 'CPU 信息'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('显示 CPU 的硬件规格信息，包括架构、核心数、型号等。');
                    {
                        this.observeComponentCreation2((e1, f1) => {
                            if (f1) {
                                let g1 = new InfoCard(this, {
                                    title: '架构',
                                    value: this.cpuInfo?.architecture || '未获取'
                                }, undefined, e1, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 196, col: 13 });
                                ViewPU.create(g1);
                                let h1 = () => {
                                    return {
                                        title: '架构',
                                        value: this.cpuInfo?.architecture || '未获取'
                                    };
                                };
                                g1.paramsGenerator_ = h1;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(e1, {
                                    title: '架构',
                                    value: this.cpuInfo?.architecture || '未获取'
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((a1, b1) => {
                            if (b1) {
                                let c1 = new InfoCard(this, {
                                    title: '核心数',
                                    value: this.getCoreCount()
                                }, undefined, a1, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 201, col: 13 });
                                ViewPU.create(c1);
                                let d1 = () => {
                                    return {
                                        title: '核心数',
                                        value: this.getCoreCount()
                                    };
                                };
                                c1.paramsGenerator_ = d1;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(a1, {
                                    title: '核心数',
                                    value: this.getCoreCount()
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((w, x) => {
                            if (x) {
                                let y = new InfoCard(this, {
                                    title: '型号',
                                    value: this.cpuInfo?.model || '未获取'
                                }, undefined, w, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 206, col: 13 });
                                ViewPU.create(y);
                                let z = () => {
                                    return {
                                        title: '型号',
                                        value: this.cpuInfo?.model || '未获取'
                                    };
                                };
                                y.paramsGenerator_ = z;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(w, {
                                    title: '型号',
                                    value: this.cpuInfo?.model || '未获取'
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((s, t) => {
                            if (t) {
                                let u = new InfoCard(this, {
                                    title: '制程工艺',
                                    value: this.cpuInfo?.process || '未获取'
                                }, undefined, s, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 211, col: 13 });
                                ViewPU.create(u);
                                let v = () => {
                                    return {
                                        title: '制程工艺',
                                        value: this.cpuInfo?.process || '未获取'
                                    };
                                };
                                u.paramsGenerator_ = v;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(s, {
                                    title: '制程工艺',
                                    value: this.cpuInfo?.process || '未获取'
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    this.observeComponentCreation2((c, d) => {
                        If.create();
                        if (this.cpuUsageAll?.success && this.cpuUsageAll.threads.length > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((o, p) => {
                                        if (p) {
                                            let q = new SectionHeader(this, { title: `线程 CPU 使用率 (${this.cpuUsageAll.threadCount})` }, undefined, o, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 218, col: 15 });
                                            ViewPU.create(q);
                                            let r = () => {
                                                return {
                                                    title: `线程 CPU 使用率 (${this.cpuUsageAll.threadCount})`
                                                };
                                            };
                                            q.paramsGenerator_ = r;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(o, {
                                                title: `线程 CPU 使用率 (${this.cpuUsageAll.threadCount})`
                                            });
                                        }
                                    }, { name: "SectionHeader" });
                                }
                                this.DataDescription.bind(this)('显示应用各线程的 CPU 使用率。线程是程序执行的最小单位，多线程可以提高程序的并发性能。');
                                this.observeComponentCreation2((e, f) => {
                                    ForEach.create();
                                    const g = i => {
                                        const j = i;
                                        {
                                            this.observeComponentCreation2((k, l) => {
                                                if (l) {
                                                    let m = new InfoCard(this, {
                                                        title: `线程 ${j.threadId}`,
                                                        value: `${Math.round(j.percentage)}%`
                                                    }, undefined, k, () => { }, { page: "entry/src/main/ets/pages/CpuPage.ets", line: 222, col: 17 });
                                                    ViewPU.create(m);
                                                    let n = () => {
                                                        return {
                                                            title: `线程 ${j.threadId}`,
                                                            value: `${Math.round(j.percentage)}%`
                                                        };
                                                    };
                                                    m.paramsGenerator_ = n;
                                                }
                                                else {
                                                    this.updateStateVarsOfChildByElmtId(k, {
                                                        title: `线程 ${j.threadId}`,
                                                        value: `${Math.round(j.percentage)}%`
                                                    });
                                                }
                                            }, { name: "InfoCard" });
                                        }
                                    };
                                    this.forEachUpdateFunction(e, this.cpuUsageAll.threads.slice(0, 15), g, (h: ThreadCpuInfo) => h.threadId.toString(), false, false);
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
