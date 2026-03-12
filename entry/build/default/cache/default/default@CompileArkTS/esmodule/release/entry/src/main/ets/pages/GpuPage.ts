if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface GpuPage_Params {
    gpuVendor?: string;
    gpuRenderer?: string;
    gpuVersion?: string;
    isLoading?: boolean;
}
import router from "@ohos:router";
import { InfoCard } from "@bundle:com.huawei.sysinfo/entry/ets/components/InfoCard";
import { SectionHeader } from "@bundle:com.huawei.sysinfo/entry/ets/components/SectionHeader";
import hilog from "@ohos:hilog";
const TAG = 'GpuPage';
class GpuPage extends ViewPU {
    constructor(n15, o15, p15, q15 = -1, r15 = undefined, s15) {
        super(n15, p15, q15, s15);
        if (typeof r15 === "function") {
            this.paramsGenerator_ = r15;
        }
        this.__gpuVendor = new ObservedPropertySimplePU('未知', this, "gpuVendor");
        this.__gpuRenderer = new ObservedPropertySimplePU('未知', this, "gpuRenderer");
        this.__gpuVersion = new ObservedPropertySimplePU('未知', this, "gpuVersion");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.setInitiallyProvidedValue(o15);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(m15: GpuPage_Params) {
        if (m15.gpuVendor !== undefined) {
            this.gpuVendor = m15.gpuVendor;
        }
        if (m15.gpuRenderer !== undefined) {
            this.gpuRenderer = m15.gpuRenderer;
        }
        if (m15.gpuVersion !== undefined) {
            this.gpuVersion = m15.gpuVersion;
        }
        if (m15.isLoading !== undefined) {
            this.isLoading = m15.isLoading;
        }
    }
    updateStateVars(l15: GpuPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(k15) {
        this.__gpuVendor.purgeDependencyOnElmtId(k15);
        this.__gpuRenderer.purgeDependencyOnElmtId(k15);
        this.__gpuVersion.purgeDependencyOnElmtId(k15);
        this.__isLoading.purgeDependencyOnElmtId(k15);
    }
    aboutToBeDeleted() {
        this.__gpuVendor.aboutToBeDeleted();
        this.__gpuRenderer.aboutToBeDeleted();
        this.__gpuVersion.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __gpuVendor: ObservedPropertySimplePU<string>;
    get gpuVendor() {
        return this.__gpuVendor.get();
    }
    set gpuVendor(j15: string) {
        this.__gpuVendor.set(j15);
    }
    private __gpuRenderer: ObservedPropertySimplePU<string>;
    get gpuRenderer() {
        return this.__gpuRenderer.get();
    }
    set gpuRenderer(i15: string) {
        this.__gpuRenderer.set(i15);
    }
    private __gpuVersion: ObservedPropertySimplePU<string>;
    get gpuVersion() {
        return this.__gpuVersion.get();
    }
    set gpuVersion(h15: string) {
        this.__gpuVersion.set(h15);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(g15: boolean) {
        this.__isLoading.set(g15);
    }
    aboutToAppear() {
        hilog.info(0x0000, TAG, 'GpuPage aboutToAppear');
        this.loadGpuInfo();
        setTimeout(() => {
            this.isLoading = false;
        }, 100);
    }
    loadGpuInfo() {
        try {
            this.gpuVendor = 'Mali';
            this.gpuRenderer = 'Mali-G78';
            this.gpuVersion = 'OpenGL ES 3.2';
        }
        catch (f15) {
            hilog.error(0x0000, TAG, 'Load GPU info error: %{public}s', String(f15));
        }
    }
    DataDescription(b15: string, c15 = null) {
        this.observeComponentCreation2((d15, e15) => {
            Text.create(b15);
            Text.fontSize(12);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 4, bottom: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
    }
    initialRender() {
        this.observeComponentCreation2((z14, a15) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((x14, y14) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((v14, w14) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((t14, u14) => {
            Text.create('GPU 信息');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((r14, s14) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((p14, q14) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((h13, i13) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((n14, o14) => {
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
                        this.observeComponentCreation2((j14, k14) => {
                            if (k14) {
                                let l14 = new SectionHeader(this, { title: 'GPU 基本信息' }, undefined, j14, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 77, col: 13 });
                                ViewPU.create(l14);
                                let m14 = () => {
                                    return {
                                        title: 'GPU 基本信息'
                                    };
                                };
                                l14.paramsGenerator_ = m14;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(j14, {
                                    title: 'GPU 基本信息'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('显示设备的图形处理器(GPU)基本信息。GPU负责图形渲染、图像处理等任务。');
                    {
                        this.observeComponentCreation2((f14, g14) => {
                            if (g14) {
                                let h14 = new InfoCard(this, {
                                    title: 'GPU 厂商',
                                    value: this.gpuVendor
                                }, undefined, f14, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 80, col: 13 });
                                ViewPU.create(h14);
                                let i14 = () => {
                                    return {
                                        title: 'GPU 厂商',
                                        value: this.gpuVendor
                                    };
                                };
                                h14.paramsGenerator_ = i14;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(f14, {
                                    title: 'GPU 厂商',
                                    value: this.gpuVendor
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((b14, c14) => {
                            if (c14) {
                                let d14 = new InfoCard(this, {
                                    title: 'GPU 型号',
                                    value: this.gpuRenderer
                                }, undefined, b14, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 85, col: 13 });
                                ViewPU.create(d14);
                                let e14 = () => {
                                    return {
                                        title: 'GPU 型号',
                                        value: this.gpuRenderer
                                    };
                                };
                                d14.paramsGenerator_ = e14;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(b14, {
                                    title: 'GPU 型号',
                                    value: this.gpuRenderer
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((x13, y13) => {
                            if (y13) {
                                let z13 = new InfoCard(this, {
                                    title: 'OpenGL ES 版本',
                                    value: this.gpuVersion
                                }, undefined, x13, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 90, col: 13 });
                                ViewPU.create(z13);
                                let a14 = () => {
                                    return {
                                        title: 'OpenGL ES 版本',
                                        value: this.gpuVersion
                                    };
                                };
                                z13.paramsGenerator_ = a14;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(x13, {
                                    title: 'OpenGL ES 版本',
                                    value: this.gpuVersion
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((t13, u13) => {
                            if (u13) {
                                let v13 = new SectionHeader(this, { title: 'GPU 内存' }, undefined, t13, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 95, col: 13 });
                                ViewPU.create(v13);
                                let w13 = () => {
                                    return {
                                        title: 'GPU 内存'
                                    };
                                };
                                v13.paramsGenerator_ = w13;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(t13, {
                                    title: 'GPU 内存'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('当前 HarmonyOS 版本暂不支持直接获取 GPU 内存使用情况。GPU 内存主要用于纹理、缓冲区、帧缓冲等图形数据存储。');
                    this.observeComponentCreation2((r13, s13) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(16);
                        Column.borderRadius(12);
                        Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((p13, q13) => {
                        Text.create('GPU 内存信息暂不可用');
                        Text.fontSize(16);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin(16);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((n13, o13) => {
                        Text.create('HiDebug API 当前版本不支持 GPU 内存查询');
                        Text.fontSize(14);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    {
                        this.observeComponentCreation2((j13, k13) => {
                            if (k13) {
                                let l13 = new SectionHeader(this, { title: '说明' }, undefined, j13, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 114, col: 13 });
                                ViewPU.create(l13);
                                let m13 = () => {
                                    return {
                                        title: '说明'
                                    };
                                };
                                l13.paramsGenerator_ = m13;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(j13, {
                                    title: '说明'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('GPU(图形处理器)是专为图形渲染设计的处理器。在手机中，GPU负责游戏画面渲染、UI动画、视频解码等任务。GPU内存用于存储纹理、顶点数据、帧缓冲等图形资源。');
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
        return "GpuPage";
    }
}
registerNamedRoute(() => new GpuPage(undefined, {}), "", { bundleName: "com.huawei.sysinfo", moduleName: "entry", pagePath: "pages/GpuPage", pageFullPath: "entry/src/main/ets/pages/GpuPage", integratedHsp: "false", moduleType: "followWithHap" });
