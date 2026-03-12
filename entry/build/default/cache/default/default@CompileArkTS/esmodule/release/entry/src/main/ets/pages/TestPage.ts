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
class TestPage extends ViewPU {
    constructor(x9, y9, z9, a10 = -1, b10 = undefined, c10) {
        super(x9, z9, a10, c10);
        if (typeof b10 === "function") {
            this.paramsGenerator_ = b10;
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
        this.setInitiallyProvidedValue(y9);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(w9: TestPage_Params) {
        if (w9.testResults !== undefined) {
            this.testResults = w9.testResults;
        }
        if (w9.deviceInfo !== undefined) {
            this.deviceInfo = w9.deviceInfo;
        }
        if (w9.batteryInfo !== undefined) {
            this.batteryInfo = w9.batteryInfo;
        }
        if (w9.displayInfo !== undefined) {
            this.displayInfo = w9.displayInfo;
        }
        if (w9.storageInfo !== undefined) {
            this.storageInfo = w9.storageInfo;
        }
        if (w9.networkInfo !== undefined) {
            this.networkInfo = w9.networkInfo;
        }
        if (w9.systemMemInfo !== undefined) {
            this.systemMemInfo = w9.systemMemInfo;
        }
        if (w9.appMemInfo !== undefined) {
            this.appMemInfo = w9.appMemInfo;
        }
        if (w9.memoryLimit !== undefined) {
            this.memoryLimit = w9.memoryLimit;
        }
        if (w9.systemCpuUsage !== undefined) {
            this.systemCpuUsage = w9.systemCpuUsage;
        }
        if (w9.appCpuUsage !== undefined) {
            this.appCpuUsage = w9.appCpuUsage;
        }
        if (w9.cpuUsageAll !== undefined) {
            this.cpuUsageAll = w9.cpuUsageAll;
        }
        if (w9.isNativeAvailable !== undefined) {
            this.isNativeAvailable = w9.isNativeAvailable;
        }
        if (w9.isTesting !== undefined) {
            this.isTesting = w9.isTesting;
        }
    }
    updateStateVars(v9: TestPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(u9) {
        this.__testResults.purgeDependencyOnElmtId(u9);
        this.__deviceInfo.purgeDependencyOnElmtId(u9);
        this.__batteryInfo.purgeDependencyOnElmtId(u9);
        this.__displayInfo.purgeDependencyOnElmtId(u9);
        this.__storageInfo.purgeDependencyOnElmtId(u9);
        this.__networkInfo.purgeDependencyOnElmtId(u9);
        this.__systemMemInfo.purgeDependencyOnElmtId(u9);
        this.__appMemInfo.purgeDependencyOnElmtId(u9);
        this.__memoryLimit.purgeDependencyOnElmtId(u9);
        this.__systemCpuUsage.purgeDependencyOnElmtId(u9);
        this.__appCpuUsage.purgeDependencyOnElmtId(u9);
        this.__cpuUsageAll.purgeDependencyOnElmtId(u9);
        this.__isNativeAvailable.purgeDependencyOnElmtId(u9);
        this.__isTesting.purgeDependencyOnElmtId(u9);
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
    set testResults(t9: string) {
        this.__testResults.set(t9);
    }
    private __deviceInfo: ObservedPropertyObjectPU<DeviceInfoModel | null>;
    get deviceInfo() {
        return this.__deviceInfo.get();
    }
    set deviceInfo(s9: DeviceInfoModel | null) {
        this.__deviceInfo.set(s9);
    }
    private __batteryInfo: ObservedPropertyObjectPU<BatteryInfoModel | null>;
    get batteryInfo() {
        return this.__batteryInfo.get();
    }
    set batteryInfo(r9: BatteryInfoModel | null) {
        this.__batteryInfo.set(r9);
    }
    private __displayInfo: ObservedPropertyObjectPU<DisplayInfoModel | null>;
    get displayInfo() {
        return this.__displayInfo.get();
    }
    set displayInfo(q9: DisplayInfoModel | null) {
        this.__displayInfo.set(q9);
    }
    private __storageInfo: ObservedPropertyObjectPU<StorageInfoModel | null>;
    get storageInfo() {
        return this.__storageInfo.get();
    }
    set storageInfo(p9: StorageInfoModel | null) {
        this.__storageInfo.set(p9);
    }
    private __networkInfo: ObservedPropertyObjectPU<NetworkInfoModel | null>;
    get networkInfo() {
        return this.__networkInfo.get();
    }
    set networkInfo(o9: NetworkInfoModel | null) {
        this.__networkInfo.set(o9);
    }
    private __systemMemInfo: ObservedPropertyObjectPU<SystemMemInfo | null>;
    get systemMemInfo() {
        return this.__systemMemInfo.get();
    }
    set systemMemInfo(n9: SystemMemInfo | null) {
        this.__systemMemInfo.set(n9);
    }
    private __appMemInfo: ObservedPropertyObjectPU<AppMemInfo | null>;
    get appMemInfo() {
        return this.__appMemInfo.get();
    }
    set appMemInfo(m9: AppMemInfo | null) {
        this.__appMemInfo.set(m9);
    }
    private __memoryLimit: ObservedPropertyObjectPU<MemoryLimit | null>;
    get memoryLimit() {
        return this.__memoryLimit.get();
    }
    set memoryLimit(l9: MemoryLimit | null) {
        this.__memoryLimit.set(l9);
    }
    private __systemCpuUsage: ObservedPropertyObjectPU<CpuUsage | null>;
    get systemCpuUsage() {
        return this.__systemCpuUsage.get();
    }
    set systemCpuUsage(k9: CpuUsage | null) {
        this.__systemCpuUsage.set(k9);
    }
    private __appCpuUsage: ObservedPropertyObjectPU<CpuUsage | null>;
    get appCpuUsage() {
        return this.__appCpuUsage.get();
    }
    set appCpuUsage(j9: CpuUsage | null) {
        this.__appCpuUsage.set(j9);
    }
    private __cpuUsageAll: ObservedPropertyObjectPU<CpuUsageAll | null>;
    get cpuUsageAll() {
        return this.__cpuUsageAll.get();
    }
    set cpuUsageAll(i9: CpuUsageAll | null) {
        this.__cpuUsageAll.set(i9);
    }
    private __isNativeAvailable: ObservedPropertySimplePU<boolean>;
    get isNativeAvailable() {
        return this.__isNativeAvailable.get();
    }
    set isNativeAvailable(h9: boolean) {
        this.__isNativeAvailable.set(h9);
    }
    private __isTesting: ObservedPropertySimplePU<boolean>;
    get isTesting() {
        return this.__isTesting.get();
    }
    set isTesting(g9: boolean) {
        this.__isTesting.set(g9);
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
        catch (f9) {
            this.testResults = `测试失败: ${JSON.stringify(f9)}`;
            console.error('Test error:', f9);
        }
        this.isTesting = false;
    }
    formatBytes(e9: number | undefined): string {
        if (e9 === undefined || e9 === 0) {
            return '未获取';
        }
        return FormatUtil.formatBytes(e9);
    }
    formatPercent(d9: number | undefined): string {
        if (d9 === undefined) {
            return '未获取';
        }
        return `${d9.toFixed(2)}%`;
    }
    initialRender() {
        this.observeComponentCreation2((b9, c9) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#ffffff');
        }, Column);
        this.observeComponentCreation2((z8, a9) => {
            Row.create();
            Row.width('100%');
            Row.height(50);
            Row.padding({ left: 16, right: 16 });
        }, Row);
        this.observeComponentCreation2((x8, y8) => {
            Text.create('← 返回');
            Text.fontSize(18);
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((v8, w8) => {
            Blank.create();
            Blank.layoutWeight(1);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((t8, u8) => {
            Text.create('系统信息测试');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((r8, s8) => {
            Blank.create();
            Blank.layoutWeight(1);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((p8, q8) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        Row.pop();
        this.observeComponentCreation2((n8, o8) => {
            Scroll.create();
            Scroll.layoutWeight(1);
            Scroll.width('100%');
        }, Scroll);
        this.observeComponentCreation2((l8, m8) => {
            Column.create({ space: 16 });
            Column.padding(16);
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((j8, k8) => {
            Text.create('测试控制');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((h8, i8) => {
            Button.createWithLabel(this.isTesting ? '测试中...' : '运行所有测试');
            Button.width('100%');
            Button.height(50);
            Button.enabled(!this.isTesting);
            Button.onClick(() => {
                this.runTests();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((f8, g8) => {
            Text.create(this.testResults);
            Text.fontSize(14);
            Text.width('100%');
            Text.padding(12);
            Text.backgroundColor('#f5f5f5');
            Text.borderRadius(8);
        }, Text);
        Text.pop();
        this.buildNativeApiStatusSection.bind(this)();
        this.observeComponentCreation2((d8, e8) => {
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
        this.observeComponentCreation2((b8, c8) => {
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
        this.observeComponentCreation2((z7, a8) => {
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
        this.observeComponentCreation2((x7, y7) => {
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
        this.observeComponentCreation2((v7, w7) => {
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
        this.observeComponentCreation2((t7, u7) => {
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
        this.observeComponentCreation2((r7, s7) => {
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
        this.observeComponentCreation2((p7, q7) => {
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
    buildNativeApiStatusSection(k7 = null) {
        this.observeComponentCreation2((n7, o7) => {
            Column.create({ space: 8 });
            Column.width('100%');
            Column.padding(12);
            Column.backgroundColor('#e6f7ff');
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((l7, m7) => {
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
            const i7: number = this.systemMemInfo.total - this.systemMemInfo.available;
            const j7: string = ((i7 / this.systemMemInfo.total) * 100).toFixed(1);
            return `${this.formatBytes(i7)} (${j7}%)`;
        }
        return '未获取';
    }
    buildSystemMemSection(d7 = null) {
        this.observeComponentCreation2((g7, h7) => {
            Column.create({ space: 8 });
            Column.width('100%');
            Column.padding(12);
            Column.backgroundColor('#f6ffed');
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((e7, f7) => {
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
    buildAppMemSection(w6 = null) {
        this.observeComponentCreation2((b7, c7) => {
            Column.create({ space: 8 });
            Column.width('100%');
            Column.padding(12);
            Column.backgroundColor('#fff7e6');
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((z6, a7) => {
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
        this.observeComponentCreation2((x6, y6) => {
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
    buildCpuSection(h6 = null) {
        this.observeComponentCreation2((u6, v6) => {
            Column.create({ space: 8 });
            Column.width('100%');
            Column.padding(12);
            Column.backgroundColor('#f9f0ff');
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((s6, t6) => {
            Text.create('CPU 信息 (Native API)');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.buildInfoItem.bind(this)('系统 CPU 使用率', this.formatPercent(this.systemCpuUsage?.percentage));
        this.observeComponentCreation2((q6, r6) => {
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
        this.observeComponentCreation2((i6, j6) => {
            If.create();
            if (this.cpuUsageAll?.success && this.cpuUsageAll.threads.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildInfoItem.bind(this)('线程数量', this.cpuUsageAll.threadCount.toString());
                    this.observeComponentCreation2((k6, l6) => {
                        ForEach.create();
                        const m6 = o6 => {
                            const p6 = o6;
                            this.buildInfoItem.bind(this)(`线程 ${p6.threadId}`, `${p6.percentage.toFixed(2)}%`);
                        };
                        this.forEachUpdateFunction(k6, this.cpuUsageAll.threads.slice(0, 5), m6, (n6: ThreadCpuInfo) => n6.threadId.toString(), false, false);
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
    buildDeviceInfoSection(c6 = null) {
        this.observeComponentCreation2((f6, g6) => {
            Column.create({ space: 8 });
            Column.width('100%');
            Column.padding(12);
            Column.backgroundColor('#f0f8ff');
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((d6, e6) => {
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
    buildBatteryInfoSection(x5 = null) {
        this.observeComponentCreation2((a6, b6) => {
            Column.create({ space: 8 });
            Column.width('100%');
            Column.padding(12);
            Column.backgroundColor('#fff8f0');
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((y5, z5) => {
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
    buildDisplayInfoSection(s5 = null) {
        this.observeComponentCreation2((v5, w5) => {
            Column.create({ space: 8 });
            Column.width('100%');
            Column.padding(12);
            Column.backgroundColor('#f0fff0');
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((t5, u5) => {
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
    buildStorageInfoSection(n5 = null) {
        this.observeComponentCreation2((q5, r5) => {
            Column.create({ space: 8 });
            Column.width('100%');
            Column.padding(12);
            Column.backgroundColor('#fff0f0');
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((o5, p5) => {
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
    buildNetworkInfoSection(i5 = null) {
        this.observeComponentCreation2((l5, m5) => {
            Column.create({ space: 8 });
            Column.width('100%');
            Column.padding(12);
            Column.backgroundColor('#f0f0ff');
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((j5, k5) => {
            Text.create('网络信息');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.buildInfoItem.bind(this)('网络类型', this.networkInfo?.netType || '未知');
        Column.pop();
    }
    buildInfoItem(z4: string, a5: string, b5 = null) {
        this.observeComponentCreation2((g5, h5) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((e5, f5) => {
            Text.create(z4);
            Text.fontSize(14);
            Text.width(140);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((c5, d5) => {
            Text.create(a5);
            Text.fontSize(14);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        Row.pop();
    }
    formatStorageSize(x4: number): string {
        const y4 = (x4 / 1024 / 1024 / 1024).toFixed(2);
        return `${y4} GB`;
    }
    getStorageDisplayValue(w4: number | undefined): string {
        if (w4 === undefined || w4 === 0) {
            return '未获取';
        }
        return this.formatStorageSize(w4);
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "TestPage";
    }
}
registerNamedRoute(() => new TestPage(undefined, {}), "", { bundleName: "com.huawei.sysinfo", moduleName: "entry", pagePath: "pages/TestPage", pageFullPath: "entry/src/main/ets/pages/TestPage", integratedHsp: "false", moduleType: "followWithHap" });
