if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TestPage_Params {
    testResults?: string;
    deviceInfo?: DeviceInfoModel | null;
    batteryInfo?: BatteryInfoModel | null;
    displayInfo?: DisplayInfoModel | null;
    storageInfo?: StorageInfoModel | null;
    networkInfo?: NetworkInfoModel | null;
    systemMemInfo?: SystemMemInfo | null;
    appMemInfo?: AppMemInfo | null;
    memoryLimit?: MemoryLimit | null;
    systemCpuUsage?: CpuUsage | null;
    appCpuUsage?: CpuUsage | null;
    cpuUsageAll?: CpuUsageAll | null;
    isNativeAvailable?: boolean;
    isTesting?: boolean;
}
import router from "@ohos:router";
import { SystemInfoCore } from "@bundle:com.huawei.sysinfo/entry/ets/utils/SystemInfoCore";
import { nativeApi } from "@bundle:com.huawei.sysinfo/entry/ets/utils/NativeApi";
import type { SystemMemInfo, AppMemInfo, MemoryLimit, CpuUsage, CpuUsageAll, ThreadCpuInfo } from "@bundle:com.huawei.sysinfo/entry/ets/utils/NativeApi";
import { FormatUtil } from "@bundle:com.huawei.sysinfo/entry/ets/utils/FormatUtil";
import hilog from "@ohos:hilog";
import type { DeviceInfoModel, BatteryInfoModel, DisplayInfoModel, StorageInfoModel, NetworkInfoModel } from '../model/DeviceInfo';
import { NavigationBarWithArrow } from "@bundle:com.huawei.sysinfo/entry/ets/components/NavigationBar";
class TestPage extends ViewPU {
    constructor(s43, t43, u43, v43 = -1, w43 = undefined, x43) {
        super(s43, u43, v43, x43);
        if (typeof w43 === "function") {
            this.paramsGenerator_ = w43;
        }
        this.__testResults = new ObservedPropertySimplePU('点击下方按钮运行测试', this, "testResults");
        this.__deviceInfo = new ObservedPropertyObjectPU(null, this, "deviceInfo");
        this.__batteryInfo = new ObservedPropertyObjectPU(null, this, "batteryInfo");
        this.__displayInfo = new ObservedPropertyObjectPU(null, this, "displayInfo");
        this.__storageInfo = new ObservedPropertyObjectPU(null, this, "storageInfo");
        this.__networkInfo = new ObservedPropertyObjectPU(null, this, "networkInfo");
        this.__systemMemInfo = new ObservedPropertyObjectPU(null, this, "systemMemInfo");
        this.__appMemInfo = new ObservedPropertyObjectPU(null, this, "appMemInfo");
        this.__memoryLimit = new ObservedPropertyObjectPU(null, this, "memoryLimit");
        this.__systemCpuUsage = new ObservedPropertyObjectPU(null, this, "systemCpuUsage");
        this.__appCpuUsage = new ObservedPropertyObjectPU(null, this, "appCpuUsage");
        this.__cpuUsageAll = new ObservedPropertyObjectPU(null, this, "cpuUsageAll");
        this.__isNativeAvailable = new ObservedPropertySimplePU(false, this, "isNativeAvailable");
        this.__isTesting = new ObservedPropertySimplePU(false, this, "isTesting");
        this.setInitiallyProvidedValue(t43);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(r43: TestPage_Params) {
        if (r43.testResults !== undefined) {
            this.testResults = r43.testResults;
        }
        if (r43.deviceInfo !== undefined) {
            this.deviceInfo = r43.deviceInfo;
        }
        if (r43.batteryInfo !== undefined) {
            this.batteryInfo = r43.batteryInfo;
        }
        if (r43.displayInfo !== undefined) {
            this.displayInfo = r43.displayInfo;
        }
        if (r43.storageInfo !== undefined) {
            this.storageInfo = r43.storageInfo;
        }
        if (r43.networkInfo !== undefined) {
            this.networkInfo = r43.networkInfo;
        }
        if (r43.systemMemInfo !== undefined) {
            this.systemMemInfo = r43.systemMemInfo;
        }
        if (r43.appMemInfo !== undefined) {
            this.appMemInfo = r43.appMemInfo;
        }
        if (r43.memoryLimit !== undefined) {
            this.memoryLimit = r43.memoryLimit;
        }
        if (r43.systemCpuUsage !== undefined) {
            this.systemCpuUsage = r43.systemCpuUsage;
        }
        if (r43.appCpuUsage !== undefined) {
            this.appCpuUsage = r43.appCpuUsage;
        }
        if (r43.cpuUsageAll !== undefined) {
            this.cpuUsageAll = r43.cpuUsageAll;
        }
        if (r43.isNativeAvailable !== undefined) {
            this.isNativeAvailable = r43.isNativeAvailable;
        }
        if (r43.isTesting !== undefined) {
            this.isTesting = r43.isTesting;
        }
    }
    updateStateVars(q43: TestPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(p43) {
        this.__testResults.purgeDependencyOnElmtId(p43);
        this.__deviceInfo.purgeDependencyOnElmtId(p43);
        this.__batteryInfo.purgeDependencyOnElmtId(p43);
        this.__displayInfo.purgeDependencyOnElmtId(p43);
        this.__storageInfo.purgeDependencyOnElmtId(p43);
        this.__networkInfo.purgeDependencyOnElmtId(p43);
        this.__systemMemInfo.purgeDependencyOnElmtId(p43);
        this.__appMemInfo.purgeDependencyOnElmtId(p43);
        this.__memoryLimit.purgeDependencyOnElmtId(p43);
        this.__systemCpuUsage.purgeDependencyOnElmtId(p43);
        this.__appCpuUsage.purgeDependencyOnElmtId(p43);
        this.__cpuUsageAll.purgeDependencyOnElmtId(p43);
        this.__isNativeAvailable.purgeDependencyOnElmtId(p43);
        this.__isTesting.purgeDependencyOnElmtId(p43);
    }
    aboutToBeDeleted() {
        this.__testResults.aboutToBeDeleted();
        this.__deviceInfo.aboutToBeDeleted();
        this.__batteryInfo.aboutToBeDeleted();
        this.__displayInfo.aboutToBeDeleted();
        this.__storageInfo.aboutToBeDeleted();
        this.__networkInfo.aboutToBeDeleted();
        this.__systemMemInfo.aboutToBeDeleted();
        this.__appMemInfo.aboutToBeDeleted();
        this.__memoryLimit.aboutToBeDeleted();
        this.__systemCpuUsage.aboutToBeDeleted();
        this.__appCpuUsage.aboutToBeDeleted();
        this.__cpuUsageAll.aboutToBeDeleted();
        this.__isNativeAvailable.aboutToBeDeleted();
        this.__isTesting.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __testResults: ObservedPropertySimplePU<string>;
    get testResults() {
        return this.__testResults.get();
    }
    set testResults(o43: string) {
        this.__testResults.set(o43);
    }
    private __deviceInfo: ObservedPropertyObjectPU<DeviceInfoModel | null>;
    get deviceInfo() {
        return this.__deviceInfo.get();
    }
    set deviceInfo(n43: DeviceInfoModel | null) {
        this.__deviceInfo.set(n43);
    }
    private __batteryInfo: ObservedPropertyObjectPU<BatteryInfoModel | null>;
    get batteryInfo() {
        return this.__batteryInfo.get();
    }
    set batteryInfo(m43: BatteryInfoModel | null) {
        this.__batteryInfo.set(m43);
    }
    private __displayInfo: ObservedPropertyObjectPU<DisplayInfoModel | null>;
    get displayInfo() {
        return this.__displayInfo.get();
    }
    set displayInfo(l43: DisplayInfoModel | null) {
        this.__displayInfo.set(l43);
    }
    private __storageInfo: ObservedPropertyObjectPU<StorageInfoModel | null>;
    get storageInfo() {
        return this.__storageInfo.get();
    }
    set storageInfo(k43: StorageInfoModel | null) {
        this.__storageInfo.set(k43);
    }
    private __networkInfo: ObservedPropertyObjectPU<NetworkInfoModel | null>;
    get networkInfo() {
        return this.__networkInfo.get();
    }
    set networkInfo(j43: NetworkInfoModel | null) {
        this.__networkInfo.set(j43);
    }
    private __systemMemInfo: ObservedPropertyObjectPU<SystemMemInfo | null>;
    get systemMemInfo() {
        return this.__systemMemInfo.get();
    }
    set systemMemInfo(i43: SystemMemInfo | null) {
        this.__systemMemInfo.set(i43);
    }
    private __appMemInfo: ObservedPropertyObjectPU<AppMemInfo | null>;
    get appMemInfo() {
        return this.__appMemInfo.get();
    }
    set appMemInfo(h43: AppMemInfo | null) {
        this.__appMemInfo.set(h43);
    }
    private __memoryLimit: ObservedPropertyObjectPU<MemoryLimit | null>;
    get memoryLimit() {
        return this.__memoryLimit.get();
    }
    set memoryLimit(g43: MemoryLimit | null) {
        this.__memoryLimit.set(g43);
    }
    private __systemCpuUsage: ObservedPropertyObjectPU<CpuUsage | null>;
    get systemCpuUsage() {
        return this.__systemCpuUsage.get();
    }
    set systemCpuUsage(f43: CpuUsage | null) {
        this.__systemCpuUsage.set(f43);
    }
    private __appCpuUsage: ObservedPropertyObjectPU<CpuUsage | null>;
    get appCpuUsage() {
        return this.__appCpuUsage.get();
    }
    set appCpuUsage(e43: CpuUsage | null) {
        this.__appCpuUsage.set(e43);
    }
    private __cpuUsageAll: ObservedPropertyObjectPU<CpuUsageAll | null>;
    get cpuUsageAll() {
        return this.__cpuUsageAll.get();
    }
    set cpuUsageAll(d43: CpuUsageAll | null) {
        this.__cpuUsageAll.set(d43);
    }
    private __isNativeAvailable: ObservedPropertySimplePU<boolean>;
    get isNativeAvailable() {
        return this.__isNativeAvailable.get();
    }
    set isNativeAvailable(c43: boolean) {
        this.__isNativeAvailable.set(c43);
    }
    private __isTesting: ObservedPropertySimplePU<boolean>;
    get isTesting() {
        return this.__isTesting.get();
    }
    set isTesting(b43: boolean) {
        this.__isTesting.set(b43);
    }
    aboutToAppear() {
        this.isNativeAvailable = nativeApi.isNativeAvailable();
        hilog.info(0x0000, 'TestPage', 'Native API available in aboutToAppear: %{public}s', String(this.isNativeAvailable));
        this.runTests();
    }
    async runTests() {
        this.isTesting = true;
        this.testResults = '正在运行测试...';
        try {
            console.log('========== 开始运行系统信息测试 ==========');
            await SystemInfoCore.runAllTests();
            this.deviceInfo = SystemInfoCore.getDeviceInfo();
            this.batteryInfo = SystemInfoCore.getBatteryInfo();
            this.displayInfo = await SystemInfoCore.getDisplayInfo();
            this.storageInfo = SystemInfoCore.getStorageInfo();
            this.networkInfo = await SystemInfoCore.getNetworkInfo();
            this.isNativeAvailable = nativeApi.isNativeAvailable();
            if (this.isNativeAvailable) {
                this.systemMemInfo = nativeApi.getSystemMemInfo();
                this.appMemInfo = nativeApi.getAppMemInfo();
                this.memoryLimit = nativeApi.getMemoryLimit();
                this.systemCpuUsage = nativeApi.getSystemCpuUsage();
                this.appCpuUsage = nativeApi.getAppCpuUsage();
                this.cpuUsageAll = nativeApi.getCpuUsageAll();
            }
            this.testResults = '测试完成！请查看下方详细信息';
        }
        catch (a43) {
            this.testResults = `测试失败: ${JSON.stringify(a43)}`;
            console.error('Test error:', a43);
        }
        this.isTesting = false;
    }
    formatBytes(z42: number | undefined): string {
        if (z42 === undefined || z42 === 0) {
            return '未获取';
        }
        return FormatUtil.formatBytes(z42);
    }
    formatPercent(y42: number | undefined): string {
        if (y42 === undefined) {
            return '未获取';
        }
        return `${y42.toFixed(2)}%`;
    }
    initialRender() {
        this.observeComponentCreation2((w42, x42) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#ffffff');
        }, Column);
        {
            this.observeComponentCreation2((s42, t42) => {
                if (t42) {
                    let u42 = new NavigationBarWithArrow(this, {
                        title: '系统信息测试',
                        onBack: () => {
                            router.back();
                        }
                    }, undefined, s42, () => { }, { page: "entry/src/main/ets/pages/TestPage.ets", line: 95, col: 7 });
                    ViewPU.create(u42);
                    let v42 = () => {
                        return {
                            title: '系统信息测试',
                            onBack: () => {
                                router.back();
                            }
                        };
                    };
                    u42.paramsGenerator_ = v42;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(s42, {
                        title: '系统信息测试'
                    });
                }
            }, { name: "NavigationBarWithArrow" });
        }
        this.observeComponentCreation2((q42, r42) => {
            Scroll.create();
            Scroll.layoutWeight(1);
            Scroll.width('100%');
        }, Scroll);
        this.observeComponentCreation2((o42, p42) => {
            Column.create({ space: 16 });
            Column.padding(16);
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((m42, n42) => {
            Text.create('测试控制');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((k42, l42) => {
            Button.createWithLabel(this.isTesting ? '测试中...' : '运行所有测试');
            Button.width('100%');
            Button.height(50);
            Button.enabled(!this.isTesting);
            Button.onClick(() => {
                this.runTests();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((i42, j42) => {
            Text.create(this.testResults);
            Text.fontSize(14);
            Text.width('100%');
            Text.padding(12);
            Text.backgroundColor('#f5f5f5');
            Text.borderRadius(8);
        }, Text);
        Text.pop();
        this.buildNativeApiStatusSection.bind(this)();
        this.observeComponentCreation2((g42, h42) => {
            If.create();
            if (this.systemMemInfo?.success) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildSystemMemSection.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((e42, f42) => {
            If.create();
            if (this.appMemInfo?.success) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildAppMemSection.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((c42, d42) => {
            If.create();
            if (this.systemCpuUsage?.success) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildCpuSection.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((a42, b42) => {
            If.create();
            if (this.deviceInfo) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildDeviceInfoSection.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((y41, z41) => {
            If.create();
            if (this.batteryInfo) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildBatteryInfoSection.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((w41, x41) => {
            If.create();
            if (this.displayInfo) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildDisplayInfoSection.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((u41, v41) => {
            If.create();
            if (this.storageInfo) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildStorageInfoSection.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((s41, t41) => {
            If.create();
            if (this.networkInfo) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildNetworkInfoSection.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    buildNativeApiStatusSection(n41 = null) {
        this.observeComponentCreation2((q41, r41) => {
            Column.create({ space: 8 });
            Column.width('100%');
            Column.padding(12);
            Column.backgroundColor('#e6f7ff');
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((o41, p41) => {
            Text.create('Native API 状态');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.buildInfoItem.bind(this)('Native API 可用', this.isNativeAvailable ? '是' : '否');
        this.buildInfoItem.bind(this)('HiDebug 模块', this.isNativeAvailable ? '已加载' : '未加载');
        this.buildInfoItem.bind(this)('状态值', String(this.isNativeAvailable));
        Column.pop();
    }
    getUsedMemoryText(): string {
        if (this.systemMemInfo && this.systemMemInfo.total > 0 && this.systemMemInfo.available > 0) {
            const l41: number = this.systemMemInfo.total - this.systemMemInfo.available;
            const m41: string = ((l41 / this.systemMemInfo.total) * 100).toFixed(1);
            return `${this.formatBytes(l41)} (${m41}%)`;
        }
        return '未获取';
    }
    buildSystemMemSection(g41 = null) {
        this.observeComponentCreation2((j41, k41) => {
            Column.create({ space: 8 });
            Column.width('100%');
            Column.padding(12);
            Column.backgroundColor('#f6ffed');
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((h41, i41) => {
            Text.create('系统内存 (Native API)');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.buildInfoItem.bind(this)('总内存', this.formatBytes(this.systemMemInfo?.total));
        this.buildInfoItem.bind(this)('可用内存', this.formatBytes(this.systemMemInfo?.available));
        this.buildInfoItem.bind(this)('空闲内存', this.formatBytes(this.systemMemInfo?.free));
        this.buildInfoItem.bind(this)('已用内存', this.getUsedMemoryText());
        Column.pop();
    }
    buildAppMemSection(z40 = null) {
        this.observeComponentCreation2((e41, f41) => {
            Column.create({ space: 8 });
            Column.width('100%');
            Column.padding(12);
            Column.backgroundColor('#fff7e6');
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((c41, d41) => {
            Text.create('应用内存 (Native API)');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.buildInfoItem.bind(this)('PSS', this.formatBytes(this.appMemInfo?.pss));
        this.buildInfoItem.bind(this)('RSS', this.formatBytes(this.appMemInfo?.rss));
        this.buildInfoItem.bind(this)('VSS', this.formatBytes(this.appMemInfo?.vss));
        this.buildInfoItem.bind(this)('Shared Clean', this.formatBytes(this.appMemInfo?.sharedClean));
        this.buildInfoItem.bind(this)('Shared Dirty', this.formatBytes(this.appMemInfo?.sharedDirty));
        this.buildInfoItem.bind(this)('Private Clean', this.formatBytes(this.appMemInfo?.privateClean));
        this.buildInfoItem.bind(this)('Private Dirty', this.formatBytes(this.appMemInfo?.privateDirty));
        this.observeComponentCreation2((a41, b41) => {
            If.create();
            if (this.memoryLimit?.success) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildInfoItem.bind(this)('RSS 限制', this.formatBytes(this.memoryLimit?.rssLimit));
                    this.buildInfoItem.bind(this)('VSS 限制', this.formatBytes(this.memoryLimit?.vssLimit));
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    buildCpuSection(k40 = null) {
        this.observeComponentCreation2((x40, y40) => {
            Column.create({ space: 8 });
            Column.width('100%');
            Column.padding(12);
            Column.backgroundColor('#f9f0ff');
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((v40, w40) => {
            Text.create('CPU 信息 (Native API)');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.buildInfoItem.bind(this)('系统 CPU 使用率', this.formatPercent(this.systemCpuUsage?.percentage));
        this.observeComponentCreation2((t40, u40) => {
            If.create();
            if (this.appCpuUsage?.success) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildInfoItem.bind(this)('应用 CPU 使用率', this.formatPercent(this.appCpuUsage?.percentage));
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((l40, m40) => {
            If.create();
            if (this.cpuUsageAll?.success && this.cpuUsageAll.threads.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildInfoItem.bind(this)('线程数量', this.cpuUsageAll.threadCount.toString());
                    this.observeComponentCreation2((n40, o40) => {
                        ForEach.create();
                        const p40 = r40 => {
                            const s40 = r40;
                            this.buildInfoItem.bind(this)(`线程 ${s40.threadId}`, `${s40.percentage.toFixed(2)}%`);
                        };
                        this.forEachUpdateFunction(n40, this.cpuUsageAll.threads.slice(0, 5), p40, (q40: ThreadCpuInfo) => q40.threadId.toString(), false, false);
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
        Column.pop();
    }
    buildDeviceInfoSection(f40 = null) {
        this.observeComponentCreation2((i40, j40) => {
            Column.create({ space: 8 });
            Column.width('100%');
            Column.padding(12);
            Column.backgroundColor('#f0f8ff');
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((g40, h40) => {
            Text.create('设备信息');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.buildInfoItem.bind(this)('设备类型', this.deviceInfo?.deviceType || '未知');
        this.buildInfoItem.bind(this)('设备厂家', this.deviceInfo?.manufacture || '未知');
        this.buildInfoItem.bind(this)('设备品牌', this.deviceInfo?.brand || '未知');
        this.buildInfoItem.bind(this)('市场名称', this.deviceInfo?.marketName || '未知');
        this.buildInfoItem.bind(this)('产品系列', this.deviceInfo?.productSeries || '未知');
        this.buildInfoItem.bind(this)('产品型号', this.deviceInfo?.productModel || '未知');
        this.buildInfoItem.bind(this)('系统版本', this.deviceInfo?.osFullName || '未知');
        this.buildInfoItem.bind(this)('API 版本', (this.deviceInfo?.sdkApiVersion || 0).toString());
        this.buildInfoItem.bind(this)('CPU 架构', this.deviceInfo?.abiList || '未获取');
        Column.pop();
    }
    buildBatteryInfoSection(a40 = null) {
        this.observeComponentCreation2((d40, e40) => {
            Column.create({ space: 8 });
            Column.width('100%');
            Column.padding(12);
            Column.backgroundColor('#fff8f0');
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((b40, c40) => {
            Text.create('电池信息');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.buildInfoItem.bind(this)('电量', `${this.batteryInfo?.batterySOC || 0}%`);
        this.buildInfoItem.bind(this)('充电状态', this.batteryInfo?.chargingStatus.toString() || '0');
        this.buildInfoItem.bind(this)('健康状态', this.batteryInfo?.healthStatus.toString() || '0');
        this.buildInfoItem.bind(this)('温度', `${((this.batteryInfo?.batteryTemperature || 0) / 10).toFixed(1)}°C`);
        this.buildInfoItem.bind(this)('电压', `${this.batteryInfo?.voltage || 0} μV`);
        this.buildInfoItem.bind(this)('技术', this.batteryInfo?.technology || '未知');
        Column.pop();
    }
    buildDisplayInfoSection(v39 = null) {
        this.observeComponentCreation2((y39, z39) => {
            Column.create({ space: 8 });
            Column.width('100%');
            Column.padding(12);
            Column.backgroundColor('#f0fff0');
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((w39, x39) => {
            Text.create('屏幕信息');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.buildInfoItem.bind(this)('分辨率', `${this.displayInfo?.width || 0} × ${this.displayInfo?.height || 0}`);
        this.buildInfoItem.bind(this)('像素密度', `${this.displayInfo?.densityDPI || 0} DPI`);
        this.buildInfoItem.bind(this)('刷新率', `${this.displayInfo?.refreshRate || 0} Hz`);
        this.buildInfoItem.bind(this)('旋转角度', `${this.displayInfo?.rotation || 0}°`);
        this.buildInfoItem.bind(this)('X DPI', `${this.displayInfo?.xDPI || 0}`);
        this.buildInfoItem.bind(this)('Y DPI', `${this.displayInfo?.yDPI || 0}`);
        Column.pop();
    }
    buildStorageInfoSection(q39 = null) {
        this.observeComponentCreation2((t39, u39) => {
            Column.create({ space: 8 });
            Column.width('100%');
            Column.padding(12);
            Column.backgroundColor('#fff0f0');
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((r39, s39) => {
            Text.create('存储信息');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.buildInfoItem.bind(this)('总存储', this.getStorageDisplayValue(this.storageInfo?.totalSize));
        this.buildInfoItem.bind(this)('可用存储', this.getStorageDisplayValue(this.storageInfo?.freeSize));
        this.buildInfoItem.bind(this)('已用存储', this.getStorageDisplayValue(this.storageInfo?.usedSize));
        Column.pop();
    }
    buildNetworkInfoSection(l39 = null) {
        this.observeComponentCreation2((o39, p39) => {
            Column.create({ space: 8 });
            Column.width('100%');
            Column.padding(12);
            Column.backgroundColor('#f0f0ff');
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((m39, n39) => {
            Text.create('网络信息');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.buildInfoItem.bind(this)('网络类型', this.networkInfo?.netType || '未知');
        Column.pop();
    }
    buildInfoItem(c39: string, d39: string, e39 = null) {
        this.observeComponentCreation2((j39, k39) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((h39, i39) => {
            Text.create(c39);
            Text.fontSize(14);
            Text.width(140);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((f39, g39) => {
            Text.create(d39);
            Text.fontSize(14);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        Row.pop();
    }
    formatStorageSize(a39: number): string {
        const b39 = (a39 / 1024 / 1024 / 1024).toFixed(2);
        return `${b39} GB`;
    }
    getStorageDisplayValue(z38: number | undefined): string {
        if (z38 === undefined || z38 === 0) {
            return '未获取';
        }
        return this.formatStorageSize(z38);
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "TestPage";
    }
}
registerNamedRoute(() => new TestPage(undefined, {}), "", { bundleName: "com.huawei.sysinfo", moduleName: "entry", pagePath: "pages/TestPage", pageFullPath: "entry/src/main/ets/pages/TestPage", integratedHsp: "false", moduleType: "followWithHap" });
